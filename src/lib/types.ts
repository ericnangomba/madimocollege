export type UserRole = 'guest' | 'student' | 'lecturer' | 'finance' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  title?: string;
}

export interface CourseModule {
  code: string;
  title: string;
  level: 'Certificate' | 'Diploma';
  school: string;
  department: string;
  credits: number;
  term_fee_mwk: number;
  term_fee_usd: number;
  description: string;
  learning_outcomes: string[];
  prerequisites: string;
  lecturer: {
    staff_id: string;
    name: string;
    title: string;
    email: string;
  };
  lessons: Lesson[];
  launch_cohort: string;
  status: 'ACTIVE' | 'UPCOMING';
  badge_color?: string;
}

export interface Lesson {
  id: string;
  module_code: string;
  order: number;
  title: string;
  duration_minutes: number;
  video_url: string;
  low_bandwidth_audio_url: string;
  notes_pdf_title: string;
  notes_content: string;
  dbs_passage: string;
  dbs_context: string;
}

export interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  district: string;
  country: string;
  msce_verified: boolean;
  scholarship_active: boolean; // 50% discount if true
  discipleship_group_id: string;
  discipleship_group_name: string;
  mentor_name: string;
  calling_statement: string;
  created_at: string;
}

export interface Enrollment {
  student_id: string;
  module_code: string;
  status: 'ENROLLED' | 'COMPLETED' | 'LOCKED_UNPAID';
  progress_pct: number;
  enrolled_at: string;
  completed_lessons: string[];
}

export type PaymentGateway = 'AirtelMoney' | 'TNMMpamba' | 'Stripe';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  reference_id: string;
  student_id: string;
  student_name: string;
  module_code: string;
  module_title: string;
  amount: number;
  currency: 'MWK' | 'USD';
  gateway: PaymentGateway;
  phone_or_card: string;
  status: PaymentStatus;
  timestamp: string;
  verified_by?: string;
  notes?: string;
}

export interface DBSSubmission {
  submission_id: string;
  student_id: string;
  student_name: string;
  module_code: string;
  lesson_id: string;
  passage: string;
  know_reflection: string; // What does this teach about God?
  be_reflection: string;   // What does this teach about people/myself?
  do_action: string;       // What specific obedience step will I take today?
  share_target: string;    // Who will I share this with this week?
  grade: 'UNGRADED' | 'A' | 'B' | 'C';
  feedback?: string;
  graded_by?: string;
  submitted_at: string;
}

export interface DiscipleshipGroup {
  group_id: string;
  name: string;
  mentor_id: string;
  mentor_name: string;
  schedule: string;
  meet_url: string;
  weekly_theme: string;
  prayer_requests: {
    id: string;
    student_name: string;
    request: string;
    date: string;
  }[];
}

export interface StudentApplication {
  applicant_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  district: string;
  program_code: string;
  msce_certificate_name: string;
  calling_statement: string;
  status: 'PENDING_REVIEW' | 'ACCEPTED' | 'REJECTED';
  submitted_at: string;
}
