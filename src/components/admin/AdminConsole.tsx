'use client';

import React, { useState } from 'react';
import { useLMS } from '@/lib/store';
import {
  ShieldCheck,
  Database,
  Network,
  Terminal,
  Server,
  Layers,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  Users,
  BookOpen
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const {
    programs,
    student,
    transactions,
    dbsSubmissions,
    discipleshipGroups,
    applications,
    resetToDefaults
  } = useLMS();

  const [activeTab, setActiveTab] = useState<'graph' | 'cypher' | 'applications'>('graph');
  const [copiedCypher, setCopiedCypher] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>('Student: Grace Phiri');

  const cypherScript = `// Neo4j Cypher Schema & Relations for Madimo College LMS
CREATE CONSTRAINT unique_student_id IF NOT EXISTS FOR (s:Student) REQUIRE s.student_id IS UNIQUE;
CREATE CONSTRAINT unique_course_code IF NOT EXISTS FOR (c:CourseModule) REQUIRE c.code IS UNIQUE;
CREATE CONSTRAINT unique_transaction_ref IF NOT EXISTS FOR (t:Transaction) REQUIRE t.reference_id IS UNIQUE;

// Core Graph Traversal
MATCH (s:Student { student_id: "MAD-2027-042" })-[:ENROLLED_IN]->(c:CourseModule)
OPTIONAL MATCH (s)-[:PAID_FOR]->(t:Transaction)-[:APPLIED_TO]->(c)
RETURN s.first_name + ' ' + s.last_name AS Student,
       c.code AS Module,
       sum(t.amount) AS TotalPaid,
       s.scholarship_active AS ScholarshipActive;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cypherScript);
    setCopiedCypher(true);
    setTimeout(() => setCopiedCypher(false), 2500);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="rounded-3xl madimo-gradient-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-300 border border-rose-400/30 font-bold">
                Role: System Administrator
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-semibold flex items-center gap-1">
                <Server className="w-3 h-3" /> Neo4j Engine Connected
              </span>
            </div>
            <h1 className="font-serif-college text-2xl sm:text-3xl font-black text-white">
              System Admin &amp; Neo4j Graph Architecture
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Managing Academic Hierarchy, Graph Traversal Schemas, and Prospective Admissions Dossiers.
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset demo state to initial defaults?')) resetToDefaults();
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Store</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-serif-college font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('graph')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'graph'
              ? 'border-[#C5A24D] text-[#0A3764]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Network className="w-4 h-4 text-amber-500" />
          <span>Interactive Neo4j Graph Visualizer</span>
        </button>

        <button
          onClick={() => setActiveTab('cypher')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'cypher'
              ? 'border-[#C5A24D] text-[#0A3764]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4 text-blue-500" />
          <span>Cypher Schema Script</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'applications'
              ? 'border-[#C5A24D] text-[#0A3764]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-500" />
          <span>Admissions Applications ({applications.length})</span>
        </button>
      </div>

      {/* Tab 1: Interactive Graph Visualizer */}
      {activeTab === 'graph' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <h3 className="font-serif-college font-bold text-lg text-[#0A3764]">
              Neo4j Domain Entity Graph Mapping
            </h3>
            <p className="text-xs text-slate-500">
              Visualizing the active relationships: Student ➔ CourseModule ➔ Lesson, Transactions &amp; Discipleship Groups.
            </p>
          </div>

          {/* Interactive Graph Canvas Simulation */}
          <div className="p-6 rounded-2xl bg-[#071627] text-white border border-slate-800 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
            
            {/* Background constellation lines */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#C5A24D 1.5px, transparent 1.5px)',
                backgroundSize: '30px 30px'
              }}
            />

            {/* Top Node Row: Student */}
            <div className="flex justify-center relative z-10">
              <button
                onClick={() => setSelectedNode('Student: Grace Phiri (MAD-2027-042)')}
                className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-1.5 shadow-lg ${
                  selectedNode?.includes('Student')
                    ? 'border-amber-400 bg-amber-950/70 ring-4 ring-amber-500/20'
                    : 'border-slate-700 bg-slate-900/80 hover:border-amber-400/60'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  S
                </div>
                <span className="font-serif-college font-bold text-xs text-white">
                  (:Student)
                </span>
                <span className="text-[11px] text-amber-200 font-mono">
                  {student.first_name} {student.last_name}
                </span>
              </button>
            </div>

            {/* Relationship Connectors */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono text-amber-300/80 py-4 relative z-10">
              <div className="border-t border-dashed border-amber-400/40 pt-1">
                -[:ENROLLED_IN]-&gt;
              </div>
              <div className="border-t border-dashed border-red-400/40 pt-1 text-red-300">
                -[:PAID_FOR]-&gt;
              </div>
              <div className="border-t border-dashed border-emerald-400/40 pt-1 text-emerald-300">
                -[:MENTORED_BY]-&gt;
              </div>
              <div className="border-t border-dashed border-blue-400/40 pt-1 text-blue-300">
                -[:PARTICIPATES_IN]-&gt;
              </div>
            </div>

            {/* Bottom Node Row: CourseModules, Transactions, Lecturer, Discipleship */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
              
              {/* Module Node */}
              <button
                onClick={() => setSelectedNode('CourseModule: MET-101 (Certificate in Effective Teaching)')}
                className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-amber-400 transition-all text-center space-y-1"
              >
                <span className="text-[10px] font-mono text-amber-300 uppercase">(:CourseModule)</span>
                <p className="font-bold text-xs text-white">MET-101</p>
                <p className="text-[10px] text-slate-400">Effective Teaching</p>
              </button>

              {/* Transaction Node */}
              <button
                onClick={() => setSelectedNode('Transaction: AIRTEL-MW-9827341 (MWK 150,000 via Airtel Money)')}
                className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-red-400 transition-all text-center space-y-1"
              >
                <span className="text-[10px] font-mono text-red-300 uppercase">(:Transaction)</span>
                <p className="font-bold text-xs text-white">AirtelMoney</p>
                <p className="text-[10px] text-slate-400">MWK 150,000</p>
              </button>

              {/* Lecturer Node */}
              <button
                onClick={() => setSelectedNode('Lecturer: Dr. Chimwemwe Banda (STF-108)')}
                className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-emerald-400 transition-all text-center space-y-1"
              >
                <span className="text-[10px] font-mono text-emerald-300 uppercase">(:Lecturer)</span>
                <p className="font-bold text-xs text-white">Dr. C. Banda</p>
                <p className="text-[10px] text-slate-400">Dean of Academics</p>
              </button>

              {/* DiscipleshipGroup Node */}
              <button
                onClick={() => setSelectedNode('DiscipleshipGroup: Living Waters Cohort (Lilongwe)')}
                className="p-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-blue-400 transition-all text-center space-y-1"
              >
                <span className="text-[10px] font-mono text-blue-300 uppercase">(:DiscipleshipGroup)</span>
                <p className="font-bold text-xs text-white">Living Waters</p>
                <p className="text-[10px] text-slate-400">Weekly Prayer Cohort</p>
              </button>

            </div>

          </div>

          {/* Node Inspector Card */}
          {selectedNode && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px] block">
                  Active Inspector Focus:
                </span>
                <span className="font-bold text-[#0A3764]">{selectedNode}</span>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                Node Validated
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Cypher Schema Script */}
      {activeTab === 'cypher' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-college font-bold text-lg text-[#0A3764]">
                Production Neo4j Schema &amp; Cypher Queries
              </h3>
              <p className="text-xs text-slate-500">
                Ready for deployment to Neo4j AuraDB or local enterprise graph clusters.
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-lg bg-[#0A3764] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#072445]"
            >
              {copiedCypher ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCypher ? 'Copied to Clipboard' : 'Copy Cypher Script'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-amber-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
            {cypherScript}
          </pre>
        </div>
      )}

      {/* Tab 3: Prospective Applications List */}
      {activeTab === 'applications' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-college font-bold text-lg text-[#0A3764]">
                Prospective Student Applications Dossiers
              </h3>
              <p className="text-xs text-slate-500">
                Online registration submissions capturing MSCE certifications and calling statements.
              </p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-2xl">
              No new self-service applications submitted yet. Use the &ldquo;Apply (Jan 2027)&rdquo; modal to test registration!
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.applicant_id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{app.first_name} {app.last_name}</span>
                      <span className="font-mono text-slate-500 text-[11px] block">{app.applicant_id} • {app.email}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {app.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                    <div><strong>Program:</strong> {app.program_code}</div>
                    <div><strong>District:</strong> {app.district}</div>
                    <div><strong>MSCE Document:</strong> {app.msce_certificate_name}</div>
                  </div>
                  {app.calling_statement && (
                    <p className="italic text-slate-500 pt-1 border-t border-slate-200">
                      &ldquo;{app.calling_statement}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
