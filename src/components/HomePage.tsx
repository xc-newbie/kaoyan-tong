import { useAppState } from '../context/AppContext';

export default function HomePage() {
  const { dispatch } = useAppState();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Logo / Brand */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <span className="text-xs font-medium text-indigo-500 tracking-wide">2026 考研</span>
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-3 tracking-tight">
            考研<strong className="text-indigo-600">不难</strong>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            智能考研择校评估与备考规划平台
          </p>
        </div>

        <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed text-sm">
          多维度评估个人竞争力，智能推荐专业方向与目标院校，
          根据你的备考身份生成个性化学习计划。
        </p>

        <p className="text-xs text-gray-400 mb-5 uppercase tracking-wider font-medium">选择你的备考身份</p>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          <button
            onClick={() => dispatch({ type: 'SET_STUDY_MODE', payload: 'fulltime' })}
            className="group relative bg-white rounded-2xl p-7 text-left border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300"
          >
            <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1.5">脱产备考</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              在校生或已辞职，全天候备考。
              每日可投入 8-12 小时学习。
            </p>
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
              课程强度：高
            </span>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_STUDY_MODE', payload: 'working' })}
            className="group relative bg-white rounded-2xl p-7 text-left border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300"
          >
            <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1.5">在职备考</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              一边工作一边备考，时间宝贵。
              工作日 3-4 小时 + 周末集中突破。
            </p>
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
              课程强度：中
            </span>
          </button>
        </div>

        {/* Three Steps */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {[
            { num: '01', title: '水平评估', desc: '多维度能力测评' },
            { num: '02', title: '择校推荐', desc: 'AI 智能匹配院校' },
            { num: '03', title: '备考计划', desc: '个性化学习规划' },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center">
              <div className="text-center px-4">
                <div className="w-10 h-10 bg-white border-2 border-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-indigo-500">{step.num}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{step.title}</p>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="w-8 h-px bg-gray-200 mt-[-16px]" />
              )}
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'universityBrowser' })}
            className="text-sm text-gray-600 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-sm"
          >
            浏览院校信息库
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'admissionAnalysis' })}
            className="text-sm text-gray-600 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-sm"
          >
            上岸概率分析
          </button>
        </div>

        <p className="text-xs text-gray-300 mt-8">
          数据基于近三年考研招录信息，仅供参考
        </p>
      </div>
    </div>
  );
}
