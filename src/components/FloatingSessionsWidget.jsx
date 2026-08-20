import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Plus, X, Users, Sparkles, Radio } from 'lucide-react';
import { getSessions, joinSession } from '../data/store';
import { toArabicDigits } from '../utils/formatters';

export default function FloatingSessionsWidget({ setView, showToast, currentUser, onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const loadSessions = async () => {
    const list = await getSessions();
    setSessions(list);
  };

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleJoin = async (e, sess) => {
    e.stopPropagation();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    await joinSession(sess.id, 'قراءة حرة', currentUser);
    showToast('انضممت إلى جلسة القراءة');
    setIsOpen(false);
    setView({ name: 'communities' });
  };

  const handleCreateClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setIsOpen(false);
    setView({ name: 'communities' });
  };

  const activeCount = sessions.length;

  return (
    <>
      {/* 1. Collapsed Floating Pill Button (Pinned to bottom-left corner in RTL) */}
      <div className="fixed left-5 bottom-20 md:bottom-6 z-40">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#677E61] ${
            isOpen
              ? 'bg-[#24211D] text-[#FDF8F0] border-[#677E61]'
              : 'bg-[#24211D] hover:bg-[#2F2B26] text-[#FDF8F0] border-[#443F36]'
          }`}
          aria-expanded={isOpen}
          aria-label="جلسات القراءة الصامتة المباشرة"
        >
          {/* Live pulsing dot indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#73976A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#73976A]" />
          </span>

          <span className="text-xs font-semibold tracking-wide">
            جلسات مباشرة ({toArabicDigits(activeCount)})
          </span>
        </button>
      </div>

      {/* 2. Expanded Popup Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed left-5 bottom-32 md:bottom-20 z-50 w-80 sm:w-96 bg-[#FDF8F0] border border-[#E2D2BC] rounded-2xl shadow-2xl p-4 sm:p-5 space-y-3.5 text-[#2B2B26] animate-scale-up"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة جلسات القراءة المباشرة"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[#E2D2BC]/70 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#73976A]/15 text-[#677E61] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm font-serif text-[#2B2B26]">
                  جلسات القراءة الصامتة
                </h3>
                <p className="text-[10px] text-[#7A7468]">
                  مساحات تركيز هادئة للقراءة الجماعية
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#7A7468] hover:text-[#2B2B26] p-1 rounded-full hover:bg-[#E2D2BC]/50 transition-colors"
              aria-label="إغلاق اللوحة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Sessions List */}
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-0.5 hide-scrollbar">
            {sessions.map((sess) => {
              const count = sess.participants?.length || 0;
              return (
                <div
                  key={sess.id}
                  className="bg-[#FAF5ED] border border-[#E2D2BC] rounded-xl p-3 flex items-center justify-between gap-3 hover:border-[#677E61]/50 transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] bg-[#677E61]/10 text-[#677E61] px-1.5 py-0.5 rounded font-semibold">
                        {toArabicDigits(sess.durationMinutes || 25)} دقيقة
                      </span>
                      <span className="text-[10px] text-[#7A7468] flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{toArabicDigits(count)} يقرؤون</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-[#2B2B26] truncate font-serif">
                      {sess.title}
                    </h4>
                  </div>

                  <button
                    onClick={(e) => handleJoin(e, sess)}
                    className="bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-2xs flex items-center gap-1 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>انضم</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Panel Footer: Create Session Action */}
          <div className="pt-2 border-t border-[#E2D2BC]/70">
            <button
              onClick={handleCreateClick}
              className="w-full py-2 px-3 rounded-xl bg-[#677E61] hover:bg-[#52664D] text-[#FDF8F0] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>أنشئ جلسة جديدة</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
