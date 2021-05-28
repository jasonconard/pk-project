import { GamePokemon } from "./GamePokemon";
import { GameItem } from "./GameItem";

export const NB_BOXES = 15;
export const NB_PKMN_PER_BOX = 36;

export interface GameComputer {
  boxes: GameComputerBox[],
  items: GameItem[]
}

export interface GameComputerBox {
  name: string,
  pokemons: GamePokemon[],

}
