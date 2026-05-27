import type { UserProfile, MajorRecommendation, BasicInfo, Skills, DisciplineCategory } from '../types';
import { majors } from '../data/majors';

export function getMajorRecommendations(
  profile: Partial<UserProfile>,
  detectedCategory: DisciplineCategory | null
): MajorRecommendation[] {
  const basic = profile.basicInfo;
  const skills = profile.skills;

  const results: MajorRecommendation[] = majors.map((major) => {
    let score = 50;
    const reasons: string[] = [];

    // 1. 本科专业匹配度
    const majorMatch = calcMajorMatch(basic?.major, major);
    score += majorMatch.score;
    reasons.push(majorMatch.reason);

    // 2. 数学能力匹配
    const mathFit = calcMathFit(basic, major);
    score += mathFit.score;
    if (mathFit.reason) reasons.push(mathFit.reason);

    // 3. 编程能力匹配
    const progFit = calcProgFit(basic, major);
    score += progFit.score;
    if (progFit.reason) reasons.push(progFit.reason);

    // 4. 证书和技能匹配
    const certFit = calcCertFit(skills, major);
    score += certFit.score;

    // 5. 竞争风险调整
    const riskAdj = calcRiskAdj(profile.preferences?.riskTolerance, major);
    score += riskAdj;

    // 6. 偏好学位类型匹配
    if (profile.preferences?.degreeType) {
      if (profile.preferences.degreeType === 'both' || major.degreeType === 'both') {
        score += 3;
      } else if (profile.preferences.degreeType === major.degreeType) {
        score += 5;
      } else {
        score -= 5;
      }
    }

    // 7. 学科大类匹配加成
    if (detectedCategory && major.category) {
      const catBonus = calcCategoryBonus(detectedCategory, major.category);
      score += catBonus.score;
    }

    // 8. 综合素质自评调整
    const sa = basic?.selfAssessment;
    if (sa) {
      // 学习能力影响所有方向
      if (sa.learningAbility >= 4) score += 2;
      if (sa.learningAbility <= 1) score -= 2;
      // 对于高技术含量专业，逻辑思维加成
      if (major.techLevel >= 4 && sa.logicalThinking >= 4) score += 2;
      // 对于文科专业，写作能力加成
      if (major.techLevel <= 2 && sa.writingAbility >= 4) score += 3;
    }

    const matchRate = Math.max(5, Math.min(98, Math.round(score)));

    return { major, matchRate, reasons };
  });

  results.sort((a, b) => b.matchRate - a.matchRate);
  return results;
}

function calcCategoryBonus(
  cat: DisciplineCategory,
  majorCat: string
): { score: number } {
  const catMap: Record<string, string[]> = {
    management: ['管理学'],
    economics: ['经济学'],
    engineering: ['工学', '交叉学科'],
    science: ['理学', '交叉学科'],
    liberalArts: ['文学', '教育学'],
    law: ['法学'],
    education: ['教育学'],
    medical: ['医学'],
    agriculture: ['农学'],
  };

  const expected = catMap[cat] || [];
  if (expected.includes(majorCat)) return { score: 5 };

  // 交叉学科对所有类别都有一定适配性
  if (majorCat === '交叉学科') return { score: 2 };

  // 相近类别小加分
  if (cat === 'engineering' && majorCat === '理学') return { score: 2 };
  if (cat === 'science' && majorCat === '工学') return { score: 2 };
  if (cat === 'management' && majorCat === '经济学') return { score: 3 };
  if (cat === 'economics' && majorCat === '管理学') return { score: 3 };
  if (cat === 'liberalArts' && majorCat === '法学') return { score: 2 };

  return { score: -3 };
}

function calcMajorMatch(
  undergradMajor: string | undefined,
  major: (typeof majors)[number]
): { score: number; reason: string } {
  if (!undergradMajor)
    return { score: 0, reason: '未提供本科专业信息' };

  const u = undergradMajor.toLowerCase();

  // 大数据/数据科学相关
  if (u.includes('大数据') || u.includes('数据科学')) {
    if (major.id === '085411')
      return { score: 15, reason: '本科专业与大数据技术高度对口' };
    if (major.id === '14ds')
      return { score: 14, reason: '数据科学方向与大数据管理天然衔接' };
    if (major.id === '1201' || major.id === '120502')
      return { score: 13, reason: '大数据管理与该专业同属管理类交叉学科，衔接紧密' };
    if (major.id === '0812' || major.id === '085410')
      return { score: 8, reason: '虽跨工学，但大数据背景提供了数据和编程基础' };
    if (major.id === '0252')
      return { score: 10, reason: '大数据分析方向与应用统计高度相关' };
    return { score: 5, reason: '大数据背景提供了一定的数据思维优势' };
  }

  // 信息管理相关
  if (u.includes('信息管理') || u.includes('信息')) {
    if (major.id === '120502' || major.id === '1205')
      return { score: 15, reason: '信息管理与情报学/图书情报同属信息资源管理领域' };
    if (major.id === '1201')
      return { score: 12, reason: '信息管理是管理科学与工程的近亲学科' };
    return { score: 5, reason: '信息管理背景提供了信息组织与分析基础' };
  }

  // 计算机/软件相关
  if (u.includes('计算机') || u.includes('软件')) {
    if (['0812', '0835', '085410', '085411', '085412'].includes(major.id))
      return { score: 15, reason: '计算机/软件本科与工科方向高度对口' };
    return { score: 10, reason: '计算机背景提供了扎实的技术基础' };
  }

  // 管理学相关
  if (u.includes('管理')) {
    if (['1201', '1202', '1205', '120502', '1256', '1204', '1251', '1253'].includes(major.id))
      return { score: 10, reason: '管理学背景与管理类硕士方向自然衔接' };
    if (['0252', '085411', '14ds'].includes(major.id))
      return { score: 5, reason: '管理学背景提供了一定的方法论基础，但需补强技术' };
  }

  // 数学/统计相关
  if (u.includes('数学') || u.includes('统计')) {
    if (major.id === '0252')
      return { score: 15, reason: '数学/统计背景与应用统计高度对口' };
    if (major.id === '0701' || major.id === '0714')
      return { score: 14, reason: '数学/统计背景与理论基础学科完美衔接' };
    return { score: 8, reason: '数学/统计背景提供了扎实的数理基础' };
  }

  // 经济/金融相关
  if (u.includes('经济') || u.includes('金融')) {
    if (['0201', '0202', '0251', '0252', '0254', '0255'].includes(major.id))
      return { score: 15, reason: '经济/金融本科与经济学方向高度对口' };
    if (major.id === '1202' || major.id === '1253')
      return { score: 8, reason: '经济背景为管理类方向提供了分析基础' };
  }

  // 中文/新闻/外语相关
  if (u.includes('中文') || u.includes('新闻') || u.includes('英语') || u.includes('外语') || u.includes('翻译')) {
    if (['0501', '0502', '0503', '0453'].includes(major.id))
      return { score: 15, reason: '语言文学/新闻背景与文学类方向高度对口' };
    if (major.id === '0401')
      return { score: 8, reason: '语言背景为教育学方向提供了基础' };
  }

  // 法学相关
  if (u.includes('法') || u.includes('法律')) {
    if (['0301', '0302', '0305'].includes(major.id))
      return { score: 15, reason: '法学本科与法学硕士方向高度对口' };
    if (major.id === '1204')
      return { score: 8, reason: '法学背景可迁移至公共管理方向' };
  }

  // 电子/通信/自动化相关
  if (u.includes('电子') || u.includes('通信') || u.includes('自动化') || u.includes('电气')) {
    if (['0810', '0811', '085400', '0839', '0808', '0809', '085801'].includes(major.id))
      return { score: 15, reason: '电子通信/自动化本科与对应工科方向高度对口' };
    if (['0812', '085410', '0804', '085407'].includes(major.id))
      return { score: 8, reason: '相关工科背景可迁移至计算机/仪器方向' };
  }

  // 生物/生化/生工/生命科学相关 (P2-NEW-1)
  if (u.includes('生物') || u.includes('生命') || u.includes('生化') || u.includes('生工')) {
    if (['0710', '071001', '071005', '071006', '071007', '071009', '0836', '0831', '085900'].includes(major.id))
      return { score: 15, reason: '生物背景与该研究生方向高度对口（理学/工学/生物医药）' };
    if (['1001', '1055', '1007', '1008', '1056', '1004', '1053'].includes(major.id))
      return { score: 14, reason: '生物背景为医药方向提供了实验和理论基础' };
    if (['0901', '0905', '0902', '0904', '0906', '0951', '0952'].includes(major.id))
      return { score: 11, reason: '生物基础可迁移至农学/动科方向' };
    if (['0830', '0832', '0703', '070305', '0817', '085300'].includes(major.id))
      return { score: 10, reason: '生物背景为环境/食品/生化方向提供了交叉学科优势' };
    return { score: 5, reason: '生物背景提供了一定的实验思维和科学素养' };
  }

  // 化学/化工/应用化学/材料化学相关 (P2-NEW-2)
  if (u.includes('化学') || u.includes('化工') || u.includes('材料化学') || u.includes('应用化学')) {
    if (['0703', '070301', '070302', '070303', '070304', '070305', '0817', '0805', '085300'].includes(major.id))
      return { score: 15, reason: '化学/化工背景与该方向高度对口' };
    if (['1055', '1007', '1008', '1056'].includes(major.id))
      return { score: 14, reason: '化学背景为药学/中药学提供坚实基础' };
    if (['0830', '0832', '0820', '085700'].includes(major.id))
      return { score: 10, reason: '化学基础可迁移至环境/食品/能源领域' };
    return { score: 5, reason: '化学背景提供了实验精神和分析能力' };
  }

  // 物理/力学/应用物理/光电相关 (P2-NEW-3)
  if (u.includes('物理') || u.includes('力学') || u.includes('光电') || u.includes('声学') || u.includes('应用物理')) {
    if (['0702', '070201', '070205', '070207', '0801'].includes(major.id))
      return { score: 15, reason: '物理/力学背景与该方向高度对口' };
    if (['0808', '0809', '0803', '0810', '085400', '0804'].includes(major.id))
      return { score: 12, reason: '物理背景可迁移至电气/电子/通信/光学方向' };
    if (['0802', '0814', '0825', '0827', '085200'].includes(major.id))
      return { score: 10, reason: '物理基础可迁移至机械/土木/航空航天/核工程' };
    if (['0704', '0708', '0707'].includes(major.id))
      return { score: 14, reason: '物理背景可迁移至天文学/地球物理/海洋科学' };
    return { score: 5, reason: '物理背景提供了扎实的数理基础和建模能力' };
  }

  // 医学/药学/护理/公卫/临床相关 (P2-NEW-4)
  if (u.includes('医学') || u.includes('临床') || u.includes('药学') || u.includes('护理')
      || u.includes('公共卫生') || u.includes('公卫') || u.includes('预防')
      || u.includes('口腔') || u.includes('中医') || u.includes('中药')
      || u.includes('麻醉') || u.includes('影像') || u.includes('检验') || u.includes('康复')) {
    if (['1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011',
         '1051', '1052', '1053', '1054', '1055', '1056', '1057', '1058'].includes(major.id))
      return { score: 15, reason: '医学/药学背景与该方向高度对口' };
    if (['0710', '071001', '071005', '071006', '0831', '085900'].includes(major.id))
      return { score: 10, reason: '医学背景可迁移至生物/生物医学工程方向' };
    if (['1204'].includes(major.id))
      return { score: 8, reason: '医学背景可迁移至公共卫生管理方向' };
    return { score: 5, reason: '医学背景提供了严谨的科学训练' };
  }

  // 农学/园艺/植保/动科/兽医/林学/水产/草学 (P2-NEW-5)
  if (u.includes('农学') || u.includes('农业') || u.includes('园艺') || u.includes('植保')
      || u.includes('植物保护') || u.includes('动物科学') || u.includes('动科')
      || u.includes('兽医') || u.includes('动物医学') || u.includes('林学')
      || u.includes('水产') || u.includes('渔业') || u.includes('草业')
      || u.includes('草学') || u.includes('作物') || u.includes('畜牧') || u.includes('种子')) {
    if (['0901', '0902', '0903', '0904', '0905', '0906', '0907', '0908', '0909',
         '0951', '0952', '0954'].includes(major.id))
      return { score: 15, reason: '农学背景与该方向高度对口' };
    if (['0710', '071001', '0713', '0828', '0829', '0830', '0832', '0834'].includes(major.id))
      return { score: 10, reason: '农学背景可迁移至生物/生态/环境/食品方向' };
    return { score: 5, reason: '农学背景提供了实践和田野经验' };
  }

  // 机械/车辆/制造/机电相关 (P2-NEW-6)
  if (u.includes('机械') || u.includes('车辆') || u.includes('制造') || u.includes('机电')
      || u.includes('汽车') || u.includes('模具')) {
    if (['0802', '085200'].includes(major.id))
      return { score: 15, reason: '机械/车辆背景与该方向高度对口' };
    if (['0801', '0811', '0807', '0825', '0823', '0824', '085500'].includes(major.id))
      return { score: 10, reason: '机械背景可迁移至力学/控制/动力/航空/交通/船舶' };
    return { score: 5, reason: '机械背景提供了工程思维和实践能力' };
  }

  // 土木/建筑/城规/水利相关 (P2-NEW-7)
  if (u.includes('土木') || u.includes('建筑') || u.includes('城规') || u.includes('规划')
      || u.includes('水利') || u.includes('给排水') || u.includes('暖通')) {
    if (['0814', '0813', '0815', '0833', '0834', '085100', '085600'].includes(major.id))
      return { score: 15, reason: '土木/建筑/城规背景与该方向高度对口' };
    if (['0801', '0823'].includes(major.id))
      return { score: 8, reason: '相关背景可迁移至力学/交通方向' };
    return { score: 5, reason: '相关背景提供了空间思维和工程基础' };
  }

  // 材料/高分子/冶金/纺织/轻工相关 (P2-NEW-8)
  if (u.includes('材料') || u.includes('高分子') || u.includes('冶金')
      || u.includes('纺织') || u.includes('轻工')) {
    if (['0805', '085300', '0806', '0821', '0822', '14nm'].includes(major.id))
      return { score: 15, reason: '材料/高分子背景与该方向高度对口' };
    if (['0703', '070305', '0817'].includes(major.id))
      return { score: 10, reason: '材料背景可迁移至化学/化工方向' };
    if (['0802', '0825'].includes(major.id))
      return { score: 8, reason: '材料背景在机械/航空领域有交叉应用' };
    return { score: 5, reason: '材料背景提供了科学的实验方法论' };
  }

  // 环境/环保/生态/环卫/能源相关 (P2-NEW-9)
  if (u.includes('环境') || u.includes('环保') || u.includes('生态') || u.includes('环卫')
      || u.includes('能源') || u.includes('节能')) {
    if (['0830', '085700', '085500'].includes(major.id))
      return { score: 15, reason: '环境/能源背景与该方向高度对口' };
    if (['0713', '0707', '0706', '0709'].includes(major.id))
      return { score: 12, reason: '环境背景与生态/海洋/大气/地质方向相关' };
    if (['0814', '0815', '0816', '0828'].includes(major.id))
      return { score: 8, reason: '环境背景可迁移至土木水利/测绘/农业工程' };
    return { score: 5, reason: '环境背景提供了可持续发展思维' };
  }

  // 食品/食科/食安/营养相关 (P2-NEW-10)
  if (u.includes('食品') || u.includes('食科') || u.includes('食安') || u.includes('营养')
      || u.includes('酿酒') || u.includes('乳品')) {
    if (['0832', '085900'].includes(major.id))
      return { score: 15, reason: '食品/营养背景与该方向高度对口' };
    if (['1004', '1053', '0710', '071001', '0904'].includes(major.id))
      return { score: 10, reason: '食品背景可迁移至公卫/生物/植保方向' };
    return { score: 5, reason: '食品背景提供了化学和生物学基础' };
  }

  // 艺术/美术/设计/音乐/舞蹈/戏剧/影视相关 (P2-NEW-11)
  if (u.includes('艺术') || u.includes('美术') || u.includes('设计') || u.includes('绘画')
      || u.includes('雕塑') || u.includes('书法') || u.includes('音乐') || u.includes('舞蹈')
      || u.includes('戏剧') || u.includes('影视') || u.includes('动画') || u.includes('摄影')
      || u.includes('播音') || u.includes('编导') || u.includes('数字媒体')
      || u.includes('视觉传达') || u.includes('服设') || u.includes('服装')) {
    if (['1301', '1302', '1304', '1305', '1351', '1352', '1353', '1354', '1355', '1356', '1357'].includes(major.id))
      return { score: 15, reason: '艺术/设计背景与该方向高度对口' };
    if (['0503', '0552'].includes(major.id))
      return { score: 8, reason: '艺术背景可迁移至新媒体/传播方向' };
    if (['0813', '0833', '0834'].includes(major.id))
      return { score: 6, reason: '设计思维可迁移至建筑/城规/风景园林' };
    return { score: 5, reason: '艺术背景提供了审美和创意能力' };
  }

  // 体育/运动训练/武术相关 (P2-NEW-12)
  if (u.includes('体育') || u.includes('运动') || u.includes('武术')
      || u.includes('体教') || u.includes('训练')) {
    if (['0403', '0452'].includes(major.id))
      return { score: 15, reason: '体育背景与该方向高度对口' };
    if (['0401', '0451'].includes(major.id))
      return { score: 8, reason: '体育背景可迁移至教育方向' };
    return { score: 5, reason: '体育背景提供了训练和方法论基础' };
  }

  // 教育/师范/心理相关 (P2-NEW-13)
  if (u.includes('教育') || u.includes('师范') || u.includes('心理')
      || u.includes('课程') || u.includes('学前')) {
    if (['0401', '0402', '0451', '0454', '0453', '0403'].includes(major.id))
      return { score: 15, reason: '教育/心理背景与该方向高度对口' };
    if (['0305', '1204'].includes(major.id))
      return { score: 8, reason: '教育/心理背景可迁移至思政/公共管理' };
    return { score: 5, reason: '教育/心理背景提供了对人的深刻理解' };
  }

  // 历史/考古/文博相关 (P2-NEW-14)
  if (u.includes('历史') || u.includes('考古') || u.includes('文物') || u.includes('博物馆')
      || u.includes('文博') || u.includes('文献') || u.includes('史学')) {
    if (['0601', '0602', '0603', '0651'].includes(major.id))
      return { score: 15, reason: '历史/考古背景与该方向高度对口' };
    if (['0501', '1301', '1351'].includes(major.id))
      return { score: 8, reason: '历史背景可迁移至文学/艺术学方向' };
    return { score: 5, reason: '历史背景提供了研究方法和文献能力' };
  }

  // 哲学/宗教相关 (P2-NEW-15)
  if (u.includes('哲学') || u.includes('宗教') || u.includes('伦理') || u.includes('逻辑')) {
    if (['0101', '010102', '010103', '010105', '010108'].includes(major.id))
      return { score: 15, reason: '哲学/宗教背景与该方向高度对口' };
    if (['0305', '0501', '0601'].includes(major.id))
      return { score: 8, reason: '哲学背景可迁移至思政/文学/历史方向' };
    return { score: 5, reason: '哲学背景提供了批判思维和理论分析能力' };
  }

  // 政治/社会/社工/民族/国际关系相关 (P2-NEW-16)
  if (u.includes('政治') || u.includes('社会') || u.includes('社工')
      || u.includes('民族') || u.includes('国际关系') || u.includes('外交')
      || u.includes('公共政策') || u.includes('行政管理') || u.includes('人类学')) {
    if (['0302', '0303', '0304', '0305', '0307', '1204'].includes(major.id))
      return { score: 15, reason: '政治/社会/公共管理背景与该方向高度对口' };
    if (['0301', '0101'].includes(major.id))
      return { score: 8, reason: '相关背景可迁移至法学/哲学方向' };
    return { score: 5, reason: '政治/社会背景提供了治理和社会分析视野' };
  }

  // 地理/GIS/遥感/地质/地球科学相关 (P2-NEW-17)
  if (u.includes('地理') || u.includes('GIS') || u.includes('遥感') || u.includes('地信')
      || u.includes('地质') || u.includes('地球物理') || u.includes('地球化学')
      || u.includes('测绘') || u.includes('空间信息')) {
    if (['0705', '070503', '0708', '0709', '0816'].includes(major.id))
      return { score: 15, reason: '地理/地质背景与该方向高度对口' };
    if (['0812', '085411', '14ds'].includes(major.id))
      return { score: 10, reason: '空间数据/GIS背景可迁移至大数据和计算机方向' };
    if (['0833', '0814', '0815'].includes(major.id))
      return { score: 8, reason: '空间思维可迁移至规划/土木/水利方向' };
    return { score: 5, reason: '地理/地质背景提供了空间分析和野外能力' };
  }

  // 海洋/船舶/海事相关 (P2-NEW-18)
  if (u.includes('海洋') || u.includes('船舶') || u.includes('海事') || u.includes('轮机')) {
    if (['0707', '0824'].includes(major.id))
      return { score: 15, reason: '海洋/船舶背景与该方向高度对口' };
    if (['0802', '0807', '0825'].includes(major.id))
      return { score: 8, reason: '相关背景可迁移至机械/动力/航空方向' };
    return { score: 5, reason: '海洋/船舶背景提供了工程实践基础' };
  }

  // 交通/运输/物流/交管相关 (P2-NEW-19)
  if (u.includes('交通') || u.includes('运输') || u.includes('物流') || u.includes('铁路')
      || u.includes('轨道') || u.includes('航空运输')) {
    if (['0823', '085800'].includes(major.id))
      return { score: 15, reason: '交通/运输背景与该方向高度对口' };
    if (['1201', '1202', '0802'].includes(major.id))
      return { score: 8, reason: '交通背景可迁移至管科/管理/机械方向' };
    return { score: 5, reason: '交通/运输背景提供了系统思维' };
  }

  // 航空航天/飞行器相关 (P2-NEW-20)
  if (u.includes('航空') || u.includes('航天') || u.includes('飞行器')
      || u.includes('飞机') || u.includes('火箭')) {
    if (['0825', '0801', '0802'].includes(major.id))
      return { score: 15, reason: '航空航天背景与该方向高度对口' };
    if (['0807', '0808', '0811', '0827'].includes(major.id))
      return { score: 10, reason: '航空航天背景可迁移至动力/电气/控制/核工程' };
    if (['0812', '085410'].includes(major.id))
      return { score: 8, reason: '航空航天背景中的数值计算可迁移至计算机/AI' };
    return { score: 5, reason: '航空航天背景提供了严谨的系统工程训练' };
  }

  // 核工程/核技术/核物理相关 (P2-NEW-21)
  if (u.includes('核工程') || u.includes('核技术') || u.includes('核物理')
      || u.includes('核能') || u.includes('核科学') || u.includes('辐射')) {
    if (['0827', '0702', '070201'].includes(major.id))
      return { score: 15, reason: '核工程/核物理背景与该方向高度对口' };
    if (['0807', '085500'].includes(major.id))
      return { score: 10, reason: '核背景可迁移至动力工程/能源动力方向' };
    return { score: 5, reason: '核工程背景提供了扎实的物理数学基础' };
  }

  return { score: 0, reason: '跨学科报考，需要补充该领域基础知识' };
}

function calcMathFit(
  basic: BasicInfo | undefined,
  major: (typeof majors)[number]
): { score: number; reason: string | null } {
  if (!basic?.mathBasis) return { score: 0, reason: null };

  const avgMath =
    ((basic.mathBasis.advancedMath || 0) +
      (basic.mathBasis.linearAlgebra || 0) +
      (basic.mathBasis.probability || 0)) /
    3;

  if (major.competitionHeat >= 5 && avgMath < 2.5) {
    return { score: -10, reason: '该专业竞争激烈，建议先强化数学基础' };
  }
  if (avgMath >= 3.5 && major.techLevel >= 4) {
    return { score: 8, reason: '数学基础扎实，能够胜任该专业对数学的要求' };
  }
  if (avgMath <= 1.5 && major.techLevel >= 4) {
    return { score: -10, reason: '该专业对数学要求较高，目前数学基础差距较大' };
  }

  return { score: 0, reason: null };
}

function calcProgFit(
  basic: BasicInfo | undefined,
  major: (typeof majors)[number]
): { score: number; reason: string | null } {
  const avg =
    basic?.programmingBasis
      ? ((basic.programmingBasis.python || 0) +
          (basic.programmingBasis.java || 0) +
          (basic.programmingBasis.sql || 0)) /
        3
      : 0;

  if (major.techLevel >= 4 && avg < 1.5) {
    return { score: -8, reason: '该专业要求较强的编程能力，当前编程基础薄弱' };
  }
  if (major.techLevel >= 4 && avg >= 3) {
    return { score: 8, reason: '编程基础较好，具备该专业所需的技术能力' };
  }
  if (major.techLevel <= 2 && avg >= 2.5) {
    return { score: 5, reason: '编程能力对于该管理类专业是很好的加分项' };
  }

  return { score: 0, reason: null };
}

function calcCertFit(
  skills: Skills | undefined,
  major: (typeof majors)[number]
): { score: number } {
  if (!skills?.certificates?.length) return { score: 0 };
  const count = skills.certificates.length;
  if (major.techLevel >= 4) return { score: Math.min(count * 3, 10) };
  return { score: Math.min(count * 2, 6) };
}

function calcRiskAdj(
  riskTolerance: string | undefined,
  major: (typeof majors)[number]
): number {
  if (!riskTolerance || riskTolerance === 'balanced') return 0;
  if (riskTolerance === 'conservative') {
    if (major.competitionHeat >= 5) return -6;
    if (major.crossExamDifficulty >= 4) return -5;
  }
  if (riskTolerance === 'aggressive') {
    if (major.competitionHeat >= 4) return 4;
  }
  return 0;
}
