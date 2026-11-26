import { DayTime } from "../../database-editor/shared/database";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { linkTargets } from "../../database-editor/shared/links";
import { loadVariables } from "../../variables-editor/shared/variable-storage";
import {
  dateLabel,
  dateOf,
  gameCalendar,
  momentLabel,
} from "../shared/model/game-calendar";
import { TestPreset } from "../shared/model/test-preset";
import { WEATHER_CHOICES } from "../shared/weather/Weather";

/** A test's settings in a few words, one line per group (the sheet « Tester ici »). */
export interface TestSummary {
  time: string;
  variables: string;
  team: string;
  links: string;
  cutscenes: string;
}

/** What a test (or the game now, given as a test) is set to. */
export function testSummary(
  test: Pick<
    TestPreset,
    | "day"
    | "moment"
    | "weather"
    | "variables"
    | "team"
    | "items"
    | "money"
    | "links"
    | "cutscenesSeen"
  >
): TestSummary {
  const db = loadDatabase();
  const calendar = gameCalendar();
  const changed = loadVariables().filter(
    (v) => (test.variables[v.id] ?? v.initial) !== v.initial
  ).length;
  const names = test.team
    .map((id) => db.characters.find((c) => c.id === id)?.name)
    .filter(Boolean);
  const items = Object.values(test.items).reduce((sum, n) => sum + n, 0);
  const targets = linkTargets(db);
  const links = Object.entries(test.links)
    .filter(([, level]) => level > 0)
    .map(
      ([id, level]) =>
        `${targets.find((t) => t.id === id)?.name ?? "?"} niveau ${level}`
    );
  const seen = test.cutscenesSeen.length;
  return {
    time: [
      dateLabel(dateOf(test.day, calendar), calendar),
      momentLabel(test.moment as DayTime),
      WEATHER_CHOICES.find((w) => w.type === test.weather)?.label,
    ]
      .filter(Boolean)
      .join(" · "),
    variables: changed === 0 ? "Toutes au début" : plural(changed, "changée"),
    team: [
      names.join(", ") || "Personne",
      items === 0 ? "aucun objet" : plural(items, "objet"),
      `${test.money.toLocaleString("fr-FR")} d'argent`,
    ].join(" · "),
    links:
      links.length === 0
        ? "Aucun"
        : links.slice(0, 2).join(", ") +
          (links.length > 2 ? ` et ${links.length - 2} autres` : ""),
    cutscenes:
      seen === 0
        ? "Aucune : elles se rejouent"
        : plural(seen, "déjà vue", "déjà vues"),
  };
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n > 1 ? many : one}`;
}
