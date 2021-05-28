import { PkStats } from "./Pokemon";

export enum PkNatureId {
  HARDY, LONELY, BRAVE, ADAMANT, NAUGHTY, BOLD,
  DOCILE, RELAXED, IMPISH, LAX, TIMID, HASTY,
  SERIOUS, JOLLY, NAIVE, MODEST, MILD, QUIET,
  BASHFUL, RASH, CALM, GENTLE, SASSY, CAREFUL, QUIRKY
}

export interface PkNature {
  id: PkNatureId,
  stats: PkStats
}

export const PK_NATURE_LIST: { [key: number]: PkNature } = {
 [PkNatureId.HARDY]:   { id: PkNatureId.HARDY,   stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.LONELY]:  { id: PkNatureId.LONELY,  stats: { hp: 1.0, atk: 1.1, def: 0.9, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.BRAVE]:   { id: PkNatureId.BRAVE,   stats: { hp: 1.0, atk: 1.1, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 0.9 } },
 [PkNatureId.ADAMANT]: { id: PkNatureId.ADAMANT, stats: { hp: 1.0, atk: 1.1, def: 1.0, spAtk: 0.9, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.NAUGHTY]: { id: PkNatureId.NAUGHTY, stats: { hp: 1.0, atk: 1.1, def: 1.0, spAtk: 1.0, spDef: 0.9, speed: 1.0 } },
 [PkNatureId.BOLD]:    { id: PkNatureId.BOLD,    stats: { hp: 1.0, atk: 0.9, def: 1.1, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.DOCILE]:  { id: PkNatureId.DOCILE,  stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.RELAXED]: { id: PkNatureId.RELAXED, stats: { hp: 1.0, atk: 1.0, def: 1.1, spAtk: 1.0, spDef: 1.0, speed: 0.9 } },
 [PkNatureId.IMPISH]:  { id: PkNatureId.IMPISH,  stats: { hp: 1.0, atk: 1.0, def: 1.1, spAtk: 0.9, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.LAX]:     { id: PkNatureId.LAX,     stats: { hp: 1.0, atk: 1.0, def: 1.1, spAtk: 1.0, spDef: 0.9, speed: 1.0 } },
 [PkNatureId.TIMID]:   { id: PkNatureId.TIMID,   stats: { hp: 1.0, atk: 0.9, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.1 } },
 [PkNatureId.HASTY]:   { id: PkNatureId.HASTY,   stats: { hp: 1.0, atk: 1.0, def: 0.9, spAtk: 1.0, spDef: 1.0, speed: 1.1 } },
 [PkNatureId.SERIOUS]: { id: PkNatureId.SERIOUS, stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.JOLLY]:   { id: PkNatureId.JOLLY,   stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 0.9, spDef: 1.0, speed: 1.1 } },
 [PkNatureId.NAIVE]:   { id: PkNatureId.NAIVE,   stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 0.9, speed: 1.1 } },
 [PkNatureId.MODEST]:  { id: PkNatureId.MODEST,  stats: { hp: 1.0, atk: 0.9, def: 1.0, spAtk: 1.1, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.MILD]:    { id: PkNatureId.MILD,    stats: { hp: 1.0, atk: 1.0, def: 0.9, spAtk: 1.1, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.QUIET]:   { id: PkNatureId.QUIET,   stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.1, spDef: 1.0, speed: 0.9 } },
 [PkNatureId.BASHFUL]: { id: PkNatureId.BASHFUL, stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
 [PkNatureId.RASH]:    { id: PkNatureId.RASH,    stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.1, spDef: 0.9, speed: 1.0 } },
 [PkNatureId.CALM]:    { id: PkNatureId.CALM,    stats: { hp: 1.0, atk: 0.9, def: 1.0, spAtk: 1.0, spDef: 1.1, speed: 1.0 } },
 [PkNatureId.GENTLE]:  { id: PkNatureId.GENTLE,  stats: { hp: 1.0, atk: 1.0, def: 0.9, spAtk: 1.0, spDef: 1.1, speed: 1.0 } },
 [PkNatureId.SASSY]:   { id: PkNatureId.SASSY,   stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.1, speed: 0.9 } },
 [PkNatureId.CAREFUL]: { id: PkNatureId.CAREFUL, stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 0.9, spDef: 1.1, speed: 1.0 } },
 [PkNatureId.QUIRKY]:  { id: PkNatureId.QUIRKY,  stats: { hp: 1.0, atk: 1.0, def: 1.0, spAtk: 1.0, spDef: 1.0, speed: 1.0 } },
}
