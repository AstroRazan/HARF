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
      <div className="bg-[#2B2B26] text-[#FDF8F0] px-4 py-2.5 rounded-full shadow-lg border border-[#3C3C3A] flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide">
        {type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-[#BD4444]" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#73976A]" aria-hidden="true" />
        )}
        <span>{message || 'تم بنجاح'}</span>
      </div>
    </div>
  );
}
