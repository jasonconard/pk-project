import { Pokemon } from "../../../../core/shared/model/pokemon/Pokemon";
import { GameComputer } from "./GameComputer";
import { GameItem } from "./GameItem";

export const PLAYER_MAX_PKMN = 6;

export interface GamePlayer {
  name: string;
  money: number;
  badges: number;
  pokemons: Pokemon[];
  computer: GameComputer;
  bag: GameItem[];
}
