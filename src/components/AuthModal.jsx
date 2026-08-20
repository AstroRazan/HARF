import React, { useState } from 'react';
import { X, User, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { login, signup } from '../data/store';
import harfLogo from '../assets/harf_logo.png';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'signup') {
        if (!name.trim()) {
          setError('يرجى إدخال الاسم');
          setLoading(false);
          return;
        }
        const res = await signup({ name, email, password });
        onAuthSuccess(res.user, 'signup');
        onClose();
      } else {
        const res = await login({ email, password });
        onAuthSuccess(res.user, 'login');
        onClose();
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء المحاولة، يرجى إعادة المحاولة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-container w-full max-w-md p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-[#7A7468] hover:text-[#2B2B26] p-1.5 rounded-full hover:bg-[#E2D2BC]/50 transition-colors focus-visible:ring-2 focus-visible:ring-[#677E61]"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wordmark and Header with Logo */}
        <div className="text-center mb-6 flex flex-col items-center">
          <img
            src={harfLogo}
            alt="حرف"
            className="h-16 sm:h-20 w-auto object-contain mb-2.5 drop-shadow-xs"
          />
          <h2 className="text-2xl font-bold logo-text text-[#2B2B26] mb-1">
            حرف
          </h2>
          <p className="text-xs text-[#7A7468]" id="auth-modal-title">
            {tab === 'login' ? 'تسجيل الدخول إلى حسابك' : 'إنشاء حساب جديد'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E2D2BC] mb-6">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-[#BD4444] text-[#BD4444]'
                : 'border-transparent text-[#7A7468] hover:text-[#2B2B26]'
            }`}
          >
            دخول
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${
              tab === 'signup'
                ? 'border-[#BD4444] text-[#BD4444]'
                : 'border-transparent text-[#7A7468] hover:text-[#2B2B26]'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-[#BD4444]/10 border border-[#BD4444]/30 rounded-xl flex items-center gap-2 text-xs text-[#BD4444] font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                الاسم
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد يوسف"
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-sm text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61] transition-all"
                />
                <User className="w-4 h-4 text-[#7A7468] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#2B2B26] mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-sm text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61] transition-all"
              />
              <Mail className="w-4 h-4 text-[#7A7468] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2B2B26] mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-sm text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61] transition-all"
              />
              <Lock className="w-4 h-4 text-[#7A7468] absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0] font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BD4444] flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{tab === 'login' ? 'دخول' : 'إنشاء حساب'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
