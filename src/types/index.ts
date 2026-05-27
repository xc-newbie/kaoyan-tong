// ========== 用户身份 ==========
export type StudyMode = 'fulltime' | 'working';

export type Gender = 'male' | 'female';

export type Grade = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'employed';

export type EnglishLevel = 'cet4' | 'cet6' | 'ielts' | 'toefl' | 'none';

export type CompetitionLevel = 'international' | 'national' | 'provincial' | 'school' | 'none';

export type InternshipType = 'big_tech' | 'mid_tech' | 'small_tech' | 'non_tech' | 'none';

export type PaperLevel = 'sci_q1q2' | 'ei' | 'chinese_core' | 'general' | 'none';

export type ResearchLevel = 'national' | 'provincial' | 'school' | 'none';

export type MathAcceptance = 'math1' | 'math2' | 'math3' | '396' | '199' | 'no_math';

export type DegreeType = 'academic' | 'professional' | 'both';

export type Tier = '985' | '211' | '双一流' | '双非' | '专科';

export type Budget = 'lt_1w' | '1_3w' | '3_8w' | 'unlimited';

export type RiskTolerance = 'aggressive' | 'balanced' | 'conservative';

export type RecomTier = 'reach' | 'match' | 'safety';

// 学科大类
export type DisciplineCategory =
  | 'management' | 'economics' | 'engineering' | 'science'
  | 'liberalArts' | 'law' | 'education' | 'medical' | 'agriculture' | 'unknown';

// ========== 用户表单数据 ==========
export interface UserProfile {
  studyMode: StudyMode;
  basicInfo: BasicInfo;
  academicProfile: AcademicProfile;
  skills: Skills;
  preferences: Preferences;
}

export interface BasicInfo {
  name: string;
  gender: Gender | '';
  university: string;
  major: string;
  grade: Grade | '';
  gpa: string;
  rank: string;
  targetMajors: string[];
  english: { level: EnglishLevel; score: string };
  // 数学基础自评 0-5 (0=零基础, 5=精通)
  mathBasis: { advancedMath: number; linearAlgebra: number; probability: number };
  // 编程基础自评 0-5 (0=零基础, 5=精通)
  programmingBasis: { python: number; r: number; sql: number; java: number; cpp: number };
  // 新增自评维度 0-5
  selfAssessment: SelfAssessment;
}

// 扩展自评维度
export interface SelfAssessment {
  // 专业基础素养 0-5
  professionalLiteracy: number;
  // 科研潜力 0-5
  researchPotential: number;
  // 学习能力 0-5
  learningAbility: number;
  // 逻辑思维能力 0-5
  logicalThinking: number;
  // 写作表达能力 0-5
  writingAbility: number;
  // 实验/动手能力 0-5
  practicalAbility: number;
  // 团队协作能力 0-5
  teamwork: number;
}

export interface AcademicProfile {
  research: ResearchLevel;
  paper: PaperLevel;
  competition: { level: CompetitionLevel; types: string[] };
  internship: InternshipType;
  extras: string[];
}

export interface Skills {
  programming: { python: number; r: number; sql: number; java: number; scala: number };
  bigData: string[];
  aiMl: string[];
  visualization: string[];
  certificates: string[];
}

export interface Preferences {
  regions: string[];
  tiers: Tier[];
  degreeType: DegreeType;
  mathAcceptance: MathAcceptance;
  budget: Budget;
  riskTolerance: RiskTolerance;
  considerPartTime: boolean;
}

// ========== 评分结果 ==========
export interface EvaluationResult {
  academic: number;
  mathLogic: number;
  programming: number;
  competition: number;
  english: number;
  project: number;
  // 新增维度
  professionalLiteracy: number;
  researchPotential: number;
  comprehensive: number;
  overall: number;
  details: Record<string, string>;
}

// ========== 专业 ==========
export interface Major {
  id: string;
  name: string;
  code: string;
  category: string;
  degreeType: DegreeType;
  description: string;
  directions: string[];
  examSubjects: { politics: string; english: string; math: string; '专业课': string };
  careerProspects: string;
  suitableFor: string;
  techLevel: number;
  crossExamDifficulty: number;
  competitionHeat: number;
  nationalLine2024: string;
  nationalLine2025: string;
  tags: string[];
}

// ========== 院校 ==========
export interface University {
  id: string;
  name: string;
  shortName: string;
  region: string;
  city: string;
  tier: Tier;
  majorIds: string[];
  subjectRankings: Record<string, string>;
  admissionScore: Record<string, number>;
  features: string[];
  is985: boolean;
  is211: boolean;
  isDoubleFirst: boolean;
}

// ========== 院校-专业详细数据 ==========
export interface ProgramDetail {
  /** 报录比，如 "8:1" */
  reportRatio: string;
  /** 2025复试分数线 */
  reexamScore2025: number;
  /** 2024复试分数线 */
  reexamScore2024: number;
  /** 2025录取最低分 */
  admitScore2025: number;
  /** 2025计划招生人数（统考） */
  plannedEnrollment2025: number;
  /** 2025实际招生人数 */
  actualEnrollment2025: number;
  /** 推免人数 */
  recommendedEnrollment2025: number;
  /** 总学费（万元），学硕通常0.8，专硕视项目 */
  tuitionWan: string;
  /** 学制（年） */
  durationYears: number;
  /** 是否接受同等学力 */
  acceptEquivalent: boolean;
  /** 对本科院校有无限制 */
  undergradRestriction: string;
  /** 是否保护第一志愿 */
  protectFirstChoice: boolean;
  /** 复试占比（%） */
  reexamWeight: number;
  /** 初试科目 */
  examNotes?: string;
  /** 备注 */
  remarks?: string;
}

// ========== 院校推荐结果 ==========
export interface UniversityRecommendation {
  university: University;
  majorId: string;
  tier: RecomTier;
  matchRate: number;
  difficultyScore: number;
  reason: string;
  pastScores: { year: number; score: number }[];
  reportRatio: string;
  /** 详细数据（有则展示） */
  programDetail?: ProgramDetail;
}

// ========== 专业推荐结果 ==========
export interface MajorRecommendation {
  major: Major;
  matchRate: number;
  reasons: string[];
}

// ========== 工作时间安排 ==========
export interface WorkSchedule {
  workStartTime: string;
  workEndTime: string;
  commuteMinutes: number;
  studyStartTime: string;
  studyEndTime: string;
  hasWeekendObligations: boolean;
  weekendAvailableStart?: string;
  weekendAvailableEnd?: string;
}

// ========== 学习计划 ==========
export interface StudyPlan {
  mode: StudyMode;
  totalDays: number;
  phases: StudyPhase[];
  dailySchedule: DailySchedule;
  milestones: Milestone[];
  subjectAllocation: SubjectAllocation;
}

export interface StudyPhase {
  name: string;
  description: string;
  startDay: number;
  endDay: number;
  goal: string;
  tasks: SubjectTask[];
  checkpoints: string[];
}

export interface SubjectTask {
  subject: string;
  items: string[];
}

export interface DailySchedule {
  weekday?: TimeSlot[];
  weekend?: TimeSlot[];
  fulltime?: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  activity: string;
  detail: string;
}

export interface Milestone {
  day: number;
  date: string;
  title: string;
  description: string;
}

export interface SubjectAllocation {
  math: number;
  '专业课': number;
  english: number;
  politics: number;
}

// ========== 院校列表（模糊搜索用）==========
export interface UniversityEntry {
  name: string;
  province: string;
  city: string;
  tier: Tier;
}

// ========== 表单验证 ==========
export interface ValidationErrors {
  [key: string]: string;
}

// ========== App 状态 ==========
export type AppStep = 'home' | 'basicInfo' | 'academicProfile' | 'skills' | 'preferences' | 'majorRecommendation' | 'results' | 'studyPlan' | 'universityBrowser' | 'admissionAnalysis';

export interface AppState {
  step: AppStep;
  studyMode: StudyMode | null;
  userProfile: Partial<UserProfile>;
  evaluation: EvaluationResult | null;
  majorRecommendations: MajorRecommendation[];
  universityRecommendations: UniversityRecommendation[];
  selectedMajorIds: string[];
  studyPlan: StudyPlan | null;
  // 新增：检测到的本科专业大类
  detectedCategory: DisciplineCategory | null;
}

// 初始自评默认值
export const defaultSelfAssessment: SelfAssessment = {
  professionalLiteracy: 1,
  researchPotential: 1,
  learningAbility: 2,
  logicalThinking: 2,
  writingAbility: 1,
  practicalAbility: 1,
  teamwork: 2,
};
