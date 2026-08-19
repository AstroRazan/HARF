// Helper to convert Western Arabic digits (0-9) to Eastern Arabic-Indic digits (٠-٩)
export const toArabicDigits = (num) => {
  if (num === null || num === undefined) return '';
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (digit) => arabicDigits[Number(digit)]);
};

// Format a date into Arabic text with Arabic-Indic numerals
export const formatDateArabic = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return dateInput;

  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const day = toArabicDigits(date.getDate());
  const month = months[date.getMonth()];
  const year = toArabicDigits(date.getFullYear());

  return `${day} ${month} ${year}`;
};

// Calculate average rating from a list of reviews
export const calculateAverageRating = (reviews = []) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Number((sum / reviews.length).toFixed(1));
};

// Calculate distribution of ratings (5 to 1 stars)
export const calculateRatingDistribution = (reviews = []) => {
  const total = reviews.length;
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(r => {
    const rating = Math.min(5, Math.max(1, Math.round(r.rating || 0)));
    if (counts[rating] !== undefined) {
      counts[rating]++;
    }
  });

  return [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: counts[stars],
    percentage: total > 0 ? Math.round((counts[stars] / total) * 100) : 0
  }));
};
