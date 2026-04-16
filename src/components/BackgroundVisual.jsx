import { motion } from 'framer-motion'

const MotionDiv = motion.div

function Ring({ size, duration, delay, colorClass }) {
  return (
    <MotionDiv
      className={`absolute rounded-full border ${colorClass}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    />
  )
}

function BackgroundVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] blur-xl" />
      <div className="absolute -right-40 top-36 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_68%)] blur-2xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_70%)] blur-2xl" />

      <div className="absolute left-1/2 top-[42%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]">
        <Ring
          size="14rem"
          duration={24}
          delay={0}
          colorClass="border-white/15 shadow-[0_0_24px_0_rgba(255,255,255,0.06)]"
        />
        <Ring
          size="18rem"
          duration={36}
          delay={0.2}
          colorClass="border-white/10 shadow-[0_0_28px_0_rgba(255,255,255,0.04)]"
        />
        <Ring
          size="22rem"
          duration={52}
          delay={0.5}
          colorClass="border-white/10"
        />
      </div>
    </div>
  )
}

export default BackgroundVisual
