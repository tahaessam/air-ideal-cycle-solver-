import { Activity } from "lucide-react";

export default function ResultCard({ results, title = "Results" }) {
  if (!results || Object.keys(results).length === 0) return null;

  const entries = Object.entries(results);

  const formatValue = (val) => {
    const n = Number(val);
    if (isNaN(n)) return String(val);
    if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.001 && n !== 0)) return n.toExponential(4);
    return n.toPrecision(6);
  };

  return (
    <div className="panel overflow-hidden">
      <div className="panel-header">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Activity size={16} />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-ink">{title}</h3>
            <p className="text-[11px] text-ink-tertiary">
              {entries.length} computed value{entries.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {entries.map(([key, { value, unit }]) => (
          <div
            key={key}
            className="rounded-xl border border-line bg-surface-sunken/70 px-4 py-3.5 transition hover:border-accent/25 hover:bg-accent-soft/30"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
                {key}
              </span>
              {unit ? <span className="badge-accent">{unit}</span> : null}
            </div>
            <div className="font-mono text-2xl font-semibold tracking-tight text-ink tabular-nums">
              {formatValue(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
