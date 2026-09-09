'use client';

import React, { useState } from 'react';
import { useLMS } from '@/lib/store';
import { CourseModule } from '@/lib/types';
import { PaymentModal } from './PaymentModal';
import {
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Phone,
  Video,
  Users,
  Award,
  Sparkles,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenPlayer: (moduleCode: string) => void;
  onOpenApplyModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenPlayer,
  onOpenApplyModal
}) => {
  const {
    student,
    programs,
    transactions,
    isModuleUnlocked,
    getRequiredFee,
    getModulePaidAmount,
    discipleshipGroups,
    addPrayerRequest
  } = useLMS();

  const [paymentModalModule, setPaymentModalModule] = useState<CourseModule | null>(null);
  const [newPrayerText, setNewPrayerText] = useState('');

  const currentGroup = discipleshipGroups[0];

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerText.trim()) return;
    addPrayerRequest(newPrayerText.trim());
    setNewPrayerText('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Student Identity Banner */}
      <div className="rounded-3xl madimo-gradient-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-[#C5A24D]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                ID: {student.student_id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> MSCE Verified
              </span>
              {student.scholarship_active && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-300" /> 50% Scholarship Active
                </span>
              )}
            </div>

            <h1 className="font-serif-college text-2xl sm:text-3xl font-black text-white">
              Welcome back, {student.first_name} {student.last_name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              Cohort: <strong>January 2027</strong> • Calling: <em>&ldquo;{student.calling_statement}&rdquo;</em>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-right space-y-1 self-start md:self-auto">
            <p className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              Discipleship Cohort
            </p>
            <p className="text-xs font-bold text-amber-300">
              {student.discipleship_group_name}
            </p>
            <p className="text-[11px] text-slate-300">
              Mentor: <strong>{student.mentor_name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Enrolled Programs & Access Gating Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-college text-xl sm:text-2xl font-bold text-[#0A3764]">
              My Academic Modules
            </h2>
            <p className="text-xs text-slate-500">
              Access to lecture videos and DBS assignment journals is unlocked upon term fee settlement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((module) => {
            const isUnlocked = isModuleUnlocked(module.code);
            const { mwk: requiredMwk, isDiscounted } = getRequiredFee(module.code);
            const paid = getModulePaidAmount(module.code);
            const balance = Math.max(0, requiredMwk - paid);

            return (
              <div
                key={module.code}
                className={`rounded-2xl border bg-white flex flex-col justify-between overflow-hidden transition-all shadow-xs hover:shadow-md ${
                  isUnlocked
                    ? 'border-emerald-200 ring-1 ring-emerald-100'
                    : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                {/* Module Header */}
                <div className="p-5 border-b border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0A3764] text-white">
                      {module.code}
                    </span>
                    {isUnlocked ? (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-600" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-700" /> Locked (Unpaid)
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-college font-bold text-base text-slate-900 leading-snug">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {module.school}
                  </p>

                  {/* Progress or Fee Notice */}
                  {isUnlocked ? (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Course Progress</span>
                        <span className="text-emerald-700">65% Completed</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full w-[65%]" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Fee Balance Required:</span>
                        <span className="font-mono">MWK {balance.toLocaleString()}</span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {isDiscounted
                          ? '50% Scholarship applied (MWK 150,000)'
                          : 'Standard fee: MWK 300,000'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Module Details & Action */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Lessons: {module.lessons.length} Units</span>
                    <span>Credits: {module.credits}</span>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => onOpenPlayer(module.code)}
                      className="w-full py-2.5 rounded-xl bg-[#0A3764] hover:bg-[#072445] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <PlayCircle className="w-4 h-4 text-amber-400" />
                      <span>Continue Learning</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPaymentModalModule(module)}
                      className="w-full py-2.5 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all animate-pulse"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Term Fees to Unlock</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Discipleship & Spiritual Formation Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Living Waters Discipleship Cohort */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-serif-college font-bold text-base text-slate-900">
                  {currentGroup.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentGroup.schedule} • Facilitated by {currentGroup.mentor_name}
                </p>
              </div>
            </div>
            <a
              href={currentGroup.meet_url}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Live Prayer Meet</span>
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 text-xs">
            <p className="font-bold uppercase text-[10px] tracking-wider text-emerald-800">
              Weekly Discipleship Theme:
            </p>
            <p className="font-serif-college text-sm font-semibold text-emerald-950 mt-0.5">
              &ldquo;{currentGroup.weekly_theme}&rdquo;
            </p>
          </div>

          {/* Prayer Request Stream */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Cohort Prayer Wall:
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {currentGroup.prayer_requests.map((pr) => (
                <div key={pr.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex justify-between font-bold text-slate-800 mb-1">
                    <span>{pr.student_name}</span>
                    <span className="text-[10px] text-slate-400">{pr.date}</span>
                  </div>
                  <p className="text-slate-600 italic">&ldquo;{pr.request}&rdquo;</p>
                </div>
              ))}
            </div>

            {/* Post prayer request form */}
            <form onSubmit={handlePrayerSubmit} className="pt-2 flex gap-2">
              <input
                type="text"
                value={newPrayerText}
                onChange={(e) => setNewPrayerText(e.target.value)}
                placeholder="Submit prayer or ministry breakthrough for cohort..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Transaction History & Receipts */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif-college font-bold text-base text-slate-900">
                Payment History &amp; Ledger
              </h3>
            </div>
            <span className="text-xs text-slate-500">Live Webhook Log</span>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 3).map((tx) => (
              <div
                key={tx.reference_id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-slate-900 block">
                      {tx.reference_id}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(tx.timestamp).toLocaleDateString()} via {tx.gateway}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {tx.currency} {tx.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200">
                  <span className="text-slate-600 truncate max-w-[180px]">
                    {tx.module_code}: {tx.module_title}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ✓ {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Payment Modal */}
      {paymentModalModule && (
        <PaymentModal
          module={paymentModalModule}
          isOpen={!!paymentModalModule}
          onClose={() => setPaymentModalModule(null)}
        />
      )}

    </div>
  );
};
