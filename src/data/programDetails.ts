import type { ProgramDetail } from '../types';

// 院校-专业详细考研数据
// key: `${universityId}::${majorId}`
export const programDetails: Record<string, ProgramDetail> = {
  // ==================== 199管理类联考 — 图书情报专硕 (1255) ====================
  'whu::1255': {
    reportRatio: '6:1', reexamScore2025: 230, reexamScore2024: 225, admitScore2025: 235,
    plannedEnrollment2025: 18, actualEnrollment2025: 20, recommendedEnrollment2025: 8,
    tuitionWan: '3.6万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制，接受跨考', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二，复试含信息检索笔试',
    remarks: '武大信管院图情全国Top2，就业面极广，图书馆/互联网/公务员均通吃',
  },
  'nju::1255': {
    reportRatio: '7:1', reexamScore2025: 225, reexamScore2024: 220, admitScore2025: 230,
    plannedEnrollment2025: 15, actualEnrollment2025: 15, recommendedEnrollment2025: 10,
    tuitionWan: '3万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南大信管全国前三，情报学方向尤其强势，毕业后江浙沪就业认可度高',
  },
  'ruc::1255': {
    reportRatio: '8:1', reexamScore2025: 235, reexamScore2024: 230, admitScore2025: 240,
    plannedEnrollment2025: 12, actualEnrollment2025: 14, recommendedEnrollment2025: 6,
    tuitionWan: '4.2万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二，复试含信息资源管理综合',
    remarks: '人大信管全国排名前列，北京就业区位优势明显，体制内就业比例高',
  },
  'nankai::1255': {
    reportRatio: '5:1', reexamScore2025: 215, reexamScore2024: 210, admitScore2025: 220,
    plannedEnrollment2025: 10, actualEnrollment2025: 12, recommendedEnrollment2025: 5,
    tuitionWan: '3万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南开图书情报专硕报考热度适中，性价比高，天津就业区位好',
  },
  'sysu::1255': {
    reportRatio: '6:1', reexamScore2025: 220, reexamScore2024: 215, admitScore2025: 225,
    plannedEnrollment2025: 12, actualEnrollment2025: 12, recommendedEnrollment2025: 6,
    tuitionWan: '4.5万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '中山大学信管在华南地区排名第一，广州深圳就业机会多',
  },
  'ccnu::1255': {
    reportRatio: '4:1', reexamScore2025: 205, reexamScore2024: 200, admitScore2025: 210,
    plannedEnrollment2025: 20, actualEnrollment2025: 22, recommendedEnrollment2025: 4,
    tuitionWan: '2.4万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '华中师大图情专硕招生人数多，上岸概率大，211院校性价比之选',
  },

  // ==================== 会计专硕 (1253) ====================
  'pku::1253': {
    reportRatio: '25:1', reexamScore2025: 260, reexamScore2024: 255, admitScore2025: 265,
    plannedEnrollment2025: 30, actualEnrollment2025: 32, recommendedEnrollment2025: 15,
    tuitionWan: '15.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '不卡本科但985/211占绝大多数', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '199管综+英二，复试含专业综合笔试+面试',
    remarks: '北大光华MPAcc全国最难考，毕业生进投行/券商/四大核心岗位',
  },
  'ruc::1253': {
    reportRatio: '20:1', reexamScore2025: 255, reexamScore2024: 250, admitScore2025: 260,
    plannedEnrollment2025: 25, actualEnrollment2025: 28, recommendedEnrollment2025: 12,
    tuitionWan: '12.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '人大会计与厦大并列全国第一，北京区位优势，体制内外双通',
  },
  'swufe::1253': {
    reportRatio: '12:1', reexamScore2025: 245, reexamScore2024: 240, admitScore2025: 250,
    plannedEnrollment2025: 80, actualEnrollment2025: 85, recommendedEnrollment2025: 30,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '西南财经会计全国顶尖，招生人数多，财经类就业认可度极高',
  },
  'cueb::1253': {
    reportRatio: '8:1', reexamScore2025: 230, reexamScore2024: 225, admitScore2025: 235,
    plannedEnrollment2025: 60, actualEnrollment2025: 65, recommendedEnrollment2025: 20,
    tuitionWan: '8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '首都经贸会计学实力强，北京就业好，双非中性价比最高的会计专硕之一',
  },
  'shufe::1253': {
    reportRatio: '15:1', reexamScore2025: 248, reexamScore2024: 242, admitScore2025: 253,
    plannedEnrollment2025: 45, actualEnrollment2025: 50, recommendedEnrollment2025: 20,
    tuitionWan: '13.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '上财会计全国Top3，上海金融中心区位，四大/投行目标院校',
  },

  // ==================== 审计专硕 (0257) ====================
  'nau::0257': {
    reportRatio: '5:1', reexamScore2025: 220, reexamScore2024: 215, admitScore2025: 225,
    plannedEnrollment2025: 30, actualEnrollment2025: 32, recommendedEnrollment2025: 8,
    tuitionWan: '5万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '南京审计大学是审计专硕第一选择，审计署/四大审计岗目标院校',
  },
  'swufe::0257': {
    reportRatio: '8:1', reexamScore2025: 235, reexamScore2024: 230, admitScore2025: 240,
    plannedEnrollment2025: 20, actualEnrollment2025: 22, recommendedEnrollment2025: 10,
    tuitionWan: '6.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '西财审计与会计并重发展，西南地区审计就业独占鳌头',
  },

  // ==================== MPA 公共管理专硕 (1252) ====================
  'pku::1252': {
    reportRatio: '15:1', reexamScore2025: 210, reexamScore2024: 205, admitScore2025: 215,
    plannedEnrollment2025: 200, actualEnrollment2025: 210, recommendedEnrollment2025: 0,
    tuitionWan: '12.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制，需本科毕业满3年', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '199管综+英二，非全日制为主',
    remarks: '北大MPA全国最难考，党政机关/国企管理人员集中，人脉资源极强',
  },
  'ruc::1252': {
    reportRatio: '12:1', reexamScore2025: 200, reexamScore2024: 195, admitScore2025: 205,
    plannedEnrollment2025: 250, actualEnrollment2025: 260, recommendedEnrollment2025: 0,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制，需本科毕业满3年', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '人大公共管理全国第一，公务员和事业单位人员深造首选',
  },
  'fdu::1252': {
    reportRatio: '10:1', reexamScore2025: 205, reexamScore2024: 200, admitScore2025: 210,
    plannedEnrollment2025: 180, actualEnrollment2025: 185, recommendedEnrollment2025: 0,
    tuitionWan: '10.8万/全程', durationYears: 2, acceptEquivalent: true,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二',
    remarks: '复旦MPA上海地区最强，长三角公务员/事业单位深造标杆',
  },

  // ==================== MEM 工程管理专硕 (1256) ====================
  'tsinghua::1256': {
    reportRatio: '8:1', reexamScore2025: 195, reexamScore2024: 190, admitScore2025: 200,
    plannedEnrollment2025: 120, actualEnrollment2025: 125, recommendedEnrollment2025: 0,
    tuitionWan: '16.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制，部分方向需工作经验', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '199管综+英二，部分方向需提前面试',
    remarks: '清华MEM全国最强，大数据与商业分析方向最受欢迎，IT行业就业优势突出',
  },
  'buaa::1256': {
    reportRatio: '6:1', reexamScore2025: 185, reexamScore2024: 180, admitScore2025: 190,
    plannedEnrollment2025: 80, actualEnrollment2025: 82, recommendedEnrollment2025: 0,
    tuitionWan: '9.8万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '无限制', protectFirstChoice: true,
    reexamWeight: 30, examNotes: '199管综+英二',
    remarks: '北航MEM在航空航天和IT项目管理方向有特色优势，北京就业面广',
  },

  // ==================== 计算机学硕 (0812) ====================
  'tsinghua::0812': {
    reportRatio: '30:1', reexamScore2025: 375, reexamScore2024: 370, admitScore2025: 385,
    plannedEnrollment2025: 20, actualEnrollment2025: 22, recommendedEnrollment2025: 15,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211，双非极难', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数一+408计算机学科专业基础综合',
    remarks: '清华计算机全国第一，毕业生进顶级互联网/量化/自动驾驶',
  },
  'pku::0812': {
    reportRatio: '35:1', reexamScore2025: 380, reexamScore2024: 375, admitScore2025: 390,
    plannedEnrollment2025: 15, actualEnrollment2025: 16, recommendedEnrollment2025: 12,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '数一+408统考',
    remarks: '北大计算机+智能学院双品牌，学术和就业双向碾压',
  },

  // ==================== 软件工程专硕 (085410) ====================
  'zju::085410': {
    reportRatio: '15:1', reexamScore2025: 360, reexamScore2024: 355, admitScore2025: 368,
    plannedEnrollment2025: 60, actualEnrollment2025: 65, recommendedEnrollment2025: 30,
    tuitionWan: '4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '无硬性限制', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数一+408统考',
    remarks: '浙大软院在杭州互联网圈认可度极高，阿里/蚂蚁/网易近水楼台',
  },

  // ==================== 数据科学交叉 (14ds) ====================
  'tsinghua::14ds': {
    reportRatio: '20:1', reexamScore2025: 370, reexamScore2024: 365, admitScore2025: 378,
    plannedEnrollment2025: 10, actualEnrollment2025: 12, recommendedEnrollment2025: 8,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '各校自命题，多考数一+数据科学综合',
    remarks: '清华数据科学为全国首创，进可攻博退可互联网数据岗',
  },

  // ==================== 应用统计专硕 (0252) ====================
  'pku::0252': {
    reportRatio: '18:1', reexamScore2025: 420, reexamScore2024: 415, admitScore2025: 428,
    plannedEnrollment2025: 15, actualEnrollment2025: 16, recommendedEnrollment2025: 10,
    tuitionWan: '10万/全程', durationYears: 2, acceptEquivalent: false,
    undergradRestriction: '偏好985/211', protectFirstChoice: true,
    reexamWeight: 35, examNotes: '数三+432统计学',
    remarks: '北大应统分数线常年全专业最高，毕业生进量化/互联网DS/药企统计',
  },

  // ==================== 临床医学专硕 (1051) ====================
  'fdu::1051': {
    reportRatio: '10:1', reexamScore2025: 345, reexamScore2024: 340, admitScore2025: 355,
    plannedEnrollment2025: 60, actualEnrollment2025: 62, recommendedEnrollment2025: 25,
    tuitionWan: '3.6万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '要求医学本科背景，非医学不得跨考', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '306临床医学综合（西医）',
    remarks: '复旦医学院全国Top3，附属医院多（中山/华山/肿瘤），规培+就业一体化',
  },

  // ==================== 法学学硕 (0301) ====================
  'pku::0301': {
    reportRatio: '25:1', reexamScore2025: 380, reexamScore2024: 375, admitScore2025: 390,
    plannedEnrollment2025: 15, actualEnrollment2025: 16, recommendedEnrollment2025: 10,
    tuitionWan: '2.4万/全程', durationYears: 3, acceptEquivalent: false,
    undergradRestriction: '偏好985/211法本，非法本建议考法硕（非法学）', protectFirstChoice: true,
    reexamWeight: 40, examNotes: '学硕各方向自命题，法硕全国联考',
    remarks: '北大法学全国第一，毕业生进红圈所/最高法/部委比例极高',
  },
};

// 获取某个院校某个专业的详细数据
export function getProgramDetail(universityId: string, majorId: string): ProgramDetail | undefined {
  return programDetails[`${universityId}::${majorId}`];
}
