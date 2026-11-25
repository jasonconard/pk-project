import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import {
  LucideCheck,
  LucideDrum,
  LucideFileMusic,
  LucideX,
} from "@lucide/angular";
import { MidiFile } from "../shared/midi-file";
import {
  describeMidi,
  gmLabel,
  guessScale,
  ImportChoices,
  midiToSong,
} from "../shared/midi-song";
import {
  INSTRUMENTS,
  InstrumentId,
  MAX_BARS,
  ModeId,
  MODES,
  NOTE_NAMES,
  Song,
} from "../shared/song";

/**
 * The import window of a .mid file (Morceau → Importer un .mid): its tracks kept or not and the instrument each one
 * becomes, the bars kept (8 at most), the scale (guessed from the notes). « Importer » gives the new song.
 * Layout: design/music-editor.pen, « 5 · Portrait · Import MIDI ».
 */
@Component({
  selector: "app-midi-import",
  imports: [LucideCheck, LucideDrum, LucideFileMusic, LucideX],
  templateUrl: "./midi-import.component.html",
  styleUrl: "./midi-import.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MidiImportComponent {
  readonly file = input.required<MidiFile>();
  /** The file's name, without its .mid. */
  readonly name = input.required<string>();
  readonly imported = output<Song>();
  readonly closed = output<void>();

  protected readonly instruments = INSTRUMENTS;
  protected readonly info = computed(() => describeMidi(this.file()));
  protected readonly bpm = computed(() => Math.round(this.file().bpm));
  /** Tracks left out (by index). */
  protected readonly left = signal<ReadonlySet<number>>(new Set());
  /** Instruments changed by hand (track index → instrument). */
  private readonly picked = signal<ReadonlyMap<number, InstrumentId>>(
    new Map()
  );
  protected readonly startBar = signal(0);
  /** The scale chosen by hand ("tonic:mode"), else the one guessed. */
  private readonly scaleChoice = signal("");

  protected readonly starts = computed(() => {
    const bars = this.info().bars;
    return Array.from({ length: Math.max(1, bars - MAX_BARS + 1) }, (_, i) => ({
      value: i,
      label: `${i + 1} à ${Math.min(bars, i + MAX_BARS)} (sur ${bars})`,
    }));
  });

  protected readonly kept = computed(() => {
    const kept: ImportChoices["kept"] = new Map();
    for (const track of this.info().tracks) {
      if (!this.left().has(track.index)) {
        kept.set(
          track.index,
          track.drums
            ? "drums"
            : this.instrumentOf(track.index, track.instrument)
        );
      }
    }
    return kept;
  });

  protected readonly guessed = computed(() =>
    guessScale(this.file(), { kept: this.kept(), startBar: this.startBar() })
  );

  protected readonly scale = computed(() => {
    const [tonic, mode] = this.scaleChoice().split(":");
    return this.scaleChoice()
      ? { tonic: +tonic, mode: mode as ModeId }
      : this.guessed();
  });

  /** Every scale (12 tonics × the modes), the guessed one first. */
  protected readonly scales = computed(() => {
    const guess = this.guessed();
    const all = MODES.flatMap((mode) =>
      NOTE_NAMES.map((note, tonic) => ({
        value: `${tonic}:${mode.id}`,
        label: `${note} ${mode.label.toLowerCase()}`,
      }))
    );
    const key = `${guess.tonic}:${guess.mode}`;
    const found = all.find((s) => s.value === key)!;
    return [
      { value: key, label: `${found.label} (trouvée)` },
      ...all.filter((s) => s.value !== key),
    ];
  });

  protected readonly scaleValue = computed(
    () => `${this.scale().tonic}:${this.scale().mode}`
  );

  protected instrumentOf(index: number, fallback: InstrumentId | null) {
    return this.picked().get(index) ?? fallback ?? "lead";
  }

  protected colorOf(id: InstrumentId): string {
    return INSTRUMENTS.find((i) => i.id === id)?.color ?? "#e8e8ee";
  }

  protected gm(program: number): string {
    return gmLabel(program);
  }

  protected toggle(index: number, on: boolean): void {
    this.left.update((left) => {
      const next = new Set(left);
      if (on) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  protected pick(index: number, id: string): void {
    this.picked.update((all) => new Map(all).set(index, id as InstrumentId));
  }

  protected setStart(value: string): void {
    this.startBar.set(+value);
  }

  protected setScale(value: string): void {
    this.scaleChoice.set(value);
  }

  protected confirm(): void {
    if (this.kept().size === 0) {
      return;
    }
    this.imported.emit(
      midiToSong(this.file(), this.name(), {
        kept: this.kept(),
        startBar: this.startBar(),
        ...this.scale(),
      })
    );
  }
}
