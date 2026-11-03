import { Service, signal } from '@angular/core';
import { FightMenu } from '../models/FightMenu';
import { Fighter, FighterPokemon } from '../models/Fighters';

@Service()
export class FightMenuService {
  private readonly menuState = signal<FightMenu[]>([]);
  readonly menu = this.menuState.asReadonly();

  openMenu(currentFighter: Fighter, pokemon: FighterPokemon): void {
    const atkMenu: FightMenu = {
      id: 'attack', label: 'Attaque', desc: 'Lancer une attaque', enabled: true,
      subMenus: pokemon.origin.skills.map(skill => ({
        id: skill.base.name.toLowerCase(),
        label: skill.base.name,
        amount: skill.pp + '/' + skill.base.pp + ' PP',
        desc: skill.base.description + ' ( Puissance: ' + skill.base.power + ' )',
        subMenus: [],
        enabled: !!skill.pp,
        skill
      }))
    };
    // TODO CHECK NO PP AND LUTTE

    const pkmnMenu: FightMenu = {
      id: 'pokemons',
      label: 'Pokémons',
      enabled: true,
      subMenus: currentFighter.pokemons.map((pk, i) => ({
        id: pk.origin.surname + '-' + i,
        label: pk.origin.surname,
        enabled: !pk.current,
        amount: pk.currentStats.hp + '/' + pk.origin.currentStats.hp + ' HP',
        subMenus: [],
        pokemon: pk
      }))
    };

    const objectsMenu: FightMenu = { id: 'objects', label: 'Objets', enabled: false, subMenus: [] };
    const escapeMenu: FightMenu = { id: 'escape', label: 'Fuite', isEscape: true, enabled: false, subMenus: [] };

    this.menuState.set([atkMenu, pkmnMenu, objectsMenu, escapeMenu]);
  }

  closeMenu(): void {
    this.menuState.set([]);
  }
}
