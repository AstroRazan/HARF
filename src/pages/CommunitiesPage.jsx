import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Clock,
  UserPlus,
  Send,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Users
} from 'lucide-react';
import {
  getCommunities,
  getPosts,
  addPost,
  togglePostLike,
  addPostComment,
  getLiveSession,
  joinLiveSession,
  getBooks
} from '../data/store';
import BookCover from '../components/BookCover';
import { toArabicDigits, formatDateArabic } from '../utils/formatters';

export default function CommunitiesPage({ setView, showToast }) {
  const [communities, setCommunities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('تاريخ');
  const [posts, setPosts] = useState([]);
  const [liveSession, setLiveSession] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Composer state
  const [selectedBookId, setSelectedBookId] = useState('');
  const [recommendationReason, setRecommendationReason] = useState('');
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [isSelectingBook, setIsSelectingBook] = useState(false);
  const [submittingPost, setSubmittingPost] = useState(false);

  // Comments state
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Silent session countdown timer simulation
  const [sessionSeconds, setSessionSeconds] = useState(25 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => (prev > 0 ? prev - 1 : 25 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [comms, postList, session, booksList] = await Promise.all([
      getCommunities(),
      getPosts(selectedCategory),
      getLiveSession(),
      getBooks()
    ]);
    setCommunities(comms);
    setPosts(postList);
    setLiveSession(session);
    setAllBooks(booksList);
    if (!selectedBookId && booksList.length > 0) {
      setSelectedBookId(booksList[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const handleSelectCommunity = (cat) => {
    setSelectedCategory(cat);
  };

  const handlePublishRecommendation = async (e) => {
    e.preventDefault();
    if (!selectedBookId || !recommendationReason.trim()) return;

    setSubmittingPost(true);
    await addPost({
      category: selectedCategory,
      bookId: selectedBookId,
      reason: recommendationReason
    });
    setSubmittingPost(false);
    setRecommendationReason('');
    showToast('بيانات تجريبية — تم نشر ترشيحك');
    // Refresh posts
    const updated = await getPosts(selectedCategory);
    setPosts(updated);
  };

  const handleToggleLike = async (postId) => {
    await togglePostLike(postId);
    showToast('بيانات تجريبية — تم التفاعل');
    const updated = await getPosts(selectedCategory);
    setPosts(updated);
  };

  const handleToggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = async (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    await addPostComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('بيانات تجريبية — تم إضافة الرد');
    const updated = await getPosts(selectedCategory);
    setPosts(updated);
  };

  const handleJoinSession = async () => {
    const userBook = allBooks.find((b) => b.id === selectedBookId)?.title || 'مقدمة ابن خلدون';
    const updatedSession = await joinLiveSession(userBook);
    setLiveSession(updatedSession);
    showToast('بيانات تجريبية — انضممت إلى جلسة القراءة الصامتة');
  };

  // Format timer
  const minutes = Math.floor(sessionSeconds / 60);
  const seconds = sessionSeconds % 60;
  const formattedTime = `${toArabicDigits(String(minutes).padStart(2, '0'))}:${toArabicDigits(
    String(seconds).padStart(2, '0')
  )}`;

  const filteredBooksForComposer = allBooks.filter((b) =>
    b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  const selectedBookObj = allBooks.find((b) => b.id === selectedBookId);

  return (
    <div className="space-y-8">
      {/* 1. Category Community Tabs */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-[#8A8681] px-1">
          المجتمعات حسب التصنيف
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {communities.map((c) => {
            const isActive = selectedCategory === c.category;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectCommunity(c.category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                  isActive
                    ? 'bg-[#C0703A] text-[#FAF7F2] border-[#C0703A] shadow-2xs'
                    : 'bg-[#FAF7F2] text-[#8A8681] border-[#E5DFD5] hover:text-[#2C2C2A] hover:border-[#8A8681]'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Composer: Recommend a Book */}
      <section className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DFD5]/60 pb-2.5">
          <h2 className="font-bold text-sm text-[#2C2C2A] font-serif">
            رشّح كتابًا في مجتمع {selectedCategory}
          </h2>
        </div>

        <form onSubmit={handlePublishRecommendation} className="space-y-3.5">
          {/* Book Selector */}
          <div>
            <label className="block text-xs font-medium text-[#2C2C2A] mb-1">
              اختر الكتاب المرشح
            </label>
            <div className="relative">
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#2C2C2A] focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
              >
                {allBooks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {b.author}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reason text */}
          <div>
            <label className="block text-xs font-medium text-[#2C2C2A] mb-1">
              لماذا ترشحه للقرّاء؟
            </label>
            <textarea
              rows={3}
              required
              value={recommendationReason}
              onChange={(e) => setRecommendationReason(e.target.value)}
              placeholder="اكتب سبب ترشيحك وأبرز ما يميز هذا العمل..."
              className="w-full bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl p-3 text-xs sm:text-sm text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submittingPost || !recommendationReason.trim()}
              className="bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] font-semibold text-xs px-5 py-2 rounded-xl transition-all disabled:opacity-50 shadow-2xs"
            >
              نشر
            </button>
          </div>
        </form>
      </section>

      {/* 3. Community Feed */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[#2C2C2A] font-serif px-1">
          ترشيحات مجتمع {selectedCategory}
        </h2>

        {posts.length === 0 ? (
          <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-8 text-center space-y-3">
            <p className="text-sm text-[#8A8681]">لا توجد ترشيحات في هذا المجتمع حاليًا.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const book = post.book;
              const isLiked = post.likedBy?.includes('user-1');
              const likesCount = post.likedBy?.length || 0;
              const commentsCount = post.comments?.length || 0;
              const isOpen = Boolean(openComments[post.id]);

              return (
                <article
                  key={post.id}
                  className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-4 sm:p-5 space-y-3.5"
                >
                  {/* Poster Header */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E8E2D7] text-[#2C2C2A] font-semibold text-xs flex items-center justify-center border border-[#D5CDC1]">
                      {post.userName ? post.userName.slice(0, 2) : 'ق'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs sm:text-sm text-[#2C2C2A]">
                        {post.userName}
                      </h3>
                      <p className="text-[10px] text-[#8A8681]">
                        {formatDateArabic(post.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation Reason */}
                  <p className="text-xs sm:text-sm text-[#2C2C2A] leading-relaxed">
                    {post.reason}
                  </p>

                  {/* Recommended Book Card */}
                  {book && (
                    <div
                      onClick={() => setView({ name: 'book', bookId: book.id })}
                      className="bg-[#F2EBE0]/60 border border-[#E5DFD5] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-[#C0703A]/50 transition-colors"
                    >
                      <BookCover
                        title={book.title}
                        author={book.author}
                        category={book.category}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#C0703A] font-semibold block mb-0.5">
                          الكتاب المرشح
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#2C2C2A] line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-[#8A8681] line-clamp-1">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-1 text-xs text-[#8A8681]">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
                        isLiked
                          ? 'text-[#C0703A] font-semibold bg-[#C0703A]/10'
                          : 'hover:text-[#2C2C2A] hover:bg-[#E8E2D7]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked ? 'fill-[#C0703A] text-[#C0703A]' : ''
                        }`}
                      />
                      <span>{toArabicDigits(likesCount)}</span>
                    </button>

                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-[#2C2C2A] hover:bg-[#E8E2D7] transition-colors"
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

                  {/* Collapsible Comments */}
                  {isOpen && (
                    <div className="pt-3 border-t border-[#E5DFD5]/70 space-y-3">
                      {post.comments && post.comments.length > 0 && (
                        <div className="space-y-2 pr-4 border-r-2 border-[#E5DFD5]">
                          {post.comments.map((c) => (
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

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="اكتب رداً..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          className="flex-1 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl px-3 py-1.5 text-xs text-[#2C2C2A] placeholder-[#8A8681]/60 focus:border-[#6B7F5C] focus:ring-1 focus:ring-[#6B7F5C]"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
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

      {/* 4. Silent Reading Session Panel (جلسة قراءة صامتة) */}
      <section className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DFD5]/70 pb-3">
          <div>
            <h2 className="text-base font-bold font-serif text-[#2C2C2A]">
              جلسة قراءة صامتة
            </h2>
            <p className="text-xs text-[#8A8681] mt-0.5">
              مساحة تركيز هادئة للقراءة الجماعية
            </p>
          </div>

          {/* Session Timer & Join Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#E8E2D7] px-3 py-1 rounded-xl text-xs font-mono font-bold text-[#2C2C2A]">
              <Clock className="w-3.5 h-3.5 text-[#C0703A]" />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={handleJoinSession}
              className="bg-[#6B7F5C] hover:bg-[#546648] text-[#FAF7F2] text-xs font-semibold px-4 py-1.5 rounded-xl transition-all shadow-2xs"
            >
              انضم
            </button>
          </div>
        </div>

        {/* Participants List */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#8A8681] block">
            المشاركون الآن ({toArabicDigits(liveSession?.participants?.length || 0)})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {liveSession?.participants?.map((p) => (
              <div
                key={p.id}
                className="bg-[#F2EBE0]/60 border border-[#E5DFD5] rounded-xl p-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8E2D7] text-[#2C2C2A] font-semibold text-[10px] flex items-center justify-center">
                    {p.userName.slice(0, 1)}
                  </div>
                  <span className="font-semibold text-[#2C2C2A]">{p.userName}</span>
                </div>
                <span className="text-[11px] text-[#8A8681] truncate max-w-[140px]">
                  يقرأ: {p.bookTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
