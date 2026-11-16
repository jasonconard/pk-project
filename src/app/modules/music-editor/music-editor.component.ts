import { ChangeDetectionStrategy, Component, computed, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import {
  LucideAudioWaveform, LucideBell, LucideChevronDown, LucideClipboardPaste, LucideCopy, LucideChevronLeft, LucideDisc3, LucideDownload, LucideDynamicIcon,
  LucideEighthNote, LucideEraser, LucideFileMusic, LucideGuitar, LucideIcon, LucideKeyboardMusic, LucideMinus, LucidePlay,
  LucidePlus, LucideRedo2, LucideSlidersHorizontal, LucideSquare, LucideTrash, LucideUndo2, LucideWavesHorizontal, LucideX,
} from '@lucide/angular';
import { onAppVisibility } from '../../core/shared/app-visibility';
import { MusicEngine } from './shared/music-engine';
import {
  Channel, CHANNELS, degreeCount, degreeMidi, DRUM_PATTERNS, DRUMS, DrumHit, DrumId, INSTRUMENTS, InstrumentId, LOFI_PRESETS,
  LOFI_SETTINGS, lofiOf, LofiSettings, MAX_BARS, MAX_BPM, midiName, MIN_BPM, ModeId, MODES, modeOf, newSong, NOTE_NAMES,
  noteLength, scaleLabel, Song, SongNote, songLength, STEPS_PER_BAR, volumeOf,
} from './shared/song';
import { loadSongs, saveSongs } from './shared/song-storage';

type Stamp = InstrumentId | 'eraser';
type Sheet = 'scale' | 'song' | 'mix' | 'lofi';
/** Moves of one slider closer than this (ms) are one change in the history. */
const MERGE_TIME = 800;

const ICONS: Record<Stamp, LucideIcon> = {
  lead: LucideEighthNote, bell: LucideBell, pluck: LucideGuitar, bass: LucideAudioWaveform, pad: LucideWavesHorizontal,
  eraser: LucideEraser,
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
    NgTemplateOutlet, DecimalPipe, LucideCopy, LucideClipboardPaste, LucideEraser, LucideDynamicIcon, LucideChevronLeft, LucideChevronDown, LucideUndo2, LucideRedo2, LucidePlay, LucideSquare, LucideMinus,
    LucidePlus, LucideKeyboardMusic, LucideFileMusic, LucideSlidersHorizontal, LucideDisc3, LucideDownload, LucideX, LucideTrash,
  ],
  templateUrl: './music-editor.component.html',
  styleUrls: ['./music-editor.component.scss', './music-editor.sheets.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicEditorComponent {
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

  private readonly engine = new MusicEngine();
  private readonly stored = loadSongs();
  protected readonly songs = signal<Song[]>(this.stored.songs);
  protected readonly currentId = signal(this.stored.current);
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

  /** Back to the game: the page is loaded again (the game starts from scratch, like after the model editor). */
  protected backToGame(event: Event): void {
    event.preventDefault();
    this.stop();
    this.flushSave();
    location.hash = '#/';
    location.reload();
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
    saveSongs({ songs: this.songs(), current: this.currentId() });
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
