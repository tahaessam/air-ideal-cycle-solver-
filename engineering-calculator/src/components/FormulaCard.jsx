import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Check } from "lucide-react";

export default function FormulaCard({ formula, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(formula)}
      className={`group w-full rounded-xl border p-4 text-left transition ${
        isSelected
          ? "border-accent bg-accent-soft/60 shadow-[0_0_0_1px_rgba(47,107,255,0.18)]"
          : "border-line bg-white hover:border-line-strong hover:bg-surface-sunken/60"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">{formula.name}</h3>
            <span className="badge-neutral">{formula.category}</span>
          </div>
        </div>
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
            isSelected
              ? "border-accent bg-accent text-white"
              : "border-line bg-white text-transparent group-hover:border-accent/40"
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </span>
      </div>
      {formula.equation && (
        <div className={`katex-panel mt-3 ${isSelected ? "border-accent/20 bg-white" : ""}`}>
          <BlockMath math={formula.equation} />
        </div>
      )}
    </button>
  );
}
