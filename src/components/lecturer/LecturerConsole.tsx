'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLMS } from '@/lib/store';
import { DBSSubmission } from '@/lib/types';
import {
  UserCheck,
  CheckCircle,
  Video,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export const LecturerConsole: React.FC = () => {
  const {
    currentUser,
    dbsSubmissions,
    gradeDBSSubmission,
    discipleshipGroups
  } = useLMS();

  const [selectedSubmission, setSelectedSubmission] = useState<DBSSubmission | null>(
    dbsSubmissions[0] || null
  );
  const [gradeInput, setGradeInput] = useState<'A' | 'B' | 'C'>('A');
  const [feedbackInput, setFeedbackInput] = useState('');
  const [justGraded, setJustGraded] = useState(false);

  const group = discipleshipGroups[0];

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    gradeDBSSubmission(
      selectedSubmission.submission_id,
      gradeInput,
      feedbackInput || 'Excellent reflection demonstrating biblical alignment and practical obedience.'
    );

    setJustGraded(true);
    setTimeout(() => setJustGraded(false), 3000);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      console.log('Confetti', err);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Lecturer Identity Banner */}
      <div className="rounded-3xl madimo-gradient-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                Staff ID: {currentUser.id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold">
                Faculty Mentor
              </span>
            </div>
            <h1 className="font-serif-college text-2xl sm:text-3xl font-black text-white">
              Lecturer &amp; Mentorship Console: {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Dean of Academics • Department of Teacher Formation &amp; Discipleship
            </p>
          </div>

          <a
            href={group?.meet_url || 'https://meet.google.com'}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all self-start md:self-auto"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Mentorship Meet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Grid: Assignment Grading Queue & Discipleship Group Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: DBS Assignment Queue (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="font-serif-college font-bold text-sm text-[#0A3764]">
                DBS Assignment Submissions ({dbsSubmissions.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Discovery Bible Study journals awaiting feedback
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[520px]">
            {dbsSubmissions.map((sub) => {
              const isSelected = selectedSubmission?.submission_id === sub.submission_id;
              return (
                <button
                  key={sub.submission_id}
                  onClick={() => {
                    setSelectedSubmission(sub);
                    setFeedbackInput(sub.feedback || '');
                    setGradeInput(sub.grade === 'UNGRADED' ? 'A' : sub.grade);
                  }}
                  className={`w-full p-4 text-left transition-colors flex items-start justify-between gap-3 ${
                    isSelected ? 'bg-amber-50/70 border-l-4 border-amber-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {sub.student_name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {sub.module_code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-academic-body italic truncate">
                      {sub.passage}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Submitted: {new Date(sub.submitted_at).toLocaleDateString()}
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    sub.grade === 'UNGRADED'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {sub.grade === 'UNGRADED' ? 'Review' : `Grade: ${sub.grade}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Grading & Review Workbench (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 shadow-xs p-6 space-y-6">
          {selectedSubmission ? (
            <div className="space-y-5">
              
              {/* Submission Header */}
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Submission #{selectedSubmission.submission_id}
                  </span>
                  <h3 className="font-serif-college font-bold text-lg text-[#0A3764]">
                    {selectedSubmission.student_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Module: <strong>{selectedSubmission.module_code}</strong> • Scripture: <em>{selectedSubmission.passage}</em>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">Current Grade:</span>
                  <p className="text-lg font-mono font-black text-[#0A3764]">
                    {selectedSubmission.grade}
                  </p>
                </div>
              </div>

              {/* KNOW - BE - DO Content Breakdown */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block">
                    1. KNOW (The Mind &amp; God&apos;s Word):
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-academic-body">
                    {selectedSubmission.know_reflection}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                    2. BE (The Heart &amp; Personal Conviction):
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-academic-body">
                    {selectedSubmission.be_reflection}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                    3. DO (Specific Obedience &amp; Multiplication):
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-academic-body">
                    {selectedSubmission.do_action}
                  </p>
                  <p className="text-[11px] text-amber-800 pt-1 font-semibold">
                    Target Disciple / Group: {selectedSubmission.share_target}
                  </p>
                </div>
              </div>

              {/* Grading Form */}
              <form onSubmit={handleGradeSubmit} className="pt-3 border-t border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Assign Grade:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['A', 'B', 'C'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGradeInput(g)}
                          className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                            gradeInput === g
                              ? 'bg-[#0A3764] text-white border-[#0A3764] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Grade {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Spiritual Formation Status:
                    </label>
                    <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold w-full">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Biblical Obedience Demonstrated</span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Formative Mentor Feedback (Visible to Student):
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Enter affirming and directive spiritual feedback for the student..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  {justGraded ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Grade and Feedback Saved!
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Save Grade &amp; Send Feedback</span>
                  </button>
                </div>
              </form>

            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs">
              Select an assignment submission from the queue to begin evaluation.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
