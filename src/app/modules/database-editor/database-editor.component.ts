import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, output, signal } from '@angular/core';
import {
  LucideActivity, LucideSparkles, LucideChevronDown, LucideChevronLeft, LucideChevronRight, LucideCopy, LucideDownload, LucideFlame, LucideIcon, LucideInfo, LucidePencil,
  LucidePlus, LucideSearch, LucideSword, LucideTrash, LucideX, LucideDynamicIcon, LucideArrowUp, LucideArrowDown, LucideSigma,
} from '@lucide/angular';
import { downloadFile } from '../game/shared/util/ts-source';
import { WEATHER_CHOICES, WeatherType } from '../game/shared/weather/Weather';
import { weatherScreenshot } from '../game/shared/weather/weather-catalog';
import {
  CAST_MAX, castLabel, clampInt, composableElements, DbElement, DbSkill, DbState, DbTable, DbWeapon, defaultLearn, ELEMENT_COLORS,
  formulaProblem, GameDatabase, LEARN_MAX, learnChoices, LEVEL_MAX, MP_MAX, newElement, newId, newSkill, newSkillEffect, newState,
  newStateEffect, newWeapon, partsLabel, PERCENT_MAX, POWER_MAX, SKILL_TARGETS, SKILL_USES, SkillEffect, SkillEffectKind, SkillTarget,
  SkillUse, StateEffect, StateEffectKind, StatId, STATS, TURNS_MAX, withoutRow,
} from './shared/database';
import { loadDatabase, saveDatabase } from './shared/database-storage';
import { PixelEditorComponent } from './pixel-editor/pixel-editor.component';
import { StepperComponent } from './stepper/stepper.component';
import { WeatherPickerComponent } from '../game/weather-picker/weather-picker.component';

type Row = DbElement | DbWeapon | DbState | DbSkill;

/** In the mockup's order (characters, enemies and items will come before). */
const TABLES: { id: DbTable, label: string, one: string, icon: LucideIcon }[] = [
  { id: 'skills', label: 'Compétences', one: 'Compétence', icon: LucideSparkles },
  { id: 'states', label: 'États', one: 'État', icon: LucideActivity },
  { id: 'elements', label: 'Éléments', one: 'Élément', icon: LucideFlame },
  { id: 'weapons', label: 'Armes', one: 'Type d\'arme', icon: LucideSword },
];

const SKILL_EFFECT_LABELS: Record<SkillEffectKind, string> = {
  damage: 'Dégâts', heal: 'Soin', addState: 'Donner un état', removeState: 'Guérir un état', stat: 'Stat',
};

const EFFECT_LABELS: Record<StateEffectKind, string> = { hp: 'PV par tour', mp: 'PM par tour', stat: 'Stat', skip: 'Passe son tour' };

/** Wide enough for the list and the sheet side by side. */
const SIDE_BY_SIDE = '(min-width: 760px)';

/**
 * Database editor (docs/idees.md, point 5): one tab per table, the list then the row's sheet (side by side on wide
 * screens). Saved in the browser at every change; Exporter writes the game's file (src/assets/database/database.ts).
 * Tables so far: skills (cost, cast time, effects, the levels they are learned with), states, elements (with their
 * weathers, simple or composed), weapon types.
 */
@Component({
  selector: 'app-database-editor',
  imports: [
    LucideChevronDown, LucideChevronLeft, LucideChevronRight, LucideCopy, LucideDownload, LucideDynamicIcon, LucideInfo, LucidePencil, LucidePlus,
    LucideSearch, LucideTrash, LucideX, LucideArrowUp, LucideArrowDown, LucideSigma, NgTemplateOutlet, PixelEditorComponent, StepperComponent, WeatherPickerComponent,
  ],
  templateUrl: './database-editor.component.html',
  styleUrl: './database-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'keydown($event)' },
})
export class DatabaseEditorComponent {
  /** Opened over the game (Jeu closes the panel instead of going to the game's page). */
  readonly embedded = input(false);
  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly tables = TABLES;
  protected readonly stats = STATS;
  protected readonly colors = ELEMENT_COLORS;
  protected readonly effectKinds: StateEffectKind[] = ['hp', 'mp', 'stat', 'skip'];
  protected readonly effectLabels = EFFECT_LABELS;
  protected readonly turnsMax = TURNS_MAX;
  protected readonly percentMax = PERCENT_MAX;
  protected readonly mpMax = MP_MAX;
  protected readonly powerMax = POWER_MAX;
  protected readonly levelMax = LEVEL_MAX;
  protected readonly castMax = CAST_MAX;
  protected readonly learnMax = LEARN_MAX;
  protected readonly targets = SKILL_TARGETS;
  protected readonly uses = SKILL_USES;
  protected readonly skillEffectKinds: SkillEffectKind[] = ['damage', 'heal', 'addState', 'removeState', 'stat'];
  protected readonly skillEffectLabels = SKILL_EFFECT_LABELS;
  protected readonly castLabel = castLabel;

  protected readonly db = signal<GameDatabase>(loadDatabase());
  protected readonly table = signal<DbTable>('skills');
  protected readonly selectedId = signal<string | null>(null);
  protected readonly search = signal('');
  protected readonly saveFailed = signal(false);
  protected readonly message = signal('');
  /** The row whose Supprimer was pressed once (pressed again within 3 s: deleted). */
  protected readonly deleting = signal<string | null>(null);
  /** The icon being drawn: whose, and its title. */
  protected readonly iconEdit = signal<{ id: string, title: string, value?: string } | null>(null);
  /** The weather window: for which element, on which side (stronger / weaker). */
  protected readonly weatherPick = signal<{ id: string, strong: boolean } | null>(null);
  /** The weathers the element already has (not offered again). */
  protected readonly pickExclude = computed(() =>
    this.db().elements.find(e => e.id === this.weatherPick()?.id)?.weathers.map(w => w.weather) ?? []);

  private readonly media = matchMedia(SIDE_BY_SIDE);
  protected readonly sideBySide = signal(this.media.matches);
  private deleteTimer?: ReturnType<typeof setTimeout>;

  protected readonly tableInfo = computed(() => TABLES.find(t => t.id === this.table())!);
  protected readonly rows = computed<Row[]>(() => this.db()[this.table()]);
  protected readonly shownRows = computed(() => {
    const q = norm(this.search());
    return q ? this.rows().filter(r => norm(r.name).includes(q)) : this.rows();
  });
  /** The open sheet: the chosen row; side by side, the first one when none is chosen. */
  protected readonly current = computed<Row | null>(() => {
    const rows = this.rows();
    const chosen = rows.find(r => r.id === this.selectedId());
    return chosen ?? (this.sideBySide() ? rows[0] ?? null : null);
  });
  protected readonly element = computed(() => this.table() === 'elements' ? this.current() as DbElement | null : null);
  protected readonly weapon = computed(() => this.table() === 'weapons' ? this.current() as DbWeapon | null : null);
  protected readonly state = computed(() => this.table() === 'states' ? this.current() as DbState | null : null);
  protected readonly skill = computed(() => this.table() === 'skills' ? this.current() as DbSkill | null : null);
  protected readonly learnChoices = computed(() => learnChoices(this.db()));
  /** The formula's problem, if any (shown under it). */
  protected readonly formulaProblem = computed(() => formulaProblem(this.skill()?.formula ?? ''));
  /** The formula block is unfolded (always when there is one). */
  protected readonly formulaOpen = signal(false);
  protected readonly composable = computed(() => composableElements(this.db().elements, this.element()?.id));

  constructor() {
    const onMedia = () => this.sideBySide.set(this.media.matches);
    this.media.addEventListener('change', onMedia);
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.deleteTimer);
      this.media.removeEventListener('change', onMedia);
    });
  }

  // --- Navigation ---

  protected backToGame(event: Event): void {
    event.preventDefault();
    if (this.embedded()) {
      this.closed.emit();
    } else {
      location.hash = '#/';
    }
  }

  /** The back button, Escape: the icon being drawn, then the sheet (phone), then the editor closes. */
  requestClose(): void {
    if (this.iconEdit()) {
      this.iconEdit.set(null);
    } else if (this.weatherPick()) {
      this.weatherPick.set(null);
    } else if (!this.sideBySide() && this.current()) {
      this.selectedId.set(null);
    } else {
      this.closed.emit();
    }
  }

  protected keydown(ev: KeyboardEvent): void {
    if (ev.key !== 'Escape') {
      return;
    }
    const target = ev.target as HTMLElement;
    if (target.matches('input, textarea, select')) {
      target.blur();
    } else {
      this.requestClose();
    }
    ev.preventDefault();
    ev.stopPropagation();
  }

  protected openTable(table: DbTable): void {
    this.table.set(table);
    this.selectedId.set(null);
    this.search.set('');
    this.message.set('');
  }

  protected select(id: string): void {
    this.selectedId.set(id);
    this.formulaOpen.set(false);
    this.deleting.set(null);
    this.host.nativeElement.querySelector('.sheet-pane')?.scrollTo({ top: 0 });
  }

  // --- Rows ---

  protected add(): void {
    const table = this.table();
    const base = { elements: 'Nouvel élément', weapons: 'Nouveau type d\'arme', states: 'Nouvel état', skills: 'Nouvelle compétence' }[table];
    const names = new Set(this.rows().map(r => norm(r.name)));
    let name = base;
    for (let i = 2; names.has(norm(name)); i++) {
      name = `${base} ${i}`;
    }
    const row = table === 'elements' ? newElement(name) : table === 'weapons' ? newWeapon(name)
      : table === 'states' ? newState(name) : newSkill(name, this.db());
    this.commit({ ...this.db(), [table]: [...this.rows(), row] });
    this.search.set('');
    this.selectedId.set(row.id);
    setTimeout(() => {
      const field = this.host.nativeElement.querySelector<HTMLInputElement>('.sheet-pane .name');
      field?.focus();
      field?.select();
    });
  }

  protected duplicate(row: Row): void {
    const copy = { ...structuredClone(row), id: newId(row.id.split('-')[0]), name: `${row.name} (copie)` } as Row;
    delete (copy as DbElement).physical;
    const rows = this.rows();
    const at = rows.findIndex(r => r.id === row.id) + 1;
    this.commit({ ...this.db(), [this.table()]: [...rows.slice(0, at), copy, ...rows.slice(at)] });
    this.selectedId.set(copy.id);
  }

  protected remove(row: Row): void {
    clearTimeout(this.deleteTimer);
    if (this.deleting() !== row.id) {
      this.deleting.set(row.id);
      this.deleteTimer = setTimeout(() => this.deleting.set(null), 3000);
      return;
    }
    this.deleting.set(null);
    const rows = this.rows();
    const index = rows.findIndex(r => r.id === row.id);
    this.commit(withoutRow(this.db(), this.table(), row.id));
    const next = this.rows()[Math.min(index, this.rows().length - 1)];
    this.selectedId.set(this.sideBySide() ? next?.id ?? null : null);
  }

  protected rename(row: Row, name: string): void {
    this.edit(row.id, r => ({ ...r, name }));
  }

  protected setColor(row: DbElement | DbState, color: string): void {
    this.edit(row.id, r => ({ ...r, color }));
  }

  protected setNote(row: DbWeapon | DbSkill, note: string): void {
    this.edit(row.id, r => {
      const next = { ...r, note: note.trim() ? note : undefined } as DbWeapon;
      if (!next.note) {
        delete next.note;
      }
      return next;
    });
  }

  // --- Icons ---

  protected editIcon(row: Row): void {
    this.iconEdit.set({ id: row.id, title: `Icône de ${row.name.trim() || 'sans nom'}`, value: row.icon });
  }

  protected iconDone(icon: string | undefined): void {
    const target = this.iconEdit();
    this.iconEdit.set(null);
    if (target) {
      this.edit(target.id, r => {
        const next = { ...r, icon };
        if (!icon) {
          delete next.icon;
        }
        return next;
      });
    }
  }

  // --- Elements ---

  protected setComposed(element: DbElement, composed: boolean): void {
    if (composed === !!element.parts) {
      return;
    }
    if (composed) {
      const choices = this.composable();
      if (choices.length < 2) {
        this.message.set('Il faut au moins deux éléments simples (pas le Physique) pour en composer un.');
        return;
      }
      this.edit(element.id, e => ({ ...e, parts: [choices[0].id, choices[1].id] }));
    } else {
      this.edit(element.id, e => {
        const { parts: _, ...simple } = e as DbElement;
        return simple;
      });
    }
  }

  protected setPart(element: DbElement, index: 0 | 1, id: string): void {
    this.edit(element.id, e => {
      const parts = [...(e as DbElement).parts!] as [string, string];
      parts[index] = id;
      return { ...e, parts };
    });
  }

  protected partsLabel(element: DbElement): string {
    return partsLabel(element, this.db().elements);
  }

  protected strong(element: DbElement) {
    return element.weathers.filter(w => w.percent > 0);
  }

  protected weak(element: DbElement) {
    return element.weathers.filter(w => w.percent < 0);
  }

  protected openWeatherPick(element: DbElement, strong: boolean): void {
    this.weatherPick.set({ id: element.id, strong });
  }

  protected pickWeather(weather: string): void {
    const pick = this.weatherPick();
    this.weatherPick.set(null);
    if (pick) {
      this.edit(pick.id, e => ({
        ...e, weathers: [...(e as DbElement).weathers, { weather: weather as WeatherType, percent: pick.strong ? 25 : -25 }],
      }));
    }
  }


  protected setWeatherPercent(element: DbElement, weather: string, magnitude: number, strong: boolean): void {
    this.edit(element.id, e => ({
      ...e, weathers: (e as DbElement).weathers.map(w => w.weather === weather ? { ...w, percent: strong ? magnitude : -magnitude } : w),
    }));
  }

  protected removeWeather(element: DbElement, weather: string): void {
    this.edit(element.id, e => ({ ...e, weathers: (e as DbElement).weathers.filter(w => w.weather !== weather) }));
  }

  protected weatherLabel(type: string): string {
    return WEATHER_CHOICES.find(w => w.type === type)?.label ?? type;
  }

  protected weatherImage(type: string): string {
    return weatherScreenshot(type as WeatherType, false);
  }

  /** Some weathers only have a night picture. */
  protected weatherImageMissing(ev: Event, type: string): void {
    const img = ev.target as HTMLImageElement;
    const night = weatherScreenshot(type as WeatherType, true);
    if (!img.src.endsWith(night)) {
      img.src = night;
    } else {
      img.style.visibility = 'hidden';
    }
  }

  // --- States ---

  protected setTurns(state: DbState, turns: number): void {
    this.edit(state.id, s => ({ ...s, turns: clampInt(turns, 0, TURNS_MAX) }));
  }

  protected setFlag(state: DbState, flag: 'staysAfterFight' | 'endsOnHit', value: boolean): void {
    this.edit(state.id, s => ({ ...s, [flag]: value }));
  }

  protected addEffect(state: DbState, kind: StateEffectKind): void {
    this.edit(state.id, s => ({ ...s, effects: [...(s as DbState).effects, newStateEffect(kind)] }));
  }

  protected setEffect(state: DbState, index: number, change: Partial<StateEffect>): void {
    this.edit(state.id, s => ({
      ...s, effects: (s as DbState).effects.map((e, i) => i === index ? { ...e, ...change } as StateEffect : e),
    }));
  }

  protected setEffectStat(state: DbState, index: number, stat: string): void {
    this.setEffect(state, index, { stat: stat as StatId });
  }

  protected removeEffect(state: DbState, index: number): void {
    this.edit(state.id, s => ({ ...s, effects: (s as DbState).effects.filter((_, i) => i !== index) }));
  }

  // --- Skills ---

  /** Another element: the levels it is learned with follow, when none were chosen yet. */
  protected setSkillElement(skill: DbSkill, element: string): void {
    this.edit(skill.id, s => {
      const next = { ...s, element } as DbSkill;
      if (!next.learn.length) {
        next.learn = defaultLearn(element, this.db());
      }
      return next;
    });
  }

  protected setSkill(skill: DbSkill, change: Partial<Pick<DbSkill, 'mp' | 'cast' | 'target' | 'use'>>): void {
    this.edit(skill.id, s => ({ ...s, ...change }));
  }

  protected setTarget(skill: DbSkill, target: string): void {
    this.setSkill(skill, { target: target as SkillTarget });
  }

  protected setUse(skill: DbSkill, use: SkillUse): void {
    this.setSkill(skill, { use });
  }

  protected setCast(skill: DbSkill, cast: number): void {
    this.setSkill(skill, { cast: Math.min(CAST_MAX, Math.max(0, Math.round(cast * 2) / 2)) });
  }

  /** Where the cast ends on the gauge preview (%): waiting, then casting, then the action. */
  protected castEnd(cast: number): number {
    return 70 + cast / CAST_MAX * 22;
  }

  protected addSkillEffect(skill: DbSkill, kind: SkillEffectKind): void {
    this.edit(skill.id, s => ({ ...s, effects: [...(s as DbSkill).effects, newSkillEffect(kind, this.db())] }));
  }

  protected setSkillEffect(skill: DbSkill, index: number, change: Partial<SkillEffect> | Record<string, unknown>): void {
    this.edit(skill.id, s => ({
      ...s, effects: (s as DbSkill).effects.map((e, i) => i === index ? { ...e, ...change } as SkillEffect : e),
    }));
  }

  protected removeSkillEffect(skill: DbSkill, index: number): void {
    this.edit(skill.id, s => ({ ...s, effects: (s as DbSkill).effects.filter((_, i) => i !== index) }));
  }

  protected moveSkillEffect(skill: DbSkill, index: number, by: -1 | 1): void {
    this.edit(skill.id, s => {
      const effects = [...(s as DbSkill).effects];
      const to = index + by;
      if (to < 0 || to >= effects.length) {
        return s;
      }
      [effects[index], effects[to]] = [effects[to], effects[index]];
      return { ...s, effects };
    });
  }

  protected setFormula(skill: DbSkill, formula: string): void {
    this.edit(skill.id, s => {
      const next = { ...s, formula } as DbSkill;
      if (!formula.trim()) {
        delete next.formula;
      }
      return next;
    });
  }

  protected addLearn(skill: DbSkill): void {
    const used = new Set(skill.learn.map(l => l.id));
    const proposed = defaultLearn(skill.element, this.db()).find(l => !used.has(l.id))
      ?? this.learnChoices().map(c => ({ id: c.id, level: 1 })).find(l => !used.has(l.id));
    if (proposed && skill.learn.length < LEARN_MAX) {
      this.edit(skill.id, s => ({ ...s, learn: [...(s as DbSkill).learn, proposed] }));
    }
  }

  protected setLearn(skill: DbSkill, index: number, change: Partial<{ id: string, level: number }>): void {
    this.edit(skill.id, s => ({ ...s, learn: (s as DbSkill).learn.map((l, i) => i === index ? { ...l, ...change } : l) }));
  }

  protected removeLearn(skill: DbSkill, index: number): void {
    this.edit(skill.id, s => ({ ...s, learn: (s as DbSkill).learn.filter((_, i) => i !== index) }));
  }

  /** The dot shown without an icon: the row's color, or its element's. */
  protected rowColor(row: Row): string | null {
    return (row as DbElement).color ?? this.elementOf((row as DbSkill).element)?.color ?? null;
  }

  protected isLearnChoice(id: string): boolean {
    return this.learnChoices().some(c => c.id === id);
  }

  protected hasState(id: string): boolean {
    return this.db().states.some(st => st.id === id);
  }

  protected elementOf(id: string): DbElement | undefined {
    return this.db().elements.find(e => e.id === id);
  }

  protected rowName(table: 'elements' | 'weapons' | 'states', id: string): string {
    return (this.db()[table] as Row[]).find(r => r.id === id)?.name ?? '(supprimé)';
  }

  /** « Feu 2 + Vent 3 » */
  protected learnLabel(skill: DbSkill): string {
    const db = this.db();
    return skill.learn.map(l => `${[...db.elements, ...db.weapons].find(r => r.id === l.id)?.name ?? '?'} ${l.level}`).join(' + ');
  }

  // --- List texts ---

  protected rowMeta(row: Row): string {
    switch (this.table()) {
      case 'elements': {
        const e = row as DbElement;
        if (e.physical) {
          return 'Dégâts et résistances';
        }
        const weathers = e.weathers.length ? ` · ${e.weathers.length} météo${e.weathers.length > 1 ? 's' : ''}` : '';
        return (e.parts ? this.partsLabel(e) : 'Simple') + weathers;
      }
      case 'weapons':
        return (row as DbWeapon).note || 'Type d\'arme';
      case 'skills': {
        const s = row as DbSkill;
        return [this.elementOf(s.element)?.name ?? '?', `${s.mp} PM`, castLabel(s.cast), this.learnLabel(s)].filter(Boolean).join(' · ');
      }
      case 'states': {
        const s = row as DbState;
        const effects = s.effects.map(e => this.effectSummary(e)).join(', ');
        return [this.turnsLabel(s.turns), effects].filter(Boolean).join(' · ');
      }
    }
  }

  protected turnsLabel(turns: number): string {
    return turns ? `${turns} tour${turns > 1 ? 's' : ''}` : 'Tout le combat';
  }

  private effectSummary(effect: StateEffect): string {
    const signed = (n: number) => `${n > 0 ? '+' : ''}${n} %`;
    switch (effect.kind) {
      case 'hp': return `PV ${signed(effect.percent)}`;
      case 'mp': return `PM ${signed(effect.percent)}`;
      case 'stat': return `${STATS.find(s => s.id === effect.stat)?.label} ${signed(effect.percent)}`;
      case 'skip': return `passe son tour ${effect.chance} %`;
    }
  }

  // --- Export ---

  /** The database as the game's file (src/assets/database/database.ts) for the repository. */
  protected exportDatabase(): void {
    const source = `import { GameDatabase } from '../../app/modules/database-editor/shared/database';

/**
 * The game's database (elements, weapon types, states, skills…). Written by the database editor's export (editor →
 * Éditeurs → Base de données → Exporter); the database saved in the browser replaces this one.
 */
export const CODE_DATABASE: GameDatabase = ${JSON.stringify(this.db(), null, 2)};
`;
    downloadFile('database.ts', source);
    this.message.set('database.ts téléchargé : à mettre dans src/assets/database/.');
  }

  private edit(id: string, change: (row: Row) => Row): void {
    const table = this.table();
    this.commit({ ...this.db(), [table]: (this.db()[table] as Row[]).map(r => r.id === id ? change(r) : r) });
  }

  private commit(db: GameDatabase): void {
    this.db.set(db);
    this.saveFailed.set(!saveDatabase(db));
    this.message.set('');
  }
}

function norm(name: string): string {
  return name.trim().toLocaleLowerCase('fr-FR').normalize('NFD').replace(/\p{M}/gu, '');
}
