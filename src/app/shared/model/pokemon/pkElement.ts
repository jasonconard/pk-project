export enum ElementType {
  NORMAL, FIGHTING, FLYING, POISON, GROUND, ROCK,
  BUG, GHOST, STEEL, FIRE, WATER, GRASS,
  ELECTRIC, PSYCHIC, ICE, DRAGON, DARK, FAIRY, UNKNOWN
}

export interface PkElement {
  type: ElementType,
  resistedBy: ElementType[],
  cancelledBy: ElementType[],
  strongAgainst: ElementType[]
}

export function getElementRatio(attackingType: ElementType, defendingTypes: ElementType[]): number {
  let ratio = 1;
  const elem = PkElements[attackingType];
  if(!elem) { return 1; }


  defendingTypes.forEach(defendingType => {
    if(elem.resistedBy.indexOf(defendingType) >= 0) { ratio *= 0.5; }
    if(elem.cancelledBy.indexOf(defendingType) >= 0) { ratio *= 0; }
    if(elem.strongAgainst.indexOf(defendingType) >= 0) { ratio *= 2; }

    if(defendingType === ElementType.NORMAL && attackingType === ElementType.FIGHTING) {
      console.log(ratio);
      console.log(elem);
    }
  });

  return ratio;
}

export interface ElementTableRow {
  attackingElem: PkElement,
  defendingElems: { defendingElem: PkElement, ratio: number }[]
}

export function getElementTable(): ElementTableRow[] {
  const elements = getAllElements();
  return elements.map(attackingElem => {
    return {
      attackingElem,
      defendingElems: elements.map(defendingElem => {
        return {
          defendingElem,
          ratio: getElementRatio(attackingElem.type, [defendingElem.type])
        };
      })
    };
  });
}

export function getAllElements(): PkElement[] {
  const keys = Object.keys(PkElements);
  const elements: PkElement[] = [];
  keys.forEach(key => {
    elements.push(PkElements[key]);
  });
  return elements;
}

export const PkElements: { [key: number]: PkElement } = {
  [ElementType.NORMAL]: {
    type: ElementType.NORMAL,
    resistedBy: [ElementType.ROCK, ElementType.STEEL],
    cancelledBy: [ElementType.GHOST],
    strongAgainst: []
  },
  [ElementType.FIGHTING]: {
    type: ElementType.FIGHTING,
    resistedBy: [ElementType.FLYING, ElementType.POISON, ElementType.BUG, ElementType.PSYCHIC, ElementType.FAIRY],
    cancelledBy: [ElementType.GHOST],
    strongAgainst: [ElementType.NORMAL, ElementType.ROCK, ElementType.STEEL, ElementType.ICE, ElementType.DARK]
  },
  [ElementType.FLYING]: {
    type: ElementType.FLYING,
    resistedBy: [ElementType.ROCK, ElementType.STEEL, ElementType.ELECTRIC],
    cancelledBy: [],
    strongAgainst: [ElementType.FIGHTING, ElementType.BUG, ElementType.GRASS]
  },
  [ElementType.POISON]: {
    type: ElementType.POISON,
    resistedBy: [ElementType.POISON, ElementType.GROUND, ElementType.ROCK, ElementType.GHOST],
    cancelledBy: [ElementType.STEEL],
    strongAgainst: [ElementType.GRASS, ElementType.FAIRY]
  },
  [ElementType.GROUND]: {
    type: ElementType.GROUND,
    resistedBy: [ElementType.BUG, ElementType.GRASS],
    cancelledBy: [ElementType.FLYING],
    strongAgainst: [ElementType.POISON, ElementType.ROCK, ElementType.STEEL, ElementType.FIRE, ElementType.ELECTRIC]
  },
  [ElementType.ROCK]: {
    type: ElementType.ROCK,
    resistedBy: [ElementType.FIGHTING, ElementType.GROUND, ElementType.STEEL],
    cancelledBy: [],
    strongAgainst: [ElementType.FLYING, ElementType.BUG, ElementType.FIRE, ElementType.ICE]
  },
  [ElementType.BUG]: {
    type: ElementType.BUG,
    resistedBy: [ElementType.FIGHTING, ElementType.FLYING, ElementType.POISON, ElementType.GHOST, ElementType.STEEL, ElementType.FIRE, ElementType.FAIRY],
    cancelledBy: [],
    strongAgainst: [ElementType.GRASS, ElementType.PSYCHIC, ElementType.DARK]
  },
  [ElementType.GHOST]: {
    type: ElementType.GHOST,
    resistedBy: [ElementType.DARK],
    cancelledBy: [ElementType.NORMAL],
    strongAgainst: [ElementType.GHOST, ElementType.PSYCHIC]
  },
  [ElementType.STEEL]: {
    type: ElementType.STEEL,
    resistedBy: [ElementType.STEEL, ElementType.FIRE, ElementType.WATER, ElementType.ELECTRIC],
    cancelledBy: [],
    strongAgainst: [ElementType.ROCK, ElementType.ICE, ElementType.FAIRY]
  },
  [ElementType.FIRE]: {
    type: ElementType.FIRE,
    resistedBy: [ElementType.ROCK, ElementType.FIRE, ElementType.WATER, ElementType.DRAGON],
    cancelledBy: [],
    strongAgainst: [ElementType.BUG, ElementType.STEEL, ElementType.GRASS, ElementType.ICE]
  },
  [ElementType.WATER]: {
    type: ElementType.WATER,
    resistedBy: [ElementType.WATER, ElementType.GRASS, ElementType.DRAGON],
    cancelledBy: [],
    strongAgainst: [ElementType.GROUND, ElementType.ROCK, ElementType.FIRE]
  },
  [ElementType.GRASS]: {
    type: ElementType.GRASS,
    resistedBy: [ElementType.FLYING, ElementType.POISON, ElementType.BUG, ElementType.STEEL, ElementType.FIRE, ElementType.GRASS, ElementType.DRAGON],
    cancelledBy: [],
    strongAgainst: [ElementType.GROUND, ElementType.ROCK, ElementType.WATER]
  },
  [ElementType.ELECTRIC]: {
    type: ElementType.ELECTRIC,
    resistedBy: [ElementType.GRASS, ElementType.ELECTRIC, ElementType.DRAGON],
    cancelledBy: [ElementType.GROUND],
    strongAgainst: [ElementType.FLYING, ElementType.WATER]
  },
  [ElementType.PSYCHIC]: {
    type: ElementType.PSYCHIC,
    resistedBy: [ElementType.STEEL, ElementType.PSYCHIC],
    cancelledBy: [ElementType.DARK],
    strongAgainst: [ElementType.FIGHTING, ElementType.POISON]
  },
  [ElementType.ICE]: {
    type: ElementType.ICE,
    resistedBy: [ElementType.STEEL, ElementType.FIRE, ElementType.WATER, ElementType.ICE],
    cancelledBy: [],
    strongAgainst: [ElementType.FLYING, ElementType.GROUND, ElementType.GRASS, ElementType.DRAGON]
  },
  [ElementType.DRAGON]: {
    type: ElementType.DRAGON,
    resistedBy: [ElementType.STEEL],
    cancelledBy: [ElementType.FAIRY],
    strongAgainst: [ElementType.DRAGON]
  },
  [ElementType.DARK]: {
    type: ElementType.DARK,
    resistedBy: [ElementType.FIGHTING, ElementType.DARK, ElementType.FAIRY],
    cancelledBy: [],
    strongAgainst: [ElementType.GHOST, ElementType.PSYCHIC]
  },
  [ElementType.FAIRY]: {
    type: ElementType.FAIRY,
    resistedBy: [ElementType.POISON, ElementType.STEEL, ElementType.FIRE],
    cancelledBy: [],
    strongAgainst: [ElementType.FIGHTING, ElementType.DRAGON, ElementType.DARK]
  },
  [ElementType.UNKNOWN]: {
    type: ElementType.UNKNOWN,
    resistedBy: [],
    cancelledBy: [],
    strongAgainst: []
  }
}
