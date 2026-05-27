import type { EvaluationResult, University, Major, StudyMode } from '../types';

export interface AdmissionResult {
  university: University;
  major: Major;
  mode: StudyMode;
  probability: number;
  probabilityLabel: string;
  competitiveScore: number;
  targetScore: number;
  scoreGap: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  dailyHours: number;
  totalMonths: number;
  keySubjects: { subject: string; allocation: number; tips: string }[];
}

export function calculateAdmission(
  university: University,
  major: Major,
  evaluation: EvaluationResult,
  mode: StudyMode
): AdmissionResult {
  const admissionScore = university.admissionScore[major.id] || 50;
  const userScore = evaluation.overall;
  const scoreGap = admissionScore - userScore;

  // 基础概率由分数差距决定
  let baseProb: number;
  if (scoreGap <= -20) baseProb = 92;
  else if (scoreGap <= -10) baseProb = 82;
  else if (scoreGap <= -5) baseProb = 72;
  else if (scoreGap <= 0) baseProb = 62;
  else if (scoreGap <= 5) baseProb = 52;
  else if (scoreGap <= 10) baseProb = 42;
  else if (scoreGap <= 15) baseProb = 32;
  else if (scoreGap <= 20) baseProb = 22;
  else baseProb = 12;

  // 院校档次修正
  if (university.tier === '985') baseProb -= 5;
  else if (university.tier === '211') baseProb -= 2;
  else if (university.tier === '双非') baseProb += 3;

  // 学科评估修正
  const ranking = university.subjectRankings[major.id];
  if (ranking === 'A+' || ranking === 'A') baseProb -= 5;
  else if (ranking === 'A-') baseProb -= 3;
  else if (ranking === 'B+' || ranking === 'B') baseProb -= 1;
  else if (!ranking || ranking === '未参评' || ranking.startsWith('D')) baseProb += 2;

  // 在职/脱产修正
  if (mode === 'fulltime') baseProb += 5;
  else baseProb -= 3;

  // 大城市竞争加剧
  if (['北京', '上海', '深圳', '杭州'].includes(university.city)) baseProb -= 3;

  const probability = Math.max(5, Math.min(95, Math.round(baseProb)));

  // 目标分数
  const baseLine = 250 + admissionScore * 1.2;
  const targetScore = Math.round(baseLine / 5) * 5;

  // 优劣势分析
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (evaluation.mathLogic >= 75) strengths.push('数学基础扎实，应试有优势');
  else if (evaluation.mathLogic < 50 && major.examSubjects.math !== '不考数学') weaknesses.push('数学基础偏弱，需重点加强');

  if (evaluation.english >= 70) strengths.push('英语水平较好，可以节省时间给其他科目');
  else if (evaluation.english < 50) weaknesses.push('英语需要额外投入时间提升');

  if (evaluation.programming >= 70 && major.techLevel >= 3) strengths.push('编程能力强，专业课复习有优势');
  else if (evaluation.programming < 40 && major.techLevel >= 4) weaknesses.push('技术类专业需要强化编程能力');

  if (evaluation.professionalLiteracy >= 70) strengths.push('专业素养扎实，备考效率高');
  if (evaluation.researchPotential >= 70 && major.crossExamDifficulty <= 3) strengths.push('科研潜力好，复试有加分空间');

  if (major.competitionHeat >= 4) weaknesses.push('该专业竞争激烈，需要高分才有把握');
  if (major.crossExamDifficulty >= 4 && evaluation.professionalLiteracy < 60) weaknesses.push('跨考难度大，专业基础需要系统补课');

  // 备考建议
  const suggestions: string[] = [];
  if (probability >= 70) {
    suggestions.push('按正常节奏备考，重点保持各科均衡');
    suggestions.push('可把该校作为主要目标之一');
  } else if (probability >= 50) {
    suggestions.push('需要比平均水平更用功，建议适当延长每日学习时间');
    if (mode === 'working') suggestions.push('在职备考建议利用周末集中突破薄弱科目');
    suggestions.push('建议准备1-2所备选院校');
  } else {
    suggestions.push('差距较大，建议作为冲刺目标');
    suggestions.push('需要非常规的努力，建议每日学习时间达到该模式上限');
    suggestions.push('强烈建议准备稳妥档和保底档院校');
  }

  if (major.examSubjects.math.includes('不考')) {
    suggestions.push('不考数学，需在专业课上投入双倍精力');
  }

  // 每日学习时间
  const dailyHours = mode === 'fulltime' ? 10 : 5;

  // 备考周期
  const totalMonths = probability >= 70 ? (mode === 'fulltime' ? 6 : 8) : probability >= 50 ? (mode === 'fulltime' ? 8 : 10) : (mode === 'fulltime' ? 10 : 12);

  // 科目分配
  const keySubjects: { subject: string; allocation: number; tips: string }[] = [];
  const hasMath = !major.examSubjects.math.includes('不考');

  if (hasMath) {
    keySubjects.push({
      subject: '数学',
      allocation: 30,
      tips: '高数→线代→概率按顺序复习，660/880/1000题选一本刷透',
    });
  }
  keySubjects.push({
    subject: '专业课',
    allocation: hasMath ? 30 : 40,
    tips: '以目标院校指定教材为准，真题是最高效的复习资料',
  });
  keySubjects.push({
    subject: '英语',
    allocation: 25,
    tips: '词汇+长难句基础打牢，阅读真题反复刷，作文模板考前背诵',
  });
  keySubjects.push({
    subject: '政治',
    allocation: hasMath ? 15 : 20,
    tips: '暑假开始即可，肖四肖八是考前最重要的资料',
  });

  return {
    university,
    major,
    mode,
    probability,
    probabilityLabel: getProbLabel(probability),
    competitiveScore: userScore,
    targetScore,
    scoreGap,
    strengths,
    weaknesses,
    suggestions,
    dailyHours,
    totalMonths,
    keySubjects,
  };
}

function getProbLabel(prob: number): string {
  if (prob >= 85) return '极高概率上岸';
  if (prob >= 70) return '高概率上岸';
  if (prob >= 55) return '较大概率上岸';
  if (prob >= 40) return '中等概率，需努力';
  if (prob >= 25) return '有挑战，需全力备考';
  return '难度较大，冲刺目标';
}
