import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyStats } from '../types';
import { BarChart as ChartBar } from 'lucide-react';

interface StatsChartProps {
  data: MonthlyStats[];
}

export default function StatsChart({ data }: StatsChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <ChartBar className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">请假统计</h2>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="officer" name="军官" fill="#1e40af" />
            <Bar dataKey="soldier" name="义务兵" fill="#0891b2" />
            <Bar dataKey="civilian" name="文职人员" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}