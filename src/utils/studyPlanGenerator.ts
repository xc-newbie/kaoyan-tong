import type {
  StudyPlan,
  StudyPhase,
  DailySchedule,
  Milestone,
  SubjectAllocation,
  StudyMode,
  MathAcceptance,
  WorkSchedule,
} from '../types';

export function generateStudyPlan(
  mode: StudyMode,
  startDate: string,
  mathAcceptance: MathAcceptance | undefined,
  hasProfCourse: boolean,
  workSchedule?: WorkSchedule
): StudyPlan {
  const start = new Date(startDate);
  const examDate = getExamDate(start);
  const totalDays = Math.max(30, Math.ceil((examDate.getTime() - start.getTime()) / 86400000));

  const phases = buildPhases(totalDays, mode, mathAcceptance, hasProfCourse);
  const dailySchedule = buildDailySchedule(mode, workSchedule);
  const milestones = buildMilestones(start, totalDays, phases);
  const subjectAllocation = buildSubjectAllocation(mathAcceptance, hasProfCourse);

  return {
    mode,
    totalDays,
    phases,
    dailySchedule,
    milestones,
    subjectAllocation,
  };
}

function getExamDate(start: Date): Date {
  const year = start.getFullYear();
  // 考研通常在12月倒数第二个周末
  const dec = new Date(year, 11, 25); // Dec 25
  while (dec.getDay() !== 0) {
    dec.setDate(dec.getDate() - 1);
  }
  dec.setDate(dec.getDate() - 7); // 倒数第二个周六
  return dec;
}

function buildPhases(
  totalDays: number,
  mode: StudyMode,
  mathAcceptance?: MathAcceptance,
  hasProfCourse?: boolean
): StudyPhase[] {
  const hasMath = !!(mathAcceptance && mathAcceptance !== 'no_math');

  const foundationDays = Math.round(totalDays * 0.4);
  const intensiveDays = Math.round(totalDays * 0.35);
  const sprintDays = totalDays - foundationDays - intensiveDays;

  const isWorking = mode === 'working';

  const phases: StudyPhase[] = [
    {
      name: '基础阶段',
      description: `第 1 ~ ${foundationDays} 天（约 ${Math.round(foundationDays / 30)} 个月）`,
      startDay: 1,
      endDay: foundationDays,
      goal: '构建知识框架，打牢各科基础。完成教材和基础课程第一轮学习。',
      tasks: buildFoundationTasks(hasMath, !!hasProfCourse, isWorking),
      checkpoints: [
        `第 ${Math.round(foundationDays * 0.3)} 天：完成英语考研词汇第一轮背诵`,
        `第 ${Math.round(foundationDays * 0.5)} 天：${hasMath ? '数学教材+基础课完成一半' : '专业课教材通读 1 遍'}`,
        `第 ${Math.round(foundationDays * 0.8)} 天：所有科目基础阶段收尾，准备进入强化阶段`,
        `第 ${foundationDays} 天：基础阶段自测，确保知识覆盖率 ≥ 80%`,
      ],
    },
    {
      name: '强化阶段',
      description: `第 ${foundationDays + 1} ~ ${foundationDays + intensiveDays} 天（约 ${Math.round(intensiveDays / 30)} 个月）`,
      startDay: foundationDays + 1,
      endDay: foundationDays + intensiveDays,
      goal: '专项突破，大量刷题。通过真题和习题集巩固知识，提升解题速度和准确率。',
      tasks: buildIntensiveTasks(hasMath, !!hasProfCourse, isWorking),
      checkpoints: [
        `第 ${foundationDays + Math.round(intensiveDays * 0.3)} 天：${hasMath ? '数学辅导讲义+习题一轮完成' : '专业课真题完成一轮'}`,
        `第 ${foundationDays + Math.round(intensiveDays * 0.5)} 天：英语阅读真题刷完近 15 年，正确率 ≥ 70%`,
        `第 ${foundationDays + Math.round(intensiveDays * 0.8)} 天：政治1000题一轮完成；所有科目薄弱点建立错题本`,
        `第 ${foundationDays + intensiveDays} 天：强化阶段全面自测，各科正确率达标`,
      ],
    },
    {
      name: '冲刺阶段',
      description: `第 ${foundationDays + intensiveDays + 1} ~ ${totalDays} 天（约 ${Math.round(sprintDays / 30)} 个月）`,
      startDay: foundationDays + intensiveDays + 1,
      endDay: totalDays,
      goal: '全真模拟，查漏补缺。通过限时模拟训练考试节奏，背诵政治大题和专业课重点，调整心态。',
      tasks: buildSprintTasks(hasMath, !!hasProfCourse, isWorking),
      checkpoints: [
        `第 ${totalDays - Math.round(sprintDays * 0.3)} 天：完成 3 套以上全真模拟`,
        `第 ${totalDays - Math.round(sprintDays * 0.15)} 天：政治肖四到手开始背诵`,
        `第 ${totalDays - 7} 天：考前一周，调整作息，轻量复习`,
        `第 ${totalDays} 天：上考场！`,
      ],
    },
  ];

  return phases;
}

function buildFoundationTasks(hasMath: boolean, hasProf: boolean, isWorking: boolean): import('../types').SubjectTask[] {
  const scale = isWorking ? '(在职版：适当减量，保证完成核心内容)' : '(脱产版：按标准强度完成)';
  const tasks: import('../types').SubjectTask[] = [
    {
      subject: '英语',
      items: [
        `考研词汇完整背诵 1-2 轮（5500词）${scale}`,
        '长难句每日 10 句，分析句子结构',
        '早年阅读真题（2000-2010）每周 3-4 篇精读',
      ],
    },
  ];

  if (hasMath) {
    tasks.push({
      subject: '数学',
      items: [
        `教材+基础课完整过一遍（高数 → 线代 → 概率）${scale}`,
        '课后习题全部完成，错题整理',
        '基础 660 题选做（重点是极限、导数、积分）',
      ],
    });
  } else {
    tasks.push({
      subject: '199/396 或专业课',
      items: [
        '管理类/经济类联考：逻辑入门 + 数学基础',
        '写作基础：论证有效性分析 + 论说文模板',
      ],
    });
  }

  if (hasProf) {
    tasks.push({
      subject: '专业课',
      items: [
        '目标院校指定教材通读 1-2 遍',
        '每章整理思维导图 + 笔记',
        '了解真题出题风格和重点章节',
      ],
    });
  }

  tasks.push({
    subject: '政治',
    items: [
      '了解考研政治框架（马原→毛中特→史纲→思修→时政）',
      '此阶段政治可暂缓，每天最多 30 分钟了解即可',
    ],
  });

  return tasks;
}

function buildIntensiveTasks(hasMath: boolean, hasProf: boolean, isWorking: boolean): import('../types').SubjectTask[] {
  const scale = isWorking ? '(在职版：利用周末集中突破)' : '';
  const tasks: import('../types').SubjectTask[] = [
    {
      subject: '英语',
      items: [
        `近 15 年阅读真题精刷（每天 1 篇精细化分析）${scale}`,
        '翻译题型专项训练（英译中）',
        '新题型+完形每周 2 套',
        '开始准备作文小作文模板',
      ],
    },
  ];

  if (hasMath) {
    tasks.push({
      subject: '数学',
      items: [
        '辅导讲义 + 强化课完整一轮',
        '660/880/1000 题任选一本刷完',
        '近 15 年真题按题型分类刷',
        '每周 1-2 次套卷限时训练',
      ],
    });
  }

  if (hasProf) {
    tasks.push({
      subject: '专业课',
      items: [
        '真题精刷 + 分析出题规律',
        '重点章节背诵',
        '配套习题集/名校真题集',
        '整理高频考点清单',
      ],
    });
  }

  tasks.push({
    subject: '政治',
    items: [
      '强化视频课完整一轮（徐涛/腿姐任选）',
      '肖秀荣 1000 题刷一遍',
      '错题标记+重点回顾',
    ],
  });

  return tasks;
}

function buildSprintTasks(hasMath: boolean, hasProf: boolean, _isWorking: boolean): import('../types').SubjectTask[] {
  const tasks: import('../types').SubjectTask[] = [
    {
      subject: '英语',
      items: [
        '近 5 年真题全真模拟（限时 3 小时）',
        '作文大小作文模板整理+背诵',
        '保持阅读手感，每天 1 篇',
      ],
    },
  ];

  if (hasMath) {
    tasks.push({
      subject: '数学',
      items: [
        '真题套卷 + 模拟卷（李林 4+6/张宇 8+4）',
        '错题本全面复盘',
        '公式手册随身携带反复记忆',
      ],
    });
  }

  if (hasProf) {
    tasks.push({
      subject: '专业课',
      items: [
        '全真模拟 3-5 套',
        '高频考点+重点章节反复背诵',
        '查漏补缺：翻教材死角',
      ],
    });
  }

  tasks.push({
    subject: '政治',
    items: [
      '肖四到手→大题全力背诵（优先级最高）',
      '肖八选择题刷 2 遍',
      '时政热点汇总',
      '腿姐/徐涛押题卷补充',
    ],
  });

  return tasks;
}

function buildDailySchedule(mode: StudyMode, ws?: WorkSchedule): DailySchedule {
  if (mode === 'fulltime') {
    return {
      fulltime: [
        { time: '07:00-08:00', activity: '起床+早餐', detail: '保证充足睡眠，不熬夜' },
        { time: '08:00-09:00', activity: '英语晨读', detail: '单词+朗读作文模板+长难句' },
        { time: '09:00-12:00', activity: '深度学习(一)', detail: '数学/396 联考（最佳精力时段）' },
        { time: '12:00-14:00', activity: '午餐+午休', detail: '午睡 30 分钟，恢复精力' },
        { time: '14:00-17:00', activity: '深度学习(二)', detail: '专业课学习' },
        { time: '17:00-18:00', activity: '政治学习', detail: '视频课+刷题' },
        { time: '18:00-19:00', activity: '晚餐+休息', detail: '散步/运动，放松大脑' },
        { time: '19:00-21:00', activity: '英语训练', detail: '真题阅读+翻译+作文' },
        { time: '21:00-22:00', activity: '复习+错题整理', detail: '回顾当天学习内容' },
        { time: '22:00-23:00', activity: '自由安排', detail: '查漏补缺或休息' },
      ],
    };
  }

  const w = ws || {
    workStartTime: '09:00',
    workEndTime: '18:00',
    commuteMinutes: 60,
    studyStartTime: '19:30',
    studyEndTime: '23:00',
    hasWeekendObligations: false,
  };

  const wakeTime = calcWakeTime(w);
  const workEnd = w.workEndTime;
  const commute = w.commuteMinutes;
  const commuteLabel = commute >= 60 ? `${Math.round(commute / 60)}小时` : `${commute}分钟`;

  // Calculate evening study time
  const studyStart = w.studyStartTime;
  const studyEnd = w.studyEndTime;
  const studyHours = calcHoursBetween(studyStart, studyEnd);

  const weekday: import('../types').TimeSlot[] = [
    { time: `${wakeTime}-${addMinutes(wakeTime, 30)}`, activity: '早起学习', detail: '英语单词+阅读（清晨黄金时间）' },
    { time: `${addMinutes(wakeTime, 30)}-${w.workStartTime}`, activity: '通勤+碎片学习', detail: `地铁/公交上背单词、听政治带背（约${commuteLabel}）` },
    { time: `${w.workStartTime}-12:00`, activity: '工作', detail: '上午工作时间' },
    { time: '12:00-13:00', activity: '午休刷题', detail: '抽 20-30 分钟刷政治选择题或背单词' },
    { time: `13:00-${workEnd}`, activity: '工作', detail: '下午工作时间' },
    { time: `${workEnd}-${studyStart}`, activity: '通勤+晚餐', detail: `路上继续碎片学习（约${commuteLabel}）` },
    { time: `${studyStart}-${studyEnd}`, activity: `深度学习时段（约${studyHours.toFixed(1)}h）`, detail: '数学/专业课轮换，每日专注深度学习' },
    { time: `${studyEnd}-${addMinutes(studyEnd, 30)}`, activity: '复习+明日规划', detail: '回顾今日内容 + 制定明日任务清单' },
    { time: addMinutes(studyEnd, 30), activity: '睡觉', detail: '保证至少 7 小时睡眠' },
  ];

  const wkEndStart = ws?.hasWeekendObligations && ws?.weekendAvailableStart
    ? ws.weekendAvailableStart : '08:00';
  const wkEndEnd = ws?.hasWeekendObligations && ws?.weekendAvailableEnd
    ? ws.weekendAvailableEnd : '22:30';

  const weekend: import('../types').TimeSlot[] = [
    { time: `${wkEndStart}-${addMinutes(wkEndStart, 60)}`, activity: '英语', detail: '单词巩固 + 阅读精练' },
    { time: `${addMinutes(wkEndStart, 60)}-12:00`, activity: '数学/396', detail: '集中攻克重难点' },
    { time: '12:00-14:00', activity: '午餐+午休', detail: '——' },
    { time: '14:00-17:00', activity: '专业课', detail: '集中深度学习' },
    { time: '17:00-18:30', activity: '政治', detail: '视频课+刷题' },
    { time: '18:30-19:30', activity: '晚餐+休息', detail: '——' },
    { time: '19:30-21:30', activity: '英语真题', detail: '限时模拟+分析' },
    { time: `21:30-${wkEndEnd}`, activity: '查漏补缺+规划', detail: '整理一周错题，规划下周任务' },
  ];

  return { weekday, weekend };
}

function buildMilestones(start: Date, totalDays: number, phases: StudyPhase[]): Milestone[] {
  const milestones: Milestone[] = [];

  for (const phase of phases) {
    const phaseStart = new Date(start);
    phaseStart.setDate(phaseStart.getDate() + phase.startDay - 1);

    const phaseEnd = new Date(start);
    phaseEnd.setDate(phaseEnd.getDate() + phase.endDay - 1);

    milestones.push({
      day: phase.startDay,
      date: formatDate(phaseStart),
      title: `${phase.name} 开始`,
      description: phase.goal,
    });

    // 每月里程碑
    let d = new Date(phaseStart);
    while (d < phaseEnd) {
      milestones.push({
        day: Math.ceil((d.getTime() - start.getTime()) / 86400000) + 1,
        date: formatDate(d),
        title: '月度复盘',
        description: '回顾本月进度，检查是否偏离计划，调整下月安排',
      });
      d.setMonth(d.getMonth() + 1);
    }
  }

  // 考前一周
  const weekBefore = new Date(start);
  weekBefore.setDate(weekBefore.getDate() + totalDays - 7);
  milestones.push({
    day: totalDays - 7,
    date: formatDate(weekBefore),
    title: '考前一周调整',
    description: '调整作息，轻量复习，保持手感，准备考试用品',
  });

  return milestones.sort((a, b) => a.day - b.day);
}

function buildSubjectAllocation(
  mathAcceptance: MathAcceptance | undefined,
  _hasProfCourse: boolean
): SubjectAllocation {
  if (!mathAcceptance || mathAcceptance === 'no_math') {
    return { math: 0, '专业课': 40, english: 30, politics: 30 };
  }
  if (mathAcceptance === '199' || mathAcceptance === '396') {
    return { math: 25, '专业课': 30, english: 25, politics: 20 };
  }
  // math1, math2, math3
  return { math: 30, '专业课': 30, english: 25, politics: 15 };
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function calcWakeTime(ws: WorkSchedule): string {
  const [h, m] = ws.workStartTime.split(':').map(Number);
  let totalMin = h * 60 + m - ws.commuteMinutes - 60; // 1 hour before commute for morning study
  if (totalMin < 300) totalMin = 300; // earliest 5:00
  const wakeH = Math.floor(totalMin / 60);
  const wakeM = totalMin % 60;
  return `${String(wakeH).padStart(2, '0')}:${String(wakeM).padStart(2, '0')}`;
}

function calcHoursBetween(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return mins / 60;
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  let total = h * 60 + m + mins;
  if (total >= 24 * 60) total -= 24 * 60;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
}

export function calcDailyStudyHours(ws?: WorkSchedule): { weekday: number; weekend: number } {
  if (!ws) return { weekday: 3.5, weekend: 8 };
  const morningStudy = 0.5;
  const commuteStudy = Math.min(ws.commuteMinutes / 60, 1) * 0.5;
  const eveningStudy = calcHoursBetween(ws.studyStartTime, ws.studyEndTime);
  const totalWeekday = morningStudy + commuteStudy + eveningStudy;

  let weekendHours = 8;
  if (ws.hasWeekendObligations && ws.weekendAvailableStart && ws.weekendAvailableEnd) {
    weekendHours = calcHoursBetween(ws.weekendAvailableStart, ws.weekendAvailableEnd);
  }
  return { weekday: Math.round(totalWeekday * 10) / 10, weekend: Math.round(weekendHours * 10) / 10 };
}
