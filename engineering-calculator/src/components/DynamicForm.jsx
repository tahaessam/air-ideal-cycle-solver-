import { useState } from "react";
import { AlertCircle, Loader2, Play } from "lucide-react";
import UnitSelector from "./UnitSelector.jsx";

export default function DynamicForm({ formula, onSubmit, submitting = false }) {
  const buildInitialState = (f) => {
    const state = {};
    f.inputs.forEach((inp) => {
      state[inp.key] = { value: inp.defaultValue ?? "", unit: inp.defaultUnit };
    });
    return state;
  };

  const [formState, setFormState] = useState(() => buildInitialState(formula));
  const [error, setError] = useState(null);

  const handleChange = (key, field, val) => {
    setFormState((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    for (const inp of formula.inputs) {
      const entry = formState[inp.key];
      if (inp.required && (entry.value === "" || isNaN(Number(entry.value)))) {
        setError(`${inp.label} is required and must be a number`);
        return;
      }
    }
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-danger-border bg-danger-soft px-3.5 py-3 text-sm text-danger">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {formula.inputs.map((inp) => (
        <div key={inp.key} className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-ink">{inp.label}</label>
            <span className="font-mono text-[11px] font-medium text-ink-tertiary">{inp.key}</span>
          </div>
          <div className="flex">
            <input
              type="number"
              step="any"
              value={formState[inp.key]?.value ?? ""}
              onChange={(e) => handleChange(inp.key, "value", e.target.value)}
              placeholder={inp.defaultValue?.toString() ?? "Enter value"}
              className="field-input rounded-r-none border-r-0"
            />
            <UnitSelector
              quantity={inp.quantity}
              unit={formState[inp.key]?.unit ?? ""}
              onChange={(val) => handleChange(inp.key, "unit", val)}
            />
          </div>
        </div>
      ))}

      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Calculating…
          </>
        ) : (
          <>
            <Play size={16} fill="currentColor" />
            Calculate
          </>
        )}
      </button>
    </form>
  );
}
