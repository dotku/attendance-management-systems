import { useState } from 'react';
import { DepartmentStats } from '../types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentStatsChartProps {
  data: DepartmentStats[];
}

export default function DepartmentStatsChart({ data }: DepartmentStatsChartProps) {
  const [showTotal, setShowTotal] = useState(true);

  const chartData = {
    labels: data.map(d => d.department),
    datasets: [
      ...(showTotal ? [{
        label: '总外出记录',
        data: data.map(d => d.totalRecords),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }] : []),
      ...Object.keys(data[0]?.unitStats || {}).map((unit, index) => ({
        label: unit,
        data: data.map(d => d.unitStats[unit] || 0),
        backgroundColor: `rgba(${255 - index * 30}, ${100 + index * 20}, ${150 + index * 20}, 0.5)`,
        borderColor: `rgba(${255 - index * 30}, ${100 + index * 20}, ${150 + index * 20}, 1)`,
        borderWidth: 1,
      }))
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        onClick: (_event, legendItem) => {
          if (legendItem.text === '总外出记录') {
            setShowTotal(!showTotal);
          }
        }
      },
      title: {
        display: true,
        text: '部门外出统计',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} 条记录`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '记录数量'
        }
      },
      x: {
        title: {
          display: true,
          text: '部门'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        点击图例可以切换显示总记录数
      </div>
    </div>
  );
}
