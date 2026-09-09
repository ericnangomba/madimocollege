'use client';

import React, { useState } from 'react';
import { useLMS } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LandingView } from '@/components/landing/LandingView';
import { ApplyModal } from '@/components/landing/ApplyModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { CoursePlayer } from '@/components/player/CoursePlayer';
import { LecturerConsole } from '@/components/lecturer/LecturerConsole';
import { FinanceConsole } from '@/components/finance/FinanceConsole';
import { AdminConsole } from '@/components/admin/AdminConsole';

export default function Home() {
  const { currentRole, setRole } = useLMS();
  const [activeTab, setActiveTab] = useState<'landing' | 'student' | 'player' | 'lecturer' | 'finance' | 'admin'>('landing');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [playerInitialModule, setPlayerInitialModule] = useState('MET-101');

  const handleLaunchPlayer = (moduleCode: string) => {
    setPlayerInitialModule(moduleCode);
    setActiveTab('player');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* Collegiate Navbar with Persona / Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApplyModal={() => setIsApplyModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingView
            onOpenApplyModal={() => setIsApplyModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onNavigateToStudent={() => {
              if (currentRole === 'guest') setRole('student');
              setActiveTab('student');
            }}
            onNavigateToPlayer={() => {
              if (currentRole === 'guest') setRole('student');
              setActiveTab('player');
            }}
            onNavigateToAdmin={() => {
              setRole('admin');
              setActiveTab('admin');
            }}
          />
        )}

        {activeTab === 'student' && (
          <StudentDashboard
            onOpenPlayer={handleLaunchPlayer}
            onOpenApplyModal={() => setIsApplyModalOpen(true)}
          />
        )}

        {activeTab === 'player' && (
          <CoursePlayer
            initialModuleCode={playerInitialModule}
            onBackToDashboard={() => setActiveTab('student')}
          />
        )}

        {activeTab === 'lecturer' && <LecturerConsole />}

        {activeTab === 'finance' && <FinanceConsole />}

        {activeTab === 'admin' && <AdminConsole />}
      </main>

      {/* Prospective Student Application & MSCE Upload Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSuccessNavigateToStudent={() => {
          setActiveTab('student');
        }}
      />

      {/* Role-Based Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={(targetTab) => {
          setActiveTab(targetTab);
        }}
      />

      {/* Institutional Collegiate Footer */}
      <Footer />

    </div>
  );
}
