import { FighterPokemon } from './Fighters';
import { GamePkSkill } from '../../../game/shared/model/GamePkSkill';
import { GameItem } from '../../../game/shared/model/GameItem';

export interface FightMenu {
  id: string,
  label: string,
  enabled: boolean,
  amount?: string,
  icon?: string,
  desc?: string,
  subMenus: FightMenu[],
  skill?: GamePkSkill,
  pokemon?: FighterPokemon,
  item?: GameItem,
  isEscape?: boolean
}
