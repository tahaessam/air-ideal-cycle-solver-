const unitOptions = {
  temperature: ["K", "C"],
  pressure: ["Pa", "kPa", "bar", "MPa"],
  volume: ["m3", "L", "cm3"],
  length: ["m", "cm", "mm"],
  mass: ["kg", "g"],
  energy: ["J", "kJ"],
  specificHeat: ["J/kg·K", "kJ/kg·K"],
  specificVolume: ["m3/kg"],
  heatingValue: ["kJ/kg", "MJ/kg"],
  ratio: ["-"],
};

export default function UnitSelector({ quantity, unit, onChange }) {
  const options = unitOptions[quantity] || [];

  if (options.length === 0) {
    return (
      <span className="inline-flex items-center rounded-r-xl border border-l-0 border-line bg-surface-sunken px-3 py-2.5 text-sm text-ink-tertiary">
        —
      </span>
    );
  }

  return (
    <select
      value={unit || options[0]}
      onChange={(e) => onChange(e.target.value)}
      className="field-select min-w-[4.75rem]"
      aria-label="Unit"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
