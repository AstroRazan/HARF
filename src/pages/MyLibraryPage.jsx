import React, { useState, useEffect } from 'react';
import { CheckCircle2, Play, BookOpen, Flame, ArrowLeft, LogIn } from 'lucide-react';
import { getMyLibrary, addToLibrary, updateProgress, getUserStats } from '../data/store';
import BookCover from '../components/BookCover';
import { toArabicDigits, formatDateArabic } from '../utils/formatters';

export default function MyLibraryPage({ setView, showToast, currentUser, onOpenAuth }) {
  const [libraryEntries, setLibraryEntries] = useState([]);
  const [userStats, setUserStats] = useState({ finishedCount: 0, streakDays: 0, streakWeek: [false, false, false, false, false, false, false] });
  const [loading, setLoading] = useState(true);
  const [pageInputs, setPageInputs] = useState({});

  const loadLibrary = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [data, stats] = await Promise.all([
      getMyLibrary(currentUser.id),
      getUserStats(currentUser.id)
    ]);
    setLibraryEntries(data);
    setUserStats(stats);

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
  }, [currentUser]);

  const dayNames = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];

  const handleStartReading = async (bookId) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    await addToLibrary(bookId, 'reading', currentUser);
    showToast('تم البدء في قراءة الكتاب');
    loadLibrary();
  };

  const handlePageInputChange = (bookId, val) => {
    setPageInputs((prev) => ({
      ...prev,
      [bookId]: val
    }));
  };

  const handleSaveProgress = async (bookId, totalPages) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const pageNum = Number(pageInputs[bookId]) || 0;
    const finalPage = Math.min(Math.max(0, pageNum), totalPages);
    await updateProgress(bookId, finalPage, currentUser);
    if (finalPage >= totalPages) {
      showToast('تهانينا! أتممت قراءة الكتاب');
    } else {
      showToast('تم تحديث التقدم');
    }
    loadLibrary();
  };

  // Signed out empty state
  if (!currentUser) {
    return (
      <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-12 text-center max-w-lg mx-auto space-y-4 my-8 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#F1DEC4] flex items-center justify-center mx-auto text-[#73976A]">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-serif text-[#2B2B26]">
          مكتبتك الشخصية
        </h2>
        <p className="text-sm text-[#7A7468] leading-relaxed">
          سجّل دخولك للوصول إلى مكتبتك الخاصة، ومتابعة تقدم قراءاتك، وبناء سلسلة القراءة اليومية.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-6 rounded-xl bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0] transition-colors shadow-2xs"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول / حساب جديد</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Top Figures Section (Exactly Two Figures Only) */}
      <section className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#E2D2BC]">
          {/* Figure 1: Books Finished */}
          <div className="text-center pb-4 sm:pb-0">
            <span className="text-xs font-medium text-[#7A7468] block mb-1">
              الكتب المكتملة
            </span>
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#73976A]">
              {toArabicDigits(userStats.finishedCount)}
            </div>
            <span className="text-[11px] text-[#7A7468] mt-1 block">
              كتاب تم إنهاؤه
            </span>
          </div>

          {/* Figure 2: Reading Streak & 7-Day Dots */}
          <div className="text-center pt-4 sm:pt-0 sm:pr-6">
            <span className="text-xs font-medium text-[#7A7468] block mb-1">
              سلسلة القراءة
            </span>
            <div className="flex items-center justify-center gap-1.5 text-3xl sm:text-4xl font-bold font-serif text-[#BD4444]">
              <span>{toArabicDigits(userStats.streakDays)}</span>
              <span className="text-sm font-sans font-medium text-[#7A7468]">يومًا</span>
            </div>

            {/* 7-day dot row */}
            <div className="flex items-center justify-center gap-2 mt-2" dir="rtl">
              {userStats.streakWeek.map((active, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      active
                        ? 'bg-[#BD4444] shadow-xs ring-2 ring-[#BD4444]/20'
                        : 'bg-[#F1DEC4]'
                    }`}
                    title={active ? 'يوم نشط' : 'لم تقرأ'}
                  />
                  <span className="text-[9px] text-[#7A7468]">{dayNames[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. User's Books Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#7A7468] text-sm animate-pulse">
          جاري تحميل مكتبتك...
        </div>
      ) : libraryEntries.length === 0 ? (
        <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-10 text-center space-y-3">
          <p className="text-sm text-[#7A7468]">لم تضف أي كتاب إلى مكتبتك بعد.</p>
          <button
            onClick={() => setView({ name: 'library' })}
            className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0]"
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
            const progressPercent = Math.min(100, Math.round((currentPage / totalPages) * 100));

            return (
              <div
                key={entry.bookId}
                className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-4 flex flex-col justify-between space-y-4 hover:border-[#BD4444]/40 transition-colors"
              >
                {/* Book Header info */}
                <div className="flex gap-3">
                  {/* Small Cover */}
                  <div
                    className="shrink-0 cursor-pointer"
                    onClick={() => setView({ name: 'book', bookId: book.id })}
                  >
                    <BookCover
                      title={book.title}
                      author={book.author}
                      category={book.category}
                      coverUrl={book.coverUrl}
                      language={book.language}
                      size="sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-sm text-[#2B2B26] line-clamp-1 cursor-pointer hover:text-[#BD4444]"
                      onClick={() => setView({ name: 'book', bookId: book.id })}
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
                    <span className="inline-block mt-2 text-[10px] bg-[#F1DEC4] text-[#2B2B26] px-2 py-0.5 rounded-full">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Progress States */}
                <div className="pt-2 border-t border-[#E2D2BC]/60">
                  {/* STATE 1: Want to read */}
                  {entry.status === 'want' && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#7A7468]">في قائمة القراءة</span>
                      <button
                        onClick={() => handleStartReading(entry.bookId)}
                        className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-[#677E61] hover:bg-[#52664d] text-[#FDF8F0] flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>بدء القراءة</span>
                      </button>
                    </div>
                  )}

                  {/* STATE 2: Currently Reading */}
                  {entry.status === 'reading' && (
                    <div className="space-y-3">
                      {/* Bar & % */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-[#7A7468]">
                          <span>التقدم</span>
                          <span className="font-semibold text-[#2B2B26]">
                            {toArabicDigits(progressPercent)}٪
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#F1DEC4] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#BD4444] rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Inline Page Update Form */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-[#7A7468]">الصفحة:</span>
                        <input
                          type="number"
                          min="0"
                          max={totalPages}
                          value={pageInputs[entry.bookId] ?? currentPage}
                          onChange={(e) =>
                            handlePageInputChange(entry.bookId, e.target.value)
                          }
                          className="w-16 bg-[#FDF8F0] border border-[#E2D2BC] rounded-lg px-2 py-1 text-xs text-center text-[#2B2B26] focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                        />
                        <span className="text-xs text-[#7A7468]">
                          من {toArabicDigits(totalPages)}
                        </span>
                        <button
                          onClick={() => handleSaveProgress(entry.bookId, totalPages)}
                          className="mr-auto text-xs font-medium py-1 px-3 rounded-lg bg-[#FDF8F0] border border-[#E2D2BC] hover:bg-[#F1DEC4] text-[#2B2B26] transition-colors"
                        >
                          حفظ
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STATE 3: Finished */}
                  {entry.status === 'finished' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-[#677E61] font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>تمت قراءته</span>
                        </div>
                        {entry.finishedAt && (
                          <span className="text-[#7A7468]">
                            أُنجز في {formatDateArabic(entry.finishedAt)}
                          </span>
                        )}
                      </div>

                      {/* Completed 100% full green progress line */}
                      <div className="w-full h-1.5 bg-[#73976A]/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#73976A] w-full rounded-full" />
                      </div>
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
