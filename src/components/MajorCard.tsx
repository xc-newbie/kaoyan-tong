import { useState } from 'react';
import type { MajorRecommendation } from '../types';
import { getUniversitiesByMajor } from '../data/universities';

interface Props {
  rec: MajorRecommendation;
  selected: boolean;
  onToggle: () => void;
}

export default function MajorCard({ rec, selected, onToggle }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { major, matchRate, reasons } = rec;

  // 统计该专业对应的院校数量
  const uniCount = getUniversitiesByMajor(major.id).length;
  const uni985Count = getUniversitiesByMajor(major.id).filter((u) => u.is985).length;
  const uni211Count = getUniversitiesByMajor(major.id).filter((u) => u.is211 && !u.is985).length;

  const getHeatLabel = (score: number) => {
    if (score >= 5) return { text: '极高', color: 'text-red-600' };
    if (score >= 4) return { text: '高', color: 'text-orange-500' };
    if (score >= 3) return { text: '中等', color: 'text-yellow-600' };
    if (score >= 2) return { text: '较低', color: 'text-green-600' };
    return { text: '低', color: 'text-gray-500' };
  };

  const heatInfo = getHeatLabel(major.competitionHeat);

  return (
    <div
      className={`bg-white rounded-xl border transition-all ${
        selected ? 'border-indigo-400 ring-2 ring-indigo-200 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-gray-800">{major.name}</h3>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{major.code}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{major.category}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {major.degreeType === 'academic' ? '学硕' : major.degreeType === 'professional' ? '专硕' : '学硕/专硕均可'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {major.tags.map((t) => (
                <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className="text-2xl font-bold text-indigo-600">{matchRate}%</div>
            <div className="text-xs text-gray-400">匹配度</div>
          </div>
        </div>

        {/* 匹配度进度条 */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all"
            style={{ width: `${matchRate}%` }}
          />
        </div>

        {/* 推荐理由 */}
        <div className="mb-2">
          {reasons.slice(0, 3).map((r, i) => (
            <p key={i} className="text-xs text-gray-500 leading-relaxed">
              {r}
            </p>
          ))}
        </div>

        {/* 快速指标 */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mb-3">
          <span className="text-gray-400">
            技术含量：{'★'.repeat(major.techLevel)}{'☆'.repeat(5 - major.techLevel)}
          </span>
          <span className="text-gray-400">
            跨考难度：{'★'.repeat(major.crossExamDifficulty)}{'☆'.repeat(5 - major.crossExamDifficulty)}
          </span>
          <span className={`${heatInfo.color}`}>
            竞争热度：{'★'.repeat(major.competitionHeat)} {heatInfo.text}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {expanded ? '收起详情 ▲' : '查看详细信息 ▼'}
          </button>
          <button
            onClick={onToggle}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ml-auto ${
              selected
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {selected ? '已选择该专业' : '选择此专业'}
          </button>
        </div>
      </div>

      {/* 展开详情 */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 rounded-b-xl space-y-4 text-sm">
          {/* 专业概述 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-1">专业概述</h4>
            <p className="text-gray-500 leading-relaxed text-xs">{major.description}</p>
          </div>

          {/* 研究方向 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-1">主要研究方向</h4>
            <div className="flex flex-wrap gap-1">
              {major.directions.map((d) => (
                <span key={d} className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded">{d}</span>
              ))}
            </div>
          </div>

          {/* 考试科目 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-1">典型初试科目</h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 bg-white rounded-lg p-3">
              <div>政治：{major.examSubjects.politics}</div>
              <div>英语：{major.examSubjects.english}</div>
              <div>数学：{major.examSubjects.math}</div>
              <div>专业课：{major.examSubjects['专业课']}</div>
            </div>
          </div>

          {/* 国家线 & 院校统计 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium text-gray-700 mb-1 text-xs">近年国家线</h4>
              <p className="text-xs text-gray-500">{major.nationalLine2024}</p>
              <p className="text-xs text-gray-500">{major.nationalLine2025}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium text-gray-700 mb-1 text-xs">开设院校统计</h4>
              <p className="text-xs text-gray-500">收录 {uniCount} 所院校</p>
              <p className="text-xs text-gray-500">985：{uni985Count} 所 | 211：{uni211Count} 所</p>
            </div>
          </div>

          {/* 就业前景 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-1">就业前景</h4>
            <p className="text-gray-500 leading-relaxed text-xs">{major.careerProspects}</p>
          </div>

          {/* 适合人群 + 跨考难度分析 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium text-gray-700 mb-1 text-xs">适合人群</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{major.suitableFor}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium text-gray-700 mb-1 text-xs">跨考难度分析</h4>
              <p className="text-xs text-gray-500">
                技术含量：{major.techLevel}/5 星 |
                跨考难度：{major.crossExamDifficulty}/5 星
              </p>
              <p className="text-xs text-gray-500">
                竞争热度：{major.competitionHeat}/5 星
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {major.crossExamDifficulty >= 4
                  ? '跨考难度很大，需要较长时间准备基础课程'
                  : major.crossExamDifficulty >= 3
                  ? '跨考有挑战，建议提前1年准备'
                  : major.crossExamDifficulty >= 2
                  ? '跨考难度适中，系统性复习可行'
                  : '跨考门槛较低，适合跨考生报考'}
              </p>
            </div>
          </div>

          {/* 备考建议 */}
          <div className="bg-indigo-50 rounded-lg p-3">
            <h4 className="font-medium text-indigo-700 mb-1 text-xs">备考建议</h4>
            <ul className="text-xs text-indigo-600 space-y-0.5 list-disc list-inside">
              {major.techLevel >= 4 && (
                <li>技术方向需要扎实的编程和数学基础，建议尽早开始刷题</li>
              )}
              {major.competitionHeat >= 4 && (
                <li>该专业竞争激烈，初试分数目标应设在380+以上</li>
              )}
              {major.crossExamDifficulty <= 2 && (
                <li>跨考友好型专业，重点攻克专业课即可</li>
              )}
              {major.examSubjects.math.includes('不考') && (
                <li>不考数学的专业，需在专业课上投入更多时间</li>
              )}
              <li>建议在目标院校官网查阅最新招生简章和自命题大纲</li>
              <li>参考近3年录取数据，合理定位目标分数</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
