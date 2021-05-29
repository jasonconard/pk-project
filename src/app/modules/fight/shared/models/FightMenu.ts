import { FighterPokemon } from "./Fighters";
import { GamePkSkill } from "../../../game/shared/model/GamePkSkill";

export interface FightMenu {
  id: string,
  label: string,
  enabled: boolean,
  amount?: string,
  icon?: string,
  desc?: string,
  subMenus: FightMenu[],
  skill?: GamePkSkill,
  pokemon?: FighterPokemon
  item?: any,
  isEscape?: boolean
}
