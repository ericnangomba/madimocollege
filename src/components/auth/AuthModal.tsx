'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLMS } from '@/lib/store';
import { UserRole } from '@/lib/types';
import {
  X,
  Lock,
  Mail,
  ArrowRight,
  BookOpen,
  UserCheck,
  CreditCard,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (targetTab: 'student' | 'player' | 'lecturer' | 'finance' | 'admin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const { setRole } = useLMS();
  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = (role: UserRole, targetTab: 'student' | 'player' | 'lecturer' | 'finance' | 'admin') => {
    setRole(role);
    onSuccessLogin(targetTab);
    onClose();
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to student if no specific match
    if (email.includes('banda') || email.includes('lecturer')) {
      setRole('lecturer');
      onSuccessLogin('lecturer');
    } else if (email.includes('mwale') || email.includes('finance')) {
      setRole('finance');
      onSuccessLogin('finance');
    } else if (email.includes('tembo') || email.includes('admin')) {
      setRole('admin');
      onSuccessLogin('admin');
    } else {
      setRole('student');
      onSuccessLogin('student');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="madimo-gradient-navy p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-white mx-auto mb-3 shadow-md">
            <Image src="/madimo-logo.jpg" alt="Logo" fill sizes="64px" className="object-contain p-0.5" />
          </div>

          <h3 className="font-heading font-black text-xl text-white">
            Madimo Online Portal Sign In
          </h3>
          <p className="text-xs text-amber-200 font-medium mt-0.5">
            Role-Based Access Control • Low-Bandwidth Digital Campus
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold font-heading">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'quick'
                ? 'border-[#0A3764] text-[#0A3764] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Select Role Demo
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'credentials'
                ? 'border-[#0A3764] text-[#0A3764] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Email &amp; Password
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'quick' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                Click an authenticated profile below to instantly experience their permissions and dedicated views:
              </p>

              {/* Student */}
              <button
                onClick={() => handleQuickLogin('student', 'student')}
                className="w-full p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-heading text-slate-900">
                        Grace Phiri (Student)
                      </span>
                      <span className="text-[10px] bg-blue-200 text-blue-950 px-1.5 py-0.2 rounded font-semibold">
                        Student Role
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Enrolled Courses, Mobile Money Payments &amp; DBS Journals
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Lecturer */}
              <button
                onClick={() => handleQuickLogin('lecturer', 'lecturer')}
                className="w-full p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-heading text-slate-900">
                        Dr. Chimwemwe Banda
                      </span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-950 px-1.5 py-0.2 rounded font-semibold">
                        Lecturer Role
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Assignment Grading Queue &amp; Discipleship Cohorts
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Finance */}
              <button
                onClick={() => handleQuickLogin('finance', 'finance')}
                className="w-full p-3.5 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-heading text-slate-900">
                        Ethel Mwale (Finance Bursar)
                      </span>
                      <span className="text-[10px] bg-purple-200 text-purple-950 px-1.5 py-0.2 rounded font-semibold">
                        Finance Role
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Airtel/TNM Reconciliation &amp; 50% Scholarships
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Admin */}
              <button
                onClick={() => handleQuickLogin('admin', 'admin')}
                className="w-full p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 transition-all flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-heading text-slate-900">
                        Kondwani Tembo
                      </span>
                      <span className="text-[10px] bg-rose-200 text-rose-950 px-1.5 py-0.2 rounded font-semibold">
                        System Admin
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Academic Catalog, Neo4j Graph DB &amp; System Health
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-heading text-slate-700 uppercase mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="grace.phiri@student.madimo.ac.mw"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A3764] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-heading text-slate-700 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#0A3764] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0A3764] hover:bg-[#072445] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Authenticate &amp; Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
