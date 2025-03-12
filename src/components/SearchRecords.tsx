import { useState } from 'react';
import { AttendanceRecord } from '../types';

interface SearchRecordsProps {
  records: AttendanceRecord[];
}

export default function SearchRecords({ records }: SearchRecordsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterUnit, setFilterUnit] = useState('');

  const departments = [...new Set(records.map(record => record.department))];
  const units = [...new Set(records.map(record => record.unit))];

  const filteredRecords = records.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === '' || record.department === filterDepartment;
    const matchesUnit = filterUnit === '' || record.unit === filterUnit;

    return matchesSearch && matchesDepartment && matchesUnit;
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="搜索姓名、事由或地点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">所有部门</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
          >
            <option value="">所有科室</option>
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                部门
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                科室
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                姓名
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                开始时间
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                结束时间
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                外出地点
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                外出事由
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                联系方式
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                批准人
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.department}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.unit}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.startDate} {record.startTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.endDate} {record.endTime}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.location}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.reason}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.contact || '-'}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {record.approver || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}