import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AppState, AppStep, StudyMode, UserProfile, DisciplineCategory } from '../types';
import { calculateEvaluation } from '../utils/scoring';
import { getMajorRecommendations } from '../utils/majorRecommendation';
import { getUniversityRecommendations } from '../utils/recommendation';
import { generateStudyPlan } from '../utils/studyPlanGenerator';
import { detectMajorCategory } from '../data/majors';

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
      // 根据本科专业检测所属大类
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

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

const AppCtx = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
