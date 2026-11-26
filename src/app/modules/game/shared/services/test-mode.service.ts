import { computed, inject, Service, signal } from "@angular/core";
import {
  readJson,
  removeKey,
  writeJson,
} from "../../../../core/shared/local-store";
import { version } from "../../../../../../package.json";
import { DayTime } from "../../../database-editor/shared/database";
import { Cutscene } from "../model/cutscene";
import { gameCalendar, momentAt } from "../model/game-calendar";
import { ObjectEvent } from "../model/ObjectEvent";
import {
  applyTest,
  freeTestName,
  loadTests,
  saveTests,
  testFromGame,
  TestPreset,
  TestSpot,
} from "../model/test-preset";
import { captureGame, GameSave, restoreProgress } from "./game-saves";
import { GameService } from "./game.service";
import { SequenceService } from "./sequence.service";
import { BattleService } from "../../../battle/shared/battle.service";
import { CutsceneService } from "./cutscene.service";

/** What a test plays once the player is there: nothing (walk around), an object's event, a cutscene. */
export type TestTarget =
  | { kind: "here" }
  | { kind: "event"; chunkId: string; buildingId: string; event: ObjectEvent }
  | { kind: "cutscene"; cutscene: Cutscene };

/** A test asked (the sheet « Tester ici » open): where, what it plays, how it is shown. */
export interface TestRequest {
  spot: TestSpot;
  /** « Ville · case 12, 8 », « Le joueur apparaît à côté du maire… ». */
  place: string;
  target: TestTarget;
}

/** The test being played: the game set aside, and how to start it again. */
interface TestRun {
  /** The game before the test (where, when, the progress): it comes back when the test ends. */
  save: GameSave;
  /** Started from the map editor (it opens again at the end). */
  fromEditor: boolean;
  /** The named test (null: « Comme ma partie », the game's own state). */
  testId: string | null;
  name: string;
  spot: TestSpot;
  /** « Comme ma partie »: the time and weather it started with. */
  time: { hour: number; day: number; weather: string };
  target: TestTarget;
}

/** The test being played is kept in the browser: closing the app during a test gives the game back at the next start. */
const RUN_KEY = "pk-test-run";

/**
 * The mode test (design/main-view.pen, Mode test): starts a test (a named one, or « Comme ma partie ») at a spot, plays
 * its target (an event, a cutscene), and gives the game back as it was when the player quits (nothing of the test is
 * kept). The named tests: `pk-tests` (see test-preset.ts).
 */
@Service()
export class TestModeService {
  private readonly gameService = inject(GameService);
  private readonly sequenceService = inject(SequenceService);
  private readonly battleService = inject(BattleService);
  private readonly cutsceneService = inject(CutsceneService);

  private readonly testsState = signal(loadTests());
  /** The named tests. */
  readonly tests = this.testsState.asReadonly();

  private readonly runState = signal<TestRun | null>(
    readJson<TestRun>(RUN_KEY)
  );
  /** A test is being played: its name (« Comme ma partie » or the named test's). */
  readonly running = computed(() => {
    const run = this.runState();
    return run
      ? { name: run.name, testId: run.testId, fromEditor: run.fromEditor }
      : null;
  });

  /** The sheet « Tester ici » (a test asked from the editor, an event or a cutscene), null: closed. */
  readonly request = signal<TestRequest | null>(null);
  /** The test whose settings window is open, null: closed. */
  readonly editing = signal<string | null>(null);
  /** Waiting for the tap on the map that gives the point of « Tester » (editor). */
  readonly picking = signal(false);

  // --- The named tests ---

  /** A new test: the game as it is now, at this spot (the player's when none). */
  addTest(spot?: TestSpot): TestPreset | null {
    const where = spot ?? this.playerSpot();
    if (!where) {
      return null;
    }
    const test = testFromGame(
      freeTestName(this.tests()),
      where,
      this.timeNow()
    );
    this.store([...this.tests(), test]);
    return test;
  }

  updateTest(test: TestPreset): void {
    this.store(this.tests().map((t) => (t.id === test.id ? test : t)));
  }

  /** « Ma partie »: the test takes the game's state now (it keeps its name and where it starts). */
  resetToGame(id: string): void {
    const test = this.tests().find((t) => t.id === id);
    if (!test) {
      return;
    }
    const fresh = testFromGame(
      test.name,
      { map: test.map, pos: test.pos },
      this.timeNow()
    );
    this.updateTest({ ...fresh, id: test.id });
  }

  /** The game now as a test (« Comme ma partie »: what it shows), not kept. */
  gameAsTest(spot: TestSpot): TestPreset {
    return testFromGame("Comme ma partie", spot, this.timeNow());
  }

  removeTest(id: string): void {
    this.store(this.tests().filter((t) => t.id !== id));
    if (this.editing() === id) {
      this.editing.set(null);
    }
  }

  /** The tests read again (a project file imported). */
  reload(): void {
    this.testsState.set(loadTests());
  }

  private store(tests: TestPreset[]): void {
    this.testsState.set(tests);
    saveTests(tests);
  }

  // --- Asking a test ---

  /** The editor's Tester: the next tap on the map gives where the player appears, then the sheet opens. */
  pickHere(): void {
    this.request.set(null);
    this.picking.set(true);
    this.gameService.pickPoint((point) => {
      this.picking.set(false);
      this.gameService.pickPoint(null);
      const map = this.playerSpot()?.map;
      if (!map) {
        return;
      }
      const pos = { x: point.x, z: point.z };
      this.request.set({
        spot: { map, pos },
        place: this.gameService.placeLabel(pos),
        target: { kind: "here" },
      });
    });
  }

  cancelPick(): void {
    this.picking.set(false);
    this.gameService.pickPoint(null);
  }

  /** An event's Tester: next to its object (the selected one), the event plays at once. */
  askEvent(event: ObjectEvent, objectName: string): void {
    const object = this.gameService.selectedObject();
    const spot = object
      ? this.gameService.besideObject(object.chunkId, object.buildingId)
      : null;
    if (!object || !spot) {
      return;
    }
    this.request.set({
      spot,
      place: `Le joueur apparaît à côté de ${objectName || "l'objet"}, puis l'événement se joue.`,
      target: { kind: "event", ...object, event },
    });
  }

  /** A cutscene's « Tester avec des réglages »: where the player is, the cutscene plays at once. */
  askCutscene(cutscene: Cutscene): void {
    const spot = this.playerSpot();
    if (!spot) {
      return;
    }
    this.request.set({
      spot,
      place: `« ${cutscene.name} » se joue, puis tu peux continuer à jouer.`,
      target: { kind: "cutscene", cutscene },
    });
  }

  // --- Playing a test ---

  /** Starts a test (null: « Comme ma partie »): the game is set aside, the test's state taken, its target played. */
  start(testId: string | null, request?: TestRequest): void {
    const test = this.tests().find((t) => t.id === testId) ?? null;
    const spot =
      request?.spot ?? (test ? { map: test.map, pos: test.pos } : null);
    const here = this.playerSpot();
    if (!spot || !here) {
      return;
    }
    this.request.set(null);
    this.editing.set(null);
    // (a second test while one is played: the game set aside stays the first one's)
    const save =
      this.runState()?.save ??
      captureGame(
        here,
        {
          hour: this.gameService.hour(),
          day: this.gameService.day(),
          weather: this.gameService.weather(),
        },
        version
      );
    const run: TestRun = {
      save,
      fromEditor: this.runState()?.fromEditor ?? this.gameService.isEditing(),
      testId: test?.id ?? null,
      name: test?.name ?? "Comme ma partie",
      spot,
      time: {
        hour: this.gameService.hour(),
        day: this.gameService.day(),
        weather: this.gameService.weather(),
      },
      target: request?.target ?? { kind: "here" },
    };
    this.setRun(run);
    this.play(run);
  }

  /** Recommencer: the test from its start again. */
  restart(): void {
    const run = this.runState();
    if (run) {
      this.play(run);
    }
  }

  /** Quitter: the game comes back as it was before the test (back to the editor when it started there). */
  quit(): void {
    const run = this.runState();
    if (!run) {
      return;
    }
    this.stopScene();
    this.setRun(null);
    restoreProgress(run.save);
    this.gameService.restoreSpot(
      run.save.map,
      run.save.pos,
      run.save.hour,
      run.save.weather,
      run.save.day
    );
    this.gameService.refreshNpcs();
    if (run.fromEditor) {
      this.gameService.setEditing(true);
    }
  }

  /**
   * At the start: a test was being played when the app closed (its state is in the browser): the game set aside comes
   * back. Called once the map is loaded.
   */
  recover(): void {
    if (this.runState()) {
      this.quit();
    }
  }

  private play(run: TestRun): void {
    this.stopScene();
    const test = this.tests().find((t) => t.id === run.testId);
    if (test) {
      applyTest(test);
    } else {
      restoreProgress(run.save);
    }
    this.gameService.setEditing(false);
    const hour = test ? momentStart(test.moment) : run.time.hour;
    this.gameService.restoreSpot(
      run.spot.map,
      { x: run.spot.pos.x, y: 0, z: run.spot.pos.z },
      hour,
      (test?.weather ?? run.time.weather) as GameSave["weather"],
      test?.day ?? run.time.day
    );
    this.gameService.refreshNpcs();
    const target = run.target;
    if (target.kind === "event") {
      this.gameService.playObjectEvent(
        target.chunkId,
        target.buildingId,
        target.event
      );
    } else if (target.kind === "cutscene") {
      this.gameService.playCutscene(target.cutscene);
    }
  }

  /** What the test was playing stops (its message, its fight, its cutscene). */
  private stopScene(): void {
    this.sequenceService.stop();
    this.cutsceneService.stop();
    this.battleService.cancel();
  }

  private setRun(run: TestRun | null): void {
    this.runState.set(run);
    if (run) {
      writeJson(RUN_KEY, run);
    } else {
      removeKey(RUN_KEY);
    }
  }

  private playerSpot() {
    return this.gameService.playerSpot();
  }

  private timeNow(): {
    day: number;
    moment: DayTime;
    weather: GameSave["weather"];
  } {
    return {
      day: this.gameService.day(),
      moment: momentAt(this.gameService.hour(), gameCalendar()),
      weather: this.gameService.weather(),
    };
  }
}

/** The hour a moment starts at (a little after, so it is that moment for sure). */
export function momentStart(moment: DayTime): number {
  return (gameCalendar().moments[moment] + 0.05) % 24;
}
