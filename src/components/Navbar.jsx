import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, LogOut, Library, ChevronDown } from 'lucide-react';

export default function Navbar({ currentView, setView, onOpenAuth, onLogout, currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'library', label: 'المكتبة' },
    { id: 'my-library', label: 'مكتبتي' },
    { id: 'communities', label: 'المجتمعات' }
  ];

  // Close dropdown menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (viewId) => {
    setView({ name: viewId });
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <header className="border-b border-[#E2D2BC] bg-[#FDF8F0]/90 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Right Side in RTL: Wordmark & Navigation */}
        <div className="flex items-center gap-10">
          {/* Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
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
                  onClick={() => handleNavClick(item.id)}
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

        {/* Left Side in RTL: Auth / User Menu */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          {currentUser ? (
            <div>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm sm:text-[15px] font-medium text-[#2B2B26] bg-[#FDF8F0] hover:bg-[#F1DEC4] border border-[#E2D2BC] px-3.5 py-2 rounded-xl transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#677E61]"
                aria-expanded={isMenuOpen}
                aria-label="قائمة المستخدم"
              >
                <div className="w-6 h-6 rounded-full bg-[#73976A]/20 text-[#677E61] flex items-center justify-center font-bold text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'م'}
                </div>
                <span className="font-semibold">{currentUser.name}</span>
                <ChevronDown className={`w-4 h-4 text-[#7A7468] transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl shadow-lg py-2 z-50 animate-scale-up">
                  <div className="px-4 py-2.5 border-b border-[#E2D2BC]/60">
                    <p className="text-xs font-semibold text-[#2B2B26] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[#7A7468] truncate mt-0.5" dir="ltr">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('my-library')}
                      className="w-full text-right px-4 py-2 text-xs text-[#2B2B26] hover:bg-[#F1DEC4] flex items-center gap-2.5 transition-colors"
                    >
                      <Library className="w-4 h-4 text-[#73976A]" />
                      <span>مكتبتي</span>
                    </button>
                  </div>

                  <div className="border-t border-[#E2D2BC]/60 pt-1">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-right px-4 py-2 text-xs text-[#BD4444] hover:bg-[#BD4444]/10 flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-[#FDF8F0] bg-[#BD4444] hover:bg-[#A43939] px-4 py-2 rounded-xl transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#BD4444]"
              aria-label="تسجيل الدخول أو إنشاء حساب"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
