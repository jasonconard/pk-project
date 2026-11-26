import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  LucideBookOpen,
  LucideDoorOpen,
  LucideDynamicIcon,
  LucideEye,
  LucideHand,
  LucidePackageOpen,
  LucideSword,
  LucideShovel,
  LucideSprout,
  LucideDroplets,
  LucideWheat,
  LucideFootprints,
  LucideIcon,
  LucideMessageCircle,
} from "@lucide/angular";
import { KeyService } from "../../../core/shared/service/key.service";
import { TouchService } from "../../../core/shared/service/touch.service";
import { KeyCode } from "../../../core/shared/model/PressedKey";
import { haptic } from "../../../core/shared/haptics";
import { SequenceService } from "../shared/services/sequence.service";
import { GameAction } from "../shared/model/GameAction";

const ACTION_ICONS: Record<GameAction["kind"], LucideIcon> = {
  enter: LucideDoorOpen,
  talk: LucideMessageCircle,
  read: LucideBookOpen,
  look: LucideEye,
  open: LucidePackageOpen,
  use: LucideHand,
  hit: LucideSword,
  till: LucideShovel,
  plant: LucideSprout,
  water: LucideDroplets,
  harvest: LucideWheat,
  clear: LucideShovel,
};

type ControlButton = "run" | "action";

/**
 * The game's controls on the map, bottom right (the stick is on the left): on a touch screen the Courir button (held)
 * and the action button, shown with what it does when there is something in front of the player (« Entrer »,
 * « Parler »…); with a keyboard, the same action as a prompt over the player (« E Entrer · Labo »).
 */
@Component({
  selector: "game-map-controls",
  imports: [LucideDynamicIcon, LucideFootprints],
  templateUrl: "./map-controls.component.html",
  styleUrl: "./map-controls.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapControlsComponent {
  private readonly keyService = inject(KeyService);
  private readonly touchService = inject(TouchService);
  private readonly sequenceService = inject(SequenceService);

  readonly action = input<GameAction | null>(null);

  protected readonly touch = computed(
    () => this.touchService.isTouchDevice() && this.touchService.gameControls()
  );
  /** A message is shown: it takes the taps and the keys. */
  protected readonly message = computed(() => !!this.sequenceService.message());
  protected readonly actionIcon = computed(
    () => ACTION_ICONS[this.action()?.kind ?? "look"]
  );
  protected readonly pushed = signal<ControlButton[]>([]);

  constructor() {
    // No finger left on the screen: no button can stay held (a lost touchend)
    const releaseAll = (e: TouchEvent) =>
      e.touches.length === 0 && this.releaseAll();
    window.addEventListener("touchend", releaseAll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchcancel", releaseAll, {
      capture: true,
      passive: true,
    });
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("touchend", releaseAll, { capture: true });
      window.removeEventListener("touchcancel", releaseAll, { capture: true });
      this.releaseAll();
    });
  }

  protected press(button: ControlButton, event: Event): void {
    event.preventDefault();
    if (this.pushed().includes(button)) {
      return;
    }
    haptic("light");
    this.pushed.update((buttons) => [...buttons, button]);
    this.keyService.setKeyDown(
      button === "run" ? KeyCode.run : KeyCode.confirm
    );
  }

  protected release(button: ControlButton, event?: Event): void {
    event?.preventDefault();
    if (!this.pushed().includes(button)) {
      return;
    }
    this.pushed.update((buttons) => buttons.filter((b) => b !== button));
    this.keyService.setKeyUp(button === "run" ? KeyCode.run : KeyCode.confirm);
  }

  private releaseAll(): void {
    this.release("run");
    this.release("action");
  }
}
