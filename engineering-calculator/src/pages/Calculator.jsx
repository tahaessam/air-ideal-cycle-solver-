import { useMemo, useState } from "react";
import { AlertCircle, Calculator as CalcIcon, FlaskConical, PanelRight } from "lucide-react";
import FormulaSelector from "../components/FormulaSelector.jsx";
import DynamicForm from "../components/DynamicForm.jsx";
import ResultCard from "../components/ResultCard.jsx";
import CalculationSteps from "../components/CalculationSteps.jsx";
import { evaluateFormula } from "../engines/formulaEngine.js";
import { ottoFormulas } from "../data/otto/index.js";
import { dieselFormulas } from "../data/diesel/index.js";

export default function Calculator() {
  const [cycle, setCycle] = useState("otto");
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const formulas = useMemo(
    () => (cycle === "diesel" ? dieselFormulas : ottoFormulas),
    [cycle]
  );

  const handleCycleChange = (next) => {
    setCycle(next);
    setSelectedFormula(null);
    setCalcResult(null);
    setError(null);
  };

  const handleFormulaSelect = (formula) => {
    setSelectedFormula(formula);
    setCalcResult(null);
    setError(null);
  };

  const handleCalculate = (rawInputs) => {
    try {
      setSubmitting(true);
      setError(null);
      const parsedInputs = {};
      for (const key of Object.keys(rawInputs)) {
        const { value, unit } = rawInputs[key];
        parsedInputs[key] = { value: Number(value), unit };
      }
      const { result } = evaluateFormula(selectedFormula, parsedInputs);
      setCalcResult({ result, inputs: parsedInputs });
    } catch (e) {
      setError(e.message);
      setCalcResult(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrap space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">Single formula</p>
          <h2 className="page-title">Formula Calculator</h2>
          <p className="page-subtitle">
            Choose Otto or Diesel, pick an equation, enter values with units, and review
            precise results with solution steps.
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
        {/* Left column */}
        <div className="space-y-6 xl:col-span-5">
          <section className="panel overflow-hidden">
            <div className="panel-header">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                  <FlaskConical size={15} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Formula library</h3>
                  <p className="text-[11px] text-ink-tertiary">
                    {formulas.length} {cycle} formulas available
                  </p>
                </div>
              </div>
              <span className="badge-accent capitalize">{cycle}</span>
            </div>
            <div className="p-4">
              <FormulaSelector
                formulas={formulas}
                selectedId={selectedFormula?.id}
                onSelect={handleFormulaSelect}
              />
            </div>
          </section>

          {selectedFormula ? (
            <section className="panel overflow-hidden">
              <div className="panel-header">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{selectedFormula.name}</h3>
                  <p className="text-[11px] text-ink-tertiary">{selectedFormula.category}</p>
                </div>
                <span className="badge-neutral">Inputs</span>
              </div>
              <div className="p-5">
                <DynamicForm
                  key={selectedFormula.id}
                  formula={selectedFormula}
                  onSubmit={handleCalculate}
                  submitting={submitting}
                />
              </div>
            </section>
          ) : (
            <div className="empty-state !min-h-[180px]">
              <CalcIcon size={22} className="mb-2 text-ink-tertiary" />
              <p className="text-sm font-medium text-ink">Select a formula to begin</p>
              <p className="mt-1 max-w-xs text-xs text-ink-tertiary">
                The input panel appears once a formula card is selected from the library.
              </p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6 xl:col-span-7">
          {calcResult ? (
            <>
              <ResultCard results={calcResult.result} title="Computed metrics" />
              <CalculationSteps
                formula={selectedFormula}
                inputs={calcResult.inputs}
                result={calcResult.result}
              />
            </>
          ) : (
            <div className="empty-state">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <PanelRight size={22} />
              </div>
              <p className="text-sm font-semibold text-ink">Results workspace</p>
              <p className="mt-1.5 max-w-sm text-sm text-ink-secondary">
                Metric cards and KaTeX solution steps will appear here after you run a
                calculation. No placeholder values are shown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
