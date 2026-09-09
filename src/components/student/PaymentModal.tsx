'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLMS } from '@/lib/store';
import { CourseModule, PaymentGateway } from '@/lib/types';
import {
  X,
  CreditCard,
  Phone,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  Building,
  RotateCw
} from 'lucide-react';

interface PaymentModalProps {
  module: CourseModule;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  module,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { student, getRequiredFee, getModulePaidAmount, processPayment } = useLMS();

  const { mwk: requiredMwk, usd: requiredUsd, isDiscounted } = getRequiredFee(module.code);
  const paidAmount = getModulePaidAmount(module.code);
  const balanceDueMwk = Math.max(0, requiredMwk - paidAmount);

  const [gateway, setGateway] = useState<PaymentGateway>('AirtelMoney');
  const [phoneNumber, setPhoneNumber] = useState(student.phone || '+265 991 234 567');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ussdPromptStep, setUssdPromptStep] = useState(false);
  const [completedTxRef, setCompletedTxRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network latency & USSD push dialog
    if (gateway === 'AirtelMoney' || gateway === 'TNMMpamba') {
      setUssdPromptStep(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    const { referenceId } = await processPayment({
      moduleCode: module.code,
      amount: gateway === 'Stripe' ? requiredUsd : balanceDueMwk,
      currency: gateway === 'Stripe' ? 'USD' : 'MWK',
      gateway,
      phoneOrCard: gateway === 'Stripe' ? cardNumber : phoneNumber
    });

    setIsProcessing(false);
    setUssdPromptStep(false);
    setCompletedTxRef(referenceId);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti trigger', err);
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="madimo-gradient-navy px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-[#0A3764] flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-college font-bold text-base text-white">
                Term Tuition Fee Settlement
              </h3>
              <p className="text-xs text-amber-200">
                {module.code}: {module.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!completedTxRef ? (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Fee Breakdown Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Standard Term Tuition:</span>
                <span className="font-semibold text-slate-900">
                  MWK {module.term_fee_mwk.toLocaleString()}
                </span>
              </div>

              {isDiscounted ? (
                <div className="flex justify-between text-xs text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>50% Christian Educator Scholarship Applied:</span>
                  </span>
                  <span>- MWK {(module.term_fee_mwk * 0.5).toLocaleString()}</span>
                </div>
              ) : (
                <div className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                  Standard tuition rate applies. (50% Scholarship can be enabled by Finance Admin).
                </div>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 uppercase block">
                    Total Amount Due Now:
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Instant automated module unlock upon settlement
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-black text-[#0A3764]">
                    MWK {balanceDueMwk.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    (${requiredUsd} USD)
                  </span>
                </div>
              </div>
            </div>

            {/* Gateway Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Select Payment Channel:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGateway('AirtelMoney')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    gateway === 'AirtelMoney'
                      ? 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-400 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-red-600 shrink-0" />
                  <span className="text-xs">Airtel Money</span>
                  <span className="text-[10px] text-slate-500">*211# Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway('TNMMpamba')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    gateway === 'TNMMpamba'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-xs">TNM Mpamba</span>
                  <span className="text-[10px] text-slate-500">*444# Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway('Stripe')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    gateway === 'Stripe'
                      ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-400 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs">Visa / MC</span>
                  <span className="text-[10px] text-slate-500">Stripe USD</span>
                </button>
              </div>
            </div>

            {/* Input Details */}
            {gateway !== 'Stripe' ? (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {gateway === 'AirtelMoney' ? 'Airtel Malawi' : 'TNM Mpamba'} Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+265 991 234 567"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  A USSD prompt will be sent directly to this phone to enter your 4-digit PIN.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Card Details (International USD) *
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="12/28"
                    placeholder="MM/YY"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono text-center"
                  />
                  <input
                    type="text"
                    defaultValue="821"
                    placeholder="CVC"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono text-center"
                  />
                </div>
              </div>
            )}

            {/* USSD In-progress simulation notice */}
            {ussdPromptStep && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-3 animate-pulse">
                <RotateCw className="w-5 h-5 text-amber-700 animate-spin shrink-0" />
                <div>
                  <p className="font-bold">USSD Prompt Triggered on {phoneNumber}</p>
                  <p className="text-[11px] text-amber-800">
                    Please approve on your handset by entering your mobile money PIN...
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-lg bg-[#C5A24D] hover:bg-[#B48C36] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>
                      Authorize MWK {balanceDueMwk.toLocaleString()}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Payment Success Confirmation */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif-college font-bold text-xl text-[#0A3764]">
                Payment Verified &amp; Module Unlocked!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Your payment has been reconciled in the Madimo College ledger.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-1.5 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-mono font-bold text-slate-900">{completedTxRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gateway:</span>
                <span className="font-semibold text-slate-800">{gateway}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Module Status:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Unlocked (Full Access)
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-[#0A3764] hover:bg-[#072445] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                Return to Enrolled Courses
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
