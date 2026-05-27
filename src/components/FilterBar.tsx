interface Props {
  selectedTier: string;
  onTierChange: (t: string) => void;
  selectedRegion: string;
  onRegionChange: (r: string) => void;
}

const tiers = [
  { value: 'all', label: '全部' },
  { value: 'reach', label: '冲刺' },
  { value: 'match', label: '稳妥' },
  { value: 'safety', label: '保底' },
];

const regions = [
  { value: 'all', label: '全部地区' },
  { value: '华北', label: '华北' },
  { value: '华东', label: '华东' },
  { value: '华南', label: '华南' },
  { value: '华中', label: '华中' },
  { value: '西南', label: '西南' },
  { value: '西北', label: '西北' },
  { value: '东北', label: '东北' },
];

export default function FilterBar({ selectedTier, onTierChange, selectedRegion, onRegionChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">分档：</span>
        {tiers.map((t) => (
          <button
            key={t.value}
            onClick={() => onTierChange(t.value)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              selectedTier === t.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">地区：</span>
        {regions.map((r) => (
          <button
            key={r.value}
            onClick={() => onRegionChange(r.value)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              selectedRegion === r.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
