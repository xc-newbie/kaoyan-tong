import type { DailySchedule as DS } from '../types';

interface Props {
  schedule: DS;
  mode: 'fulltime' | 'working';
}

export default function DailySchedule({ schedule, mode }: Props) {
  const renderSlots = (slots: NonNullable<(typeof schedule)['fulltime']>, title: string, subtitle?: string) => (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-1">{title}</h4>
      {subtitle && <p className="text-xs text-gray-400 mb-2">{subtitle}</p>}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50/50 transition-colors ${
              i < slots.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <span className="text-xs text-gray-400 w-24 shrink-0 font-mono">{s.time}</span>
            <span className="font-medium text-gray-700 w-36 shrink-0">{s.activity}</span>
            <span className="text-xs text-gray-400">{s.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">每日时间表</h3>
      {mode === 'fulltime' && schedule.fulltime && renderSlots(schedule.fulltime, '脱产备考')}
      {mode === 'working' && (
        <>
          {schedule.weekday && renderSlots(schedule.weekday, '工作日', '周一至周五，利用早晚+碎片时间')}
          {schedule.weekend && renderSlots(schedule.weekend, '休息日', '集中突破重难点')}
        </>
      )}
    </div>
  );
}
