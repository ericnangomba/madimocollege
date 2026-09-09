'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLMS } from '@/lib/store';
import { UserRole } from '@/lib/types';
import {
  GraduationCap,
  ShieldCheck,
  CreditCard,
  BookOpen,
  UserCheck,
  Wifi,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  LogIn,
  LogOut,
  Award,
  Lock,
  User
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'student' | 'player' | 'lecturer' | 'finance' | 'admin';
  setActiveTab: (tab: 'landing' | 'student' | 'player' | 'lecturer' | 'finance' | 'admin') => void;
  onOpenApplyModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApplyModal,
  onOpenAuthModal
}) => {
  const { currentRole, currentUser, setRole, student } = useLMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    setRole('guest');
    setActiveTab('landing');
    setUserMenuOpen(false);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveTab('landing');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 shadow-xs bg-white border-b border-slate-200">
      
      {/* Top Banner Ribbon */}
      <div className="madimo-gradient-banner text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-heading font-bold text-amber-200 uppercase tracking-wider">
              MADIMO COLLEGE OF MISSIONS
            </span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="hidden sm:inline italic text-emerald-100 font-normal">
              « La connaissance, la sagesse et l&apos;excellence de Dieu »
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-emerald-100">
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-bold font-heading">
              JANUARY 2027 COHORT
            </span>
            <span className="hidden lg:flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full">
              <Wifi className="w-3 h-3 text-emerald-300" />
              <span>Low-Bandwidth Optimized</span>
            </span>
            <span className="hidden md:inline">Malawi MWK &amp; USD Tuition</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-amber-500 shadow-md transition-transform group-hover:scale-105 bg-white shrink-0">
              <Image
                src="/madimo-logo.jpg"
                alt="Madimo College Crest Logo"
                fill
                sizes="52px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl tracking-tight text-[#0A3764] leading-none">
                  MADIMO
                </span>
                <span className="font-heading font-extrabold text-sm tracking-widest text-[#C5A24D] leading-none">
                  COLLEGE
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">
                Missions &amp; Discipleship Mobilisation • Malawi
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP NAVIGATION: TEXT-ONLY WITH ACCENT COLOR & UNDERLINE LINE BAR      */}
          {/* ========================================================================= */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            
            {/* 1. Everyone sees 'Home' */}
            <button
              onClick={() => setActiveTab('landing')}
              className={`py-2 text-xs font-heading font-bold transition-all relative ${
                activeTab === 'landing'
                  ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                  : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
              }`}
            >
              Home
            </button>

            {/* 2. PUBLIC LINKS (Only visible when unauthenticated / guest) */}
            {currentRole === 'guest' && (
              <>
                <button
                  onClick={() => handleNavigateSection('programs')}
                  className="py-2 text-xs font-heading font-semibold text-slate-600 hover:text-[#0A3764] transition-all relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:rounded-full"
                >
                  Academic Programs
                </button>

                <button
                  onClick={() => handleNavigateSection('philosophy')}
                  className="py-2 text-xs font-heading font-semibold text-slate-600 hover:text-[#0A3764] transition-all relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:rounded-full"
                >
                  KNOW–BE–DO Model
                </button>

                <button
                  onClick={() => handleNavigateSection('tuition')}
                  className="py-2 text-xs font-heading font-semibold text-slate-600 hover:text-[#0A3764] transition-all relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:rounded-full"
                >
                  Tuition &amp; Aid
                </button>
              </>
            )}

            {/* 3. STUDENT AUTHENTICATED PAGES (Only visible to Student) */}
            {currentRole === 'student' && (
              <>
                <button
                  onClick={() => setActiveTab('student')}
                  className={`py-2 text-xs font-heading font-bold transition-all flex items-center gap-1.5 relative ${
                    activeTab === 'student'
                      ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                      : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A24D]" />
                  <span>My Courses &amp; Fees</span>
                </button>

                <button
                  onClick={() => setActiveTab('player')}
                  className={`py-2 text-xs font-heading font-bold transition-all flex items-center gap-1.5 relative ${
                    activeTab === 'player'
                      ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                      : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A24D]" />
                  <span>Interactive Course Player</span>
                </button>
              </>
            )}

            {/* 4. LECTURER AUTHENTICATED PAGES (Only visible to Lecturer) */}
            {currentRole === 'lecturer' && (
              <button
                onClick={() => setActiveTab('lecturer')}
                className={`py-2 text-xs font-heading font-bold transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'lecturer'
                    ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                    : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#C5A24D]" />
                <span>DBS Grading &amp; Mentorship</span>
              </button>
            )}

            {/* 5. FINANCE ADMIN AUTHENTICATED PAGES (Only visible to Finance) */}
            {currentRole === 'finance' && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`py-2 text-xs font-heading font-bold transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'finance'
                    ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                    : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#C5A24D]" />
                <span>Finance &amp; Bursar Console</span>
              </button>
            )}

            {/* 6. SYSTEM ADMIN AUTHENTICATED PAGES (Only visible to Admin) */}
            {currentRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`py-2 text-xs font-heading font-bold transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'admin'
                    ? 'text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-[#C5A24D] after:rounded-full'
                    : 'text-slate-600 hover:text-[#0A3764] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-transparent hover:after:bg-slate-300 after:transition-all after:rounded-full'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A24D]" />
                <span>Neo4j Graph &amp; Systems</span>
              </button>
            )}

          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            
            {/* If NOT Authenticated (Guest Visitor) */}
            {currentRole === 'guest' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <LogIn className="w-4 h-4 text-[#0A3764]" />
                  <span>Portal Sign In</span>
                </button>

                <button
                  onClick={onOpenApplyModal}
                  className="px-4 py-2 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Apply (Jan 2027)</span>
                </button>
              </div>
            ) : (
              /* If Authenticated: User Profile Chip & Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition-all text-xs font-heading font-bold text-slate-800 shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0A3764] text-amber-300 flex items-center justify-center font-black text-[11px]">
                    {currentUser.name[0]}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="block text-slate-900 leading-none">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal capitalize">{currentUser.role}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="font-heading font-bold text-xs text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-100 text-blue-900 capitalize">
                        {currentUser.title || currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onOpenAuthModal();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>Switch User Persona</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out (Return to Public)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setActiveTab('landing');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                activeTab === 'landing' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
              }`}
            >
              Home
            </button>

            {currentRole === 'guest' ? (
              <>
                <button
                  onClick={() => {
                    handleNavigateSection('programs');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-heading font-semibold text-slate-700"
                >
                  Academic Programs
                </button>
                <button
                  onClick={() => {
                    handleNavigateSection('philosophy');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-heading font-semibold text-slate-700"
                >
                  KNOW–BE–DO Model
                </button>
                <button
                  onClick={() => {
                    handleNavigateSection('tuition');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-heading font-semibold text-slate-700"
                >
                  Tuition &amp; Aid
                </button>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onOpenAuthModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 font-heading font-bold text-xs uppercase text-center"
                  >
                    Portal Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenApplyModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#C5A24D] text-white font-heading font-bold text-xs uppercase text-center"
                  >
                    Apply for January 2027
                  </button>
                </div>
              </>
            ) : (
              <>
                {currentRole === 'student' && (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('student');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                        activeTab === 'student' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
                      }`}
                    >
                      My Courses &amp; Fees
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('player');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                        activeTab === 'player' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
                      }`}
                    >
                      Course Player &amp; DBS
                    </button>
                  </>
                )}

                {currentRole === 'lecturer' && (
                  <button
                    onClick={() => {
                      setActiveTab('lecturer');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                      activeTab === 'lecturer' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
                    }`}
                  >
                    DBS Grading &amp; Mentorship
                  </button>
                )}

                {currentRole === 'finance' && (
                  <button
                    onClick={() => {
                      setActiveTab('finance');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                      activeTab === 'finance' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
                    }`}
                  >
                    Finance &amp; Bursar Console
                  </button>
                )}

                {currentRole === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-heading font-bold ${
                      activeTab === 'admin' ? 'text-[#0A3764] border-l-3 border-[#C5A24D]' : 'text-slate-700'
                    }`}
                  >
                    Neo4j Graph &amp; Systems
                  </button>
                )}

                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-heading font-bold text-xs uppercase text-center"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
