interface Props {
  label: string;
  score: number;
  detail: string;
}

export default function ScoreCard({ label, score, detail }: Props) {
  const palette =
    score >= 80
      ? { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' }
      : score >= 60
        ? { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', bar: 'bg-blue-500' }
        : score >= 40
          ? { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', bar: 'bg-amber-500' }
          : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500' };

  return (
    <div className={`rounded-xl border ${palette.border} ${palette.bg} px-3 py-3 text-center`}>
      <div className="text-xs text-gray-500 mb-1.5 font-medium">{label}</div>
      <div className={`text-2xl font-extrabold ${palette.text}`}>{score}</div>
      <div className="w-full h-1 bg-gray-200/50 rounded-full mt-2 mb-1.5 overflow-hidden">
        <div className={`h-full ${palette.bar} rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
      <div className="text-xs text-gray-400 leading-tight">{detail}</div>
    </div>
  );
}
