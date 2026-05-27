import {
  RadarChart as ReRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { EvaluationResult } from '../types';

interface Props {
  data: EvaluationResult;
}

export default function RadarChart({ data }: Props) {
  const chartData = [
    { subject: '学术能力', score: data.academic, full: 100 },
    { subject: '数理基础', score: data.mathLogic, full: 100 },
    { subject: '编程技能', score: data.programming, full: 100 },
    { subject: '竞赛经历', score: data.competition, full: 100 },
    { subject: '英语水平', score: data.english, full: 100 },
    { subject: '项目经验', score: data.project, full: 100 },
    { subject: '专业素养', score: data.professionalLiteracy, full: 100 },
    { subject: '科研潜力', score: data.researchPotential, full: 100 },
    { subject: '综合素质', score: data.comprehensive, full: 100 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <ReRadar data={chartData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickCount={6}
          />
          <Radar
            name="你的得分"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </ReRadar>
      </ResponsiveContainer>
    </div>
  );
}
