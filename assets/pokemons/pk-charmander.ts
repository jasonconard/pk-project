import { ElementType } from "../../app/core/shared/model/pokemon/PkElement";
import { PkAbility, PkLevellingRate, Pokemon } from "../../app/core/shared/model/pokemon/Pokemon";
import { SK_SCRATCH } from "../skills/sk-scratch";

export const PK_CHARMANDER: Pokemon = {
  id: '004',
  name: 'Salamèche',
  description: 'La flammèche au bout de sa queue émet un crépitement audible seulement dans les endroits calmes.',
  height: 0.6,
  weight: 8.5,

  baseStats: {
    hp: 39,
    atk: 52,
    def: 43,
    spAtk: 60,
    spDef: 50,
    speed: 65
  },
  types: [ElementType.FIRE],

  evolve: [], // TODO REPTINCEL
  sprites: { map: '', fight: '' },

  evYield: { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 1 },
  baseExpYield: 62,

  genderRatio: { neutral: 0, female: 12.5, male: 87.5 },
  eggGroups: [], // TODO EGG GROUPS
  hatchTime: 5120,
  baby: null,

  levellingRate: PkLevellingRate.MEDIUM_SLOW,
  catchRate: 45,

  abilities: [ PkAbility.BLAZE, PkAbility.SOLAR_POWER ],
  learnSkills: [
    { level: 0, skill: SK_SCRATCH }
  ],
  tutorableSkills: []
}
