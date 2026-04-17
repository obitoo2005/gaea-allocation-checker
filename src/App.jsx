import { useEffect, useMemo, useState } from 'react'
import BackgroundVisual from './components/BackgroundVisual'
import Disclaimer from './components/Disclaimer'
import FDVSelector from './components/FDVSelector'
import Header from './components/Header'
import InputCard from './components/InputCard'
import ResultsCard from './components/ResultsCard'

const DEFAULT_TOTAL_SUPPLY = 1_000_000_000
const DISCORD_ROLES = [
  { key: 'olympusGod', label: 'Olympus God' },
  { key: 'titanGod', label: 'Titan God' },
  { key: 'animaOrigin', label: 'Anima Origin' },
  { key: 'supportiveGod', label: 'Supportive God' },
  { key: 'ambassador', label: 'Ambassador' },
]
const NFT_TIERS = [
  { key: 'tier1', label: 'Tier 1' },
  { key: 'tier2', label: 'Tier 2' },
  { key: 'tier3', label: 'Tier 3' },
  { key: 'tier4', label: 'Tier 4' },
]
const DEFAULT_VALUES = {
  sp: '',
  spRatio: '1',
  sxp: '',
  sxpRatio: '0.01',
  selectedPreset: '100000000',
  customFDV: '',
  godhoodLevelBoost: '',
  discordRoles: DISCORD_ROLES.reduce((roles, role) => {
    roles[role.key] = { selected: false, allocation: '0' }
    return roles
  }, {}),
  nftTiers: NFT_TIERS.reduce((tiers, tier) => {
    tiers[tier.key] = { selected: false, quantity: '0', allocationPerNft: '0' }
    return tiers
  }, {}),
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

function parseBooleanParam(value) {
  return value === '1' || value === 'true'
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
    discordRoles: DISCORD_ROLES.reduce((roles, role) => {
      roles[role.key] = {
        selected: parseBooleanParam(params.get(`${role.key}Selected`)),
        allocation: params.get(`${role.key}Allocation`) ?? DEFAULT_VALUES.discordRoles[role.key].allocation,
      }
      return roles
    }, {}),
    nftTiers: NFT_TIERS.reduce((tiers, tier) => {
      tiers[tier.key] = {
        selected: parseBooleanParam(params.get(`${tier.key}Selected`)),
        quantity: params.get(`${tier.key}Quantity`) ?? DEFAULT_VALUES.nftTiers[tier.key].quantity,
        allocationPerNft:
          params.get(`${tier.key}AllocationPerNft`) ??
          DEFAULT_VALUES.nftTiers[tier.key].allocationPerNft,
      }
      return tiers
    }, {}),
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
  const [discordRoles, setDiscordRoles] = useState(initialState.discordRoles)
  const [nftTiers, setNftTiers] = useState(initialState.nftTiers)

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
      roleAllocations: DISCORD_ROLES.reduce((roles, role) => {
        roles[role.key] = {
          selected: discordRoles[role.key]?.selected ?? false,
          allocation: toSafePositiveNumber(discordRoles[role.key]?.allocation),
        }
        return roles
      }, {}),
      nftTierValues: NFT_TIERS.reduce((tiers, tier) => {
        tiers[tier.key] = {
          selected: nftTiers[tier.key]?.selected ?? false,
          quantity: toSafePositiveNumber(nftTiers[tier.key]?.quantity),
          allocationPerNft: toSafePositiveNumber(nftTiers[tier.key]?.allocationPerNft),
        }
        return tiers
      }, {}),
    }),
    [sp, spRatio, sxp, sxpRatio, selectedPreset, customFDV, godhoodLevelBoost, discordRoles, nftTiers]
  )

  const metrics = useMemo(() => {
    const tokensFromSP = parsedValues.spValue * parsedValues.spRatioValue
    const tokensFromSXP = parsedValues.sxpValue * parsedValues.sxpRatioValue
    const baseTotalTokens = tokensFromSP + tokensFromSXP
    const boostPercent = getBoostPercent(parsedValues.godhoodLevelBoostValue)
    const boostedTokens = baseTotalTokens * (1 + boostPercent)
    const roleTokens = Object.values(parsedValues.roleAllocations).reduce((sum, role) => {
      if (!role.selected) return sum
      return sum + role.allocation
    }, 0)
    const nftTokens = Object.values(parsedValues.nftTierValues).reduce((sum, tier) => {
      if (!tier.selected) return sum
      return sum + tier.quantity * tier.allocationPerNft
    }, 0)
    const finalTotalTokens = boostedTokens + roleTokens + nftTokens
    const tokenPrice = parsedValues.fdvValue / DEFAULT_TOTAL_SUPPLY
    const allocationValue = finalTotalTokens * tokenPrice

    return {
      tokensFromSP,
      tokensFromSXP,
      baseTotalTokens,
      boostPercent,
      boostedTokens,
      roleTokens,
      nftTokens,
      finalTokens: boostedTokens,
      finalTotalTokens,
      totalTokens: boostedTokens,
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
    DISCORD_ROLES.forEach((role) => {
      const roleState = discordRoles[role.key]
      if (roleState?.selected) params.set(`${role.key}Selected`, '1')
      if (roleState?.allocation && roleState.allocation !== '0') {
        params.set(`${role.key}Allocation`, roleState.allocation)
      }
    })
    NFT_TIERS.forEach((tier) => {
      const tierState = nftTiers[tier.key]
      if (tierState?.selected) params.set(`${tier.key}Selected`, '1')
      if (tierState?.quantity && tierState.quantity !== '0') {
        params.set(`${tier.key}Quantity`, tierState.quantity)
      }
      if (tierState?.allocationPerNft && tierState.allocationPerNft !== '0') {
        params.set(`${tier.key}AllocationPerNft`, tierState.allocationPerNft)
      }
    })

    const nextUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', nextUrl)
  }, [
    sp,
    spRatio,
    sxp,
    sxpRatio,
    selectedPreset,
    customFDV,
    godhoodLevelBoost,
    discordRoles,
    nftTiers,
  ])

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
          discordRoles={discordRoles}
          setDiscordRoles={setDiscordRoles}
          nftTiers={nftTiers}
          setNftTiers={setNftTiers}
        />

        <ResultsCard metrics={metrics} />

        <Disclaimer />
      </div>
    </main>
  )
}

export default App
