'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLMS } from '@/lib/store';
import { Lesson, CourseModule } from '@/lib/types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  Download,
  FileText,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface CoursePlayerProps {
  initialModuleCode?: string;
  onBackToDashboard: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  initialModuleCode = 'MET-101',
  onBackToDashboard
}) => {
  const {
    programs,
    student,
    isModuleUnlocked,
    dbsSubmissions,
    submitDBSSubmission
  } = useLMS();

  const [activeModuleCode, setActiveModuleCode] = useState(initialModuleCode);
  const activeModule = programs.find((p) => p.code === activeModuleCode) || programs[0];
  const isUnlocked = isModuleUnlocked(activeModule.code);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const currentLesson: Lesson = activeModule.lessons[activeLessonIndex] || activeModule.lessons[0];

  // Bandwidth & Player Mode: 'video-hd' | 'video-sd' | 'audio-only'
  const [streamQuality, setStreamQuality] = useState<'video-hd' | 'video-sd' | 'audio-only'>('video-sd');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'dbs' | 'notes' | 'syllabus'>('dbs');

  // DBS Submission Form
  const [dbsForm, setDbsForm] = useState({
    know: '',
    be: '',
    doAction: '',
    shareTarget: ''
  });
  const [hasSubmittedDbs, setHasSubmittedDbs] = useState(false);

  // Check if current lesson already has submission
  const existingSubmission = dbsSubmissions.find(
    (s) => s.lesson_id === currentLesson?.id && s.student_id === student.student_id
  );

  const handleDbsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbsForm.know || !dbsForm.be || !dbsForm.doAction) return;

    submitDBSSubmission({
      student_id: student.student_id,
      student_name: `${student.first_name} ${student.last_name}`,
      module_code: activeModule.code,
      lesson_id: currentLesson.id,
      passage: currentLesson.dbs_passage,
      know_reflection: dbsForm.know,
      be_reflection: dbsForm.be,
      do_action: dbsForm.doAction,
      share_target: dbsForm.shareTarget || 'Local primary school colleagues'
    });

    setHasSubmittedDbs(true);
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      
      {/* Top Banner Navigation */}
      <div className="bg-[#062242] text-white px-4 sm:px-8 py-3.5 border-b border-amber-400/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <div className="hidden sm:block w-px h-5 bg-white/20" />
          <span className="font-mono text-xs text-amber-300 font-bold px-2 py-0.5 rounded bg-white/10">
            {activeModule.code}
          </span>
          <h2 className="font-serif-college font-bold text-sm sm:text-base truncate max-w-md">
            {activeModule.title}
          </h2>
        </div>

        {/* Low-Bandwidth Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold hidden md:inline">Bandwidth Optimizer:</span>
            <span className="font-mono text-[11px] font-bold">
              {streamQuality === 'audio-only' ? 'Audio 32kbps (~12MB)' : streamQuality === 'video-sd' ? 'SD 480p (~45MB)' : 'HD 1080p'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Player Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Player Container */}
            <div className="rounded-2xl bg-black overflow-hidden shadow-2xl border border-slate-800">
              
              {/* Quality Switcher Bar */}
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
                <span className="font-medium text-amber-300 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  Unit {currentLesson?.order}: {currentLesson?.title}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setStreamQuality('audio-only')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      streamQuality === 'audio-only'
                        ? 'bg-amber-500 text-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    title="Saves 85% data on Airtel / TNM networks"
                  >
                    Audio-Only (32kbps)
                  </button>
                  <button
                    onClick={() => setStreamQuality('video-sd')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      streamQuality === 'video-sd'
                        ? 'bg-amber-500 text-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Low-Data 480p
                  </button>
                  <button
                    onClick={() => setStreamQuality('video-hd')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      streamQuality === 'video-hd'
                        ? 'bg-amber-500 text-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    HD 1080p
                  </button>
                </div>
              </div>

              {/* Video or Audio Interface */}
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
                {streamQuality === 'audio-only' ? (
                  /* Audio-Only Low-Bandwidth Mode */
                  <div className="text-center p-8 space-y-4 max-w-md">
                    <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border-2 border-amber-400/40 animate-pulse">
                      <Volume2 className="w-10 h-10" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-400/20">
                        LOW-BANDWIDTH AUDIO STREAM ACTIVATED
                      </span>
                      <h4 className="text-white font-serif-college text-lg font-bold mt-2">
                        {currentLesson?.title}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Lecture delivered by {activeModule.lecturer.name} • {currentLesson?.duration_minutes} Minutes
                      </p>
                    </div>
                    <audio
                      controls
                      className="w-full mt-4"
                      src={currentLesson?.low_bandwidth_audio_url}
                    />
                    <p className="text-[11px] text-emerald-400">
                      ✓ Bandwidth Saver Active: Uses only ~12MB for the complete lecture.
                    </p>
                  </div>
                ) : (
                  /* Video Stream Mode */
                  <div className="w-full h-full relative group">
                    <video
                      key={currentLesson?.id + streamQuality}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                      poster="/madimo-logo.jpg"
                    >
                      <source src={currentLesson?.video_url} type="video/mp4" />
                      Your browser does not support HTML5 video streaming.
                    </video>
                  </div>
                )}
              </div>
            </div>

            {/* Content Tabs: DBS Assignment Journal vs Notes */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 px-6 pt-3 flex gap-4">
                <button
                  onClick={() => setActiveTab('dbs')}
                  className={`pb-3 text-xs font-serif-college font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'dbs'
                      ? 'border-[#C5A24D] text-[#0A3764]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Discovery Bible Study (DBS) Submission</span>
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 text-xs font-serif-college font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'notes'
                      ? 'border-[#C5A24D] text-[#0A3764]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>Downloadable Unit Notes</span>
                </button>

                <button
                  onClick={() => setActiveTab('syllabus')}
                  className={`pb-3 text-xs font-serif-college font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'syllabus'
                      ? 'border-[#C5A24D] text-[#0A3764]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>Module Syllabus</span>
                </button>
              </div>

              {/* Tab 1: DBS Submission Form */}
              {activeTab === 'dbs' && (
                <div className="p-6 space-y-6">
                  
                  {/* DBS Scripture Focus Card */}
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif-college font-bold text-xs uppercase text-amber-900 tracking-wider">
                        Assigned DBS Scripture Passage:
                      </span>
                      <span className="font-mono text-xs font-bold text-[#0A3764] bg-white px-2.5 py-0.5 rounded-full border border-amber-300">
                        {currentLesson?.dbs_passage}
                      </span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed font-academic-body italic">
                      &ldquo;{currentLesson?.dbs_context}&rdquo;
                    </p>
                  </div>

                  {existingSubmission || hasSubmittedDbs ? (
                    /* Already Submitted Confirmation */
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                          <h4 className="font-serif-college font-bold text-sm text-emerald-950">
                            DBS Reflection Submitted for Review
                          </h4>
                          <p className="text-xs text-emerald-800">
                            Status: <strong>{existingSubmission?.grade || 'UNGRADED - Awaiting Mentor Review'}</strong>
                          </p>
                        </div>
                      </div>

                      {existingSubmission && (
                        <div className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-emerald-200">
                          <p>
                            <strong className="text-blue-900">KNOW Reflection:</strong>{' '}
                            {existingSubmission.know_reflection}
                          </p>
                          <p>
                            <strong className="text-emerald-900">BE Reflection:</strong>{' '}
                            {existingSubmission.be_reflection}
                          </p>
                          <p>
                            <strong className="text-amber-900">DO Action:</strong>{' '}
                            {existingSubmission.do_action}
                          </p>
                          {existingSubmission.feedback && (
                            <div className="pt-2 border-t border-slate-200 text-amber-900 font-medium">
                              <strong>Mentor Feedback ({existingSubmission.graded_by}):</strong> &ldquo;{existingSubmission.feedback}&rdquo;
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* The Structured KNOW-BE-DO Form */
                    <form onSubmit={handleDbsSubmit} className="space-y-5">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#0A3764] uppercase">
                          1. KNOW: What does this passage reveal about God&apos;s character, mission, and truth? *
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Focus on cognitive understanding, theological attributes, and divine commandments.
                        </p>
                        <textarea
                          required
                          rows={3}
                          value={dbsForm.know}
                          onChange={(e) => setDbsForm({ ...dbsForm, know: e.target.value })}
                          placeholder="Reflect on what God is doing and saying in this text..."
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#3F522C] uppercase">
                          2. BE: What does this reveal about humanity, our hearts, and Christlike character? *
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Personal conviction: Where does your heart posture need repentance or transformation?
                        </p>
                        <textarea
                          required
                          rows={3}
                          value={dbsForm.be}
                          onChange={(e) => setDbsForm({ ...dbsForm, be: e.target.value })}
                          placeholder="Reflect on your heart, humility, and spiritual formation..."
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#C5A24D] uppercase">
                          3. DO: If this is God&apos;s word, what specific step of obedience will you take today? *
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Make it concrete, time-bound, and applicable to your teaching or leadership role.
                        </p>
                        <textarea
                          required
                          rows={3}
                          value={dbsForm.doAction}
                          onChange={(e) => setDbsForm({ ...dbsForm, doAction: e.target.value })}
                          placeholder="e.g., Today at 2pm I will speak with my deputy headteacher and implement..."
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase">
                          4. MULTIPLY: Who will you share this biblical insight with this week?
                        </label>
                        <input
                          type="text"
                          value={dbsForm.shareTarget}
                          onChange={(e) => setDbsForm({ ...dbsForm, shareTarget: e.target.value })}
                          placeholder="e.g., Sister Mercy and the village church youth teachers"
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-[#0A3764] hover:bg-[#072445] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Submit DBS Assignment to Mentor</span>
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              )}

              {/* Tab 2: Unit Notes & Downloadable PDF */}
              {activeTab === 'notes' && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {currentLesson?.notes_pdf_title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Complete lecture notes &amp; discussion questions (PDF)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Simulating download of ${currentLesson?.notes_pdf_title}`)}
                      className="px-4 py-2 rounded-lg bg-[#0A3764] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#072445]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <div className="p-6 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed font-academic-body space-y-3 whitespace-pre-line">
                    {currentLesson?.notes_content}
                  </div>
                </div>
              )}

              {/* Tab 3: Module Syllabus */}
              {activeTab === 'syllabus' && (
                <div className="p-6 space-y-4 text-xs text-slate-700">
                  <h4 className="font-serif-college text-base font-bold text-[#0A3764]">
                    {activeModule.title} Syllabus
                  </h4>
                  <p>{activeModule.description}</p>
                  
                  <div className="space-y-2 pt-2">
                    <h5 className="font-bold text-slate-900 uppercase">Core Competencies:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {activeModule.learning_outcomes.map((lo, i) => (
                        <li key={i}>{lo}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Column: Lesson Units & Playlist (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Playlist Container */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="madimo-gradient-navy p-4 text-white">
                <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                  Course Curriculum
                </p>
                <h3 className="font-serif-college font-bold text-base mt-0.5">
                  Lesson Units ({activeModule.lessons.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {activeModule.lessons.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                        isActive
                          ? 'bg-amber-50/60 border-l-4 border-amber-500'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isActive ? 'bg-[#0A3764] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {lesson.order}
                      </span>
                      <div className="space-y-1 overflow-hidden">
                        <p className={`text-xs font-bold leading-snug truncate ${
                          isActive ? 'text-[#0A3764]' : 'text-slate-800'
                        }`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {lesson.duration_minutes}m
                          </span>
                          <span>•</span>
                          <span className="text-amber-800 font-medium">DBS Passage</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Faculty Mentor Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Course Faculty Lead
              </span>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0A3764] text-amber-200 flex items-center justify-center font-bold text-sm">
                  {activeModule.lecturer.name.split(' ')[1]?.[0] || 'C'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {activeModule.lecturer.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {activeModule.lecturer.title}
                  </p>
                  <p className="text-[10px] text-amber-700 font-mono mt-0.5">
                    {activeModule.lecturer.email}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
