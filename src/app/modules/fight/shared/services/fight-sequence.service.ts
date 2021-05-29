import { Injectable } from '@angular/core';
import { Game } from "../../../game/shared/model/Game";
import { FightHelper } from "../models/FightHelper";
import { GamePokemon } from "../../../game/shared/model/GamePokemon";
import { FighterPokemon, Fighters, gamePokemonToFighter } from "../models/Fighters";
import { FightMenuService } from "./fight-menu.service";
import { FightMenu } from "../models/FightMenu";
import { GamePkSkill } from "../../../game/shared/model/GamePkSkill";

@Injectable({
  providedIn: 'root'
})
export class FightSequenceService {

  private turnInfo: { game: Game, pk1: FighterPokemon, pk2: FighterPokemon } = null;

  constructor(private fightMenuService: FightMenuService) {
  }

  launchFight(game: Game, fighters: Fighters) {
    this.turn(game, fighters.currentFighter.pokemons[0], fighters.opponents[0].pokemons[0]);
  }

  turn(game: Game, pk1: FighterPokemon, pk2: FighterPokemon) {
    console.log(pk1);
    console.log(pk2);
    pk1.current = true;
    this.turnInfo = { game, pk1, pk2 };
    this.fightMenuService.openMenu(game, pk1);
  }

  afterChoice(menuChoice: FightMenu) {

    const turnInfo = this.turnInfo;
    const pk1 = turnInfo.pk1;
    const pk2 = turnInfo.pk2;
    const game = turnInfo.game;
    this.turnInfo = null;

    if(!menuChoice.skill || !menuChoice.skill.pp) {
      return this.turn(game, pk1, pk2);
    } else {
      this.fightMenuService.closeMenu();
    }

    setTimeout(() => {
      const order = [pk1, pk2].sort((p1, p2) => {
        return p1.currentStats.speed > p2.currentStats.speed ? 1 : 0;
      });

      const sk1 = pk1 === order[0] ? menuChoice.skill : order[0].origin.skills[0];
      const sk2 = pk1 === order[0] ? order[1].origin.skills[0] : menuChoice.skill;

      this.attack(sk1, order[0], order[1]);
      if(order[1].currentStats.hp > 0) {
        this.attack(sk2, order[1], order[0]);
        if(order[0].currentStats.hp > 0) {
          this.turn(game, pk1, pk2);
        } else {
          console.log(order[0].origin.surname + ' est KO');
          console.log('Fin du combat !');
        }
      } else {
        console.log(order[1].origin.surname + ' est KO');
        console.log('Fin du combat !');
      }
    }, 500);

  }

  attack(gameSkill: GamePkSkill, attacker: FighterPokemon, defender: FighterPokemon) {
    const skill = gameSkill.base;

    gameSkill.pp -= 1;

    const levelRatio = (((2 * attacker.origin.level) / 5) + 2);
    const powerRatio = skill.power * attacker.currentStats.atk / defender.currentStats.def;
    const randomRatio = Math.floor(85 + Math.random()*16) / 100; // [0.85 => 1]
    const maxDamages = Math.floor(((levelRatio * powerRatio / 50) + 2) * randomRatio);
    const damages = Math.min(defender.currentStats.hp, maxDamages);

    console.log(attacker.origin.surname + ' lance ' + skill.name);
    defender.currentStats.hp -= damages;
    console.log(defender.origin.surname + ' perd ' + damages + ' PVs');
    console.log('PVs de ' + defender.origin.surname + ' = ' + defender.currentStats.hp + '/' + defender.origin.currentStats.hp);
  }
}
