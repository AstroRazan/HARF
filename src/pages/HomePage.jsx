import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, BookOpen, Bookmark, CheckCircle2, MessageSquare } from 'lucide-react';
import { getBooks, getUserStats } from '../data/store';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import { toArabicDigits } from '../utils/formatters';

// Subtle tilt angles applied individually to each card (-5 to +5 degrees)
const TILT_ANGLES = [-4, 3, -5, 4, -2, 5, -3, 2, -4, 5, -2, 4, -5, 3];

function HeroBookStrip({ books, onSelectBook }) {
  // Take a selection of 14 diverse books and triplicate back-to-back
  const displayBooks = books.slice(0, 14);
  const marqueeBooks = [...displayBooks, ...displayBooks, ...displayBooks];

  return (
    <div className="marquee-container py-4 select-none" dir="ltr">
      {/* Symmetrical Edge Fades on Left and Right */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#FDF8F0] via-[#FDF8F0]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#FDF8F0] via-[#FDF8F0]/80 to-transparent z-20" />

      {/* Pure Marquee Row with -33.333% infinite seamless loop */}
      <div className="marquee-row py-4">
        {marqueeBooks.map((book, idx) => {
          const angle = TILT_ANGLES[idx % TILT_ANGLES.length];
          return (
            <div
              key={`${book.id}-${idx}`}
              onClick={() => onSelectBook(book.id)}
              style={{
                transform: `rotate(${angle}deg)`
              }}
              className="marquee-card"
              title={`${book.title} — ${book.author}`}
            >
              <BookCover
                title={book.title}
                author={book.author}
                category={book.category}
                coverUrl={book.coverUrl}
                language={book.language}
                size="md"
                className="w-full h-full rounded-none border-none shadow-none object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UserStatsSection({ stats, currentUser }) {
  if (!stats) return null;

  // Seven days of the week (Arabic labels)
  const weekDays = [
    { label: 'س', full: 'السبت' },
    { label: 'ح', full: 'الأحد' },
    { label: 'ن', full: 'الإثنين' },
    { label: 'ث', full: 'الثلاثاء' },
    { label: 'ر', full: 'الأربعاء' },
    { label: 'خ', full: 'الخميس' },
    { label: 'ج', full: 'الجمعة' }
  ];

  return (
    <section className="bg-[#FAF5ED] border border-[#E2D2BC] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Section Heading with No Horizontal Divider Line */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#677E61]/15 text-[#677E61] flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-[24px] font-bold font-serif text-[#2B2B26] leading-tight">
            نشاطك القرائي
          </h2>
          <p className="text-[15px] text-[#7A7468] mt-0.5">
            مرحباً {currentUser.name}، إليك ملخص إنجازك القرائي
          </p>
        </div>
      </div>

      {/* Row of Stat Cards with Deep Saturated Palette & Streak Card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Card 1: كتب أنهيتها (Deep Green #3D4A38) */}
        <div className="bg-[#3D4A38] border border-[#2D3829] rounded-2xl p-6 sm:p-7 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#FAF7F2]">كتب أنهيتها</span>
            <CheckCircle2 className="w-5 h-5 text-[#FAF7F2]/60" />
          </div>
          <span className="text-[40px] font-bold font-serif text-[#FAF7F2] leading-none mt-4">
            {toArabicDigits(stats.finishedCount)}
          </span>
        </div>

        {/* Card 2: كتب أقرأها الآن (Olive #677E61) */}
        <div className="bg-[#677E61] border border-[#546850] rounded-2xl p-6 sm:p-7 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#FAF7F2]">كتب أقرأها الآن</span>
            <BookOpen className="w-5 h-5 text-[#FAF7F2]/60" />
          </div>
          <span className="text-[40px] font-bold font-serif text-[#FAF7F2] leading-none mt-4">
            {toArabicDigits(stats.readingCount)}
          </span>
        </div>

        {/* Card 3: صفحات مقروءة (Accent Red #BD4444) */}
        <div className="bg-[#BD4444] border border-[#A33535] rounded-2xl p-6 sm:p-7 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#FAF7F2]">صفحات مقروءة</span>
            <Bookmark className="w-5 h-5 text-[#FAF7F2]/60" />
          </div>
          <span className="text-[40px] font-bold font-serif text-[#FAF7F2] leading-none mt-4">
            {toArabicDigits(stats.pagesRead)}
          </span>
        </div>

        {/* Card 4: مراجعات كتبتها (Dark Warm Brown #3E3127) */}
        <div className="bg-[#3E3127] border border-[#2F241C] rounded-2xl p-6 sm:p-7 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#FAF7F2]">مراجعات كتبتها</span>
            <MessageSquare className="w-5 h-5 text-[#FAF7F2]/60" />
          </div>
          <span className="text-[40px] font-bold font-serif text-[#FAF7F2] leading-none mt-4">
            {toArabicDigits(stats.reviewsCount)}
          </span>
        </div>

        {/* Card 5: Streak Card (Deep Forest #2D392A) */}
        <div className="col-span-2 sm:col-span-1 bg-[#2D392A] border border-[#20291E] rounded-2xl p-6 sm:p-7 min-h-[175px] sm:min-h-[190px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#FAF7F2]">حماسة القراءة</span>
            <Flame className="w-5 h-5 text-[#F28D69]" />
          </div>

          <div className="mt-2 space-y-3">
            <span className="text-[28px] sm:text-[30px] font-bold font-serif text-[#FAF7F2] block leading-tight">
              {toArabicDigits(stats.streakDays)} {stats.streakDays === 1 ? 'يوم' : 'أيام'} متواصلة
            </span>

            {/* Row of 7 dots showing last 7 days with active dots in bright accent and inactive in low-opacity ivory */}
            <div className="flex items-center justify-between pt-1 gap-1" dir="ltr">
              {weekDays.map((day, idx) => {
                const isActive = stats.streakWeek ? stats.streakWeek[idx] : true;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span
                      className={`w-3.5 h-3.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-[#F28D69] shadow-xs ring-2 ring-[#F28D69]/40'
                          : 'bg-[#FAF7F2]/25'
                      }`}
                      title={`${day.full}: ${isActive ? 'نشط' : 'غير نشط'}`}
                    />
                    <span className="text-[10px] text-[#FAF7F2]/75 font-medium">{day.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCarousel({ title, books, onSelectBook }) {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const distance = 300;
    const delta = direction === 'left' ? -distance : distance;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

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
            className="w-[165px] sm:w-[185px] shrink-0 bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-3 flex flex-col justify-between snap-start hover:border-[#BD4444]/40 transition-all duration-200"
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
                  className="font-semibold text-xs sm:text-sm text-[#2B2B26] line-clamp-1 leading-snug cursor-pointer hover:text-[#BD4444] transition-colors"
                  onClick={() => onSelectBook(book.id)}
                  title={book.title}
                  dir={book.language === 'en' ? 'ltr' : 'rtl'}
                  style={book.language === 'en' ? { direction: 'ltr' } : {}}
                >
                  {book.title}
                </h3>
                <p
                  className="text-[11px] text-[#7A7468] line-clamp-1 mt-0.5"
                  dir={book.language === 'en' ? 'ltr' : 'rtl'}
                >
                  {book.author}
                </p>
              </div>

              {/* Rating & Action Button */}
              <div className="mt-3 pt-2 border-t border-[#E2D2BC]/60 flex flex-col gap-2">
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

export default function HomePage({ setView, onOpenAuth, currentUser }) {
  const [allBooks, setAllBooks] = useState([]);
  const [mostDiscussed, setMostDiscussed] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [all, discussed, newest] = await Promise.all([
        getBooks(),
        getBooks({ sort: 'most-discussed' }),
        getBooks({ sort: 'newest' })
      ]);
      setAllBooks(all);
      setMostDiscussed(discussed);
      setNewestBooks(newest);

      if (currentUser && currentUser.id) {
        const stats = await getUserStats(currentUser.id);
        setUserStats(stats);
      } else {
        setUserStats(null);
      }

      setLoading(false);
    }
    loadData();
  }, [currentUser]);

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
      {/* Restructured Hero: Cover Strip FIRST, then 22px bold tagline & primary CTA button */}
      <section className="w-full bg-[#FDF8F0] pt-6 sm:pt-8 pb-10 sm:pb-12 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* 1. Cover Strip FIRST (Triplicated 3x, 200px x 300px, individual card tilts) */}
        <HeroBookStrip books={allBooks} onSelectBook={handleSelectBook} />

        {/* 2. Below the strip: Tagline (22px with weight) & Primary CTA Button */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4 pt-3">
          {/* 22px Bold Tagline */}
          <p className="text-[22px] sm:text-[23px] font-serif font-bold text-[#2B2B26] tracking-tight leading-relaxed">
            مساحتك الهادئة لتوثيق رحلتك القرائية ومشاركة أثرها
          </p>

          {/* Centered CTA Buttons */}
          <div className="pt-1 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {currentUser ? (
              <button
                onClick={() => setView({ name: 'my-library' })}
                className="h-[50px] sm:h-[52px] px-10 bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] font-semibold text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#BD4444] inline-flex items-center justify-center"
              >
                مكتبتي
              </button>
            ) : (
              <>
                {/* 1. أنشئ حسابك — filled in accent red #BD4444 */}
                <button
                  onClick={onOpenAuth}
                  className="h-[50px] sm:h-[52px] px-8 sm:px-9 bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] font-semibold text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#BD4444] inline-flex items-center justify-center"
                >
                  أنشئ حسابك
                </button>

                {/* 2. تسجيل الدخول — filled in lighter tint #D97070 with ivory text */}
                <button
                  onClick={onOpenAuth}
                  className="h-[50px] sm:h-[52px] px-8 sm:px-9 bg-[#D97070] hover:bg-[#CC5E5E] active:bg-[#BF5252] text-[#FDF8F0] font-semibold text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D97070] inline-flex items-center justify-center"
                >
                  تسجيل الدخول
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12 w-full">
        {/* 1. Signed-In User Stats Row (Between Hero and Most Discussed) */}
        {currentUser && userStats && (
          <UserStatsSection stats={userStats} currentUser={currentUser} />
        )}

        {/* 2. Most Discussed Books Carousel */}
        <BookCarousel
          title="الأكثر نقاشًا"
          books={mostDiscussed}
          onSelectBook={handleSelectBook}
        />

        {/* 3. Newest Books Carousel */}
        <BookCarousel
          title="أضيفت حديثًا"
          books={newestBooks}
          onSelectBook={handleSelectBook}
        />
      </div>
    </div>
  );
}
