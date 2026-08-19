import React, { useState, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { getBooks, getMyLibrary, addToLibrary } from '../data/store';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import { toArabicDigits } from '../utils/formatters';

const CATEGORIES = ['الكل', 'تاريخ', 'روايات', 'علمي', 'فلسفة', 'سيرة'];

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
    setLibraryBookIds((prev) => new Set([...prev, bookId]));
    showToast('بيانات تجريبية — تمت الإضافة لمكتبتك');
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
          className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl py-3 pr-10 pl-4 text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C] transition-all shadow-2xs"
          aria-label="البحث في المكتبة"
        />
        <Search className="w-4 h-4 text-[#8A8681] absolute right-3.5 top-3.5" />
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
                  ? 'bg-[#C0703A] text-[#FAF7F2] border-[#C0703A] shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#8A8681] border-[#E5DFD5] hover:text-[#2C2C2A] hover:border-[#8A8681]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. Responsive Book Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#8A8681] text-sm animate-pulse">
          جاري تحميل الكتب...
        </div>
      ) : books.length === 0 ? (
        <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-10 text-center space-y-3">
          <p className="text-sm text-[#8A8681]">لم يتم العثور على أي كتب تطابق بحثك.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('الكل');
            }}
            className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#6B7F5C] text-[#FAF7F2]"
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
                className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-3 flex flex-col justify-between cursor-pointer hover:border-[#C0703A]/50 transition-all duration-200 group"
              >
                {/* Cover */}
                <div className="mb-2.5">
                  <BookCover
                    title={book.title}
                    author={book.author}
                    category={book.category}
                    size="md"
                  />
                </div>

                {/* Title & Author */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-[#2C2C2A] line-clamp-1 group-hover:text-[#C0703A] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[11px] text-[#8A8681] line-clamp-1 mt-0.5">
                      {book.author}
                    </p>
                  </div>

                  {/* Rating & Add Button */}
                  <div className="mt-3 pt-2 border-t border-[#E5DFD5]/60 flex items-center justify-between gap-2">
                    <StarRating rating={book.averageRating} size="sm" />

                    <button
                      onClick={(e) => handleAddBook(e, book.id)}
                      disabled={inLibrary}
                      className={`text-xs font-medium py-1 px-2.5 rounded-lg border flex items-center gap-1 transition-all ${
                        inLibrary
                          ? 'bg-[#6B7F5C]/10 text-[#6B7F5C] border-[#6B7F5C]/30'
                          : 'bg-[#FAF7F2] text-[#2C2C2A] border-[#E5DFD5] hover:bg-[#6B7F5C] hover:text-[#FAF7F2] hover:border-[#6B7F5C]'
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
