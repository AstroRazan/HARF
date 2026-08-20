import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBooks } from '../data/store';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import { toArabicDigits } from '../utils/formatters';

function BookCarousel({ title, books, onSelectBook }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Drag to scroll state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const current = Math.abs(sl);
    setCanScrollRight(current > 5);
    setCanScrollLeft(current < maxScroll - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [books]);

  // RTL scroll handling: clicking left arrow scrolls left, right arrow scrolls right
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const distance = 300;
    const delta = direction === 'left' ? -distance : distance;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="my-8">
      {/* Carousel Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#2B2B26] font-serif">
          {title}
        </h2>
        <div className="flex items-center gap-1.5" dir="ltr">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-[#FDF8F0] border border-[#E2D2BC] hover:bg-[#F1DEC4] text-[#2B2B26] flex items-center justify-center transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#677E61]"
            aria-label="التمرير لليسار"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-[#FDF8F0] border border-[#E2D2BC] hover:bg-[#F1DEC4] text-[#2B2B26] flex items-center justify-center transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#677E61]"
            aria-label="التمرير لليمين"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrolling Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scroll-smooth hide-scrollbar ${
          isDown ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="w-[175px] sm:w-[200px] shrink-0 bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-3 flex flex-col justify-between snap-start hover:border-[#BD4444]/40 transition-all duration-200"
          >
            {/* Book Cover */}
            <div className="mb-2.5">
              <BookCover
                title={book.title}
                author={book.author}
                category={book.category}
                coverUrl={book.coverUrl}
                language={book.language}
                size="md"
              />
            </div>

            {/* Book Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="font-semibold text-sm text-[#2B2B26] line-clamp-1 leading-snug cursor-pointer hover:text-[#BD4444] transition-colors"
                  onClick={() => onSelectBook(book.id)}
                  title={book.title}
                  dir={book.language === 'en' ? 'ltr' : 'rtl'}
                  style={book.language === 'en' ? { direction: 'ltr' } : {}}
                >
                  {book.title}
                </h3>
                <p
                  className="text-xs text-[#7A7468] line-clamp-1 mt-0.5"
                  dir={book.language === 'en' ? 'ltr' : 'rtl'}
                >
                  {book.author}
                </p>
              </div>

              {/* Rating & Action Button */}
              <div className="mt-3 pt-2 border-t border-[#E2D2BC]/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <StarRating rating={book.averageRating} size="sm" />
                  <span className="text-[11px] text-[#7A7468]">
                    ({toArabicDigits(book.reviewsCount)})
                  </span>
                </div>

                <button
                  onClick={() => onSelectBook(book.id)}
                  className="w-full text-center text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-[#E2D2BC] text-[#2B2B26] hover:bg-[#BD4444] hover:text-[#FDF8F0] hover:border-[#BD4444] transition-colors focus-visible:ring-2 focus-visible:ring-[#BD4444]"
                >
                  اكتشف الآراء
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookshelfIllustration() {
  const books = [
    // Shelf 1 (Top, base at y = 117)
    { id: 1, x: 62, y: 35, w: 26, h: 82, fill: '#677E61', detail: 'gold-lines', tilt: 'left', baseY: 117 },
    { id: 2, x: 91, y: 22, w: 22, h: 95, fill: '#FDF8F0', detail: 'label-green', tilt: 'up', baseY: 117 },
    { id: 3, x: 116, y: 44, w: 30, h: 73, fill: '#73976A', detail: 'embossed', tilt: 'none', baseY: 117 },
    { id: 4, x: 156, y: 32, w: 20, h: 85, fill: '#BD4444', detail: 'pages-trim', tilt: 'left', rotate: -14, origin: '156px 117px', baseY: 117 },
    { id: 5, x: 178, y: 40, w: 24, h: 77, fill: '#EAD7BD', detail: 'dots', tilt: 'none', baseY: 117 },
    { id: 6, x: 278, y: 28, w: 28, h: 89, fill: '#546648', detail: 'gold-lines', tilt: 'up', baseY: 117 },
    { id: 7, x: 309, y: 48, w: 18, h: 69, fill: '#FDF8F0', detail: 'stripe', tilt: 'none', baseY: 117 },
    { id: 8, x: 334, y: 36, w: 22, h: 81, fill: '#73976A', detail: 'spine-ribbon', tilt: 'right', rotate: 11, origin: '334px 117px', baseY: 117 },

    // Shelf 2 (Middle, base at y = 242)
    { id: 9, x: 60, y: 148, w: 32, h: 94, fill: '#73976A', detail: 'gold-lines', tilt: 'up', baseY: 242 },
    { id: 10, x: 95, y: 160, w: 18, h: 82, fill: '#FDF8F0', detail: 'label-green', tilt: 'none', baseY: 242 },
    { id: 11, x: 116, y: 142, w: 25, h: 100, fill: '#677E61', detail: 'spine', tilt: 'up', baseY: 242 },
    { id: 12, x: 144, y: 166, w: 22, h: 76, fill: '#EAD7BD', detail: 'dots', tilt: 'none', baseY: 242 },
    { id: 13, x: 172, y: 154, w: 24, h: 88, fill: '#546648', detail: 'pages-trim', tilt: 'right', rotate: 12, origin: '172px 242px', baseY: 242 },
    // Horizontal Stack (Middle shelf)
    { id: 14, isStack: true, x: 250, y: 228, w: 68, h: 14, fill: '#FDF8F0', detail: 'stack-pages', tilt: 'none', baseY: 242 },
    { id: 15, isStack: true, x: 254, y: 214, w: 62, h: 14, fill: '#677E61', detail: 'stack-spine', tilt: 'none', baseY: 242 },
    { id: 16, isStack: true, x: 258, y: 201, w: 54, h: 13, fill: '#73976A', detail: 'stack-embossed', tilt: 'none', baseY: 242 },
    { id: 17, x: 345, y: 145, w: 26, h: 97, fill: '#BD4444', detail: 'gold-lines', tilt: 'up', baseY: 242 },
    { id: 18, x: 374, y: 158, w: 22, h: 84, fill: '#FDF8F0', detail: 'stripe', tilt: 'left', baseY: 242 },
    { id: 19, x: 399, y: 149, w: 28, h: 93, fill: '#73976A', detail: 'spine', tilt: 'up', baseY: 242 },

    // Shelf 3 (Bottom, base at y = 367)
    { id: 20, x: 60, y: 270, w: 28, h: 97, fill: '#FDF8F0', detail: 'border-gold', tilt: 'left', baseY: 367 },
    { id: 21, x: 91, y: 262, w: 34, h: 105, fill: '#677E61', detail: 'gold-lines', tilt: 'up', baseY: 367 },
    { id: 22, x: 128, y: 285, w: 18, h: 82, fill: '#73976A', detail: 'spine', tilt: 'none', baseY: 367 },
    { id: 23, x: 153, y: 278, w: 22, h: 89, fill: '#EAD7BD', detail: 'pages-trim', tilt: 'left', rotate: -10, origin: '153px 367px', baseY: 367 },
    { id: 24, x: 178, y: 272, w: 26, h: 95, fill: '#546648', detail: 'label-ivory', tilt: 'up', baseY: 367 },
    { id: 25, x: 272, y: 288, w: 22, h: 79, fill: '#FDF8F0', detail: 'stripe', tilt: 'none', baseY: 367 },
    { id: 26, x: 297, y: 265, w: 32, h: 102, fill: '#73976A', detail: 'gold-lines', tilt: 'up', baseY: 367 },
    { id: 27, x: 333, y: 280, w: 20, h: 87, fill: '#BD4444', detail: 'spine', tilt: 'right', rotate: 10, origin: '333px 367px', baseY: 367 },
    { id: 28, x: 360, y: 274, w: 25, h: 93, fill: '#DFCEB7', detail: 'dots', tilt: 'none', baseY: 367 },
    { id: 29, x: 388, y: 268, w: 26, h: 99, fill: '#677E61', detail: 'gold-lines', tilt: 'left', baseY: 367 }
  ];

  return (
    <div className="w-full max-w-[480px] lg:max-w-[530px] mx-auto select-none hero-ambient-float">
      <svg
        viewBox="0 0 500 420"
        className="w-full h-auto drop-shadow-md overflow-visible"
        aria-label="رسم توضيحي لرفوف الكتب"
        role="img"
      >
        <defs>
          {/* Soft Warm Radial Glow */}
          <radialGradient id="heroGlow" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor="#F1DEC4" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#F8EADB" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#FDF8F0" stopOpacity="0" />
          </radialGradient>

          {/* Shelf Top Surface Gradient */}
          <linearGradient id="woodTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EADBCA" />
            <stop offset="50%" stopColor="#DFCEB7" />
            <stop offset="100%" stopColor="#D5C0A8" />
          </linearGradient>

          {/* Plant Leaf Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#85A87B" />
            <stop offset="100%" stopColor="#677E61" />
          </linearGradient>
        </defs>

        {/* Ambient Warm Backdrop Glow */}
        <ellipse cx="250" cy="215" rx="235" ry="195" fill="url(#heroGlow)" />
        <circle cx="395" cy="80" r="52" fill="#E8D5BC" opacity="0.4" />
        <circle cx="105" cy="230" r="42" fill="#E2D0B8" opacity="0.3" />

        {/* Terracotta Plant Pot on Top Shelf */}
        <g className="hero-book-item" style={{ animationDelay: '620ms' }}>
          {/* Pot Shadow */}
          <ellipse cx="400" cy="117" rx="14" ry="2.5" fill="#2B2B26" opacity="0.18" />
          {/* Pot Body */}
          <path d="M 388 117 L 392 94 L 412 94 L 416 117 Z" fill="#BD4444" />
          <rect x="387" y="92" width="28" height="3" rx="1" fill="#A43939" />
          {/* Olive / Botanical Leaves */}
          <path
            d="M 402 92 Q 390 74 380 72 Q 392 84 402 92 Q 407 68 418 64 Q 412 80 402 92 Q 424 78 428 72 Q 420 88 402 92"
            fill="url(#leafGrad)"
          />
        </g>

        {/* Bookmark ribbon on Shelf 1 */}
        <path
          d="M 345 117 Q 343 134 348 141 L 345 143 L 342 141 Q 343 132 343 117 Z"
          fill="#BD4444"
          opacity="0.85"
        />

        {/* Books with Contact Shadows, Details, and Staggered Animations */}
        {books.map((b, index) => {
          const tiltClass =
            b.tilt === 'left'
              ? 'hero-book-tilt-left'
              : b.tilt === 'right'
              ? 'hero-book-tilt-right'
              : b.tilt === 'up'
              ? 'hero-book-tilt-up'
              : '';

          return (
            <g
              key={b.id}
              className={`hero-book-item hero-book-interactive ${tiltClass}`}
              style={{
                animationDelay: `${index * 50}ms`,
                transform: b.rotate ? `rotate(${b.rotate}deg)` : undefined,
                transformOrigin: b.origin
              }}
            >
              {/* Contact Shadow under Book */}
              {!b.isStack && (
                <ellipse
                  cx={b.x + b.w / 2}
                  cy={b.baseY}
                  rx={b.w * 0.48}
                  ry={2.5}
                  fill="#2B2B26"
                  opacity="0.16"
                />
              )}

              {/* Main Book Body */}
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={b.isStack ? 2 : 3}
                fill={b.fill}
                stroke="#2B2B26"
                strokeWidth="0.5"
                strokeOpacity="0.12"
              />

              {/* Detail 1: Gold / Ivory Double Lines */}
              {b.detail === 'gold-lines' && (
                <>
                  <rect
                    x={b.x + 2.5}
                    y={b.y + b.h * 0.18}
                    width={Math.max(2, b.w - 5)}
                    height="2.5"
                    fill="#FDF8F0"
                    opacity="0.85"
                    rx="0.5"
                  />
                  <rect
                    x={b.x + 2.5}
                    y={b.y + b.h * 0.76}
                    width={Math.max(2, b.w - 5)}
                    height="2.5"
                    fill="#FDF8F0"
                    opacity="0.85"
                    rx="0.5"
                  />
                  <line
                    x1={b.x + 4}
                    y1={b.y + b.h * 0.26}
                    x2={b.x + b.w - 4}
                    y2={b.y + b.h * 0.26}
                    stroke="#FDF8F0"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </>
              )}

              {/* Detail 2: Contrasting Label on Spine */}
              {b.detail === 'label-green' && (
                <rect
                  x={b.x + 3}
                  y={b.y + b.h * 0.22}
                  width={Math.max(2, b.w - 6)}
                  height={b.h * 0.28}
                  fill="#677E61"
                  rx="1.5"
                />
              )}

              {b.detail === 'label-ivory' && (
                <rect
                  x={b.x + 3}
                  y={b.y + b.h * 0.22}
                  width={Math.max(2, b.w - 6)}
                  height={b.h * 0.28}
                  fill="#FDF8F0"
                  rx="1.5"
                />
              )}

              {/* Detail 3: Visible Light Page Trim */}
              {b.detail === 'pages-trim' && (
                <rect
                  x={b.x + b.w - 3.5}
                  y={b.y + 2}
                  width="2.5"
                  height={b.h - 4}
                  fill="#FFFDF9"
                  opacity="0.9"
                  rx="0.5"
                />
              )}

              {/* Detail 4: Embossed Lines */}
              {b.detail === 'embossed' && (
                <>
                  <line
                    x1={b.x + 3}
                    y1={b.y + 12}
                    x2={b.x + b.w - 3}
                    y2={b.y + 12}
                    stroke="#FDF8F0"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                  <line
                    x1={b.x + 3}
                    y1={b.y + 18}
                    x2={b.x + b.w - 3}
                    y2={b.y + 18}
                    stroke="#FDF8F0"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                  <line
                    x1={b.x + 3}
                    y1={b.y + b.h - 14}
                    x2={b.x + b.w - 3}
                    y2={b.y + b.h - 14}
                    stroke="#FDF8F0"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                </>
              )}

              {/* Detail 5: Minimal Spine Groove */}
              {b.detail === 'spine' && (
                <line
                  x1={b.x + 4}
                  y1={b.y + 6}
                  x2={b.x + 4}
                  y2={b.y + b.h - 6}
                  stroke="#2B2B26"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                />
              )}

              {/* Detail 6: Gold / Foil Dots */}
              {b.detail === 'dots' && (
                <>
                  <circle
                    cx={b.x + b.w / 2}
                    cy={b.y + b.h * 0.35}
                    r="1.8"
                    fill="#FDF8F0"
                    opacity="0.8"
                  />
                  <circle
                    cx={b.x + b.w / 2}
                    cy={b.y + b.h * 0.5}
                    r="1.8"
                    fill="#FDF8F0"
                    opacity="0.8"
                  />
                  <circle
                    cx={b.x + b.w / 2}
                    cy={b.y + b.h * 0.65}
                    r="1.8"
                    fill="#FDF8F0"
                    opacity="0.8"
                  />
                </>
              )}

              {/* Detail 7: Gold Border Spine */}
              {b.detail === 'border-gold' && (
                <rect
                  x={b.x + 2}
                  y={b.y + 3}
                  width={b.w - 4}
                  height={b.h - 6}
                  rx="2"
                  fill="none"
                  stroke="#DFCEB7"
                  strokeWidth="1.2"
                />
              )}

              {/* Detail 8: Spine Stripe Accent */}
              {b.detail === 'stripe' && (
                <rect
                  x={b.x + 2}
                  y={b.y + 10}
                  width={Math.max(2, b.w - 4)}
                  height="5"
                  fill="#BD4444"
                  opacity="0.85"
                  rx="1"
                />
              )}

              {/* Stack Details */}
              {b.detail === 'stack-pages' && (
                <rect
                  x={b.x + b.w - 5}
                  y={b.y + 2}
                  width="4"
                  height={b.h - 4}
                  fill="#FFFDF9"
                  opacity="0.95"
                />
              )}
              {b.detail === 'stack-spine' && (
                <line
                  x1={b.x + 5}
                  y1={b.y + b.h / 2}
                  x2={b.x + b.w - 8}
                  y2={b.y + b.h / 2}
                  stroke="#FDF8F0"
                  strokeWidth="1"
                  opacity="0.7"
                />
              )}
              {b.detail === 'stack-embossed' && (
                <rect
                  x={b.x + 6}
                  y={b.y + 3}
                  width={b.w - 12}
                  height="2"
                  fill="#FDF8F0"
                  opacity="0.7"
                />
              )}
            </g>
          );
        })}

        {/* 3 Horizontal Shelves with Real 3D Depth & Under-Shelf Shadows */}
        {/* Shelf 1 (Top: Plank at 117, Bevel at 125, Shadow below) */}
        <path d="M 36 133 Q 250 144 464 133 Q 250 137 36 133" fill="#3D382E" opacity="0.14" />
        <rect x="34" y="125" width="432" height="8" rx="2" fill="#BFA98D" />
        <polygon points="34,125 466,125 456,117 44,117" fill="url(#woodTop)" />
        <line x1="44" y1="117" x2="456" y2="117" stroke="#F1DEC4" strokeWidth="1.2" />

        {/* Shelf 2 (Middle: Plank at 242, Bevel at 250, Shadow below) */}
        <path d="M 36 258 Q 250 269 464 258 Q 250 262 36 258" fill="#3D382E" opacity="0.14" />
        <rect x="34" y="250" width="432" height="8" rx="2" fill="#BFA98D" />
        <polygon points="34,250 466,250 456,242 44,242" fill="url(#woodTop)" />
        <line x1="44" y1="242" x2="456" y2="242" stroke="#F1DEC4" strokeWidth="1.2" />

        {/* Shelf 3 (Bottom: Plank at 367, Bevel at 375, Shadow below) */}
        <path d="M 36 384 Q 250 396 464 384 Q 250 388 36 384" fill="#3D382E" opacity="0.16" />
        <rect x="34" y="375" width="432" height="9" rx="2" fill="#B29C81" />
        <polygon points="34,375 466,375 456,367 44,367" fill="url(#woodTop)" />
        <line x1="44" y1="367" x2="456" y2="367" stroke="#F1DEC4" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export default function HomePage({ setView, onOpenAuth, currentUser }) {
  const [mostDiscussed, setMostDiscussed] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [discussed, newest] = await Promise.all([
        getBooks({ sort: 'most-discussed' }),
        getBooks({ sort: 'newest' })
      ]);
      setMostDiscussed(discussed);
      setNewestBooks(newest);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSelectBook = (bookId) => {
    setView({ name: 'book', bookId });
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#7A7468] text-sm animate-pulse">
        جاري تحميل الكتب...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section: Full-bleed, grand editorial layout with generous height */}
      <section className="w-full border-b border-[#E2D2BC]/60 bg-[#FDF8F0] py-14 sm:py-18 md:py-20 lg:py-24 xl:py-28 min-h-[calc(78vh-4rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Right Column (RTL): Eyebrow, Large Headline, Paragraph, 52px Buttons */}
            <div className="lg:col-span-7 flex flex-col justify-center text-right space-y-6">
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#677E61] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#73976A]" aria-hidden="true"></span>
                <span>منصة القرّاء العرب</span>
              </div>

              {/* Large Headline (two balanced lines: line 1 "مساحتك الهادئة لحديث الكتب", line 2 "ومشاركة الأثر") */}
              <h1 className="text-[clamp(32px,4vw,56px)] font-bold font-display text-[#2B2B26] leading-[1.4] sm:leading-[1.45] tracking-tight">
                <span className="block sm:whitespace-nowrap">مساحتك الهادئة لحديث الكتب</span>
                <span className="block text-[#2B2B26]/90 mt-1">ومشاركة الأثر</span>
              </h1>

              {/* Paragraph constrained to ~52 characters per line */}
              <p className="text-base sm:text-lg md:text-xl text-[#5A554A] leading-relaxed max-w-[52ch]">
                انضم إلى مجتمع قارئ يشاركك حب الحرف والكلمة، ووثّق رحلتك بين صفحات الكتب. استكشف مراجعات ثرية، دوّن اقتباساتك المفضلة، وشارك في جلسات نقاش تثري عقلك.
              </p>

              {/* Action Buttons: Exactly 52px tall with rich press/hover states */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (currentUser) {
                      setView({ name: 'my-library' });
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className="h-[52px] px-9 bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] font-semibold text-base rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#BD4444] inline-flex items-center justify-center"
                >
                  {currentUser ? 'مكتبتي الشخصية' : 'أنشئ حسابك'}
                </button>

                <button
                  onClick={() => setView({ name: 'library' })}
                  className="h-[52px] px-8 border border-[#DFCEB7] hover:border-[#677E61] hover:bg-[#F1DEC4]/40 active:bg-[#EAD7BD] text-[#2B2B26] font-medium text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#677E61] inline-flex items-center justify-center"
                >
                  تصفّح المكتبة
                </button>
              </div>
            </div>

            {/* Left Column: Inline SVG Bookshelf Illustration with Ambient Float */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <BookshelfIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Two Carousels in Centered Max-Width Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        <BookCarousel
          title="الأكثر نقاشًا"
          books={mostDiscussed}
          onSelectBook={handleSelectBook}
        />

        <BookCarousel
          title="أضيفت حديثًا"
          books={newestBooks}
          onSelectBook={handleSelectBook}
        />
      </div>
    </div>
  );
}

