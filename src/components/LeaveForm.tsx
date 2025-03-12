import React, { useState } from 'react';
import { PersonnelType, LeaveRecord } from '../types';
import { CalendarDays } from 'lucide-react';

interface LeaveFormProps {
  onSubmit: (record: Omit<LeaveRecord, 'id'>) => void;
}

export default function LeaveForm({ onSubmit }: LeaveFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    personnelType: 'officer' as PersonnelType,
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      personnelType: 'officer',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <CalendarDays className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">请假申请</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">姓名</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     hover:bg-gray-50 transition-colors duration-200
                     placeholder:text-gray-400"
            placeholder="请输入姓名"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">人员类型</label>
          <select
            value={formData.personnelType}
            onChange={(e) => setFormData({ ...formData, personnelType: e.target.value as PersonnelType })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     cursor-pointer"
          >
            <option value="officer">军官</option>
            <option value="soldier">义务兵</option>
            <option value="civilian">文职人员</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">开始日期</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">结束日期</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">请假原因</label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:bg-gray-50 transition-colors duration-200
                     min-h-[120px] resize-y"
            placeholder="请输入请假原因"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors duration-200 mt-2 text-sm font-medium"
        >
          提交申请
        </button>
      </div>
    </form>
  );
}