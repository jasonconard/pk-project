import { PkSkill, PkSkillCategory } from "../../app/core/shared/model/pokemon/PkSkill";
import { ElementType } from "../../app/core/shared/model/pokemon/PkElement";

export const SK_SCRATCH: PkSkill = {
  name: 'Griffe',
  description: 'Un coup de griffes acérées',
  type: ElementType.NORMAL,
  power: 40,
  category: PkSkillCategory.PHYSICAL,
  accuracy: 100,
  pp: 35,
  aim: null,
  statsModifier: null,
  status: null,
  specialStatus: null,
  volatileStatus: null
};
