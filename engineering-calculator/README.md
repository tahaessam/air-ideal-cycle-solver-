# Engineering Calculator

## Project Overview
A premium **frontend‑only** engineering calculation platform for thermodynamic cycles, built with:
- **React + Vite**
- **JavaScript**
- **Tailwind CSS** (custom navy/charcoal/cyan/electric‑blue palette)
- **React Router** for navigation
- **KaTeX** for rendering LaTeX equations
- **Lucide React** icons

The app supports two classic cycles:
1. **Otto Cycle** (typical spark‑ignition engine)
2. **Diesel Cycle** (compression‑ignition engine)

Two calculation modes are provided:
- **Single Formula Calculator** – select any formula, enter inputs, and see the result with step‑by‑step LaTeX rendering.
- **Cycle Solver** – supply a subset of inputs and the engine automatically derives every possible property for the selected cycle.

## Tech Stack
- **React 19**
- **Vite 8**
- **Tailwind CSS 4** (custom colours `navy`, `charcoal`, `cyanAccent`, `electricBlue`)
- **KaTeX** + **react‑katex** for math rendering
- **Lucide‑react** for icons
- **Vitest** for unit and integration tests

## Installation
```bash
# Clone the repository (if you haven't already)
git clone <repo‑url>
cd "d:/projects/ast project/engineering-calculator"

# Install dependencies
npm install

# Run the development server
npm run dev
```
Open `http://localhost:5173` in your browser.

## Usage
### Navigation
- **Home** – dashboard placeholder.
- **Calculator** (`/calculator`) – choose a single formula (Otto or Diesel), fill inputs, press **Calculate**.
- **Cycle Solver** (`/cycle`) – select a cycle type, enter any known quantities, and the solver will compute all derivable values.

### Formula selection
All formulas are defined under `src/data/otto/` and `src/data/diesel/`. The UI shows the formula name, category, and LaTeX equation. Examples:
- Otto: `T₂ = T₁ r_c^{γ-1}` (compression temperature)
- Diesel: `η_{th}=1- \frac{1}{r_c^{γ-1}} \left( \frac{β^{γ}-1}{γ(β-1)} \right)` (thermal efficiency)

### Units
- Inputs are entered with a unit selector per field (e.g., Pa, psi, K, C, etc.).
- Internally values are converted to SI, calculations are performed, then results are displayed in the selected units (or the default unit).

## Testing
```bash
npm test
```
The test suite includes:
- **Unit conversion** round‑trip tests (`src/__tests__/unitConverter.test.js`).
- **Validation utilities** (`src/__tests__/validation.test.js`).
- **Formula engine** sanity checks (`src/__tests__/formulaEngine.test.js`).
- (Future) **Cycle‑solver** integration tests.

All tests currently pass with **>90 %** coverage.

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/awesome‑feature`).
3. Install dependencies (`npm install`).
4. Run the dev server and make UI/logic changes.
5. Add or update tests.
6. Ensure lint passes (`npm run lint`).
7. Open a Pull Request describing the change.

### Code style
- Follow the existing Tailwind‑based styling and colour palette.
- Keep unit conversion and validation logic in `src/utils/`.
- Add new formulas as objects in the appropriate `src/data/*` folder and export them via the `index.js` files.

## License
MIT © 2026 – **Engineering Calculator**. Feel free to use, modify, and distribute.
