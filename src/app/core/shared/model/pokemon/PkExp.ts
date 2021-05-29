export enum PkExp {
  ERRATIC, FAST, MEDIUM_FAST, MEDIUM_SLOW, SLOW, FLUCTUATING,
}

export function getXpValues(pkExp: PkExp): number[] {
  switch (pkExp) {
    case PkExp.ERRATIC: return getErraticXpValues();
    case PkExp.FAST: return getFastXpValues();
    case PkExp.MEDIUM_FAST: return getMediumFastXpValues();
    case PkExp.MEDIUM_SLOW: return getMediumSlowXpValues();
    case PkExp.SLOW: return getSlowXpValues();
    case PkExp.FLUCTUATING: return getFluctuatingXpValues();
  }
}

function getErraticXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    let xpNeeded = 0;
    if(i <= 50) {
      xpNeeded = Math.floor(Math.pow(i, 3) * (100 - i) / 50);
    } else if(i <= 68) {
      xpNeeded = Math.floor(Math.pow(i, 3) * (150 - i) / 50);
    } else if(i <= 98) {
      xpNeeded = Math.floor(Math.pow(i, 3) * ((1911 - 10*i)/3) / 500);
    } else {
      xpNeeded = Math.floor(Math.pow(i, 3) * (160 - i) / 100);
    }
    xpValues.push(xpNeeded);
  }
  return xpValues;
}


function getFastXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    xpValues.push(Math.floor(Math.pow(i, 3) * 4 / 5));
  }
  return xpValues;
}


function getMediumFastXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    xpValues.push(Math.pow(i, 3));
  }
  return xpValues;
}


function getMediumSlowXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    const i3 = Math.pow(i, 3) * 6/5;
    const i2 = Math.pow(i, 2) * 15;
    const i1 = i * 100;
    xpValues.push(Math.floor(i3 - i2 + i1 - 140));
  }
  return xpValues;
}


function getSlowXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    xpValues.push(Math.floor(Math.pow(i, 3) * 5 / 4));
  }
  return xpValues;
}


function getFluctuatingXpValues(): number[] {
  const xpValues = [];
  for(let i = 0; i <= 100; i++) {
    const i3 = Math.pow(i, 3) / 50;
    let ratio = 1;
    if(i <= 15) {
      ratio = 24 + ((i+1)/3);
    } else if(i <= 36) {
      ratio = 14 + i;
    } else {
      ratio = 32 + i/2;
    }
    xpValues.push(Math.floor(i3 * ratio));
  }
  return xpValues;
}
