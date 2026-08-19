import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      className="bg-[#FAF7F2] border-b border-[#E5DFD5] text-[#8A8681] text-xs sm:text-sm py-2 px-4 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#C0703A] shrink-0" aria-hidden="true" />
          <span className="font-medium text-[#2C2C2A]">
            نسخة تجريبية — جميع البيانات وهمية ولن يتم حفظها
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#8A8681] hover:text-[#2C2C2A] p-1 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
          aria-label="إغلاق التنبيه التجريبي"
          title="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
