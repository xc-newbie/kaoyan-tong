import type { ProgramDetail } from '../types';

// 院校-专业详细考研数据
// key: `${universityId}::${majorId}`
export const programDetails: Record<string, ProgramDetail> = {
  // ==================== 199管理类联考 — 图书情报专硕 (1255) ====================
  'whu::1255': {
    reportRatio: '6:1', reexamScore2026: 230, reexamScore2025: 225, admitScore2026: 235,
    plannedEnrollment2026: 18, actualEnrollment2026: 20, recommendedEnrollment2026: 8,
    tuitionWan: '3.6万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制，接受跨考', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二，复试含信息检索笔试',
    remarks: '武大信管院图情全国Top2，就业面极广，图书馆/互联网/公务员均通吃',
  },
  'nju::1255': {
    reportRatio: '7:1', reexamScore2026: 225, reexamScore2025: 220, admitScore2026: 230,
    plannedEnrollment2026: 15, actualEnrollment2026: 15, recommendedEnrollment2026: 10,
    tuitionWan: '3万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南大信管全国前三，情报学方向尤其强势，毕业后江浙沪就业认可度高',
  },
  'ruc::1255': {
    reportRatio: '8:1', reexamScore2026: 235, reexamScore2025: 230, admitScore2026: 240,
    plannedEnrollment2026: 12, actualEnrollment2026: 14, recommendedEnrollment2026: 6,
    tuitionWan: '4.2万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二，复试含信息资源管理综合',
    remarks: '人大信管全国排名前列，北京就业区位优势明显，体制内就业比例高',
  },
  'nankai::1255': {
    reportRatio: '5:1', reexamScore2026: 215, reexamScore2025: 210, admitScore2026: 220,
    plannedEnrollment2026: 10, actualEnrollment2026: 12, recommendedEnrollment2026: 5,
    tuitionWan: '3万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南开图书情报专硕报考热度适中，性价比高，天津就业区位好',
  },
  'sysu::1255': {
    reportRatio: '6:1', reexamScore2026: 220, reexamScore2025: 215, admitScore2026: 225,
    plannedEnrollment2026: 12, actualEnrollment2026: 12, recommendedEnrollment2026: 6,
    tuitionWan: '4.5万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '中山大学信管在华南地区排名第一，广州深圳就业机会多',
  },
  'ccnu::1255': {
    reportRatio: '4:1', reexamScore2026: 205, reexamScore2025: 200, admitScore2026: 210,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 4,
    tuitionWan: '2.4万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '华中师大图情专硕招生人数多，上岸概率大，211院校性价比之选',
  },

  // ==================== 会计专硕 (1253) ====================
  'pku::1253': {
    reportRatio: '25:1', reexamScore2026: 260, reexamScore2025: 255, admitScore2026: 265,
    plannedEnrollment2026: 30, actualEnrollment2026: 32, recommendedEnrollment2026: 15,
    tuitionWan: '15.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '不卡本科但985/211占绝大多数', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '199管综+英二，复试含专业综合笔试+面试',
    remarks: '北大光华MPAcc全国最难考，毕业生进投行/券商/四大核心岗位',
  },
  'ruc::1253': {
    reportRatio: '20:1', reexamScore2026: 255, reexamScore2025: 250, admitScore2026: 260,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 12,
    tuitionWan: '12.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '人大会计与厦大并列全国第一，北京区位优势，体制内外双通',
  },
  'swufe::1253': {
    reportRatio: '12:1', reexamScore2026: 245, reexamScore2025: 240, admitScore2026: 250,
    plannedEnrollment2026: 80, actualEnrollment2026: 85, recommendedEnrollment2026: 30,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '西南财经会计全国顶尖，招生人数多，财经类就业认可度极高',
  },
  'cueb::1253': {
    reportRatio: '8:1', reexamScore2026: 230, reexamScore2025: 225, admitScore2026: 235,
    plannedEnrollment2026: 60, actualEnrollment2026: 65, recommendedEnrollment2026: 20,
    tuitionWan: '8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '首都经贸会计学实力强，北京就业好，双非中性价比最高的会计专硕之一',
  },
  'shufe::1253': {
    reportRatio: '15:1', reexamScore2026: 248, reexamScore2025: 242, admitScore2026: 253,
    plannedEnrollment2026: 45, actualEnrollment2026: 50, recommendedEnrollment2026: 20,
    tuitionWan: '13.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '上财会计全国Top3，上海金融中心区位，四大/投行目标院校',
  },

  // ==================== 审计专硕 (0257) ====================
  'nau::0257': {
    reportRatio: '5:1', reexamScore2026: 220, reexamScore2025: 215, admitScore2026: 225,
    plannedEnrollment2026: 30, actualEnrollment2026: 32, recommendedEnrollment2026: 8,
    tuitionWan: '5万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南京审计大学是审计专硕第一选择，审计署/四大审计岗目标院校',
  },
  'swufe::0257': {
    reportRatio: '8:1', reexamScore2026: 235, reexamScore2025: 230, admitScore2026: 240,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 10,
    tuitionWan: '6.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '西财审计与会计并重发展，西南地区审计就业独占鳌头',
  },

  // ==================== MPA 公共管理专硕 (1252) ====================
  'pku::1252': {
    reportRatio: '15:1', reexamScore2026: 210, reexamScore2025: 205, admitScore2026: 215,
    plannedEnrollment2026: 200, actualEnrollment2026: 210, recommendedEnrollment2026: 0,
    tuitionWan: '12.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制，需本科毕业满3年', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '199管综+英二，非全日制为主',
    remarks: '北大MPA全国最难考，党政机关/国企管理人员集中，人脉资源极强',
  },
  'ruc::1252': {
    reportRatio: '12:1', reexamScore2026: 200, reexamScore2025: 195, admitScore2026: 205,
    plannedEnrollment2026: 250, actualEnrollment2026: 260, recommendedEnrollment2026: 0,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制，需本科毕业满3年', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '人大公共管理全国第一，公务员和事业单位人员深造首选',
  },
  'fdu::1252': {
    reportRatio: '10:1', reexamScore2026: 205, reexamScore2025: 200, admitScore2026: 210,
    plannedEnrollment2026: 180, actualEnrollment2026: 185, recommendedEnrollment2026: 0,
    tuitionWan: '10.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '复旦MPA上海地区最强，长三角公务员/事业单位深造标杆',
  },

  // ==================== MEM 工程管理专硕 (1256) ====================
  'tsinghua::1256': {
    reportRatio: '8:1', reexamScore2026: 195, reexamScore2025: 190, admitScore2026: 200,
    plannedEnrollment2026: 120, actualEnrollment2026: 125, recommendedEnrollment2026: 0,
    tuitionWan: '16.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制，部分方向需工作经验', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二，部分方向需提前面试',
    remarks: '清华MEM全国最强，大数据与商业分析方向最受欢迎，IT行业就业优势突出',
  },
  'buaa::1256': {
    reportRatio: '6:1', reexamScore2026: 185, reexamScore2025: 180, admitScore2026: 190,
    plannedEnrollment2026: 80, actualEnrollment2026: 82, recommendedEnrollment2026: 0,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '北航MEM在航空航天和IT项目管理方向有特色优势，北京就业面广',
  },

  // ==================== 计算机学硕 (0812) ====================
  'tsinghua::0812': {
    reportRatio: '30:1', reexamScore2026: 375, reexamScore2025: 370, admitScore2026: 385,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211，双非极难', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数一+408计算机学科专业基础综合',
    remarks: '清华计算机全国第一，毕业生进顶级互联网/量化/自动驾驶',
  },
  'pku::0812': {
    reportRatio: '35:1', reexamScore2026: 380, reexamScore2025: 375, admitScore2026: 390,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数一+408统考',
    remarks: '北大计算机+智能学院双品牌，学术和就业双向碾压',
  },

  // ==================== 软件工程专硕 (085410) ====================
  'zju::085410': {
    reportRatio: '15:1', reexamScore2026: 360, reexamScore2025: 355, admitScore2026: 368,
    plannedEnrollment2026: 60, actualEnrollment2026: 65, recommendedEnrollment2026: 30,
    tuitionWan: '4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+408统考',
    remarks: '浙大软院在杭州互联网圈认可度极高，阿里/蚂蚁/网易近水楼台',
  },

  // ==================== 数据科学交叉 (14ds) ====================
  'tsinghua::14ds': {
    reportRatio: '20:1', reexamScore2026: 370, reexamScore2025: 365, admitScore2026: 378,
    plannedEnrollment2026: 10, actualEnrollment2026: 12, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '各校自命题，多考数一+数据科学综合',
    remarks: '清华数据科学为全国首创，进可攻博退可互联网数据岗',
  },

  // ==================== 应用统计专硕 (0252) ====================
  'pku::0252': {
    reportRatio: '18:1', reexamScore2026: 420, reexamScore2025: 415, admitScore2026: 428,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '10万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+432统计学',
    remarks: '北大应统分数线常年全专业最高，毕业生进量化/互联网DS/药企统计',
  },

  // ==================== 临床医学专硕 (1051) ====================
  'fdu::1051': {
    reportRatio: '10:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 60, actualEnrollment2026: 62, recommendedEnrollment2026: 25,
    tuitionWan: '3.6万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求医学本科背景，非医学不得跨考', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '306临床医学综合（西医）',
    remarks: '复旦医学院全国Top3，附属医院多（中山/华山/肿瘤），规培+就业一体化',
  },

  // ==================== 法学学硕 (0301) ====================
  'pku::0301': {
    reportRatio: '25:1', reexamScore2026: 380, reexamScore2025: 375, admitScore2026: 390,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211法本，非法本建议考法硕（非法学）', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '学硕各方向自命题，法硕全国联考',
    remarks: '北大法学全国第一，毕业生进红圈所/最高法/部委比例极高',
  },
  'ruc::0301': {
    reportRatio: '20:1', reexamScore2026: 370, reexamScore2025: 365, admitScore2026: 380,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211法本', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '学硕各方向自命题',
    remarks: '人大法学与北大并列全国第一，民商法/经济法全国最强，北京就业优势突出',
  },
  'cupl::0301': {
    reportRatio: '15:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 80, actualEnrollment2026: 85, recommendedEnrollment2026: 35,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '学硕各方向自命题，法硕全国联考',
    remarks: '中国政法大学法学全学科覆盖最全，五院四系核心，公检法就业首选',
  },

  // ==================== 哲学 (0101) ====================
  'pku::0101': {
    reportRatio: '8:1', reexamScore2026: 360, reexamScore2025: 355, admitScore2026: 370,
    plannedEnrollment2026: 12, actualEnrollment2026: 13, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211哲学或相关文科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '哲学综合+中/西哲史（各校自命题），不考数学',
    remarks: '北大哲学系全国第一，中西马/美学/伦理学全方向强势，学术圈/智库/文化出版就业',
  },
  'ruc::0101': {
    reportRatio: '6:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制，接受跨考', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '哲学综合+方向专业课，不考数学',
    remarks: '人大哲学以马克思主义哲学/伦理学见长，北京学术资源丰富',
  },
  'fdu::0101': {
    reportRatio: '5:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 6,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '哲学综合+中/西哲史，不考数学',
    remarks: '复旦哲学以西方哲学/中国哲学/宗教学闻名，上海区位+学术双优势',
  },

  // ==================== 中国语言文学 (0501) ====================
  'pku::0501': {
    reportRatio: '12:1', reexamScore2026: 370, reexamScore2025: 365, admitScore2026: 380,
    plannedEnrollment2026: 18, actualEnrollment2026: 20, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211中文或相关文科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '中外文学基础+方向专业课，不考数学',
    remarks: '北大中文系全国第一，古代文学/现当代文学/语言学三方向称霸，学术与出版就业',
  },
  'nju::0501': {
    reportRatio: '8:1', reexamScore2026: 360, reexamScore2025: 355, admitScore2026: 370,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '语言文学基础+方向专业课，不考数学',
    remarks: '南大中文系全国前三，古代文学/戏剧戏曲学/语言学实力雄厚，南京文化底蕴加持',
  },
  'bnu::0501': {
    reportRatio: '6:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '语言文学综合+方向专业课，不考数学',
    remarks: '北师大中文以文艺学/民俗学/儿童文学见长，师范类中文旗舰',
  },

  // ==================== 新闻传播学 (0503) ====================
  'ruc::0503': {
    reportRatio: '15:1', reexamScore2026: 375, reexamScore2025: 370, admitScore2026: 385,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '新闻传播史论+实务，不考数学',
    remarks: '人大新闻学院全国第一，新华社/央视/央媒目标院校，互联网大厂也大量招聘',
  },
  'fdu::0503': {
    reportRatio: '12:1', reexamScore2026: 365, reexamScore2025: 360, admitScore2026: 375,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '新闻传播基础+方向专业课，不考数学',
    remarks: '复旦新闻系历史悠久，上海媒体/外企PR/互联网运营就业优势突出',
  },
  'cuc_211::0503': {
    reportRatio: '10:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 40, actualEnrollment2026: 45, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '新闻传播基础+方向专业课，不考数学',
    remarks: '中国传媒大学广播电视/新媒体/广告方向全国领先，央视/字节/腾讯等大量校友',
  },

  // ==================== 历史学 (0601) ====================
  'pku::0601': {
    reportRatio: '6:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 7,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好历史/中文/哲学等文科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '历史学基础+方向专业课，不考数学',
    remarks: '北大历史系全国第一，中国古代史/世界史/考古三足鼎立，学术首选',
  },
  'nju::0601': {
    reportRatio: '5:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 350,
    plannedEnrollment2026: 12, actualEnrollment2026: 13, recommendedEnrollment2026: 6,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '历史学基础+方向专业课，不考数学',
    remarks: '南大历史系中国近现代史/世界史实力突出，民国史研究独树一帜',
  },

  // ==================== 教育学 (0401) ====================
  'bnu::0401': {
    reportRatio: '10:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 40, actualEnrollment2026: 45, recommendedEnrollment2026: 20,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制，教育/心理/中文背景有优势', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '教育学基础综合（311统考或自命题），不考数学',
    remarks: '北师大教育学全国第一，教师教育/教育技术/比较教育最强，教育系统就业保障',
  },
  'ecnu::0401': {
    reportRatio: '8:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 350,
    plannedEnrollment2026: 35, actualEnrollment2026: 38, recommendedEnrollment2026: 18,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '311教育学基础综合，不考数学',
    remarks: '华东师大教育学全国前二，上海区位优势，课程与教学论/高等教育学领先',
  },

  // ==================== 马克思主义理论 (0305) ====================
  'ruc::0305': {
    reportRatio: '4:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 340,
    plannedEnrollment2026: 30, actualEnrollment2026: 35, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制，接受跨考', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '马克思主义理论综合，不考数学',
    remarks: '人大马院全国第一，高校思政课教师/党校/公务员就业稳定',
  },
  'whu::0305': {
    reportRatio: '3:1', reexamScore2026: 320, reexamScore2025: 315, admitScore2026: 330,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '马克思主义理论综合，不考数学',
    remarks: '武大马院全国前三，马克思主义中国化研究特色鲜明，招生人数多上岸概率高',
  },

  // ==================== 外国语言文学 (0502) ====================
  'pku::0502': {
    reportRatio: '8:1', reexamScore2026: 365, reexamScore2025: 360, admitScore2026: 375,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求外语本科背景，需二外', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '基础外语+方向专业课+二外，不考数学',
    remarks: '北大外院全国第一，英语/法语/德语/日语方向均强，外交部/国际组织目标院校',
  },
  'bfsu::0502': {
    reportRatio: '5:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 50, actualEnrollment2026: 55, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '要求外语本科背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '语言基础+方向专业课，不考数学',
    remarks: '北京外国语大学外语类专业最全，101种语言覆盖，外交部/新华社/央企翻译首选',
  },

  // ==================== 艺术学 (1301) ====================
  'cafa::1301': {
    reportRatio: '3:1', reexamScore2026: 320, reexamScore2025: 315, admitScore2026: 330,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 10,
    tuitionWan: '6万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求美术/设计本科背景，提交作品集', protectFirstChoice: true,
    reexamWeight: 50, examNotes: '艺术理论+专业创作/设计，不考数学',
    remarks: '中央美术学院全国美术类最高学府，纯艺/设计/建筑均强，艺术圈/设计行业通行',
  },
  'ccom::1301': {
    reportRatio: '2:1', reexamScore2026: 310, reexamScore2025: 305, admitScore2026: 320,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 10,
    tuitionWan: '6万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求音乐表演/音乐教育本科背景', protectFirstChoice: true,
    reexamWeight: 60, examNotes: '音乐史论+专业演奏/演唱/作曲，不考数学',
    remarks: '中央音乐学院全国音乐类最高学府，演奏/作曲/音乐学全方向顶尖',
  },

  // ==================== 体育学 (0403) ====================
  'bsu::0403': {
    reportRatio: '3:1', reexamScore2026: 300, reexamScore2025: 295, admitScore2026: 310,
    plannedEnrollment2026: 30, actualEnrollment2026: 35, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '体育相关专业优先，有运动等级证书加分', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '体育学基础综合+运动专项测试，不考数学',
    remarks: '北京体育大学全国体育类最高学府，运动人体科学/体育教育/体育管理全方向领先',
  },

  // ==================== 数学 (0701) ====================
  'pku::0701': {
    reportRatio: '10:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 365,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211数学或理科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数学分析+高等代数（各校自命题）',
    remarks: '北大数院全国第一，基础数学/应用数学/计算数学均顶尖，学术/量化/算法方向通吃',
  },
  'fdu::0701': {
    reportRatio: '8:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 355,
    plannedEnrollment2026: 12, actualEnrollment2026: 13, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211数学或理科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数学分析+高等代数',
    remarks: '复旦数学与应用数学传统强校，苏步青/谷超豪学派传承，学术与金融量化兼备',
  },

  // ==================== 物理学 (0702) ====================
  'pku::0702': {
    reportRatio: '8:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 355,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 14,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211物理或工科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '普通物理+量子力学（各校自命题）',
    remarks: '北大物理全国第一，理论物理/凝聚态/光学全方向强，学术/半导体/量子计算就业',
  },
  'ustc::0702': {
    reportRatio: '6:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 345,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211理工背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '普通物理+量子力学',
    remarks: '中科大物理全国前二，量子信息/核物理/等离子体特色鲜明，学术界/科研院所首选',
  },

  // ==================== 化学 (0703) ====================
  'pku::0703': {
    reportRatio: '8:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 355,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211化学或化工背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '物理化学+有机化学+无机化学（各校自命题）',
    remarks: '北大化学全国第一，有机/无机/分析/物化/高分子全方向强，学术/制药/材料就业',
  },
  'nju::0703': {
    reportRatio: '6:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 345,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好理工背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '物理化学+有机化学',
    remarks: '南大化学全国前三，配位化学/生命分析化学国家重点实验室，科研实力雄厚',
  },

  // ==================== 生物学 (0710) ====================
  'pku::0710': {
    reportRatio: '7:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 355,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好生物/医学/化学等理科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '生物化学+分子生物学+细胞生物学（各校自命题）',
    remarks: '北大生物全国顶尖，神经科学/结构生物学/基因组学领先，学术/生物医药就业',
  },
  'tsinghua::0710': {
    reportRatio: '8:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 360,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211理工背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '生物化学+分子生物学',
    remarks: '清华生命科学学院国际化水平极高，结构生物学/合成生物学方向领先',
  },

  // ==================== 机械工程 (0802) ====================
  'tsinghua::0802': {
    reportRatio: '8:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211机械或工科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+机械原理/机械设计（各校自命题）',
    remarks: '清华机械全国前二，精密仪器/智能制造/机器人方向突出，航天/车企/机器人就业',
  },
  'sjtu::0802': {
    reportRatio: '7:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 30, actualEnrollment2026: 33, recommendedEnrollment2026: 18,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211工科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+机械原理/控制工程',
    remarks: '上交机械全国前二，汽车/船舶/机器人三大方向，上海制造业就业优势明显',
  },
  'hit::0802': {
    reportRatio: '5:1', reexamScore2026: 335, reexamScore2025: 330, admitScore2026: 345,
    plannedEnrollment2026: 40, actualEnrollment2026: 45, recommendedEnrollment2026: 20,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+机械原理/机械设计',
    remarks: '哈工大机械全国前三，机器人/航天/国防方向特色，招生人数多性价比高',
  },

  // ==================== 电气工程 (0808) ====================
  'tsinghua::0808': {
    reportRatio: '10:1', reexamScore2026: 365, reexamScore2025: 360, admitScore2026: 375,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211电气/电子背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+电路原理/电力系统分析（各校自命题）',
    remarks: '清华电机系全国第一，电力系统/高电压/电力电子全方向强，国家电网/南方电网首选',
  },
  'xju::0808': {
    reportRatio: '6:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 30, actualEnrollment2026: 33, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+电路原理',
    remarks: '西安交大电气全国前二，绝缘技术/电力设备国重实验室，国网/南网/设备厂商大量招聘',
  },

  // ==================== 土木工程 (0814) ====================
  'tongji::0814': {
    reportRatio: '6:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 350,
    plannedEnrollment2026: 40, actualEnrollment2026: 45, recommendedEnrollment2026: 20,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '偏好土木/力学/水利等工科背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+结构力学/材料力学（各校自命题）',
    remarks: '同济土木全国第一，桥梁/结构/岩土/防灾减灾全方向顶尖，建筑/基建/设计院就业',
  },
  'seu::0814': {
    reportRatio: '5:1', reexamScore2026: 335, reexamScore2025: 330, admitScore2026: 345,
    plannedEnrollment2026: 35, actualEnrollment2026: 40, recommendedEnrollment2026: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+结构力学',
    remarks: '东南大学土木全国前二，结构工程/防灾减灾国重实验室，长三角建筑业就业强势',
  },

  // ==================== 建筑学 (0813) ====================
  'tsinghua::0813': {
    reportRatio: '10:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 7,
    tuitionWan: '3万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求建筑学本科（五年制）背景', protectFirstChoice: true,
    reexamWeight: 45, examNotes: '建筑学基础+6小时快题设计',
    remarks: '清华建筑全国第一，建筑设计/城市规划/建筑历史全方向强，建筑大师摇篮',
  },
  'seu::0813': {
    reportRatio: '7:1', reexamScore2026: 340, reexamScore2025: 335, admitScore2026: 350,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求建筑/城规本科背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '建筑学综合+快题设计',
    remarks: '东南大学建筑全国前二，建筑设计及其理论国重学科，华东建筑设计院大量校友',
  },

  // ==================== 电子科学与技术 (0809) ====================
  'pku::0809': {
    reportRatio: '10:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 12, actualEnrollment2026: 13, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211电子/物理背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+半导体物理/微电子器件（各校自命题）',
    remarks: '北大微电子/集成电路方向全国领先，芯片设计/EDA/半导体制造就业火热',
  },
  'uestc::0809': {
    reportRatio: '6:1', reexamScore2026: 335, reexamScore2025: 330, admitScore2026: 345,
    plannedEnrollment2026: 50, actualEnrollment2026: 55, recommendedEnrollment2026: 25,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+半导体物理/电磁场等方向专业课',
    remarks: '电子科大电子科学与技术全国前三，成都集成电路/面板产业聚集，芯片就业强势',
  },

  // ==================== 信息与通信工程 (0810) ====================
  'bupt::0810': {
    reportRatio: '8:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 40, actualEnrollment2026: 45, recommendedEnrollment2026: 20,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+通信原理/信号与系统（各校自命题）',
    remarks: '北邮通信全国前二，5G/6G/光通信方向强，三大运营商/华为/中兴定点招聘',
  },
  'uestc::0810': {
    reportRatio: '7:1', reexamScore2026: 335, reexamScore2025: 330, admitScore2026: 345,
    plannedEnrollment2026: 45, actualEnrollment2026: 50, recommendedEnrollment2026: 22,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数一+通信原理/信号与系统',
    remarks: '电子科大通信与信息系统全国前三，成都IT通信产业发达，华为/中兴大量录用',
  },

  // ==================== 控制科学与工程 (0811) ====================
  'tsinghua::0811': {
    reportRatio: '9:1', reexamScore2026: 360, reexamScore2025: 355, admitScore2026: 370,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211自动化/电气背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+自动控制原理/现代控制理论',
    remarks: '清华自动化全国第一，智能控制/机器人/无人系统方向领先，自动驾驶/机器人就业',
  },
  'sjtu::0811': {
    reportRatio: '7:1', reexamScore2026: 350, reexamScore2025: 345, admitScore2026: 360,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211工科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+自动控制原理',
    remarks: '上交自动化全国前二，机器人/工业智能/自动驾驶方向突出，上海智造就业好',
  },

  // ==================== 材料科学与工程 (0805) ====================
  'tsinghua::0805': {
    reportRatio: '7:1', reexamScore2026: 345, reexamScore2025: 340, admitScore2026: 355,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211材料/化学/物理背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数二+材料科学基础/物理化学（各校自命题）',
    remarks: '清华材料全国第一，新能源材料/纳米材料/电子信息材料领先，半导体/新能源就业',
  },
  'ustc::0805': {
    reportRatio: '5:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 340,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好理工背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数二+材料科学基础',
    remarks: '中科大材料以功能材料/量子材料见长，学术与半导体/新能源产业通吃',
  },

  // ==================== 环境科学与工程 (0830) ====================
  'tsinghua::0830': {
    reportRatio: '5:1', reexamScore2026: 335, reexamScore2025: 330, admitScore2026: 345,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好环境/化学/生物/工程背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数二+环境学综合/环境工程原理（各校自命题）',
    remarks: '清华环境全国第一，水处理/大气/固废/双碳方向全领先，环保部/设计院/新能源就业',
  },
  'tongji::0830': {
    reportRatio: '4:1', reexamScore2026: 325, reexamScore2025: 320, admitScore2026: 335,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数二+环境工程综合',
    remarks: '同济环境全国前三，水处理/固废/环境规划管理特色，长三角环保就业优势',
  },

  // ==================== 公共管理 学硕 (1204) ====================
  'pku::1204': {
    reportRatio: '10:1', reexamScore2026: 365, reexamScore2025: 360, admitScore2026: 375,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 7,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211管理/经济/政治背景', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '公共管理综合（各校自命题），部分方向不考数学',
    remarks: '北大公管全国第一，公共政策/城市治理方向领先，定向选调/智库/国际组织就业',
  },
  'ruc::1204': {
    reportRatio: '8:1', reexamScore2026: 355, reexamScore2025: 350, admitScore2026: 365,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '公共管理综合+经济学基础',
    remarks: '人大公管全国前二，行政管理/社会保障/土地资源管理特色，公务员/事业单位首选',
  },

  // ==================== 工商管理 学硕 (1202) ====================
  'pku::1202': {
    reportRatio: '12:1', reexamScore2026: 370, reexamScore2025: 365, admitScore2026: 380,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 7,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211经管背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+管理学原理/微观经济学（各校自命题）',
    remarks: '北大光华管理学院是全国管理学殿堂，战略/营销/组织行为各方向顶尖',
  },
  'ruc::1202': {
    reportRatio: '8:1', reexamScore2026: 360, reexamScore2025: 355, admitScore2026: 370,
    plannedEnrollment2026: 12, actualEnrollment2026: 13, recommendedEnrollment2026: 7,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+管理学综合',
    remarks: '人大商院企业管理全国前二，人力资源/市场营销特色鲜明，国企/互联网大厂就业',
  },

  // ==================== 应用经济学 (0202/0201) ====================
  'pku::0201': {
    reportRatio: '15:1', reexamScore2026: 375, reexamScore2025: 370, admitScore2026: 385,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 7,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211经济/数学背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+经济学综合（微观+宏观+政经）',
    remarks: '北大经济学院/国发院经济学全国第一，学术/金融/部委就业三栖通吃',
  },
  'ruc::0201': {
    reportRatio: '12:1', reexamScore2026: 365, reexamScore2025: 360, admitScore2026: 375,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+经济学综合',
    remarks: '人大经济学全国前二，政治经济学/西方经济学/世界经济均强，学术/政策研究并重',
  },

  // ==================== 药学 (1007) ====================
  'pku::1007': {
    reportRatio: '6:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 340,
    plannedEnrollment2026: 15, actualEnrollment2026: 16, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求药学/化学/生物/医学本科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '药学综合（有机化学+药理学+药剂学），各校自命题',
    remarks: '北大药学院全国顶尖，药物化学/药剂学/药理学领先，制药企业/药审中心就业',
  },
  'scu::1007': {
    reportRatio: '4:1', reexamScore2026: 315, reexamScore2025: 310, admitScore2026: 325,
    plannedEnrollment2026: 25, actualEnrollment2026: 28, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '要求医药/化学背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '药学综合',
    remarks: '川大华西药学院全国前三，天然药物化学/临床药学特色，西南地区药学就业龙头',
  },

  // ==================== 农学/作物学 (0901) ====================
  'cau::0901': {
    reportRatio: '3:1', reexamScore2026: 280, reexamScore2025: 275, admitScore2026: 290,
    plannedEnrollment2026: 30, actualEnrollment2026: 33, recommendedEnrollment2026: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '偏好农学/生物/植保等背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '数农/化学农（二选一）+植物生理学/作物育种学',
    remarks: '中国农大作物学全国第一，玉米/小麦/水稻育种国重实验室，中化/种业/农业部门就业',
  },
  'njau::0901': {
    reportRatio: '2:1', reexamScore2026: 270, reexamScore2025: 265, admitScore2026: 280,
    plannedEnrollment2026: 35, actualEnrollment2026: 40, recommendedEnrollment2026: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '农业知识综合+专业课',
    remarks: '南京农大作物学/农业资源利用全国前三，长三角农业科研/生物育种就业',
  },

  // ==================== 兽医学 (0906) ====================
  'cau::0906': {
    reportRatio: '2:1', reexamScore2026: 275, reexamScore2025: 270, admitScore2026: 285,
    plannedEnrollment2026: 20, actualEnrollment2026: 22, recommendedEnrollment2026: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '要求动物医学/动物科学本科背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '动物生理生化+兽医综合',
    remarks: '中国农大兽医学全国第一，动物疫病防控/兽医公共卫生领先，养殖/检疫/宠物医疗就业',
  },

  // ==================== 生态学 (0713) ====================
  'pku::0713': {
    reportRatio: '4:1', reexamScore2026: 330, reexamScore2025: 325, admitScore2026: 340,
    plannedEnrollment2026: 10, actualEnrollment2026: 11, recommendedEnrollment2026: 6,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好生物/环境/地理等理科背景', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '生态学基础+基础生物学/环境科学（各校自命题）',
    remarks: '北大生态学全国顶尖，全球变化/生物多样性保护方向领先，环保/碳中和方向就业',
  },

  // ==================== 金融专硕 (0251) ====================
  'pku::0251': {
    reportRatio: '30:1', reexamScore2026: 425, reexamScore2025: 420, admitScore2026: 435,
    plannedEnrollment2026: 40, actualEnrollment2026: 42, recommendedEnrollment2026: 20,
    tuitionWan: '18.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '偏好985/211，双非极难', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数三或396+431金融学综合',
    remarks: '北大光华/经院金融专硕全国最难考，毕业生进顶级投行/PEVC/公募基金',
  },
  'fdu::0251': {
    reportRatio: '20:1', reexamScore2026: 410, reexamScore2025: 405, admitScore2026: 420,
    plannedEnrollment2026: 50, actualEnrollment2026: 55, recommendedEnrollment2026: 25,
    tuitionWan: '16.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数三或396+431金融学综合',
    remarks: '复旦泛海/经院金融专硕上海最强，陆家嘴金融机构定点招聘，量化/投行方向就业',
  },

  // ==================== 护理学 (1054) ====================
  'pku::1054': {
    reportRatio: '2:1', reexamScore2026: 290, reexamScore2025: 285, admitScore2026: 300,
    plannedEnrollment2026: 10, actualEnrollment2026: 12, recommendedEnrollment2026: 5,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: true,
    undergradRestriction: '要求护理学本科背景', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '308护理综合',
    remarks: '北大护理学院全国第一，三甲医院护理管理/护理教育就业稳定，老龄化社会需求大',
  },
};

// 获取某个院校某个专业的详细数据
export function getProgramDetail(universityId: string, majorId: string): ProgramDetail | undefined {
  return programDetails[`${universityId}::${majorId}`];
}
