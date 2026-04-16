import { AnimatePresence, motion } from 'framer-motion'

const MotionP = motion.p

function formatCompactNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return '0'

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
  }).format(value)
}

function ResultMetric({ label, value, prefix = '', suffix = '' }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/40 p-3 transition-all duration-300 hover:border-white/35 md:p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</p>
      <AnimatePresence mode="wait">
        <MotionP
          key={`${label}-${value}`}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-3 font-['Sora'] text-xl font-semibold text-white md:text-2xl"
        >
          {prefix}
          {formatCompactNumber(value)}
          {suffix}
        </MotionP>
      </AnimatePresence>
    </div>
  )
}

function ResultsCard({ metrics }) {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-['Sora'] text-lg font-semibold text-white">Allocation Dashboard</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Live outputs update instantly as inputs, ratios, and FDV change.
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5">
        <ResultMetric label="Tokens from SP" value={metrics.tokensFromSP} />
        <ResultMetric label="Tokens from SXP" value={metrics.tokensFromSXP} />
        <ResultMetric label="Total Allocation" value={metrics.totalTokens} />
        <ResultMetric label="Token Price" value={metrics.tokenPrice} prefix="$" />
        <ResultMetric label="Total Value (USD)" value={metrics.allocationValue} prefix="$" />
      </div>
    </section>
  )
}

export default ResultsCard
