'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, BookOpen, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#062242] text-slate-300 pt-16 pb-12 border-t-4 border-[#C5A24D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Identity & Crest */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white">
                <Image
                  src="/madimo-logo.jpg"
                  alt="Madimo College Crest"
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-serif-college font-black text-lg text-white tracking-wider leading-none">
                  MADIMO COLLEGE
                </h3>
                <p className="text-[10px] uppercase font-semibold tracking-widest text-amber-300 mt-0.5">
                  OF MISSIONS • MALAWI
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Equipping Christian educators, institutional leaders, and tentmaking marketplace missionaries through the transformative <strong className="text-amber-300">KNOW–BE–DO</strong> formation model.
            </p>

            <div className="p-3 rounded-lg bg-white/5 border border-amber-400/20">
              <p className="text-[11px] font-serif-college text-amber-200 italic leading-snug">
                « La connaissance, la sagesse et l&apos;excellence de Dieu »
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                God&apos;s Knowledge, Wisdom & Excellence
              </p>
            </div>
          </div>

          {/* Column 2: Launch Programs */}
          <div>
            <h4 className="font-serif-college text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
              January 2027 Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-400 font-bold">MET-101:</span>
                  <span>Certificate in Effective Teaching</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-400 font-bold">MEL-201:</span>
                  <span>Certificate in Educational Leadership</span>
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <span className="text-amber-400 font-bold">MMD-301:</span>
                  <span>Certificate in Missions & DMM</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  MWK 300,000 / Term • 50% Scholarship Available
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: The Holistic Model & Discipleship */}
          <div>
            <h4 className="font-serif-college text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
              Pedagogy & Digital Campus
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <strong className="text-amber-300 font-serif-college">KNOW:</strong>
                <span>Rigorous biblical theology & professional pedagogies.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-amber-300 font-serif-college">BE:</strong>
                <span>Christlike humility, spiritual vitality & mentor accountability.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-amber-300 font-serif-college">DO:</strong>
                <span>Tentmaking classroom impact & disciple-making multiplication.</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Low-bandwidth media streaming & offline-ready PDF lecture packs tailored for Malawian mobile networks.
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Malawian Payment Gateways */}
          <div>
            <h4 className="font-serif-college text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
              Malawi Campus & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lilongwe Campus & Dedza Learning Center, Malawi</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+265 (0) 991 234 567 / +265 888 765 432</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>admissions@madimo.ac.mw</span>
              </p>
            </div>

            {/* Payment Badges */}
            <div className="mt-4 pt-3 border-t border-slate-700">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Supported Tuition Gateways
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] font-bold">
                  Airtel Money (MWK)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  TNM Mpamba (MWK)
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold">
                  Stripe (USD)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center md:flex md:items-center md:justify-between text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Madimo College of Missions. All rights reserved. Registered in the Republic of Malawi.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Academic Regulations</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">DBS Ministry Charter</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Financial Aid Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
