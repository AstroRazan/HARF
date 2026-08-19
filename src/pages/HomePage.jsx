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
    // In RTL, scrollLeft can be negative or 0 to max negative depending on browser
    // Using absolute values or cross-browser check:
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
    // in RTL, scrolling to the left moves further along the list
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
        <h2 className="text-lg sm:text-xl font-bold text-[#2C2C2A] font-serif">
          {title}
        </h2>
        <div className="flex items-center gap-1.5" dir="ltr">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD5] hover:bg-[#E8E2D7] text-[#2C2C2A] flex items-center justify-center transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
            aria-label="التمرير لليسار"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD5] hover:bg-[#E8E2D7] text-[#2C2C2A] flex items-center justify-center transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
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
            className="w-[175px] sm:w-[200px] shrink-0 bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-3 flex flex-col justify-between snap-start hover:border-[#C0703A]/40 transition-all duration-200"
          >
            {/* Book Cover */}
            <div className="mb-2.5">
              <BookCover
                title={book.title}
                author={book.author}
                category={book.category}
                size="md"
              />
            </div>

            {/* Book Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="font-semibold text-sm text-[#2C2C2A] line-clamp-1 leading-snug cursor-pointer hover:text-[#C0703A] transition-colors"
                  onClick={() => onSelectBook(book.id)}
                  title={book.title}
                >
                  {book.title}
                </h3>
                <p className="text-xs text-[#8A8681] line-clamp-1 mt-0.5">
                  {book.author}
                </p>
              </div>

              {/* Rating & Action Button */}
              <div className="mt-3 pt-2 border-t border-[#E5DFD5]/60 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <StarRating rating={book.averageRating} size="sm" />
                  <span className="text-[11px] text-[#8A8681]">
                    ({toArabicDigits(book.reviewsCount)})
                  </span>
                </div>

                <button
                  onClick={() => onSelectBook(book.id)}
                  className="w-full text-center text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-[#E5DFD5] text-[#2C2C2A] hover:bg-[#6B7F5C] hover:text-[#FAF7F2] hover:border-[#6B7F5C] transition-colors focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
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

export default function HomePage({ setView }) {
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
      <div className="p-8 text-center text-[#8A8681] text-sm animate-pulse">
        جاري تحميل الكتب...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro Sentence (Strictly 1 sentence, no paragraphs) */}
      <div className="pt-2 pb-1 border-b border-[#E5DFD5]/60">
        <p className="text-sm sm:text-base text-[#2C2C2A] font-medium leading-relaxed">
          مجتمع عربي لمشاركة شغف القراءة، مناقشة الكتب، وتتبع رحلتك القرائية.
        </p>
      </div>

      {/* Two Carousels Only */}
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
  );
}
