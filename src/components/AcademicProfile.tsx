import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import type { AcademicProfile as AP, CompetitionLevel, InternshipType, PaperLevel, ResearchLevel, DisciplineCategory } from '../types';

const researchOptions: { value: ResearchLevel; label: string }[] = [
  { value: 'national', label: '国家级项目' },
  { value: 'provincial', label: '省级项目' },
  { value: 'school', label: '校级项目' },
  { value: 'none', label: '无' },
];

const paperOptions: { value: PaperLevel; label: string }[] = [
  { value: 'sci_q1q2', label: 'SCI一区/二区' },
  { value: 'ei', label: 'EI收录' },
  { value: 'chinese_core', label: '中文核心期刊' },
  { value: 'general', label: '普通期刊' },
  { value: 'none', label: '无发表' },
];

const compOptions: { value: CompetitionLevel; label: string }[] = [
  { value: 'international', label: '国际级' },
  { value: 'national', label: '国家级' },
  { value: 'provincial', label: '省级' },
  { value: 'school', label: '校级' },
  { value: 'none', label: '无' },
];

function getCompTypes(cat: DisciplineCategory | null): string[] {
  if (!cat) return ['ACM-ICPC/CCPC', '数学建模（国赛）', '数学建模（美赛）', '蓝桥杯', '大创/大学生创新创业', '互联网+', '挑战杯', '全国大学生数学竞赛', 'Kaggle/数据竞赛', '全国大学生英语竞赛', '辩论赛', '其他竞赛'];
  switch (cat) {
    case 'engineering': return ['ACM-ICPC/CCPC', '数学建模（国赛）', '数学建模（美赛）', '蓝桥杯', '互联网+', '挑战杯', 'Kaggle/数据竞赛', '黑客马拉松', '全国大学生数学竞赛', '电子设计大赛', '机器人大赛', '天池大数据竞赛', '其他竞赛'];
    case 'science': return ['数学建模（国赛）', '数学建模（美赛）', '全国大学生数学竞赛', '全国大学生化学实验竞赛', '全国大学生生命科学竞赛', 'iGEM国际遗传工程大赛', '挑战杯', '互联网+', '全国大学生物理实验竞赛', '其他竞赛'];
    case 'medical': return ['全国大学生基础医学创新论坛', '临床技能大赛', '药学/中药学专业技能大赛', '挑战杯', '大学生医学技术技能大赛', '护理技能大赛', '公共卫生案例大赛', '其他竞赛'];
    case 'liberalArts': case 'law': case 'education': return ['全国大学生英语竞赛', '全国大学生广告艺术大赛', '外研社杯英语演讲/辩论', '辩论赛', '模拟法庭', '师范生教学技能竞赛', '挑战杯', '互联网+', '其他竞赛'];
    case 'management': case 'economics': return ['挑战杯', '互联网+', '全国大学生创业综合模拟大赛', 'ERP沙盘模拟', '市场调查与分析大赛', 'CFA全球投资分析大赛', '数学建模（国赛）', '全国大学生英语竞赛', '其他竞赛'];
    case 'agriculture': return ['全国大学生生命科学竞赛', '挑战杯', '互联网+', '植物/动物科学技能大赛', '全国大学生农学创新大赛', '生物竞赛', '其他竞赛'];
    default: return ['ACM-ICPC/CCPC', '数学建模（国赛）', '数学建模（美赛）', '互联网+', '挑战杯', '全国大学生英语竞赛', '其他竞赛'];
  }
}

function getInternshipOptions(cat: DisciplineCategory | null): { value: InternshipType; label: string }[] {
  if (!cat || cat === 'engineering' || cat === 'science') {
    return [
      { value: 'big_tech', label: '大厂技术岗（BAT/TMD/华为等）' },
      { value: 'mid_tech', label: '中厂技术岗' },
      { value: 'small_tech', label: '小厂/创业公司技术岗' },
      { value: 'non_tech', label: '非技术岗' },
      { value: 'none', label: '无实习经历' },
    ];
  }
  if (cat === 'management' || cat === 'economics') {
    return [
      { value: 'big_tech', label: '四大会计师事务所/投行/咨询' },
      { value: 'mid_tech', label: '银行/券商/基金' },
      { value: 'small_tech', label: '企业财务/管培生' },
      { value: 'non_tech', label: '互联网非技术岗（产品/运营）' },
      { value: 'none', label: '无实习经历' },
    ];
  }
  if (cat === 'liberalArts' || cat === 'law' || cat === 'education') {
    return [
      { value: 'big_tech', label: '主流媒体/知名律所/重点学校' },
      { value: 'mid_tech', label: '出版社/法务部/教育机构' },
      { value: 'small_tech', label: 'NGO/国际组织/政府部门' },
      { value: 'non_tech', label: '新媒体运营/文案策划' },
      { value: 'none', label: '无实习经历' },
    ];
  }
  if (cat === 'medical') {
    return [
      { value: 'big_tech', label: '三甲医院' },
      { value: 'mid_tech', label: '疾控中心/药企研发' },
      { value: 'small_tech', label: '医疗器械公司/社区医院' },
      { value: 'non_tech', label: '医学编辑/医药代表' },
      { value: 'none', label: '无实习经历' },
    ];
  }
  return [
    { value: 'big_tech', label: '大厂/重点单位' },
    { value: 'mid_tech', label: '中厂/普通单位' },
    { value: 'small_tech', label: '小厂/基层单位' },
    { value: 'non_tech', label: '非核心岗位' },
    { value: 'none', label: '无实习经历' },
  ];
}

function getExtrasOptions(cat: DisciplineCategory | null): string[] {
  const common = ['国家奖学金', '校级奖学金', '学生干部', '志愿者经历', '社会实践'];
  if (!cat) return ['发明专利', '软件著作权', ...common, '开源贡献/GitHub项目', '发表文章', '创业经历'];
  switch (cat) {
    case 'engineering': return ['发明专利', '软件著作权', ...common, '开源贡献/GitHub项目', '技术博客/公众号', '个人项目作品集', '线上课程证书(Coursera/慕课)'];
    case 'science': return ['发明专利', '软件著作权', ...common, '实验室技能认证', '论文预印本/在投', '田野调查/科考经验', '线上课程证书'];
    case 'medical': return ['发明专利', ...common, '临床见习经历', '执业资格备考中', '医学会议壁报', '实验室技能认证'];
    case 'liberalArts': case 'law': return [...common, '发表文章/作品', '新媒体账号运营', '翻译作品', '实习作品集'];
    case 'management': case 'economics': return ['发明专利', '软件著作权', ...common, '创业经历', '商业策划书', '行业分析报告'];
    case 'education': return [...common, '教师资格证备考中', '支教经历', '家教/辅导经验', '课程设计作品'];
    case 'agriculture': return ['发明专利', ...common, '田间实验经验', '养殖/种植实操', '农业相关资格证'];
    default: return ['发明专利', '软件著作权', ...common];
  }
}

export default function AcademicProfile() {
  const { state, dispatch } = useAppState();
  const saved = state.userProfile.academicProfile || {} as Partial<AP>;
  const detectedCategory = state.detectedCategory;

  const [research, setResearch] = useState<ResearchLevel>(saved.research || 'none');
  const [paper, setPaper] = useState<PaperLevel>(saved.paper || 'none');
  const [compLevel, setCompLevel] = useState<CompetitionLevel>(saved.competition?.level || 'none');
  const [compSelected, setCompSelected] = useState<string[]>(saved.competition?.types || []);
  const [internship, setInternship] = useState<InternshipType>(saved.internship || 'none');
  const [extras, setExtras] = useState<string[]>(saved.extras || []);

  const compTypes = useMemo(() => getCompTypes(detectedCategory), [detectedCategory]);
  const internshipOptions = useMemo(() => getInternshipOptions(detectedCategory), [detectedCategory]);
  const extrasOptions = useMemo(() => getExtrasOptions(detectedCategory), [detectedCategory]);

  const toggleComp = (t: string) =>
    setCompSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const toggleExtra = (t: string) =>
    setExtras((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ACADEMIC_PROFILE',
      payload: {
        research,
        paper,
        competition: { level: compLevel, types: compSelected },
        internship,
        extras,
      },
    });
    dispatch({ type: 'SET_STEP', payload: 'skills' });
  };

  const radioGroup = <T extends string>(
    label: string,
    options: { value: T; label: string }[],
    value: T,
    onChange: (v: T) => void
  ) => (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              value === o.value
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        学术科研经历
        {detectedCategory && (
          <span className="text-xs text-gray-400 font-normal ml-2">
            —— 已根据你的专业类型定制选项
          </span>
        )}
      </h2>

      {radioGroup('科研项目经历', researchOptions, research, setResearch)}
      {radioGroup('论文发表情况', paperOptions, paper, setPaper)}

      <div className="mb-4">
        {radioGroup('竞赛获奖最高级别', compOptions, compLevel, setCompLevel)}
        {compLevel !== 'none' && (
          <div className="mt-2 ml-1">
            <label className="block text-sm text-gray-500 mb-1">参与的竞赛类型（可多选）</label>
            <div className="flex flex-wrap gap-1.5">
              {compTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleComp(t)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    compSelected.includes(t)
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 shadow-sm'
                      : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {radioGroup('实习经历', internshipOptions, internship, setInternship)}

      {/* 其他加分项 */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">其他加分项（可多选）</label>
        <div className="flex flex-wrap gap-1.5">
          {extrasOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleExtra(t)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                extras.includes(t)
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 shadow-sm'
                  : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'basicInfo' })}
          className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
        >
          下一步：技能证书
        </button>
      </div>
    </div>
  );
}
