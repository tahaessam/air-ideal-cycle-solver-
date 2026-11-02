import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import FormulaCard from "./FormulaCard.jsx";

export default function FormulaSelector({ formulas, selectedId, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return formulas;
    return formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q)
    );
  }, [formulas, search]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const f of filtered) {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category).push(f);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category…"
          className="field-input pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-4 py-10 text-center">
          <Inbox size={22} className="mb-2 text-ink-tertiary" />
          <p className="text-sm font-medium text-ink">No formulas found</p>
          <p className="mt-1 text-xs text-ink-tertiary">
            Nothing matched “{search}”. Try another keyword.
          </p>
        </div>
      ) : (
        <div className="max-h-[28rem] space-y-5 overflow-y-auto pr-1">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <div className="mb-2 flex items-center justify-between px-0.5">
                <p className="section-label">{category}</p>
                <span className="text-[11px] font-medium text-ink-tertiary">
                  {items.length} formula{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="space-y-2.5">
                {items.map((formula) => (
                  <FormulaCard
                    key={formula.id}
                    formula={formula}
                    isSelected={formula.id === selectedId}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
