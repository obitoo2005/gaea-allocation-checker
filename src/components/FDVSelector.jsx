const PRESET_FDV_OPTIONS = [
  { label: '$50M', value: '50000000' },
  { label: '$100M', value: '100000000' },
  { label: '$250M', value: '250000000' },
  { label: '$500M', value: '500000000' },
]

function FDVSelector({ selectedPreset, setSelectedPreset, customFDV, setCustomFDV }) {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 md:p-5">
      <h2 className="font-['Sora'] text-lg font-semibold text-white">FDV Selection</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Select a preset Fully Diluted Valuation or enter a custom FDV in USD.
      </p>

      <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Preset FDV</span>
          <select
            value={selectedPreset}
            onChange={(event) => setSelectedPreset(event.target.value)}
            className="w-full rounded-xl border border-[var(--card-border)] bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-white focus:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
          >
            {PRESET_FDV_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-neutral-950">
                {option.label}
              </option>
            ))}
            <option value="custom" className="bg-neutral-950">
              Custom
            </option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Custom FDV (USD)</span>
          <input
            value={customFDV}
            onChange={(event) => setCustomFDV(event.target.value)}
            placeholder="e.g. 75000000"
            inputMode="decimal"
            disabled={selectedPreset !== 'custom'}
            className="w-full rounded-xl border border-[var(--card-border)] bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-45 focus:border-white focus:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
          />
        </label>
      </div>
    </section>
  )
}

export default FDVSelector
