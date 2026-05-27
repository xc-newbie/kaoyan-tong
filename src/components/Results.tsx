import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import RadarChart from './RadarChart';
import ScoreCard from './ScoreCard';
import UniversityCard from './UniversityCard';
import FilterBar from './FilterBar';

export default function Results() {
  const { state, dispatch } = useAppState();
  const { evaluation, universityRecommendations, selectedMajorIds } = state;
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  if (!evaluation) return null;

  let filtered = universityRecommendations;
  if (selectedTier !== 'all') {
    filtered = filtered.filter((r) => r.tier === selectedTier);
  }
  if (selectedRegion !== 'all') {
    filtered = filtered.filter((r) => r.university.region === selectedRegion);
  }

  const reach = filtered.filter((r) => r.tier === 'reach');
  const match = filtered.filter((r) => r.tier === 'match');
  const safety = filtered.filter((r) => r.tier === 'safety');

  const scoreItems = [
    { label: '学术能力', score: evaluation.academic, detail: evaluation.details.academic, color: 'indigo' },
    { label: '数理基础', score: evaluation.mathLogic, detail: evaluation.details.mathLogic, color: 'blue' },
    { label: '编程技能', score: evaluation.programming, detail: evaluation.details.programming, color: 'cyan' },
    { label: '竞赛经历', score: evaluation.competition, detail: evaluation.details.competition, color: 'purple' },
    { label: '英语水平', score: evaluation.english, detail: evaluation.details.english, color: 'pink' },
    { label: '项目经验', score: evaluation.project, detail: evaluation.details.project, color: 'orange' },
    { label: '专业素养', score: evaluation.professionalLiteracy, detail: evaluation.details.professionalLiteracy, color: 'emerald' },
    { label: '科研潜力', score: evaluation.researchPotential, detail: evaluation.details.researchPotential, color: 'teal' },
    { label: '综合素质', score: evaluation.comprehensive, detail: evaluation.details.comprehensive, color: 'amber' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        评估结果与院校推荐
      </h2>

      {/* 综合评分 */}
      <div className="flex items-center gap-5 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
        <div className="text-center shrink-0">
          <div className="text-4xl font-extrabold text-indigo-600">{evaluation.overall}</div>
          <div className="text-xs text-gray-500 mt-0.5 font-medium">综合评分</div>
        </div>
        <div>
          <p className="text-sm text-gray-600">{evaluation.details.overall}</p>
          <div className="mt-2 flex items-center gap-1.5">
            {['reach', 'match', 'safety'].map((tier) => {
              const count = state.universityRecommendations.filter(r => r.tier === tier).length;
              const colors: Record<string, string> = { reach: 'text-red-500 bg-red-50', match: 'text-amber-500 bg-amber-50', safety: 'text-emerald-500 bg-emerald-50' };
              const labels: Record<string, string> = { reach: '冲刺', match: '稳妥', safety: '保底' };
              return (
                <span key={tier} className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[tier]}`}>
                  {labels[tier]} {count}所
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 雷达图 + 得分卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="md:col-span-2">
          <RadarChart data={evaluation} />
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-2">
          {scoreItems.map((s) => (
            <ScoreCard key={s.label} label={s.label} score={s.score} detail={s.detail} />
          ))}
        </div>
      </div>

      {/* 偏好对齐分析 */}
      {evaluation.details.budgetAnalysis && (
        <div className="mb-6 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            报考偏好对齐分析
          </h3>
          <div className="space-y-2.5 text-sm text-gray-600">
            {[
              { icon: '预算', color: 'text-indigo-400', key: 'budgetAnalysis' },
              { icon: '风险', color: 'text-purple-400', key: 'riskStrategy' },
              { icon: '数学', color: 'text-blue-400', key: 'mathAcceptanceNote' },
              { icon: '非全', color: 'text-amber-400', key: 'partTimeNote' },
            ].map(({ icon, color, key }) => (
              <div key={key} className="flex items-start gap-2">
                <span className={`${color} mt-0.5 font-medium text-xs w-8 shrink-0`}>{icon}</span>
                <span>{evaluation.details[key]}</span>
              </div>
            ))}
            {(() => {
              const prefs = state.userProfile.preferences;
              if (!prefs?.regions?.length) return null;
              const regionUnis = state.universityRecommendations.filter(r => prefs.regions!.includes(r.university.region));
              const coverage = state.universityRecommendations.length > 0
                ? Math.round((regionUnis.length / state.universityRecommendations.length) * 100)
                : 0;
              return (
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 font-medium text-xs w-8 shrink-0">地区</span>
                  <span>
                    意向地区（{prefs.regions.join('、')}）覆盖了 {regionUnis.length} 所推荐院校（{coverage}%）。
                    {coverage < 30 ? ' 意向地区覆盖院校较少，建议适当扩大地区选择范围。' : coverage >= 70 ? ' 意向地区覆盖良好，目标院校地域匹配度高。' : ' 可结合实际情况考虑是否放宽地区限制。'}
                  </span>
                </div>
              );
            })()}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed">{evaluation.details.preferencesAlignment}</p>
          </div>
        </div>
      )}

      {/* 院校推荐 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        院校推荐
        <span className="text-sm font-normal text-gray-400 ml-2">
          已选 {selectedMajorIds.length} 个专业，共 {filtered.length} 所推荐院校
        </span>
      </h3>

      <FilterBar
        selectedTier={selectedTier}
        onTierChange={setSelectedTier}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          当前筛选条件下没有匹配的院校，请调整筛选条件或返回修改偏好。
        </div>
      ) : (
        <div className="space-y-6">
          {reach.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-rose-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                冲刺档 ({reach.length}所)
              </h4>
              <div className="grid gap-3">
                {reach.map((r) => (
                  <UniversityCard key={`${r.university.id}-${r.majorId}`} rec={r} />
                ))}
              </div>
            </div>
          )}

          {match.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                稳妥档 ({match.length}所)
              </h4>
              <div className="grid gap-3">
                {match.map((r) => (
                  <UniversityCard key={`${r.university.id}-${r.majorId}`} rec={r} />
                ))}
              </div>
            </div>
          )}

          {safety.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                保底档 ({safety.length}所)
              </h4>
              <div className="grid gap-3">
                {safety.map((r) => (
                  <UniversityCard key={`${r.university.id}-${r.majorId}`} rec={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'majorRecommendation' })}
          className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
        >
          返回重新选专业
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'studyPlan' })}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          下一步：生成备考计划
        </button>
      </div>
    </div>
  );
}
