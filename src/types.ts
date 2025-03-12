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