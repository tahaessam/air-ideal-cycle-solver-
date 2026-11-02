// src/data/diesel/basic.js
/** Basic Diesel cycle formulas */
export const dieselBasic = [
  {
    id: "diesel-compression-pressure",
    name: "Compression Pressure (P2)",
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
    id: "diesel-thermal-efficiency-basic",
    name: "Thermal Efficiency (Basic)",
    category: "Performance",
    equation: "\\eta_{th}=1-\\frac{1}{r_c^{\\gamma-1}}",
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
