const steps = [
  { key: 'basicInfo', label: '基本信息', num: 1 },
  { key: 'academicProfile', label: '学术科研', num: 2 },
  { key: 'skills', label: '技能证书', num: 3 },
  { key: 'preferences', label: '报考偏好', num: 4 },
];

export default function StepIndicator({ current }: { current: string }) {
  const currentIdx = steps.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center bg-white/80 backdrop-blur rounded-2xl px-6 py-3 shadow-sm border border-gray-100">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < currentIdx
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : i === currentIdx
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md shadow-indigo-200'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < currentIdx ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.num}
              </div>
              <span
                className={`text-sm hidden sm:inline font-medium transition-colors duration-300 ${
                  i === currentIdx ? 'text-indigo-600' : i < currentIdx ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-10 h-0.5 mx-3 hidden sm:block rounded-full transition-colors duration-300 ${
                  i < currentIdx ? 'bg-indigo-400' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
