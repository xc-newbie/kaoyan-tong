import type { UserProfile, UniversityRecommendation, RecomTier } from '../types';
import { universities } from '../data/universities';
import { majors } from '../data/majors';
import { getProgramDetail } from '../data/programDetails';

export function getUniversityRecommendations(
  profile: Partial<UserProfile>,
  overallScore: number,
  selectedMajorIds: string[]
): UniversityRecommendation[] {
  if (!selectedMajorIds.length) return [];

  const results: UniversityRecommendation[] = [];

  for (const majorId of selectedMajorIds) {
    const candidateUnis = universities.filter((u) => u.majorIds.includes(majorId));

    for (const uni of candidateUnis) {
      const diffScore = uni.admissionScore[majorId] || 50;
      const delta = overallScore - diffScore;

      let tier: RecomTier;
      if (delta <= -15) tier = 'reach';
      else if (delta >= 15) tier = 'safety';
      else tier = 'match';

      // 偏好过滤
      const prefs = profile.preferences;
      if (prefs?.tiers?.length && !prefs.tiers.includes(uni.tier)) continue;
      if (prefs?.regions?.length) {
        const regionMatch = prefs.regions.some(
          (r) => uni.region === r || uni.city.includes(r) || uni.name.includes(r)
        );
        if (!regionMatch) continue;
      }

      const matchRate = Math.min(98, Math.max(30, Math.round(100 - Math.abs(delta) * 2.5)));
      const subjectRanking = uni.subjectRankings[majorId] || '未参评';
      const major = majors.find((m) => m.id === majorId);

      const reason = buildReason(uni, major, tier, delta, subjectRanking);

      // 模拟近三年复试线
      const baseScore = 250 + diffScore * 1.2;
      const pastScores = [
        { year: 2025, score: Math.round(baseScore + Math.random() * 15 - 5) },
        { year: 2024, score: Math.round(baseScore + Math.random() * 15 - 10) },
        { year: 2023, score: Math.round(baseScore + Math.random() * 15 - 8) },
      ];

      results.push({
        university: uni,
        majorId,
        tier,
        matchRate,
        difficultyScore: diffScore,
        reason,
        pastScores,
        reportRatio: estimateReportRatio(diffScore),
        programDetail: getProgramDetail(uni.id, majorId),
      });
    }
  }

  // 分组排序：每个分档内按匹配度降序
  results.sort((a, b) => b.matchRate - a.matchRate);

  const reach = results.filter((r) => r.tier === 'reach').slice(0, 3);
  const match = results.filter((r) => r.tier === 'match').slice(0, 4);
  const safety = results.filter((r) => r.tier === 'safety').slice(0, 3);

  return [...reach, ...match, ...safety];
}

function buildReason(
  uni: (typeof universities)[number],
  major: (typeof majors)[number] | undefined,
  tier: RecomTier,
  _delta: number,
  ranking: string
): string {
  const parts: string[] = [];

  parts.push(
    `${uni.shortName}${uni.tier}院校` +
      (ranking !== '未参评' ? `，该专业学科评估 ${ranking}` : '')
  );

  if (major) {
    if (major.techLevel >= 4 && uni.features.some((f) => f.includes('计算') || f.includes('IT')))
      parts.push(`技术方向实力突出`);
    if (uni.city === '北京' || uni.city === '上海' || uni.city === '深圳' || uni.city === '杭州')
      parts.push(`${uni.city}区位就业优势明显`);
  }

  if (tier === 'reach') parts.push('竞争激烈，需全力以赴备考');
  else if (tier === 'match') parts.push('与你的水平匹配，是性价比之选');
  else parts.push('录取把握较高，可作为稳妥选择');

  return parts.join('；');
}

function estimateReportRatio(diffScore: number): string {
  if (diffScore >= 90) return '约 10:1 ~ 20:1';
  if (diffScore >= 85) return '约 8:1 ~ 12:1';
  if (diffScore >= 80) return '约 6:1 ~ 10:1';
  if (diffScore >= 75) return '约 5:1 ~ 8:1';
  if (diffScore >= 70) return '约 4:1 ~ 6:1';
  if (diffScore >= 60) return '约 3:1 ~ 5:1';
  return '约 2:1 ~ 4:1';
}
