// src/utils/validation.js
/** Simple validation helpers */

export function validatePositive(value, name) {
  if (value <= 0) {
    throw new Error(`${name} must be positive`);
  }
}

export function validateCompressionRatio(rc) {
  if (rc <= 1) {
    throw new Error('Compression ratio (rc) must be greater than 1');
  }
}

export function validateSpecificHeatRatio(gamma) {
  if (gamma <= 1) {
    throw new Error('Specific heat ratio (γ) must be greater than 1');
  }
}

export function validateCutoffRatio(beta) {
  if (beta <= 1) {
    throw new Error('Cut‑off ratio (β) must be greater than 1');
  }
}
