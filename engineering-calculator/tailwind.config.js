/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1220",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#152033",
          900: "#0B1220",
          950: "#070B14",
        },
        charcoal: {
          DEFAULT: "#1A2332",
          soft: "#243044",
          mute: "#2E3A4F",
        },
        accent: {
          DEFAULT: "#2F6BFF",
          soft: "#EAF0FF",
          muted: "#D6E2FF",
          strong: "#1B54E8",
          glow: "rgba(47, 107, 255, 0.18)",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#FFFFFF",
          sunken: "#F3F5F8",
          workspace: "#F5F7FA",
        },
        line: {
          DEFAULT: "#E6EAF0",
          strong: "#D5DBE5",
          soft: "#EEF1F6",
        },
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          tertiary: "#64748B",
          inverse: "#F8FAFC",
        },
        success: {
          DEFAULT: "#10B981",
          soft: "#ECFDF5",
          border: "#A7F3D0",
        },
        warning: {
          DEFAULT: "#F59E0B",
          soft: "#FFFBEB",
          border: "#FDE68A",
        },
        danger: {
          DEFAULT: "#EF4444",
          soft: "#FEF2F2",
          border: "#FECACA",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)",
        elevated: "0 8px 30px rgba(15, 23, 42, 0.08)",
        focus: "0 0 0 3px rgba(47, 107, 255, 0.22)",
        sidebar: "inset -1px 0 0 rgba(255,255,255,0.04)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      backgroundImage: {
        "sidebar-glow":
          "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(47,107,255,0.22), transparent 55%)",
        "hero-grid":
          "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "28px 28px",
      },
    },
  },
  plugins: [],
};
