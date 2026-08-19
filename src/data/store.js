import {
  INITIAL_USERS,
  INITIAL_CATEGORIES,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  INITIAL_LIBRARY,
  INITIAL_COMMUNITIES,
  INITIAL_POSTS,
  INITIAL_LIVE_SESSION
} from './mockData';

// In-memory reactive state
let users = JSON.parse(JSON.stringify(INITIAL_USERS));
let books = JSON.parse(JSON.stringify(INITIAL_BOOKS));
let reviews = JSON.parse(JSON.stringify(INITIAL_REVIEWS));
let library = JSON.parse(JSON.stringify(INITIAL_LIBRARY));
let communities = JSON.parse(JSON.stringify(INITIAL_COMMUNITIES));
let posts = JSON.parse(JSON.stringify(INITIAL_POSTS));
let liveSession = JSON.parse(JSON.stringify(INITIAL_LIVE_SESSION));

const delay = (ms = 40) => new Promise((resolve) => setTimeout(resolve, ms));

const CURRENT_USER_ID = 'user-1';

// Helper to get current user details
const getCurrentUser = () => {
  return users.find((u) => u.id === CURRENT_USER_ID) || users[0];
};

// 1. getBooks
export const getBooks = async (options = {}) => {
  await delay();
  const { category, search, sort } = options;
  let result = [...books];

  if (category && category !== 'الكل') {
    result = result.filter((b) => b.category === category);
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
    // preserve or reverse id
    result.sort((a, b) => parseInt(b.id.replace('book-', '')) - parseInt(a.id.replace('book-', '')));
  }

  return JSON.parse(JSON.stringify(result));
};

// 2. getBook
export const getBook = async (id) => {
  await delay();
  const book = books.find((b) => b.id === id);
  if (!book) return null;

  const bookReviews = reviews.filter((r) => r.bookId === id);
  const avgRating =
    bookReviews.length > 0
      ? Number((bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1))
      : 0;

  const userLibEntry = library.find((e) => e.userId === CURRENT_USER_ID && e.bookId === id);

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

// 3. getMyLibrary
export const getMyLibrary = async (userId = CURRENT_USER_ID) => {
  await delay();
  const userEntries = library.filter((entry) => entry.userId === userId);

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

// 4. addToLibrary
export const addToLibrary = async (bookId, status = 'want', userId = CURRENT_USER_ID) => {
  await delay();
  const existingIdx = library.findIndex((e) => e.userId === userId && e.bookId === bookId);
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
      userId,
      bookId,
      status,
      currentPage: status === 'reading' ? 1 : 0,
      startedAt: status === 'reading' ? now : null,
      finishedAt: status === 'finished' ? now : null
    });
  }

  return { success: true, isDemo: true };
};

// 5. updateProgress
export const updateProgress = async (bookId, currentPage, userId = CURRENT_USER_ID) => {
  await delay();
  const entry = library.find((e) => e.userId === userId && e.bookId === bookId);
  const book = books.find((b) => b.id === bookId);
  const totalPages = book ? book.pages : 100;
  const pageNumber = Math.max(0, Math.min(totalPages, Number(currentPage) || 0));

  if (entry) {
    entry.currentPage = pageNumber;
    if (pageNumber >= totalPages) {
      entry.status = 'finished';
      entry.finishedAt = new Date().toISOString();
    } else if (entry.status !== 'reading') {
      entry.status = 'reading';
      if (!entry.startedAt) entry.startedAt = new Date().toISOString();
    }
  } else {
    const isFinished = pageNumber >= totalPages;
    library.push({
      userId,
      bookId,
      status: isFinished ? 'finished' : 'reading',
      currentPage: pageNumber,
      startedAt: new Date().toISOString(),
      finishedAt: isFinished ? new Date().toISOString() : null
    });
  }

  return { success: true, isDemo: true, currentPage: pageNumber };
};

// 6. addReview
export const addReview = async (bookId, rating, text, userId = CURRENT_USER_ID) => {
  await delay();
  const user = users.find((u) => u.id === userId) || getCurrentUser();
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
  return JSON.parse(JSON.stringify(newReview));
};

// 7. toggleLike
export const toggleLike = async (reviewId, userId = CURRENT_USER_ID) => {
  await delay();
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) return null;

  const idx = review.likedBy.indexOf(userId);
  if (idx >= 0) {
    review.likedBy.splice(idx, 1);
  } else {
    review.likedBy.push(userId);
  }

  return {
    liked: review.likedBy.includes(userId),
    likesCount: review.likedBy.length
  };
};

// 8. addComment
export const addComment = async (reviewId, text, userId = CURRENT_USER_ID) => {
  await delay();
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) return null;

  const user = users.find((u) => u.id === userId) || getCurrentUser();
  const newComment = {
    id: `c-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  review.comments.push(newComment);
  return JSON.parse(JSON.stringify(newComment));
};

// 9. getCommunities
export const getCommunities = async () => {
  await delay();
  return JSON.parse(JSON.stringify(communities));
};

// 10. getPosts
export const getPosts = async (category) => {
  await delay();
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

// 11. addPost
export const addPost = async ({ category, bookId, reason }, userId = CURRENT_USER_ID) => {
  await delay();
  const user = users.find((u) => u.id === userId) || getCurrentUser();
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
  const book = books.find((b) => b.id === bookId);
  return JSON.parse(
    JSON.stringify({
      ...newPost,
      book: book ? JSON.parse(JSON.stringify(book)) : null
    })
  );
};

// 12. togglePostLike
export const togglePostLike = async (postId, userId = CURRENT_USER_ID) => {
  await delay();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const idx = post.likedBy.indexOf(userId);
  if (idx >= 0) {
    post.likedBy.splice(idx, 1);
  } else {
    post.likedBy.push(userId);
  }

  return {
    liked: post.likedBy.includes(userId),
    likesCount: post.likedBy.length
  };
};

// 13. addPostComment
export const addPostComment = async (postId, text, userId = CURRENT_USER_ID) => {
  await delay();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const user = users.find((u) => u.id === userId) || getCurrentUser();
  const newComment = {
    id: `pc-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  post.comments.push(newComment);
  return JSON.parse(JSON.stringify(newComment));
};

// 14. getLiveSession
export const getLiveSession = async () => {
  await delay();
  return JSON.parse(JSON.stringify(liveSession));
};

// 15. joinLiveSession
export const joinLiveSession = async (bookTitle = 'مقدمة ابن خلدون', userId = CURRENT_USER_ID) => {
  await delay();
  const user = users.find((u) => u.id === userId) || getCurrentUser();
  const existing = liveSession.participants.find((p) => p.userId === user.id);

  if (!existing) {
    liveSession.participants.unshift({
      id: `p-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      bookTitle
    });
  }

  return JSON.parse(JSON.stringify(liveSession));
};

// Current User getter
export const getSessionUser = async () => {
  await delay(10);
  return JSON.parse(JSON.stringify(getCurrentUser()));
};
