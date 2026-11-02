// src/utils/unitConverter.js
/** Unit conversion utilities */

// Conversion factors to SI for each quantity
const conversion = {
  temperature: {
    C: (v) => v + 273.15,
    K: (v) => v,
  },
  pressure: {
    Pa: 1,
    psi: 6894.757, // 1 psi = 6894.757 Pa
    bar: 100000,
    MPa: 1000000,
  },
  volume: {
    m3: 1,
    L: 0.001,
    cm3: 1e-6,
  },
  length: {
    m: 1,
    cm: 0.01,
    mm: 0.001,
  },
  mass: {
    kg: 1,
    g: 0.001,
  },
  energy: {
    J: 1,
    kJ: 1000,
  },
  specificHeat: {
    'J/kg·K': 1,
    'kJ/kg·K': 1000,
  },
  specificVolume: {
    'm3/kg': 1,
  },
  heatingValue: {
    'kJ/kg': 1000,
    'MJ/kg': 1e6,
  },
  ratio: { '-': 1 },
};

/** Convert a value to SI units */
export function toSI(value, quantity, unit) {
  if (quantity === 'temperature') {
    const fn = conversion.temperature[unit];
    if (!fn) throw new Error(`Unsupported temperature unit ${unit}`);
    return fn(value);
  }
  const factor = conversion[quantity]?.[unit];
  if (factor === undefined) throw new Error(`Unsupported conversion for ${quantity} ${unit}`);
  return typeof factor === 'function' ? factor(value) : value * factor;
}

/** Convert a SI value back to desired unit */
export function fromSI(valueSI, quantity, unit) {
  if (quantity === 'temperature') {
    if (unit === 'C') return valueSI - 273.15;
    if (unit === 'K') return valueSI;
    throw new Error(`Unsupported temperature unit ${unit}`);
  }
  const factor = conversion[quantity]?.[unit];
  if (factor === undefined) throw new Error(`Unsupported conversion for ${quantity} ${unit}`);
  return typeof factor === 'function' ? factor(valueSI) : valueSI / factor;
}
