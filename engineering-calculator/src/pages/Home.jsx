import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  GitBranch,
  Thermometer,
  Fuel,
  Sigma,
  Ruler,
  Layers,
} from "lucide-react";

const tools = [
  {
    to: "/calculator",
    icon: Calculator,
    title: "Formula Calculator",
    description:
      "Solve individual Otto or Diesel equations with unit conversion and step-by-step KaTeX solutions.",
    meta: "Single formula mode",
    accent: true,
  },
  {
    to: "/cycle",
    icon: GitBranch,
    title: "Cycle Solver",
    description:
      "Provide known state inputs and compute every derivable property across the full thermodynamic cycle.",
    meta: "Coupled state solve",
    accent: false,
  },
];

const capabilities = [
  {
    icon: Thermometer,
    title: "Otto cycle",
    body: "Isentropic compression & expansion, constant-volume heat addition, efficiency, and net work.",
  },
  {
    icon: Fuel,
    title: "Diesel cycle",
    body: "Cutoff ratio analysis, constant-pressure heat addition, expansion states, and performance metrics.",
  },
  {
    icon: Ruler,
    title: "Selectable units",
    body: "Enter pressures, temperatures, and energies in the units you use — conversions stay SI internally.",
  },
  {
    icon: Sigma,
    title: "Transparent math",
    body: "Every result shows the governing equation, substituted values, and final computed quantity.",
  },
];

export default function Home() {
  return (
    <div className="page-wrap space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div
          className="pointer-events-none absolute inset-0 bg-hero-grid opacity-70"
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
        />
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-10 lg:py-10">
          <div>
            <div className="badge-accent mb-4">
              <Layers size={12} />
              Engineering workspace
            </div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Thermodynamic cycle analysis, built for precision work.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
              A focused calculator for Otto and Diesel air-standard cycles — formulas,
              unit-aware inputs, and a cycle solver that only returns what your data can
              actually determine.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/calculator" className="btn-primary">
                Open Formula Calculator
                <ArrowRight size={16} />
              </Link>
              <Link to="/cycle" className="btn-secondary">
                Open Cycle Solver
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-end">
            {[
              { label: "Cycles", value: "2" },
              { label: "Modes", value: "Formula + Cycle" },
              { label: "Unit system", value: "SI core" },
              { label: "Math display", value: "KaTeX" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-surface-sunken/80 px-4 py-3"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
                  {item.label}
                </div>
                <div className="mt-1 font-mono text-sm font-semibold text-ink">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary tools */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="section-label">Start here</p>
            <h3 className="mt-1 text-lg font-semibold text-ink">Calculation tools</h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map(({ to, icon: Icon, title, description, meta, accent }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-panel transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-elevated"
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                  accent
                    ? "bg-accent text-white shadow-[0_8px_20px_rgba(47,107,255,0.28)]"
                    : "bg-navy text-white"
                }`}
              >
                <Icon size={20} />
              </div>
              <div className="badge-neutral mb-3">{meta}</div>
              <h4 className="text-lg font-semibold tracking-tight text-ink">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{description}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Launch
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section>
        <div className="mb-4">
          <p className="section-label">Coverage</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">What you can compute</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon size={16} />
              </div>
              <h4 className="text-sm font-semibold text-ink">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
