'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useLMS } from '@/lib/store';
import { X, CheckCircle, UploadCloud, FileText, ArrowRight, ShieldCheck, Sparkles, User, Mail, Phone, MapPin } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigateToStudent: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigateToStudent
}) => {
  const { programs, submitApplication, setRole } = useLMS();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    district: 'Dedza',
    programCode: 'MET-101',
    callingStatement: '',
    msceFileName: 'MSCE_Certificate_Certified.pdf'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [assignedStudentId, setAssignedStudentId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setFormData({ ...formData, msceFileName: e.target.files![0].name });
        setIsUploading(false);
      }, 700);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const applicantId = await submitApplication({
      first_name: formData.firstName || 'Grace',
      last_name: formData.lastName || 'Phiri',
      email: formData.email || 'applicant@student.madimo.ac.mw',
      phone: formData.phone || '+265 991 234 567',
      district: formData.district,
      program_code: formData.programCode,
      msce_certificate_name: formData.msceFileName,
      calling_statement: formData.callingStatement || 'Passionate about integrating biblical pedagogy in local community schools.'
    });

    setAssignedStudentId(applicantId);
    setStep(3);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="madimo-gradient-navy px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 bg-white">
              <Image src="/madimo-logo.jpg" alt="Logo" fill sizes="40px" className="object-contain p-0.5" />
            </div>
            <div>
              <h3 className="font-serif-college font-bold text-base text-white">
                Online Admissions Portal
              </h3>
              <p className="text-xs text-amber-200">
                Cohort: January 2027 • Madimo College of Missions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#0A3764]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 1 ? 'bg-[#0A3764] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </span>
            <span>Personal Data</span>
          </div>
          <div className="w-8 h-px bg-slate-300" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#0A3764]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2 ? 'bg-[#0A3764] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </span>
            <span>Program & MSCE</span>
          </div>
          <div className="w-8 h-px bg-slate-300" />
          <div className={`flex items-center gap-2 ${step === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </span>
            <span>Enrolled</span>
          </div>
        </div>

        {/* Step 1: Personal Data */}
        {step === 1 && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g., Grace"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g., Phiri"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="grace.phiri@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone (WhatsApp / Mobile Money) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+265 991 234 567"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  District / Country *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Dedza">Dedza, Malawi</option>
                    <option value="Lilongwe">Lilongwe, Malawi</option>
                    <option value="Blantyre">Blantyre, Malawi</option>
                    <option value="Mzuzu">Mzuzu, Malawi</option>
                    <option value="Zomba">Zomba, Malawi</option>
                    <option value="International">Other (International Student)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-lg bg-[#0A3764] hover:bg-[#072445] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Program & MSCE Upload */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Select January 2027 Program *
              </label>
              <select
                value={formData.programCode}
                onChange={(e) => setFormData({ ...formData, programCode: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              >
                {programs.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code}: {p.title} (MWK {p.term_fee_mwk.toLocaleString()} / Term)
                  </option>
                ))}
              </select>
            </div>

            {/* MSCE Certificate Upload Simulator */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                MSCE Certificate / Academic Transcript Upload *
              </label>
              <div className="border-2 border-dashed border-amber-300/80 rounded-xl p-4 bg-amber-50/40 text-center hover:bg-amber-50/70 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileSimulate}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 text-amber-600 mx-auto mb-1.5" />
                {isUploading ? (
                  <p className="text-xs text-amber-700 font-semibold animate-pulse">
                    Uploading and verifying document checksum...
                  </p>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {formData.msceFileName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Click or drag certified copy of MSCE (Malawi School Certificate of Education)
                    </p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      ✓ System Pre-Verified
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Brief Calling Statement (Ministry & Tentmaking Intent)
              </label>
              <textarea
                rows={2}
                value={formData.callingStatement}
                onChange={(e) => setFormData({ ...formData, callingStatement: e.target.value })}
                placeholder="Share how you desire to combine your professional teaching or leadership calling with Christian discipleship..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>50% Scholarship Eligible:</strong> Rural primary school educators may automatically receive financial aid upon admission.
              </span>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#C5A24D] hover:bg-[#B48C36] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif-college font-bold text-xl text-[#0A3764]">
                Application Successfully Received!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Welcome to the Madimo College of Missions family. Your admissions dossier for the January 2027 cohort is initialized.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-1 text-left">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Applicant ID:</span>
                <span className="font-mono font-bold text-[#0A3764]">{assignedStudentId || 'MAD-2027-042'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Program:</span>
                <span className="font-semibold text-slate-800">{formData.programCode}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">MSCE Status:</span>
                <span className="text-emerald-700 font-semibold">✓ Verified Under-Review</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Discipleship Group:</span>
                <span className="text-slate-800 font-medium">Living Waters (Lilongwe)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setRole('student');
                  onSuccessNavigateToStudent();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-[#0A3764] hover:bg-[#072445] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Close & Return Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
