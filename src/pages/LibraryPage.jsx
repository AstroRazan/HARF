import React, { useState, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { getBooks, getMyLibrary, addToLibrary } from '../data/store';
import { INITIAL_CATEGORIES } from '../data/mockData';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import { toArabicDigits } from '../utils/formatters';

const CATEGORIES = ['الكل', ...INITIAL_CATEGORIES, 'إنجليزي'];

export default function LibraryPage({ setView, showToast }) {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [libraryBookIds, setLibraryBookIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [allBooks, myLib] = await Promise.all([
      getBooks({ category: selectedCategory, search: searchQuery }),
      getMyLibrary()
    ]);
    setBooks(allBooks);
    setLibraryBookIds(new Set(myLib.map((entry) => entry.bookId)));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchQuery]);

  const handleAddBook = async (e, bookId) => {
    e.stopPropagation();
    await addToLibrary(bookId, 'want');
    showToast('تمت الإضافة لمكتبتك');
    setLibraryBookIds((prev) => new Set([...prev, bookId]));
  };

  const handleCardClick = (bookId) => {
    setView({ name: 'book', bookId });
  };

  return (
    <div className="space-y-6">
      {/* 1. Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن كتاب، مؤلف، أو موضوع..."
          className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl py-3 pr-10 pl-4 text-sm text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61] transition-all shadow-2xs"
          aria-label="البحث في المكتبة"
        />
        <Search className="w-4 h-4 text-[#7A7468] absolute right-3.5 top-3.5" />
      </div>

      {/* 2. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                isActive
                  ? 'bg-[#BD4444] text-[#FDF8F0] border-[#BD4444] shadow-2xs'
                  : 'bg-[#FDF8F0] text-[#7A7468] border-[#E2D2BC] hover:text-[#2B2B26] hover:border-[#7A7468]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. Responsive Book Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#7A7468] text-sm animate-pulse">
          جاري تحميل الكتب...
        </div>
      ) : books.length === 0 ? (
        <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-10 text-center space-y-3">
          <p className="text-sm text-[#7A7468]">لم يتم العثور على أي كتب تطابق بحثك.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('الكل');
            }}
            className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0]"
          >
            عرض جميع الكتب
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {books.map((book) => {
            const inLibrary = libraryBookIds.has(book.id);

            return (
              <div
                key={book.id}
                onClick={() => handleCardClick(book.id)}
                className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-3 flex flex-col justify-between cursor-pointer hover:border-[#BD4444]/50 transition-all duration-200 group"
              >
                {/* Cover */}
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

                {/* Title & Author */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-semibold text-xs sm:text-sm text-[#2B2B26] line-clamp-1 group-hover:text-[#BD4444] transition-colors"
                      dir={book.language === 'en' ? 'ltr' : 'rtl'}
                      style={book.language === 'en' ? { direction: 'ltr' } : {}}
                      title={book.title}
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

                  {/* Rating & Add Button */}
                  <div className="mt-3 pt-2 border-t border-[#E2D2BC]/60 flex items-center justify-between gap-2">
                    <StarRating rating={book.averageRating} size="sm" />

                    <button
                      onClick={(e) => handleAddBook(e, book.id)}
                      disabled={inLibrary}
                      className={`text-xs font-medium py-1 px-2.5 rounded-lg border flex items-center gap-1 transition-all ${
                        inLibrary
                          ? 'bg-[#73976A]/10 text-[#677E61] border-[#73976A]/30'
                          : 'bg-[#FDF8F0] text-[#2B2B26] border-[#E2D2BC] hover:bg-[#677E61] hover:text-[#FDF8F0] hover:border-[#677E61]'
                      }`}
                      aria-label={inLibrary ? 'مضاف في مكتبتك' : `إضافة كتاب ${book.title}`}
                    >
                      {inLibrary ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>مضاف</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>أضف</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
