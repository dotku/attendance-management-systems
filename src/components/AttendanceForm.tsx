import React, { useState } from 'react';
import { AttendanceRecord } from '../types';

interface AttendanceFormProps {
  onSubmit: (record: Omit<AttendanceRecord, 'id'>) => Promise<void>;
}

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // Returns HH:mm format
};

export default function AttendanceForm({ onSubmit }: AttendanceFormProps) {
  const [formData, setFormData] = useState({
    department: '',
    unit: '',
    name: '',
    militaryRank: '',
    startDate: getCurrentDate(),
    startTime: getCurrentTime(),
    endDate: getCurrentDate(),
    endTime: getCurrentTime(),
    location: '',
    reason: '',
    contact: '',
    approver: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Reset form except for department and unit
    const { department, unit } = formData;
    setFormData({
      department,
      unit,
      name: '',
      militaryRank: '',
      startDate: getCurrentDate(),
      startTime: getCurrentTime(),
      endDate: getCurrentDate(),
      endTime: getCurrentTime(),
      location: '',
      reason: '',
      contact: '',
      approver: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
            部门
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="department"
            name="department"
            type="text"
            required
            value={formData.department}
            onChange={handleChange}
            placeholder="请输入部门"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
            科室
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unit"
            name="unit"
            type="text"
            required
            value={formData.unit}
            onChange={handleChange}
            placeholder="请输入科室"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            姓名
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="请输入姓名"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="militaryRank">
            军官头衔
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="militaryRank"
            name="militaryRank"
            type="text"
            value={formData.militaryRank}
            onChange={handleChange}
            placeholder="请输入军官头衔"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
            开始日期
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            name="startDate"
            type="date"
            required
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
            开始时间
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startTime"
            name="startTime"
            type="time"
            required
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
            结束日期
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            name="endDate"
            type="date"
            required
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
            结束时间
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endTime"
            name="endTime"
            type="time"
            required
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            外出地点
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            name="location"
            type="text"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="请输入外出地点"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
            外出事由
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reason"
            name="reason"
            type="text"
            required
            value={formData.reason}
            onChange={handleChange}
            placeholder="请输入外出事由"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            联系方式
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            placeholder="请输入联系方式"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="approver">
            批准人
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="approver"
            name="approver"
            type="text"
            value={formData.approver}
            onChange={handleChange}
            placeholder="请输入批准人"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          提交
        </button>
      </div>
    </form>
  );
}
