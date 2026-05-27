import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import type { Preferences as Pref, Tier, DegreeType, MathAcceptance, Budget, RiskTolerance } from '../types';

const regions = [
  '华北（北京/天津/河北/山西/内蒙古）',
  '华东（上海/江苏/浙江/安徽/福建/山东）',
  '华南（广东/广西/海南）',
  '华中（湖北/湖南/河南）',
  '西南（四川/重庆/云南/贵州）',
  '西北（陕西/甘肃/宁夏/青海/新疆）',
  '东北（辽宁/吉林/黑龙江）',
];

const tiers: { value: Tier; label: string }[] = [
  { value: '985', label: '985' },
  { value: '211', label: '211' },
  { value: '双一流', label: '双一流' },
  { value: '双非', label: '双非均可' },
];

const degreeTypes: { value: DegreeType; label: string }[] = [
  { value: 'academic', label: '学硕（学术型）' },
  { value: 'professional', label: '专硕（专业型）' },
  { value: 'both', label: '均可' },
];

const mathOptions: { value: MathAcceptance; label: string; desc: string }[] = [
  { value: 'math1', label: '数学一', desc: '范围最广，难度最高（工学学硕）' },
  { value: 'math2', label: '数学二', desc: '不考概率，难度适中（工学专硕）' },
  { value: 'math3', label: '数学三', desc: '范围广但深度较浅（经管类）' },
  { value: '396', label: '396经济类联考', desc: '数学+逻辑+写作（经济类专硕）' },
  { value: '199', label: '199管理类联考', desc: '初等数学+逻辑+写作（管理类专硕）' },
  { value: 'no_math', label: '不考数学', desc: '两门专业课（部分管理/文学/法学）' },
];

const budgetOptions: { value: Budget; label: string }[] = [
  { value: 'lt_1w', label: '1万以下/年' },
  { value: '1_3w', label: '1-3万/年' },
  { value: '3_8w', label: '3-8万/年（专硕常见）' },
  { value: 'unlimited', label: '不限' },
];

const riskOptions: { value: RiskTolerance; label: string; desc: string }[] = [
  { value: 'aggressive', label: '激进', desc: '愿意冲刺顶尖名校' },
  { value: 'balanced', label: '平衡', desc: '兼顾院校层次和录取把握' },
  { value: 'conservative', label: '保守', desc: '以求稳上岸为首要目标' },
];

function getMathDefault(cat: string | null): MathAcceptance {
  switch (cat) {
    case 'engineering': return 'math1';
    case 'science': return 'math2';
    case 'economics': return 'math3';
    case 'management': return '199';
    case 'liberalArts': case 'law': case 'education': return 'no_math';
    default: return 'math3';
  }
}

function getCategoryHint(cat: string | null): string | null {
  switch (cat) {
    case 'engineering': return '工科建议优先考虑数学一/数学二，可关注专硕（数学二）降低数学难度。';
    case 'science': return '理科建议根据目标方向选择数学一或数学二，科研导向推荐学硕。';
    case 'management': return '管理类多数考199联考或数学三，部分院校不考数学。专硕比例较高，可关注非全日制选项。';
    case 'economics': return '经济类主流考数学三，部分专硕考396联考。建议关注财经类强校。';
    case 'liberalArts': case 'law': return '文科/法学不考数学，两门专业课备考。建议重点选择专业强校而非综合排名。';
    case 'education': return '教育类不考数学，部分专硕有学科背景要求。建议关注师范类院校。';
    case 'medical': return '医学类竞争激烈，部分专业有执业资格要求。建议优先学科评估排名。';
    case 'agriculture': return '农学类关注学科评估和导师方向，部分院校有实践基地优势。';
    default: return null;
  }
}

export default function Preferences() {
  const { state, dispatch } = useAppState();
  const saved = state.userProfile.preferences || {} as Partial<Pref>;
  const cat = state.detectedCategory;

  const [selectedRegions, setSelectedRegions] = useState<string[]>(saved.regions || []);
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>(saved.tiers || []);
  const [degreeType, setDegreeType] = useState<DegreeType>(saved.degreeType || 'both');
  const [math, setMath] = useState<MathAcceptance>(saved.mathAcceptance || getMathDefault(cat));
  const [budget, setBudget] = useState<Budget>(saved.budget || 'unlimited');
  const [risk, setRisk] = useState<RiskTolerance>(saved.riskTolerance || 'balanced');
  const [partTime, setPartTime] = useState(saved.considerPartTime || false);

  const categoryHint = getCategoryHint(cat);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const toggleTier = (t: Tier) =>
    setSelectedTiers((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        regions: selectedRegions,
        tiers: selectedTiers.length ? selectedTiers : ['985', '211', '双一流', '双非'],
        degreeType,
        mathAcceptance: math,
        budget,
        riskTolerance: risk,
        considerPartTime: partTime,
      },
    });
    dispatch({ type: 'GENERATE_EVALUATION' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        报考偏好设置
        <span className="text-xs text-gray-400 font-normal ml-2">—— 最后一步，告诉系统你的目标</span>
      </h2>

      {categoryHint && (
        <div className="mb-5 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-600 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{categoryHint}</span>
        </div>
      )}

      {/* 目标地区 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">目标地区（可多选，不选则不限）</label>
        <div className="flex flex-wrap gap-1.5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => toggleRegion(r)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedRegions.includes(r)
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              {r.slice(0, r.indexOf('（'))}
            </button>
          ))}
        </div>
      </div>

      {/* 院校层次 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">院校层次偏好（可多选，不选则全部考虑）</label>
        <div className="flex gap-2">
          {tiers.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => toggleTier(t.value)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                selectedTiers.includes(t.value)
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 学位类型 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">报考类型偏好</label>
        <div className="flex gap-2">
          {degreeTypes.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDegreeType(d.value)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                degreeType === d.value
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 数学接受度 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          数学考试接受度
          {cat && <span className="text-xs text-indigo-400 ml-1">—— 已根据你的专业类型预设</span>}
        </label>
        <div className="flex flex-wrap gap-2">
          {mathOptions.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMath(m.value)}
              className={`text-sm px-3 py-2 rounded-lg transition-colors text-left ${
                math === m.value
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{m.label}</div>
              <div className="text-xs text-gray-400">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 预算 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">学费预算</label>
        <div className="flex gap-2">
          {budgetOptions.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudget(b.value)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                budget === b.value
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* 竞争承受度 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">竞争承受度</label>
        <div className="flex gap-2">
          {riskOptions.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRisk(r.value)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors flex-1 ${
                risk === r.value
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{r.label}</div>
              <div className="text-xs text-gray-400">{r.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 非全日制 */}
      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
          <input
            type="checkbox"
            checked={partTime}
            onChange={(e) => setPartTime(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          也考虑非全日制研究生（非全）
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'skills' })}
          className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
        >
          上一步
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          生成评估报告
        </button>
      </div>
    </div>
  );
}
