import { LucideImageUp, LucideTrash } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { StepperComponent } from "../stepper/stepper.component";
import {
  ANIM_FRAME_MAX,
  ANIM_MS_MAX,
  ANIM_MS_MIN,
  newSkillAnim,
  SKILL_ANIM_MODES,
  SkillAnim,
  SkillAnimMode,
  withFrames,
} from "../shared/skill-anim";
import { SkillAnimPreviewComponent } from "./skill-anim-preview.component";
import {
  playSound,
  SOUND_CHOICES,
  SoundId,
} from "../../game/shared/services/sfx";

/**
 * An effect animation's fields (a skill's, a weapon type's): its preview, how it plays, its sound, its frames and
 * timing, import / change / remove its picture. `changed` gives the new animation (undefined: removed).
 */
@Component({
  selector: "db-anim-field",
  imports: [
    StepperComponent,
    SkillAnimPreviewComponent,
    LucideImageUp,
    LucideTrash,
  ],
  templateUrl: "./anim-field.component.html",
  styleUrl: "./anim-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimFieldComponent {
  readonly anim = input<SkillAnim | undefined>();
  /** The ways it may play (a weapon: not on a zone). */
  readonly modes = input<SkillAnimMode[]>(SKILL_ANIM_MODES.map((m) => m.id));
  /** What lands on its hit frame, for the note (« Les dégâts et les soins »). */
  readonly lands = input("Les dégâts et les soins tombent");
  readonly changed = output<SkillAnim | undefined>();

  protected readonly animModes = computed(() =>
    SKILL_ANIM_MODES.filter((m) => this.modes().includes(m.id))
  );
  protected readonly sounds = SOUND_CHOICES;
  protected readonly animFrameMax = ANIM_FRAME_MAX;
  protected readonly animMsMin = ANIM_MS_MIN;
  protected readonly animMsMax = ANIM_MS_MAX;

  /** The sound when its effect starts (none: silent); heard at once in the editor. */
  protected setSound(sound: string): void {
    const anim = this.anim();
    if (!anim) {
      return;
    }
    const next: SkillAnim = { ...anim, sound: sound as SoundId };
    if (sound) {
      playSound(sound, true);
    } else {
      delete next.sound;
    }
    this.changed.emit(next);
  }

  /** A PNG for its effect animation: frames cut and counted (a first one: the first way it may play). */
  protected async import(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) {
      return;
    }
    const image = await readDataUrl(file);
    const img = await loadImage(image);
    const anim = this.anim();
    this.changed.emit(
      anim
        ? withFrames(img, { ...anim, image }, anim.frame.w, anim.frame.h)
        : newSkillAnim(img, image, this.modes()[0] ?? "target")
    );
  }

  protected remove(): void {
    this.changed.emit(undefined);
  }

  /** Another way to play it: a projectile reads its second row (the frames are counted again). */
  protected async setMode(mode: string): Promise<void> {
    const anim = this.anim();
    if (!anim) {
      return;
    }
    const img = await loadImage(anim.image);
    const next = { ...anim, mode: mode as SkillAnimMode };
    const fresh = anim.mode !== "projectile" && mode === "projectile";
    this.changed.emit(
      fresh
        ? newSkillAnim(img, anim.image, "projectile")
        : withFrames(img, next, anim.frame.w, anim.frame.h)
    );
  }

  /** Another frame size: the frames are counted again. */
  protected async setFrame(change: Partial<SkillAnim["frame"]>): Promise<void> {
    const anim = this.anim();
    if (!anim) {
      return;
    }
    const img = await loadImage(anim.image);
    const w = clampSize(change.w ?? anim.frame.w);
    const h = clampSize(change.h ?? anim.frame.h);
    this.changed.emit(withFrames(img, anim, w, h));
  }

  protected setTiming(change: Partial<Pick<SkillAnim, "ms" | "hit">>): void {
    const anim = this.anim();
    if (anim) {
      this.changed.emit({ ...anim, ...change });
    }
  }
}

function clampSize(n: number): number {
  return Math.min(ANIM_FRAME_MAX, Math.max(8, Math.round(n)));
}

function readDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
