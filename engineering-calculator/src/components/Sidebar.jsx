import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calculator,
  GitBranch,
  Flame,
  Gauge,
  X,
} from "lucide-react";

const navItems = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    hint: "Overview",
    end: true,
  },
  {
    to: "/calculator",
    icon: Calculator,
    label: "Formula Calculator",
    hint: "Single equations",
  },
  {
    to: "/cycle",
    icon: GitBranch,
    label: "Cycle Solver",
    hint: "Full-state solve",
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/50 backdrop-blur-[2px] transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-navy text-ink-inverse shadow-sidebar transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-sidebar-glow" />

        {/* Brand */}
        <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(47,107,255,0.35)]">
              <Gauge size={18} className="text-white" strokeWidth={2.25} />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white">EngCalc</div>
              <div className="text-[11px] font-medium text-slate-400">Air-standard cycles</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-scroll relative flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Workspace
          </p>
          <div className="space-y-1">
            {navItems.map(({ to, icon: Icon, label, hint, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                    isActive
                      ? "bg-accent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isActive ? "bg-white/15" : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-tight">{label}</span>
                      <span
                        className={`block text-[11px] ${
                          isActive ? "text-blue-100/80" : "text-slate-500 group-hover:text-slate-400"
                        }`}
                      >
                        {hint}
                      </span>
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Flame size={14} className="text-accent" />
              Supported cycles
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/20 px-2.5 py-1 text-[11px] font-semibold text-blue-200">
                Otto
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                Diesel
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              SI-first unit conversion with selectable input and output units.
            </p>
          </div>
        </nav>

        <div className="relative border-t border-white/10 px-5 py-4">
          <p className="text-[11px] font-medium text-slate-500">Engineering thermodynamics</p>
          <p className="mt-0.5 text-[11px] text-slate-600">Formulas · Units · Cycle solve</p>
        </div>
      </aside>
    </>
  );
}
