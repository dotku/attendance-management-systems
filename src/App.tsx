import { useState, useEffect, useCallback } from 'react';
import { AttendanceRecord, DepartmentStats } from './types';
import AttendanceForm from './components/AttendanceForm';
import DepartmentStatsChart from './components/DepartmentStatsChart';
import SearchRecords from './components/SearchRecords';
import { supabase } from './lib/supabase';

interface SupabaseRecord {
  id: number;
  department: string;
  unit: string;
  name: string;
  military_rank: string | null;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  location: string;
  reason: string;
  contact: string | null;
  approver: string | null;
  created_at: string;
  updated_at: string;
}

function App() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);

  // Function to transform snake_case to camelCase
  const toCamelCase = (record: SupabaseRecord): AttendanceRecord => ({
    id: record.id,
    department: record.department,
    unit: record.unit,
    name: record.name,
    militaryRank: record.military_rank ?? undefined,
    startDate: record.start_date,
    startTime: record.start_time,
    endDate: record.end_date,
    endTime: record.end_time,
    location: record.location,
    reason: record.reason,
    contact: record.contact ?? undefined,
    approver: record.approver ?? undefined
  });

  // Function to transform camelCase to snake_case
  const toSnakeCase = (record: Omit<AttendanceRecord, 'id'>) => ({
    department: record.department,
    unit: record.unit,
    name: record.name,
    military_rank: record.militaryRank,
    start_date: record.startDate,
    start_time: record.startTime,
    end_date: record.endDate,
    end_time: record.endTime,
    location: record.location,
    reason: record.reason,
    contact: record.contact,
    approver: record.approver
  });

  // Calculate department statistics
  const calculateDepartmentStats = (records: AttendanceRecord[]): DepartmentStats[] => {
    const stats = new Map<string, { total: number; units: Map<string, number> }>();

    records.forEach(record => {
      const dept = stats.get(record.department) || { total: 0, units: new Map<string, number>() };
      dept.total++;
      dept.units.set(record.unit, (dept.units.get(record.unit) || 0) + 1);
      stats.set(record.department, dept);
    });

    return Array.from(stats.entries()).map(([department, data]) => ({
      department,
      totalRecords: data.total,
      unitStats: Object.fromEntries(data.units)
    }));
  };

  // Fetch records from Supabase
  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedRecords = (data as SupabaseRecord[]).map(toCamelCase);
      setRecords(transformedRecords);
      setDepartmentStats(calculateDepartmentStats(transformedRecords));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching records');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (record: Omit<AttendanceRecord, 'id'>) => {
    try {
      const { error } = await supabase
        .from('attendance_records')
        .insert(toSnakeCase(record));

      if (error) throw error;

      // Refresh records after successful insertion
      await fetchRecords();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the record');
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">外出登记系统</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">新增记录</h2>
        <AttendanceForm onSubmit={handleSubmit} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">部门统计</h2>
        <DepartmentStatsChart data={departmentStats} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">查询记录</h2>
        <SearchRecords records={records} />
      </div>
    </div>
  );
}

export default App;