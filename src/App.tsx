import { useState, useEffect } from 'react';
import { AttendanceRecord, DepartmentStats } from './types';
import AttendanceForm from './components/AttendanceForm';
import DepartmentStatsChart from './components/DepartmentStatsChart';
import SearchRecords from './components/SearchRecords';

function App() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    // Initialize with mock data for now
    const mockData: AttendanceRecord[] = [
      {
        id: 1,
        department: '公司1',
        unit: '1连',
        name: '张一',
        startDate: '2023-12-18',
        startTime: '09:00',
        endDate: '2023-12-18',
        endTime: '18:00',
        location: '广州市',
        reason: '看病',
        contact: '11111111111',
        approver: '王五'
      },
      {
        id: 2,
        department: '公司1',
        unit: '2连',
        name: '张三',
        startDate: '2023-12-18',
        startTime: '13:30',
        endDate: '2023-12-18',
        endTime: '18:00',
        location: '广州市',
        reason: '购物'
      },
      {
        id: 3,
        department: '公司1',
        unit: '3连',
        name: '张三',
        startDate: '2023-12-18',
        startTime: '09:00',
        endDate: '2023-12-18',
        endTime: '18:00',
        location: '广州市',
        reason: '见亲友'
      },
      {
        id: 4,
        department: '公司1',
        unit: '4连',
        name: '张四',
        startDate: '2023-12-18',
        startTime: '09:00',
        endDate: '2023-12-18',
        endTime: '18:00',
        location: '广州市',
        reason: '购物'
      },
      {
        id: 5,
        department: '公司2',
        unit: '1连',
        name: '张七',
        startDate: '2023-12-09',
        startTime: '09:00',
        endDate: '2023-12-09',
        endTime: '18:00',
        location: '医院',
        reason: '购物'
      },
      {
        id: 6,
        department: '公司2',
        unit: '2连',
        name: '张八',
        startDate: '2023-12-10',
        startTime: '09:00',
        endDate: '2023-12-10',
        endTime: '18:00',
        location: '长宁镇',
        reason: '购物'
      }
    ];

    setRecords(mockData);
  };

  useEffect(() => {
    // Calculate department statistics
    const stats = records.reduce((acc: { [key: string]: DepartmentStats }, record) => {
      if (!acc[record.department]) {
        acc[record.department] = {
          department: record.department,
          totalRecords: 0,
          unitStats: {}
        };
      }
      
      acc[record.department].totalRecords++;
      acc[record.department].unitStats[record.unit] = 
        (acc[record.department].unitStats[record.unit] || 0) + 1;
      
      return acc;
    }, {});

    setDepartmentStats(Object.values(stats));
  }, [records]);

  const handleSubmit = async (record: Omit<AttendanceRecord, 'id'>) => {
    const newId = records.length + 1;
    const newRecord = { ...record, id: newId };
    setRecords([...records, newRecord]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">外出管理系统</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AttendanceForm onSubmit={handleSubmit} />
          <DepartmentStatsChart data={departmentStats} />
        </div>
        
        <SearchRecords records={records} />
      </div>
    </div>
  );
}

export default App;