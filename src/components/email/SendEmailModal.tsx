'use client';

import React, { useState, useEffect } from 'react';
import { Archetype, ChildProfile, DimensionId, DimensionScore } from '@/types';
import { Mail, CheckCircle2, AlertCircle, Loader2, X, Sparkles, Send } from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  archetype: Archetype;
  childProfile: ChildProfile;
  scores?: Record<DimensionId, DimensionScore>;
  invoiceId?: string;
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  archetype,
  childProfile,
  scores,
  invoiceId,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'capturing' | 'sending' | 'success' | 'error'>('idle');
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('anzaar_parent_email') || '';
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('И-мэйл хаягаа зөв оруулна уу.');
      return;
    }

    setErrorMessage('');
    try {
      // Step 1: Capture story passport card if available
      setStatus('capturing');
      setStatusText('Story зургийг бэлтгэж байна...');

      let storyImageBase64 = '';
      const passportEl = document.getElementById('story-passport-capture-card');
      if (passportEl) {
        try {
          const canvas = await html2canvas(passportEl, {
            scale: 2,
            backgroundColor: '#fafaf8',
            useCORS: true,
          });
          storyImageBase64 = canvas.toDataURL('image/png');
        } catch (imgErr) {
          console.warn('Failed to capture story image, proceeding with email only:', imgErr);
        }
      }

      // Step 2: Send email via API
      setStatus('sending');
      setStatusText('И-мэйл хайрцаг руу илгээж байна...');

      const res = await fetch('/api/email/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          invoiceId: invoiceId || 'mock_paid_default',
          childProfile,
          archetypeId: archetype.id,
          scores,
          storyImageBase64,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'И-мэйл илгээхэд алдаа гарлаа.');
      }

      // Save email for next time
      if (typeof window !== 'undefined') {
        localStorage.setItem('anzaar_parent_email', email);
      }

      setStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.error('Email send error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'И-мэйл илгээхэд алдаа гарлаа.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-7 border border-zinc-200 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-zinc-900">
                И-мэйл амжилттай илгээгдлээ!
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-xs mx-auto">
                <strong className="text-indigo-600">{email}</strong> хаяг руу {childProfile.name}-ийн 12+ хуудас бүрэн хөтөч ном болон Story зургийг илгээлээ.
              </p>
            </div>

            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 text-left text-[11px] text-zinc-500 space-y-1">
              <p className="font-bold text-zinc-700">💡 Зөвлөгөө:</p>
              <p>Хэрэв Inbox хавтсанд харагдахгүй бол <strong>Spam / Junk</strong> эсвэл <strong>Promotions</strong> хавтсаа шалгаарай.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-zinc-900 hover:bg-black text-white text-xs font-black py-3.5 px-6 rounded-2xl transition-all shadow-md active:scale-95"
            >
              Ойлголоо, баярлалаа
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-5">
            {/* Header */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                <Mail className="w-3.5 h-3.5" />
                <span>И-МЭЙЛЭЭР ҮҮРД ХАДГАЛАХ</span>
              </div>
              <h3 className="text-xl font-black text-zinc-900">
                {childProfile.name}-ийн Хөтөч Номыг авах
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                12+ хуудас бүрэн зөвлөгөө, ярианы скриптүүд болон сошиал Story зургийг и-мэйлээрээ найдвартай хадгалаарай.
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 block">
                Таны и-мэйл хаяг:
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="таны.нэр@gmail.com"
                  value={email}
                  disabled={status === 'capturing' || status === 'sending'}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 pl-11 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-60"
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'capturing' || status === 'sending'}
              className="w-full bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/30 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {status === 'capturing' || status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{statusText || 'Бэлтгэж байна...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>И-мэйлээр шууд илгээх</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-zinc-400 text-center">
              🔒 Зөвхөн таны хүүхдийн үр дүнг илгээхэд ашиглагдах бөгөөд спам явуулахгүй.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
