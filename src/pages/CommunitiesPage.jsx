import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Heart,
  MessageCircle,
  Clock,
  Plus,
  Send,
  ChevronDown,
  ChevronUp,
  X,
  BookOpen,
  Users,
  Play,
  Pause,
  RotateCcw,
  LogOut,
  Sparkles,
  Check,
  CheckCircle2
} from 'lucide-react';
import {
  getCommunities,
  getPosts,
  addPost,
  togglePostLike,
  addPostComment,
  getSessions,
  createSession,
  joinSession,
  leaveSession,
  getBooks
} from '../data/store';
import BookCover from '../components/BookCover';
import { toArabicDigits, formatDateArabic } from '../utils/formatters';

// Curated tints, glyphs, and stats for the 6 community blocks
const COMMUNITY_THEMES = {
  'رواية وقصص': {
    bg: 'bg-[#EEF5EC]',
    headerBg: 'bg-[#EEF5EC]',
    border: 'border-[#D2E2CF]',
    activeBorder: 'border-[#677E61]',
    badgeBg: 'bg-[#677E61]/15 text-[#4E6649]',
    accentColor: '#677E61',
    btnBg: 'bg-[#677E61] hover:bg-[#52664D] text-[#FDF8F0]',
    glyph: 'ر',
    members: 1420,
    books: 24,
    avatars: ['س', 'ر', 'ع']
  },
  'تاريخ': {
    bg: 'bg-[#FDF4E7]',
    headerBg: 'bg-[#FDF4E7]',
    border: 'border-[#EBDAC5]',
    activeBorder: 'border-[#B88746]',
    badgeBg: 'bg-[#B88746]/15 text-[#855B23]',
    accentColor: '#B88746',
    btnBg: 'bg-[#B88746] hover:bg-[#9E7134] text-[#FDF8F0]',
    glyph: 'ت',
    members: 980,
    books: 18,
    avatars: ['ط', 'أ', 'م']
  },
  'فلسفة': {
    bg: 'bg-[#FCEDED]',
    headerBg: 'bg-[#FCEDED]',
    border: 'border-[#F2D3CF]',
    activeBorder: 'border-[#BD4444]',
    badgeBg: 'bg-[#BD4444]/15 text-[#A13535]',
    accentColor: '#BD4444',
    btnBg: 'bg-[#BD4444] hover:bg-[#9E3434] text-[#FDF8F0]',
    glyph: 'ف',
    members: 760,
    books: 14,
    avatars: ['ع', 'س', 'ط']
  },
  'تطوير ذات': {
    bg: 'bg-[#F9F1E5]',
    headerBg: 'bg-[#F9F1E5]',
    border: 'border-[#E7D6C0]',
    activeBorder: 'border-[#8F6A3B]',
    badgeBg: 'bg-[#8F6A3B]/15 text-[#6E4F26]',
    accentColor: '#8F6A3B',
    btnBg: 'bg-[#8F6A3B] hover:bg-[#735328] text-[#FDF8F0]',
    glyph: 'ذ',
    members: 2150,
    books: 32,
    avatars: ['م', 'أ', 'ر']
  },
  'مذكرات': {
    bg: 'bg-[#F4F1EA]',
    headerBg: 'bg-[#F4F1EA]',
    border: 'border-[#DFD9CD]',
    activeBorder: 'border-[#6B6252]',
    badgeBg: 'bg-[#6B6252]/15 text-[#4D4537]',
    accentColor: '#6B6252',
    btnBg: 'bg-[#6B6252] hover:bg-[#544C3D] text-[#FDF8F0]',
    glyph: 'م',
    members: 620,
    books: 12,
    avatars: ['ر', 'ط', 'ع']
  },
  'أدب': {
    bg: 'bg-[#F0F5EE]',
    headerBg: 'bg-[#F0F5EE]',
    border: 'border-[#D5E1D2]',
    activeBorder: 'border-[#5A7C55]',
    badgeBg: 'bg-[#5A7C55]/15 text-[#3D5739]',
    accentColor: '#5A7C55',
    btnBg: 'bg-[#5A7C55] hover:bg-[#486344] text-[#FDF8F0]',
    glyph: 'أ',
    members: 1890,
    books: 26,
    avatars: ['س', 'م', 'أ']
  }
};

export default function CommunitiesPage({ setView, showToast, currentUser, onOpenAuth }) {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel dragging & scrolling state
  const carouselRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Recommendation Modal state
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [composerCategory, setComposerCategory] = useState('رواية وقصص');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [recommendationReason, setRecommendationReason] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);

  // Create Session Modal state
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionDuration, setNewSessionDuration] = useState(25);
  const [newSessionBookTitle, setNewSessionBookTitle] = useState('');

  // Focused Immersive Session View state
  const [activeSession, setActiveSession] = useState(null);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(25 * 60);
  const [sessionTotalSeconds, setSessionTotalSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  // Comments state
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Timer interval ref
  const timerRef = useRef(null);

  // Real countdown timer logic
  useEffect(() => {
    if (activeSession && isTimerRunning && !isSessionCompleted) {
      timerRef.current = setInterval(() => {
        setSessionSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            setIsSessionCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession, isTimerRunning, isSessionCompleted]);

  const loadData = async () => {
    setLoading(true);
    const filterCat = selectedCommunity ? selectedCommunity.category : 'الكل';
    const [comms, postList, sessionList, booksList] = await Promise.all([
      getCommunities(),
      getPosts(filterCat),
      getSessions(),
      getBooks()
    ]);
    setCommunities(comms);
    setPosts(postList);
    setSessions(sessionList);
    setAllBooks(booksList);
    if (!selectedBookId && booksList.length > 0) {
      setSelectedBookId(booksList[0].id);
      setNewSessionBookTitle(booksList[0].title);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedCommunity, currentUser]);

  // Carousel mouse drag handlers
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftPos(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    carouselRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  // Carousel arrow scroll buttons (in RTL layout)
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 340;
    // In RTL, negative scrollLeft moves left (towards later items), positive moves right (towards start)
    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Open dedicated community page view
  const handleOpenCommunityPage = (c) => {
    if (hasDragged) return;
    setSelectedCommunity(c);
    setComposerCategory(c.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button returns to community grid
  const handleBackToGrid = () => {
    setSelectedCommunity(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRecommendModal = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (selectedCommunity) {
      setComposerCategory(selectedCommunity.category);
    }
    setIsRecommendModalOpen(true);
  };

  const handlePublishRecommendation = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!selectedBookId || !recommendationReason.trim()) return;

    setSubmittingPost(true);
    await addPost(
      {
        category: composerCategory,
        bookId: selectedBookId,
        reason: recommendationReason
      },
      currentUser
    );
    setSubmittingPost(false);
    setRecommendationReason('');
    setIsRecommendModalOpen(false);
    showToast('تم النشر');

    const filterCat = selectedCommunity ? selectedCommunity.category : 'الكل';
    const updated = await getPosts(filterCat);
    setPosts(updated);
  };

  const handleToggleLike = async (postId) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    await togglePostLike(postId, currentUser);
    showToast('تم الإعجاب');
    const filterCat = selectedCommunity ? selectedCommunity.category : 'الكل';
    const updated = await getPosts(filterCat);
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
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    await addPostComment(postId, text, currentUser);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('تم النشر');
    const filterCat = selectedCommunity ? selectedCommunity.category : 'الكل';
    const updated = await getPosts(filterCat);
    setPosts(updated);
  };

  // --- Reading Sessions Handlers ---
  const handleOpenCreateSession = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const defaultTitle = selectedCommunity
      ? `جلسة تركيز في مجتمع ${selectedCommunity.name}`
      : 'جلسة تركيز مسائية';
    setNewSessionTitle(defaultTitle);
    setNewSessionDuration(25);
    if (allBooks.length > 0 && !newSessionBookTitle) {
      setNewSessionBookTitle(allBooks[0].title);
    }
    setIsCreateSessionModalOpen(true);
  };

  const handleCreateSessionSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const duration = Number(newSessionDuration) || 25;
    const created = await createSession(
      {
        title: newSessionTitle || 'جلسة قراءة صامتة',
        durationMinutes: duration,
        bookTitle: newSessionBookTitle || 'قراءة حرة'
      },
      currentUser
    );

    setIsCreateSessionModalOpen(false);
    showToast('تم إنشاء الجلسة وبدء وقت القراءة');

    const totalSec = duration * 60;
    setActiveSession(created);
    setSessionTotalSeconds(totalSec);
    setSessionSecondsLeft(totalSec);
    setIsTimerRunning(true);
    setIsSessionCompleted(false);

    const updatedSessions = await getSessions();
    setSessions(updatedSessions);
  };

  const handleJoinExistingSession = async (sess) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const defaultBook = allBooks.find((b) => b.id === selectedBookId)?.title || 'مقدمة ابن خلدون';
    const updated = await joinSession(sess.id, defaultBook, currentUser);

    const duration = updated.durationMinutes || 25;
    const totalSec = duration * 60;
    setActiveSession(updated);
    setSessionTotalSeconds(totalSec);
    setSessionSecondsLeft(totalSec);
    setIsTimerRunning(true);
    setIsSessionCompleted(false);

    showToast('انضممت إلى الجلسة، ابدأ قراءتك بهدوء');

    const updatedSessions = await getSessions();
    setSessions(updatedSessions);
  };

  const handleLeaveFocusedSession = async () => {
    if (activeSession && currentUser) {
      await leaveSession(activeSession.id, currentUser);
    }
    setIsTimerRunning(false);
    setActiveSession(null);
    setIsSessionCompleted(false);
    showToast('غادرت جلسة القراءة');

    const updatedSessions = await getSessions();
    setSessions(updatedSessions);
  };

  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setSessionSecondsLeft(sessionTotalSeconds);
    setIsSessionCompleted(false);
    setIsTimerRunning(true);
  };

  // Timer formatting
  const minutes = Math.floor(sessionSecondsLeft / 60);
  const seconds = sessionSecondsLeft % 60;
  const formattedMinutes = toArabicDigits(String(minutes).padStart(2, '0'));
  const formattedSeconds = toArabicDigits(String(seconds).padStart(2, '0'));

  // SVG circular progress computation (radius: 105, circumference ≈ 659.73)
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = sessionTotalSeconds > 0 ? (sessionTotalSeconds - sessionSecondsLeft) / sessionTotalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const activeCommunityTheme = selectedCommunity
    ? (COMMUNITY_THEMES[selectedCommunity.category] || COMMUNITY_THEMES['رواية وقصص'])
    : null;

  return (
    <div className="space-y-12 w-full">
      {/* ========================================================================= */}
      {/* VIEW A: DEDICATED COMMUNITY PAGE (Opened via "عرض النقاشات")            */}
      {/* ========================================================================= */}
      {selectedCommunity ? (
        <div className="space-y-8 animate-fade-in">
          {/* 1. Tinted Community Header with Back Button */}
          <div
            className={`rounded-card p-6 sm:p-8 border shadow-xs transition-all ${activeCommunityTheme.headerBg} ${activeCommunityTheme.border}`}
          >
            {/* Back Button Row */}
            <div className="mb-4">
              <button
                onClick={handleBackToGrid}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B2B26] hover:text-[#BD4444] bg-[#FDF8F0]/80 hover:bg-[#FDF8F0] border border-[#E2D2BC]/70 px-3.5 py-1.5 rounded-xl transition-all shadow-2xs"
                aria-label="العودة إلى قائمة المجتمعات"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                <span>رجوع إلى المجتمعات</span>
              </button>
            </div>

            {/* Community Info & 'رشّح كتابًا' Header CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${activeCommunityTheme.badgeBg}`}
                  >
                    {selectedCommunity.category}
                  </span>
                  <span className="text-xs text-[#7A7468]">
                    {toArabicDigits(activeCommunityTheme.members)} عضو • {toArabicDigits(activeCommunityTheme.books)} كتاب متاح
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#2B2B26]">
                  {selectedCommunity.name}
                </h1>

                <p className="text-sm text-[#5A554A] leading-relaxed">
                  {selectedCommunity.description}
                </p>
              </div>

              {/* 'رشّح كتابًا' Primary Button */}
              <div className="shrink-0">
                <button
                  onClick={handleOpenRecommendModal}
                  className="inline-flex items-center gap-2 bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-2xs hover:shadow-xs"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>رشّح كتابًا</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Full list of Recommendations and Discussions for this Community */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2D2BC]/60 pb-3">
              <h2 className="text-lg font-bold text-[#2B2B26] font-serif">
                ترشيحات ونقاشات الأعضاء
              </h2>
              <span className="text-xs text-[#7A7468]">
                {toArabicDigits(posts.length)} ترشيح
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-[#7A7468] text-sm animate-pulse">
                جاري تحميل نقاشات المجتمع...
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-card p-10 text-center space-y-4">
                <p className="text-sm text-[#7A7468]">
                  لا توجد ترشيحات في هذا المجتمع بعد.
                </p>
                <button
                  onClick={handleOpenRecommendModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold py-2.5 px-5 rounded-xl bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0] transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>رشّح كتابًا</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => {
                  const book = post.book;
                  const isLiked = post.likedBy?.includes(currentUser?.id || 'guest');
                  const likesCount = post.likedBy?.length || 0;
                  const commentsCount = post.comments?.length || 0;
                  const isOpen = Boolean(openComments[post.id]);

                  return (
                    <article
                      key={post.id}
                      className="bg-[#FDF8F0] border border-[#E2D2BC]/70 rounded-card p-5 sm:p-6 space-y-4 shadow-2xs hover:border-[#BD4444]/40 transition-all duration-200"
                    >
                      {/* Poster Avatar & Name on one line */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#F1DEC4] text-[#2B2B26] font-bold text-xs flex items-center justify-center border border-[#DFCEB7] shrink-0">
                            {post.userName ? post.userName.charAt(0) : 'ق'}
                          </div>
                          <div>
                            <h3 className="font-bold text-xs sm:text-sm text-[#2B2B26] leading-none">
                              {post.userName}
                            </h3>
                            <span className="text-[11px] text-[#7A7468] mt-1 block">
                              {formatDateArabic(post.createdAt)}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] bg-[#F1DEC4]/60 border border-[#E2D2BC] text-[#7A7468] px-2.5 py-0.5 rounded-full font-medium">
                          {post.category}
                        </span>
                      </div>

                      {/* Recommendation Content with Side Book Thumbnail */}
                      <div className="bg-[#FAF5ED] border border-[#E2D2BC]/60 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start">
                        {book && (
                          <div
                            onClick={() => setView({ name: 'book', bookId: book.id })}
                            className="w-16 sm:w-20 shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                            title={book.title}
                          >
                            <BookCover
                              title={book.title}
                              author={book.author}
                              category={book.category}
                              coverUrl={book.coverUrl}
                              language={book.language}
                              size="sm"
                              className="w-full h-auto aspect-[3/4.2]"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 space-y-1.5">
                          {book && (
                            <div
                              onClick={() => setView({ name: 'book', bookId: book.id })}
                              className="cursor-pointer group"
                            >
                              <span className="text-[10px] text-[#BD4444] font-semibold uppercase tracking-wider block">
                                الكتاب المرشح
                              </span>
                              <h4
                                className="font-bold text-sm text-[#2B2B26] group-hover:text-[#BD4444] transition-colors line-clamp-1"
                                dir={book.language === 'en' ? 'ltr' : 'rtl'}
                                style={book.language === 'en' ? { direction: 'ltr' } : {}}
                              >
                                {book.title}
                              </h4>
                              <p
                                className="text-xs text-[#7A7468] line-clamp-1"
                                dir={book.language === 'en' ? 'ltr' : 'rtl'}
                              >
                                {book.author}
                              </p>
                            </div>
                          )}

                          <p className="text-xs sm:text-sm text-[#2B2B26]/90 leading-relaxed pt-1">
                            {post.reason}
                          </p>
                        </div>
                      </div>

                      {/* Compact Footer Row */}
                      <div className="flex items-center gap-4 pt-2 border-t border-[#E2D2BC]/50 text-xs text-[#7A7468]">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors ${
                            isLiked
                              ? 'text-[#BD4444] font-semibold bg-[#BD4444]/10'
                              : 'hover:text-[#2B2B26] hover:bg-[#F1DEC4]'
                          }`}
                          aria-label="إعجاب بالترشيح"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked ? 'fill-[#BD4444] text-[#BD4444]' : ''
                            }`}
                          />
                          <span>{toArabicDigits(likesCount)}</span>
                        </button>

                        <button
                          onClick={() => handleToggleComments(post.id)}
                          className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:text-[#2B2B26] hover:bg-[#F1DEC4] transition-colors"
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

                      {/* Collapsible Comments */}
                      {isOpen && (
                        <div className="pt-3 border-t border-[#E2D2BC]/60 space-y-3">
                          {post.comments && post.comments.length > 0 && (
                            <div className="space-y-2 pr-3 border-r-2 border-[#E2D2BC]">
                              {post.comments.map((c) => (
                                <div
                                  key={c.id}
                                  className="bg-[#FAF5ED] border border-[#E2D2BC]/40 p-2.5 rounded-xl text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between text-[#7A7468]">
                                    <span className="font-semibold text-[#2B2B26]">
                                      {c.userName}
                                    </span>
                                    <span className="text-[10px]">
                                      {formatDateArabic(c.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-[#2B2B26] leading-relaxed">{c.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="اكتب رداً على هذا الترشيح..."
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
                              className="flex-1 bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2 text-xs text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="bg-[#BD4444] text-[#FDF8F0] hover:bg-[#A43939] text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
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

          {/* 3. Reading Sessions Section for this Community */}
          <section className="bg-[#FAF5ED] border border-[#E2D2BC] rounded-card p-5 sm:p-7 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D2BC]/70 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#677E61] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#73976A] animate-pulse" />
                  <span>مساحات التركيز في مجتمع {selectedCommunity.name}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#2B2B26]">
                  جلسات القراءة الصامتة
                </h2>
                <p className="text-xs text-[#7A7468] mt-0.5">
                  اقرأ مع أعضاء هذا المجتمع في أجواء تركيز هادئة ومؤقت زمني حقيقي.
                </p>
              </div>

              <button
                onClick={handleOpenCreateSession}
                className="inline-flex items-center gap-2 bg-[#677E61] hover:bg-[#52664D] active:bg-[#43553E] text-[#FDF8F0] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-2xs hover:shadow-xs self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>أنشئ جلسة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((sess) => {
                const count = sess.participants?.length || 0;
                return (
                  <div
                    key={sess.id}
                    className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-[#677E61]/60 transition-all shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#677E61]/10 text-[#677E61] px-2 py-0.5 rounded-full font-semibold">
                          {toArabicDigits(sess.durationMinutes || 25)} دقيقة
                        </span>
                        <span className="text-[11px] text-[#7A7468] flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{toArabicDigits(count)} يقرؤون الآن</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#2B2B26] font-serif line-clamp-1">
                        {sess.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#E2D2BC]/60 flex items-center justify-between gap-3">
                      <div className="flex items-center -space-x-1.5 space-x-reverse">
                        {sess.participants?.slice(0, 3).map((p, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-[#F1DEC4] border border-white text-[#2B2B26] font-bold text-[9px] flex items-center justify-center shadow-2xs"
                            title={`${p.userName} (${p.bookTitle})`}
                          >
                            {p.userName.charAt(0)}
                          </div>
                        ))}
                        {count > 3 && (
                          <div className="w-6 h-6 rounded-full bg-[#E2D2BC] text-[#2B2B26] font-bold text-[9px] flex items-center justify-center">
                            +{toArabicDigits(count - 3)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleJoinExistingSession(sess)}
                        className="bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0] text-xs font-semibold px-4 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>انضم</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW B: CRAFTED COMMUNITIES OVERVIEW WITH DEEP TINTED BAND & CAROUSEL     */
        /* ========================================================================= */
        <div className="space-y-12 animate-fade-in">
          {/* 1. Deep Tinted Band Section (#344230 dark green) */}
          <section className="bg-[#2D3A2A] border border-[#3E4E3A] rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 shadow-xl relative overflow-hidden text-[#FDF8F0]">
            {/* Header row with Title & Navigation Arrows on the left (RTL end) */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#43543E] pb-6 mb-7">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B2C5AE] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6C894]" />
                  <span>دوائر النقاش المتخصصة</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#FDF8F0] tracking-tight">
                  المجتمعات القرائية
                </h1>
                <p className="text-xs sm:text-sm text-[#CAD6C6] mt-1.5 max-w-xl leading-relaxed">
                  تصفّح دوائر النقاش المتخصصة، واطّلع على حوارات القرّاء، واسحب لاستكشاف كافة المجتمعات.
                </p>
              </div>

              {/* Navigation Arrows on the Left in RTL */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-xl bg-[#232E21] hover:bg-[#1A2318] active:scale-95 text-[#FDF8F0] border border-[#43543E] flex items-center justify-center transition-all shadow-2xs hover:border-[#677E61]"
                  aria-label="السابق في المجتمعات"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-xl bg-[#232E21] hover:bg-[#1A2318] active:scale-95 text-[#FDF8F0] border border-[#43543E] flex items-center justify-center transition-all shadow-2xs hover:border-[#677E61]"
                  aria-label="التالي في المجتمعات"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Draggable Horizontal Carousel Container with edge fades */}
            <div className="relative -mx-2 sm:-mx-4">
              {/* Subtle edge fade overlays */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#2D3A2A] to-transparent z-10" />
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#2D3A2A] to-transparent z-10" />

              {/* Carousel Track */}
              <div
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 py-2 select-none ${
                  isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                {communities.map((c) => {
                  const theme = COMMUNITY_THEMES[c.category] || {
                    bg: 'bg-[#FDF8F0]',
                    border: 'border-[#E2D2BC]',
                    badgeBg: 'bg-[#73976A]/15 text-[#677E61]',
                    glyph: 'ح',
                    members: 850,
                    books: 20,
                    avatars: ['ق', 'س', 'أ']
                  };

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleOpenCommunityPage(c)}
                      className={`snap-start shrink-0 w-[290px] sm:w-[320px] h-[310px] sm:h-[330px] rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 group ${
                        theme.bg
                      } ${theme.border}`}
                    >
                      {/* Large Faded Ornamental Letter in Background Corner for Texture */}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-4 -left-4 text-9xl font-serif font-black text-[#2B2B26]/[0.07] select-none pointer-events-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 leading-none"
                      >
                        {theme.glyph}
                      </span>

                      {/* Card Top: Category Badge & Name */}
                      <div className="space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${theme.badgeBg}`}
                          >
                            {c.category}
                          </span>
                          <span className="text-[11px] text-[#7A7468] font-medium">
                            {toArabicDigits(theme.books)} كتاب
                          </span>
                        </div>

                        <h3 className="font-bold text-xl sm:text-2xl text-[#2B2B26] font-display group-hover:text-[#BD4444] transition-colors leading-snug">
                          {c.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4E493E] leading-relaxed line-clamp-3">
                          {c.description}
                        </p>
                      </div>

                      {/* Card Bottom: Member Stack + Counts + Action Button */}
                      <div className="space-y-3 pt-3 border-t border-[#2B2B26]/10 relative z-10">
                        <div className="flex items-center justify-between text-xs text-[#7A7468]">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center -space-x-1.5 space-x-reverse">
                              {theme.avatars.map((av, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded-full bg-[#FDF8F0] border-2 border-white text-[#2B2B26] font-semibold text-[10px] flex items-center justify-center shadow-2xs"
                                >
                                  {av}
                                </div>
                              ))}
                            </div>
                            <span className="font-semibold text-[#2B2B26] text-xs">
                              {toArabicDigits(theme.members)} عضو
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCommunityPage(c);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs bg-[#FDF8F0] text-[#2B2B26] border border-[#E2D2BC] hover:bg-[#F1DEC4] group-hover:border-[#2B2B26]/40"
                        >
                          <span>عرض النقاشات</span>
                          <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 2. Reading Sessions Section */}
          <section className="bg-[#FAF5ED] border border-[#E2D2BC] rounded-card p-5 sm:p-7 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D2BC]/70 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#677E61] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#73976A] animate-pulse" />
                  <span>مساحات التركيز الهادئة</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#2B2B26]">
                  جلسات القراءة الصامتة المباشرة
                </h2>
                <p className="text-xs text-[#7A7468] mt-0.5">
                  اقرأ مع الآخرين في أجواء تركيز هادئة ومؤقت زمني حقيقي.
                </p>
              </div>

              <button
                onClick={handleOpenCreateSession}
                className="inline-flex items-center gap-2 bg-[#677E61] hover:bg-[#52664D] active:bg-[#43553E] text-[#FDF8F0] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-2xs hover:shadow-xs self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>أنشئ جلسة</span>
              </button>
            </div>

            {/* Active Sessions Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((sess) => {
                const count = sess.participants?.length || 0;
                return (
                  <div
                    key={sess.id}
                    className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-[#677E61]/60 transition-all shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] bg-[#677E61]/10 text-[#677E61] px-2 py-0.5 rounded-full font-semibold">
                          {toArabicDigits(sess.durationMinutes || 25)} دقيقة
                        </span>
                        <span className="text-[11px] text-[#7A7468] flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{toArabicDigits(count)} يقرؤون الآن</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#2B2B26] font-serif line-clamp-1">
                        {sess.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#E2D2BC]/60 flex items-center justify-between gap-3">
                      <div className="flex items-center -space-x-1.5 space-x-reverse">
                        {sess.participants?.slice(0, 3).map((p, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-[#F1DEC4] border border-white text-[#2B2B26] font-bold text-[9px] flex items-center justify-center shadow-2xs"
                            title={`${p.userName} (${p.bookTitle})`}
                          >
                            {p.userName.charAt(0)}
                          </div>
                        ))}
                        {count > 3 && (
                          <div className="w-6 h-6 rounded-full bg-[#E2D2BC] text-[#2B2B26] font-bold text-[9px] flex items-center justify-center">
                            +{toArabicDigits(count - 3)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleJoinExistingSession(sess)}
                        className="bg-[#BD4444] hover:bg-[#A43939] text-[#FDF8F0] text-xs font-semibold px-4 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>انضم</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS & OVERLAYS                                                         */}
      {/* ========================================================================= */}

      {/* 1. Recommendation Composer Modal */}
      {isRecommendModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recommend-modal-title"
        >
          <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-container w-full max-w-lg p-6 shadow-xl relative">
            <button
              onClick={() => setIsRecommendModalOpen(false)}
              className="absolute left-4 top-4 text-[#7A7468] hover:text-[#2B2B26] p-1.5 rounded-full hover:bg-[#E2D2BC]/50 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2
                id="recommend-modal-title"
                className="text-xl font-bold font-serif text-[#2B2B26] mb-1"
              >
                رشّح كتابًا {selectedCommunity ? `في مجتمع ${selectedCommunity.name}` : 'للمجتمع'}
              </h2>
              <p className="text-xs text-[#7A7468]">
                شارك القرّاء تجربتك وأخبرهم لماذا يستحق هذا الكتاب القراءة.
              </p>
            </div>

            <form onSubmit={handlePublishRecommendation} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                  المجتمع المستهدف
                </label>
                <select
                  value={composerCategory}
                  onChange={(e) => setComposerCategory(e.target.value)}
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2B2B26] focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                >
                  {communities.map((c) => (
                    <option key={c.id} value={c.category}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                  اختر الكتاب المرشح
                </label>
                <select
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2B2B26] focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                >
                  {allBooks.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} — {b.author}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                  لماذا ترشحه للقرّاء؟
                </label>
                <textarea
                  rows={4}
                  required
                  value={recommendationReason}
                  onChange={(e) => setRecommendationReason(e.target.value)}
                  placeholder="اكتب سبب ترشيحك وأبرز ما أثر فيك في هذا الكتاب..."
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl p-3.5 text-xs sm:text-sm text-[#2B2B26] placeholder-[#7A7468]/60 focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2D2BC]/60">
                <button
                  type="button"
                  onClick={() => setIsRecommendModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#7A7468] hover:text-[#2B2B26] transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submittingPost || !recommendationReason.trim()}
                  className="bg-[#BD4444] hover:bg-[#A43939] active:bg-[#912F2F] text-[#FDF8F0] font-semibold text-xs px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 shadow-2xs"
                >
                  {submittingPost ? 'جاري النشر...' : 'نشر الترشيح'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Create Session Modal */}
      {isCreateSessionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-session-modal-title"
        >
          <div className="bg-[#FDF8F0] border border-[#E2D2BC] rounded-container w-full max-w-lg p-6 shadow-xl relative">
            <button
              onClick={() => setIsCreateSessionModalOpen(false)}
              className="absolute left-4 top-4 text-[#7A7468] hover:text-[#2B2B26] p-1.5 rounded-full hover:bg-[#E2D2BC]/50 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2
                id="create-session-modal-title"
                className="text-xl font-bold font-serif text-[#2B2B26] mb-1"
              >
                إنشاء جلسة قراءة صامتة
              </h2>
              <p className="text-xs text-[#7A7468]">
                حدد المدة والكتاب الذي ستقرؤه لبدء جلسة تركيز هادئة.
              </p>
            </div>

            <form onSubmit={handleCreateSessionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                  عنوان الجلسة
                </label>
                <input
                  type="text"
                  required
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="مثال: جلسة تركيز مسائية"
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2B2B26] focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-2">
                  مدة الجلسة
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[25, 50, 90].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setNewSessionDuration(dur)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        newSessionDuration === dur
                          ? 'bg-[#677E61] text-[#FDF8F0] border-[#677E61] shadow-2xs'
                          : 'bg-[#FDF8F0] text-[#7A7468] border-[#E2D2BC] hover:border-[#677E61] hover:text-[#2B2B26]'
                      }`}
                    >
                      {toArabicDigits(dur)} دقيقة {dur === 25 ? '(بومودورو)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2B26] mb-1">
                  الكتاب الذي ستقرؤه
                </label>
                <input
                  type="text"
                  required
                  value={newSessionBookTitle}
                  onChange={(e) => setNewSessionBookTitle(e.target.value)}
                  placeholder="مثال: مقدمة ابن خلدون"
                  className="w-full bg-[#FDF8F0] border border-[#E2D2BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#2B2B26] focus:border-[#677E61] focus:ring-1 focus:ring-[#677E61]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2D2BC]/60">
                <button
                  type="button"
                  onClick={() => setIsCreateSessionModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#7A7468] hover:text-[#2B2B26] transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#677E61] hover:bg-[#52664D] text-[#FDF8F0] font-semibold text-xs px-6 py-2.5 rounded-xl transition-all shadow-2xs"
                >
                  بدء الجلسة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Focused Immersive Session View */}
      {activeSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#181614]/92 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="focused-session-title"
        >
          <div className="bg-[#24211D] border border-[#443F36] rounded-2xl w-full max-w-4xl p-6 sm:p-8 text-[#FDF8F0] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#3A352D] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSessionCompleted
                        ? 'bg-[#73976A]'
                        : isTimerRunning
                        ? 'bg-[#BD4444] animate-pulse'
                        : 'bg-[#C2A378]'
                    }`}
                  />
                  <span className="text-xs text-[#DFCEB7] font-medium">
                    {isSessionCompleted
                      ? 'اكتملت الجلسة'
                      : isTimerRunning
                      ? 'جاري القراءة بهدوء...'
                      : 'موقوف مؤقتًا'}
                  </span>
                </div>
                <h2 id="focused-session-title" className="text-lg sm:text-xl font-bold font-serif text-[#FDF8F0]">
                  {activeSession.title}
                </h2>
              </div>

              <button
                onClick={handleLeaveFocusedSession}
                className="text-xs text-[#DFCEB7] hover:text-[#BD4444] border border-[#443F36] hover:border-[#BD4444]/60 bg-[#2D2A24] px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>غادر الجلسة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2">
              <div className="md:col-span-7 flex flex-col items-center justify-center space-y-6">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      stroke="#38332A"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      stroke={isSessionCompleted ? '#73976A' : '#BD4444'}
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className={`transition-all duration-1000 ease-linear ${
                        isTimerRunning && !isSessionCompleted ? 'timer-pulse-glow' : ''
                      }`}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                    {isSessionCompleted ? (
                      <div className="space-y-1">
                        <CheckCircle2 className="w-12 h-12 text-[#73976A] mx-auto mb-1 animate-bounce" />
                        <span className="text-xl font-bold font-serif text-[#FDF8F0] block">
                          أحسنت!
                        </span>
                        <span className="text-xs text-[#DFCEB7]">
                          أتممت وقت القراءة بنجاح
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="text-5xl sm:text-6xl font-bold font-mono text-[#FDF8F0] tracking-wider">
                          <span>{formattedMinutes}</span>
                          <span className="text-[#BD4444] mx-0.5 animate-pulse">:</span>
                          <span>{formattedSeconds}</span>
                        </div>
                        <span className="text-xs text-[#A89E8D] mt-2 font-medium">
                          الوقت المتبقي
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isSessionCompleted ? (
                    <button
                      onClick={handleToggleTimer}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-md ${
                        isTimerRunning
                          ? 'bg-[#3D382E] text-[#DFCEB7] hover:bg-[#4D473C] border border-[#524B3E]'
                          : 'bg-[#BD4444] text-[#FDF8F0] hover:bg-[#A43939]'
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>إيقاف مؤقت</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>استئناف القراءة</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleResetTimer}
                      className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#677E61] hover:bg-[#52664D] text-[#FDF8F0] flex items-center gap-2 transition-all shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>بدء جلسة جديدة</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-5 bg-[#1C1A17] border border-[#3A352D] rounded-xl p-4 sm:p-5 space-y-3 max-h-[340px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#3A352D] pb-2">
                  <h3 className="text-xs font-bold text-[#DFCEB7] font-serif">
                    القرّاء في هذه الجلسة
                  </h3>
                  <span className="text-[11px] text-[#A89E8D]">
                    {toArabicDigits(activeSession.participants?.length || 1)} أعضاء
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {activeSession.participants?.map((p) => {
                    const isMe = p.userId === currentUser?.id;
                    return (
                      <div
                        key={p.id}
                        className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
                          isMe
                            ? 'bg-[#2E2922] border-[#BD4444]/40'
                            : 'bg-[#24211D] border-[#38332A]'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-[#3D382E] text-[#FDF8F0] font-bold text-xs flex items-center justify-center shrink-0 border border-[#524B3E]">
                          {p.userName ? p.userName.charAt(0) : 'ق'}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-[#FDF8F0] truncate">
                              {p.userName}
                            </span>
                            {isMe && (
                              <span className="text-[9px] bg-[#BD4444]/20 text-[#BD4444] px-1.5 py-0.5 rounded font-bold">
                                أنت
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#A89E8D] truncate mt-0.5">
                            يقرأ: <span className="text-[#DFCEB7]">{p.bookTitle}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
