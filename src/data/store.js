import {
  INITIAL_CATEGORIES,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  INITIAL_POSTS,
  INITIAL_COMMUNITIES,
  INITIAL_LIVE_SESSION
} from './mockData';

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'harf_users',
  SESSION: 'harf_session',
  REVIEWS: 'harf_reviews',
  POSTS: 'harf_posts',
  LIVE_SESSION: 'harf_live_session',
  USER_DATA_PREFIX: 'harf_data_'
};

// Safe LocalStorage helpers (wrapped in try/catch)
function safeGet(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
    return false;
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`Error removing localStorage key "${key}":`, e);
    return false;
  }
}

// Simple non-reversible password hash (SHA-256 via Web Crypto API with fallback)
export async function hashPassword(password) {
  if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
    try {
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback below
    }
  }

  // Robust non-reversible deterministic fallback hash
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < password.length; i++) {
    const ch = password.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

// Static Books & Communities
const books = INITIAL_BOOKS;
const communities = INITIAL_COMMUNITIES;

// --- Initialize Feed Data (Seeded if not present) ---
function getStoredReviews() {
  const stored = safeGet(STORAGE_KEYS.REVIEWS, null);
  if (!stored) {
    safeSet(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    return INITIAL_REVIEWS;
  }
  return stored;
}

function getStoredPosts() {
  const stored = safeGet(STORAGE_KEYS.POSTS, null);
  if (!stored) {
    safeSet(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    return INITIAL_POSTS;
  }
  return stored;
}

function getStoredLiveSession() {
  const stored = safeGet(STORAGE_KEYS.LIVE_SESSION, null);
  if (!stored) {
    safeSet(STORAGE_KEYS.LIVE_SESSION, INITIAL_LIVE_SESSION);
    return INITIAL_LIVE_SESSION;
  }
  return stored;
}

// --- User Data Namespace Helper (harf_data_[userId]) ---
export function getUserData(userId) {
  if (!userId) return { library: [], streakDays: 0, streakWeek: [false, false, false, false, false, false, false] };
  const key = `${STORAGE_KEYS.USER_DATA_PREFIX}${userId}`;
  return safeGet(key, {
    library: [],
    streakDays: 0,
    streakWeek: [false, false, false, false, false, false, false]
  });
}

export function saveUserData(userId, data) {
  if (!userId) return false;
  const key = `${STORAGE_KEYS.USER_DATA_PREFIX}${userId}`;
  return safeSet(key, data);
}

// ==========================================
// AUTH & SESSION MANAGEMENT
// ==========================================

export const getSessionUser = async () => {
  await delay(10);
  return safeGet(STORAGE_KEYS.SESSION, null);
};

export const signup = async ({ name, email, password }) => {
  await delay(50);
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (name || '').trim();

  if (!cleanName || !cleanEmail || !password) {
    throw new Error('يرجى تعبئة جميع الحقول المطلوبة');
  }

  const users = safeGet(STORAGE_KEYS.USERS, []);
  const existing = users.find((u) => u.email === cleanEmail);
  if (existing) {
    throw new Error('البريد الإلكتروني مسجل مسبقاً');
  }

  const passwordHash = await hashPassword(password);
  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const newUser = {
    id: userId,
    name: cleanName,
    email: cleanEmail,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  safeSet(STORAGE_KEYS.USERS, users);

  // Initialize empty isolated user data namespace
  saveUserData(userId, {
    library: [],
    streakDays: 0,
    streakWeek: [false, false, false, false, false, false, false]
  });

  // Save active session
  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
  safeSet(STORAGE_KEYS.SESSION, sessionUser);

  return { success: true, user: sessionUser };
};

export const login = async ({ email, password }) => {
  await delay(50);
  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور');
  }

  const users = safeGet(STORAGE_KEYS.USERS, []);
  const passwordHash = await hashPassword(password);

  const user = users.find(
    (u) => u.email === cleanEmail && u.passwordHash === passwordHash
  );

  if (!user) {
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  }

  const sessionUser = { id: user.id, name: user.name, email: user.email };
  safeSet(STORAGE_KEYS.SESSION, sessionUser);

  return { success: true, user: sessionUser };
};

export const logout = async () => {
  await delay(20);
  safeRemove(STORAGE_KEYS.SESSION);
  return { success: true };
};

// ==========================================
// BOOKS & PUBLIC QUERIES
// ==========================================

// 1. getBooks
export const getBooks = async (options = {}) => {
  await delay();
  const { category, search, sort, language } = options;
  const reviews = getStoredReviews();
  let result = [...books];

  if (category && category !== 'الكل') {
    if (category === 'إنجليزي') {
      result = result.filter((b) => b.language === 'en');
    } else {
      result = result.filter((b) => b.category === category);
    }
  }

  if (language) {
    result = result.filter((b) => b.language === language);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.synopsis.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }

  // Attach rating info to each book
  result = result.map((b) => {
    const bookReviews = reviews.filter((r) => r.bookId === b.id);
    const avgRating =
      bookReviews.length > 0
        ? Number((bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1))
        : 0;
    return {
      ...b,
      reviewsCount: bookReviews.length,
      averageRating: avgRating
    };
  });

  if (sort === 'most-discussed') {
    result.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (sort === 'newest') {
    result.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
  }

  return JSON.parse(JSON.stringify(result));
};

// 2. getBook
export const getBook = async (id, userId = null) => {
  await delay();
  const book = books.find((b) => b.id === id);
  if (!book) return null;

  const reviews = getStoredReviews();
  const bookReviews = reviews.filter((r) => r.bookId === id);
  const avgRating =
    bookReviews.length > 0
      ? Number((bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1))
      : 0;

  let userLibEntry = null;
  if (userId) {
    const userData = getUserData(userId);
    userLibEntry = userData.library.find((e) => e.bookId === id) || null;
  }

  return JSON.parse(
    JSON.stringify({
      ...book,
      averageRating: avgRating,
      reviewsCount: bookReviews.length,
      reviews: bookReviews,
      libraryStatus: userLibEntry ? userLibEntry.status : null,
      libraryEntry: userLibEntry || null
    })
  );
};

// ==========================================
// USER LIBRARY & PROGRESS (Namespace: harf_data_[userId])
// ==========================================

// 3. getMyLibrary
export const getMyLibrary = async (userId = null) => {
  await delay();
  if (!userId) return [];

  const userData = getUserData(userId);
  const userEntries = userData.library || [];
  const reviews = getStoredReviews();

  const enrichedEntries = userEntries.map((entry) => {
    const book = books.find((b) => b.id === entry.bookId) || {};
    const bookReviews = reviews.filter((r) => r.bookId === entry.bookId);
    const avgRating =
      bookReviews.length > 0
        ? Number((bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1))
        : 0;

    return {
      ...entry,
      book: {
        ...book,
        averageRating: avgRating,
        reviewsCount: bookReviews.length
      }
    };
  });

  return JSON.parse(JSON.stringify(enrichedEntries));
};

// 4. getUserStats
export const getUserStats = async (userId = null) => {
  await delay(10);
  if (!userId) {
    return {
      finishedCount: 0,
      streakDays: 0,
      streakWeek: [false, false, false, false, false, false, false]
    };
  }

  const userData = getUserData(userId);
  const finishedCount = (userData.library || []).filter((e) => e.status === 'finished').length;

  return {
    finishedCount,
    streakDays: userData.streakDays || 0,
    streakWeek: userData.streakWeek || [false, false, false, false, false, false, false]
  };
};

// 5. addToLibrary
export const addToLibrary = async (bookId, status = 'want', user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const userData = getUserData(user.id);
  const library = userData.library || [];
  const existingIdx = library.findIndex((e) => e.bookId === bookId);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    library[existingIdx].status = status;
    if (status === 'reading' && !library[existingIdx].startedAt) {
      library[existingIdx].startedAt = now;
      if (library[existingIdx].currentPage === 0) {
        library[existingIdx].currentPage = 1;
      }
    } else if (status === 'finished') {
      const b = books.find((x) => x.id === bookId);
      library[existingIdx].currentPage = b ? b.pages : library[existingIdx].currentPage;
      library[existingIdx].finishedAt = now;
    }
  } else {
    library.push({
      userId: user.id,
      bookId,
      status,
      currentPage: status === 'reading' ? 1 : 0,
      startedAt: status === 'reading' ? now : null,
      finishedAt: status === 'finished' ? now : null
    });
  }

  userData.library = library;

  // If starting or updating, ensure streak is updated
  if (status === 'reading' || status === 'finished') {
    userData.streakDays = Math.max(1, userData.streakDays || 1);
    userData.streakWeek = [true, false, false, false, false, false, false];
  }

  saveUserData(user.id, userData);
  return { success: true };
};

// 6. updateProgress
export const updateProgress = async (bookId, currentPage, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const userData = getUserData(user.id);
  const library = userData.library || [];
  const entry = library.find((e) => e.bookId === bookId);
  const book = books.find((b) => b.id === bookId);
  const totalPages = book ? book.pages : 100;
  const pageNumber = Math.max(0, Math.min(totalPages, Number(currentPage) || 0));
  const isFinished = pageNumber >= totalPages;
  const now = new Date().toISOString();

  if (entry) {
    entry.currentPage = pageNumber;
    if (isFinished) {
      entry.status = 'finished';
      entry.finishedAt = now;
    } else if (entry.status !== 'reading') {
      entry.status = 'reading';
      if (!entry.startedAt) entry.startedAt = now;
    }
  } else {
    library.push({
      userId: user.id,
      bookId,
      status: isFinished ? 'finished' : 'reading',
      currentPage: pageNumber,
      startedAt: now,
      finishedAt: isFinished ? now : null
    });
  }

  userData.library = library;
  userData.streakDays = Math.max(1, userData.streakDays || 1);
  userData.streakWeek = [true, false, false, false, false, false, false];

  saveUserData(user.id, userData);
  return { success: true, currentPage: pageNumber };
};

// ==========================================
// REVIEWS & COMMUNITY POSTS (Global persistent feed)
// ==========================================

// 7. addReview
export const addReview = async (bookId, rating, text, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const reviews = getStoredReviews();
  const newReview = {
    id: `rev-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    bookId,
    rating: Number(rating) || 5,
    text: text.trim(),
    createdAt: new Date().toISOString(),
    likedBy: [],
    comments: []
  };

  reviews.unshift(newReview);
  safeSet(STORAGE_KEYS.REVIEWS, reviews);
  return JSON.parse(JSON.stringify(newReview));
};

// 8. toggleLike
export const toggleLike = async (reviewId, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const reviews = getStoredReviews();
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) return null;

  if (!Array.isArray(review.likedBy)) {
    review.likedBy = [];
  }

  const idx = review.likedBy.indexOf(user.id);
  if (idx >= 0) {
    review.likedBy.splice(idx, 1);
  } else {
    review.likedBy.push(user.id);
  }

  safeSet(STORAGE_KEYS.REVIEWS, reviews);
  return {
    liked: review.likedBy.includes(user.id),
    likesCount: review.likedBy.length
  };
};

// 9. addComment
export const addComment = async (reviewId, text, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const reviews = getStoredReviews();
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) return null;

  if (!Array.isArray(review.comments)) {
    review.comments = [];
  }

  const newComment = {
    id: `c-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  review.comments.push(newComment);
  safeSet(STORAGE_KEYS.REVIEWS, reviews);
  return JSON.parse(JSON.stringify(newComment));
};

// 10. getCommunities
export const getCommunities = async () => {
  await delay();
  return JSON.parse(JSON.stringify(communities));
};

// 11. getPosts
export const getPosts = async (category) => {
  await delay();
  const posts = getStoredPosts();
  let result = [...posts];

  if (category && category !== 'الكل') {
    result = result.filter((p) => p.category === category);
  }

  // Enrich with book info
  result = result.map((post) => {
    const book = books.find((b) => b.id === post.bookId);
    return {
      ...post,
      book: book ? JSON.parse(JSON.stringify(book)) : null
    };
  });

  return JSON.parse(JSON.stringify(result));
};

// 12. addPost
export const addPost = async ({ category, bookId, reason }, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const posts = getStoredPosts();
  const newPost = {
    id: `post-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    category,
    bookId,
    reason: reason.trim(),
    createdAt: new Date().toISOString(),
    likedBy: [],
    comments: []
  };

  posts.unshift(newPost);
  safeSet(STORAGE_KEYS.POSTS, posts);

  const book = books.find((b) => b.id === bookId);
  return JSON.parse(
    JSON.stringify({
      ...newPost,
      book: book ? JSON.parse(JSON.stringify(book)) : null
    })
  );
};

// 13. togglePostLike
export const togglePostLike = async (postId, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const posts = getStoredPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  if (!Array.isArray(post.likedBy)) {
    post.likedBy = [];
  }

  const idx = post.likedBy.indexOf(user.id);
  if (idx >= 0) {
    post.likedBy.splice(idx, 1);
  } else {
    post.likedBy.push(user.id);
  }

  safeSet(STORAGE_KEYS.POSTS, posts);
  return {
    liked: post.likedBy.includes(user.id),
    likesCount: post.likedBy.length
  };
};

// 14. addPostComment
export const addPostComment = async (postId, text, user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const posts = getStoredPosts();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  if (!Array.isArray(post.comments)) {
    post.comments = [];
  }

  const newComment = {
    id: `pc-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  post.comments.push(newComment);
  safeSet(STORAGE_KEYS.POSTS, posts);
  return JSON.parse(JSON.stringify(newComment));
};

// 15. getLiveSession
export const getLiveSession = async () => {
  await delay();
  return JSON.parse(JSON.stringify(getStoredLiveSession()));
};

// 16. joinLiveSession
export const joinLiveSession = async (bookTitle = 'مقدمة ابن خلدون', user = null) => {
  await delay();
  if (!user || !user.id) {
    throw new Error('auth_required');
  }

  const session = getStoredLiveSession();
  if (!Array.isArray(session.participants)) {
    session.participants = [];
  }

  const existing = session.participants.find((p) => p.userId === user.id);
  if (!existing) {
    session.participants.unshift({
      id: `p-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      bookTitle
    });
    safeSet(STORAGE_KEYS.LIVE_SESSION, session);
  }

  return JSON.parse(JSON.stringify(session));
};
