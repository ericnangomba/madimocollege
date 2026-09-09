'use client';

import React, { useState } from 'react';
import { useLMS } from '@/lib/store';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Download,
  Search,
  Filter,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const FinanceConsole: React.FC = () => {
  const {
    student,
    transactions,
    toggleScholarship,
    approveTransaction,
    getRequiredFee,
    getModulePaidAmount
  } = useLMS();

  const [filterGateway, setFilterGateway] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate gross revenue
  const totalMwk = transactions
    .filter((t) => t.status === 'COMPLETED' && t.currency === 'MWK')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalUsd = transactions
    .filter((t) => t.status === 'COMPLETED' && t.currency === 'USD')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    const matchesGateway = filterGateway === 'ALL' || t.gateway === filterGateway;
    const matchesSearch =
      t.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.module_code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGateway && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header Banner */}
      <div className="rounded-3xl madimo-gradient-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 font-bold">
                Role: Finance Administrator
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                Lilongwe Bursar Office
              </span>
            </div>
            <h1 className="font-serif-college text-2xl sm:text-3xl font-black text-white">
              Finance &amp; Bursar Console: Ethel Mwale
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Managing Malawian Mobile Money (Airtel / TNM Mpamba), Stripe USD Reconciliation &amp; 50% Scholarships.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => alert('Exporting reconciliation CSV...')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Reconciled (Malawi MWK)
          </span>
          <p className="font-mono text-2xl font-black text-[#0A3764]">
            MWK {totalMwk.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Airtel &amp; TNM Active
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Reconciled (International USD)
          </span>
          <p className="font-mono text-2xl font-black text-[#0A3764]">
            ${totalUsd.toLocaleString()} USD
          </p>
          <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Stripe Card Gateways
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Transactions
          </span>
          <p className="font-mono text-2xl font-black text-[#0A3764]">
            {transactions.length}
          </p>
          <span className="text-[11px] text-slate-500">
            All gateways verified
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            50% Scholarship Grants
          </span>
          <p className="font-mono text-2xl font-black text-emerald-700">
            {student.scholarship_active ? '1 Active' : '0 Active'}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Dedicated Rural Fund
          </span>
        </div>
      </div>

      {/* 3. Student Scholarship Management Widget (Prompt Requirement) */}
      <div className="rounded-2xl bg-white border border-amber-300 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-serif-college font-bold text-base text-[#0A3764]">
                Financial Aid &amp; 50% Scholarship Control
              </h3>
              <p className="text-xs text-slate-500">
                Toggling this switch immediately adjusts the term fee from MWK 300,000 to MWK 150,000.
              </p>
            </div>
          </div>

          {/* Action Toggle */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-700">
              50% Discount ({student.first_name} {student.last_name}):
            </span>
            <button
              onClick={() => toggleScholarship()}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                student.scholarship_active ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  student.scholarship_active ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              student.scholarship_active
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {student.scholarship_active ? 'ACTIVE (50% Off)' : 'INACTIVE (Full Fee)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Student:</span>
            <span className="font-bold text-slate-900">{student.first_name} {student.last_name} ({student.student_id})</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Current MET-101 Fee:</span>
            <span className="font-mono font-bold text-[#0A3764]">
              MWK {getRequiredFee('MET-101').mwk.toLocaleString()}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block">Current MMD-301 Fee:</span>
            <span className="font-mono font-bold text-[#0A3764]">
              MWK {getRequiredFee('MMD-301').mwk.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Multi-Gateway Reconciliation Ledger Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-college font-bold text-lg text-[#0A3764]">
              Multi-Gateway Transaction Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Real-time audit log of Airtel Money, TNM Mpamba, and Stripe transactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reference, student..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

            <select
              value={filterGateway}
              onChange={(e) => setFilterGateway(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="ALL">All Gateways</option>
              <option value="AirtelMoney">Airtel Money</option>
              <option value="TNMMpamba">TNM Mpamba</option>
              <option value="Stripe">Stripe (USD)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Reference ID</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.reference_id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {tx.reference_id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{tx.student_name}</p>
                    <p className="text-[10px] text-slate-400">{tx.student_id}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{tx.module_code}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      tx.gateway === 'AirtelMoney'
                        ? 'bg-red-100 text-red-800'
                        : tx.gateway === 'TNMMpamba'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tx.gateway}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#0A3764]">
                    {tx.currency} {tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      tx.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : tx.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {tx.status === 'PENDING' ? (
                      <button
                        onClick={() => approveTransaction(tx.reference_id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Reconciled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
