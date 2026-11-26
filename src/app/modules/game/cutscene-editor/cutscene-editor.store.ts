import { computed, effect, Injectable, signal } from "@angular/core";
import { readJson, writeJson } from "../../../core/shared/local-store";
import { newId } from "../../database-editor/shared/database";
import {
  CutBlock,
  CutKind,
  cutKind,
  Cutscene,
  cutsceneLength,
  CutsceneUse,
  CutTrack,
  FIXED_TRACKS,
  newBlock,
  newCharacterTrack,
  newCutscene,
  PLAYER_ACTOR,
} from "../shared/model/cutscene";
import { walkDuration, walkFrom } from "../shared/model/cutscene-eval";
import { CutsceneActor, CutsceneHost } from "./cutscene-host";
import {
  blockSummary,
  LabelContext,
  shortName,
  trackColor,
} from "./cutscene-labels";

/** The last cutscene opened on each map. */
const LAST_OPEN_KEY = "pk-cutscene-editor";
const UNDO_LIMIT = 100;
const SAVE_DELAY = 400;

export const snap = (t: number) => Math.round(t * 10) / 10;

/** A row of the timeline: a fixed track (maybe not made yet) or a character's. */
export interface TimelineRow {
  key: string;
  kind: CutTrack["kind"];
  label: string;
  color: string;
  track: CutTrack | undefined;
  actor?: string;
}

/**
 * The cutscene editor's state, shared by its parts (provided by GameCutsceneEditorComponent): the map's cutscenes,
 * the open one, the playhead, the selected block, the undo history, the saving and what the map shows.
 */
@Injectable()
export class CutsceneEditorStore {
  private host?: CutsceneHost;
  readonly cutscenes = signal<Cutscene[]>([]);
  readonly currentId = signal<string | null>(null);
  readonly cut = computed(
    () => this.cutscenes().find((c) => c.id === this.currentId()) ?? null
  );
  readonly length = computed(() => {
    const cut = this.cut();
    return cut ? cutsceneLength(cut) : 1;
  });

  readonly actors = signal<CutsceneActor[]>([]);
  readonly songs = signal<{ id: string; name: string }[]>([]);
  readonly objects = signal<{ id: string; label: string }[]>([]);
  readonly uses = signal<CutsceneUse[]>([]);
  readonly mapName = signal("");

  readonly playhead = signal(0);
  readonly playing = signal(false);
  /** Pixels per second on the timeline. */
  readonly zoom = signal(40);

  readonly selectedId = signal<string | null>(null);
  /** The track chosen: the selected block's, or the one whose name was touched. */
  readonly trackId = signal<string | null>(null);
  readonly selection = computed(() => {
    const cut = this.cut();
    const id = this.selectedId();
    if (!cut || !id) {
      return null;
    }
    for (const track of cut.tracks) {
      const block = track.blocks.find((b) => b.id === id);
      if (block) {
        return { track, block };
      }
    }
    return null;
  });

  /** A sheet over the timeline: adding a block, the map's cutscenes. */
  readonly sheet = signal<"add" | "list" | null>(null);
  /** Phone: the block's sheet put away while its point is chosen on the map. */
  readonly picking = signal(false);
  /** The selected block's point is chosen on the map (walk, cam-goto). */
  readonly pickTarget = computed(() => {
    const s = this.selection();
    return s && (s.block.kind === "walk" || s.block.kind === "cam-goto")
      ? s.block.id
      : null;
  });

  private past: Cutscene[][] = [];
  private future: Cutscene[][] = [];
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);
  private saveTimer?: ReturnType<typeof setTimeout>;
  private dirty = false;
  private frame = 0;

  readonly rows = computed<TimelineRow[]>(() => {
    const cut = this.cut();
    if (!cut) {
      return [];
    }
    const fixed = FIXED_TRACKS.map((f) => ({
      key: f.kind,
      kind: f.kind,
      label: f.label,
      color: trackColor(f.kind),
      track: cut.tracks.find((t) => t.kind === f.kind),
    }));
    const characters = cut.tracks
      .filter((t) => t.kind === "actor" && t.actor)
      .map((t) => ({
        key: t.id,
        kind: t.kind,
        label: this.actorName(t.actor),
        color: trackColor(t.kind, t.actor),
        track: t,
        actor: t.actor,
      }));
    return [...fixed, ...characters];
  });

  /** The actors without a track yet (« Ajouter un personnage »). */
  readonly freeActors = computed(() => {
    const used = new Set(this.cut()?.tracks.map((t) => t.actor) ?? []);
    return this.actors().filter((a) => !used.has(a.id));
  });

  private readonly labels: LabelContext = {
    actorName: (id) => this.actorName(id),
    songName: (id) => this.songs().find((s) => s.id === id)?.name ?? "?",
    objectName: (id) =>
      this.objects().find((o) => o.id === id)?.label ?? "objet absent",
    near: (x, z) => {
      const actors = this.host?.start().actors ?? {};
      for (const [id, at] of Object.entries(actors)) {
        if (Math.hypot(at.x - x, at.z - z) <= 24) {
          return this.actorName(id);
        }
      }
      return null;
    },
  };

  constructor() {
    // While a walk or a camera move is selected, the taps on the map give its point
    effect(() => {
      const id = this.pickTarget();
      if (!this.host) {
        return;
      }
      if (id) {
        this.host.pickGround((p) => {
          this.updateBlock(id, { x: p.x, z: p.z });
          this.picking.set(false);
        });
      } else {
        this.host.pickGround(null);
        this.picking.set(false);
      }
    });
  }

  init(host: CutsceneHost): void {
    this.host = host;
    this.mapName.set(host.mapName);
    this.actors.set(host.actors());
    this.songs.set(host.songs());
    this.objects.set(host.objects());
    this.uses.set(host.uses());
    const list = host.cutscenes();
    this.cutscenes.set(list);
    const last = readJson<Record<string, string>>(LAST_OPEN_KEY)?.[host.mapId];
    const open = list.find((c) => c.id === last) ?? list[0];
    this.currentId.set(open?.id ?? null);
    if (!open) {
      this.sheet.set("list");
    }
    this.preview();
  }

  actorName(id: string | undefined): string {
    const actor = this.actors().find((a) => a.id === id);
    if (actor) {
      return shortName(actor.label);
    }
    return id === PLAYER_ACTOR ? "Joueur" : "PNJ absent";
  }

  summary(block: CutBlock): string {
    return blockSummary(block, this.labels);
  }

  // ---------- Changes, undo, saving ----------

  private commit(list: Cutscene[], undo = true): void {
    if (undo) {
      this.snapshot();
    }
    this.cutscenes.set(list);
    this.dirty = true;
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.flush(), SAVE_DELAY);
    this.preview();
  }

  /** Keeps the cutscenes as they are now in the undo history. */
  snapshot(): void {
    this.past.push(this.cutscenes());
    if (this.past.length > UNDO_LIMIT) {
      this.past.shift();
    }
    this.future = [];
    this.canUndo.set(true);
    this.canRedo.set(false);
  }

  undo(): void {
    const previous = this.past.pop();
    if (!previous) {
      return;
    }
    this.future.push(this.cutscenes());
    this.restore(previous);
  }

  redo(): void {
    const next = this.future.pop();
    if (!next) {
      return;
    }
    this.past.push(this.cutscenes());
    this.restore(next);
  }

  private restore(list: Cutscene[]): void {
    this.commit(list, false);
    this.canUndo.set(this.past.length > 0);
    this.canRedo.set(this.future.length > 0);
    if (!list.some((c) => c.id === this.currentId())) {
      this.currentId.set(list[0]?.id ?? null);
    }
    if (!this.selection()) {
      this.selectedId.set(null);
    }
  }

  /** Saves now what is waiting. */
  flush(): void {
    clearTimeout(this.saveTimer);
    if (this.dirty && this.host) {
      this.dirty = false;
      this.host.save(this.cutscenes());
    }
  }

  /** The editor closes: saved, the map as it was. */
  close(): void {
    this.stop();
    this.flush();
    this.host?.pickGround(null);
    this.host?.preview(null, 0);
  }

  private updateCut(change: (cut: Cutscene) => Cutscene, undo = true): void {
    const id = this.currentId();
    if (!id) {
      return;
    }
    this.commit(
      this.cutscenes().map((c) => (c.id === id ? change(c) : c)),
      undo
    );
  }

  /** Changes a block (a walk's duration follows its way's length when its point or pace changes). */
  updateBlock(id: string, patch: Partial<CutBlock>, undo = true): void {
    this.updateCut(
      (cut) => ({
        ...cut,
        tracks: cut.tracks.map((track) =>
          track.blocks.some((b) => b.id === id)
            ? {
                ...track,
                blocks: track.blocks.map((b) =>
                  b.id === id ? this.withWalk(cut, track, b, patch) : b
                ),
              }
            : track
        ),
      }),
      undo
    );
  }

  private withWalk(
    cut: Cutscene,
    track: CutTrack,
    block: CutBlock,
    patch: Partial<CutBlock>
  ): CutBlock {
    const next = { ...block, ...patch };
    const way = "x" in patch || "z" in patch || "pace" in patch;
    if (next.kind === "walk" && way && track.actor && this.host) {
      next.duration = this.walkLength(cut, track.actor, next);
    }
    return next;
  }

  /** How long a walk takes along its way (from where its actor is then). */
  walkLength(cut: Cutscene, actor: string, block: CutBlock): number {
    if (!this.host) {
      return block.duration;
    }
    return walkDuration(walkFrom(cut, actor, block, this.host.start()), block);
  }

  // ---------- Blocks ----------

  select(id: string | null): void {
    this.selectedId.set(id);
    const s = this.selection();
    if (s) {
      this.trackId.set(s.track.id);
    }
    this.picking.set(false);
  }

  /** Adds a block of a sort at the playhead on its track (a character's: made if needed), selected. */
  addBlock(kind: CutKind, actor: string | null): void {
    const cut = this.cut();
    if (!cut) {
      return;
    }
    const meta = cutKind(kind);
    const block = newBlock(kind, this.playhead());
    let tracks = cut.tracks;
    let track =
      meta.track === "actor"
        ? tracks.find((t) => t.kind === "actor" && t.actor === actor)
        : tracks.find((t) => t.kind === meta.track);
    if (!track) {
      track =
        meta.track === "actor"
          ? newCharacterTrack(actor ?? PLAYER_ACTOR)
          : { id: newId("trk"), kind: meta.track, blocks: [] };
      tracks = [...tracks, track];
    }
    const trackId = track.id;
    this.updateCut((c) => ({
      ...c,
      tracks: tracks.map((t) =>
        t.id === trackId ? { ...t, blocks: [...t.blocks, block] } : t
      ),
    }));
    this.sheet.set(null);
    this.select(block.id);
    if (kind === "walk" || kind === "cam-goto") {
      this.picking.set(true);
    }
  }

  duplicateSelected(): void {
    const s = this.selection();
    if (!s) {
      return;
    }
    const copy: CutBlock = {
      ...s.block,
      id: newId("blk"),
      start: snap(s.block.start + s.block.duration),
    };
    this.updateCut((c) => ({
      ...c,
      tracks: c.tracks.map((t) =>
        t.id === s.track.id ? { ...t, blocks: [...t.blocks, copy] } : t
      ),
    }));
    this.select(copy.id);
  }

  removeSelected(): void {
    const s = this.selection();
    if (!s) {
      return;
    }
    this.updateCut((c) => ({
      ...c,
      tracks: c.tracks.map((t) =>
        t.id === s.track.id
          ? { ...t, blocks: t.blocks.filter((b) => b.id !== s.block.id) }
          : t
      ),
    }));
    this.select(null);
  }

  addCharacter(actor: string): void {
    const track = newCharacterTrack(actor);
    this.updateCut((c) => ({ ...c, tracks: [...c.tracks, track] }));
    this.trackId.set(track.id);
  }

  removeTrack(id: string): void {
    if (this.selection()?.track.id === id) {
      this.select(null);
    }
    this.updateCut((c) => ({
      ...c,
      tracks: c.tracks.filter((t) => t.id !== id),
    }));
  }

  // ---------- Playhead ----------

  setPlayhead(t: number): void {
    this.playhead.set(Math.max(0, t));
    this.preview();
  }

  preview(): void {
    this.host?.preview(this.cut(), this.playhead());
  }

  togglePlay(): void {
    if (this.playing()) {
      this.stop();
      return;
    }
    if (this.playhead() >= this.length() - 0.05) {
      this.setPlayhead(0);
    }
    this.playing.set(true);
    let last = performance.now();
    const step = (now: number) => {
      const t = this.playhead() + (now - last) / 1000;
      last = now;
      if (t >= this.length()) {
        this.setPlayhead(this.length());
        this.stop();
        return;
      }
      this.setPlayhead(t);
      this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  stop(): void {
    cancelAnimationFrame(this.frame);
    this.playing.set(false);
  }

  /** « Voir »: the cutscene played in the game from the playhead (from the start when at its end). */
  play(from = this.playhead()): void {
    const cut = this.cut();
    if (!cut || !this.host) {
      return;
    }
    this.stop();
    this.flush();
    this.host.play(cut, from >= this.length() - 0.05 ? 0 : from);
  }

  zoomBy(factor: number): void {
    this.zoom.update((z) => Math.min(320, Math.max(6, z * factor)));
  }

  // ---------- The map's cutscenes ----------

  open(id: string): void {
    this.stop();
    this.currentId.set(id);
    this.select(null);
    this.trackId.set(null);
    this.playhead.set(0);
    this.preview();
    if (this.host) {
      const last = readJson<Record<string, string>>(LAST_OPEN_KEY) ?? {};
      writeJson(LAST_OPEN_KEY, { ...last, [this.host.mapId]: id });
    }
  }

  create(): void {
    const names = new Set(this.cutscenes().map((c) => c.name));
    let n = this.cutscenes().length + 1;
    while (names.has(`Cinématique ${n}`)) {
      n++;
    }
    const cut = newCutscene(`Cinématique ${n}`);
    this.commit([...this.cutscenes(), cut]);
    this.open(cut.id);
  }

  duplicate(id: string): void {
    const cut = this.cutscenes().find((c) => c.id === id);
    if (!cut) {
      return;
    }
    const copy: Cutscene = {
      ...structuredClone(cut),
      id: newId("cut"),
      name: `${cut.name} (copie)`,
    };
    for (const track of copy.tracks) {
      track.id = newId("trk");
      for (const block of track.blocks) {
        block.id = newId("blk");
      }
    }
    const list = [...this.cutscenes()];
    list.splice(list.indexOf(cut) + 1, 0, copy);
    this.commit(list);
    this.open(copy.id);
  }

  remove(id: string): void {
    const list = this.cutscenes().filter((c) => c.id !== id);
    this.commit(list);
    if (this.currentId() === id) {
      if (list[0]) {
        this.open(list[0].id);
      } else {
        this.currentId.set(null);
        this.select(null);
        this.preview();
      }
    }
  }

  /** Changes the open cutscene's name or options. */
  setOptions(patch: Partial<Cutscene>): void {
    this.updateCut((c) => ({ ...c, ...patch }));
  }
}
