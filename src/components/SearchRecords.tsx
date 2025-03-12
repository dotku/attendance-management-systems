import React, { useState } from 'react';
import { LeaveRecord } from '../types';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

interface SearchRecordsProps {
  records: LeaveRecord[];
}

export default function SearchRecords({ records }: SearchRecordsProps) {
  const [searchName, setSearchName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredRecords = records.filter(record => {
    const nameMatch = record.name.toLowerCase().includes(searchName.toLowerCase());
    const dateMatch = (!startDate || record.startDate >= startDate) && 
                     (!endDate || record.endDate <= endDate);
    return nameMatch && dateMatch;
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Search className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">记录查询</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">姓名</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     placeholder:text-gray-400"
            placeholder="输入姓名搜索"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">开始日期</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">结束日期</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     cursor-pointer"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">人员类型</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始日期</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束日期</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原因</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.personnelType === 'officer' && '军官'}
                  {record.personnelType === 'soldier' && '义务兵'}
                  {record.personnelType === 'civilian' && '文职人员'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.endDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}