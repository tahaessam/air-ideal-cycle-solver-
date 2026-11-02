import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  GitBranch,
  Loader2,
  Play,
  Thermometer,
  PanelRight,
} from "lucide-react";
import { solveCycle } from "../engines/cycleSolver.js";
import ResultCard from "../components/ResultCard.jsx";
import UnitSelector from "../components/UnitSelector.jsx";

const inputMeta = {
  P1: { label: "Initial Pressure", symbol: "P₁", quantity: "pressure" },
  T1: { label: "Initial Temperature", symbol: "T₁", quantity: "temperature" },
  T3: { label: "Peak Temperature", symbol: "T₃", quantity: "temperature" },
  rc: { label: "Compression Ratio", symbol: "r꜀", quantity: "ratio" },
  gamma: { label: "Heat Capacity Ratio", symbol: "γ", quantity: "ratio" },
  beta: { label: "Cutoff Ratio", symbol: "β", quantity: "ratio", dieselOnly: true },
  Qadd: { label: "Heat Added", symbol: "Q_add", quantity: "energy" },
  Qrej: { label: "Heat Rejected", symbol: "Q_rej", quantity: "energy" },
  eta: { label: "Thermal Efficiency", symbol: "η", quantity: "ratio" },
};

export default function CycleSolver() {
  const [cycle, setCycle] = useState("otto");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCycleChange = (type) => {
    setCycle(type);
    setInputs({});
    setResult(null);
    setError(null);
  };

  const handleChange = (key, field, val) => {
    setInputs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const parsedInputs = {};
      for (const k of Object.keys(inputs)) {
        const { value, unit } = inputs[k];
        if (value !== "" && value !== undefined) {
          parsedInputs[k] = { value: Number(value), unit };
        }
      }
      const { results, missingInputs } = solveCycle({ cycle, rawInputs: parsedInputs });
      setResult({ results, missingInputs });
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setSubmitting(false);
    }
  };

  const visibleInputs = Object.entries(inputMeta).filter(
    ([, meta]) => !meta.dieselOnly || cycle === "diesel"
  );

  const stateCards = [1, 2, 3, 4]
    .map((i) => {
      const P = result?.results?.[`P${i}`];
      const T = result?.results?.[`T${i}`];
      if (!P && !T) return null;
      return { i, P, T };
    })
    .filter(Boolean);

  return (
    <div className="page-wrap space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">Multi-state solve</p>
          <h2 className="page-title">Cycle Solver</h2>
          <p className="page-subtitle">
            Enter known Otto or Diesel parameters. The solver computes every property that
            can be derived from your inputs — nothing invented.
          </p>
        </div>

        <div className="segmented self-start">
          {["otto", "diesel"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleCycleChange(type)}
              className={`segmented-btn ${cycle === type ? "segmented-btn-active" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-danger-border bg-danger-soft px-4 py-3 text-sm text-danger">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <form onSubmit={handleSubmit} className="panel self-start overflow-hidden xl:col-span-5">
          <div className="panel-header">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
                <GitBranch size={15} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">Input parameters</h3>
                <p className="text-[11px] text-ink-tertiary capitalize">
                  {cycle} cycle · optional fields allowed
                </p>
              </div>
            </div>
            <span className="badge-accent capitalize">{cycle}</span>
          </div>

          <div className="space-y-3.5 p-5">
            {visibleInputs.map(([key, meta]) => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-medium text-ink">
                    <span className="mr-1.5 font-semibold text-accent">{meta.symbol}</span>
                    {meta.label}
                  </label>
                  <span className="font-mono text-[11px] text-ink-tertiary">{key}</span>
                </div>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={inputs[key]?.value ?? ""}
                    onChange={(e) => handleChange(key, "value", e.target.value)}
                    placeholder="Optional"
                    className="field-input rounded-r-none border-r-0"
                  />
                  <UnitSelector
                    quantity={meta.quantity}
                    unit={inputs[key]?.unit ?? ""}
                    onChange={(val) => handleChange(key, "unit", val)}
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="btn-primary mt-2 w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Solving…
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Solve Cycle
                </>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-6 xl:col-span-7">
          {result ? (
            <>
              {result.missingInputs.length > 0 && (
                <div className="flex items-start gap-2.5 rounded-xl border border-warning-border bg-warning-soft px-4 py-3 text-sm text-amber-800">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold">Incomplete input set. </span>
                    Some formulas could not run without:{" "}
                    <span className="font-mono text-xs">{result.missingInputs.join(", ")}</span>
                  </div>
                </div>
              )}

              <ResultCard results={result.results} title="Derived cycle results" />

              {stateCards.length > 0 && (
                <section className="panel overflow-hidden">
                  <div className="panel-header">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                        <Thermometer size={15} />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-ink">State points</h3>
                        <p className="text-[11px] text-ink-tertiary">
                          Only states with computed pressure or temperature
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 p-4 sm:grid-cols-2">
                    {stateCards.map(({ i, P, T }) => (
                      <div
                        key={i}
                        className="rounded-xl border border-line bg-surface-sunken/70 p-4"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                            {i}
                          </span>
                          <span className="text-sm font-semibold text-ink">State {i}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          {P && (
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-ink-tertiary">Pressure</span>
                              <span className="font-mono font-semibold tabular-nums text-ink">
                                {Number(P.value).toPrecision(5)}
                                <span className="ml-1.5 text-[11px] font-medium text-accent">
                                  {P.unit}
                                </span>
                              </span>
                            </div>
                          )}
                          {T && (
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-ink-tertiary">Temperature</span>
                              <span className="font-mono font-semibold tabular-nums text-ink">
                                {Number(T.value).toPrecision(5)}
                                <span className="ml-1.5 text-[11px] font-medium text-accent">
                                  {T.unit}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <PanelRight size={22} />
              </div>
              <p className="text-sm font-semibold text-ink">Awaiting cycle inputs</p>
              <p className="mt-1.5 max-w-sm text-sm text-ink-secondary">
                Provide any combination of known parameters and solve. Results and state
                cards appear only from real solver output.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
