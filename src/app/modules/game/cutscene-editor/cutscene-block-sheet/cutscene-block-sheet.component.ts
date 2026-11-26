import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import {
  LucideCopy,
  LucideDroplet,
  LucideDynamicIcon,
  LucideEllipsis,
  LucideHeart,
  LucideIcon,
  LucideImagePlus,
  LucideLightbulb,
  LucideMapPin,
  LucideMinus,
  LucideMusic,
  LucidePlay,
  LucidePlus,
  LucideTrash,
  LucideX,
  LucideZap,
} from "@lucide/angular";
import { DAY_TIMES } from "../../../database-editor/shared/database";
import { EventEditorData } from "../../event-editor/event-editor-data";
import {
  CUT_DIRS,
  CUT_EMOTES,
  CUT_PACES,
  CutBlock,
  CutEmote,
  cutKind,
  FIXED_TRACKS,
} from "../../shared/model/cutscene";
import { portraitRef } from "../../shared/model/ObjectEvent";
import { playSound, SOUND_CHOICES } from "../../shared/services/sfx";
import { WEATHER_CHOICES } from "../../shared/weather/Weather";
import { CutsceneEditorStore, snap } from "../cutscene-editor.store";
import {
  cellLabel,
  decimal,
  kindIcon,
  seconds,
  trackColor,
} from "../cutscene-labels";

const EMOTE_ICONS: Partial<Record<CutEmote, LucideIcon>> = {
  heart: LucideHeart,
  music: LucideMusic,
  dots: LucideEllipsis,
  anger: LucideZap,
  sweat: LucideDroplet,
  idea: LucideLightbulb,
};

const MODES: { id: NonNullable<CutBlock["mode"]>; label: string }[] = [
  { id: "play", label: "Jouer" },
  { id: "back", label: "Revenir" },
  { id: "loop", label: "Boucle" },
  { id: "stop", label: "Arrêter" },
];

const STRENGTHS = [
  { id: 1, label: "Légère" },
  { id: 2, label: "Forte" },
  { id: 3, label: "Très forte" },
];

/**
 * The selected block's sheet (a bottom sheet on a phone, the right panel on a wide screen): its head, « Voir d'ici »,
 * Dupliquer, Supprimer, then its settings by sort, its start and duration.
 */
@Component({
  selector: "cutscene-block-sheet",
  imports: [
    NgTemplateOutlet,
    LucideCopy,
    LucideDynamicIcon,
    LucideImagePlus,
    LucideMapPin,
    LucideMinus,
    LucidePlay,
    LucidePlus,
    LucideTrash,
    LucideX,
  ],
  templateUrl: "./cutscene-block-sheet.component.html",
  styleUrl: "./cutscene-block-sheet.component.scss",
  // (the portraits a message may show, as in the event window)
  providers: [EventEditorData],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CutsceneBlockSheetComponent {
  protected readonly store = inject(CutsceneEditorStore);
  protected readonly data = inject(EventEditorData);
  protected readonly portraitRef = portraitRef;
  protected readonly seconds = seconds;
  protected readonly decimal = decimal;
  protected readonly cellLabel = cellLabel;
  protected readonly kindIcon = kindIcon;
  protected readonly paces = CUT_PACES;
  protected readonly dirs = CUT_DIRS;
  protected readonly emotes = CUT_EMOTES;
  protected readonly emoteIcons = EMOTE_ICONS;
  protected readonly modes = MODES;
  protected readonly strengths = STRENGTHS;
  protected readonly sounds = SOUND_CHOICES;
  protected readonly weathers = WEATHER_CHOICES;
  protected readonly moments = DAY_TIMES;

  protected readonly selection = this.store.selection;
  protected readonly color = computed(() => {
    const s = this.selection();
    return s ? trackColor(s.track.kind, s.track.actor) : "#fafafa";
  });
  protected readonly title = computed(() => {
    const s = this.selection();
    if (!s) {
      return "";
    }
    const track =
      s.track.kind === "actor"
        ? this.store.actorName(s.track.actor)
        : FIXED_TRACKS.find((f) => f.kind === s.track.kind)?.label;
    return `${track} · ${cutKind(s.block.kind).label}`;
  });
  protected readonly trackName = computed(() => this.title().split(" · ")[0]);

  /** A walk's duration along its way, if its point is chosen. */
  protected readonly pathDuration = computed(() => {
    const s = this.selection();
    const cut = this.store.cut();
    if (
      !s ||
      !cut ||
      s.block.kind !== "walk" ||
      s.block.x === undefined ||
      !s.track.actor
    ) {
      return null;
    }
    return this.store.walkLength(cut, s.track.actor, s.block);
  });

  protected set(patch: Partial<CutBlock>): void {
    const s = this.selection();
    if (s) {
      this.store.updateBlock(s.block.id, patch);
    }
  }

  /** While a slider moves: one undo step for the whole move. */
  protected live(patch: Partial<CutBlock>): void {
    const s = this.selection();
    if (s) {
      this.store.updateBlock(s.block.id, patch, false);
    }
  }

  protected setStart(value: number): void {
    this.set({ start: Math.max(0, snap(value)) });
  }

  protected setDuration(value: number): void {
    this.set({ duration: Math.max(0.2, snap(value)) });
  }

  /** Where a character looks: "" nobody, "d:<dir>" a direction, "a:<actor>" someone. */
  protected look(block: CutBlock): string {
    if (block.target) {
      return `a:${block.target}`;
    }
    return block.dir === undefined ? "" : `d:${block.dir}`;
  }

  protected setLook(value: string): void {
    if (value.startsWith("a:")) {
      this.set({ target: value.slice(2), dir: undefined });
    } else if (value.startsWith("d:")) {
      this.set({ dir: Number(value.slice(2)), target: undefined });
    } else {
      this.set({ dir: undefined, target: undefined });
    }
  }

  /** « Plus près ×1,7 », « Plus loin ×1,5 ». */
  protected zoomLabel(zoom: number): string {
    if (Math.abs(zoom - 1) < 0.01) {
      return "Comme d'habitude";
    }
    return zoom < 1
      ? `Plus près ×${decimal(1 / zoom)}`
      : `Plus loin ×${decimal(zoom)}`;
  }

  protected setPortrait(pic: string): void {
    const s = this.selection();
    const portrait = this.data.portraits.find((p) => p.pic === pic);
    const name =
      portrait && !s?.block.name?.trim() ? { name: portrait.label } : {};
    this.set({ pic: pic || undefined, ...name });
  }

  protected trySound(id: string | undefined): void {
    if (id) {
      playSound(id, true);
    }
  }

  protected value(ev: Event): string {
    return (ev.target as HTMLInputElement).value;
  }
}
