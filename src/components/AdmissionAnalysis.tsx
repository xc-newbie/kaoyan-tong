import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import { universities } from '../data/universities';
import { majors } from '../data/majors';
import { calculateAdmission } from '../utils/admissionCalculator';
import type { AdmissionResult } from '../utils/admissionCalculator';

const tierColors: Record<string, string> = {
  '985': 'bg-red-100 text-red-700',
  '211': 'bg-blue-100 text-blue-700',
  '双一流': 'bg-green-100 text-green-700',
  '双非': 'bg-gray-100 text-gray-600',
};

const probColors: Record<string, string> = {
  '极高概率上岸': 'text-green-600 bg-green-50',
  '高概率上岸': 'text-emerald-600 bg-emerald-50',
  '较大概率上岸': 'text-teal-600 bg-teal-50',
  '中等概率，需努力': 'text-yellow-600 bg-yellow-50',
  '有挑战，需全力备考': 'text-orange-600 bg-orange-50',
  '难度较大，冲刺目标': 'text-red-600 bg-red-50',
};

export default function AdmissionAnalysis() {
  const { state, dispatch } = useAppState();
  const evaluation = state.evaluation;
  const userProfile = state.userProfile;

  const [selectedUniId, setSelectedUniId] = useState('');
  const [selectedMajorId, setSelectedMajorId] = useState('');
  const [activeMode, setActiveMode] = useState<'fulltime' | 'working'>(
    state.studyMode || 'fulltime'
  );

  const selectedUni = useMemo(
    () => universities.find((u) => u.id === selectedUniId),
    [selectedUniId]
  );

  const selectedMajor = useMemo(
    () => majors.find((m) => m.id === selectedMajorId),
    [selectedMajorId]
  );

  // 选中院校后，过滤该院校开设的专业
  const availableMajors = useMemo(() => {
    if (!selectedUni) return [];
    return selectedUni.majorIds.map((mid) => majors.find((m) => m.id === mid)).filter(Boolean);
  }, [selectedUni]);

  // 选中专业后，重置major（如果不在该校范围内）
  const handleUniChange = (uniId: string) => {
    setSelectedUniId(uniId);
    setSelectedMajorId('');
  };

  const result: AdmissionResult | null = useMemo(() => {
    if (!selectedUni || !selectedMajor || !evaluation) return null;
    return calculateAdmission(selectedUni, selectedMajor, evaluation, activeMode);
  }, [selectedUni, selectedMajor, evaluation, activeMode]);

  // 按地区分组院校
  const uniGroups = useMemo(() => {
    const groups: Record<string, typeof universities> = {};
    for (const u of universities) {
      if (!groups[u.region]) groups[u.region] = [];
      groups[u.region].push(u);
    }
    return groups;
  }, []);

  const hasProfile = !!evaluation && !!userProfile.basicInfo;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 pb-3 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'home' })}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </button>
          <span className="text-sm text-gray-400">
            {result ? `${result.probability}% 上岸概率` : '选择院校和专业'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">上岸概率分析</h2>
        <p className="text-sm text-gray-500">基于你的个人评估数据，分析目标院校+专业的录取概率与备考要求</p>
      </div>

      {!hasProfile ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="text-amber-700 text-sm mb-3">
            请先完成水平评估，才能使用上岸概率分析功能
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'home' })}
            className="text-sm bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors"
          >
            ← 返回首页开始评估
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：选择器 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-medium text-gray-700 mb-3 text-sm">选择目标院校和专业</h3>

              <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-1">目标院校</label>
                <select
                  value={selectedUniId}
                  onChange={(e) => handleUniChange(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white"
                >
                  <option value="">请选择院校</option>
                  {Object.entries(uniGroups).map(([region, unis]) => (
                    <optgroup key={region} label={region}>
                      {unis.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.tier})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-1">目标专业</label>
                <select
                  value={selectedMajorId}
                  onChange={(e) => setSelectedMajorId(e.target.value)}
                  disabled={!selectedUni}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">请选择专业</option>
                  {availableMajors.map((m) => {
                    if (!m) return null;
                    return (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.code})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 备考模式切换 */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">备考模式</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveMode('fulltime')}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
                      activeMode === 'fulltime'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    脱产备考
                  </button>
                  <button
                    onClick={() => setActiveMode('working')}
                    className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
                      activeMode === 'working'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    在职备考
                  </button>
                </div>
              </div>
            </div>

            {/* 用户评估概况 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-medium text-gray-700 mb-3 text-sm">你的评估概况</h3>
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-indigo-600">{evaluation.overall}</div>
                <div className="text-xs text-gray-400">综合评分 / 100</div>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: '学术能力', value: evaluation.academic },
                  { label: '数理基础', value: evaluation.mathLogic },
                  { label: '编程能力', value: evaluation.programming },
                  { label: '英语水平', value: evaluation.english },
                  { label: '专业素养', value: evaluation.professionalLiteracy },
                  { label: '科研潜力', value: evaluation.researchPotential },
                  { label: '综合素质', value: evaluation.comprehensive },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-indigo-400 h-1.5 rounded-full"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-gray-600 w-8 text-right">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：分析结果 */}
          <div className="lg:col-span-2">
            {!result ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
                请在左侧选择目标院校和专业，查看上岸概率分析
              </div>
            ) : (
              <div className="space-y-4">
                {/* 核心结果卡片 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{result.university.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tierColors[result.university.tier]}`}>
                          {result.university.tier}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {result.major.name} · {result.university.city} · {activeMode === 'fulltime' ? '脱产备考' : '在职备考'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${
                        result.probability >= 70 ? 'text-green-600' :
                        result.probability >= 40 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {result.probability}%
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full font-medium mt-1 ${probColors[result.probabilityLabel] || 'text-gray-500 bg-gray-50'}`}>
                        {result.probabilityLabel}
                      </div>
                    </div>
                  </div>

                  {/* 分数差距 */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-700">{result.competitiveScore}</div>
                      <div className="text-xs text-gray-400">你的评分</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-indigo-600">{result.targetScore}</div>
                      <div className="text-xs text-gray-400">建议初试目标分</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className={`text-lg font-bold ${result.scoreGap <= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {result.scoreGap > 0 ? `+${result.scoreGap}` : result.scoreGap}
                      </div>
                      <div className="text-xs text-gray-400">难度差距</div>
                    </div>
                  </div>

                  {/* 概率进度条 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>上岸概率</span>
                      <span>{result.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          result.probability >= 70 ? 'bg-green-500' :
                          result.probability >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${result.probability}%` }}
                      />
                    </div>
                  </div>

                  {/* 备考参数 */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-gray-400 text-xs">建议每日学习</span>
                      <p className="text-gray-700 font-medium">{result.dailyHours} 小时</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-gray-400 text-xs">建议备考周期</span>
                      <p className="text-gray-700 font-medium">{result.totalMonths} 个月</p>
                    </div>
                  </div>
                </div>

                {/* 优劣势分析 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-medium text-gray-700 mb-3 text-sm">优劣势分析</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-medium text-green-600 mb-2">优势</h4>
                      <ul className="space-y-1">
                        {result.strengths.length > 0 ? result.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-green-400 mt-0.5">✓</span>
                            {s}
                          </li>
                        )) : (
                          <li className="text-xs text-gray-400">暂无特别优势项，需全面提升</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-red-500 mb-2">需加强</h4>
                      <ul className="space-y-1">
                        {result.weaknesses.length > 0 ? result.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">!</span>
                            {w}
                          </li>
                        )) : (
                          <li className="text-xs text-gray-400">各项指标均衡，保持即可</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 备考建议 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-medium text-gray-700 mb-3 text-sm">备考策略建议</h3>
                  <ul className="space-y-1.5 mb-4">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-xs font-medium text-gray-600 mb-2">科目时间分配建议</h4>
                  <div className="space-y-2">
                    {result.keySubjects.map((ks) => (
                      <div key={ks.subject} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{ks.subject}</span>
                          <span className="text-xs text-indigo-600 font-medium">{ks.allocation}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                          <div
                            className="bg-indigo-400 h-1.5 rounded-full"
                            style={{ width: `${ks.allocation}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">{ks.tips}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 两个模式快速对比 */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-medium text-gray-700 mb-3 text-sm">脱产 vs 在职 对比</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <h4 className="font-medium text-indigo-700 mb-2">脱产备考</h4>
                      <div className="space-y-1 text-indigo-600">
                        <p>· 每天 8-12 小时学习</p>
                        <p>· 备考周期 6-10 个月</p>
                        <p>· 上岸概率 +5%~8%</p>
                        <p>· 可深度攻克难点</p>
                        <p>· 时间灵活度最高</p>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <h4 className="font-medium text-orange-700 mb-2">在职备考</h4>
                      <div className="space-y-1 text-orange-600">
                        <p>· 工作日 3-4 小时</p>
                        <p>· 周末集中 8-10 小时</p>
                        <p>· 备考周期 8-12 个月</p>
                        <p>· 需极强的自律能力</p>
                        <p>· 有收入保障心态稳</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
