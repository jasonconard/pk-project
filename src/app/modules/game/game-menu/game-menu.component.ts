import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  LucideBackpack,
  LucideCalendarDays,
  LucideCamera,
  LucideChevronDown,
  LucideChevronRight,
  LucideCloudSun,
  LucideDownload,
  LucideDynamicIcon,
  LucideFolderArchive,
  LucideGauge,
  LucideHeartHandshake,
  LucideIcon,
  LucideMap,
  LucideMaximize,
  LucideMinimize,
  LucideSave,
  LucideShare2,
  LucideSparkles,
  LucideUpload,
  LucideUsers,
  LucideVariable,
  LucideVolume2,
  LucideVolumeX,
  LucideX,
} from "@lucide/angular";
import { GameService } from "../shared/services/game.service";
import { CoreService } from "../../../core/shared/service/core.service";
import { KeyService } from "../../../core/shared/service/key.service";
import { QUALITY_CHOICES, QualityMode } from "../shared/model/Quality";
import {
  applyProject,
  collectProject,
  projectFileBlob,
  ProjectFile,
  readProjectFile,
  SHARES_PROJECT,
  shareProjectFile,
  summarize,
} from "../shared/services/project-file";
import { downloadFile } from "../shared/util/ts-source";
import {
  hapticsEnabled,
  hapticsSupported,
  setHapticsEnabled,
} from "../../../core/shared/haptics";
import { isTyping } from "../../../core/shared/typing";

/** An entry of the game's own menus: each one comes with its tool (docs/idees.md), greyed until then. */
interface MenuEntry {
  icon: LucideIcon;
  label: string;
  /** What the tool brings, shown in the tooltip. */
  soon: string;
  /** What it opens; none yet: greyed. */
  action?: "saves";
}

const ENTRIES: MenuEntry[] = [
  { icon: LucideUsers, label: "Équipe", soon: "L'équipe et ses compétences" },
  { icon: LucideBackpack, label: "Sac", soon: "Les objets trouvés et achetés" },
  {
    icon: LucideHeartHandshake,
    label: "Liens",
    soon: "Les liens avec les habitants et l'équipe",
  },
  {
    icon: LucideCalendarDays,
    label: "Agenda",
    soon: "Les jours, les activités, les donjons ouverts",
  },
  { icon: LucideMap, label: "Carte", soon: "La carte du monde" },
  {
    icon: LucideSave,
    label: "Sauver",
    soon: "Sauver ou charger la partie",
    action: "saves",
  },
];

/**
 * Game menu (button top right, or Escape): the game's menus to come (greyed), the quick switches (full screen,
 * sound), and the settings: ambiance (unfolds the tools under the clock), graphics quality, the game project (export /
 * import every creation as a `.pk` file), the variables test, what's new.
 * A sheet from the bottom on phones in portrait, a panel on the right otherwise.
 */
@Component({
  selector: "game-menu",
  imports: [
    LucideDynamicIcon,
    LucideX,
    LucideMaximize,
    LucideMinimize,
    LucideVolume2,
    LucideVolumeX,
    LucideCamera,
    LucideCloudSun,
    LucideGauge,
    LucideSparkles,
    LucideChevronRight,
    LucideChevronDown,
    LucideFolderArchive,
    LucideDownload,
    LucideShare2,
    LucideUpload,
    LucideVariable,
  ],
  templateUrl: "./game-menu.component.html",
  styleUrl: "./game-menu.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMenuComponent {
  private readonly gameService = inject(GameService);
  private readonly coreService = inject(CoreService);

  /** Installed version (package.json). */
  readonly version = input.required<string>();
  readonly closed = output<void>();
  /** Ambiance: the menu closes, the tools unfold under the clock. */
  readonly ambiance = output<void>();
  readonly releaseNotes = output<void>();
  /** The saved games (Sauver): the menu closes, the dialog opens. */
  readonly saves = output<void>();
  /** The variables test panel: the menu closes, the panel opens. */
  readonly variablesTest = output<void>();

  protected readonly entries = ENTRIES;
  protected readonly hud = this.gameService.hud;
  /** Opened from the editor (Réglages): the game's entries wait for the game. */
  protected readonly editing = computed(() => !!this.hud()?.editMode);
  protected readonly fullScreened = this.coreService.fullScreened;
  protected readonly fullScreenSupported = this.coreService.fullScreenSupported;
  protected readonly soundVolume = this.gameService.soundVolume;
  protected readonly soundMuted = this.gameService.soundMuted;
  protected readonly soundPercent = computed(() =>
    Math.round(this.soundVolume() * 100)
  );
  protected readonly quality = this.gameService.quality;
  protected readonly qualityChoices = QUALITY_CHOICES;
  protected readonly qualityLabel = computed(
    () => QUALITY_CHOICES.find((q) => q.mode === this.quality())?.label ?? ""
  );
  /** The graphics settings are unfolded. */
  protected readonly qualityOpen = signal(false);
  /** The game project's actions are unfolded. */
  protected readonly projectOpen = signal(false);
  /** Android app: the project is sent with the share sheet instead of downloaded. */
  protected readonly sharesProject = SHARES_PROJECT;
  protected readonly projectBusy = signal(false);
  protected readonly projectMessage = signal("");
  /** A project file read, waiting for the player to confirm it replaces every creation. */
  protected readonly pendingImport = signal<{
    project: ProjectFile;
    label: string;
  } | null>(null);
  /** What this device holds (« 3 cartes · 12 modèles · 4 musiques · 85 ko »), read when the project unfolds. */
  protected readonly deviceSummary = signal("");
  protected readonly hapticsSupported = hapticsSupported;
  protected readonly hapticsEnabled = hapticsEnabled;

  constructor() {
    // Held keys would stay pressed (their keyup won't reach the game while the menu is open)
    inject(KeyService).clearKeys();
    // Capture phase: before the game, which also uses Escape; the game's keys don't reach it while the menu is open
    inject(EscapeService).whileAlive(() => this.closed.emit());
    const onKeyDown = (ev: KeyboardEvent) => {
      if (!(ev.target instanceof HTMLButtonElement || isTyping(ev))) {
        ev.stopPropagation();
      }
    };
    const onKeyUp = (ev: KeyboardEvent) => ev.stopPropagation();
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("keyup", onKeyUp, true);
    });
  }

  protected toggleFullScreen(): void {
    this.coreService.toggleFullScreen();
  }

  protected toggleMute(): void {
    this.gameService.setSound(this.soundVolume(), !this.soundMuted());
  }

  protected setQuality(mode: QualityMode): void {
    this.gameService.setQuality(mode);
  }

  protected setHaptics(event: Event): void {
    setHapticsEnabled((event.target as HTMLInputElement).checked);
  }

  protected setDiagnostics(event: Event): void {
    this.gameService.setDiagnostics((event.target as HTMLInputElement).checked);
  }

  protected openEntry(entry: MenuEntry): void {
    if (entry.action === "saves") {
      this.saves.emit();
    }
  }

  protected entryTitle(entry: MenuEntry): string {
    if (!entry.action) {
      return `${entry.soon} : bientôt`;
    }
    return this.editing() ? `${entry.soon} : depuis le jeu` : entry.soon;
  }

  protected toggleProject(): void {
    this.projectOpen.set(!this.projectOpen());
    if (this.projectOpen()) {
      void this.readDeviceSummary();
    }
  }

  private async readDeviceSummary(): Promise<void> {
    try {
      const project = await collectProject(this.version());
      const { blob } = await projectFileBlob(project);
      this.deviceSummary.set(
        `${projectLabel(project, false)} · ${sizeLabel(blob)}`
      );
    } catch {
      this.deviceSummary.set("");
    }
  }

  protected async exportProject(): Promise<void> {
    this.projectBusy.set(true);
    this.projectMessage.set("");
    try {
      const project = await collectProject(this.version());
      const { name, blob } = await projectFileBlob(project);
      if (SHARES_PROJECT) {
        if (!(await shareProjectFile(name, blob))) {
          this.projectMessage.set("Envoi annulé.");
          return;
        }
      } else {
        downloadFile(name, blob);
      }
      this.projectMessage.set(
        `${SHARES_PROJECT ? "Envoyé" : "Exporté"} : ${name} (${projectLabel(project, false)}, ${sizeLabel(blob)})`
      );
    } catch {
      this.projectMessage.set("L'export a échoué.");
    } finally {
      this.projectBusy.set(false);
    }
  }

  protected async pickProject(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ""; // the same file can be picked again
    if (!file) {
      return;
    }
    this.projectMessage.set("");
    try {
      const project = await readProjectFile(file);
      this.pendingImport.set({
        project,
        label: `${projectLabel(project)} · ${sizeLabel(file)}`,
      });
    } catch (e) {
      this.projectMessage.set((e as Error).message);
    }
  }

  protected async confirmImport(): Promise<void> {
    const pending = this.pendingImport();
    if (!pending) {
      return;
    }
    this.projectBusy.set(true);
    try {
      await applyProject(pending.project);
      this.projectMessage.set("Projet importé, le jeu redémarre…");
      location.reload(); // every service holds the old project
    } catch (e) {
      this.projectMessage.set((e as Error).message);
      this.pendingImport.set(null);
      this.projectBusy.set(false);
    }
  }
}

/** « 3 cartes · 12 modèles · 4 musiques » (+ « · du 19/11/2026 »). */
function projectLabel(project: ProjectFile, withDate = true): string {
  const s = summarize(project);
  const count = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;
  const date = new Date(s.savedAt).toLocaleDateString("fr-FR");
  const label = `${count(s.maps, "carte")} · ${count(s.models, "modèle")} · ${count(s.songs, "musique")} · ${count(s.variables, "variable")}${s.database ? " · base de données" : ""}`;
  return withDate ? `${label} · du ${date}` : label;
}

/** Size of a `.pk` file: « 85 ko », « 1,2 Mo ». */
function sizeLabel(blob: Blob): string {
  const ko = blob.size / 1024;
  return ko < 1000
    ? `${Math.max(1, Math.round(ko))} ko`
    : `${(ko / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}
