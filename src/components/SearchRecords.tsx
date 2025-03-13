import { useState } from 'react';
import { AttendanceRecord } from '../types';

interface SearchRecordsProps {
  records: AttendanceRecord[];
}

export default function SearchRecords({ records }: SearchRecordsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');

  // Get unique departments and units
  const departments = Array.from(new Set(records.map(record => record.department)));
  const units = Array.from(new Set(records.map(record => record.unit)));

  // Filter records based on search term and selections
  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' || 
      Object.values(record).some(value => 
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment = selectedDepartment === '' || record.department === selectedDepartment;
    const matchesUnit = selectedUnit === '' || record.unit === selectedUnit;
    return matchesSearch && matchesDepartment && matchesUnit;
  });

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
            搜索
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="输入搜索关键词"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
            部门筛选
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">全部部门</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
            科室筛选
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unit"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            <option value="">全部科室</option>
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">部门</th>
              <th className="px-4 py-2 text-left">科室</th>
              <th className="px-4 py-2 text-left">姓名</th>
              <th className="px-4 py-2 text-left">军官头衔</th>
              <th className="px-4 py-2 text-left">开始日期</th>
              <th className="px-4 py-2 text-left">开始时间</th>
              <th className="px-4 py-2 text-left">结束日期</th>
              <th className="px-4 py-2 text-left">结束时间</th>
              <th className="px-4 py-2 text-left">外出地点</th>
              <th className="px-4 py-2 text-left">外出事由</th>
              <th className="px-4 py-2 text-left">联系方式</th>
              <th className="px-4 py-2 text-left">批准人</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border px-4 py-2">{record.department}</td>
                <td className="border px-4 py-2">{record.unit}</td>
                <td className="border px-4 py-2">{record.name}</td>
                <td className="border px-4 py-2">{record.militaryRank}</td>
                <td className="border px-4 py-2">{record.startDate}</td>
                <td className="border px-4 py-2">{record.startTime}</td>
                <td className="border px-4 py-2">{record.endDate}</td>
                <td className="border px-4 py-2">{record.endTime}</td>
                <td className="border px-4 py-2">{record.location}</td>
                <td className="border px-4 py-2">{record.reason}</td>
                <td className="border px-4 py-2">{record.contact}</td>
                <td className="border px-4 py-2">{record.approver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          没有找到匹配的记录
        </div>
      )}
    </div>
  );
}