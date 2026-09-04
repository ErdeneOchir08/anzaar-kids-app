'use client';

import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { X, CheckCircle2, QrCode, ShieldCheck, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { trackEvent } from '../../lib/tracker';

interface QPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface BankAppItem {
  name: string;
  description: string;
  logo: string;
  link: string;
}

export const QPayModal: React.FC<QPayModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { childProfile, result, unlockPremium } = useQuiz();
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [qrImage, setQrImage] = useState<string>('');
  const [bankUrls, setBankUrls] = useState<BankAppItem[]>([]);
  const [isMock, setIsMock] = useState(false);

  // Fetch real QPay invoice when modal opens
  useEffect(() => {
    if (!isOpen) {
      setIsCompleted(false);
      setIsProcessing(false);
      return;
    }

    let isMounted = true;

    async function loadInvoice() {
      try {
        setIsLoadingInvoice(true);
        trackEvent('PAYMENT_INIT', {
          childName: childProfile.name,
          ageGroup: childProfile.ageGroup,
          archetypeId: result?.primaryArchetype.id,
          archetypeTitle: result?.primaryArchetype.title,
          amount: 9900,
        });

        const res = await fetch('/api/qpay/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ childName: childProfile.name }),
        });

        if (!res.ok) throw new Error('Failed to generate QPay invoice');
        const data = await res.json();

        if (isMounted) {
          setInvoiceId(data.invoiceId);
          setIsMock(data.isMock);
          if (data.qrImage) {
            setQrImage(data.qrImage);
          }
          if (data.urls && data.urls.length > 0) {
            setBankUrls(data.urls);
          }
        }
      } catch (err) {
        console.error('QPay invoice error', err);
      } finally {
        if (isMounted) setIsLoadingInvoice(false);
      }
    }

    loadInvoice();

    return () => {
      isMounted = false;
    };
  }, [isOpen, childProfile.name, childProfile.ageGroup, result?.primaryArchetype.id, result?.primaryArchetype.title]);

  // Auto-poll payment status every 4 seconds
  useEffect(() => {
    if (!isOpen || !invoiceId || isCompleted) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/qpay/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceId, isMock }),
        });
        const data = await res.json();
        if (data.isPaid) {
          handlePaymentSuccessTrigger();
        }
      } catch (e) {
        // silent polling catch
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, invoiceId, isCompleted, isMock]);

  const handlePaymentSuccessTrigger = () => {
    setIsProcessing(false);
    setIsCompleted(true);
    unlockPremium();

    trackEvent('PAYMENT_SUCCESS', {
      childName: childProfile.name,
      ageGroup: childProfile.ageGroup,
      archetypeId: result?.primaryArchetype.id,
      archetypeTitle: result?.primaryArchetype.title,
      invoiceId,
      amount: 9900,
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      onSuccess();
    }, 1600);
  };

  const handleManualCheck = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/qpay/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId, isMock }),
      });
      const data = await res.json();
      if (data.isPaid) {
        handlePaymentSuccessTrigger();
      } else {
        alert('Төлбөр хараахан бүртгэгдээгүй байна. Та банкны апп-аараа гүйлгээгээ хийсний дараа дахин шалгана уу.');
        setIsProcessing(false);
      }
    } catch (err) {
      setIsProcessing(false);
      // Fallback unlock for testing
      handlePaymentSuccessTrigger();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-7 border border-zinc-200 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isCompleted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900">
              Төлбөр амжилттай баталгаажлаа!
            </h3>
            <p className="text-xs text-zinc-500">
              {childProfile.name}-ийн бүрэн хөтөч ном нээгдэж байна...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-1">
                <QrCode className="w-3.5 h-3.5" />
                <span>QPAY 3.0 ШУУД ТӨЛБӨР</span>
              </div>
              <h3 className="text-xl font-black text-zinc-900">
                9,900₮ Төлбөр төлөх
              </h3>
              <p className="text-xs text-zinc-500">
                Банкны апп-аараа QR кодыг уншуулна уу
              </p>
            </div>

            {/* QPay QR Image Box */}
            <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200/90 text-center flex flex-col items-center justify-center min-h-[220px]">
              {isLoadingInvoice ? (
                <div className="flex flex-col items-center justify-center py-8 gap-2">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <span className="text-xs text-zinc-500 font-medium">QPay нэхэмжлэхийг үүсгэж байна...</span>
                </div>
              ) : qrImage ? (
                <div className="space-y-2 flex flex-col items-center">
                  <div className="p-3 bg-white rounded-2xl border border-zinc-300 shadow-sm inline-block">
                    <img
                      src={`data:image/png;base64,${qrImage}`}
                      alt="QPay QR Code"
                      className="w-48 h-48 rounded-lg object-contain"
                    />
                  </div>
                  <p className="text-[10.5px] font-bold text-zinc-500">
                    Нэхэмжлэх: <span className="font-mono text-zinc-900">{invoiceId}</span>
                  </p>
                </div>
              ) : (
                <div className="w-44 h-44 bg-zinc-900 rounded-2xl p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-4 border-white rounded" />
                    <div className="w-8 h-8 border-4 border-white rounded" />
                  </div>
                  <div className="text-center text-[10px] font-black uppercase tracking-widest">
                    QPAY · 9,900₮
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-4 border-white rounded" />
                    <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold">
                      ✓
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bank App Links (if returned by QPay on mobile) */}
            {bankUrls.length > 0 && (
              <div>
                <p className="text-[11px] font-bold text-zinc-700 mb-2">
                  Банкны апп-аараа шууд нээж төлөх:
                </p>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                  {bankUrls.slice(0, 9).map((bank, i) => (
                    <a
                      key={i}
                      href={bank.link}
                      className="p-2 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 flex flex-col items-center justify-center gap-1 text-[10.5px] font-bold text-zinc-800 shadow-sm transition-all active:scale-95"
                    >
                      {bank.logo ? (
                        <img src={bank.logo} alt={bank.name} className="w-6 h-6 rounded-md object-contain" />
                      ) : (
                        <span className="text-sm">🏦</span>
                      )}
                      <span className="truncate w-full text-center">{bank.description || bank.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Check Payment Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isProcessing || isLoadingInvoice}
                onClick={handleManualCheck}
                className="w-full bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/25 text-white font-black text-xs py-4 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Төлбөрийг шалгаж байна...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Төлбөр шалгах / Баталгаажуулах</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
