import { ElementType } from "./PkElement";
import { PkStats } from "./Pokemon";

export interface PkSkill {
  name: string,
  description: string,
  type: ElementType,
  power: number,
  category: PkSkillCategory,
  accuracy: number,
  pp: number,
  aim: PkAim,
  statsModifier: PkStats,
  status: PkStatus,
  specialStatus: PkSpecialStatus,
  volatileStatus: PkVolatileStatus
}

export enum PkSkillCategory {
  PHYSICAL, SPECIAL, ABSOLUTE
}

export enum PkAim {

}

export enum PkStatus {
  POISONED, BADLY_POISONED, BURN, SLEEP, FREEZE, PARALYSIS
}

export enum PkSpecialStatus {
  BOUND, CONFUSION, CURSE, EMBARGO, ENCORE, FLINCH,
  HEAL_BLOCK, IDENTIFIED, INFATUATION, LEECH_SEED, NIGHTMARE,
  PERISH_SONG, TAUNT, TELEKINESIS, TORMENT
}

export enum PkVolatileStatus {
  AQUA_RING, BRACING, CHARGING_TURN, CENTER_OF_ATTENTION,
  DEFENSE_CURL, ROOTING, MAGIC_COAT, MAGNETIC_LEVITATION,
  MIMIC, MINIMIZE, PROTECTION, RECHARGING,
  SEMI_INVULNERABLE_TURN, SUBSTITUTE, TAKING_AIM,
  TRANSFORMED, WITHDRAWING
}
