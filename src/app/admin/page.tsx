'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  RefreshCw, 
  Lock, 
  Eye, 
  ArrowUpRight, 
  Activity, 
  Sparkles,
  Search,
  Filter,
  CreditCard,
  Layers,
  Calendar,
  ShieldCheck,
  Download,
  ChevronRight
} from 'lucide-react';

interface AdminStats {
  kpis: {
    totalVisitors: number;
    quizStarts: number;
    quizCompletions: number;
    totalPayments: number;
    totalRevenue: number;
    quizCompletionRate: string;
    paymentConversionRate: string;
  };
  funnel: { step: string; count: number; percentage: number }[];
  archetypeDistribution: { id: string; title: string; count: number }[];
  ageDistribution: Record<string, number>;
  recentPayments: {
    id: string;
    timestamp: string;
    childName: string;
    archetypeTitle: string;
    invoiceId: string;
    amount: number;
  }[];
  recentActivity: {
    id: string;
    type: string;
    timestamp: string;
    childName?: string;
    archetypeTitle?: string;
    amount?: number;
  }[];
  lastUpdated: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Check auth session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('anzaar_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch stats function
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch admin stats', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchStats();

    let interval: any = null;
    if (isAutoRefresh) {
      interval = setInterval(fetchStats, 4000); // 4-second real-time sync
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated, isAutoRefresh]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem('anzaar_admin_auth', 'true');
      } else {
        setAuthError(data.error || 'Нууц үг буруу байна');
      }
    } catch (err) {
      setAuthError('Холболтын алдаа гарлаа');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('anzaar_admin_auth');
    setIsAuthenticated(false);
  };

  const handleExportCsv = () => {
    window.open('/api/admin/export', '_blank');
  };

  // 1. Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-7 border border-zinc-200 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-900 to-indigo-950 text-white flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>

          <div>
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">
              ANZAAR Админ Самбар
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Бодит цагийн аналитик болон төлбөрийн хяналт
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <input
              type="password"
              required
              placeholder="Админ нууц үг оруулах..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-zinc-200 text-sm text-center font-bold tracking-wider text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-50"
            />

            {authError && (
              <p className="text-xs font-bold text-rose-600 animate-in fade-in">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-zinc-900 hover:bg-black text-white font-black text-xs py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isAuthenticating ? 'Шалгаж байна...' : 'Нэвтрэх'}
            </button>
          </form>

          <p className="text-[11px] text-zinc-400 font-medium">
            (Анхдагч нууц үг: <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700 font-mono">anzaar2026</code>)
          </p>
        </div>
      </div>
    );
  }

  const filteredPayments = stats?.recentPayments.filter(
    (p) =>
      p.childName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.archetypeTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header & Live Sync Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
              A
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              ANZAAR Шууд Хяналтын Самбар
            </h1>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            100% Бодит хэрэглэгчийн урсгал ба QPay төлбөрийн үзүүлэлт
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>CSV Татах</span>
          </button>

          {/* Live Sync Indicator */}
          <button
            type="button"
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border transition-all ${
              isAutoRefresh
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm'
                : 'bg-zinc-100 text-zinc-600 border-zinc-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'
              }`}
            />
            <span>{isAutoRefresh ? 'Шууд (4с)' : 'Зогссон'}</span>
          </button>

          <button
            type="button"
            onClick={fetchStats}
            title="Шинэчлэх"
            className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
          >
            Гарах
          </button>
        </div>
      </div>

      {/* 4 Core KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-indigo-900 to-zinc-950 text-white p-5 sm:p-6 rounded-3xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">Нийт Орлого</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ₮{(stats?.kpis.totalRevenue || 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-indigo-200 mt-1 font-medium">
            {stats?.kpis.totalPayments || 0} амжилттай худалдан авалт
          </p>
        </div>

        {/* Total Visitors */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/90 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-zinc-500 uppercase tracking-wider">Нийт Зочин</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
            {(stats?.kpis.totalVisitors || 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1 font-medium">
            Вебсайтад зочилсон бодит хандалт
          </p>
        </div>

        {/* Completed Quizzes */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/90 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-zinc-500 uppercase tracking-wider">Сорил Бөглөсөн</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
            {stats?.kpis.quizCompletions || 0}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            {stats?.kpis.quizCompletionRate}% дуусгалтын хувь
          </p>
        </div>

        {/* Purchase Conversion Rate */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/90 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-zinc-500 uppercase tracking-wider">Хөрвүүлэлтийн Хувь</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-rose-600">
            {stats?.kpis.paymentConversionRate}%
          </p>
          <p className="text-[11px] text-zinc-500 mt-1 font-medium">
            Сорил ➔ Хөтөч худалдан авалт
          </p>
        </div>
      </div>

      {/* Funnel & Archetype Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Conversion Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-black text-zinc-900">
                Хэрэглэгчийн Хөрвүүлэлтийн Замнал (Funnel)
              </h3>
              <p className="text-xs text-zinc-500">Алхам бүр дэх бодит хандалт ба гээгдэл</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {stats?.funnel.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-800">{item.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-mono">{item.count}</span>
                    <span className="text-indigo-600 font-extrabold w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage, item.count > 0 ? 3 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Archetype Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-black text-zinc-900">
              Хэв Шинжийн Тархалт
            </h3>
            <p className="text-xs text-zinc-500">Эцэг эхчүүдийн оношилсон зан төлөвүүд</p>
          </div>

          <div className="space-y-2.5 pt-1">
            {stats?.archetypeDistribution.map((arch) => (
              <div
                key={arch.id}
                className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-2xl border border-zinc-200/70 text-xs font-bold"
              >
                <span className="text-zinc-800">{arch.title}</span>
                <span className="bg-white px-2.5 py-1 rounded-xl border border-zinc-200 text-indigo-700 font-mono font-black">
                  {arch.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Payments Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-zinc-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Шууд Төлбөрийн Түүх (QPAY)</span>
            </h3>
            <p className="text-xs text-zinc-500">Баталгаажсан бодит 14,900₮ захиалгууд</p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Хүүхдийн нэр, нэхэмжлэхээр хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-zinc-50/70"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-10 text-zinc-400 text-xs space-y-1">
            <p className="font-bold">Одоогоор төлбөрийн шинэ гүйлгээ хийгдээгүй байна</p>
            <p className="text-[11px] text-zinc-400">Хэрэглэгчид QPay-ээр төлбөр хийх үед энд автоматаар бодит цагт гарч ирнэ.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="pb-3 font-black">Огноо / Цаг</th>
                  <th className="pb-3 font-black">Хүүхдийн Нэр</th>
                  <th className="pb-3 font-black">Хэв Шинж</th>
                  <th className="pb-3 font-black">Нэхэмжлэх ID</th>
                  <th className="pb-3 font-black">Дүн</th>
                  <th className="pb-3 font-black text-right">Төлөв</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-3 text-zinc-500 font-medium">
                      {new Date(p.timestamp).toLocaleDateString('mn-MN')} {new Date(p.timestamp).toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 font-black text-zinc-900">
                      {p.childName || 'Хүүхэд'}
                    </td>
                    <td className="py-3 text-zinc-700 font-semibold">
                      {p.archetypeTitle || 'Оношлогдсон'}
                    </td>
                    <td className="py-3 font-mono text-zinc-500 text-[11px]">
                      {p.invoiceId || 'ANZ_MOCK'}
                    </td>
                    <td className="py-3 font-black text-zinc-900">
                      ₮{(p.amount || 14900).toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[10.5px] px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> ТӨЛӨГДСӨН
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm sm:text-base font-black text-zinc-900">
            Шууд Үйлдлүүдийн Урсгал (Live Stream)
          </h3>
        </div>

        {stats?.recentActivity.length === 0 ? (
          <div className="text-center py-6 text-zinc-400 text-xs">
            Шинэ үйлдэл хүлээгдэж байна...
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {stats?.recentActivity.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 bg-zinc-50/70 rounded-2xl border border-zinc-200/60 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-bold text-zinc-800">
                    {act.type === 'PAGE_VIEW' && '🌐 Шинэ зочин вебсайтад хандлаа'}
                    {act.type === 'QUIZ_START' && `📝 ${act.childName || 'Хүүхэд'}-ийн сорилыг эхлүүллээ`}
                    {act.type === 'QUIZ_COMPLETE' && `🎯 ${act.childName || 'Хүүхэд'}-ийн оношилгоо дууслаа: «${act.archetypeTitle}»`}
                    {act.type === 'PAYMENT_INIT' && `💳 ${act.childName || 'Хүүхэд'}-ийн 14,900₮ QPay нэхэмжлэх үүслээ`}
                    {act.type === 'PAYMENT_SUCCESS' && `💰 ${act.childName || 'Хүүхэд'}-ийн хөтөч ном 14,900₮-өөр амжилттай худалдан авагдлаа!`}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {new Date(act.timestamp).toLocaleTimeString('mn-MN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
