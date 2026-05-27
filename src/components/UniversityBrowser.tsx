import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import { universities } from '../data/universities';
import { majors } from '../data/majors';
import type { Tier } from '../types';

const regions = ['全部', '华北', '东北', '华东', '华中', '华南', '西南', '西北'];
const tiers: (Tier | '全部')[] = ['全部', '985', '211', '双一流', '双非'];
const tierColors: Record<string, string> = {
  '985': 'bg-red-100 text-red-700',
  '211': 'bg-blue-100 text-blue-700',
  '双一流': 'bg-green-100 text-green-700',
  '双非': 'bg-gray-100 text-gray-600',
};

export default function UniversityBrowser() {
  const { dispatch } = useAppState();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('全部');
  const [tier, setTier] = useState<Tier | '全部'>('全部');
  const [selectedMajorId, setSelectedMajorId] = useState('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'university' | 'major'>('university');

  const filteredUnis = useMemo(() => {
    let result = universities;
    if (region !== '全部') result = result.filter((u) => u.region === region);
    if (tier !== '全部') result = result.filter((u) => u.tier === tier);
    if (selectedMajorId !== '全部') result = result.filter((u) => u.majorIds.includes(selectedMajorId));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
      );
    }
    return result;
  }, [region, tier, selectedMajorId, search]);

  // 院校→专业 统计
  const uniMajorStats = useMemo(() => {
    const map: Record<string, number> = {};
    for (const u of universities) {
      map[u.id] = u.majorIds.length;
    }
    return map;
  }, []);

  // 专业→院校 统计
  const majorUniStats = useMemo(() => {
    const map: Record<string, { count: number; count985: number; count211: number }> = {};
    for (const m of majors) {
      const unis = universities.filter((u) => u.majorIds.includes(m.id));
      map[m.id] = {
        count: unis.length,
        count985: unis.filter((u) => u.is985).length,
        count211: unis.filter((u) => u.is211 && !u.is985).length,
      };
    }
    return map;
  }, []);

  // 获取某院校的所有专业信息
  const getUniMajors = (uniId: string) => {
    const uni = universities.find((u) => u.id === uniId);
    if (!uni) return [];
    return uni.majorIds.map((mid) => majors.find((m) => m.id === mid)).filter(Boolean);
  };

  // 获取某专业的所有院校
  const getMajorUnis = (majorId: string) => {
    return universities.filter((u) => u.majorIds.includes(majorId));
  };

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
            {viewMode === 'university' ? `共 ${filteredUnis.length} 所院校` : `共 ${majors.length} 个专业`}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">院校信息浏览</h2>
        <p className="text-sm text-gray-500">浏览全部院校与专业信息，支持多维度筛选</p>
      </div>

      {/* 视图切换 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode('university')}
          className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'university' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          按院校浏览
        </button>
        <button
          onClick={() => setViewMode('major')}
          className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'major' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          按专业浏览
        </button>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">搜索</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={viewMode === 'university' ? '院校名称/城市' : '专业名称'}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">地区</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {viewMode === 'university' ? (
          <div>
            <label className="block text-xs text-gray-400 mb-1">院校层次</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as Tier | '全部')}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        ) : null}
        <div>
          <label className="block text-xs text-gray-400 mb-1">专业方向</label>
          <select
            value={selectedMajorId}
            onChange={(e) => setSelectedMajorId(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white"
          >
            <option value="全部">全部专业</option>
            {majors.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        {viewMode === 'major' && (
          <div>
            <label className="block text-xs text-gray-400 mb-1">院校层次</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as Tier | '全部')}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 bg-white"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 按院校浏览 */}
      {viewMode === 'university' && (
        <div className="space-y-3">
          {filteredUnis.map((uni) => {
            const isExpanded = expandedId === uni.id;
            const uniMajors = isExpanded ? getUniMajors(uni.id) : [];
            return (
              <div key={uni.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-800">{uni.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tierColors[uni.tier]}`}>
                          {uni.tier}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-2 flex-wrap">
                        <span>{uni.city}</span>
                        <span>·</span>
                        <span>{uni.region}</span>
                        <span>·</span>
                        <span>开设 {uniMajorStats[uni.id] || 0} 个考研专业</span>
                        <span>·</span>
                        <span>{uni.is985 ? '985工程' : uni.is211 ? '211工程' : uni.isDoubleFirst ? '双一流' : ''}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : uni.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium shrink-0 ml-3"
                    >
                      {isExpanded ? '收起 ▲' : '查看专业列表 ▼'}
                    </button>
                  </div>

                  {/* 特色标签 */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {uni.features.slice(0, 4).map((f) => (
                      <span key={f} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded">{f}</span>
                    ))}
                  </div>

                  {/* 展开的专业列表 */}
                  {isExpanded && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        该院校收录的考研专业（{uniMajors.length} 个）
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {uniMajors.map((m) => {
                          if (!m) return null;
                          const ranking = uni.subjectRankings[m.id];
                          const score = uni.admissionScore[m.id];
                          return (
                            <div key={m.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-700">{m.name}</span>
                                <span className="text-xs text-gray-400">{m.code}</span>
                              </div>
                              <div className="text-xs text-gray-400 space-y-0.5">
                                <div>初试：{m.examSubjects.math} | {m.examSubjects['专业课']}</div>
                                {ranking && <div>学科评估：<span className="text-indigo-500 font-medium">{ranking}</span></div>}
                                {score && <div>录取难度：<span className="text-gray-600">{score}/100</span></div>}
                                <div>竞争热度：{'★'.repeat(m.competitionHeat)} | 跨考难度：{'★'.repeat(m.crossExamDifficulty)}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {filteredUnis.length === 0 && (
            <div className="text-center py-12 text-gray-400">没有匹配的院校，请调整筛选条件</div>
          )}
        </div>
      )}

      {/* 按专业浏览 */}
      {viewMode === 'major' && (
        <div className="space-y-3">
          {majors
            .filter((m) => {
              if (selectedMajorId !== '全部') return m.id === selectedMajorId;
              if (search.trim()) {
                const q = search.trim().toLowerCase();
                return m.name.toLowerCase().includes(q) || m.code.includes(q) || m.category.includes(q);
              }
              if (tier !== '全部') {
                const unis = getMajorUnis(m.id);
                return unis.some((u) => u.tier === tier);
              }
              return true;
            })
            .map((m) => {
              const stats = majorUniStats[m.id];
              const isExpanded = expandedId === m.id;
              return (
                <div key={m.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-800">{m.name}</h3>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{m.code}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{m.category}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          收录开设院校：{stats?.count || 0} 所
                          {stats?.count985 ? `（985: ${stats.count985} 所` : ''}
                          {stats?.count211 ? `，211: ${stats.count211} 所` : ''}
                          {stats?.count985 || stats?.count211 ? '）' : ''}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{m.description}</div>
                      </div>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : m.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium shrink-0 ml-3"
                      >
                        {isExpanded ? '收起 ▲' : '查看院校 ▼'}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          开设该专业的院校（{stats?.count || 0} 所）
                        </h4>
                        <div className="space-y-2">
                          {getMajorUnis(m.id).map((uni) => {
                            const ranking = uni.subjectRankings[m.id];
                            return (
                              <div key={uni.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">{uni.name}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${tierColors[uni.tier]}`}>
                                      {uni.tier}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-0.5">
                                    {uni.city} · 录取难度 {uni.admissionScore[m.id] || '-'}/100
                                    {ranking && <span className="ml-2 text-indigo-500">学科评估 {ranking}</span>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}

    </div>
  );
}
