// src/data/otto/basic.js
/** Additional Otto cycle basic formulas */
export const ottoBasic = [
  {
    id: "otto-compression-pressure",
    name: "Final Pressure (P2)",
    category: "Process 1-2",
    equation: "P_2 = P_1 r_c^{\\gamma}",
    inputs: [
      { key: "P1", label: "Initial Pressure", quantity: "pressure", defaultUnit: "Pa", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "P2", label: "Final Pressure", quantity: "pressure", defaultUnit: "Pa" }
    ],
    calculate: ({ P1, rc, gamma }) => ({ P2: P1 * Math.pow(rc, gamma) })
  },
  {
    id: "otto-expansion-temperature",
    name: "Expansion Temperature (T4)",
    category: "Process 3-4",
    equation: "T_4 = T_3 / r_c^{\\gamma - 1}",
    inputs: [
      { key: "T3", label: "Temperature after Heat Addition", quantity: "temperature", defaultUnit: "K", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "T4", label: "Final Temperature", quantity: "temperature", defaultUnit: "K" }
    ],
    calculate: ({ T3, rc, gamma }) => ({ T4: T3 / Math.pow(rc, gamma - 1) })
  },
  {
    id: "otto-thermal-efficiency",
    name: "Thermal Efficiency",
    category: "Performance",
    equation: "\\eta_{th} = 1 - 1 / r_c^{\\gamma - 1}",
    inputs: [
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "eta", label: "Thermal Efficiency", quantity: "ratio", defaultUnit: "-" }
    ],
    calculate: ({ rc, gamma }) => ({ eta: 1 - 1 / Math.pow(rc, gamma - 1) })
  }
];
