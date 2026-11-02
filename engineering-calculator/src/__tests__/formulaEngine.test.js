// src/__tests__/formulaEngine.test.js
import { describe, test, expect } from 'vitest';
import { evaluateFormula } from '../engines/formulaEngine.js';
import { ottoProcesses } from '../data/otto/processes.js';

// Use the compression temperature formula (T2 = T1 * rc^(γ-1))
const compressionTempFormula = ottoProcesses.find(f => f.id === 'otto-compression-temperature');

describe('formulaEngine', () => {
  test('compresses temperature correctly', () => {
    const rawInputs = {
      T1: { value: 300, unit: 'K' }, // 300 K
      rc: { value: 8, unit: '-' },
      gamma: { value: 1.4, unit: '-' },
    };
    const { result } = evaluateFormula(compressionTempFormula, rawInputs);
    // Expected: 300 * 8^(0.4)
    const expected = 300 * Math.pow(8, 0.4);
    expect(result.T2.value).toBeCloseTo(expected, 5);
    expect(result.T2.unit).toBe('K');
  });
});
