import type { University, ProgramDetail, Major } from '../types';
import { majors } from '../data/majors';
import { getProgramDetail } from '../data/programDetails';

/** 检测大学类型 */
export function getUniversityType(uni: University): string {
  const n = uni.name + uni.shortName + (uni.features || []).join(' ');
  if (/综合|师范|民族/.test(n)) return '综合';
  if (/理工|工业|科技|工程|交通|邮电|航空|航天|船舶|海洋|石油|地质|矿业|电力|水利|化工|建筑|土木|国防/.test(n)) return '理工';
  if (/医|药|中医|中药|医科/.test(n)) return '医学';
  if (/农林|农业|林业|森林|水产|海洋大学/.test(n)) return '农林';
  if (/财经|经济|工商|商业|贸易/.test(n)) return '财经';
  if (/政法|法学|公安|警察|刑事/.test(n)) return '政法';
  if (/外语|外国语|语言|翻译/.test(n)) return '语言';
  if (/艺术|美术|音乐|舞蹈|戏剧|电影|戏曲|传媒/.test(n)) return '艺术';
  if (/体育|运动/.test(n)) return '体育';
  return '综合';
}

/** 根据大学类型返回其优势学科门类 */
function getCategoryStrengths(uniType: string, uni: University): Record<string, number> {
  const base: Record<string, number> = {};
  const t = uni.tier;
  const tierMult = t === '985' ? 1.3 : t === '211' ? 1.15 : t === '双一流' ? 1.05 : 0.85;

  switch (uniType) {
    case '综合':
      base['哲学'] = 0.9; base['经济学'] = 0.9; base['法学'] = 0.9; base['教育学'] = 0.9;
      base['文学'] = 0.95; base['历史学'] = 0.9; base['理学'] = 0.95; base['工学'] = 0.8;
      base['管理学'] = 0.9; base['医学'] = 0.7; base['农学'] = 0.5; base['艺术学'] = 0.7;
      break;
    case '理工':
      base['工学'] = 1.0; base['理学'] = 0.9; base['管理学'] = 0.7; base['经济学'] = 0.5;
      break;
    case '医学':
      base['医学'] = 1.0; base['理学'] = 0.7; base['工学'] = 0.4; base['管理学'] = 0.4;
      break;
    case '农林':
      base['农学'] = 1.0; base['理学'] = 0.8; base['工学'] = 0.5; base['管理学'] = 0.5; base['医学'] = 0.4;
      break;
    case '财经':
      base['经济学'] = 1.0; base['管理学'] = 0.95; base['法学'] = 0.6; base['文学'] = 0.5;
      break;
    case '政法':
      base['法学'] = 1.0; base['管理学'] = 0.6; base['文学'] = 0.5; base['教育学'] = 0.4;
      break;
    case '语言':
      base['文学'] = 1.0; base['教育学'] = 0.7; base['法学'] = 0.5; base['管理学'] = 0.4;
      break;
    case '艺术':
      base['艺术学'] = 1.0; base['文学'] = 0.5; base['教育学'] = 0.4;
      break;
    case '体育':
      base['教育学'] = 1.0; base['管理学'] = 0.3;
      break;
  }

  // Apply tier multiplier
  const result: Record<string, number> = {};
  for (const [k, v] of Object.entries(base)) {
    result[k] = Math.round(v * tierMult * 100) / 100;
  }
  return result;
}

/** 为大学智能分配专业ID列表 */
export function assignMajorIds(uni: University): string[] {
  const uniType = getUniversityType(uni);
  const strengths = getCategoryStrengths(uniType, uni);
  const existingIds = new Set(uni.majorIds || []);

  const ids: string[] = [...existingIds];

  for (const major of majors) {
    if (existingIds.has(major.id)) continue;
    const catStrength = strengths[major.category] ?? 0.3;
    if (catStrength >= 0.5) {
      ids.push(major.id);
    }
  }

  return ids;
}

/** 估算某专业在某大学的招生难度(0-100) */
export function estimateDifficulty(uni: University, major: Major): number {
  const tierBase: Record<string, number> = {
    '985': 82, '211': 72, '双一流': 65, '双非': 50, '专科': 30,
  };
  let score = tierBase[uni.tier] || 55;

  // 该专业在大学的学科评估越高，难度越大
  const ranking = uni.subjectRankings?.[major.id];
  if (ranking) {
    if (ranking.startsWith('A+')) score += 12;
    else if (ranking.startsWith('A')) score += 10;
    else if (ranking.startsWith('A-')) score += 8;
    else if (ranking.startsWith('B+')) score += 6;
    else if (ranking.startsWith('B')) score += 4;
    else if (ranking.startsWith('B-')) score += 2;
  }

  // 专业热度加成
  if (major.competitionHeat >= 5) score += 8;
  else if (major.competitionHeat >= 4) score += 5;
  else if (major.competitionHeat >= 3) score += 2;

  // 985大学所有专业都偏难
  if (uni.tier === '985') score += 3;
  if (uni.is985 && major.category === '工学') score += 3;

  return Math.min(100, Math.max(15, score));
}

/** 估算报录比字符串 */
function estimateReportRatioStr(uni: University, major: Major): string {
  const diff = estimateDifficulty(uni, major);
  if (diff >= 92) return '25:1~40:1';
  if (diff >= 87) return '15:1~25:1';
  if (diff >= 82) return '10:1~18:1';
  if (diff >= 78) return '8:1~14:1';
  if (diff >= 72) return '6:1~10:1';
  if (diff >= 65) return '4:1~7:1';
  if (diff >= 55) return '3:1~5:1';
  return '2:1~4:1';
}

/** 估算复试分数线 */
function estimateReexamScore(uni: University, major: Major, yearOffset: number): number {
  // 根据国家线类型确定基础分
  const nl = major.nationalLine2026 || '';
  let baseScore = 280;
  const nlMatch = nl.match(/(\d{3})/);
  if (nlMatch) {
    baseScore = parseInt(nlMatch[1]) + 15;
  }

  // 学校档次加成
  const tierBonus = uni.tier === '985' ? 40 : uni.tier === '211' ? 20 : uni.tier === '双一流' ? 10 : -10;

  // 专业热度加成
  const heatBonus = major.competitionHeat >= 5 ? 25 : major.competitionHeat >= 4 ? 15 : major.competitionHeat >= 3 ? 8 : 0;

  const score = baseScore + tierBonus + heatBonus + (yearOffset * (Math.random() > 0.5 ? 3 : -3));
  return Math.round(Math.max(250, score));
}

/** 生成或获取专业详细考研数据 */
export function getOrGenerateProgramDetail(uni: University, majorId: string): ProgramDetail {
  const major = majors.find(m => m.id === majorId);
  if (!major) {
    return generateDefaultDetail(uni);
  }

  // 先查手写数据库
  const cached = getProgramDetail(uni.id, majorId);
  if (cached) return cached;

  return generateProgramDetail(uni, major);
}

function generateDefaultDetail(uni: University): ProgramDetail {
  return {
    reportRatio: '5:1~10:1',
    reexamScore2026: 300,
    reexamScore2025: 295,
    admitScore2026: 310,
    plannedEnrollment2026: 20,
    actualEnrollment2026: 22,
    recommendedEnrollment2026: 8,
    tuitionWan: uni.tier === '985' ? '2.4万/全程' : '3万/全程',
    durationYears: 3,
    acceptEquivalent: uni.tier !== '985',
    undergradRestriction: uni.tier === '985' ? '偏好985/211' : '无限制',
    protectFirstChoice: true,
    reexamWeight: 35,
  };
}

function generateProgramDetail(uni: University, major: Major): ProgramDetail {
  const isProfessional = major.degreeType === 'professional';
  const is985 = uni.tier === '985';
  const is211 = uni.tier === '211';

  // 学硕 vs 专硕
  const durationYears = isProfessional ? 2 : 3;

  // 学费
  let tuitionWan: string;
  if (major.id === '1251') tuitionWan = is985 ? '20~40万/全程' : '8~20万/全程'; // MBA贵
  else if (major.id === '1253') tuitionWan = is985 ? '10~16万/全程' : is211 ? '6~10万/全程' : '4~8万/全程';
  else if (isProfessional && major.category === '经济学') tuitionWan = is985 ? '8~15万/全程' : '4~8万/全程';
  else if (isProfessional) tuitionWan = is985 ? '3~6万/全程' : '2~5万/全程';
  else tuitionWan = '2.4万/全程'; // 学硕8000/年×3

  // 招生人数
  const baseEnroll = isProfessional ? 30 : 15;
  const enrollVar = is985 ? -5 : is211 ? 0 : 10;
  const planned = Math.max(3, baseEnroll + enrollVar + Math.floor(Math.random() * 10));
  const actual = planned + Math.floor(Math.random() * 5);
  const recommended = Math.floor(planned * (is985 ? 0.5 : is211 ? 0.35 : 0.2));

  // 本科限制
  let undergradRestriction: string;
  if (major.category === '医学') undergradRestriction = '要求医学本科背景，非医学不得跨考';
  else if (major.id === '0301') undergradRestriction = is985 ? '偏好985/211法本，非法本建议考法硕(非法学)' : '无限制';
  else if (is985 && major.competitionHeat >= 5) undergradRestriction = '偏好985/211，双非极难';
  else if (is985) undergradRestriction = '偏好985/211';
  else undergradRestriction = '无限制';

  return {
    reportRatio: estimateReportRatioStr(uni, major),
    reexamScore2026: estimateReexamScore(uni, major, 0),
    reexamScore2025: estimateReexamScore(uni, major, -1),
    admitScore2026: estimateReexamScore(uni, major, 0) + Math.floor(Math.random() * 15) + 3,
    plannedEnrollment2026: planned,
    actualEnrollment2026: actual,
    recommendedEnrollment2026: recommended,
    tuitionWan,
    durationYears,
    acceptEquivalent: uni.tier !== '985',
    undergradRestriction,
    protectFirstChoice: !['985', '211'].includes(uni.tier) || Math.random() > 0.2,
    reexamWeight: is985 ? 35 + Math.floor(Math.random() * 15) : 30 + Math.floor(Math.random() * 10),
    examNotes: major.examSubjects ? `${major.examSubjects.math} | ${major.examSubjects['专业课']}` : undefined,
    remarks: getAutoRemarks(uni, major),
  };
}

function getAutoRemarks(uni: University, major: Major): string | undefined {
  const ranking = uni.subjectRankings?.[major.id];
  const is985 = uni.tier === '985';
  const is211 = uni.tier === '211';

  if (ranking && ranking.startsWith('A')) {
    return `${uni.shortName}${major.name}学科评估${ranking}，全国领先。${is985 ? '竞争激烈，需充分准备。' : '性价比高，值得冲刺。'}`;
  }
  if (is985) {
    return `${uni.shortName}作为985院校，${major.name}专业录取难度较大，建议提前联系导师了解具体情况。`;
  }
  if (is211 && major.competitionHeat >= 4) {
    return `${uni.shortName}虽是211，但${major.name}方向竞争也比较激烈，建议参考近3年复试线制定目标。`;
  }
  return `${uni.shortName}${major.name}方向报考热度适中，是性价比较高的选择。建议关注该校招生简章了解确切信息。`;
}

/** 为批量院校生成 majorIds（不修改原对象） */
export function enrichUniversityMajorIds(uni: University): string[] {
  const type = getUniversityType(uni);
  const strengths = getCategoryStrengths(type, uni);

  const ids = new Set(uni.majorIds || []);
  for (const major of majors) {
    const s = strengths[major.category] ?? 0.2;
    if (s >= 0.45) ids.add(major.id);
  }

  return [...ids];
}
