// src/data/otto/index.js
/** Export all Otto cycle formulas */
import { ottoBasic } from "./basic.js";
import { ottoProcesses } from "./processes.js";
import { ottoPerformance } from "./performance.js";

export const ottoFormulas = [...ottoBasic, ...ottoProcesses, ...ottoPerformance];
