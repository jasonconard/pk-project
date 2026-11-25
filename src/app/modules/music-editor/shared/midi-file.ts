/**
 * A small Standard MIDI File (.mid) reader and writer, no library: what the music editor needs to import a song made
 * elsewhere and to export its own (notes with their length, instruments, tempo, time signature, track names).
 */

export interface MidiNote {
  /** Start, in ticks from the file's start. */
  tick: number;
  /** Length, in ticks (at least 1). */
  duration: number;
  /** MIDI note, 0..127 (60 = middle C). */
  pitch: number;
  velocity: number;
}

/** The notes of one channel of one track of the file (a track playing on several channels gives several). */
export interface MidiTrack {
  name: string;
  /** 0..15 (9: the drums, General MIDI channel 10). */
  channel: number;
  /** General MIDI program 0..127 (0 when the file sets none). */
  program: number;
  notes: MidiNote[];
}

export interface MidiFile {
  /** Ticks per quarter note. */
  ppq: number;
  /** Quarter notes per minute (the first tempo of the file; 120 when it has none). */
  bpm: number;
  /** Time signature (the first one; 4/4 when there is none). */
  meter: [number, number];
  tracks: MidiTrack[];
}

export const DRUM_CHANNEL = 9;

// --- Reading ---

class Reader {
  pos = 0;
  constructor(private readonly bytes: Uint8Array) {}

  get done(): boolean {
    return this.pos >= this.bytes.length;
  }

  byte(): number {
    if (this.pos >= this.bytes.length) {
      throw new Error("Fichier MIDI tronqué");
    }
    return this.bytes[this.pos++];
  }

  uint(size: number): number {
    let value = 0;
    for (let i = 0; i < size; i++) {
      value = value * 256 + this.byte();
    }
    return value;
  }

  /** Variable-length quantity (7 bits per byte, the high bit set on all but the last). */
  varLen(): number {
    let value = 0;
    for (let i = 0; i < 4; i++) {
      const b = this.byte();
      value = value * 128 + (b & 0x7f);
      if ((b & 0x80) === 0) {
        return value;
      }
    }
    return value;
  }

  text(size: number): string {
    const start = this.pos;
    this.pos += size;
    return new TextDecoder("latin1").decode(
      this.bytes.subarray(start, Math.min(this.pos, this.bytes.length))
    );
  }
}

/** Reads a .mid file (format 0 or 1; format 2 read as format 1). Throws on what isn't a MIDI file. */
export function parseMidi(buffer: ArrayBuffer | Uint8Array): MidiFile {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const reader = new Reader(bytes);
  if (reader.text(4) !== "MThd") {
    throw new Error("Ce n'est pas un fichier MIDI");
  }
  const headerSize = reader.uint(4);
  const headerEnd = reader.pos + headerSize;
  reader.uint(2); // format
  const trackCount = reader.uint(2);
  const division = reader.uint(2);
  if (division & 0x80_00) {
    throw new Error("Fichier MIDI en temps SMPTE : non pris en charge");
  }
  reader.pos = headerEnd;
  const file: MidiFile = {
    ppq: division || 96,
    bpm: 0,
    meter: [4, 4],
    tracks: [],
  };
  let meterSet = false;
  /** Programs set per channel, in any track (a fallback for tracks that set none). */
  const channelPrograms = new Map<number, number>();
  const pending: { track: MidiTrack; programSet: boolean }[] = [];

  for (let t = 0; t < trackCount && !reader.done; t++) {
    const id = reader.text(4);
    const size = reader.uint(4);
    const end = reader.pos + size;
    if (id !== "MTrk") {
      reader.pos = end;
      continue;
    }
    let tick = 0;
    let status = 0;
    let name = "";
    const byChannel = new Map<
      number,
      { track: MidiTrack; programSet: boolean }
    >();
    /** Notes sounding: "channel:pitch" → their starts (a stack: the same key pressed twice). */
    const open = new Map<string, { tick: number; velocity: number }[]>();
    const channelTrack = (channel: number) => {
      let entry = byChannel.get(channel);
      if (!entry) {
        entry = {
          track: { name: "", channel, program: 0, notes: [] },
          programSet: false,
        };
        byChannel.set(channel, entry);
      }
      return entry;
    };
    const noteOff = (channel: number, pitch: number) => {
      const starts = open.get(`${channel}:${pitch}`);
      const start = starts?.shift();
      if (start) {
        channelTrack(channel).track.notes.push({
          tick: start.tick,
          duration: Math.max(1, tick - start.tick),
          pitch,
          velocity: start.velocity,
        });
      }
    };

    while (reader.pos < end) {
      tick += reader.varLen();
      let first = reader.byte();
      if (first < 0x80) {
        // Running status: the previous status byte, this byte is its first data byte
        if (!status) {
          throw new Error("Fichier MIDI abîmé");
        }
        reader.pos--;
        first = status;
      }
      if (first === 0xff) {
        const type = reader.byte();
        const length = reader.varLen();
        const dataStart = reader.pos;
        if (type === 0x03 && !name) {
          name = reader.text(length).trim();
        } else if (type === 0x51 && length === 3 && !file.bpm) {
          file.bpm = 60_000_000 / reader.uint(3);
        } else if (type === 0x58 && length >= 2 && !meterSet) {
          file.meter = [reader.byte(), 2 ** reader.byte()];
          meterSet = true;
        } else if (type === 0x2f) {
          reader.pos = end;
          break;
        }
        reader.pos = dataStart + length;
        continue;
      }
      if (first === 0xf0 || first === 0xf7) {
        reader.pos += reader.varLen();
        continue;
      }
      status = first;
      const kind = first & 0xf0;
      const channel = first & 0x0f;
      switch (kind) {
        case 0x90:
        case 0x80: {
          const pitch = reader.byte() & 0x7f;
          const velocity = reader.byte() & 0x7f;
          if (kind === 0x90 && velocity > 0) {
            const key = `${channel}:${pitch}`;
            const starts = open.get(key) ?? [];
            starts.push({ tick, velocity });
            open.set(key, starts);
            channelTrack(channel);
          } else {
            noteOff(channel, pitch);
          }

          break;
        }
        case 0xc0: {
          const program = reader.byte() & 0x7f;
          const entry = channelTrack(channel);
          if (!entry.programSet) {
            entry.track.program = program;
            entry.programSet = true;
          }
          if (!channelPrograms.has(channel)) {
            channelPrograms.set(channel, program);
          }

          break;
        }
        case 0xd0: {
          reader.byte();

          break;
        }
        default: {
          // 0xa0 aftertouch, 0xb0 controller, 0xe0 pitch bend: two data bytes
          reader.byte();
          reader.byte();
        }
      }
    }
    reader.pos = end;
    // Notes never released: until the track's end
    for (const [key, starts] of open) {
      const [channel, pitch] = key.split(":").map(Number);
      while (starts.length > 0) {
        noteOff(channel, pitch);
      }
    }
    const entries = [...byChannel.values()].filter(
      (e) => e.track.notes.length > 0
    );
    for (const entry of entries) {
      entry.track.name =
        entries.length > 1 && name
          ? `${name} (canal ${entry.track.channel + 1})`
          : name;
      entry.track.notes.sort((a, b) => a.tick - b.tick || a.pitch - b.pitch);
      pending.push(entry);
    }
  }
  for (const entry of pending) {
    if (!entry.programSet) {
      entry.track.program = channelPrograms.get(entry.track.channel) ?? 0;
    }
    file.tracks.push(entry.track);
  }
  file.bpm ||= 120;
  return file;
}

// --- Writing ---

class Writer {
  private readonly bytes: number[] = [];

  get data(): number[] {
    return this.bytes;
  }

  byte(...values: number[]): void {
    this.all(values);
  }

  /** Many bytes (a loop: no spread of a long array). */
  all(values: number[]): void {
    for (const value of values) {
      this.bytes.push(value);
    }
  }

  uint(value: number, size: number): void {
    for (let i = size - 1; i >= 0; i--) {
      this.bytes.push(Math.floor(value / 256 ** i) % 256);
    }
  }

  varLen(value: number): void {
    const groups = [value & 0x7f];
    let rest = Math.floor(value / 128);
    while (rest > 0) {
      groups.unshift((rest & 0x7f) | 0x80);
      rest = Math.floor(rest / 128);
    }
    this.bytes.push(...groups);
  }

  text(value: string): void {
    for (const char of value) {
      const code = char.codePointAt(0) ?? 63;
      this.bytes.push(code < 256 ? code : 63);
    }
  }
}

/** Writes a format 1 file: a first track with the tempo and the time signature, then one track per `tracks`. */
export function writeMidi(
  file: MidiFile & { name?: string }
): Uint8Array<ArrayBuffer> {
  const tracks: number[][] = [];
  const conductor = new Writer();
  if (file.name) {
    metaText(conductor, 0x03, file.name);
  }
  const tempo = Math.round(60_000_000 / file.bpm);
  conductor.byte(0, 0xff, 0x51, 3);
  conductor.uint(tempo, 3);
  conductor.byte(
    0,
    0xff,
    0x58,
    4,
    file.meter[0],
    Math.log2(file.meter[1]),
    24,
    8
  );
  conductor.byte(0, 0xff, 0x2f, 0);
  tracks.push(conductor.data);

  for (const track of file.tracks) {
    const w = new Writer();
    if (track.name) {
      metaText(w, 0x03, track.name);
    }
    const channel = track.channel & 0x0f;
    if (channel !== DRUM_CHANNEL) {
      w.byte(0, 0xc0 | channel, track.program & 0x7f);
    }
    // Releases before presses at the same tick (a key pressed again right away)
    const events = track.notes
      .flatMap((note) => [
        { tick: note.tick, on: true, note },
        { tick: note.tick + Math.max(1, note.duration), on: false, note },
      ])
      .sort((a, b) => a.tick - b.tick || Number(a.on) - Number(b.on));
    let last = 0;
    for (const event of events) {
      w.varLen(event.tick - last);
      last = event.tick;
      w.byte(
        (event.on ? 0x90 : 0x80) | channel,
        event.note.pitch & 0x7f,
        event.on ? event.note.velocity & 0x7f : 0x40
      );
    }
    w.byte(0, 0xff, 0x2f, 0);
    tracks.push(w.data);
  }

  const out = new Writer();
  out.text("MThd");
  out.uint(6, 4);
  out.uint(1, 2);
  out.uint(tracks.length, 2);
  out.uint(file.ppq, 2);
  for (const data of tracks) {
    out.text("MTrk");
    out.uint(data.length, 4);
    out.all(data);
  }
  return new Uint8Array(out.data);
}

function metaText(w: Writer, type: number, value: string): void {
  const text = new Writer();
  text.text(value);
  w.byte(0, 0xff, type);
  w.varLen(text.data.length);
  w.byte(...text.data);
}
