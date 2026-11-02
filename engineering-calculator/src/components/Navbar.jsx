import { useLocation } from "react-router-dom";
import { Menu, Sparkles } from "lucide-react";

const titles = {
  "/": { title: "Dashboard", crumb: "Overview" },
  "/calculator": { title: "Formula Calculator", crumb: "Single equation" },
  "/cycle": { title: "Cycle Solver", crumb: "Multi-state solve" },
};

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const meta = titles[pathname] || { title: "EngCalc", crumb: "Workspace" };

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink-secondary transition hover:bg-surface-sunken hover:text-ink md:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-sm font-semibold text-ink sm:text-[15px]">{meta.title}</h1>
            <span className="hidden rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary sm:inline">
              {meta.crumb}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[11px] font-medium text-ink-secondary sm:flex">
          <Sparkles size={12} className="text-accent" />
          SI units · KaTeX steps
        </div>
      </div>
    </header>
  );
}
