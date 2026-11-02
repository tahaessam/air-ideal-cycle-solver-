// src/data/diesel/processes.js
/** Diesel cycle process formulas */
export const dieselProcesses = [
  {
    id: "diesel-compression-temperature",
    name: "Compression Temperature (T2)",
    category: "Process 1-2",
    equation: "T_2 = T_1 r_c^{\\gamma - 1}",
    inputs: [
      { key: "T1", label: "Initial Temperature", quantity: "temperature", defaultUnit: "K", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "T2", label: "Temperature after Compression", quantity: "temperature", defaultUnit: "K" }
    ],
    calculate: ({ T1, rc, gamma }) => ({ T2: T1 * Math.pow(rc, gamma - 1) })
  },
  {
    id: "diesel-expansion-temperature",
    name: "Expansion Temperature (T4)",
    category: "Process 3-4",
    equation: "T_4 = T_3 \\left( \\frac{\\beta}{r_c} \\right)^{\\gamma - 1}",
    inputs: [
      { key: "T3", label: "Temperature after Heat Addition", quantity: "temperature", defaultUnit: "K", required: true },
      { key: "beta", label: "Cut‑off Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "T4", label: "Final Temperature", quantity: "temperature", defaultUnit: "K" }
    ],
    calculate: ({ T3, beta, rc, gamma }) => ({ T4: T3 * Math.pow(beta / rc, gamma - 1) })
  },
  {
    id: "diesel-thermal-efficiency",
    name: "Thermal Efficiency",
    category: "Performance",
    equation: "\\eta_{th}=1- \\frac{1}{r_c^{\\gamma-1}} \\left( \\frac{\\beta^{\\gamma}-1}{\\gamma(\\beta-1)} \\right)",
    inputs: [
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "beta", label: "Cut‑off Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true }
    ],
    outputs: [
      { key: "eta", label: "Thermal Efficiency", quantity: "ratio", defaultUnit: "-" }
    ],
    calculate: ({ rc, beta, gamma }) => ({
      eta: 1 - (1 / Math.pow(rc, gamma - 1)) * ((Math.pow(beta, gamma) - 1) / (gamma * (beta - 1)))
    })
  }
];
