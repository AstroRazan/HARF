import React, { useState, useEffect } from 'react';
import { CheckCircle2, Play, BookOpen, Flame, ArrowLeft } from 'lucide-react';
import { getMyLibrary, addToLibrary, updateProgress } from '../data/store';
import BookCover from '../components/BookCover';
import { toArabicDigits, formatDateArabic } from '../utils/formatters';

export default function MyLibraryPage({ setView, showToast }) {
  const [libraryEntries, setLibraryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInputs, setPageInputs] = useState({});

  const loadLibrary = async () => {
    setLoading(true);
    const data = await getMyLibrary();
    setLibraryEntries(data);

    // Initialize inputs
    const inputs = {};
    data.forEach((entry) => {
      inputs[entry.bookId] = entry.currentPage || 0;
    });
    setPageInputs(inputs);
    setLoading(false);
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  // Compute stats
  const finishedCount = libraryEntries.filter((e) => e.status === 'finished').length;
  const streakDays = 14; // Mock 14-day streak

  // 7-day active streak dots (e.g., last 7 days: 6 active, today active)
  const streakWeek = [true, true, true, false, true, true, true];
  const dayNames = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];

  const handleStartReading = async (bookId) => {
    await addToLibrary(bookId, 'reading');
    showToast('بيانات تجريبية — بدأت قراءة الكتاب');
    loadLibrary();
  };

  const handlePageInputChange = (bookId, val) => {
    setPageInputs((prev) => ({
      ...prev,
      [bookId]: val
    }));
  };

  const handleSaveProgress = async (bookId, totalPages) => {
    const pageNum = Number(pageInputs[bookId]) || 0;
    const finalPage = Math.min(Math.max(0, pageNum), totalPages);
    await updateProgress(bookId, finalPage);
    if (finalPage >= totalPages) {
      showToast('بيانات تجريبية — تهانينا! أتممت قراءة الكتاب');
    } else {
      showToast('بيانات تجريبية — تم تحديث التقدم');
    }
    loadLibrary();
  };

  return (
    <div className="space-y-8">
      {/* 1. Top Figures Section (Exactly Two Figures Only) */}
      <section className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#E5DFD5]">
          {/* Figure 1: Books Finished */}
          <div className="text-center pb-4 sm:pb-0">
            <span className="text-xs font-medium text-[#8A8681] block mb-1">
              الكتب المكتملة
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#6B7F5C]">
              {toArabicDigits(finishedCount)}
            </div>
            <span className="text-[11px] text-[#8A8681] mt-1 block">
              كتاب تم إنهاؤه
            </span>
          </div>

          {/* Figure 2: Reading Streak & 7-Day Dots */}
          <div className="text-center pt-4 sm:pt-0 sm:pr-6">
            <span className="text-xs font-medium text-[#8A8681] block mb-1">
              سلسلة القراءة
            </span>
            <div className="flex items-center justify-center gap-1.5 text-3xl sm:text-4xl font-bold font-serif text-[#C0703A]">
              <span>{toArabicDigits(streakDays)}</span>
              <span className="text-sm font-sans font-medium text-[#8A8681]">يومًا</span>
            </div>

            {/* 7-day dot row */}
            <div className="flex items-center justify-center gap-2 mt-2" dir="rtl">
              {streakWeek.map((active, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      active
                        ? 'bg-[#C0703A] shadow-xs ring-2 ring-[#C0703A]/20'
                        : 'bg-[#E8E2D7]'
                    }`}
                    title={active ? 'يوم نشط' : 'لم تقرأ'}
                  />
                  <span className="text-[9px] text-[#8A8681]">{dayNames[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. User's Books Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#8A8681] text-sm animate-pulse">
          جاري تحميل مكتبتك...
        </div>
      ) : libraryEntries.length === 0 ? (
        <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-10 text-center space-y-3">
          <p className="text-sm text-[#8A8681]">لم تضف أي كتاب إلى مكتبتك بعد.</p>
          <button
            onClick={() => setView({ name: 'library' })}
            className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#6B7F5C] text-[#FAF7F2]"
          >
            تصفح الكتب
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {libraryEntries.map((entry) => {
            const book = entry.book;
            if (!book) return null;

            const totalPages = book.pages || 100;
            const currentPage = entry.currentPage || 0;
            const progressPercent = Math.min(
              100,
              Math.round((currentPage / totalPages) * 100)
            );

            return (
              <div
                key={entry.bookId}
                className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-4 flex flex-col justify-between space-y-4 hover:border-[#8A8681]/40 transition-colors"
              >
                <div className="flex gap-3.5 items-start">
                  {/* Small Cover */}
                  <div
                    className="shrink-0 cursor-pointer"
                    onClick={() => setView({ name: 'book', bookId: book.id })}
                  >
                    <BookCover
                      title={book.title}
                      author={book.author}
                      category={book.category}
                      size="sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-sm text-[#2C2C2A] line-clamp-1 cursor-pointer hover:text-[#C0703A]"
                      onClick={() => setView({ name: 'book', bookId: book.id })}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#8A8681] line-clamp-1 mt-0.5">
                      {book.author}
                    </p>
                    <span className="inline-block mt-2 text-[10px] bg-[#E8E2D7] text-[#2C2C2A] px-2 py-0.5 rounded-full">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Progress States */}
                <div className="pt-2 border-t border-[#E5DFD5]/60">
                  {/* STATE 1: Want to read */}
                  {entry.status === 'want' && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8A8681]">في قائمة الرغبات</span>
                      <button
                        onClick={() => handleStartReading(book.id)}
                        className="bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>ابدأ القراءة</span>
                      </button>
                    </div>
                  )}

                  {/* STATE 2: Reading with progress bar and page input */}
                  {entry.status === 'reading' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8A8681]">
                          {toArabicDigits(currentPage)} من {toArabicDigits(totalPages)} صفحة
                        </span>
                        <span className="font-semibold text-[#C0703A]">
                          {toArabicDigits(progressPercent)}٪
                        </span>
                      </div>

                      {/* Thin Progress Bar: clay fill on sand track */}
                      <div className="w-full h-1.5 bg-[#E8E2D7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C0703A] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      {/* Quick page updater */}
                      <div className="flex items-center gap-2 pt-1">
                        <label className="text-[11px] text-[#8A8681] shrink-0">
                          الصفحة الحالية:
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={totalPages}
                          value={pageInputs[book.id] ?? currentPage}
                          onChange={(e) => handlePageInputChange(book.id, e.target.value)}
                          className="w-20 bg-[#FAF7F2] border border-[#E5DFD5] rounded-lg px-2 py-1 text-xs text-center font-medium text-[#2C2C2A] focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
                        />
                        <button
                          onClick={() => handleSaveProgress(book.id, totalPages)}
                          className="text-xs font-medium bg-[#E8E2D7] hover:bg-[#D5CDC1] text-[#2C2C2A] px-2.5 py-1 rounded-lg transition-colors"
                        >
                          تحديث
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STATE 3: Finished */}
                  {entry.status === 'finished' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7F5C] font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>مكتمل</span>
                      </div>
                      <span className="text-[11px] text-[#8A8681]">
                        {entry.finishedAt
                          ? `أُنهي في ${formatDateArabic(entry.finishedAt)}`
                          : 'تم الانتهاء'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
