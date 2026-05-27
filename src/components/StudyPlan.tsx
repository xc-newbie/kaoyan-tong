import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import type { WorkSchedule } from '../types';
import { calcDailyStudyHours } from '../utils/studyPlanGenerator';
import DailySchedule from './DailySchedule';
import StudyCalendar from './StudyCalendar';

export default function StudyPlan() {
  const { state, dispatch } = useAppState();
  const { studyMode, studyPlan, userProfile } = state;

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const [workSchedule, setWorkSchedule] = useState<WorkSchedule>({
    workStartTime: '09:00',
    workEndTime: '18:00',
    commuteMinutes: 60,
    studyStartTime: '19:30',
    studyEndTime: '23:00',
    hasWeekendObligations: false,
  });

  const studyHours = useMemo(() => calcDailyStudyHours(
    studyMode === 'working' ? workSchedule : undefined
  ), [studyMode, workSchedule]);

  const handleGenerate = () => {
    dispatch({
      type: 'GENERATE_STUDY_PLAN',
      payload: {
        startDate,
        mathAcceptance: userProfile.preferences?.mathAcceptance,
        hasProfCourse: true,
        workSchedule: studyMode === 'working' ? workSchedule : undefined,
      },
    });
  };

  const updateWorkSchedule = (field: keyof WorkSchedule, value: string | number | boolean) => {
    setWorkSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sticky top bar */}
      <div className="sticky top-[53px] z-10 bg-white/95 backdrop-blur border-b border-gray-100 -mx-4 px-4 pb-3 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'results' })}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回院校推荐
          </button>
          <div className="flex items-center gap-2">
            {studyPlan && (
              <button
                onClick={handlePrint}
                className="text-xs text-gray-500 hover:text-indigo-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                保存/打印
              </button>
            )}
            <span className="text-xs text-gray-400">
              {studyMode === 'fulltime' ? '脱产备考' : '在职备考'}
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">备考学习计划</h2>
      <p className="text-sm text-gray-500 mb-6">
        {studyMode === 'fulltime' ? '脱产备考模式' : '在职备考模式'}
        {' — '}根据你的备考身份和剩余天数自动生成分阶段学习计划。
      </p>

      {!studyPlan ? (
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <label className="block text-sm text-gray-600 mb-2">预计开始备考日期</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-300 outline-none"
            />
            <p className="text-xs text-gray-400 mt-2">
              考试日期默认为当年 12 月倒数第二个周末，系统会自动计算备考总天数。
            </p>

            {/* 模式提示 */}
            <div className={`mt-4 p-4 rounded-lg ${studyMode === 'fulltime' ? 'bg-indigo-50' : 'bg-orange-50'}`}>
              <h4 className="font-medium text-sm mb-1">
                {studyMode === 'fulltime' ? '脱产备考特点' : '在职备考特点'}
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {studyMode === 'fulltime' ? (
                  <>
                    <li>每日可投入 8-12 小时学习</li>
                    <li>三个阶段完整覆盖，进度紧凑</li>
                    <li>建议每周休息半天到一天</li>
                  </>
                ) : (
                  <>
                    <li>工作日预估学习 {studyHours.weekday}h，周末 {studyHours.weekend}h</li>
                    <li>休息日集中突破重难点</li>
                    <li>基础阶段适当拉长，需高效利用每一分钟</li>
                    <li>通勤、午休等碎片时间背单词、刷政治选择题</li>
                  </>
                )}
              </ul>
            </div>

            {/* 工作时间设置（仅在职模式） */}
            {studyMode === 'working' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-sm text-gray-700 mb-3">工作时间设置</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">上班时间</label>
                    <input
                      type="time"
                      value={workSchedule.workStartTime}
                      onChange={(e) => updateWorkSchedule('workStartTime', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">下班时间</label>
                    <input
                      type="time"
                      value={workSchedule.workEndTime}
                      onChange={(e) => updateWorkSchedule('workEndTime', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">通勤时长</label>
                    <select
                      value={workSchedule.commuteMinutes}
                      onChange={(e) => updateWorkSchedule('commuteMinutes', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm bg-white"
                    >
                      <option value={15}>15 分钟</option>
                      <option value={30}>30 分钟</option>
                      <option value={45}>45 分钟</option>
                      <option value={60}>1 小时</option>
                      <option value={90}>1.5 小时</option>
                      <option value={120}>2 小时</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">最早学习时间</label>
                    <input
                      type="time"
                      value={workSchedule.studyStartTime}
                      onChange={(e) => updateWorkSchedule('studyStartTime', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">最晚学习时间</label>
                    <input
                      type="time"
                      value={workSchedule.studyEndTime}
                      onChange={(e) => updateWorkSchedule('studyEndTime', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer pb-1">
                      <input
                        type="checkbox"
                        checked={workSchedule.hasWeekendObligations}
                        onChange={(e) => updateWorkSchedule('hasWeekendObligations', e.target.checked)}
                        className="rounded"
                      />
                      周末有事务
                    </label>
                  </div>
                </div>
                {workSchedule.hasWeekendObligations && (
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">周末可开始学习</label>
                      <input
                        type="time"
                        value={workSchedule.weekendAvailableStart || '08:00'}
                        onChange={(e) => updateWorkSchedule('weekendAvailableStart', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">周末最晚学到</label>
                      <input
                        type="time"
                        value={workSchedule.weekendAvailableEnd || '22:30'}
                        onChange={(e) => updateWorkSchedule('weekendAvailableEnd', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    预估每日学习时长：工作日约 <span className="font-semibold text-indigo-600">{studyHours.weekday}h</span>，
                    周末约 <span className="font-semibold text-indigo-600">{studyHours.weekend}h</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            生成我的学习计划
          </button>
        </div>
      ) : (
        <div>
          {/* 总览 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{studyPlan.totalDays}</div>
              <div className="text-xs text-gray-400">备考总天数</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{studyPlan.phases.length}</div>
              <div className="text-xs text-gray-400">备考阶段</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {studyMode === 'fulltime' ? '8-12h' : `${studyHours.weekday}-${studyHours.weekend}h`}
              </div>
              <div className="text-xs text-gray-400">每日学习时长</div>
            </div>
          </div>

          {/* 科目分配 — 可自定义 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">科目时间分配</h3>
              <span className="text-xs text-gray-400">拖动滑块可自定义比例</span>
            </div>
            <div className="space-y-3">
              {studyPlan.subjectAllocation.math > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-600">数学</span>
                    <span className="text-sm font-bold text-blue-600">{studyPlan.subjectAllocation.math}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={studyPlan.subjectAllocation.math}
                    readOnly
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-indigo-600">专业课</span>
                  <span className="text-sm font-bold text-indigo-600">{studyPlan.subjectAllocation.专业课}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={studyPlan.subjectAllocation.专业课}
                  readOnly
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-green-600">英语</span>
                  <span className="text-sm font-bold text-green-600">{studyPlan.subjectAllocation.english}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={studyPlan.subjectAllocation.english}
                  readOnly
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-orange-600">政治</span>
                  <span className="text-sm font-bold text-orange-600">{studyPlan.subjectAllocation.politics}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={studyPlan.subjectAllocation.politics}
                  readOnly
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>
            <div className="mt-3 flex gap-1.5 h-3 rounded-full overflow-hidden">
              {studyPlan.subjectAllocation.math > 0 && (
                <div className="bg-blue-400 h-full transition-all" style={{ width: `${studyPlan.subjectAllocation.math}%` }} />
              )}
              <div className="bg-indigo-400 h-full transition-all" style={{ width: `${studyPlan.subjectAllocation.专业课}%` }} />
              <div className="bg-green-400 h-full transition-all" style={{ width: `${studyPlan.subjectAllocation.english}%` }} />
              <div className="bg-orange-400 h-full transition-all" style={{ width: `${studyPlan.subjectAllocation.politics}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-3">以上为系统建议分配比例，你可根据自身强弱项在实际执行中灵活调整。</p>
          </div>

          {/* 阶段计划 */}
          <div className="space-y-4 mb-6">
            {studyPlan.phases.map((phase, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{i === 0 ? '📚' : i === 1 ? '💪' : '🚀'}</span>
                  <h3 className="font-semibold text-gray-800">{phase.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">{phase.description}</p>
                <p className="text-sm text-gray-600 mb-3">{phase.goal}</p>

                <div className="space-y-2 mb-3">
                  {phase.tasks.map((t, j) => (
                    <div key={j}>
                      <p className="text-xs font-medium text-gray-600 mb-1">{t.subject}</p>
                      <ul className="list-disc list-inside text-xs text-gray-500 space-y-0.5">
                        {t.items.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">关键节点：</p>
                  {phase.checkpoints.map((cp, k) => (
                    <p key={k} className="text-xs text-gray-400">· {cp}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 每日时间表 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <DailySchedule schedule={studyPlan.dailySchedule} mode={studyPlan.mode} />
          </div>

          {/* 学习日历 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">备考日历</h3>
            <StudyCalendar
              totalDays={studyPlan.totalDays}
              milestones={studyPlan.milestones.map((m) => ({ day: m.day, title: m.title }))}
            />
          </div>

          {/* 里程碑 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">关键里程碑</h3>
            <div className="space-y-2">
              {studyPlan.milestones.filter((m) => m.title !== '月度复盘').slice(0, 8).map((m, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-xs text-gray-400 w-24 shrink-0">{m.date}</span>
                  <span className="font-medium text-gray-600">{m.title}</span>
                  <span className="text-gray-400">— {m.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={() => dispatch({ type: 'SET_STEP', payload: 'results' })}
              className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              返回院校推荐
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="flex-1 bg-white text-red-500 rounded-xl py-3 text-sm font-medium hover:bg-red-50 border border-red-200 transition-colors"
            >
              重新开始评估
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
