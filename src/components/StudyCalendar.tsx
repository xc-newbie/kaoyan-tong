interface Props {
  totalDays: number;
  milestones: { day: number; title: string }[];
}

export default function StudyCalendar({ totalDays, milestones }: Props) {
  const weeks = Math.ceil(totalDays / 7);
  const cols = Math.min(weeks, 26); // max 26 weeks shown

  const getColor = (day: number) => {
    // Simplified color mapping based on phase
    const ratio = day / totalDays;
    if (ratio < 0.4) return 'bg-green-200';
    if (ratio < 0.75) return 'bg-blue-300';
    return 'bg-indigo-400';
  };

  const getMilestone = (day: number) =>
    milestones.find((m) => m.day === day);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {Array.from({ length: cols }, (_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }, (_, d) => {
              const day = w * 7 + d + 1;
              if (day > totalDays) return <div key={d} className="w-3 h-3" />;
              const milestone = getMilestone(day);
              return (
                <div
                  key={d}
                  className={`w-3 h-3 rounded-sm ${getColor(day)} ${milestone ? 'ring-1 ring-indigo-500' : ''}`}
                  title={`Day ${day}${milestone ? ': ' + milestone.title : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>第 1 天</span>
        <span>第 {totalDays} 天</span>
      </div>
    </div>
  );
}
