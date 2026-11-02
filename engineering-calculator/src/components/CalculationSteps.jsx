import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { BookOpen, Equal, FunctionSquare, ListOrdered } from "lucide-react";

export default function CalculationSteps({ formula, inputs, result }) {
  if (!formula || !result) return null;

  const steps = [
    {
      id: 1,
      icon: FunctionSquare,
      title: "Governing equation",
      tone: "neutral",
      content: (
        <div className="katex-panel bg-white">
          <BlockMath math={formula.equation} />
        </div>
      ),
    },
    {
      id: 2,
      icon: ListOrdered,
      title: "Substituted inputs",
      tone: "neutral",
      content: (
        <div className="space-y-2 rounded-xl border border-line bg-white px-4 py-3">
          {Object.entries(inputs).map(([k, { value, unit }]) => (
            <div key={k} className="flex items-center justify-between gap-3 text-sm">
              <span className="font-mono text-xs font-semibold text-ink-tertiary">{k}</span>
              <div className="katex-panel !border-0 !bg-transparent !p-0">
                <InlineMath math={`${value}\\;\\text{${unit || ""}}`} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      icon: Equal,
      title: "Computed result",
      tone: "success",
      content: (
        <div className="space-y-2 rounded-xl border border-success-border bg-success-soft px-4 py-3">
          {Object.entries(result).map(([k, { value, unit }]) => (
            <div key={k} className="katex-panel !border-success-border/60 !bg-white">
              <InlineMath math={`${k} = ${Number(value).toFixed(4)}\\;\\text{${unit || ""}}`} />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
            <BookOpen size={15} />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-ink">Solution steps</h4>
            <p className="text-[11px] text-ink-tertiary">{formula.name}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {steps.map(({ id, icon: Icon, title, content }) => (
          <div key={id} className="relative pl-10">
            <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Icon size={14} />
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
                Step {id}
              </span>
              <span className="text-sm font-semibold text-ink">{title}</span>
            </div>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
