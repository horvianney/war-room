export type EmployeeStatus = "present" | "late" | "absent" | "on_leave" | "off_duty";

export type AlertSeverity = "critical" | "warning" | "info";

export type Department =
  | "Type a"
  | "Type b"
  | "Type c"
  | "Type d"
  | "Type e"
  | "Type f";

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  status: EmployeeStatus;
  avatar?: string;
  initials: string;
  checkInTime?: string;
  expectedTime: string;
  zone?: string;
  phone: string;
  performanceScore: number;
  shiftsThisWeek: number;
}

export interface Zone {
  id: string;
  name: string;
  capacity: number;
  current: number;
  color: string;
  icon: string;
  employees: string[];
}

export interface Alert {
  id: string;
  type: "absence" | "late" | "overload" | "understaffed" | "emergency";
  severity: AlertSeverity;
  message: string;
  detail: string;
  timestamp: string;
  acknowledged: boolean;
  employeeId?: string;
  zoneId?: string;
}

export interface KPIData {
  present: number;
  late: number;
  absent: number;
  onLeave: number;
  total: number;
  punctualityRate: number;
  presenceRate: number;
}

export interface AttendancePoint {
  hour: string;
  present: number;
  expected: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: "employee" | "zone" | "shift" | "alert";
  entityId: string;
  entityName: string;
  userId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
