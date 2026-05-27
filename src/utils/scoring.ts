import type { UserProfile, EvaluationResult, Preferences, DisciplineCategory } from '../types';

export function calculateEvaluation(
  profile: Partial<UserProfile>,
  detectedCategory: DisciplineCategory | null,
  undergradMajor?: string
): EvaluationResult {
  const prefs = profile.preferences;
  const basic = profile.basicInfo;
  const academic = profile.academicProfile;
  const skills = profile.skills;
  const sa = basic?.selfAssessment;

  // 1. 学术能力 (0-100)
  const gpaScore = calcGpaScore(basic?.gpa);
  const rankScore = calcRankScore(basic?.rank);
  const uniScore = calcUniScore(basic?.university);
  const academicScore = Math.round(gpaScore * 0.4 + rankScore * 0.2 + uniScore * 0.4);

  // 2. 数理基础 (0-100)
  const mathBasis = basic?.mathBasis;
  let mathLogicScore = 40;
  if (mathBasis) {
    mathLogicScore = Math.round(
      ((mathBasis.advancedMath || 0) * 0.4 +
        (mathBasis.linearAlgebra || 0) * 0.3 +
        (mathBasis.probability || 0) * 0.3) *
        20
    );
  }

  // 3. 编程技能 (0-100)
  const progBasis = basic?.programmingBasis;
  const skProg = skills?.programming;
  let programmingScore = 0;
  if (progBasis) {
    const basicAvg =
      ((progBasis.python || 0) * 0.3 +
        (progBasis.java || 0) * 0.15 +
        (progBasis.sql || 0) * 0.25 +
        (progBasis.r || 0) * 0.15 +
        (progBasis.cpp || 0) * 0.15);
    const basicSkill = basicAvg * 20; // 0-5 scale → 0-100
    const advSkill = skProg
      ? (((skills?.bigData?.length || 0) > 2 ? 2 : (skills?.bigData?.length || 0)) * 8 +
          ((skills?.aiMl?.length || 0) > 2 ? 2 : (skills?.aiMl?.length || 0)) * 8)
      : 0;
    const certBonus = Math.min((skills?.certificates?.length || 0) * 3, 15);
    programmingScore = Math.round(Math.min(basicSkill + advSkill + certBonus, 100));
  }

  // 4. 竞赛经历 (0-100)
  let competitionScore = 0;
  const comp = academic?.competition;
  const levelMap: Record<string, number> = {
    international: 90, national: 75, provincial: 55, school: 35, none: 10,
  };
  if (comp) {
    const baseScore = levelMap[comp.level] || 10;
    const typeBonus = Math.min((comp.types?.length || 0) * 5, 20);
    competitionScore = Math.round(Math.min(baseScore + typeBonus, 100));
  } else {
    competitionScore = 10;
  }

  // 5. 英语水平 (0-100)
  let englishScore = 0;
  const eng = basic?.english;
  if (eng) {
    switch (eng.level) {
      case 'ielts':
        englishScore = parseFloat(eng.score) >= 7 ? 95 : parseFloat(eng.score) >= 6 ? 85 : 75;
        break;
      case 'toefl':
        englishScore = parseFloat(eng.score) >= 100 ? 95 : parseFloat(eng.score) >= 85 ? 85 : 75;
        break;
      case 'cet6':
        englishScore = parseFloat(eng.score) >= 550 ? 85 : parseFloat(eng.score) >= 425 ? 75 : 65;
        break;
      case 'cet4':
        englishScore = parseFloat(eng.score) >= 550 ? 70 : parseFloat(eng.score) >= 425 ? 60 : 50;
        break;
      default:
        englishScore = 30;
    }
  }

  // 6. 项目经验 (0-100)
  const researchMap: Record<string, number> = { national: 90, provincial: 70, school: 50, none: 15 };
  const paperMap: Record<string, number> = { sci_q1q2: 95, ei: 80, chinese_core: 65, general: 45, none: 10 };
  const internshipMap: Record<string, number> = { big_tech: 85, mid_tech: 70, small_tech: 55, non_tech: 35, none: 10 };
  const researchScore = academic?.research ? researchMap[academic.research] : 15;
  const paperScore = academic?.paper ? paperMap[academic.paper] : 10;
  const internshipScore = academic?.internship ? internshipMap[academic.internship] : 10;
  const extrasBonus = Math.min((academic?.extras?.length || 0) * 4, 16);
  const projectScore = Math.round(
    researchScore * 0.35 + paperScore * 0.25 + internshipScore * 0.3 + extrasBonus * 0.1
  );

  // 7. 专业素养 (来自 SelfAssessment, 0-100)
  const profLitScore = sa ? Math.round(
    (sa.professionalLiteracy * 0.4 + sa.learningAbility * 0.3 + sa.practicalAbility * 0.3) * 20
  ) : 30;

  // 8. 科研潜力 (0-100)
  const researchPotScore = sa ? Math.round(
    (sa.researchPotential * 0.4 + sa.logicalThinking * 0.3 + sa.writingAbility * 0.3) * 20
  ) : 30;

  // 9. 综合素质 (0-100)
  const comprehensiveScore = sa ? Math.round(
    (sa.teamwork * 0.3 + sa.learningAbility * 0.3 + sa.logicalThinking * 0.2 + sa.writingAbility * 0.2) * 20
  ) : 40;

  // 性别关联调整：部分学科存在性别多样性鼓励
  const gender = basic?.gender;
  let genderBonus = 0;
  let genderNote = '';
  if (gender === 'female' && detectedCategory === 'engineering') {
    genderBonus = 2;
    genderNote = '工科领域鼓励女性参与，评估有微幅正向倾斜。';
  } else if (gender === 'female' && detectedCategory === 'science') {
    genderBonus = 1;
    genderNote = '理科领域关注性别多样性，评估有微幅正向倾斜。';
  } else if (gender === 'male' && detectedCategory === 'education') {
    genderBonus = 1;
    genderNote = '教育领域鼓励男性参与，评估有微幅正向倾斜。';
  } else if (gender === 'male' && detectedCategory === 'medical') {
    genderBonus = 1;
    genderNote = '护理等医学细分领域鼓励男性参与，评估有微幅正向倾斜。';
  }

  // 根据学科大类调整权重
  const weights = getCategoryWeights(detectedCategory, undergradMajor || basic?.major);

  // 综合评分 (0-100)
  const overall = Math.min(100, Math.round(
    academicScore * weights.academic +
    mathLogicScore * weights.mathLogic +
    programmingScore * weights.programming +
    competitionScore * weights.competition +
    englishScore * weights.english +
    projectScore * weights.project +
    profLitScore * weights.professionalLiteracy +
    researchPotScore * weights.researchPotential +
    comprehensiveScore * weights.comprehensive
  ) + genderBonus);

  const details: Record<string, string> = {
    academic: buildDetail(academicScore),
    mathLogic: buildDetail(mathLogicScore),
    programming: buildDetail(programmingScore),
    competition: buildDetail(competitionScore),
    english: buildDetail(englishScore),
    project: buildDetail(projectScore),
    professionalLiteracy: buildDetail(profLitScore),
    researchPotential: buildDetail(researchPotScore),
    comprehensive: buildDetail(comprehensiveScore),
    overall: buildDetail(overall),
  };

  // 性别多样性说明
  if (genderNote) {
    details.genderNote = genderNote;
  }

  // 偏好对齐分析
  if (prefs) {
    details.budgetAnalysis = buildBudgetAnalysis(prefs.budget);
    details.riskStrategy = buildRiskStrategy(prefs.riskTolerance, overall);
    details.mathAcceptanceNote = buildMathNote(prefs.mathAcceptance, mathLogicScore);
    details.partTimeNote = prefs.considerPartTime
      ? '你勾选了考虑非全日制，非全日制竞争压力相对较小，但社会认可度略低于全日制，建议结合职业规划权衡。'
      : '你未勾选非全日制，目标集中在全日制项目，竞争较为激烈。';
    details.preferencesAlignment = buildAlignmentSummary(prefs, overall);
  }

  return {
    academic: academicScore,
    mathLogic: mathLogicScore,
    programming: programmingScore,
    competition: competitionScore,
    english: englishScore,
    project: projectScore,
    professionalLiteracy: profLitScore,
    researchPotential: researchPotScore,
    comprehensive: comprehensiveScore,
    overall,
    details,
  };
}

type EngineeringSubCategory = 'cs_ai' | 'bio_chem_materials' | 'traditional' | 'unknown';

function detectEngineeringSubCategory(major?: string): EngineeringSubCategory {
  if (!major) return 'unknown';
  const name = major.toLowerCase();

  if (/计算机|软件|网络工程|人工智能|智能科学|数据科学|物联网|信息安|数字媒体技术/i.test(name)) {
    return 'cs_ai';
  }
  if (/生物|化学|化工|材料|冶金|高分子|制药|药学|食品|环境|轻工|纺织/i.test(name)) {
    return 'bio_chem_materials';
  }
  if (/机械|土木|建筑|电气|自动化|测控|交通|车辆|船舶|航空航天|水利|测绘|地质|矿业|石油|核工程|安全工程|能源|动力|力学/i.test(name)) {
    return 'traditional';
  }
  return 'unknown';
}

function getCategoryWeights(cat: DisciplineCategory | null, undergradMajor?: string) {
  const defaultWeights = {
    academic: 0.15, mathLogic: 0.1, programming: 0.12, competition: 0.1,
    english: 0.08, project: 0.1, professionalLiteracy: 0.12,
    researchPotential: 0.1, comprehensive: 0.13,
  };

  switch (cat) {
    case 'engineering': {
      const sub = detectEngineeringSubCategory(undergradMajor);
      if (sub === 'bio_chem_materials') {
        return {
          academic: 0.12, mathLogic: 0.1, programming: 0.08, competition: 0.08,
          english: 0.08, project: 0.14, professionalLiteracy: 0.16,
          researchPotential: 0.15, comprehensive: 0.09,
        };
      }
      if (sub === 'traditional') {
        return {
          academic: 0.12, mathLogic: 0.16, programming: 0.1, competition: 0.1,
          english: 0.06, project: 0.14, professionalLiteracy: 0.12,
          researchPotential: 0.1, comprehensive: 0.1,
        };
      }
      // cs_ai or unknown: keep current weights (math, programming heavy)
      return {
        academic: 0.1, mathLogic: 0.18, programming: 0.2, competition: 0.12,
        english: 0.06, project: 0.12, professionalLiteracy: 0.08,
        researchPotential: 0.06, comprehensive: 0.08,
      };
    }
    case 'science':
      return {
        academic: 0.12, mathLogic: 0.2, programming: 0.1, competition: 0.08,
        english: 0.08, project: 0.1, professionalLiteracy: 0.1,
        researchPotential: 0.15, comprehensive: 0.07,
      };
    case 'management':
      return {
        academic: 0.15, mathLogic: 0.08, programming: 0.08, competition: 0.08,
        english: 0.1, project: 0.1, professionalLiteracy: 0.15,
        researchPotential: 0.08, comprehensive: 0.18,
      };
    case 'economics':
      return {
        academic: 0.15, mathLogic: 0.16, programming: 0.08, competition: 0.08,
        english: 0.1, project: 0.08, professionalLiteracy: 0.12,
        researchPotential: 0.1, comprehensive: 0.13,
      };
    case 'liberalArts':
      return {
        academic: 0.12, mathLogic: 0.03, programming: 0.03, competition: 0.06,
        english: 0.14, project: 0.06, professionalLiteracy: 0.18,
        researchPotential: 0.15, comprehensive: 0.23,
      };
    case 'law':
      return {
        academic: 0.13, mathLogic: 0.05, programming: 0.02, competition: 0.05,
        english: 0.1, project: 0.05, professionalLiteracy: 0.2,
        researchPotential: 0.15, comprehensive: 0.25,
      };
    case 'education':
      return {
        academic: 0.12, mathLogic: 0.05, programming: 0.03, competition: 0.07,
        english: 0.12, project: 0.08, professionalLiteracy: 0.2,
        researchPotential: 0.15, comprehensive: 0.18,
      };
    case 'medical':
      return {
        academic: 0.15, mathLogic: 0.08, programming: 0.05, competition: 0.05,
        english: 0.1, project: 0.1, professionalLiteracy: 0.2,
        researchPotential: 0.15, comprehensive: 0.12,
      };
    case 'agriculture':
      return {
        academic: 0.12, mathLogic: 0.08, programming: 0.05, competition: 0.05,
        english: 0.08, project: 0.12, professionalLiteracy: 0.18,
        researchPotential: 0.15, comprehensive: 0.17,
      };
    default:
      return defaultWeights;
  }
}

function calcGpaScore(gpa?: string): number {
  if (!gpa) return 50;
  const v = parseFloat(gpa);
  if (isNaN(v)) return 50;
  if (v >= 4.0) return 95;
  if (v >= 3.7) return 88;
  if (v >= 3.5) return 82;
  if (v >= 3.3) return 75;
  if (v >= 3.0) return 68;
  if (v >= 2.7) return 58;
  if (v >= 2.5) return 48;
  return 35;
}

function calcRankScore(rank?: string): number {
  if (!rank) return 50;
  const v = parseFloat(rank.replace('%', ''));
  if (isNaN(v)) return 50;
  if (v <= 5) return 95;
  if (v <= 10) return 85;
  if (v <= 20) return 75;
  if (v <= 35) return 60;
  if (v <= 50) return 45;
  return 30;
}

function calcUniScore(uni?: string): number {
  if (!uni) return 40;
  if (
    uni.includes('清华') || uni.includes('北大') || uni.includes('复旦') ||
    uni.includes('上海交通大学') || uni.includes('浙大') || uni.includes('中国科学技术大学')
  )
    return 95;
  if (
    uni.includes('985') || /^(南京|武汉|华中科技|同济|南开|天津|西安交通|中国人民|北京航空|北京理工|哈尔滨工业|中山|厦门|四川|电子科技|华南理工)/.test(uni)
  )
    return 88;
  if (
    uni.includes('211') || uni.includes('北京邮电') || uni.includes('西安电子') ||
    uni.includes('上海财经') || uni.includes('中央财经') || uni.includes('对外经贸')
  )
    return 78;
  return 55;
}

function buildDetail(score: number): string {
  if (score >= 90) return '优秀——处于竞争者前列';
  if (score >= 75) return '良好——具备一定竞争力';
  if (score >= 60) return '中等——需要针对性提升';
  if (score >= 40) return '较弱——建议重点加强';
  return '薄弱——需要重点关注和提升';
}

function buildBudgetAnalysis(budget: string): string {
  switch (budget) {
    case 'lt_1w': return '预算在1万以内，建议优先选择学费较低的学硕或部属师范等免学费项目，非全日制高学费项目需谨慎考虑。';
    case '1_3w': return '预算1-3万/年，可覆盖大部分学硕和部分专硕学费，建议关注奖学金覆盖情况。';
    case '3_8w': return '预算3-8万/年，覆盖绝大多数全日制硕士项目，专硕和热门专业均可考虑。';
    case 'unlimited': return '预算充足，可自由选择各类项目，包括高学费的MBA、金融专硕等。';
    default: return '';
  }
}

function buildRiskStrategy(risk: string, overall: number): string {
  const base = overall >= 75 ? '综合实力较强' : overall >= 60 ? '综合实力中等' : '综合实力偏弱';
  switch (risk) {
    case 'aggressive':
      return `${base}，你选择了进取策略。建议冲刺:稳妥:保底按 4:4:2 配置，可多挑战高层次院校，但需做好调剂准备。`;
    case 'balanced':
      return `${base}，你选择了均衡策略。建议冲刺:稳妥:保底按 3:4:3 配置，既有冲击空间又有足够安全边际。`;
    case 'conservative':
      return `${base}，你选择了保守策略。建议冲刺:稳妥:保底按 2:3:5 配置，以稳妥上岸为首要目标。`;
    default:
      return '';
  }
}

function buildMathNote(mathAcceptance: string | undefined, mathScore: number): string {
  if (!mathAcceptance || mathAcceptance === 'no_math') {
    return '你选择不考数学，避开了数学短板，但可选专业范围会缩小，主要集中在文法哲教等领域。';
  }
  const mathLevelMap: Record<string, string> = {
    math1: '数学一（难度最高，涵盖高数、线代、概率）',
    math2: '数学二（中高难度，高数为主+线代）',
    math3: '数学三（中等难度，经管类数学）',
    '396': '396经济类联考（数学+逻辑+写作）',
    '199': '199管理类联考（初等数学+逻辑+写作）',
  };
  const mathDesc = mathLevelMap[mathAcceptance] || mathAcceptance;
  if (mathScore >= 75) {
    return `你选择了${mathDesc}，且数理基础评分较高（${mathScore}分），数学是你的优势项。`;
  } else if (mathScore >= 50) {
    return `你选择了${mathDesc}，数理基础评分${mathScore}分，建议在备考中重点强化数学训练。`;
  } else {
    return `你选择了${mathDesc}，但数理基础评分较低（${mathScore}分），建议尽早开始数学复习并考虑报辅导班。`;
  }
}

function buildAlignmentSummary(prefs: Preferences, overall: number): string {
  const parts: string[] = [];
  const tierMap: Record<string, string> = {
    '985': '985院校', '211': '211院校', '双一流': '双一流院校', '双非': '双非院校',
  };
  if (prefs.tiers?.length) {
    const tierLabels = prefs.tiers.map(t => tierMap[t] || t).join('、');
    parts.push(`目标院校层次为${tierLabels}`);
  }
  if (prefs.regions?.length) {
    parts.push(`意向地区：${prefs.regions.join('、')}`);
  }
  const degreeMap: Record<string, string> = { academic: '学硕', professional: '专硕', both: '学硕+专硕' };
  parts.push(`学位类型偏好：${degreeMap[prefs.degreeType] || prefs.degreeType}`);
  parts.push(`综合评分：${overall}分`);
  return parts.join('；') + '。请结合下方各维度分析综合判断目标院校。';
}
