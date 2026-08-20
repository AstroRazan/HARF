import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toArabicDigits } from '../utils/formatters';

export default function StarRating({
  rating = 0,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md', // 'sm' | 'md' | 'lg'
  showNumber = false,
  className = ''
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const currentVal = interactive ? (hoverRating || rating) : rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div
        className="flex items-center gap-0.5"
        role={interactive ? 'radiogroup' : 'img'}
        aria-label={`التقييم: ${toArabicDigits(rating)} من ${toArabicDigits(maxStars)}`}
      >
        {[...Array(maxStars)].map((_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= currentVal;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starNumber)}
              onMouseEnter={() => interactive && setHoverRating(starNumber)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${
                interactive
                  ? 'cursor-pointer p-0.5 hover:scale-110 transition-transform focus-visible:ring-1 focus-visible:ring-[#677E61]'
                  : 'cursor-default pointer-events-none'
              }`}
              aria-label={`${toArabicDigits(starNumber)} من ٥ نجوم`}
            >
              <Star
                className={`${starSizes[size] || starSizes.md} ${
                  isFilled
                    ? 'fill-[#BD4444] text-[#BD4444]'
                    : 'fill-transparent text-[#DFCEB7]'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>

      {showNumber && rating > 0 && (
        <span className="text-xs font-semibold text-[#2B2B26] mr-1">
          {toArabicDigits(rating)}
        </span>
      )}
    </div>
  );
}
