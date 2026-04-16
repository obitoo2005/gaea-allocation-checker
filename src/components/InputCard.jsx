const inputFocus =
  'focus:border-white focus:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'

function NumericField({ label, value, onChange, placeholder, hint }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
        className={`w-full rounded-xl border border-[var(--card-border)] bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-600 ${inputFocus}`}
      />
      <p className="text-[11px] text-neutral-600">{hint}</p>
    </label>
  )
}

function InputCard({
  sp,
  setSp,
  spRatio,
  setSpRatio,
  sxp,
  setSxp,
  sxpRatio,
  setSxpRatio,
}) {
  return (
    <section className="grid gap-3 md:grid-cols-2 md:gap-4 lg:gap-5">
      <article className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 md:p-5">
        <h2 className="font-['Sora'] text-lg font-semibold text-white">Soul Points (SP)</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Input your earned Soul Points and choose your SP to GAEA conversion ratio.
        </p>
        <div className="mt-3 space-y-3 md:mt-4 md:space-y-4">
          <NumericField
            label="SP Amount"
            value={sp}
            onChange={setSp}
            placeholder="e.g. 12500"
            hint="Only non-negative values are accepted."
          />
          <NumericField
            label="SP to GAEA Ratio"
            value={spRatio}
            onChange={setSpRatio}
            placeholder="e.g. 0.75"
            hint="Example: ratio 0.75 means 1 SP = 0.75 GAEA."
          />
        </div>
      </article>

      <article className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 md:p-5">
        <h2 className="font-['Sora'] text-lg font-semibold text-white">Soul XP (SXP)</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Input your Soul XP and adjust its independent SXP to GAEA conversion ratio.
        </p>
        <div className="mt-3 space-y-3 md:mt-4 md:space-y-4">
          <NumericField
            label="SXP Amount"
            value={sxp}
            onChange={setSxp}
            placeholder="e.g. 240000"
            hint="Only non-negative values are accepted."
          />
          <NumericField
            label="SXP to GAEA Ratio"
            value={sxpRatio}
            onChange={setSxpRatio}
            placeholder="e.g. 0.02"
            hint="Example: ratio 0.02 means 1 SXP = 0.02 GAEA."
          />
        </div>
      </article>
    </section>
  )
}

export default InputCard
