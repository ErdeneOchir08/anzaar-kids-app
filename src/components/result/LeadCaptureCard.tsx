'use client';

import React, { useState } from 'react';
import { Mail, Phone, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface LeadCaptureCardProps {
  childName: string;
}

export const LeadCaptureCard: React.FC<LeadCaptureCardProps> = ({ childName }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to local storage and simulate lead dispatch
    setTimeout(() => {
      try {
        localStorage.setItem(
          'anzaar_lead_contact',
          JSON.stringify({ email, phone, submittedAt: new Date().toISOString() })
        );
      } catch (err) {
        // fallback
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-emerald-50/90 rounded-3xl p-6 border border-emerald-200 text-center space-y-2 animate-in fade-in duration-200">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-black text-emerald-950">
          Холбоосыг амжилттай хадгаллаа!
        </h4>
        <p className="text-xs text-emerald-800">
          {childName}-ийн оношилгооны хураангуй болон шинэчлэлтийг {email || phone} хаягаар илгээх болно.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/60 via-white to-rose-50/40 rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-sm space-y-3.5">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
          <Mail className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-sm sm:text-base font-black text-zinc-900">
            Үр дүнгээ утсандаа хадгалах уу?
          </h4>
          <p className="text-[11px] text-zinc-500">
            Имэйл эсвэл утсаа оруулж, {childName}-ийн оношилгоог хүссэн үедээ эргэн үзээрэй
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="relative">
            <input
              type="email"
              placeholder="Таны имэйл хаяг..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3.5 py-3 rounded-2xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder="Утасны дугаар (8 орон)..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3.5 py-3 rounded-2xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (!email && !phone)}
          className="w-full bg-zinc-900 hover:bg-black disabled:opacity-50 text-white text-xs font-black py-3.5 px-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          {isSubmitting ? (
            <span>Хадгалж байна...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Дүгнэлтийн холбоосыг хадгалах</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
