import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Toast({ message, visible, type = 'info' }) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-8 right-1/2 translate-x-1/2 z-50 animate-bounce-in"
    >
      <div className="bg-[#2C2C2A] text-[#FAF7F2] px-4 py-2.5 rounded-full shadow-lg border border-[#3C3C3A] flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide">
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-[#6B7F5C]" aria-hidden="true" />
        ) : (
          <AlertCircle className="w-4 h-4 text-[#C0703A]" aria-hidden="true" />
        )}
        <span>{message || 'بيانات تجريبية — لم يتم الحفظ'}</span>
      </div>
    </div>
  );
}
