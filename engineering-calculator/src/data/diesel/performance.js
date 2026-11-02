// src/data/diesel/performance.js
/** Diesel cycle performance formulas */
export const dieselPerformance = [
  {
    id: "diesel-mean-effective-pressure",
    name: "Mean Effective Pressure (MEP)",
    category: "Performance",
    equation: "P_m = \\frac{P_1 r_c^{\\gamma}}{(\\gamma - 1)(r_c - 1)} \\gamma (\\beta - 1) \\eta_{th}",
    inputs: [
      { key: "P1", label: "Initial Pressure", quantity: "pressure", defaultUnit: "Pa", required: true },
      { key: "rc", label: "Compression Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "gamma", label: "Specific Heat Ratio", quantity: "ratio", defaultUnit: "-", defaultValue: 1.4, required: true },
      { key: "beta", label: "Cut‑off Ratio", quantity: "ratio", defaultUnit: "-", required: true },
      { key: "eta", label: "Thermal Efficiency", quantity: "ratio", defaultUnit: "-", required: true }
    ],
    outputs: [
      { key: "Pm", label: "Mean Effective Pressure", quantity: "pressure", defaultUnit: "Pa" }
    ],
    calculate: ({ P1, rc, gamma, beta, eta }) => {
      const numerator = P1 * Math.pow(rc, gamma);
      const denominator = (gamma - 1) * (rc - 1);
      return { Pm: (numerator / denominator) * gamma * (beta - 1) * eta };
    }
  },
  {
    id: "diesel-net-work",
    name: "Net Work (Wnet)",
    category: "Performance",
    equation: "W_{net}=Q_{add}-Q_{rej}",
    inputs: [
      { key: "Qadd", label: "Heat Added", quantity: "energy", defaultUnit: "J", required: true },
      { key: "Qrej", label: "Heat Rejected", quantity: "energy", defaultUnit: "J", required: true }
    ],
    outputs: [
      { key: "Wnet", label: "Net Work", quantity: "energy", defaultUnit: "J" }
    ],
    calculate: ({ Qadd, Qrej }) => ({ Wnet: Qadd - Qrej })
  }
];
