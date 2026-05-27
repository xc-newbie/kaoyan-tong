import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppStep, StudyMode, UserProfile, DisciplineCategory } from '../types';
import { calculateEvaluation } from '../utils/scoring';
import { getMajorRecommendations } from '../utils/majorRecommendation';
import { getUniversityRecommendations } from '../utils/recommendation';
import { generateStudyPlan } from '../utils/studyPlanGenerator';
import { detectMajorCategory } from '../data/majors';

const STORAGE_KEY = 'kaoyan-tong-state';

function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as AppState;
  } catch {
    return null;
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, _savedAt: Date.now() }));
  } catch { /* quota exceeded or private browsing */ }
}

type Action =
  | { type: 'SET_STUDY_MODE'; payload: StudyMode }
  | { type: 'SET_STEP'; payload: AppStep }
  | { type: 'UPDATE_BASIC_INFO'; payload: UserProfile['basicInfo'] }
  | { type: 'UPDATE_ACADEMIC_PROFILE'; payload: UserProfile['academicProfile'] }
  | { type: 'UPDATE_SKILLS'; payload: UserProfile['skills'] }
  | { type: 'UPDATE_PREFERENCES'; payload: UserProfile['preferences'] }
  | { type: 'GENERATE_EVALUATION' }
  | { type: 'SELECT_MAJORS'; payload: string[] }
  | { type: 'GENERATE_STUDY_PLAN'; payload: { startDate: string; mathAcceptance: string | undefined; hasProfCourse: boolean; workSchedule?: import('../types').WorkSchedule } }
  | { type: 'RESET' };

const initialState: AppState = {
  step: 'home',
  studyMode: null,
  userProfile: {},
  evaluation: null,
  majorRecommendations: [],
  universityRecommendations: [],
  selectedMajorIds: [],
  studyPlan: null,
  detectedCategory: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_STUDY_MODE':
      return { ...state, studyMode: action.payload, step: 'basicInfo' };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'UPDATE_BASIC_INFO': {
      const category = detectMajorCategory(action.payload.major) as DisciplineCategory | null;
      return {
        ...state,
        userProfile: { ...state.userProfile, basicInfo: action.payload },
        detectedCategory: category,
      };
    }

    case 'UPDATE_ACADEMIC_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, academicProfile: action.payload },
      };

    case 'UPDATE_SKILLS':
      return {
        ...state,
        userProfile: { ...state.userProfile, skills: action.payload },
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userProfile: { ...state.userProfile, preferences: action.payload },
      };

    case 'GENERATE_EVALUATION': {
      const profile: Partial<UserProfile> = {
        ...state.userProfile,
        studyMode: state.studyMode!,
      };
      const evaluation = calculateEvaluation(profile, state.detectedCategory, profile.basicInfo?.major);
      const majorRecommendations = getMajorRecommendations(profile, state.detectedCategory);
      return { ...state, evaluation, majorRecommendations, step: 'majorRecommendation' };
    }

    case 'SELECT_MAJORS': {
      const profile: Partial<UserProfile> = {
        ...state.userProfile,
        studyMode: state.studyMode!,
      };
      const universityRecommendations = getUniversityRecommendations(
        profile,
        state.evaluation?.overall || 50,
        action.payload
      );
      return {
        ...state,
        selectedMajorIds: action.payload,
        universityRecommendations,
        step: 'results',
      };
    }

    case 'GENERATE_STUDY_PLAN': {
      const studyPlan = generateStudyPlan(
        state.studyMode!,
        action.payload.startDate,
        action.payload.mathAcceptance as import('../types').MathAcceptance | undefined,
        action.payload.hasProfCourse,
        action.payload.workSchedule
      );
      return { ...state, studyPlan, step: 'studyPlan' };
    }

    case 'RESET': {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return initialState;
    }

    default:
      return state;
  }
}

function reducerWithPersist(state: AppState, action: Action): AppState {
  const newState = reducer(state, action);
  if (newState !== state) {
    saveState(newState);
  }
  return newState;
}

const AppCtx = createContext<{ state: AppState; dispatch: React.Dispatch<Action>; savedAt: number | null } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducerWithPersist, null, () => loadState() || initialState);
  const savedAt = (state as any)._savedAt ?? null;

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.step && parsed.step !== state.step) {
            // State changed in another tab — reload to avoid conflicts
            window.location.reload();
          }
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [state.step]);

  return <AppCtx.Provider value={{ state, dispatch, savedAt }}>{children}</AppCtx.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
