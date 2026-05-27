import { AppProvider, useAppState } from './context/AppContext';
import StepIndicator from './components/StepIndicator';
import HomePage from './components/HomePage';
import BasicInfo from './components/BasicInfo';
import AcademicProfile from './components/AcademicProfile';
import SkillsCert from './components/SkillsCert';
import Preferences from './components/Preferences';
import MajorRecommendation from './components/MajorRecommendation';
import Results from './components/Results';
import StudyPlan from './components/StudyPlan';
import UniversityBrowser from './components/UniversityBrowser';
import AdmissionAnalysis from './components/AdmissionAnalysis';

function AppContent() {
  const { state, dispatch, savedAt } = useAppState();

  const showSteps = !['home', 'majorRecommendation', 'results', 'studyPlan', 'universityBrowser', 'admissionAnalysis'].includes(state.step);

  const goHome = () => dispatch({ type: 'SET_STEP', payload: 'home' });

  if (state.step === 'home') {
    return <HomePage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/85 backdrop-blur-md pt-4 -mt-4 pb-3 mb-4 border-b border-gray-100 flex items-center justify-between">
          <h1
            className="text-xl font-extrabold text-gray-800 cursor-pointer tracking-tight select-none"
            onClick={goHome}
          >
            考研<strong className="text-indigo-600">不难</strong>
          </h1>
          {state.studyMode && (
            <div className="flex items-center gap-2">
              {savedAt && (
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  已保存
                </span>
              )}
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                state.studyMode === 'fulltime'
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  : 'bg-orange-50 text-orange-600 border border-orange-100'
              }`}>
                {state.studyMode === 'fulltime' ? '脱产备考' : '在职备考'}
              </span>
            </div>
          )}
        </div>

        {showSteps && <StepIndicator current={state.step} />}

        {state.step === 'basicInfo' && <BasicInfo />}
        {state.step === 'academicProfile' && <AcademicProfile />}
        {state.step === 'skills' && <SkillsCert />}
        {state.step === 'preferences' && <Preferences />}
        {state.step === 'majorRecommendation' && <MajorRecommendation />}
        {state.step === 'results' && <Results />}
        {state.step === 'studyPlan' && <StudyPlan />}
        {state.step === 'universityBrowser' && <UniversityBrowser />}
        {state.step === 'admissionAnalysis' && <AdmissionAnalysis />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
