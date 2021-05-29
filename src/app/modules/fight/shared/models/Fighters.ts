import { GamePokemon } from "../../../game/shared/model/GamePokemon";
import { PkStats } from "../../../../core/shared/model/pokemon/Pokemon";
import { PkSpecialStatus, PkStatus, PkVolatileStatus } from "../../../../core/shared/model/pokemon/PkSkill";

export interface Fighters {
  currentFighter: Fighter,
  ally: Fighter,
  opponents: Fighter[],
  isDoubleFight: boolean
}

export interface Fighter {
  name: string,
  money: number,
  stamina: number,
  pokemons: FighterPokemon[]
}

export interface FighterPokemon {
  origin: GamePokemon,
  current: boolean,
  currentStats: PkStats,
  status: PkStatus,
  specialStatus: PkSpecialStatus[],
  volatileStatus: PkVolatileStatus[]
}

export function gamePokemonToFighter(pk: GamePokemon): FighterPokemon {
  pk.updateCurrentStats();
  return {
    origin: pk,
    current: false,
    currentStats: { ...pk.currentStats, hp: pk.currentHp },
    status: pk.status,
    specialStatus: [],
    volatileStatus: []
  };
}
