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
    <header className="border-b border-[#E5DFD5] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Right Side in RTL: Wordmark & Navigation */}
        <div className="flex items-center gap-8">
          {/* Wordmark */}
          <button
            onClick={() => setView({ name: 'home' })}
            className="flex items-center gap-2 text-2xl font-bold font-serif text-[#2C2C2A] tracking-wider hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-[#6B7F5C] rounded-lg px-1"
            aria-label="حرف - الصفحة الرئيسية"
          >
            <span className="w-8 h-8 rounded-lg bg-[#6B7F5C] text-[#FAF7F2] flex items-center justify-center text-lg font-serif shadow-sm">
              ح
            </span>
            <span>حرف</span>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {navItems.map((item) => {
              const isActive = currentView.name === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView({ name: item.id })}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#E8E2D7] text-[#2C2C2A] font-semibold'
                      : 'text-[#8A8681] hover:text-[#2C2C2A] hover:bg-[#F2EBE0]/60'
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
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#2C2C2A] bg-[#FAF7F2] hover:bg-[#E8E2D7] border border-[#E5DFD5] px-3 py-1.5 rounded-xl transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
            aria-label="تسجيل الدخول أو إنشاء حساب"
            title="تسجيل الدخول / حساب جديد"
          >
            <User className="w-4 h-4 text-[#6B7F5C]" />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.name : 'دخول'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
