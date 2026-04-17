import { useEffect, useMemo, useState } from 'react'
import BackgroundVisual from './components/BackgroundVisual'
import Disclaimer from './components/Disclaimer'
import FDVSelector from './components/FDVSelector'
import Header from './components/Header'
import InputCard from './components/InputCard'
import ResultsCard from './components/ResultsCard'

const DEFAULT_TOTAL_SUPPLY = 1_000_000_000
const DEFAULT_VALUES = {
  sp: '',
  spRatio: '1',
  sxp: '',
  sxpRatio: '0.01',
  selectedPreset: '100000000',
  customFDV: '',
  godhoodLevelBoost: '',
}

function sanitizeNumericInput(rawValue) {
  const safe = rawValue.replace(/[^\d.]/g, '')
  const split = safe.split('.')
  if (split.length > 2) {
    return `${split[0]}.${split.slice(1).join('')}`
  }
  return safe
}

function toSafePositiveNumber(value) {
  if (!value || typeof value !== 'string') return 0
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return 0
  return parsed
}

function toSafeGodhoodLevel(value) {
  if (!value || typeof value !== 'string') return 0
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) return 0
  return Math.min(Math.floor(parsed), 30)
}

function getBoostPercent(level) {
  if (level >= 1 && level <= 9) return 0.05
  if (level >= 10 && level <= 19) return 0.1
  if (level >= 20 && level <= 30) return 0.2
  return 0
}

function getInitialState() {
  const params = new URLSearchParams(window.location.search)
  return {
    sp: params.get('sp') ?? DEFAULT_VALUES.sp,
    spRatio: params.get('spRatio') ?? DEFAULT_VALUES.spRatio,
    sxp: params.get('sxp') ?? DEFAULT_VALUES.sxp,
    sxpRatio: params.get('sxpRatio') ?? DEFAULT_VALUES.sxpRatio,
    selectedPreset: params.get('preset') ?? DEFAULT_VALUES.selectedPreset,
    customFDV: params.get('fdv') ?? DEFAULT_VALUES.customFDV,
    godhoodLevelBoost: params.get('godhoodLevelBoost') ?? DEFAULT_VALUES.godhoodLevelBoost,
  }
}

const initialState = getInitialState()

function App() {
  const [sp, setSp] = useState(initialState.sp)
  const [spRatio, setSpRatio] = useState(initialState.spRatio)
  const [sxp, setSxp] = useState(initialState.sxp)
  const [sxpRatio, setSxpRatio] = useState(initialState.sxpRatio)
  const [selectedPreset, setSelectedPreset] = useState(initialState.selectedPreset)
  const [customFDV, setCustomFDV] = useState(initialState.customFDV)
  const [godhoodLevelBoost, setGodhoodLevelBoost] = useState(initialState.godhoodLevelBoost)

  const parsedValues = useMemo(
    () => ({
      spValue: toSafePositiveNumber(sp),
      spRatioValue: toSafePositiveNumber(spRatio),
      sxpValue: toSafePositiveNumber(sxp),
      sxpRatioValue: toSafePositiveNumber(sxpRatio),
      fdvValue:
        selectedPreset === 'custom'
          ? toSafePositiveNumber(customFDV)
          : toSafePositiveNumber(selectedPreset),
      godhoodLevelBoostValue: toSafeGodhoodLevel(godhoodLevelBoost),
    }),
    [sp, spRatio, sxp, sxpRatio, selectedPreset, customFDV, godhoodLevelBoost]
  )

  const metrics = useMemo(() => {
    const tokensFromSP = parsedValues.spValue * parsedValues.spRatioValue
    const tokensFromSXP = parsedValues.sxpValue * parsedValues.sxpRatioValue
    const baseTotalTokens = tokensFromSP + tokensFromSXP
    const boostPercent = getBoostPercent(parsedValues.godhoodLevelBoostValue)
    const finalTokens = baseTotalTokens * (1 + boostPercent)
    const tokenPrice = parsedValues.fdvValue / DEFAULT_TOTAL_SUPPLY
    const allocationValue = finalTokens * tokenPrice

    return {
      tokensFromSP,
      tokensFromSXP,
      baseTotalTokens,
      boostPercent,
      finalTokens,
      totalTokens: finalTokens,
      tokenPrice,
      allocationValue,
    }
  }, [parsedValues])

  useEffect(() => {
    const params = new URLSearchParams()
    if (sp) params.set('sp', sp)
    if (spRatio) params.set('spRatio', spRatio)
    if (sxp) params.set('sxp', sxp)
    if (sxpRatio) params.set('sxpRatio', sxpRatio)
    if (selectedPreset) params.set('preset', selectedPreset)
    if (customFDV) params.set('fdv', customFDV)
    if (godhoodLevelBoost) params.set('godhoodLevelBoost', godhoodLevelBoost)

    const nextUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', nextUrl)
  }, [sp, spRatio, sxp, sxpRatio, selectedPreset, customFDV, godhoodLevelBoost])

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-4 pb-8 sm:px-6 md:py-6 md:pb-10 lg:px-8">
      <BackgroundVisual />

      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-3 md:gap-4">
        <Header />

        <InputCard
          sp={sp}
          setSp={(value) => setSp(sanitizeNumericInput(value))}
          spRatio={spRatio}
          setSpRatio={(value) => setSpRatio(sanitizeNumericInput(value))}
          sxp={sxp}
          setSxp={(value) => setSxp(sanitizeNumericInput(value))}
          sxpRatio={sxpRatio}
          setSxpRatio={(value) => setSxpRatio(sanitizeNumericInput(value))}
        />

        <FDVSelector
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
          customFDV={customFDV}
          setCustomFDV={(value) => setCustomFDV(sanitizeNumericInput(value))}
          godhoodLevelBoost={godhoodLevelBoost}
          setGodhoodLevelBoost={(value) => {
            const digitsOnly = value.replace(/[^\d]/g, '')
            if (!digitsOnly) {
              setGodhoodLevelBoost('')
              return
            }

            const clamped = Math.min(Number(digitsOnly), 30)
            setGodhoodLevelBoost(String(clamped))
          }}
        />

        <ResultsCard metrics={metrics} />

        <Disclaimer />
      </div>
    </main>
  )
}

export default App
