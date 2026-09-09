'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  CourseModule,
  Student,
  Transaction,
  DBSSubmission,
  DiscipleshipGroup,
  StudentApplication,
  PaymentGateway
} from './types';
import {
  INITIAL_PROGRAMS,
  INITIAL_STUDENT,
  INITIAL_TRANSACTIONS,
  INITIAL_DBS_SUBMISSIONS,
  INITIAL_DISCIPLESHIP_GROUPS,
  DEMO_USERS
} from './data';

interface LMSContextType {
  // Current session
  currentRole: UserRole;
  currentUser: UserProfile;
  setRole: (role: UserRole) => void;

  // Domain data
  programs: CourseModule[];
  student: Student;
  transactions: Transaction[];
  dbsSubmissions: DBSSubmission[];
  discipleshipGroups: DiscipleshipGroup[];
  applications: StudentApplication[];

  // Financial & access gating helpers
  getRequiredFee: (moduleCode: string) => { mwk: number; usd: number; isDiscounted: boolean };
  getModulePaidAmount: (moduleCode: string) => number;
  isModuleUnlocked: (moduleCode: string) => boolean;

  // Actions
  processPayment: (params: {
    moduleCode: string;
    amount: number;
    currency: 'MWK' | 'USD';
    gateway: PaymentGateway;
    phoneOrCard: string;
  }) => Promise<{ success: boolean; referenceId: string }>;
  
  toggleScholarship: (active?: boolean) => void;
  approveTransaction: (referenceId: string) => void;
  submitDBSSubmission: (submission: Omit<DBSSubmission, 'submission_id' | 'submitted_at' | 'grade'>) => void;
  gradeDBSSubmission: (submissionId: string, grade: 'A' | 'B' | 'C', feedback: string) => void;
  submitApplication: (app: Omit<StudentApplication, 'applicant_id' | 'submitted_at' | 'status'>) => Promise<string>;
  addPrayerRequest: (request: string) => void;
  resetToDefaults: () => void;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'madimo_role_v1',
  STUDENT: 'madimo_student_v1',
  TRANSACTIONS: 'madimo_tx_v1',
  DBS: 'madimo_dbs_v1',
  APPLICATIONS: 'madimo_apps_v1',
  GROUPS: 'madimo_groups_v1'
};

export const LMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [student, setStudent] = useState<Student>(INITIAL_STUDENT);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [dbsSubmissions, setDbsSubmissions] = useState<DBSSubmission[]>(INITIAL_DBS_SUBMISSIONS);
  const [discipleshipGroups, setDiscipleshipGroups] = useState<DiscipleshipGroup[]>(INITIAL_DISCIPLESHIP_GROUPS);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole;
      if (savedRole && DEMO_USERS[savedRole]) setCurrentRole(savedRole);

      const savedStudent = localStorage.getItem(STORAGE_KEYS.STUDENT);
      if (savedStudent) setStudent(JSON.parse(savedStudent));

      const savedTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (savedTx) setTransactions(JSON.parse(savedTx));

      const savedDBS = localStorage.getItem(STORAGE_KEYS.DBS);
      if (savedDBS) setDbsSubmissions(JSON.parse(savedDBS));

      const savedApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedGroups = localStorage.getItem(STORAGE_KEYS.GROUPS);
      if (savedGroups) setDiscipleshipGroups(JSON.parse(savedGroups));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEYS.DBS, JSON.stringify(dbsSubmissions));
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(discipleshipGroups));
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [currentRole, student, transactions, dbsSubmissions, applications, discipleshipGroups, isHydrated]);

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.guest;

  const setRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
  };

  // Fee calculation taking 50% scholarship into account
  const getRequiredFee = (moduleCode: string) => {
    const mod = INITIAL_PROGRAMS.find((p) => p.code === moduleCode);
    const baseMwk = mod ? mod.term_fee_mwk : 300000;
    const baseUsd = mod ? mod.term_fee_usd : 180;
    const isDiscounted = student.scholarship_active;

    return {
      mwk: isDiscounted ? baseMwk * 0.5 : baseMwk,
      usd: isDiscounted ? Math.round(baseUsd * 0.5) : baseUsd,
      isDiscounted
    };
  };

  // Sum of completed payments for student
  const getModulePaidAmount = (moduleCode: string) => {
    return transactions
      .filter(
        (t) =>
          t.student_id === student.student_id &&
          t.module_code === moduleCode &&
          t.status === 'COMPLETED'
      )
      .reduce((sum, t) => sum + (t.currency === 'MWK' ? t.amount : t.amount * 1700), 0);
  };

  // Unlock check: Paid amount >= required term fee
  const isModuleUnlocked = (moduleCode: string) => {
    // If user is lecturer or admin, they have full preview access
    if (currentRole === 'lecturer' || currentRole === 'admin' || currentRole === 'finance') {
      return true;
    }

    const { mwk: requiredMwk } = getRequiredFee(moduleCode);
    const paid = getModulePaidAmount(moduleCode);
    return paid >= requiredMwk;
  };

  // Process mobile money / card payment
  const processPayment = async ({
    moduleCode,
    amount,
    currency,
    gateway,
    phoneOrCard
  }: {
    moduleCode: string;
    amount: number;
    currency: 'MWK' | 'USD';
    gateway: PaymentGateway;
    phoneOrCard: string;
  }) => {
    const mod = INITIAL_PROGRAMS.find((p) => p.code === moduleCode);
    const refPrefix =
      gateway === 'AirtelMoney' ? 'AIRTEL-MW' : gateway === 'TNMMpamba' ? 'TNM-MP' : 'STRIPE-INT';
    const referenceId = `${refPrefix}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newTx: Transaction = {
      reference_id: referenceId,
      student_id: student.student_id,
      student_name: `${student.first_name} ${student.last_name}`,
      module_code: moduleCode,
      module_title: mod ? mod.title : moduleCode,
      amount,
      currency,
      gateway,
      phone_or_card: phoneOrCard,
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      verified_by: gateway === 'Stripe' ? 'STRIPE_WEBHOOK' : 'INSTANT_USSD_PROMPT',
      notes: `Term fee payment via ${gateway} for ${moduleCode}`
    };

    setTransactions((prev) => [newTx, ...prev]);
    return { success: true, referenceId };
  };

  // Toggle 50% scholarship
  const toggleScholarship = (active?: boolean) => {
    setStudent((prev) => ({
      ...prev,
      scholarship_active: active !== undefined ? active : !prev.scholarship_active
    }));
  };

  // Finance approve pending transaction
  const approveTransaction = (referenceId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.reference_id === referenceId
          ? { ...t, status: 'COMPLETED', verified_by: 'FIN-002 (Ethel Mwale)' }
          : t
      )
    );
  };

  // Submit DBS Journal
  const submitDBSSubmission = (submission: Omit<DBSSubmission, 'submission_id' | 'submitted_at' | 'grade'>) => {
    const newSubmission: DBSSubmission = {
      ...submission,
      submission_id: `DBS-2027-${Math.floor(100 + Math.random() * 900)}`,
      grade: 'UNGRADED',
      submitted_at: new Date().toISOString()
    };
    setDbsSubmissions((prev) => [newSubmission, ...prev]);
  };

  // Grade DBS
  const gradeDBSSubmission = (submissionId: string, grade: 'A' | 'B' | 'C', feedback: string) => {
    setDbsSubmissions((prev) =>
      prev.map((sub) =>
        sub.submission_id === submissionId
          ? {
              ...sub,
              grade,
              feedback,
              graded_by: 'Dr. Chimwemwe Banda'
            }
          : sub
      )
    );
  };

  // Submit prospective student application
  const submitApplication = async (
    appData: Omit<StudentApplication, 'applicant_id' | 'submitted_at' | 'status'>
  ) => {
    const applicantId = `APP-2027-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: StudentApplication = {
      ...appData,
      applicant_id: applicantId,
      status: 'PENDING_REVIEW',
      submitted_at: new Date().toISOString()
    };
    setApplications((prev) => [newApp, ...prev]);
    return applicantId;
  };

  // Add prayer request to discipleship cohort
  const addPrayerRequest = (request: string) => {
    setDiscipleshipGroups((prev) =>
      prev.map((g, idx) =>
        idx === 0
          ? {
              ...g,
              prayer_requests: [
                {
                  id: `PR-${Date.now()}`,
                  student_name: `${student.first_name} ${student.last_name}`,
                  request,
                  date: new Date().toISOString().split('T')[0]
                },
                ...g.prayer_requests
              ]
            }
          : g
      )
    );
  };

  // Reset to default initial state
  const resetToDefaults = () => {
    setStudent(INITIAL_STUDENT);
    setTransactions(INITIAL_TRANSACTIONS);
    setDbsSubmissions(INITIAL_DBS_SUBMISSIONS);
    setDiscipleshipGroups(INITIAL_DISCIPLESHIP_GROUPS);
    setApplications([]);
    localStorage.clear();
  };

  return (
    <LMSContext.Provider
      value={{
        currentRole,
        currentUser,
        setRole,
        programs: INITIAL_PROGRAMS,
        student,
        transactions,
        dbsSubmissions,
        discipleshipGroups,
        applications,
        getRequiredFee,
        getModulePaidAmount,
        isModuleUnlocked,
        processPayment,
        toggleScholarship,
        approveTransaction,
        submitDBSSubmission,
        gradeDBSSubmission,
        submitApplication,
        addPrayerRequest,
        resetToDefaults
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider');
  }
  return context;
};
