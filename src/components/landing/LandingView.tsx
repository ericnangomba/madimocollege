'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLMS } from '@/lib/store';
import {
  GraduationCap,
  BookOpen,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  Calendar,
  Globe2,
  HeartHandshake,
  Layers,
  ChevronRight,
  Download,
  Wifi,
  DollarSign
} from 'lucide-react';

interface LandingViewProps {
  onOpenApplyModal: () => void;
  onOpenAuthModal: () => void;
  onNavigateToStudent: () => void;
  onNavigateToPlayer: () => void;
  onNavigateToAdmin: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onOpenApplyModal,
  onOpenAuthModal,
  onNavigateToStudent,
  onNavigateToPlayer,
  onNavigateToAdmin
}) => {
  const { programs, student } = useLMS();
  const [activePedagogyTab, setActivePedagogyTab] = useState<'know' | 'be' | 'do'>('know');
  const [selectedProgramCode, setSelectedProgramCode] = useState<string>('MET-101');

  const selectedProgram = programs.find((p) => p.code === selectedProgramCode) || programs[0];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: INTENTIONAL COLLEGIATE IDENTITY & BRANDING              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden text-white pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[#062242]">
        {/* Background Image of Missions College Students with Atmospheric Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-students.jpg"
            alt="Madimo College of Missions students studying outdoors on campus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Institutional Rich Gradient Overlay for High Contrast & Brand Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062242]/95 via-[#0A3764]/90 to-[#0A3764]/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#062242]/40 to-[#062242]/90" />
        </div>

        {/* Subtle background ambient circles */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#C5A24D]/15 blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#3F522C]/20 blur-3xl pointer-events-none z-1" />
        
        {/* Subtle decorative grid */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(#C5A24D 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Half: Text & Intentional Admissions Appeal (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10 py-6">
              
              {/* Cohort & Quality Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A24D]/40 text-amber-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>JANUARY 2027 LAUNCH COHORT • ENROLLMENT OPEN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Majestic University Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight">
                Forming Master Educators, Servant Leaders &amp; <span className="text-[#C5A24D]">Marketplace Missionaries</span>
              </h1>

              {/* Subtitle & Mission */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Madimo College of Missions integrates academic excellence with biblical formation through our revolutionary <strong className="text-amber-300 font-semibold">KNOW–BE–DO</strong> framework. Delivering accessible, low-bandwidth digital learning across Malawi and Africa.
              </p>

              {/* Dual Financial Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <div className="px-3 py-1.5 rounded-lg bg-black/25 border border-white/10 text-xs flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Tuition: <strong>MWK 300,000 / Term</strong> (USD $180)</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-xs flex items-center gap-2 text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>50% Scholarship Active for Rural Educators</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onOpenApplyModal}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white font-heading font-bold text-sm tracking-wider shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5 text-amber-100" />
                  <span>Apply for January 2027</span>
                  <ChevronRight className="w-4 h-4 text-amber-200" />
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Enter Student LMS Portal</span>
                </button>
              </div>

              {/* Malawian Gateway Support Snippet */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
                <span className="font-semibold text-amber-200">Instant Local Settlement:</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Airtel Money (*211#)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> TNM Mpamba (*444#)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" /> Stripe (USD)
                </span>
              </div>
            </div>

            {/* Right Half: Entire Right Side Occupied by Graduate Student Image (6 cols) */}
            <div className="lg:col-span-6 relative w-full flex flex-col items-center justify-start lg:-mt-16 xl:-mt-20">
              
              {/* Radiant Ambient Light behind the graduate */}
              <div className="absolute inset-0 bg-radial from-[#C5A24D]/35 via-[#0A3764]/20 to-transparent blur-3xl pointer-events-none" />

              {/* High-res Graduate Image occupying full width, aspect-square aligned with head opposite Forming Master */}
              <div className="relative w-full max-w-[560px] sm:max-w-[600px] lg:max-w-[640px] aspect-square flex items-start justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] group">
                <Image
                  src="/images/graduate-student.png"
                  alt="Madimo College Graduate in Official Academic Regalia"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle bottom fade to blend gown cleanly */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#062242] via-[#062242]/70 to-transparent pointer-events-none z-10" />

                {/* Floating Excellence Badge Centered with Her: Hides Graduation Gown Bottom Edge Ends */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 sm:left-[57%] -translate-x-1/2 w-[92%] sm:w-[86%] max-w-[370px] p-4 sm:p-5 rounded-2xl bg-[#062242]/95 backdrop-blur-md border border-[#C5A24D]/60 shadow-[0_20px_45px_rgba(0,0,0,0.85)] z-20 text-center space-y-1.5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest font-heading">
                      Madimo Graduate
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white font-heading italic leading-snug">
                    « La connaissance, la sagesse et l&apos;excellence de Dieu »
                  </p>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Equipped Christian Educator &amp; Marketplace Pioneer
                  </p>
                  <div className="pt-2 border-t border-white/15 flex items-center justify-center gap-3 text-[11px] text-emerald-300 font-bold font-heading">
                    <span>100% Accredited</span>
                    <span className="text-amber-400/60">•</span>
                    <span>January 2027</span>
                  </div>
                </div>

                {/* Floating Stat Pill on Top Right */}
                <div className="absolute top-8 right-2 sm:right-4 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold font-heading flex items-center gap-2 shadow-lg z-20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>3 Flagship Launch Programs</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE FLAGSHIP LAUNCH PROGRAMS (JANUARY 2027)                          */}
      {/* ========================================================================= */}
      <section id="programs" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Academic Catalog • Launch Programs</span>
            </div>
            <h2 className="font-serif-college text-3xl sm:text-4xl font-black text-[#0A3764]">
              Accredited Foundations for Ministry &amp; Profession
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tailored for Malawian and international students desiring to integrate their professional career with multiplying discipleship.
            </p>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog) => {
              const isSelected = selectedProgramCode === prog.code;
              return (
                <div
                  key={prog.code}
                  className={`rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                    isSelected ? 'ring-2 ring-[#C5A24D] border-[#C5A24D]' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header Banner */}
                    <div className="p-6 border-b border-slate-100 bg-linear-to-b from-slate-50 to-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#0A3764] text-white">
                          {prog.code}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {prog.credits} Credits
                        </span>
                      </div>
                      <h3 className="font-serif-college font-bold text-xl text-[#0A3764] leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {prog.school}
                      </p>
                    </div>

                    {/* Body Info */}
                    <div className="p-6 space-y-4 text-xs text-slate-600">
                      <p className="leading-relaxed">
                        {prog.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <p className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                          Key Learning Competencies:
                        </p>
                        <ul className="space-y-1.5">
                          {prog.learning_outcomes.slice(0, 3).map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mentor Preview */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0A3764] text-amber-200 flex items-center justify-center font-bold text-xs shrink-0">
                          {prog.lecturer.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {prog.lecturer.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {prog.lecturer.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee & Action Bar */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">Term Tuition:</span>
                        <span className="text-lg font-black text-[#0A3764]">
                          MWK {prog.term_fee_mwk.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">(${prog.term_fee_usd} USD)</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        50% Aid Eligible
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => {
                          setSelectedProgramCode(prog.code);
                          onNavigateToPlayer();
                        }}
                        className="py-2.5 px-3 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold uppercase tracking-wider text-center transition-all"
                      >
                        View Syllabus
                      </button>
                      <button
                        onClick={onOpenApplyModal}
                        className="py-2.5 px-3 rounded-lg bg-[#C5A24D] hover:bg-[#B48C36] text-white text-xs font-bold uppercase tracking-wider text-center shadow-xs transition-all"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE KNOW–BE–DO HOLISTIC FORMATION MODEL (INTERACTIVE SHOWCASE)          */}
      {/* ========================================================================= */}
      <section id="philosophy" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif-college font-bold tracking-widest text-[#C5A24D] uppercase">
              The Madimo Formation Philosophy
            </span>
            <h2 className="font-serif-college text-3xl sm:text-4xl font-black text-[#0A3764]">
              The KNOW–BE–DO Pedagogical Model
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We reject sterile academic compartmentalization. True Christian higher education touches the mind, conforms the heart to Christ, and releases the hands into competent professional service.
            </p>
          </div>

          {/* Interactive Triad Selector */}
          <div className="flex justify-center mb-10">
            <div className="p-1.5 rounded-2xl bg-slate-100 border border-slate-200 inline-flex gap-2">
              <button
                onClick={() => setActivePedagogyTab('know')}
                className={`px-5 py-2.5 rounded-xl font-serif-college text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 ${
                  activePedagogyTab === 'know'
                    ? 'bg-[#0A3764] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>KNOW (The Mind)</span>
              </button>

              <button
                onClick={() => setActivePedagogyTab('be')}
                className={`px-5 py-2.5 rounded-xl font-serif-college text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 ${
                  activePedagogyTab === 'be'
                    ? 'bg-[#0A3764] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>BE (The Character)</span>
              </button>

              <button
                onClick={() => setActivePedagogyTab('do')}
                className={`px-5 py-2.5 rounded-xl font-serif-college text-xs sm:text-sm font-bold tracking-wider transition-all flex items-center gap-2 ${
                  activePedagogyTab === 'do'
                    ? 'bg-[#0A3764] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>DO (The Practice)</span>
              </button>
            </div>
          </div>

          {/* Detail Tab Display */}
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg">
            {activePedagogyTab === 'know' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase">
                    Dimension 1: Cognitive Rigor &amp; Exegesis
                  </span>
                  <h3 className="font-serif-college text-2xl sm:text-3xl font-bold text-[#0A3764]">
                    Rooted in Biblical Truth &amp; Academic Mastery
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Students master rigorous educational foundations, child psychology, administrative ethics, and missional theology. Every course module is anchored in primary biblical exegesis and peer-reviewed educational theory.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Sound biblical worldview integrating faith and pedagogical science.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Evidence-based classroom management and learner scaffolding.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Deep exegetical analysis through Discovery Bible Study (DBS) passages.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-6 rounded-2xl bg-[#0A3764] text-white space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-[#0A3764] flex items-center justify-center mx-auto font-black text-lg">
                    1
                  </div>
                  <h4 className="font-serif-college font-bold text-lg text-amber-200">The Scriptural Anchor</h4>
                  <p className="font-serif-college italic text-xs text-slate-200">
                    « For Ezra had set his heart to study the Law of the Lord, and to do it and to teach his statutes and rules in Israel. »
                  </p>
                  <p className="text-[11px] text-amber-300 font-bold">— Ezra 7:10</p>
                </div>
              </div>
            )}

            {activePedagogyTab === 'be' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
                    Dimension 2: Spiritual Formation &amp; Christlikeness
                  </span>
                  <h3 className="font-serif-college text-2xl sm:text-3xl font-bold text-[#0A3764]">
                    Character Precedes Professional Competence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A corrupt or proud educator damages generations. Through weekly small-group discipleship cohorts led by faculty mentors, students cultivate integrity, sacrificial servanthood, and emotional resilience.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Weekly virtual/in-person Discipleship Cohort meetings with prayer accountability.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Reflective journals exploring heart posture and personal repentance.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Fostering servant-hearted leadership modeled on Christ washing disciples&apos; feet.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-6 rounded-2xl bg-[#3F522C] text-white space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-[#3F522C] flex items-center justify-center mx-auto font-black text-lg">
                    2
                  </div>
                  <h4 className="font-serif-college font-bold text-lg text-amber-200">The Transformation Anchor</h4>
                  <p className="font-serif-college italic text-xs text-slate-200">
                    « A disciple is not above his teacher, but everyone when he is fully trained will be like his teacher. »
                  </p>
                  <p className="text-[11px] text-amber-300 font-bold">— Luke 6:40</p>
                </div>
              </div>
            )}

            {activePedagogyTab === 'do' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase">
                    Dimension 3: Marketplace Tentmaking &amp; Multiplication
                  </span>
                  <h3 className="font-serif-college text-2xl sm:text-3xl font-bold text-[#0A3764]">
                    Vocational Impact &amp; Disciple-Making
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Learning is incomplete without obedient action. Students practice real-world classroom micro-teaching, launch community Discovery Bible Studies, and mobilize tentmaking enterprises that support sustainable Gospel advance.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Actionable DBS assignments: &ldquo;What will I obey today? Who will I disciple?&rdquo;</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Classroom practicums in rural and urban Malawian schools.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Catalyzing 4th-generation reproducing disciple-making movements.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 p-6 rounded-2xl bg-[#062242] text-white space-y-3 text-center border-2 border-amber-400">
                  <div className="w-12 h-12 rounded-full bg-[#C5A24D] text-white flex items-center justify-center mx-auto font-black text-lg">
                    3
                  </div>
                  <h4 className="font-serif-college font-bold text-lg text-amber-200">The Multiplication Anchor</h4>
                  <p className="font-serif-college italic text-xs text-slate-200">
                    « And what you have heard from me in the presence of many witnesses entrust to faithful men who will be able to teach others also. »
                  </p>
                  <p className="text-[11px] text-amber-300 font-bold">— 2 Timothy 2:2</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LOW-BANDWIDTH & MOBILE MONEY INNOVATION SHOWCASE                        */}
      {/* ========================================================================= */}
      <section id="tuition" className="py-20 madimo-gradient-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                Engineered for African Connectivity
              </span>
              <h2 className="font-serif-college text-3xl sm:text-4xl font-black text-white leading-tight">
                Designed for Rural Classrooms, Mobile Screens &amp; Uninterrupted Study
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Higher education should never be gated by expensive fiber optics. Madimo College&apos;s digital portal incorporates high-efficiency streaming protocols:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-lg bg-amber-400/20 text-amber-300">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Audio-Only 32kbps Mode</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Listen to high-definition theological lectures using less than 15MB per full 50-minute module, saving 85% mobile data costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-300">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Direct Airtel &amp; TNM Mobile Money</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Settle term fees instantly through automatic USSD prompts on your Malawian SIM card without bank queues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-lg bg-blue-400/20 text-blue-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Offline Study Packs &amp; PDF Notes</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Download lesson unit summaries and Discovery Bible Study journals to study when off the grid.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Interactive Payment Simulator Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-md w-full space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-serif-college font-bold text-sm text-amber-300">
                    Live Malawian Payment Gateway
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    Paychangu / USSD Active
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Student Name:</span>
                    <span className="font-bold text-white">Grace Phiri</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Enrolled Program:</span>
                    <span className="font-semibold text-amber-200">MET-101: Effective Teaching</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Standard Term Fee:</span>
                    <span className="line-through text-slate-400">MWK 300,000</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-white/10 font-bold">
                    <span className="text-emerald-400">With 50% Scholarship:</span>
                    <span className="text-emerald-300 font-mono text-sm">MWK 150,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={onNavigateToStudent}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Simulate Airtel Money (*211#)</span>
                  </button>
                  <button
                    onClick={onNavigateToStudent}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Simulate TNM Mpamba (*444#)</span>
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-400">
                  Instant module unlock engine triggers immediately upon payment receipt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION & ADMISSIONS COUNTDOWN                                  */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-[#0A3764] flex items-center justify-center mx-auto border-2 border-amber-300">
            <GraduationCap className="w-8 h-8 text-[#C5A24D]" />
          </div>

          <h2 className="font-serif-college text-3xl sm:text-4xl font-black text-[#0A3764]">
            Ready to Begin Your Transformational Journey?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Admissions for our inaugural <strong>January 2027 Cohort</strong> are now being processed. Complete your self-service registration online in less than 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenApplyModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C5A24D] hover:bg-[#B48C36] text-white font-serif-college font-bold text-sm tracking-wider shadow-lg hover:shadow-xl transition-all"
            >
              Start Online Application (January 2027)
            </button>
            <button
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-[#0A3764] text-[#0A3764] hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              Sign In to Student Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
