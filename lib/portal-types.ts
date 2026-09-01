export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
}

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

export type PaymentIntentStatus =
  | "INITIALIZED"
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "EXPIRED";

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  description: string;
  amount: number;
  dueDate: string;
  paidAmount: number;
  status: "UNPAID" | "PARTIAL" | "PAID";
  createdAt: string;
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  amountPaid: number;
  paymentMethod: string;
  referenceNo: string;
  allocationTarget: string;
  dateProcessed: string;
}

export interface PaymentIntentSummary {
  id: string;
  reference: string;
  status: PaymentIntentStatus;
  amount: number;
  createdAt: string;
  authorizationUrl?: string | null;
}

export interface StudentFeesSummary {
  student: {
    id: string;
    studentId: string;
    studentName: string;
  };

  balance: number;
  invoices: FeeInvoice[];
  payments: FeePayment[];
  pendingIntent: PaymentIntentSummary | null;
}

export interface PaymentIntentInitialization {
  id: string;
  reference: string;
  status: PaymentIntentStatus;
  amount: number;
  currency: string;
  authorizationUrl?: string;
  accessCode?: string;
  resumed?: boolean;
}

export interface PaymentIntentStatusDetails {
  id: string;
  reference: string;
  status: PaymentIntentStatus;
  amount: number;
  currency: string;
  channel?: string | null;
  paidAt?: string | null;
  createdAt: string;
  verificationTriggered: boolean;
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

export interface GradeRecord {
  id: string;

  subject: {
    id: string;
    name: string;
    code: string;
  } | null;

  class: StudentClass | null;

  term: {
    id: string;
    name: string;
    academicYear: string;
  } | null;

  continuousAssessment: number;
  examination: number;
  finalScore: number;
  letterGrade: string;
  gradePoints: number;
  creditHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentGradebook {
  student: {
    id: string;
    publicStudentId: string;
    studentName: string;
  };

  summary: {
    recordCount: number;
    totalCreditHours: number;
    weightedGpa: number;
    storedGpa: number;
    termId: string | null;
  };

  records: GradeRecord[];
}

export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "EXCUSED";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceMetrics {
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  totalCount: number;
  rate: number;
}

export interface StudentAttendanceHistory {
  studentId: string;
  publicStudentId: string;
  history: AttendanceRecord[];
  metrics: AttendanceMetrics;
}
