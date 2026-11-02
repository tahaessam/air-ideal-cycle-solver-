// src/__tests__/validation.test.js
import { describe, test, expect } from 'vitest';
import { validatePositive, validateCompressionRatio, validateSpecificHeatRatio, validateCutoffRatio } from '../utils/validation.js';

describe('validation utilities', () => {
  test('validatePositive throws for non‑positive', () => {
    expect(() => validatePositive(0, 'test')).toThrow('must be positive');
    expect(() => validatePositive(-5, 'test')).toThrow('must be positive');
  });

  test('validateCompressionRatio requires >1', () => {
    expect(() => validateCompressionRatio(1)).toThrow('greater than 1');
    expect(() => validateCompressionRatio(0.9)).toThrow('greater than 1');
    expect(() => validateCompressionRatio(2)).not.toThrow();
  });

  test('validateSpecificHeatRatio requires >1', () => {
    expect(() => validateSpecificHeatRatio(1)).toThrow('greater than 1');
    expect(() => validateSpecificHeatRatio(0.5)).toThrow('greater than 1');
    expect(() => validateSpecificHeatRatio(1.4)).not.toThrow();
  });

  test('validateCutoffRatio requires >1', () => {
    expect(() => validateCutoffRatio(1)).toThrow('greater than 1');
    expect(() => validateCutoffRatio(0.8)).toThrow('greater than 1');
    expect(() => validateCutoffRatio(1.2)).not.toThrow();
  });
});
