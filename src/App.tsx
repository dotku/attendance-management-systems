import React, { useState, useEffect } from 'react';
import LeaveForm from './components/LeaveForm';
import StatsChart from './components/StatsChart';
import SearchRecords from './components/SearchRecords';
import { LeaveRecord, MonthlyStats } from './types';
import { format } from 'date-fns';
import { supabase } from './lib/supabase';

function App() {
  const [records, setRecords] = useState<LeaveRecord[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from('leave_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching records:', error);
      return;
    }

    setRecords(data.map(record => ({
      id: record.id,
      name: record.name,
      personnelType: record.personnel_type,
      startDate: record.start_date,
      endDate: record.end_date,
      reason: record.reason
    })));
  };

  const handleSubmit = async (record: Omit<LeaveRecord, 'id'>) => {
    const { data, error } = await supabase
      .from('leave_records')
      .insert([{
        name: record.name,
        personnel_type: record.personnelType,
        start_date: record.startDate,
        end_date: record.endDate,
        reason: record.reason,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating record:', error);
      return;
    }

    await fetchRecords();
  };

  useEffect(() => {
    // Calculate monthly statistics
    const stats = records.reduce((acc: { [key: string]: MonthlyStats }, record) => {
      const month = format(new Date(record.startDate), 'yyyy-MM');
      
      if (!acc[month]) {
        acc[month] = {
          month,
          officer: 0,
          soldier: 0,
          civilian: 0,
        };
      }
      
      acc[month][record.personnelType]++;
      return acc;
    }, {});

    setMonthlyStats(Object.values(stats).sort((a, b) => a.month.localeCompare(b.month)));
  }, [records]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">请假管理系统</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LeaveForm onSubmit={handleSubmit} />
          <StatsChart data={monthlyStats} />
        </div>
        
        <SearchRecords records={records} />
      </div>
    </div>
  );
}

export default App;