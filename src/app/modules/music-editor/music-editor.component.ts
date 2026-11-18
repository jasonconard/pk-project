import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, HostListener, inject, input, output, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import {
  LucideActivity, LucideAudioLines, LucideAudioWaveform, LucideBell, LucideBird, LucideChevronDown, LucideCloud, LucideFeather,
  LucideOrbit, LucideSignal, LucideSparkle, LucideStar, LucideWind, LucideZap, LucideClipboardPaste, LucideCopy, LucideGamepad2, LucideChevronLeft, LucideDisc3, LucideDownload, LucideDynamicIcon,
  LucideEighthNote, LucideEraser, LucideFileMusic, LucideGuitar, LucideIcon, LucideKeyboardMusic, LucideMinus, LucidePlay,
  LucidePlus, LucideRedo2, LucideSlidersHorizontal, LucideSquare, LucideTrash, LucideUndo2, LucideWavesHorizontal, LucideX,
} from '@lucide/angular';
import { onAppVisibility } from '../../core/shared/app-visibility';
import { MusicEngine } from './shared/music-engine';
import {
  Channel, CHANNELS, degreeCount, degreeMidi, DRUM_PATTERNS, DRUMS, DrumHit, DrumId, INSTRUMENTS, InstrumentId, LOFI_PRESETS,
  LOFI_SETTINGS, lofiOf, LofiSettings, MAX_BARS, MAX_STAMPS, stampsOf, MAX_BPM, midiName, MIN_BPM, ModeId, MODES, modeOf, MUSIC_SLOTS, MusicSlot,
  MusicUse, newSong, NOTE_NAMES,
  noteLength, scaleLabel, Song, SongNote, songLength, STEPS_PER_BAR, volumeOf,
} from './shared/song';
import { loadSongs, saveSongs } from './shared/song-storage';
import { FAMILIES, INSTRUMENT_DEFS } from './shared/instruments';
import { downloadFile } from '../game/shared/util/ts-source';

type Stamp = InstrumentId | 'eraser';
type Sheet = 'scale' | 'song' | 'mix' | 'lofi' | 'game' | 'library';
/** Holding a stamp this long (ms) opens the library. */
const LONG_PRESS = 450;
/** Moves of one slider closer than this (ms) are one change in the history. */
const MERGE_TIME = 800;

const ICONS: Record<Stamp, LucideIcon> = {
  lead: LucideEighthNote, pulse25: LucideActivity, pulse12: LucideSignal, pulse75: LucideGamepad2, flute: LucideWind,
  ocarina: LucideBird, bell: LucideBell, pluck: LucideGuitar, harp: LucideSparkle, celesta: LucideStar,
  nylon: LucideFeather, strings: LucideOrbit, softpad: LucideCloud, pad: LucideWavesHorizontal,
  bass: LucideAudioWaveform, wavebass: LucideAudioLines, pickbass: LucideZap, eraser: LucideEraser,
};
const HISTORY = 100;
/** Bars shown at once: phones in portrait 1, landscape / computer 2, wide screens 4. */
const LANDSCAPE = '(orientation: landscape), (min-width: 701px)';
const WIDE = '(min-width: 1200px)';

/**
 * Music editor (/musique), in the spirit of Mario Paint: pick an instrument "stamp", touch the grid to place a note
 * (touch it again to remove it), the song loops while you compose. The rows are the notes of the chosen scale only:
 * never a wrong note. Drums on 3 rows under the notes. Songs saved in the browser.
 * Layout: design/music-editor.pen (portrait: stamps at the bottom; landscape: stamps on the left, 2 bars).
 */
@Component({
  selector: 'app-music-editor',
  imports: [
    NgTemplateOutlet, DecimalPipe, LucideGamepad2, LucideCopy, LucideClipboardPaste, LucideEraser, LucideDynamicIcon, LucideChevronLeft, LucideChevronDown, LucideUndo2, LucideRedo2, LucidePlay, LucideSquare, LucideMinus,
    LucidePlus, LucideKeyboardMusic, LucideFileMusic, LucideSlidersHorizontal, LucideDisc3, LucideDownload, LucideX, LucideTrash,
  ],
  templateUrl: './music-editor.component.html',
  styleUrls: ['./music-editor.component.scss', './music-editor.sheets.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicEditorComponent {
  /** Opened over the game (a full screen panel): Jeu closes it instead of loading the game page. */
  readonly embedded = input(false);
  /** Jeu, when opened over the game. */
  readonly closed = output<void>();
  protected readonly instruments = INSTRUMENTS;
  protected readonly drumRows = DRUMS;
  protected readonly modes = MODES;
  protected readonly noteNames = NOTE_NAMES;
  protected readonly icons = ICONS;
  protected readonly maxBars = MAX_BARS;
  protected readonly channels = CHANNELS;
  protected readonly lofiSettings = LOFI_SETTINGS;
  protected readonly lofiPresets = LOFI_PRESETS;
  protected readonly drumPatterns = DRUM_PATTERNS;
  protected readonly musicSlots = MUSIC_SLOTS;
  protected readonly maxStamps = MAX_STAMPS;
  /** The library: the instruments by family. */
  protected readonly library = FAMILIES.map(family => ({
    ...family,
    instruments: INSTRUMENTS.filter(i => INSTRUMENT_DEFS[i.id].family === family.id),
  }));

  private readonly engine = new MusicEngine();
  private readonly stored = loadSongs();
  protected readonly songs = signal<Song[]>(this.stored.songs);
  protected readonly currentId = signal(this.stored.current);
  /** Which song plays when in the game. */
  protected readonly use = signal<MusicUse>(this.stored.use ?? {});
  protected readonly exported = signal('');
  protected readonly song = computed(() => this.songs().find(s => s.id === this.currentId()) ?? this.songs()[0]);

  protected readonly stamp = signal<Stamp>('lead');
  protected readonly sheet = signal<Sheet | null>(null);
  protected readonly playing = signal(false);
  protected readonly playStep = signal<number | null>(null);
  /** First bar shown. */
  protected readonly viewStart = signal(0);
  private readonly viewBarsState = signal(1);
  protected readonly confirmDelete = signal(false);
  /** Bar the bar tools act on (copy, paste, clear), and the copied bar. */
  protected readonly toolBar = signal(0);
  protected readonly copied = signal<{ notes: SongNote[], drums: DrumHit[], from: number } | null>(null);
  /** Library: the stamp being changed (its index in the bar), or null to add one; swap its notes too. */
  protected readonly libraryFor = signal<number | null>(null);
  protected readonly swapNotes = signal(true);
  private pressTimer?: ReturnType<typeof setTimeout>;
  private longPressed = false;

  private readonly past: Song[] = [];
  private readonly future: Song[] = [];
  protected readonly canUndo = signal(false);
  protected readonly canRedo = signal(false);

  protected readonly scaleLabel = computed(() => scaleLabel(this.song()));
  /** Grid rows, highest note first. */
  protected readonly rows = computed(() => {
    const song = this.song();
    const length = modeOf(song).intervals.length;
    return Array.from({ length: degreeCount(song) }, (_, i) => degreeCount(song) - 1 - i).map(degree => ({
      degree, tonic: degree % length === 0, ...midiName(degreeMidi(song, degree)),
    }));
  });
  protected readonly viewBars = computed(() => Math.min(this.viewBarsState(), this.song().bars));
  protected readonly visibleSteps = computed(() => {
    const start = Math.min(this.viewStart(), Math.max(0, this.song().bars - this.viewBars())) * STEPS_PER_BAR;
    return Array.from({ length: this.viewBars() * STEPS_PER_BAR }, (_, i) => start + i);
  });
  protected readonly bars = computed(() => {
    const song = this.song();
    const first = this.visibleSteps()[0] / STEPS_PER_BAR;
    return Array.from({ length: song.bars }, (_, bar) => ({
      bar,
      shown: bar >= first && bar < first + this.viewBars(),
      // Mini preview: is there something on each beat?
      beats: [0, 1, 2, 3].map(beat => song.notes.some(n => Math.floor(n.step / 4) === bar * 4 + beat)),
    }));
  });
  /** "step:degree" → the note starting there */
  protected readonly noteAt = computed(() => new Map(this.song().notes.map(n => [`${n.step}:${n.degree}`, n])));
  /** "step:degree" → the note sounding there (its start or its held part) */
  protected readonly coverAt = computed(() => {
    const cover = new Map<string, SongNote>();
    for (const note of this.song().notes) {
      for (let i = 0; i < noteLength(note); i++) {
        cover.set(`${note.step + i}:${note.degree}`, note);
      }
    }
    return cover;
  });
  /** A note being stretched (press, then slide along the row): its row, start, length, and the note if it existed. */
  protected readonly drag = signal<{ degree: number, start: number, length: number, note: SongNote | null } | null>(null);
  private dragFrom: { pointerId: number, x: number, tapStep: number, moved: boolean } | null = null;
  protected readonly drumAt = computed(() => new Set(this.song().drums.map(d => `${d.step}:${d.drum}`)));
  protected readonly lofi = computed(() => lofiOf(this.song()));
  /** The song's stamps (its bar of instruments). */
  protected readonly stamps = computed(() => stampsOf(this.song()).map(id => INSTRUMENTS.find(i => i.id === id)!));
  /** Mix: the instruments the song uses (stamps, notes) and the drums. */
  protected readonly mixChannels = computed(() => {
    const used = new Set<string>(stampsOf(this.song()));
    return CHANNELS.filter(c => c.id === 'drums' || used.has(c.id));
  });
  /** Notes of the instrument of the stamp being changed (to swap with it). */
  protected readonly libraryNotes = computed(() => {
    const index = this.libraryFor();
    const id = index === null ? null : stampsOf(this.song())[index];
    return id ? this.song().notes.filter(n => n.instrument === id).length : 0;
  });
  /** The preset matching the lo-fi settings (if any). */
  protected readonly activePreset = computed(() => {
    const lofi = this.lofi();
    return LOFI_PRESETS.find(p => LOFI_SETTINGS.every(k => Math.abs(p.settings[k.id] - lofi[k.id]) < 0.01))?.id ?? null;
  });

  private saveTimer?: ReturnType<typeof setTimeout>;
  private lastMerge = { key: '', time: 0 };
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const landscape = matchMedia(LANDSCAPE);
    const wide = matchMedia(WIDE);
    const layout = () => this.viewBarsState.set(wide.matches ? 4 : landscape.matches ? 2 : 1);
    layout();
    landscape.addEventListener('change', layout);
    wide.addEventListener('change', layout);
    // The stamp picked must be in the bar (another song, a stamp removed): else the first one
    effect(() => {
      const stamps = stampsOf(this.song());
      const stamp = this.stamp();
      if (stamp !== 'eraser' && !stamps.includes(stamp) && stamps.length) {
        this.stamp.set(stamps[0]);
      }
    });
    // In the background: silence (the playback stops)
    const stopVisibility = onAppVisibility(hidden => {
      if (hidden) {
        this.stop();
      }
      this.engine.setSuspended(hidden);
    });
    destroyRef.onDestroy(() => {
      landscape.removeEventListener('change', layout);
      wide.removeEventListener('change', layout);
      stopVisibility();
      cancelAnimationFrame(this.frame);
      this.flushSave();
      this.engine.dispose();
    });
  }

  /**
   * Back to the game: over the game, the panel closes (the game plays the songs as saved now); on its own page, the
   * game page is loaded.
   */
  protected backToGame(event: Event): void {
    event.preventDefault();
    if (this.embedded()) {
      this.requestClose();
      return;
    }
    this.stop();
    this.flushSave();
    location.hash = '#/';
    location.reload();
  }

  /** Over the game (Jeu, the back button): playback stops, the songs are saved, the panel closes. */
  requestClose(): void {
    this.stop();
    this.flushSave();
    this.closed.emit();
  }

  // --- Playback ---

  protected togglePlay(): void {
    if (this.playing()) {
      this.stop();
    } else {
      this.engine.play(this.song(), this.visibleSteps()[0]);
      this.playing.set(true);
      this.followPlayhead();
    }
  }

  private stop(): void {
    this.engine.stop();
    this.playing.set(false);
    this.playStep.set(null);
    cancelAnimationFrame(this.frame);
  }

  /** Every frame: the step heard now lights up; the view follows it from bar to bar. */
  private followPlayhead(): void {
    this.frame = requestAnimationFrame(() => {
      if (!this.playing()) {
        return;
      }
      const step = this.engine.currentStep();
      if (step !== this.playStep()) {
        this.playStep.set(step);
        if (step !== null && !this.visibleSteps().includes(step)) {
          const bar = Math.floor(step / STEPS_PER_BAR);
          this.viewStart.set(bar - (bar % this.viewBars()));
        }
      }
      this.followPlayhead();
    });
  }

  // --- Editing ---

  /**
   * A tap on a cell: the note sounding there (even on its held part) is removed with the same stamp or the eraser,
   * changes instrument with another stamp; an empty cell gets a one-step note.
   */
  protected tapNote(degree: number, step: number): void {
    const stamp = this.stamp();
    const note = this.coverAt().get(`${step}:${degree}`);
    if (stamp === 'eraser' || note?.instrument === stamp) {
      if (note) {
        this.edit(song => song.notes = song.notes.filter(n => !this.same(n, note)));
      }
      return;
    }
    if (note) {
      this.edit(song => song.notes = song.notes.map(n => this.same(n, note) ? { ...n, instrument: stamp } : n));
      this.engine.previewNote(this.song(), stamp, note.degree);
      return;
    }
    this.placeNote(degree, step, 1, stamp);
  }

  /** Keyboard (Enter / Space on a cell): a tap. Pointer clicks are handled by the press / release. */
  protected keyNote(event: MouseEvent, degree: number, step: number): void {
    if (event.detail === 0) {
      this.tapNote(degree, step);
    }
  }

  /** Press on a cell: starts stretching the note there (or a new one); a release without moving is a tap. */
  protected pressNote(event: PointerEvent, degree: number, step: number): void {
    if (event.button !== 0 || this.dragFrom) {
      return;
    }
    const note = this.coverAt().get(`${step}:${degree}`) ?? null;
    this.drag.set({ degree, start: note?.step ?? step, length: note ? noteLength(note) : 1, note });
    this.dragFrom = { pointerId: event.pointerId, x: event.clientX, tapStep: step, moved: false };
    document.addEventListener('pointermove', this.onDragMove);
    document.addEventListener('pointerup', this.onDragEnd);
    document.addEventListener('pointercancel', this.onDragEnd);
  }

  private readonly onDragMove = (event: PointerEvent) => {
    const drag = this.drag();
    const from = this.dragFrom;
    if (!drag || !from || event.pointerId !== from.pointerId) {
      return;
    }
    const cell = (document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null)?.closest<HTMLElement>('.cell[data-step]');
    if (!cell) {
      return;
    }
    const length = Math.max(1, Math.min(+cell.dataset['step']! - drag.start + 1, songLength(this.song()) - drag.start));
    if (Math.abs(event.clientX - from.x) > 8) {
      from.moved = true;
    }
    if (length !== drag.length && from.moved) {
      this.drag.set({ ...drag, length });
    }
  };

  private readonly onDragEnd = (event: PointerEvent) => {
    const drag = this.drag();
    const from = this.dragFrom;
    if (!from || event.pointerId !== from.pointerId) {
      return;
    }
    document.removeEventListener('pointermove', this.onDragMove);
    document.removeEventListener('pointerup', this.onDragEnd);
    document.removeEventListener('pointercancel', this.onDragEnd);
    this.dragFrom = null;
    this.drag.set(null);
    if (!drag || event.type === 'pointercancel') {
      return;
    }
    if (!from.moved) {
      this.tapNote(drag.degree, from.tapStep);
    } else if (drag.note) {
      const note = drag.note;
      this.edit(song => {
        song.notes = song.notes.map(n => this.same(n, note) ? { ...n, length: this.fit(song, note.degree, note.step, drag.length) } : n);
      });
    } else if (this.stamp() !== 'eraser') {
      this.placeNote(drag.degree, drag.start, drag.length, this.stamp() as InstrumentId);
    }
  };

  /** A new note: a note already sounding on that cell is cut just before it; the new one stops before the next. */
  private placeNote(degree: number, step: number, length: number, instrument: InstrumentId): void {
    this.edit(song => {
      song.notes = song.notes.map(n => n.degree === degree && n.step < step && n.step + noteLength(n) > step
        ? { ...n, length: step - n.step } : n);
      song.notes.push({ step, degree, instrument, length: this.fit(song, degree, step, length) });
    });
    this.engine.previewNote(this.song(), instrument, degree);
  }

  /** A length that doesn't run into the next note of the row (nor past the end). */
  private fit(song: Song, degree: number, step: number, length: number): number {
    const next = Math.min(songLength(song), ...song.notes.filter(n => n.degree === degree && n.step > step).map(n => n.step));
    return Math.max(1, Math.min(length, next - step));
  }

  private same(a: SongNote, b: SongNote): boolean {
    return a.step === b.step && a.degree === b.degree;
  }

  /** Length shown for a note (the one being stretched follows the finger). */
  protected shownLength(note: SongNote): number {
    const drag = this.drag();
    return drag?.note && this.same(drag.note, note) ? drag.length : noteLength(note);
  }

  protected toggleDrum(drum: DrumId, step: number): void {
    const on = this.drumAt().has(`${step}:${drum}`);
    this.edit(song => song.drums = on
      ? song.drums.filter(d => d.step !== step || d.drum !== drum)
      : [...song.drums, { step, drum }]);
    if (!on) {
      this.engine.previewDrum(this.song(), drum);
    }
  }

  protected setBpm(bpm: number): void {
    const value = Math.round(Math.min(MAX_BPM, Math.max(MIN_BPM, bpm || 84)));
    if (value !== this.song().bpm) {
      this.edit(song => song.bpm = value);
    }
  }

  protected setTonic(tonic: number): void {
    this.edit(song => song.tonic = tonic);
  }

  /** Another scale: the notes keep their place in the grid (the degree), clipped to the new number of rows. */
  protected setMode(mode: ModeId): void {
    this.edit(song => {
      song.mode = mode;
      const rows = degreeCount(song);
      song.notes = song.notes.filter(n => n.degree < rows);
    });
  }

  /** The scale, up then down, with the melody instrument. */
  protected playScale(): void {
    const song = this.song();
    const count = modeOf(song).intervals.length;
    const degrees = [...Array.from({ length: count + 1 }, (_, i) => i), ...Array.from({ length: count }, (_, i) => count - 1 - i)];
    degrees.forEach((degree, i) => this.engine.previewNote(song, 'lead', degree + count, i * 0.16));
  }

  protected showBar(bar: number): void {
    const view = this.viewBars();
    this.viewStart.set(Math.max(0, Math.min(bar - (bar % view), this.song().bars - view)));
  }

  protected addBar(): void {
    const bars = this.song().bars;
    if (bars < MAX_BARS) {
      this.edit(song => song.bars++);
      this.showBar(bars);
    }
  }

  protected setBars(bars: number): void {
    const value = Math.min(MAX_BARS, Math.max(1, bars));
    this.edit(song => {
      song.bars = value;
      const length = songLength(song);
      song.notes = song.notes.filter(n => n.step < length);
      song.drums = song.drums.filter(d => d.step < length);
    });
    this.showBar(0);
  }

  protected rename(name: string): void {
    const value = name.trim() || 'Sans titre';
    if (value !== this.song().name) {
      this.edit(song => song.name = value);
    }
  }

  // --- Mix, lo-fi ---

  protected volume(channel: Channel): number {
    return volumeOf(this.song(), channel);
  }

  protected setVolume(channel: Channel, volume: number): void {
    this.edit(song => song.mix = { ...song.mix, [channel]: Math.round(volume * 100) / 100 }, `mix-${channel}`);
  }

  protected setLofi(key: keyof LofiSettings, value: number): void {
    this.edit(song => song.lofi = { ...lofiOf(song), [key]: Math.round(value * 100) / 100 }, `lofi-${key}`);
  }

  protected applyPreset(settings: LofiSettings): void {
    this.edit(song => song.lofi = { ...settings });
  }

  // --- Stamps, library ---

  /** Press on a stamp: held long, it opens the library for it. */
  protected pressStamp(index: number): void {
    this.longPressed = false;
    clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.longPressed = true;
      this.openLibrary(index);
    }, LONG_PRESS);
  }

  protected releaseStamp(): void {
    clearTimeout(this.pressTimer);
  }

  /** Tap on a stamp: picks it; on the stamp already picked, opens the library for it. */
  protected tapStamp(index: number, id: InstrumentId): void {
    if (this.longPressed) {
      this.longPressed = false;
      return;
    }
    if (this.stamp() === id) {
      this.openLibrary(index);
    } else {
      this.stamp.set(id);
    }
  }

  /** The library, to change the stamp `index` (null: add one). */
  protected openLibrary(index: number | null): void {
    this.libraryFor.set(index);
    this.swapNotes.set(true);
    this.sheet.set('library');
  }

  /** Library: the chosen instrument becomes the stamp (or a new one); its notes follow if asked. */
  protected chooseInstrument(id: InstrumentId): void {
    const index = this.libraryFor();
    const swap = this.swapNotes();
    this.edit(song => {
      const stamps = stampsOf(song);
      if (index === null) {
        if (!stamps.includes(id)) {
          stamps.push(id);
        }
      } else {
        const old = stamps[index];
        const existing = stamps.indexOf(id);
        if (existing >= 0 && existing !== index) {
          stamps.splice(index, 1); // already in the bar: just drop the old one
        } else {
          stamps[index] = id;
        }
        if (swap && old !== id) {
          song.notes = song.notes.map(n => n.instrument === old ? { ...n, instrument: id } : n);
        }
      }
      song.stamps = stamps.slice(0, MAX_STAMPS);
    });
    this.stamp.set(id);
    this.sheet.set(null);
  }

  /** Library: the stamp leaves the bar (its notes stay and play; it comes back while they exist). */
  protected removeStamp(): void {
    const index = this.libraryFor();
    if (index === null) {
      return;
    }
    this.edit(song => {
      const stamps = stampsOf(song);
      stamps.splice(index, 1);
      song.stamps = stamps;
    });
    const first = stampsOf(this.song())[0];
    if (first) {
      this.stamp.set(first);
    }
    this.sheet.set(null);
  }

  /** Listen to an instrument: a little arpeggio of the song's scale, then a held note. */
  protected previewInstrument(id: InstrumentId): void {
    const song = this.song();
    const count = modeOf(song).intervals.length;
    const step = 60 / song.bpm / 4;
    [0, 2, 4, count].forEach((degree, i) => this.engine.previewNote(song, id, degree + count, i * step * 2));
    this.engine.previewNote(song, id, count, 8 * step, 6);
  }

  protected def(id: InstrumentId) {
    return INSTRUMENT_DEFS[id];
  }

  // --- Drums, bars ---

  /** A ready-made drum pattern, on every bar. */
  protected applyDrumPattern(id: string): void {
    const pattern = DRUM_PATTERNS.find(p => p.id === id);
    if (!pattern) {
      return;
    }
    this.edit(song => song.drums = Array.from({ length: song.bars }, (_, bar) => [
      ...pattern.kick.map(s => ({ step: bar * STEPS_PER_BAR + s, drum: 'kick' as DrumId })),
      ...pattern.snare.map(s => ({ step: bar * STEPS_PER_BAR + s, drum: 'snare' as DrumId })),
      ...pattern.hat.map(s => ({ step: bar * STEPS_PER_BAR + s, drum: 'hat' as DrumId })),
    ]).flat());
  }

  private inBar(step: number, bar: number): boolean {
    return Math.floor(step / STEPS_PER_BAR) === bar;
  }

  protected copyBar(): void {
    const bar = this.toolBar();
    const song = this.song();
    const offset = bar * STEPS_PER_BAR;
    this.copied.set({
      from: bar,
      notes: song.notes.filter(n => this.inBar(n.step, bar)).map(n => ({ ...n, step: n.step - offset })),
      drums: song.drums.filter(d => this.inBar(d.step, bar)).map(d => ({ ...d, step: d.step - offset })),
    });
  }

  /** The copied bar replaces the chosen one. */
  protected pasteBar(): void {
    const copied = this.copied();
    if (!copied) {
      return;
    }
    const bar = this.toolBar();
    const offset = bar * STEPS_PER_BAR;
    this.edit(song => {
      song.notes = [...song.notes.filter(n => !this.inBar(n.step, bar)), ...copied.notes.map(n => ({ ...n, step: n.step + offset }))];
      song.drums = [...song.drums.filter(d => !this.inBar(d.step, bar)), ...copied.drums.map(d => ({ ...d, step: d.step + offset }))];
    });
    this.showBar(bar);
  }

  protected clearBar(): void {
    const bar = this.toolBar();
    this.edit(song => {
      song.notes = song.notes.filter(n => !this.inBar(n.step, bar));
      song.drums = song.drums.filter(d => !this.inBar(d.step, bar));
    });
  }

  protected openSheet(sheet: Sheet): void {
    if (sheet === 'song') {
      this.toolBar.set(Math.min(this.visibleSteps()[0] / STEPS_PER_BAR, this.song().bars - 1));
    }
    this.sheet.set(sheet);
  }

  protected barNumbers(): number[] {
    return Array.from({ length: this.song().bars }, (_, i) => i);
  }

  // --- In the game ---

  protected setUse(slot: MusicSlot, id: string): void {
    this.use.update(use => {
      const next = { ...use };
      if (id) {
        next[slot] = id;
      } else {
        delete next[slot];
      }
      return next;
    });
    this.scheduleSave();
  }

  /** Slots of the current song (shown on the sheet). */
  protected usedFor(id: string): string {
    return MUSIC_SLOTS.filter(slot => this.use()[slot.id] === id).map(slot => slot.label).join(', ');
  }

  /** The songs and their slots, as the game's music file (src/assets/music/music.ts) for the repository. */
  protected exportMusic(): void {
    const songs = this.songs().map(song => ({ ...song, notes: [...song.notes].sort((a, b) => a.step - b.step || a.degree - b.degree) }));
    const source = `import { MusicUse, Song } from '../../app/modules/music-editor/shared/song';

/**
 * Songs of the game and which one plays when (day, night, rain, fight). Written by the music editor's export
 * (/#/musique → Jeu → Exporter); the songs saved in the browser replace these ones (same id).
 */
export const CODE_SONGS: Song[] = ${JSON.stringify(songs, null, 2)};

export const CODE_MUSIC_USE: MusicUse = ${JSON.stringify(this.use(), null, 2)};
`;
    downloadFile('music.ts', source);
    this.exported.set(`music.ts téléchargé (${songs.length} morceau${songs.length > 1 ? 'x' : ''}) : à mettre dans src/assets/music/.`);
  }

  // --- Songs ---

  protected openSong(id: string): void {
    this.stop();
    this.currentId.set(id);
    this.resetHistory();
    this.showBar(0);
    this.scheduleSave();
  }

  protected createSong(): void {
    const song = newSong();
    this.songs.update(songs => [...songs, song]);
    this.openSong(song.id);
  }

  /** Two touches: "Supprimer", then "Confirmer ?". The last song is replaced by a new empty one. */
  protected deleteSong(): void {
    if (!this.confirmDelete()) {
      this.confirmDelete.set(true);
      setTimeout(() => this.confirmDelete.set(false), 3000);
      return;
    }
    this.confirmDelete.set(false);
    const id = this.currentId();
    this.use.update(use => Object.fromEntries(Object.entries(use).filter(([, songId]) => songId !== id)) as MusicUse);
    const rest = this.songs().filter(s => s.id !== id);
    const songs = rest.length ? rest : [newSong()];
    this.songs.set(songs);
    this.openSong(songs[0].id);
  }

  // --- History, saving ---

  /** A change of the song (undoable). Changes with the same `mergeKey` close together (a slider moving) are one step. */
  private edit(change: (song: Song) => void, mergeKey = ''): void {
    const before = this.song();
    const song: Song = structuredClone(before);
    change(song);
    const now = Date.now();
    const merge = mergeKey && this.lastMerge.key === mergeKey && now - this.lastMerge.time < MERGE_TIME;
    this.lastMerge = { key: mergeKey, time: now };
    if (!merge) {
      this.past.push(before);
      if (this.past.length > HISTORY) {
        this.past.shift();
      }
    }
    this.future.length = 0;
    this.replace(song);
  }

  protected undo(): void {
    const previous = this.past.pop();
    if (previous) {
      this.future.push(this.song());
      this.replace(previous);
    }
  }

  protected redo(): void {
    const next = this.future.pop();
    if (next) {
      this.past.push(this.song());
      this.replace(next);
    }
  }

  private replace(song: Song): void {
    this.songs.update(songs => songs.map(s => s.id === song.id ? song : s));
    this.engine.setSong(song);
    this.canUndo.set(this.past.length > 0);
    this.canRedo.set(this.future.length > 0);
    this.scheduleSave();
  }

  private resetHistory(): void {
    this.past.length = 0;
    this.future.length = 0;
    this.canUndo.set(false);
    this.canRedo.set(false);
  }

  private scheduleSave(): void {
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flushSave(), 300);
  }

  private flushSave(): void {
    clearTimeout(this.saveTimer);
    saveSongs({ songs: this.songs(), current: this.currentId(), use: this.use() });
  }

  // --- Helpers for the template ---

  protected color(stamp: Stamp): string {
    return INSTRUMENTS.find(i => i.id === stamp)?.color ?? '#33353f';
  }

  protected stepClass(step: number): string {
    const beatAlt = Math.floor(step / 4) % 2 === 1 ? ' alt' : '';
    const barStart = step % STEPS_PER_BAR === 0 && step !== this.visibleSteps()[0] ? ' bar-start' : '';
    return `cell${beatAlt}${barStart}`;
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent): void {
    if ((event.target as HTMLElement).closest('input, select, textarea')) {
      return;
    }
    const ctrl = event.ctrlKey || event.metaKey;
    if (event.key === ' ') {
      event.preventDefault();
      this.togglePlay();
    } else if (ctrl && (event.key === 'z' || event.key === 'Z')) {
      event.preventDefault();
      event.shiftKey ? this.redo() : this.undo();
    } else if (ctrl && event.key === 'y') {
      event.preventDefault();
      this.redo();
    } else if (event.key === 'Escape') {
      this.sheet.set(null);
    }
  }
}
