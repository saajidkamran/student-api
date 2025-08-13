export type Class = { id: number; name: string };

export type Student = { id: number; fullName: string; classId: number };

export type Period = {
  id: number;
  classId: number;
  name: string;
  startTime: string;
  endTime: string;
};

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export type Attendance = {
  id: number;
  studentId: number;
  periodId: number;
  classId: number;
  date: string; //TODO: change to date type
  status: AttendanceStatus;
};

export type AttendanceFilters = {
  classId?: number | undefined;
  date?: string | undefined;
  periodId?: number | undefined;
};

export type UpsertAttendance = Omit<Attendance, 'id'>;

