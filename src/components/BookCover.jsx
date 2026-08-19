import React from 'react';
import { BookOpen } from 'lucide-react';

export default function BookCover({
  title = '',
  author = '',
  category = '',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = ''
}) {
  const sizeClasses = {
    sm: 'w-14 h-20 text-[10px] rounded-lg',
    md: 'w-full aspect-[3/4.2] text-xs rounded-card',
    lg: 'w-44 md:w-52 aspect-[3/4.3] text-sm rounded-card',
    xl: 'w-56 md:w-64 aspect-[3/4.3] text-base rounded-card'
  };

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between p-3 border border-[#D5CDC1] select-none book-cover-pattern shadow-sm ${sizeClasses[size] || sizeClasses.md} ${className}`}
      aria-label={`غلاف كتاب: ${title}`}
    >
      {/* Top spine / label */}
      <div className="flex items-center justify-between gap-1 text-[#8A8681] text-[10px] font-medium">
        <span className="bg-[#FAF7F2]/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#E5DFD5]">
          صورة الغلاف
        </span>
        {category && size !== 'sm' && (
          <span className="text-[10px] text-[#8A8681]">
            {category}
          </span>
        )}
      </div>

      {/* Center title area */}
      <div className="my-auto py-2 text-center flex flex-col items-center justify-center">
        <BookOpen className="w-5 h-5 text-[#8A8681]/60 mb-1.5 stroke-[1.5]" aria-hidden="true" />
        <h4 className="font-bold text-[#2C2C2A] leading-tight line-clamp-2 px-1 font-serif">
          {title}
        </h4>
        {author && size !== 'sm' && (
          <p className="text-[11px] text-[#8A8681] mt-1 line-clamp-1">
            {author}
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="w-full h-1 bg-[#C0703A]/40 rounded-full"></div>
    </div>
  );
}
