import { describe, test, expect } from 'vitest';
import { toSI, fromSI } from '../utils/unitConverter.js';

describe('unitConverter', () => {
  test('pressure conversion round‑trip', () => {
    const psiValue = 14.6959; // approx psi for 1 atm
    const si = toSI(psiValue, 'pressure', 'psi');
    const back = fromSI(si, 'pressure', 'psi');
    expect(Math.abs(back - psiValue)).toBeLessThan(0.001);
  });

  test('temperature conversion (C to K)', () => {
    const c = 25;
    const si = toSI(c, 'temperature', 'C'); // should be 298.15 K
    expect(si).toBeCloseTo(298.15, 2);
    const back = fromSI(si, 'temperature', 'C');
    expect(back).toBeCloseTo(25, 2);
  });
});
