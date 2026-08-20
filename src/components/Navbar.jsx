import React from 'react';
import { User, LogIn, BookOpen, Compass, Library, Users } from 'lucide-react';

export default function Navbar({ currentView, setView, onOpenAuth, currentUser }) {
  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'library', label: 'المكتبة' },
    { id: 'my-library', label: 'مكتبتي' },
    { id: 'communities', label: 'المجتمعات' }
  ];

  return (
    <header className="border-b border-[#E2D2BC] bg-[#FDF8F0]/90 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Right Side in RTL: Wordmark & Navigation */}
        <div className="flex items-center gap-10">
          {/* Wordmark */}
          <button
            onClick={() => setView({ name: 'home' })}
            className="flex items-center gap-2.5 text-[#2B2B26] hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-[#677E61] rounded-xl px-1 py-1"
            aria-label="حرف - الصفحة الرئيسية"
          >
            <span className="w-9 h-9 rounded-xl bg-[#73976A] text-[#FDF8F0] flex items-center justify-center text-xl shadow-sm logo-text leading-none select-none">
              ح
            </span>
            <span className="logo-text text-[28px] leading-tight tracking-normal">حرف</span>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="التنقل الرئيسي">
            {navItems.map((item) => {
              const isActive = currentView.name === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView({ name: item.id })}
                  className={`px-4 py-2 rounded-xl text-[16px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#F1DEC4] text-[#2B2B26] font-semibold shadow-2xs'
                      : 'text-[#7A7468] hover:text-[#2B2B26] hover:bg-[#F1DEC4]/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Left Side in RTL: Auth Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 text-sm sm:text-[15px] font-medium text-[#2B2B26] bg-[#FDF8F0] hover:bg-[#F1DEC4] border border-[#E2D2BC] px-4 py-2 rounded-xl transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#677E61]"
            aria-label="تسجيل الدخول أو إنشاء حساب"
            title="تسجيل الدخول / حساب جديد"
          >
            <User className="w-4 h-4 text-[#73976A]" />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.name : 'دخول'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
