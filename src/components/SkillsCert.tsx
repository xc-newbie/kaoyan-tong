import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import type { Skills, DisciplineCategory } from '../types';

const progLanguages = ['Python', 'R', 'SQL', 'Java', 'Scala'] as const;

// ===== 证书组 =====
const techCerts = [
  '软考-初级', '软考-中级', '软考-高级',
  '阿里云ACA', '阿里云ACP', '阿里云ACE',
  '华为HCIA', '华为HCIP', '华为HCIE',
  'CDA数据分析师', 'CDMP数据管理',
  'AWS/谷歌云认证', 'K8s管理员(CKA)',
];

const bizCerts = [
  'PMP项目管理', 'CPA注册会计师', 'CFA特许金融分析师',
  'FRM金融风险管理师', 'ACCA国际注册会计师',
  '初级/中级会计职称', '证券从业资格证', '基金从业资格证',
];

const libArtsCerts = [
  '教师资格证', '翻译资格证书(CATTI)', '普通话等级证书',
  '人力资源管理师', '心理咨询师', '社会工作师',
  '法律职业资格证', '记者证/编辑证',
];

const medicalCerts = [
  '执业医师资格证', '执业药师资格证', '护士执业证',
  '健康管理师', '营养师', '心理咨询师',
  '公共卫生执业医师', '康复治疗师',
];

const agriCerts = ['执业兽医师', '农艺师', '园艺师', '林业工程师'];

const designCerts = ['Adobe认证设计师', 'ACAA中国数字艺术设计师', 'NACG数字艺术证书', '建筑/室内设计师资格证'];

const commonCerts = [
  '英语六级(550+)', '雅思/托福', '计算机二级',
  '驾驶证', '急救证',
];

function getCertsForCategory(cat: DisciplineCategory | null): string[] {
  if (!cat) return [...techCerts, ...bizCerts, ...libArtsCerts, ...medicalCerts, ...agriCerts, ...commonCerts];
  switch (cat) {
    case 'engineering': return [...techCerts, ...commonCerts];
    case 'science': return [...techCerts, ...commonCerts, ...medicalCerts];
    case 'management': return [...bizCerts, ...techCerts, ...commonCerts];
    case 'economics': return [...bizCerts, ...techCerts, ...commonCerts];
    case 'liberalArts': return [...libArtsCerts, ...commonCerts];
    case 'law': return [...libArtsCerts, ...commonCerts];
    case 'education': return [...libArtsCerts, ...commonCerts];
    case 'philosophy': return [...libArtsCerts, ...commonCerts];
    case 'history': return [...libArtsCerts, ...commonCerts];
    case 'medical': return [...medicalCerts, ...commonCerts];
    case 'agriculture': return [...agriCerts, ...commonCerts, ...bizCerts];
    case 'art': return [...designCerts, ...commonCerts, ...libArtsCerts];
    default: return [...techCerts, ...bizCerts, ...libArtsCerts, ...commonCerts];
  }
}

// ===== 工具组 =====
const bigDataTools = ['Hadoop', 'Spark', 'Flink', 'Hive', 'Kafka', 'HBase', 'Elasticsearch', 'ClickHouse', 'Airflow', 'DolphinScheduler'];
const aiMlTools = ['TensorFlow', 'PyTorch', 'Scikit-learn', 'PaddlePaddle', 'Keras', 'XGBoost', 'LangChain', 'HuggingFace'];
const vizTools = ['Tableau', 'Power BI', 'ECharts', 'FineBI', 'Superset', 'D3.js'];

const labTools = ['SPSS', 'SAS', 'Stata', 'R语言', 'Origin', 'GraphPad Prism', 'ImageJ', 'MATLAB', 'Python(生物信息)', 'BLAST', 'Cytoscape'];
const bioinfoTools = ['NCBI数据库', 'UCSC Genome Browser', 'Galaxy', 'Bioconductor', 'GATK', 'STAR', 'StringTie'];
const chemTools = ['ChemDraw', 'Gaussian', 'VMD', 'PyMOL', 'Materials Studio', 'AutoDock'];

const analysisTools = ['Excel(高级)', 'SPSS', 'Stata', 'EViews', 'MATLAB', 'Python(数据分析)', 'Tableau', 'Power BI'];
const financeTools = ['Wind金融终端', 'Bloomberg Terminal', 'Choice数据', 'iFinD'];

const writingTools = ['LaTeX', 'Markdown', 'Scrivener', 'Zotero', 'EndNote', 'NVivo', 'AntConc'];
const languageTools = ['CAT工具(Trados)', 'MemoQ', '语料库工具(AntConc)', '字幕翻译工具'];

const designTools = ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'Adobe XD', 'Blender', 'AutoCAD', 'Rhino', 'SketchUp', 'Premiere Pro', 'After Effects'];

type SkillField = 'bigData' | 'aiMl' | 'visualization';

interface ToolGroup { label: string; items: string[]; field: SkillField; }

function getToolGroups(cat: DisciplineCategory | null): ToolGroup[] {
  if (!cat) return [
    { label: '编程语言', items: [...progLanguages], field: 'bigData' },
    { label: '大数据技术栈', items: bigDataTools, field: 'bigData' },
    { label: 'AI/ML框架', items: aiMlTools, field: 'aiMl' },
    { label: '可视化/BI工具', items: vizTools, field: 'visualization' },
    { label: '实验室/科研工具', items: labTools, field: 'bigData' },
    { label: '分析工具', items: analysisTools, field: 'visualization' },
    { label: '设计工具', items: designTools, field: 'visualization' },
  ];
  switch (cat) {
    case 'engineering': return [
      { label: '大数据技术栈（熟悉的选上）', items: bigDataTools, field: 'bigData' },
      { label: 'AI / 机器学习框架（熟悉的选上）', items: aiMlTools, field: 'aiMl' },
      { label: '可视化 / BI 工具（熟悉的选上）', items: vizTools, field: 'visualization' },
    ];
    case 'science': return [
      { label: '实验室/科研工具（熟悉的选上）', items: labTools, field: 'bigData' },
      { label: '生物信息学工具（熟悉的选上）', items: bioinfoTools, field: 'aiMl' },
      { label: '化学计算工具（熟悉的选上）', items: chemTools, field: 'aiMl' },
      { label: '数据分析与可视化（熟悉的选上）', items: [...analysisTools.slice(0, 6)], field: 'visualization' },
    ];
    case 'management': case 'economics': return [
      { label: '分析工具（熟悉的选上）', items: analysisTools, field: 'visualization' },
      { label: '金融数据终端（熟悉的选上）', items: financeTools, field: 'aiMl' },
      { label: '可视化 / BI 工具（熟悉的选上）', items: vizTools, field: 'visualization' },
    ];
    case 'liberalArts': case 'law': case 'education': case 'philosophy': case 'history': return [
      { label: '写作与文献管理工具（熟悉的选上）', items: writingTools, field: 'bigData' },
      { label: '语言/翻译工具（熟悉的选上）', items: languageTools, field: 'aiMl' },
    ];
    case 'medical': return [
      { label: '医学统计与科研工具（熟悉的选上）', items: labTools, field: 'bigData' },
      { label: '生物信息学工具（熟悉的选上）', items: bioinfoTools, field: 'aiMl' },
    ];
    case 'agriculture': return [
      { label: '科研与统计工具（熟悉的选上）', items: labTools.slice(0, 8), field: 'bigData' },
      { label: '数据分析工具（熟悉的选上）', items: analysisTools.slice(0, 4), field: 'visualization' },
    ];
    case 'art': return [
      { label: '设计/创意工具（熟悉的选上）', items: designTools, field: 'visualization' },
      { label: '写作与管理工具（熟悉的选上）', items: writingTools.slice(0, 4), field: 'bigData' },
    ];
    default: return [
      { label: '大数据技术栈', items: bigDataTools, field: 'bigData' },
      { label: 'AI/ML框架', items: aiMlTools, field: 'aiMl' },
      { label: '可视化/BI工具', items: vizTools, field: 'visualization' },
    ];
  }
}

function showProgrammingFor(cat: DisciplineCategory | null): boolean {
  if (!cat) return true;
  return ['engineering', 'science', 'management', 'economics'].includes(cat);
}

function getProgrammingLanguages(cat: DisciplineCategory | null): readonly string[] {
  if (!cat || cat === 'engineering' || cat === 'science') return progLanguages;
  if (cat === 'management' || cat === 'economics') return ['Python', 'SQL', 'R'] as const;
  return progLanguages;
}

export default function SkillsCert() {
  const { state, dispatch } = useAppState();
  const saved = state.userProfile.skills || {} as Partial<Skills>;
  const detectedCategory = state.detectedCategory;

  const [progLevels, setProgLevels] = useState(
    saved.programming || { python: 0, r: 0, sql: 0, java: 0, scala: 0 }
  );
  const [bigData, setBigData] = useState<string[]>(saved.bigData || []);
  const [aiMl, setAiMl] = useState<string[]>(saved.aiMl || []);
  const [viz, setViz] = useState<string[]>(saved.visualization || []);
  const [certs, setCerts] = useState<string[]>(saved.certificates || []);

  const certOptions = getCertsForCategory(detectedCategory);
  const toolGroups = useMemo(() => getToolGroups(detectedCategory), [detectedCategory]);
  const showProg = showProgrammingFor(detectedCategory);
  const progLangs = useMemo(() => getProgrammingLanguages(detectedCategory), [detectedCategory]);

  const getToolState = (field: SkillField) => {
    switch (field) {
      case 'bigData': return { selected: bigData, set: setBigData };
      case 'aiMl': return { selected: aiMl, set: setAiMl };
      case 'visualization': return { selected: viz, set: setViz };
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: {
        programming: progLevels,
        bigData,
        aiMl,
        visualization: viz,
        certificates: certs,
      },
    });
    dispatch({ type: 'SET_STEP', payload: 'preferences' });
  };

  const chipGroup = (
    label: string,
    items: string[],
    selected: string[],
    toggle: (item: string) => void
  ) => (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(item)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
              selected.includes(item)
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        技能与证书
        {detectedCategory && (
          <span className="text-xs text-gray-400 font-normal ml-2">
            —— 已根据你的专业类型定制选项
          </span>
        )}
      </h2>

      {/* 编程语言熟练度 */}
      {showProg && (
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            编程语言掌握程度（0=零基础, 5=精通）
          </label>
          <div className="flex flex-col gap-1.5">
            {progLangs.map((lang) => (
              <div key={lang} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16 text-right">{lang}</span>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setProgLevels((prev) => ({ ...prev, [lang.toLowerCase()]: n }))
                      }
                      className={`w-5 h-5 rounded text-xs font-medium transition-colors ${
                        n <= (progLevels[lang.toLowerCase() as keyof typeof progLevels] || 0)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 动态工具组 */}
      {toolGroups.map((group) => {
        const { selected, set } = getToolState(group.field);
        return (
          <div key={group.label}>
            {chipGroup(
              group.label,
              group.items,
              selected,
              (item) => set((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item])
            )}
          </div>
        );
      })}

      {/* 证书 */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          专业证书（已获得的选上）
          {detectedCategory && <span className="text-xs text-indigo-400 ml-1">—— 已按专业类型筛选</span>}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {certOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                setCerts((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))
              }
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                certs.includes(c)
                  ? 'bg-amber-50 text-amber-600 border border-amber-300 shadow-sm'
                  : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'academicProfile' })}
          className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
        >
          下一步：报考偏好
        </button>
      </div>
    </div>
  );
}
