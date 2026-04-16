function Header() {
  return (
    <header className="relative z-20 mb-3 md:mb-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--line-soft)] bg-[var(--card-bg)] px-4 py-3 backdrop-blur-xl md:gap-4 md:px-5 md:py-3.5">
        <img
          src="/gaea-logo.png"
          alt=""
          className="h-9 w-auto max-w-[7.5rem] shrink-0 object-contain object-left md:h-10 md:max-w-[8.5rem]"
        />
        <h1 className="font-['Sora'] text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Gaea Allocation Checker
        </h1>
      </div>
    </header>
  )
}

export default Header
