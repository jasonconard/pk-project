import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, output } from '@angular/core';
import {
  LucideArrowDown, LucideArrowUp, LucideClock, LucideCloudSun, LucideDoorOpen, LucideDynamicIcon, LucideHourglass, LucideIcon,
  LucideMessageSquareText, LucidePlay, LucidePlus, LucideTrash, LucideVariable, LucideVolume2, LucideX,
} from '@lucide/angular';
import { EscapeService } from '../../../core/shared/service/escape.service';
import { EventAction, EventActionType, EventTrigger, ObjectEvent } from '../shared/model/ObjectEvent';
import { VariableTest } from '../shared/model/SceneEvent';
import { WEATHER_CHOICES } from '../shared/weather/Weather';
import { playSound, SOUND_CHOICES } from '../shared/services/sfx';
import { loadVariables } from '../../variables-editor/shared/variable-storage';
import { clampCounter, GameVariable } from '../../variables-editor/shared/variables';

const TRIGGERS: { id: EventTrigger, label: string, help: string }[] = [
  { id: 'action', label: 'Parler', help: 'Le joueur appuie sur la touche d\'action à côté de l\'objet.' },
  { id: 'enter', label: 'Entrer dessus', help: 'Le joueur marche sur l\'objet (une zone invisible, un tapis…). Rejoué seulement après en être sorti.' },
  { id: 'auto', label: 'Automatique', help: 'Dès que les conditions deviennent vraies, où que soit le joueur sur la carte. Rejoué seulement après qu\'elles sont redevenues fausses.' },
];

const ACTIONS: { type: EventActionType, label: string, icon: LucideIcon }[] = [
  { type: 'message', label: 'Message', icon: LucideMessageSquareText },
  { type: 'variable', label: 'Variable', icon: LucideVariable },
  { type: 'teleport', label: 'Téléporter', icon: LucideDoorOpen },
  { type: 'weather', label: 'Météo', icon: LucideCloudSun },
  { type: 'sound', label: 'Son', icon: LucideVolume2 },
  { type: 'wait', label: 'Attendre', icon: LucideHourglass },
];

const COUNTER_TESTS: { op: VariableTest['op'], label: string }[] = [
  { op: 'eq', label: '=' }, { op: 'ne', label: '≠' }, { op: 'gte', label: '≥' }, { op: 'lte', label: '≤' },
];

/**
 * The event window of the map editor (an object's event): what starts it, the conditions that must be true, the
 * actions played one after the other. Works on a copy, given back when the window closes (✕, Terminé, Escape, the
 * backdrop): one undo step in the editor.
 */
@Component({
  selector: 'game-event-editor',
  imports: [LucideDynamicIcon, LucideArrowDown, LucideArrowUp, LucideClock, LucideCloudSun, LucidePlay, LucidePlus, LucideTrash,
    LucideVariable, LucideX],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEditorComponent {
  readonly event = input.required<ObjectEvent>();
  /** Its place in the object's list (from 1). */
  readonly number = input(1);
  readonly objectName = input('');
  readonly maps = input<{ id: string, name: string }[]>([]);
  readonly currentMap = input('');
  /** Closed: the event as edited. */
  readonly closed = output<ObjectEvent>();
  readonly removed = output<void>();

  protected readonly draft = linkedSignal(() => structuredClone(this.event()));
  protected readonly triggers = TRIGGERS;
  protected readonly actionTypes = ACTIONS;
  protected readonly counterTests = COUNTER_TESTS;
  protected readonly variables: GameVariable[] = loadVariables();
  protected readonly weatherList = WEATHER_CHOICES;
  protected readonly sounds = SOUND_CHOICES;
  protected readonly hourList = Array.from({ length: 24 }, (_, h) => h);

  constructor() {
    inject(EscapeService).whileAlive(() => this.close());
  }

  protected close(): void {
    this.closed.emit(this.draft());
  }

  /** Changes the copy (given a fresh clone to change). */
  private change(fn: (event: ObjectEvent) => void): void {
    this.draft.update(event => {
      const copy = structuredClone(event);
      fn(copy);
      return copy;
    });
  }

  protected triggerHelp(): string {
    return TRIGGERS.find(t => t.id === this.draft().trigger)?.help ?? '';
  }

  protected setTrigger(trigger: EventTrigger): void {
    this.change(e => e.trigger = trigger);
  }

  protected setFace(face: boolean): void {
    this.change(e => e.face = face);
  }

  // --- Conditions ---

  protected variable(id: string): GameVariable | undefined {
    return this.variables.find(v => v.id === id);
  }

  protected addVariableTest(): void {
    const first = this.variables[0];
    if (first) {
      this.change(e => e.conditions.variables.push(this.defaultTest(first)));
    }
  }

  private defaultTest(variable: GameVariable): VariableTest {
    return variable.kind === 'flag' ? { id: variable.id, op: 'is', value: true } : { id: variable.id, op: 'gte', value: 1 };
  }

  protected setTestVariable(index: number, id: string): void {
    const variable = this.variable(id);
    if (variable) {
      this.change(e => e.conditions.variables[index] = this.defaultTest(variable));
    }
  }

  protected setTest(index: number, test: Partial<VariableTest>): void {
    this.change(e => e.conditions.variables[index] = { ...e.conditions.variables[index], ...test });
  }

  protected removeTest(index: number): void {
    this.change(e => e.conditions.variables.splice(index, 1));
  }

  protected setHours(hours: { from: number, to: number } | undefined): void {
    this.change(e => {
      if (hours) {
        e.conditions.hours = hours;
      } else {
        delete e.conditions.hours;
      }
    });
  }

  protected addWeather(type: string): void {
    if (type) {
      this.change(e => e.conditions.weathers = [...new Set([...(e.conditions.weathers ?? []), type])]);
    }
  }

  protected removeWeather(type: string): void {
    this.change(e => {
      e.conditions.weathers = (e.conditions.weathers ?? []).filter(w => w !== type);
      if (!e.conditions.weathers.length) {
        delete e.conditions.weathers;
      }
    });
  }

  protected weatherLabel(type: string): string {
    const choice = WEATHER_CHOICES.find(w => w.type === type);
    return choice ? `${choice.icon} ${choice.label}` : type;
  }

  // --- Actions ---

  protected actionInfo(type: EventActionType) {
    return ACTIONS.find(a => a.type === type)!;
  }

  protected addAction(type: EventActionType): void {
    const action = this.newAction(type);
    if (action) {
      this.change(e => e.actions.push(action));
    }
  }

  private newAction(type: EventActionType): EventAction | null {
    switch (type) {
      case 'message': {
        // (said by the same one as the last message)
        const last = [...this.draft().actions].reverse().find(a => a.type === 'message');
        return { type, ...(last?.type === 'message' && last.name ? { name: last.name } : {}), text: '' };
      }
      case 'variable': {
        const first = this.variables[0];
        return first ? { type, id: first.id, op: 'set', value: first.kind === 'flag' ? true : 1 } : null;
      }
      case 'teleport': {
        const map = this.maps().find(m => m.id !== this.currentMap()) ?? this.maps()[0];
        return map ? { type, map: map.id } : null;
      }
      case 'weather': return { type, weather: 'rainy' };
      case 'sound': return { type, sound: 'bip' };
      case 'wait': return { type, seconds: 1 };
    }
  }

  protected setAction(index: number, patch: Partial<EventAction>): void {
    this.change(e => e.actions[index] = { ...e.actions[index], ...patch } as EventAction);
  }

  /** Another variable: its kind decides the change (a flag becomes true, a counter is set to 1). */
  protected setActionVariable(index: number, id: string): void {
    const variable = this.variable(id);
    if (variable) {
      this.change(e => e.actions[index] = { type: 'variable', id, op: 'set', value: variable.kind === 'flag' ? true : 1 });
    }
  }

  protected counterValue(raw: string): number {
    return clampCounter(Number(raw));
  }

  protected moveAction(index: number, by: -1 | 1): void {
    this.change(e => {
      const [action] = e.actions.splice(index, 1);
      e.actions.splice(index + by, 0, action);
    });
  }

  protected removeAction(index: number): void {
    this.change(e => e.actions.splice(index, 1));
  }

  protected play(sound: string): void {
    playSound(sound, true);
  }

  protected seconds(raw: string): number {
    const value = Math.round(Number(raw) * 10) / 10;
    return Number.isFinite(value) ? Math.min(60, Math.max(0.1, value)) : 1;
  }

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }
}
