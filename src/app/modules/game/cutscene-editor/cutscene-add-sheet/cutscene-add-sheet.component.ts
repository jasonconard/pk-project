import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from "@angular/core";
import { LucideDynamicIcon, LucideX } from "@lucide/angular";
import { CUT_KINDS, CutKind, PLAYER_ACTOR } from "../../shared/model/cutscene";
import { CutsceneEditorStore } from "../cutscene-editor.store";
import {
  GROUP_COLORS,
  kindIcon,
  PLAYER_COLOR,
  seconds,
} from "../cutscene-labels";

const GROUPS = ["Caméra", "Personnages", "Écran", "Son et le reste"] as const;

/**
 * « Ajouter à 4,2 s »: the blocks' sorts by group. A character's block goes on the chosen track's character, else
 * on the one picked in « Pour : » (its track made if needed).
 */
@Component({
  selector: "cutscene-add-sheet",
  imports: [LucideDynamicIcon, LucideX],
  templateUrl: "./cutscene-add-sheet.component.html",
  styleUrl: "./cutscene-add-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CutsceneAddSheetComponent {
  protected readonly store = inject(CutsceneEditorStore);
  protected readonly seconds = seconds;
  protected readonly kindIcon = kindIcon;
  protected readonly playerColor = PLAYER_COLOR;
  protected readonly PLAYER = PLAYER_ACTOR;
  protected readonly groups = GROUPS.map((name) => ({
    name,
    color: GROUP_COLORS[name],
    kinds: CUT_KINDS.filter((k) => k.group === name),
  }));

  /** The character the « Personnages » blocks are for: the chosen track's, else the player. */
  protected readonly actor = linkedSignal(() => {
    const id = this.store.trackId();
    const track = this.store.cut()?.tracks.find((t) => t.id === id);
    return track?.kind === "actor" && track.actor
      ? track.actor
      : (this.store.actors()[0]?.id ?? PLAYER_ACTOR);
  });
  protected readonly actorName = computed(() =>
    this.store.actorName(this.actor())
  );

  protected add(kind: CutKind): void {
    this.store.addBlock(kind, this.actor());
  }
}
