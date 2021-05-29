import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { FightMenu } from "../models/FightMenu";
import { FighterPokemon } from "../models/Fighters";
import { Game } from "../../../game/shared/model/Game";

@Injectable({
  providedIn: 'root'
})
export class FightMenuService {

  private menuSubject = new BehaviorSubject<FightMenu[]>([]);
  public menuState = this.menuSubject.asObservable();

  constructor() {

  }

  openMenu(game: Game, pokemon: FighterPokemon) {
    const currentFighter = game.fightHelper.fighters.currentFighter;

    const atkMenu = {
      id: 'attack', label: 'Attaque', desc: 'Lancer une attaque', enabled: true,
      subMenus: pokemon.origin.skills.map(skill => {
        return {
          id: skill.base.name.toLowerCase(),
          label: skill.base.name,
          amount: skill.pp + '/' + skill.base.pp + ' PP',
          desc: skill.base.description + ' ( Puissance: ' + skill.base.power + ' )',
          subMenus: [],
          enabled: !!skill.pp,
          skill
        }
      })
    }
    // TODO CHECK NO PP AND LUTTE


    const pkmnMenu = {
      id: 'pokemons',
      label: 'Pokémons',
      enabled: true,
      subMenus: currentFighter.pokemons.map((pk, i) => {
        return {
          id: pk.origin.surname + '-' + i,
          label: pk.origin.surname,
          enabled: !pk.current,
          amount: pk.currentStats.hp + '/' + pk.origin.currentStats.hp + ' HP',
          subMenus: []
        }
      })
    };

    const objectsMenu = {
      id: 'objects', label: 'Objets', enabled: false, subMenus: [],
    };

    const escapeMenu = {
      id: 'escape', label: 'Fuite', isEscape: true, enabled: false, subMenus: []
    };

    this.menuSubject.next([atkMenu, pkmnMenu, objectsMenu, escapeMenu]);
  }

  closeMenu() {
    this.menuSubject.next([]);
  }

}
