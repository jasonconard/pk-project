import { inject, Service } from '@angular/core';
import { Fighter, FighterPokemon, Fighters } from '../models/Fighters';
import { FightMenuService } from './fight-menu.service';
import { FightMenu } from '../models/FightMenu';
import { GamePkSkill } from '../../../game/shared/model/GamePkSkill';

interface TurnInfo {
  fighter: Fighter;
  pk1: FighterPokemon;
  pk2: FighterPokemon;
}

@Service()
export class FightSequenceService {
  private readonly fightMenuService = inject(FightMenuService);

  private turnInfo: TurnInfo | null = null;

  launchFight(fighters: Fighters): void {
    this.turn({
      fighter: fighters.currentFighter,
      pk1: fighters.currentFighter.pokemons[0],
      pk2: fighters.opponents[0].pokemons[0],
    });
  }

  private turn(turnInfo: TurnInfo): void {
    turnInfo.pk1.current = true;
    this.turnInfo = turnInfo;
    this.fightMenuService.openMenu(turnInfo.fighter, turnInfo.pk1);
  }

  afterChoice(menuChoice: FightMenu): void {
    const turnInfo = this.turnInfo;
    if (!turnInfo) {
      return;
    }
    this.turnInfo = null;

    const playerSkill = menuChoice.skill;
    if (!playerSkill?.pp) {
      return this.turn(turnInfo);
    }
    this.fightMenuService.closeMenu();

    setTimeout(() => {
      const { pk1, pk2 } = turnInfo;
      const order = [pk1, pk2].sort((p1, p2) => p1.currentStats.speed > p2.currentStats.speed ? 1 : 0);

      const sk1 = pk1 === order[0] ? playerSkill : order[0].origin.skills[0];
      const sk2 = pk1 === order[0] ? order[1].origin.skills[0] : playerSkill;

      this.attack(sk1, order[0], order[1]);
      if (order[1].currentStats.hp <= 0) {
        console.log(order[1].origin.surname + ' est KO');
        console.log('Fin du combat !');
        return;
      }
      this.attack(sk2, order[1], order[0]);
      if (order[0].currentStats.hp <= 0) {
        console.log(order[0].origin.surname + ' est KO');
        console.log('Fin du combat !');
        return;
      }
      this.turn(turnInfo);
    }, 500);
  }

  private attack(gameSkill: GamePkSkill | undefined, attacker: FighterPokemon, defender: FighterPokemon): void {
    if (!gameSkill) {
      return;
    }
    const skill = gameSkill.base;

    gameSkill.pp -= 1;

    const levelRatio = (((2 * attacker.origin.level) / 5) + 2);
    const powerRatio = skill.power * attacker.currentStats.atk / defender.currentStats.def;
    const randomRatio = Math.floor(85 + Math.random() * 16) / 100; // [0.85 => 1]
    const maxDamages = Math.floor(((levelRatio * powerRatio / 50) + 2) * randomRatio);
    const damages = Math.min(defender.currentStats.hp, maxDamages);

    console.log(attacker.origin.surname + ' lance ' + skill.name);
    defender.currentStats.hp -= damages;
    console.log(defender.origin.surname + ' perd ' + damages + ' PVs');
    console.log('PVs de ' + defender.origin.surname + ' = ' + defender.currentStats.hp + '/' + defender.origin.currentStats.hp);
  }
}
