const PRESET_FDV_OPTIONS = [
  { label: '$50M', value: '50000000' },
  { label: '$100M', value: '100000000' },
  { label: '$250M', value: '250000000' },
  { label: '$500M', value: '500000000' },
]
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
const inputClassName =
  'w-full rounded-xl border border-[var(--card-border)] bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-600 focus:border-white focus:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'

function sanitizeNumericInput(rawValue) {
  const safe = rawValue.replace(/[^\d.]/g, '')
  const split = safe.split('.')
  if (split.length > 2) {
    return `${split[0]}.${split.slice(1).join('')}`
  }
  return safe
}

function sanitizeIntegerInput(rawValue) {
  return rawValue.replace(/[^\d]/g, '')
}

function FDVSelector({
  selectedPreset,
  setSelectedPreset,
  customFDV,
  setCustomFDV,
  godhoodLevelBoost,
  setGodhoodLevelBoost,
  discordRoles,
  setDiscordRoles,
  nftTiers,
  setNftTiers,
}) {
  const updateRole = (roleKey, field, value) => {
    setDiscordRoles((current) => ({
      ...current,
      [roleKey]: {
        ...current[roleKey],
        [field]: value,
      },
    }))
  }

  const updateNftTier = (tierKey, field, value) => {
    setNftTiers((current) => ({
      ...current,
      [tierKey]: {
        ...current[tierKey],
        [field]: value,
      },
    }))
  }

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
            className={inputClassName}
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
            className={`${inputClassName} disabled:cursor-not-allowed disabled:opacity-45`}
          />
        </label>
      </div>

      <label className="mt-3 block space-y-2 md:mt-4">
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Godhood ID Level Boost</span>
        <input
          value={godhoodLevelBoost}
          onChange={(event) => setGodhoodLevelBoost(event.target.value)}
          placeholder="Enter level 1-30"
          inputMode="numeric"
          min="1"
          max="30"
          className={inputClassName}
        />
      </label>

      <div className="mt-4 border-t border-white/10 pt-4">
        <h3 className="font-['Sora'] text-base font-semibold text-white">Discord Roles</h3>
        <p className="mt-1 text-sm text-neutral-400">
          Select all applicable roles and enter the token or percentage allocation for each one.
        </p>

        <div className="mt-3 space-y-3">
          {DISCORD_ROLES.map((role) => (
            <div
              key={role.key}
              className="rounded-xl border border-white/10 bg-black/35 p-3 md:p-4"
            >
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:items-end">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={discordRoles[role.key]?.selected ?? false}
                    onChange={(event) => updateRole(role.key, 'selected', event.target.checked)}
                    className="h-4 w-4 rounded border border-[var(--card-border)] bg-black/50 accent-white"
                  />
                  <span className="text-sm font-medium text-white">{role.label}</span>
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Allocation
                  </span>
                  <input
                    value={discordRoles[role.key]?.allocation ?? '0'}
                    onChange={(event) =>
                      updateRole(role.key, 'allocation', sanitizeNumericInput(event.target.value))
                    }
                    placeholder="0"
                    inputMode="decimal"
                    className={inputClassName}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <h3 className="font-['Sora'] text-base font-semibold text-white">NFT Configuration</h3>
        <p className="mt-1 text-sm text-neutral-400">
          Choose owned NFT tiers, then enter quantity and allocation per NFT for each selected tier.
        </p>

        <div className="mt-3 space-y-3">
          {NFT_TIERS.map((tier) => (
            <div
              key={tier.key}
              className="rounded-xl border border-white/10 bg-black/35 p-3 md:p-4"
            >
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,12rem)_minmax(0,16rem)] md:items-end">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={nftTiers[tier.key]?.selected ?? false}
                    onChange={(event) => updateNftTier(tier.key, 'selected', event.target.checked)}
                    className="h-4 w-4 rounded border border-[var(--card-border)] bg-black/50 accent-white"
                  />
                  <span className="text-sm font-medium text-white">{tier.label}</span>
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Quantity Owned
                  </span>
                  <input
                    value={nftTiers[tier.key]?.quantity ?? '0'}
                    onChange={(event) =>
                      updateNftTier(tier.key, 'quantity', sanitizeIntegerInput(event.target.value))
                    }
                    placeholder="0"
                    inputMode="numeric"
                    className={inputClassName}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Allocation per NFT
                  </span>
                  <input
                    value={nftTiers[tier.key]?.allocationPerNft ?? '0'}
                    onChange={(event) =>
                      updateNftTier(
                        tier.key,
                        'allocationPerNft',
                        sanitizeNumericInput(event.target.value)
                      )
                    }
                    placeholder="0"
                    inputMode="decimal"
                    className={inputClassName}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FDVSelector
