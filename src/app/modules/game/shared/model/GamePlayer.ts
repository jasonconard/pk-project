import { Pokemon } from "../../../../core/shared/model/pokemon/Pokemon";
import { GameComputer } from "./GameComputer";
import { GameItem } from "./GameItem";

export const PLAYER_MAX_PKMN = 6;

export class GamePlayer {
  public name: string;
  public money: number;
  public badges: number;
  public pokemons: Pokemon[];
  public computer: GameComputer;
  public bag: GameItem[];

  constructor(o: any) {
  }

}
