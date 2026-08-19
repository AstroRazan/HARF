import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Plus,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import {
  getBook,
  addToLibrary,
  addReview,
  toggleLike,
  addComment
} from '../data/store';
import BookCover from '../components/BookCover';
import StarRating from '../components/StarRating';
import {
  toArabicDigits,
  formatDateArabic,
  calculateRatingDistribution
} from '../utils/formatters';

export default function BookDetailPage({ bookId, setView, showToast }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Open/collapsed comments map by review id
  const [openComments, setOpenComments] = useState({});
  // Comment reply text inputs map by review id
  const [commentInputs, setCommentInputs] = useState({});

  const loadBook = async () => {
    if (!bookId) return;
    setLoading(true);
    const data = await getBook(bookId);
    setBook(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-[#8A8681] text-sm animate-pulse">
        جاري تحميل تفاصيل الكتاب...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-[#8A8681] text-sm">الكتاب غير موجود.</p>
        <button
          onClick={() => setView({ name: 'library' })}
          className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#6B7F5C] text-[#FAF7F2]"
        >
          العودة للمكتبة
        </button>
      </div>
    );
  }

  const distribution = calculateRatingDistribution(book.reviews || []);

  const handleAddToLibrary = async () => {
    await addToLibrary(book.id, 'want');
    showToast('بيانات تجريبية — تمت الإضافة لمكتبتك');
    loadBook();
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setSubmittingReview(true);
    await addReview(book.id, newRating, newReviewText);
    setSubmittingReview(false);
    setIsReviewModalOpen(false);
    setNewReviewText('');
    setNewRating(5);
    showToast('بيانات تجريبية — تم نشر رأيك');
    loadBook();
  };

  const handleToggleLike = async (reviewId) => {
    await toggleLike(reviewId);
    showToast('بيانات تجريبية — تم التفاعل');
    loadBook();
  };

  const handleToggleComments = (reviewId) => {
    setOpenComments((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const handleCommentChange = (reviewId, text) => {
    setCommentInputs((prev) => ({
      ...prev,
      [reviewId]: text
    }));
  };

  const handleAddComment = async (reviewId) => {
    const text = (commentInputs[reviewId] || '').trim();
    if (!text) return;
    await addComment(reviewId, text);
    setCommentInputs((prev) => ({ ...prev, [reviewId]: '' }));
    showToast('بيانات تجريبية — تم إضافة الرد');
    loadBook();
  };

  return (
    <div className="space-y-8">
      {/* Top Back Nav */}
      <div>
        <button
          onClick={() => setView({ name: 'library' })}
          className="inline-flex items-center gap-1.5 text-xs text-[#8A8681] hover:text-[#2C2C2A] transition-colors focus-visible:ring-1 focus-visible:ring-[#6B7F5C] rounded-md px-1 py-0.5"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>العودة إلى المكتبة</span>
        </button>
      </div>

      {/* 1. Header Section: Cover, Info, Actions */}
      <section className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          {/* Cover */}
          <div className="shrink-0">
            <BookCover
              title={book.title}
              author={book.author}
              category={book.category}
              size="lg"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-right space-y-4">
            <div>
              <div className="inline-block bg-[#E8E2D7] text-[#2C2C2A] text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                {book.category}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2C2C2A] leading-tight">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base text-[#8A8681] mt-1 font-medium">
                {book.author}
              </p>
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#8A8681] border-y border-[#E5DFD5]/60 py-2.5">
              <div>
                <span>عدد الصفحات: </span>
                <span className="font-semibold text-[#2C2C2A]">
                  {toArabicDigits(book.pages)} صفحة
                </span>
              </div>
              <span className="text-[#D5CDC1]">|</span>
              <div>
                <span>سنة النشر: </span>
                <span className="font-semibold text-[#2C2C2A]">
                  {toArabicDigits(book.year)} م
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-sm text-[#2C2C2A]/90 leading-relaxed">
              {book.synopsis}
            </p>

            {/* Action Buttons: 1 Primary + 1 Secondary */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              {/* Primary button */}
              <button
                onClick={handleOpenReviewModal}
                className="bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B7F5C]"
              >
                اكتب رأيك
              </button>

              {/* Secondary button */}
              <button
                onClick={handleAddToLibrary}
                disabled={Boolean(book.libraryStatus)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                  book.libraryStatus
                    ? 'border-[#6B7F5C]/40 bg-[#6B7F5C]/10 text-[#6B7F5C]'
                    : 'border-[#E5DFD5] text-[#2C2C2A] hover:bg-[#E8E2D7]'
                }`}
              >
                {book.libraryStatus ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>مضاف للمكتبة</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>أضف إلى مكتبتي</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rating & Statistics Section */}
      <section className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Average Rating Block */}
          <div className="text-center md:border-l md:border-[#E5DFD5] md:pl-6">
            <div className="text-4xl sm:text-5xl font-bold font-serif text-[#C0703A]">
              {toArabicDigits(book.averageRating || 0)}
            </div>
            <div className="flex justify-center my-2">
              <StarRating rating={book.averageRating} size="md" />
            </div>
            <p className="text-xs text-[#8A8681]">
              إجمالي {toArabicDigits(book.reviewsCount)} مراجعة
            </p>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-2 space-y-2">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-[#8A8681] text-left shrink-0">
                  {toArabicDigits(d.stars)} نجوم
                </span>
                <div className="flex-1 h-2 bg-[#E8E2D7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C0703A] rounded-full transition-all duration-500"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-[#8A8681] text-right font-medium shrink-0">
                  {toArabicDigits(d.count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Opinions / Reviews Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-[#2C2C2A] font-serif">
            الآراء والنقاشات ({toArabicDigits(book.reviews?.length || 0)})
          </h2>
          <button
            onClick={handleOpenReviewModal}
            className="text-xs font-semibold text-[#6B7F5C] hover:underline"
          >
            + إضافة رأي
          </button>
        </div>

        {(!book.reviews || book.reviews.length === 0) ? (
          <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-8 text-center space-y-3">
            <p className="text-sm text-[#8A8681]">لا توجد آراء بعد حول هذا الكتاب.</p>
            <button
              onClick={handleOpenReviewModal}
              className="text-xs font-semibold py-2 px-4 rounded-xl bg-[#6B7F5C] text-[#FAF7F2]"
            >
              كن أول من يكتب رأيه
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {book.reviews.map((rev) => {
              const isLiked = rev.likedBy?.includes('user-1');
              const likesCount = rev.likedBy?.length || 0;
              const commentsCount = rev.comments?.length || 0;
              const isOpen = Boolean(openComments[rev.id]);

              return (
                <article
                  key={rev.id}
                  className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-4 sm:p-5 space-y-3"
                >
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E8E2D7] text-[#2C2C2A] font-semibold text-xs flex items-center justify-center border border-[#D5CDC1]">
                        {rev.userName ? rev.userName.slice(0, 2) : 'قارئ'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs sm:text-sm text-[#2C2C2A]">
                          {rev.userName}
                        </h3>
                        <p className="text-[11px] text-[#8A8681]">
                          {formatDateArabic(rev.createdAt)}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={rev.rating} size="sm" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#2C2C2A] leading-relaxed">
                    {rev.text}
                  </p>

                  {/* Actions: Like & Comments toggle */}
                  <div className="flex items-center gap-4 pt-1 text-xs text-[#8A8681]">
                    <button
                      onClick={() => handleToggleLike(rev.id)}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
                        isLiked
                          ? 'text-[#C0703A] font-semibold bg-[#C0703A]/10'
                          : 'hover:text-[#2C2C2A] hover:bg-[#E8E2D7]'
                      }`}
                      aria-label="إعجاب بالرأي"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked ? 'fill-[#C0703A] text-[#C0703A]' : ''
                        }`}
                      />
                      <span>{toArabicDigits(likesCount)}</span>
                    </button>

                    <button
                      onClick={() => handleToggleComments(rev.id)}
                      className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-[#2C2C2A] hover:bg-[#E8E2D7] transition-colors"
                      aria-label="عرض الردود"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{toArabicDigits(commentsCount)} ردود</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Collapsible Comments Area */}
                  {isOpen && (
                    <div className="pt-3 border-t border-[#E5DFD5]/70 space-y-3">
                      {/* Comments List */}
                      {rev.comments && rev.comments.length > 0 && (
                        <div className="space-y-2 pr-4 border-r-2 border-[#E5DFD5]">
                          {rev.comments.map((c) => (
                            <div
                              key={c.id}
                              className="bg-[#F2EBE0]/60 p-2.5 rounded-lg text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-[#8A8681]">
                                <span className="font-semibold text-[#2C2C2A]">
                                  {c.userName}
                                </span>
                                <span className="text-[10px]">
                                  {formatDateArabic(c.createdAt)}
                                </span>
                              </div>
                              <p className="text-[#2C2C2A]">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Reply Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="اكتب رداً..."
                          value={commentInputs[rev.id] || ''}
                          onChange={(e) => handleCommentChange(rev.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(rev.id);
                          }}
                          className="flex-1 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3 py-1.5 text-xs text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
                        />
                        <button
                          onClick={() => handleAddComment(rev.id)}
                          className="bg-[#6B7F5C] text-[#FAF7F2] hover:bg-[#546648] text-xs font-medium px-3 py-1.5 rounded-xl transition-colors shrink-0"
                        >
                          رد
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-container w-full max-w-md p-6 shadow-xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute left-4 top-4 text-[#8A8681] hover:text-[#2C2C2A] p-1.5 rounded-full hover:bg-[#E5DFD5]/50 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold font-serif text-[#2C2C2A] mb-1">
              اكتب رأيك في الكتاب
            </h2>
            <p className="text-xs text-[#8A8681] mb-4">
              {book.title} — {book.author}
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star selector */}
              <div>
                <label className="block text-xs font-medium text-[#2C2C2A] mb-1.5">
                  تقييمك
                </label>
                <StarRating
                  rating={newRating}
                  interactive={true}
                  onChange={(val) => setNewRating(val)}
                  size="lg"
                />
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs font-medium text-[#2C2C2A] mb-1.5">
                  رأيك وانطباعك
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="ما الذي أعجبك في الكتاب؟ وما هي انطباعاتك الأساسية؟"
                  className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl p-3 text-xs sm:text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#6B7F5C]"
                >
                  نشر الرأي
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
