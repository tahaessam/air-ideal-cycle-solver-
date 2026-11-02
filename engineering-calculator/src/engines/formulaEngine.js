// src/engines/formulaEngine.js
/** Engine for evaluating a single formula */
import { toSI, fromSI } from "../utils/unitConverter.js";

/**
 * Evaluate a formula definition with raw user inputs (including units).
 * Returns result object with raw SI value and formatted output.
 */
export function evaluateFormula(formula, rawInputs, outputUnit) {
  // Convert inputs to SI
  const siInputs = {};
  for (const inp of formula.inputs) {
    const raw = rawInputs[inp.key];
    if (raw == null) {
      throw new Error(`Missing input ${inp.key}`);
    }
    const valueSI = toSI(raw.value, inp.quantity, raw.unit);
    // Basic physical validation
    if (inp.quantity === "ratio") {
      // Ratios like rc, gamma, beta must be >1
      if (valueSI <= 1) {
        throw new Error(`${inp.label} must be > 1`);
      }
    } else if (inp.quantity === "temperature") {
      if (valueSI <= 0) {
        throw new Error(`${inp.label} must be absolute temperature > 0 K`);
      }
    } else {
      if (valueSI < 0) {
        // generic non‑negative check for most physical quantities
        throw new Error(`${inp.label} cannot be negative`);
      }
    }
    siInputs[inp.key] = valueSI;
  }

  // Run formula calculation (expects SI inputs)
  const resultSI = formula.calculate(siInputs);

  // Convert outputs to desired units
  const result = {};
  for (const out of formula.outputs) {
    const rawValSI = resultSI[out.key];
    const unit = outputUnit?.[out.key] || out.defaultUnit;
    const value = fromSI(rawValSI, out.quantity, unit);
    result[out.key] = { value, unit };
  }

  return { result, siInputs, resultSI };
}
