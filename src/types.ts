export type PersonnelType = 'officer' | 'soldier' | 'civilian';

export interface LeaveRecord {
  id: string;
  name: string;
  personnelType: PersonnelType;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface MonthlyStats {
  month: string;
  officer: number;
  soldier: number;
  civilian: number;
}

export interface AttendanceRecord {
  id: number;
  department: string;      // 部门
  unit: string;           // 科室
  name: string;           // 姓名
  militaryControl?: string; // 军管
  startDate: string;      // 开始日期
  startTime: string;      // 开始时间
  endDate: string;        // 结束日期
  endTime: string;        // 结束时间
  location: string;       // 外出地点
  reason: string;         // 外出事由
  contact?: string;       // 联系方式
  approver?: string;      // 批准人
}

export interface DepartmentStats {
  department: string;
  totalRecords: number;
  unitStats: {
    [unit: string]: number;
  };
}

export interface TimeStats {
  timeRange: string;
  count: number;
}