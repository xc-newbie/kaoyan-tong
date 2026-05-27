import { useState } from 'react';
import { useAppState } from '../context/AppContext';
import MajorCard from './MajorCard';

export default function MajorRecommendation() {
  const { state, dispatch } = useAppState();
  const { majorRecommendations, evaluation } = state;
  const [selected, setSelected] = useState<string[]>([]);

  const toggleMajor = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    dispatch({ type: 'SELECT_MAJORS', payload: selected });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sticky top bar with back button + counter */}
      <div className="sticky top-[53px] z-10 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 pb-3 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'preferences' })}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回修改偏好
          </button>
          <span className="text-sm text-gray-500">
            已选 <span className={`font-semibold ${selected.length > 0 ? 'text-indigo-600' : 'text-gray-400'}`}>{selected.length}</span>/3 个专业
          </span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">专业方向推荐</h2>
      <p className="text-sm text-gray-500 mb-6">
        基于你的学术背景和技能水平，以下专业按匹配度排序。
        请选择 1-3 个意向专业，系统将为你推荐对应院校。
        {evaluation && (
          <span className="ml-2 text-indigo-600 font-medium">
            综合评分：{evaluation.overall} 分
          </span>
        )}
      </p>

      <div className="mt-6 pb-20">
        {majorRecommendations.map((rec) => (
          <MajorCard
            key={rec.major.id}
            rec={rec}
            selected={selected.includes(rec.major.id)}
            onToggle={() => toggleMajor(rec.major.id)}
          />
        ))}
      </div>

      {/* Floating bottom bar — always visible when selection made */}
      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
            >
              查看院校推荐（已选{selected.length}个专业）
            </button>
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <div className="mt-6">
          <button
            disabled
            className="w-full rounded-xl py-3 text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
          >
            请至少选择一个专业
          </button>
        </div>
      )}
    </div>
  );
}
