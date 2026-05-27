import { useState } from 'react';
import type { UniversityRecommendation } from '../types';
import { majors } from '../data/majors';

interface Props {
  rec: UniversityRecommendation;
}

const tierColors: Record<string, string> = {
  '985': 'bg-red-100 text-red-700',
  '211': 'bg-blue-100 text-blue-700',
  '双一流': 'bg-green-100 text-green-700',
  '双非': 'bg-gray-100 text-gray-600',
};

const tierBadgeColors: Record<string, string> = {
  reach: 'bg-red-50 border-red-200 text-red-700',
  match: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  safety: 'bg-green-50 border-green-200 text-green-700',
};

const tierLabels: Record<string, string> = {
  reach: '冲刺',
  match: '稳妥',
  safety: '保底',
};

const tierAdvice: Record<string, string> = {
  reach: '分数线高于你的当前水平，需要全力以赴备考。建议初试目标分在复试线基础上+20分。',
  match: '与你的水平匹配，录取概率较高，是性价比之选。保持稳定发挥即可。',
  safety: '录取把握大，可作为备选方案。但不要掉以轻心，仍需认真准备。',
};

export default function UniversityCard({ rec }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { university, majorId, tier, matchRate, reason, pastScores, reportRatio, difficultyScore } = rec;
  const major = majors.find((m) => m.id === majorId);
  const ranking = university.subjectRankings[majorId] || '未参评';

  const getDifficultyLabel = (score: number) => {
    if (score >= 90) return '极高难度';
    if (score >= 85) return '高难度';
    if (score >= 80) return '较高难度';
    if (score >= 75) return '中等偏上';
    if (score >= 70) return '中等难度';
    if (score >= 60) return '中等偏下';
    return '相对容易';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all shadow-sm">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-gray-800">{university.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${tierColors[university.tier]}`}>
                {university.tier}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${tierBadgeColors[tier]}`}>
                {tierLabels[tier]}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
              <span>{university.city}</span>
              <span>·</span>
              <span>{university.region}</span>
              {ranking !== '未参评' && (
                <>
                  <span>·</span>
                  <span className="text-indigo-500 font-medium">学科评估 {ranking}</span>
                </>
              )}
              <span>·</span>
              <span className="text-gray-400">{getDifficultyLabel(difficultyScore)}</span>
            </div>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className="text-2xl font-bold text-indigo-600">{matchRate}%</div>
            <div className="text-xs text-gray-400">匹配度</div>
          </div>
        </div>

        {/* 推荐专业 */}
        {major && (
          <div className="mb-2 text-sm">
            <span className="text-gray-500">推荐专业：</span>
            <span className="text-gray-700 font-medium">{major.name}</span>
            <span className="text-xs text-gray-400 ml-1">({major.code})</span>
            {major.examSubjects && (
              <div className="text-xs text-gray-400 mt-0.5">
                初试：{major.examSubjects.math} | {major.examSubjects['专业课']}
              </div>
            )}
          </div>
        )}

        {/* 复试线 */}
        <div className="flex gap-3 mb-2 text-xs flex-wrap">
          {pastScores.map((ps) => (
            <span key={ps.year} className="text-gray-500">
              {ps.year}复试线：<span className="font-medium text-gray-700">{ps.score}</span>
            </span>
          ))}
          <span className="text-gray-400">报录比 {reportRatio}</span>
        </div>

        {/* 匹配度进度条 */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
          <div
            className={`h-1.5 rounded-full transition-all ${
              tier === 'reach' ? 'bg-red-400' : tier === 'match' ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            style={{ width: `${matchRate}%` }}
          />
        </div>

        {/* 理由 */}
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{reason}</p>

        {/* 特色标签 */}
        <div className="flex flex-wrap gap-1 mb-2">
          {university.features.map((f) => (
            <span key={f} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded">{f}</span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {expanded ? '收起详情 ▲' : '查看详细信息 ▼'}
        </button>

        {/* 展开详情 */}
        {expanded && (
          <div className="mt-3 border-t border-gray-100 pt-3 space-y-3 text-sm">
            {/* 院校详情 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="text-gray-400">所在地</span>
                <p className="text-gray-700">{university.city}（{university.region}地区）</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="text-gray-400">院校标签</span>
                <p className="text-gray-700">
                  {[
                    university.is985 && '985工程',
                    university.is211 && '211工程',
                    university.isDoubleFirst && '双一流',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="text-gray-400">该专业学科评估</span>
                <p className="text-gray-700 font-medium">
                  {ranking === '未参评' ? '暂未参评' : `${ranking}（第五轮评估）`}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <span className="text-gray-400">录取难度评分</span>
                <p className="text-gray-700">{difficultyScore}/100 — {getDifficultyLabel(difficultyScore)}</p>
              </div>
            </div>

            {/* 复试线走势 */}
            <div>
              <h4 className="font-medium text-gray-700 mb-1 text-xs">近三年复试线参考</h4>
              <div className="flex items-end gap-3 bg-gray-50 rounded-lg p-3">
                {pastScores.map((ps) => {
                  const maxScore = Math.max(...pastScores.map((s) => s.score), 300);
                  const height = Math.max(20, (ps.score / maxScore) * 80);
                  return (
                    <div key={ps.year} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-xs font-medium text-gray-700">{ps.score}</span>
                      <div
                        className="w-full bg-indigo-400 rounded-t"
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-xs text-gray-400">{ps.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 备考策略建议 */}
            <div className={`rounded-lg p-3 ${
              tier === 'reach' ? 'bg-red-50' : tier === 'match' ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <h4 className="font-medium text-gray-700 mb-1 text-xs">
                {tier === 'reach' ? '冲刺策略' : tier === 'match' ? '稳妥策略' : '保底策略'}
              </h4>
              <p className="text-xs text-gray-600">{tierAdvice[tier]}</p>
              <ul className="text-xs text-gray-500 space-y-0.5 mt-1 list-disc list-inside">
                {tier === 'reach' && (
                  <>
                    <li>除统考科目外，需额外关注该校自命题风格</li>
                    <li>建议联系目标院校学长学姐了解内部信息</li>
                    <li>准备1-2所同档次的备选院校分散风险</li>
                  </>
                )}
                {tier === 'match' && (
                  <>
                    <li>按正常节奏备考即可，注意保持各科均衡</li>
                    <li>重点攻克该校自命题专业课侧重点</li>
                    <li>校招/夏令营/提前面试等机会不容错过</li>
                  </>
                )}
                {tier === 'safety' && (
                  <>
                    <li>作为保底院校，确保达到复试线即可</li>
                    <li>可以把更多精力投入到冲刺院校的准备中</li>
                    <li>但也需认真对待，不要完全放松</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
