// src/data/otto/processes.js
/** Otto cycle process formulas */
export const ottoProcesses = [
  {
    id: "otto-compression-temperature",
    name: "Final Temperature (T2)",
    category: "Process 1-2",
    equation: "T_2 = T_1 r_c^{\\gamma - 1}",
    inputs: [
      { key: "T1", label: "Initial Temperature", quantity: "temperature", defaultUnit: "K", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "T2", label: "Final Temperature", quantity: "temperature", defaultUnit: "K" }
    ],
    calculate: ({ T1, rc, gamma }) => ({ T2: T1 * Math.pow(rc, gamma - 1) })
  },
  // Additional Otto formulas can be added here following the same structure
];
