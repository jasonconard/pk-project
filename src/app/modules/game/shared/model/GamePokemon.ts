import { GamePkSkill } from "./GamePkSkill";
import { Item } from "../../../../core/shared/model/pokemon/Item";
import { PkAbility, PkStats, Pokemon } from "../../../../core/shared/model/pokemon/Pokemon";
import { PkStatus } from "../../../../core/shared/model/pokemon/PkSkill";
import { PK_NATURE_LIST, PkNature } from "../../../../core/shared/model/pokemon/PkNature";
import { POKEMONS } from "../../../../../assets/pokemons/pokemons";
import { getXpValues } from "../../../../core/shared/model/pokemon/PkExp";

export const PKMN_SKILL_NB = 4;
export const PKMN_MAX_LEVEL = 100;

export class GamePokemon {
  public base: Pokemon;
  public currentHp: number;
  public surname: string;
  public level: number;
  public xp: number;
  public xpValues: number;
  public combativeness: number;
  public iv: PkStats;
  public ev: PkStats;
  public skills: GamePkSkill[];
  public status: PkStatus;
  public holdedItem: Item;
  public ability: PkAbility;
  public nature: PkNature;
  public currentStats: PkStats;

  constructor(o: any) {
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
    this.currentStats = o.currentStats;
  }

  public static getRandomGamePokemon(surname?: string): GamePokemon {
    const idPkmn = Math.floor(Math.random() * POKEMONS.length);
    const base = POKEMONS[idPkmn];
    const natureKeys = Object.keys(PK_NATURE_LIST);
    const idNature = Math.floor(Math.random() * natureKeys.length);
    const nature = PK_NATURE_LIST[natureKeys[idNature]];

    const level = 50;
    const xpValues = getXpValues(base.levellingRate);
    const baseSkills = base.learnSkills.filter( ls => ls.level <= level).map( ls => {
      return {
        base: ls.skill,
        pp: ls.skill.pp
      }
    });

    const pkmn = new GamePokemon({
      base,
      currentHp: 0,
      surname: surname || base.name,
      level,
      xp: xpValues[level],
      xpValues,
      combativeness: 1,
      iv: this.getRandomStats(0, 31),
      ev: { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 },
      skills: baseSkills.slice(baseSkills.length - 4, baseSkills.length),
      status: null,
      holdedItem: null,
      ability: base.abilities[Math.floor(Math.random()*base.abilities.length)],
      nature,
      currentStats: null
    });

    pkmn.updateCurrentStats();

    pkmn.currentHp = pkmn.currentStats.hp;

    return pkmn;
  }

  public updateCurrentStats() {
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
    }
  }

  private static getRandomStats(min: number, max: number): PkStats {
    return {
      hp: min + Math.floor(Math.random() * (max-min+1)),
      atk: min + Math.floor(Math.random() * (max-min+1)),
      def: min + Math.floor(Math.random() * (max-min+1)),
      spAtk: min + Math.floor(Math.random() * (max-min+1)),
      spDef: min + Math.floor(Math.random() * (max-min+1)),
      speed: min + Math.floor(Math.random() * (max-min+1)),
    }
  }

  private static computeIvEv(base: number, iv: number, ev: number, level: number): number {
    const ivEv = iv + 2 * base + Math.floor(ev / 4);
    return Math.floor(ivEv * (level / 100));
  }

  public addEv(evStats: PkStats) {
    const keys = Object.keys(evStats);
    const evolvingIv = keys.find(key => {
      return !!evStats[key];
    });

    const totalStatsAmount = keys.reduce( (amount, key) => {
      return amount + this.ev[key];
    }, 0);

    const maxAmountPossible = 510 - totalStatsAmount;
    const amountToAdd = Math.min(maxAmountPossible, evStats[evolvingIv]);
    if(amountToAdd) {
      this.ev[evolvingIv] = Math.min(252, this.ev[evolvingIv] + amountToAdd);
    }

    console.log(this.ev);
  }

}

