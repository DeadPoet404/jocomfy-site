export interface StudentClass {
  id: string;
  name: string;
  section?: string | null;
}

export interface StudentPlacement {
  academicTrack: string;
  boardingStatus: string;
  class?: StudentClass | null;
  className?: string | null;
}

export interface GuardianSummary {
  name: string;
  relationship: string;
  phone: string;
  email?: string | null;
}

export interface StudentProfile {
  id: string;
  studentId: string;
  studentName: string;
  enrollmentDate: string;
  status: string;
  currentGpa: number;
  attendanceRate: number;

  placement?: StudentPlacement | null;

  demographics?: {
    dateOfBirth: string;
    gender: string;
  } | null;

  guardians: GuardianSummary[];
}

export interface StudentFeesSummary {
  balance: number;
}

export interface TimetablePeriod {
  periodNumber: number;
  dayOfWeek?: string | null;
  startTime: string;
  endTime: string;
}

export interface TimetableBreak {
  name: string;
  dayOfWeek?: string | null;
  startTime: string;
  endTime: string;
}

export interface SubjectAllocation {
  subjectName: string;
  teacherName?: string | null;
  dayOfWeek?: string | null;
}

export interface StudentTimetable {
  periodsCount: number;
  periods: TimetablePeriod[];
  breaks: TimetableBreak[];
  subjects: SubjectAllocation[];
}

export interface StudentTimetableResponse {
  class: {
    id: string;
    name: string;
  };

  timetable: StudentTimetable | null;
}

export interface ScheduleRow {
  time: string;
  label: string;
  kind: "period" | "break";
}
