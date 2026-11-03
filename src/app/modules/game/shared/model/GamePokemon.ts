import { GamePkSkill } from "./GamePkSkill";
import { Item } from "../../../../core/shared/model/pokemon/Item";
import { PkAbility, PkStats, Pokemon } from "../../../../core/shared/model/pokemon/Pokemon";
import { PkStatus } from "../../../../core/shared/model/pokemon/PkSkill";
import { PK_NATURE_LIST, PkNature } from "../../../../core/shared/model/pokemon/PkNature";
import { POKEMONS } from "../../../../../assets/pokemons/pokemons";
import { getXpValues } from "../../../../core/shared/model/pokemon/PkExp";

export const PKMN_SKILL_NB = 4;
export const PKMN_MAX_LEVEL = 100;
const MAX_EV_PER_STAT = 252;
const MAX_EV_TOTAL = 510;

const STAT_KEYS: readonly (keyof PkStats)[] = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'];

export interface GamePokemonInit {
  base: Pokemon;
  currentHp: number;
  surname: string;
  level: number;
  xp: number;
  xpValues: number[];
  combativeness: number;
  iv: PkStats;
  ev: PkStats;
  skills: GamePkSkill[];
  status: PkStatus | null;
  holdedItem: Item | null;
  ability: PkAbility;
  nature: PkNature;
}

export class GamePokemon {
  public base: Pokemon;
  public currentHp: number;
  public surname: string;
  public level: number;
  public xp: number;
  public xpValues: number[];
  public combativeness: number;
  public iv: PkStats;
  public ev: PkStats;
  public skills: GamePkSkill[];
  public status: PkStatus | null;
  public holdedItem: Item | null;
  public ability: PkAbility;
  public nature: PkNature;
  public currentStats: PkStats;

  constructor(o: GamePokemonInit) {
    this.base = o.base;
    this.currentHp = o.currentHp;
    this.surname = o.surname;
    this.level = o.level;
    this.xp = o.xp;
    this.xpValues = o.xpValues;
    this.combativeness = o.combativeness;
    this.iv = o.iv;
    this.ev = o.ev;
    this.skills = o.skills;
    this.status = o.status;
    this.holdedItem = o.holdedItem;
    this.ability = o.ability;
    this.nature = o.nature;
    this.currentStats = this.getCurrentStats();
  }

  public static getRandomGamePokemon(surname?: string): GamePokemon {
    const base = POKEMONS[Math.floor(Math.random() * POKEMONS.length)];
    const natures = Object.values(PK_NATURE_LIST);
    const nature = natures[Math.floor(Math.random() * natures.length)];

    const level = 50;
    const xpValues = getXpValues(base.levellingRate);
    const baseSkills = base.learnSkills
      .filter(ls => ls.level <= level)
      .map(ls => ({ base: ls.skill, pp: ls.skill.pp }));

    const pkmn = new GamePokemon({
      base,
      currentHp: 0,
      surname: surname || base.name,
      level,
      xp: xpValues[level],
      xpValues,
      combativeness: 1,
      iv: GamePokemon.getRandomStats(0, 31),
      ev: { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 },
      skills: baseSkills.slice(-PKMN_SKILL_NB),
      status: null,
      holdedItem: null,
      ability: base.abilities[Math.floor(Math.random() * base.abilities.length)],
      nature,
    });

    pkmn.currentHp = pkmn.currentStats.hp;

    return pkmn;
  }

  public updateCurrentStats(): void {
    this.currentStats = this.getCurrentStats();
  }

  public getCurrentStats(): PkStats {
    const iv = this.iv;
    const ev = this.ev;
    const lvl = this.level;
    const base = this.base.baseStats;
    const nature = this.nature.stats;
    // Stat == HP => ( ( IV + 2 x Base + (EV / 4) ) x Niveau / 100 ) + Niveau + 10
    // Stat != HP => ( ( ( IV + 2 x Base + (EV / 4) ) x Niveau / 100 ) + 5 ) x Nature
    return {
      hp: Math.floor(GamePokemon.computeIvEv(base.hp, iv.hp, ev.hp, lvl) + lvl + 10),
      atk: Math.floor((GamePokemon.computeIvEv(base.atk, iv.atk, ev.atk, lvl) + 5) * nature.atk),
      def: Math.floor((GamePokemon.computeIvEv(base.def, iv.def, ev.def, lvl) + 5) * nature.def),
      spAtk: Math.floor((GamePokemon.computeIvEv(base.spAtk, iv.spAtk, ev.spAtk, lvl) + 5) * nature.spAtk),
      spDef: Math.floor((GamePokemon.computeIvEv(base.spDef, iv.spDef, ev.spDef, lvl) + 5) * nature.spDef),
      speed: Math.floor((GamePokemon.computeIvEv(base.speed, iv.speed, ev.speed, lvl) + 5) * nature.speed)
    };
  }

  private static getRandomStats(min: number, max: number): PkStats {
    const random = () => min + Math.floor(Math.random() * (max - min + 1));
    return { hp: random(), atk: random(), def: random(), spAtk: random(), spDef: random(), speed: random() };
  }

  private static computeIvEv(base: number, iv: number, ev: number, level: number): number {
    const ivEv = iv + 2 * base + Math.floor(ev / 4);
    return Math.floor(ivEv * (level / 100));
  }

  public addEv(evStats: PkStats): void {
    const evolvingStat = STAT_KEYS.find(key => !!evStats[key]);
    if (!evolvingStat) {
      return;
    }

    const totalStatsAmount = STAT_KEYS.reduce((amount, key) => amount + this.ev[key], 0);
    const amountToAdd = Math.min(MAX_EV_TOTAL - totalStatsAmount, evStats[evolvingStat]);
    if (amountToAdd > 0) {
      this.ev[evolvingStat] = Math.min(MAX_EV_PER_STAT, this.ev[evolvingStat] + amountToAdd);
    }
  }
}
