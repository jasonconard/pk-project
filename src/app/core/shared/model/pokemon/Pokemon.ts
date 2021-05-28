import { PkSkill } from "./PkSkill";
import { ElementType } from "./PkElement";

export interface Pokemon {
  id: string,
  name: string,
  description: string,
  height: number,
  weight: number

  baseStats: PkStats,
  types: ElementType[],

  evolve: PkEvolve[],
  sprites: PkSprites,

  evYield: PkStats,
  baseExpYield: number,

  genderRatio: PkGenderRatio,
  eggGroups: PkEggGroup[], // [] = no reproduction available
  hatchTime: number, // nb of steps
  baby: Pokemon, // null = himSelf

  levellingRate: PkLevellingRate,
  catchRate: number,

  abilities: PkAbility[],
  learnSkills: PkLearnSkill[],
  tutorableSkills: PkSkill[]
}

export interface PkStats {
  hp: number,
  atk: number,
  def: number,
  spAtk: number,
  spDef: number,
  speed: number
}

export interface PkEvolve {
  pokemon: Pokemon
  level?: number,
  // object/zone/daytime ...
}

export interface PkSprites {
  map: string,
  fight: string
}

export interface PkGenderRatio {
  neutral: number,
  female: number,
  male: number
}

export enum PkEggGroup {
  FOO, FEE, FAA
}

export enum PkLevellingRate {
  SLOW, MEDIUM_SLOW
}

export enum PkAbility {
  BLAZE, SOLAR_POWER
}

export interface PkLearnSkill {
  level: number,
  skill: PkSkill
}
