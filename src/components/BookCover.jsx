import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function BookCover({
  title = '',
  author = '',
  category = '',
  coverUrl = null,
  language = 'ar',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = ''
}) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-14 h-20 text-[10px] rounded-lg',
    md: 'w-full aspect-[3/4.2] text-xs rounded-card',
    lg: 'w-44 md:w-52 aspect-[3/4.3] text-sm rounded-card',
    xl: 'w-56 md:w-64 aspect-[3/4.3] text-base rounded-card'
  };

  const hasValidCover = Boolean(coverUrl) && !imgError;

  if (hasValidCover) {
    return (
      <div
        className={`relative overflow-hidden border border-[#DFCEB7] select-none shadow-sm bg-[#FDF8F0] ${sizeClasses[size] || sizeClasses.md} ${className}`}
        aria-label={`غلاف كتاب: ${title}`}
      >
        <img
          src={coverUrl}
          alt={`غلاف كتاب: ${title}`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between p-3 border border-[#DFCEB7] select-none book-cover-pattern shadow-sm ${sizeClasses[size] || sizeClasses.md} ${className}`}
      aria-label={`غلاف كتاب: ${title}`}
    >
      {/* Top spine / label */}
      <div className="flex items-center justify-between gap-1 text-[#7A7468] text-[10px] font-medium">
        <span className="bg-[#FDF8F0]/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#E2D2BC]">
          صورة الغلاف
        </span>
        {category && size !== 'sm' && (
          <span className="text-[10px] text-[#7A7468]">
            {category}
          </span>
        )}
      </div>

      {/* Center title area */}
      <div className="my-auto py-2 text-center flex flex-col items-center justify-center">
        <BookOpen className="w-5 h-5 text-[#7A7468]/60 mb-1.5 stroke-[1.5]" aria-hidden="true" />
        <h4
          className="font-bold text-[#2B2B26] leading-tight line-clamp-2 px-1 font-display"
          dir={language === 'en' ? 'ltr' : 'rtl'}
          style={language === 'en' ? { direction: 'ltr' } : {}}
        >
          {title}
        </h4>
        {author && size !== 'sm' && (
          <p
            className="text-[11px] text-[#7A7468] mt-1 line-clamp-1"
            dir={language === 'en' ? 'ltr' : 'rtl'}
          >
            {author}
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="w-full h-1 bg-[#BD4444]/40 rounded-full"></div>
    </div>
  );
}
