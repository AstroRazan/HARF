import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess({
      tab,
      name: name || 'أحمد يوسف'
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-container w-full max-w-md p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-[#8A8681] hover:text-[#2C2C2A] p-1.5 rounded-full hover:bg-[#E5DFD5]/50 transition-colors focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wordmark and Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-serif text-[#2C2C2A] tracking-wider mb-1">
            حرف
          </h2>
          <p className="text-xs text-[#8A8681]" id="auth-modal-title">
            {tab === 'login' ? 'تسجيل الدخول إلى حسابك التجريبي' : 'إنشاء حساب تجريبي جديد'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5DFD5] mb-6">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-[#C0703A] text-[#C0703A]'
                : 'border-transparent text-[#8A8681] hover:text-[#2C2C2A]'
            }`}
          >
            دخول
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors border-b-2 ${
              tab === 'signup'
                ? 'border-[#C0703A] text-[#C0703A]'
                : 'border-transparent text-[#8A8681] hover:text-[#2C2C2A]'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#2C2C2A] mb-1">
                الاسم
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد يوسف"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3.5 py-2.5 text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C] transition-all"
                />
                <User className="w-4 h-4 text-[#8A8681] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#2C2C2A] mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3.5 py-2.5 text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C] transition-all"
              />
              <Mail className="w-4 h-4 text-[#8A8681] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#2C2C2A] mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3.5 py-2.5 text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C] transition-all"
              />
              <Lock className="w-4 h-4 text-[#8A8681] absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B7F5C]"
            >
              {tab === 'login' ? 'دخول' : 'إنشاء حساب'}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-[#8A8681] text-center mt-4">
          جلسة تجريبية سريعة — لا يتم تخزين أي بيانات اعتماد
        </p>
      </div>
    </div>
  );
}
