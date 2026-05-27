import { useState, useMemo } from 'react';
import { useAppState } from '../context/AppContext';
import { searchUniversities } from '../data/universitiesList';
import { searchUndergradMajors } from '../data/undergradMajors';
import type { UndergradMajor } from '../data/undergradMajors';
import { majors, getTargetMajorIdsByUndergrad, detectMajorCategory, majorCategoryMap } from '../data/majors';
import type { BasicInfo as BI, EnglishLevel, Grade, Gender, SelfAssessment, ValidationErrors } from '../types';
import { defaultSelfAssessment } from '../types';

const grades: { value: Grade; label: string }[] = [
  { value: 'freshman', label: '大一' },
  { value: 'sophomore', label: '大二' },
  { value: 'junior', label: '大三' },
  { value: 'senior', label: '大四/应届' },
  { value: 'graduate', label: '已毕业/往届' },
  { value: 'employed', label: '已工作' },
];

const englishLevels: { value: EnglishLevel; label: string }[] = [
  { value: 'cet4', label: 'CET-4' },
  { value: 'cet6', label: 'CET-6' },
  { value: 'ielts', label: '雅思' },
  { value: 'toefl', label: '托福' },
  { value: 'none', label: '暂无' },
];

export default function BasicInfo() {
  const { state, dispatch } = useAppState();
  const saved = state.userProfile.basicInfo || {} as Partial<BI>;

  const [name, setName] = useState(saved.name || '');
  const [gender, setGender] = useState<Gender | ''>(saved.gender || '');
  const [uni, setUni] = useState(saved.university || '');
  const [uniSuggestions, setUniSuggestions] = useState<ReturnType<typeof searchUniversities>>([]);
  const [major, setMajor] = useState(saved.major || '');
  const [majorSuggestions, setMajorSuggestions] = useState<UndergradMajor[]>([]);
  const [grade, setGrade] = useState<Grade | ''>(saved.grade || '');
  const [gpa, setGpa] = useState(saved.gpa || '');
  const [rank, setRank] = useState(saved.rank || '');
  const [engLevel, setEngLevel] = useState<EnglishLevel>(saved.english?.level || 'cet4');
  const [engScore, setEngScore] = useState(saved.english?.score || '');
  const [targetMajors, setTargetMajors] = useState<string[]>(saved.targetMajors || []);
  const [mathAdv, setMathAdv] = useState(saved.mathBasis?.advancedMath ?? 0);
  const [mathLin, setMathLin] = useState(saved.mathBasis?.linearAlgebra ?? 0);
  const [mathProb, setMathProb] = useState(saved.mathBasis?.probability ?? 0);
  const [progPython, setProgPython] = useState(saved.programmingBasis?.python ?? 0);
  const [progSql, setProgSql] = useState(saved.programmingBasis?.sql ?? 0);
  const [progJava, setProgJava] = useState(saved.programmingBasis?.java ?? 0);
  const [progR, setProgR] = useState(saved.programmingBasis?.r ?? 0);
  const [progCpp, setProgCpp] = useState(saved.programmingBasis?.cpp ?? 0);
  // 新增自评维度
  const [sa, setSa] = useState<SelfAssessment>(saved.selfAssessment || defaultSelfAssessment);
  // 验证错误
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  // 根据本科专业动态生成考研方向选项
  const recommendedMajorIds = useMemo(() => {
    if (!major.trim()) return majors.map((m) => m.id);
    return getTargetMajorIdsByUndergrad(major);
  }, [major]);

  const detectedCategory = useMemo(() => {
    if (!major.trim()) return null;
    const catId = detectMajorCategory(major);
    return catId ? majorCategoryMap[catId] : null;
  }, [major]);

  const recommendedMajors = useMemo(() => {
    return majors.filter((m) => recommendedMajorIds.includes(m.id));
  }, [recommendedMajorIds]);

  const groupedMajors = useMemo(() => {
    const groups: Record<string, typeof recommendedMajors> = {};
    for (const m of recommendedMajors) {
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    }
    return groups;
  }, [recommendedMajors]);

  const toggleCat = (cat: string) => {
    setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleUniChange = (val: string) => {
    setUni(val);
    if (val.trim()) setErrors((prev) => { const { university, ...rest } = prev; return rest; });
    setUniSuggestions(searchUniversities(val));
  };

  const handleMajorChange = (val: string) => {
    setMajor(val);
    if (val.trim()) setErrors((prev) => { const { major: _, ...rest } = prev; return rest; });
    setMajorSuggestions(searchUndergradMajors(val));
  };

  const toggleTargetMajor = (m: string) => {
    setTargetMajors((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const validate = (): boolean => {
    const errs: ValidationErrors = {};
    if (!name.trim()) errs.name = '请输入姓名';
    if (!gender) errs.gender = '请选择性别';
    if (!uni.trim()) errs.university = '请填写本科院校';
    if (!major.trim()) errs.major = '请填写本科专业';
    if (!grade) errs.grade = '请选择年级/阶段';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data: BI = {
      name,
      gender,
      university: uni,
      major,
      grade,
      gpa,
      rank,
      targetMajors,
      english: { level: engLevel, score: engScore },
      mathBasis: { advancedMath: mathAdv, linearAlgebra: mathLin, probability: mathProb },
      programmingBasis: { python: progPython, r: progR, sql: progSql, java: progJava, cpp: progCpp },
      selfAssessment: sa,
    };
    dispatch({ type: 'UPDATE_BASIC_INFO', payload: data });
    dispatch({ type: 'SET_STEP', payload: 'academicProfile' });
  };

  const ratingBar = (label: string, value: number, setValue: (v: number) => void) => {
    const levels = ['零基础', '入门', '初级', '中等', '熟练', '精通'];
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 w-20 text-right shrink-0">{label}</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue(n)}
              className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                n <= value ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 w-14">{levels[value] || ''}</span>
      </div>
    );
  };

  const saBar = (label: string, key: keyof SelfAssessment) => {
    const value = sa[key];
    const levels = ['零基础', '入门', '初级', '中等', '熟练', '精通'];
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 w-28 text-right shrink-0">{label}</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSa((prev) => ({ ...prev, [key]: n }))}
              className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                n <= value ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 w-14">{levels[value] || ''}</span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        基本信息
        <span className="text-xs text-red-400 font-normal ml-2">* 为必填项</span>
      </h2>

      {/* 姓名 + 性别 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">姓名 *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (e.target.value.trim()) setErrors((prev) => { const { name: _, ...r } = prev; return r; }); }}
            placeholder="请输入姓名"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">性别 *</label>
          <div className="flex gap-2 mt-0.5">
            {(['male', 'female'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => { setGender(g); setErrors((prev) => { const { gender: _, ...r } = prev; return r; }); }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border ${
                  gender === g
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {g === 'male' ? '男' : '女'}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-red-500 mt-0.5">{errors.gender}</p>}
        </div>
      </div>

      {/* 本科院校 + 专业 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">本科院校 *</label>
          <input
            type="text"
            value={uni}
            onChange={(e) => handleUniChange(e.target.value)}
            placeholder="输入院校名称搜索"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none ${errors.university ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.university && <p className="text-xs text-red-500 mt-0.5">{errors.university}</p>}
          {uniSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {uniSuggestions.map((u) => (
                <button
                  key={u.name}
                  type="button"
                  onClick={() => { setUni(u.name); setUniSuggestions([]); setErrors((prev) => { const { university: _, ...r } = prev; return r; }); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 flex justify-between"
                >
                  <span>{u.name}</span>
                  <span className="text-gray-400 text-xs">{u.city} · {u.tier}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">本科专业 *</label>
          <input
            type="text"
            value={major}
            onChange={(e) => handleMajorChange(e.target.value)}
            placeholder="输入专业名称搜索"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none ${errors.major ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.major && <p className="text-xs text-red-500 mt-0.5">{errors.major}</p>}
          {majorSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {majorSuggestions.map((m) => (
                <button
                  key={m.code}
                  type="button"
                  onClick={() => { setMajor(m.name); setMajorSuggestions([]); setErrors((prev) => { const { major: _, ...r } = prev; return r; }); }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 flex justify-between"
                >
                  <span>{m.name}</span>
                  <span className="text-gray-400 text-xs">{m.category}</span>
                </button>
              ))}
            </div>
          )}
          {detectedCategory && !majorSuggestions.length && (
            <p className="text-xs text-indigo-500 mt-0.5">
              已识别专业大类：{detectedCategory.label}
            </p>
          )}
        </div>
      </div>

      {/* 年级 + GPA + 排名 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">年级/阶段 *</label>
          <select
            value={grade}
            onChange={(e) => { setGrade(e.target.value as Grade); setErrors((prev) => { const { grade: _, ...r } = prev; return r; }); }}
            className={`w-full border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 outline-none ${errors.grade ? 'border-red-400' : 'border-gray-300'}`}
          >
            <option value="">请选择</option>
            {grades.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          {errors.grade && <p className="text-xs text-red-500 mt-0.5">{errors.grade}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">GPA（选填）</label>
          <input
            type="text"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder="如：3.5/4.0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">专业排名（选填）</label>
          <input
            type="text"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="如：前20%"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
      </div>

      {/* 英语水平 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">英语水平</label>
        <div className="flex gap-4 items-center">
          <select
            value={engLevel}
            onChange={(e) => setEngLevel(e.target.value as EnglishLevel)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-300 outline-none"
          >
            {englishLevels.map((el) => (
              <option key={el.value} value={el.value}>{el.label}</option>
            ))}
          </select>
          {engLevel !== 'none' && (
            <input
              type="text"
              value={engScore}
              onChange={(e) => setEngScore(e.target.value)}
              placeholder={engLevel === 'cet4' || engLevel === 'cet6' ? '如：520' : '如：6.5'}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
          )}
        </div>
      </div>

      {/* 目标专业（按大类折叠） */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          目标考研专业方向（可多选，点击大类展开）
          {detectedCategory && (
            <span className="text-indigo-500 ml-1">
              —— 已根据你的本科专业智能推荐
            </span>
          )}
        </label>
        <div className="space-y-1 max-h-72 overflow-y-auto border border-gray-200 rounded-lg p-2">
          {Object.entries(groupedMajors).map(([cat, items]) => {
            const isExpanded = expandedCats[cat] !== false;
            const selectedInCat = items.filter((m) => targetMajors.includes(m.id)).length;
            return (
              <div key={cat}>
                <button
                  type="button"
                  onClick={() => toggleCat(cat)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span className="text-gray-400 text-xs">({items.length}个专业)</span>
                  </span>
                  {selectedInCat > 0 && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{selectedInCat}已选</span>
                  )}
                </button>
                {isExpanded && (
                  <div className="flex flex-wrap gap-1.5 pl-8 pr-2 pb-2">
                    {items.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleTargetMajor(m.id)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                          targetMajors.includes(m.id)
                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-300 shadow-sm'
                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 数学基础 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          数学基础自评（0=零基础, 5=精通）
        </label>
        <div className="flex flex-col gap-1.5">
          {ratingBar('高等数学', mathAdv, setMathAdv)}
          {ratingBar('线性代数', mathLin, setMathLin)}
          {ratingBar('概率论', mathProb, setMathProb)}
        </div>
      </div>

      {/* 编程基础 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          编程基础自评（0=零基础/无经验, 5=精通）
        </label>
        <div className="flex flex-col gap-1.5">
          {ratingBar('Python', progPython, setProgPython)}
          {ratingBar('SQL', progSql, setProgSql)}
          {ratingBar('Java', progJava, setProgJava)}
          {ratingBar('R', progR, setProgR)}
          {ratingBar('C++', progCpp, setProgCpp)}
        </div>
      </div>

      {/* 扩展自评维度 */}
      <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <label className="block text-sm text-gray-700 font-medium mb-3">
          综合素质自评（0=零基础/无经验, 5=精通）
        </label>
        <div className="flex flex-col gap-1.5">
          {saBar('专业基础素养', 'professionalLiteracy')}
          {saBar('科研潜力', 'researchPotential')}
          {saBar('学习能力', 'learningAbility')}
          {saBar('逻辑思维', 'logicalThinking')}
          {saBar('写作表达', 'writingAbility')}
          {saBar('动手/实验能力', 'practicalAbility')}
          {saBar('团队协作', 'teamwork')}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
      >
        下一步：学术科研
      </button>
    </div>
  );
}
