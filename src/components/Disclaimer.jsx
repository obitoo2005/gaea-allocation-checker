function Disclaimer() {
  return (
    <footer
      className="mt-3 rounded-2xl border border-[var(--line-soft)] bg-[var(--card-bg)] px-4 py-4 backdrop-blur-xl md:mt-4 md:px-6 md:py-5"
      role="contentinfo"
    >
      <p className="text-left text-[11px] leading-relaxed text-neutral-500 md:text-center md:text-xs">
        <span className="font-semibold text-neutral-400">Disclaimer. </span>
        This tool provides estimates only. Results depend on the inputs and assumptions you enter (including FDV and conversion ratios) and may not match any official allocation, airdrop, or token distribution. Nothing here is financial, investment, or tax advice. Use at your own risk and verify all figures with official Gaea sources before making decisions.
      </p>
    </footer>
  )
}

export default Disclaimer
