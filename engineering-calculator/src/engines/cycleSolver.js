// src/engines/cycleSolver.js
/**
 * Cycle Solver Engine
 * Accepts a cycle type ('otto' | 'diesel') and a set of raw inputs.
 * Returns all computable results and a list of any missing inputs.
 */
import { toSI, fromSI } from "../utils/unitConverter.js";
import { validatePositive, validateCompressionRatio, validateSpecificHeatRatio, validateCutoffRatio } from "../utils/validation.js";
import { ottoFormulas } from "../data/otto/index.js";
import { dieselFormulas } from "../data/diesel/index.js";

function getFormulas(cycle) {
  if (cycle === "otto") return ottoFormulas;
  if (cycle === "diesel") return dieselFormulas;
  throw new Error("Unsupported cycle type: " + cycle);
}

function validateInputs(formula, inputsSI) {
  // Run generic validation based on quantity type
  for (const inp of formula.inputs) {
    const val = inputsSI[inp.key];
    if (val === undefined) continue; // will be caught later if required
    switch (inp.quantity) {
      case "positive":
        validatePositive(val, inp.label);
        break;
      case "ratio":
        if (inp.key === "rc") validateCompressionRatio(val);
        else if (inp.key === "gamma") validateSpecificHeatRatio(val);
        else if (inp.key === "beta") validateCutoffRatio(val);
        else validatePositive(val, inp.label);
        break;
      default:
        // For temperature, pressure, energy – they must be positive
        validatePositive(val, inp.label);
    }
  }
}

export function solveCycle({ cycle, rawInputs }) {
  // Convert raw inputs to SI units
  const inputsSI = {};
  for (const [key, { value, unit }] of Object.entries(rawInputs)) {
    inputsSI[key] = toSI(value, inferQuantityFromKey(key), unit);
  }

  const formulas = getFormulas(cycle);
  const known = { ...inputsSI };
  const computed = {};
  let progress = true;

  while (progress) {
    progress = false;
    for (const formula of formulas) {
      // Skip if all outputs already known
      const allOutputsKnown = formula.outputs.every(o => known[o.key] !== undefined);
      if (allOutputsKnown) continue;
      // Check if all required inputs are present
      const requiredInputs = formula.inputs.filter(i => i.required);
      const haveAll = requiredInputs.every(i => known[i.key] !== undefined);
      if (!haveAll) continue;
      // Validate inputs
      try {
        validateInputs(formula, known);
      } catch {
        // Validation failed – skip this formula
        continue;
      }
      // Build inputs object for this formula
      const formulaInputs = {};
      for (const inp of formula.inputs) {
        if (known[inp.key] !== undefined) {
          formulaInputs[inp.key] = known[inp.key];
        }
      }
      const result = formula.calculate(formulaInputs);
      // Merge results into known
      for (const [k, v] of Object.entries(result)) {
        known[k] = v;
        computed[k] = { value: v, unit: formula.outputs.find(o => o.key === k)?.defaultUnit || "" };
      }
      progress = true;
    }
  }

  // Determine which original inputs are still missing for any unsolved formulas
  const missingInputs = [];
  for (const formula of formulas) {
    const required = formula.inputs.filter(i => i.required);
    for (const inp of required) {
      if (known[inp.key] === undefined && !missingInputs.includes(inp.key)) {
        missingInputs.push(inp.key);
      }
    }
  }

  // Convert computed results back to user-preferred units (same as defaultUnit for now)
  const results = {};
  for (const [k, { value, unit }] of Object.entries(computed)) {
    const userValue = fromSI(value, inferQuantityFromKey(k), unit);
    results[k] = { value: userValue, unit };
  }

  return { results, missingInputs };
}

// Helper to infer quantity from a key – simplistic mapping used throughout the project
function inferQuantityFromKey(key) {
  const map = {
    P1: "pressure",
    P2: "pressure",
    Pm: "pressure",
    rc: "ratio",
    gamma: "ratio",
    beta: "ratio",
    eta: "ratio",
    T1: "temperature",
    T2: "temperature",
    T3: "temperature",
    T4: "temperature",
    Qadd: "energy",
    Qrej: "energy",
    Wnet: "energy"
  };
  return map[key] || "ratio"; // default fallback
}
