// src/data/diesel/index.js
/** Export all Diesel cycle formulas */
import { dieselBasic } from "./basic.js";
import { dieselProcesses } from "./processes.js";
import { dieselPerformance } from "./performance.js";

export const dieselFormulas = [...dieselBasic, ...dieselProcesses, ...dieselPerformance];
