const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let content = fs.readFileSync(mockDataPath, 'utf8');

const englishBooksData = [
  {
    id: 'EB0001',
    title: 'Atomic Habits',
    category: 'تطوير ذات',
    language: 'en',
    author: 'James Clear',
    pages: 320,
    synopsis: 'Unlock massive success and transform your life—one tiny, game-changing habit at a time!',
    coverUrl: 'https://m.media-amazon.com/images/I/41VTcv2HL1L.jpg'
  },
  {
    id: 'EB0002',
    title: 'Sister, Missing, Book 2',
    category: 'رواية وقصص',
    language: 'en',
    author: 'Sophie McKenzie',
    pages: 250,
    synopsis: "A heart-pounding thriller where a desperate sister races against time and dark family secrets to find her kidnapped sibling before it's too late.",
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/6/9/0/9/6909162a2835d1ba3a6f123db8cb8388cda8d4cc_595970.jpg'
  },
  {
    id: 'EB0003',
    title: 'Sapiens: A Brief History of Humankind',
    category: 'تاريخ',
    language: 'en',
    author: 'Yuval Noah Harari',
    pages: 464,
    synopsis: 'A groundbreaking journey through 70,000 years of human history, exploring how an insignificant ape conquered the planet through shared myths, science, and empire.',
    coverUrl: 'https://m.media-amazon.com/images/I/71f6c5Ay+LL._SX342_.jpg'
  },
  {
    id: 'EB0004',
    title: 'Thinking, Fast and Slow',
    category: 'علمي',
    language: 'en',
    author: 'Daniel Kahneman',
    pages: 512,
    synopsis: 'An eye-opening dive into the human mind, revealing how the constant tug-of-war between fast intuition and slow, deliberate logic shapes every decision we make.',
    coverUrl: 'https://m.media-amazon.com/images/I/71InwoMfGSL._SL1500_.jpg'
  },
  {
    id: 'EB0005',
    title: 'Educated',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Tara Westover',
    pages: 352,
    synopsis: 'An unforgettable memoir of survival and self-reinvention, following a woman who escapes an isolated, survivalist family in the Idaho mountains to teach herself into the world of higher education.',
    coverUrl: 'https://m.media-amazon.com/images/I/61xta2jWBBL._AC_UY327_FMwebp_QL65_.jpg'
  },
  {
    id: 'EB0006',
    title: 'The Psychology Of Money',
    category: 'تاريخ',
    language: 'en',
    author: 'Morgan Housel',
    pages: 256,
    synopsis: "A compelling exploration of wealth, greed, and happiness, proving that financial success isn't about what you know, but how you behave.",
    coverUrl: 'https://m.media-amazon.com/images/I/71si36sM1BL._SL1500_.jpg'
  },
  {
    id: 'EB0007',
    title: 'Deep Work',
    category: 'علمي',
    language: 'en',
    author: 'Cal Newport',
    pages: 304,
    synopsis: 'An indispensable guide to mastering distraction-free focus, showing you how to produce your best results and thrive in an increasingly chaotic, noisy world.',
    coverUrl: 'https://m.media-amazon.com/images/I/71din4TLubL.jpg'
  },
  {
    id: 'EB0008',
    title: "Can't Hurt Me",
    category: 'تطوير ذات',
    language: 'en',
    author: 'David Goggins',
    pages: 364,
    synopsis: "An unvarnished blueprint for mental toughness, tracing one man's brutal journey from rock bottom to Navy SEAL to show how you can conquer your mind and shatter any limit.",
    coverUrl: 'https://m.media-amazon.com/images/I/81VpFFpZTtL._AC_UY327_FMwebp_QL65_.jpg'
  },
  {
    id: 'EB0009',
    title: 'The 7 Habits of Highly Effective People',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Stephen R. Covey',
    pages: 432,
    synopsis: 'A timeless framework for personal and professional success, teaching you how to build lasting greatness from the inside out through character, purpose, and proactive action.',
    coverUrl: 'https://m.media-amazon.com/images/I/810oMMWrltL._SY466_.jpg'
  },
  {
    id: 'EB0010',
    title: 'Outliers: The Story of Success',
    category: 'علمي',
    language: 'en',
    author: 'Malcolm Gladwell',
    pages: 336,
    synopsis: 'An eye-opening look at what truly drives high achievers, revealing that extraordinary success is less about raw talent and far more about hidden advantages, cultural legacy, and timing.',
    coverUrl: 'https://m.media-amazon.com/images/I/61kwmVkSAmL._SL1500_.jpg'
  },
  {
    id: 'EB0011',
    title: "Man's Search for Meaning",
    category: 'علمي',
    language: 'en',
    author: 'Viktor E. Frankl',
    pages: 200,
    synopsis: 'A profound memoir and psychological exploration born from the horrors of Nazi death camps, showing how finding purpose in suffering is the ultimate key to human survival and inner freedom.',
    coverUrl: 'https://m.media-amazon.com/images/I/51m5khg0C1L._SY445_SX342_FMwebp_.jpg'
  },
  {
    id: 'EB0012',
    title: 'Why We Sleep',
    category: 'علمي',
    language: 'en',
    author: 'Matthew Walker',
    pages: 368,
    synopsis: 'A fascinating dive into the science of rest, revealing how sleep dictates your health, brainpower, and longevity—and the hidden dangers of missing out on it.',
    coverUrl: 'https://m.media-amazon.com/images/I/814sf-LvR0L._SL1500_.jpg'
  },
  {
    id: 'EB0013',
    title: 'Start with Why',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Simon Sinek',
    pages: 356,
    synopsis: "A powerful blueprint for inspirational leadership, showing that the world's most influential figures and organizations achieve lasting success by focusing on *why* they do what they do, not just *what*.",
    coverUrl: 'https://m.media-amazon.com/images/I/71NBZIExBCL._SY466_.jpg'
  },
  {
    id: 'EB0014',
    title: 'Shoe Dog',
    category: 'مذكرات',
    language: 'en',
    author: 'Phil Knight',
    pages: 400,
    synopsis: "A candid and thrilling memoir from Nike's co-founder, Phil Knight, chronicling the chaotic, high-stakes early hustle that turned a $50 loan and an imported sneaker side project into a global empire.",
    coverUrl: 'https://m.media-amazon.com/images/I/81tXVF9zTqL._SL1500_.jpg'
  },
  {
    id: 'EB0015',
    title: 'Guns, Germs, and Steel',
    category: 'تاريخ',
    language: 'en',
    author: 'Jared Diamond',
    pages: 528,
    synopsis: 'A groundbreaking look at human history, showing how geography and environment—rather than biological superiority—determined the unequal rise and dominance of civilizations across the globe.',
    coverUrl: 'https://m.media-amazon.com/images/I/71BByzm98gL._SL1200_.jpg'
  },
  {
    id: 'EB0016',
    title: 'Quiet: The Power of Introverts',
    category: 'علمي',
    language: 'en',
    author: 'Susan Cain',
    pages: 352,
    synopsis: 'An empowering exploration of the introverted mind, showing how quiet thinkers, listeners, and creators hold tremendous, undervalued power in a world built for the loudest voices.',
    coverUrl: 'https://m.media-amazon.com/images/I/71BXRqKq4nL.jpg'
  },
  {
    id: 'EB0017',
    title: 'Zero to One',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Peter Thiel',
    pages: 224,
    synopsis: 'A provocative guide to building the future, showing how true innovation comes from creating entirely new, monopoly-scale breakthroughs rather than competing in crowded markets.',
    coverUrl: 'https://cdn2.penguin.com.au/covers/original/9780753555200.jpg'
  },
  {
    id: 'EB0018',
    title: 'Mindset: The New Psychology of Success',
    category: 'علمي',
    language: 'en',
    author: 'Carol S. Dweck',
    pages: 320,
    synopsis: 'A transformative guide to personal achievement, revealing how adopting a "growth mindset" can unlock your potential, reshape your abilities, and revolutionize the way you learn and lead.',
    coverUrl: 'https://m.media-amazon.com/images/I/61vmgqt2W9L._SL1500_.jpg'
  },
  {
    id: 'EB0019',
    title: 'Steve Jobs',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Walter Isaacson',
    pages: 656,
    synopsis: 'An intimate and unsparing biography of Apple’s legendary visionary, capturing the relentless passion, volatile genius, and design obsession that revolutionized multiple global industries.',
    coverUrl: 'https://m.media-amazon.com/images/I/81NSb9Jy0HL.jpg'
  },
  {
    id: 'EB0020',
    title: 'Essentialism: The Disciplined Pursuit of Less',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Greg McKeown',
    pages: 272,
    synopsis: 'A masterclass in intentional living, showing you how to cut through the noise, reclaim your time, and achieve more by doing only what is truly essential.',
    coverUrl: 'https://m.media-amazon.com/images/I/81-PxXFnD7L.jpg'
  },
  {
    id: 'EB0021',
    title: 'Bad Blood: Secrets and Lies in a Silicon Valley Startup',
    category: 'رواية وقصص',
    language: 'en',
    author: 'John Carreyrou',
    pages: 352,
    synopsis: 'A gripping account of the rise and collapse of Theranos, the Silicon Valley company founded by Elizabeth Holmes. The book explores the ambitious claims behind the company, the culture of secrecy that surrounded it, and the deception that eventually led to one of the most notorious scandals in the technology industry.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/71VaZtLA2GL.jpg'
  },
  {
    id: 'EB0022',
    title: '365 Days of Art',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Lorna Scobie',
    pages: 352,
    synopsis: 'An interactive collection of creative exercises designed to inspire artistic expression throughout the year. Each day offers a simple activity or idea that encourages readers to experiment with different forms of art, develop their creativity, and make artistic practice a regular part of everyday life.',
    coverUrl: 'https://m.media-amazon.com/images/I/71+dtsNsPtL._SL1500_.jpg'
  },
  {
    id: 'EB0023',
    title: 'When Breath Becomes Air',
    category: 'مذكرات',
    language: 'en',
    author: 'Paul Kalanithi',
    pages: 256,
    synopsis: 'A deeply personal memoir written by neurosurgeon Paul Kalanithi after being diagnosed with terminal cancer. The book reflects on medicine, mortality, identity, and the meaning of life, offering an emotional exploration of what it means to build a meaningful life while facing death.',
    coverUrl: 'https://m.media-amazon.com/images/I/61gwba1pQnL._SY466_.jpg'
  },
  {
    id: 'EB0024',
    title: 'The Power of Habit',
    category: 'علمي',
    language: 'en',
    author: 'Charles Duhigg',
    pages: 416,
    synopsis: 'A fascinating exploration of how habits are formed and how they influence individual behavior, organizations, and society. The book explains the science behind habits and presents practical ideas for understanding, changing, and developing routines that can lead to lasting personal and professional improvements.',
    coverUrl: 'https://m.media-amazon.com/images/I/71fFIwvOipL._SX342_.jpg'
  },
  {
    id: 'EB0025',
    title: 'Influence: The Psychology of Persuasion',
    category: 'علمي',
    language: 'en',
    author: 'Robert B. Cialdini',
    pages: 336,
    synopsis: "A detailed exploration of the psychological principles that influence people's decisions and behavior. The book examines techniques such as reciprocity, social proof, authority, and scarcity, helping readers understand how persuasion works and how these principles are used in everyday interactions, marketing, and business.",
    coverUrl: 'https://m.media-amazon.com/images/I/717TArPQj1S._SL1500_.jpg'
  },
  {
    id: 'EB0026',
    title: 'Cosmos',
    category: 'علمي',
    language: 'en',
    author: 'Carl Sagan',
    pages: 384,
    synopsis: "A journey through the universe that combines science, history, philosophy, and human curiosity. Carl Sagan explores the origins of the cosmos, the development of life, and humanity's place in the universe, encouraging readers to look at science and the world with a deeper sense of wonder.",
    coverUrl: 'https://cdn.kobo.com/book-images/362a218a-aadd-453e-a97a-5acae38c4f83/1200/1200/False/cosmos-8.jpg'
  },
  {
    id: 'EB0027',
    title: 'Rich Dad Poor Dad',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Robert T. Kiyosaki (co-authored with Sharon Lechter)',
    pages: 302,
    synopsis: "A personal finance book that compares the different approaches to money and investing taught by two influential figures in the author's life. It challenges traditional ideas about education, employment, and wealth, while emphasizing financial literacy, investing, entrepreneurship, and building assets that can generate long-term income.",
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/1/c/b/7/1cb754763fb1d5badbcd73e5ec4e47b5257b69f5_581225.jpg'
  },
  {
    id: 'EB0028',
    title: 'A Brief History of Time',
    category: 'علمي',
    language: 'en',
    author: 'Stephen Hawking',
    pages: 336,
    synopsis: "A popular science book that explores some of the biggest questions about the universe, including the origins of time, black holes, space, and the nature of reality. Stephen Hawking presents complex scientific concepts in an accessible way and invites readers to think about humanity's place within the vast universe.",
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg'
  },
  {
    id: 'EB0029',
    title: 'Flow: The Psychology of Optimal Experience',
    category: 'علمي',
    language: 'en',
    author: 'Mihaly Csikszentmihalyi',
    pages: 336,
    synopsis: 'A psychological exploration of the state of deep concentration and complete involvement known as “flow.” The book explains how people can become fully engaged in meaningful activities and how achieving this state can improve creativity, performance, satisfaction, and overall quality of life.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1678896707i/100488231.jpg'
  },
  {
    id: 'EB0030',
    title: 'The Body Keeps the Score',
    category: 'علمي',
    language: 'en',
    author: 'Bessel van der Kolk',
    pages: 464,
    synopsis: 'A detailed exploration of how traumatic experiences can affect the brain, body, emotions, and behavior. The book examines the relationship between trauma and physical and psychological responses, while discussing different approaches that can help people understand and recover from traumatic experiences.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1697984412i/122888060.jpg'
  },
  {
    id: 'EB0031',
    title: 'Becoming',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Michelle Obama',
    pages: 448,
    synopsis: 'A personal memoir in which Michelle Obama reflects on her childhood, education, family, career, and experiences in public life. Through stories from different stages of her journey, she explores identity, relationships, ambition, challenges, and the experiences that shaped her perspective on life.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg'
  },
  {
    id: 'EB0032',
    title: 'Freakonomics',
    category: 'أدب',
    language: 'en',
    author: 'Steven D. Levitt & Stephen J. Dubner',
    pages: 336,
    synopsis: 'A fascinating look at everyday life through the lens of economics, using unusual questions and surprising data to challenge common assumptions. The book explores how incentives influence human behavior and reveals unexpected connections between seemingly unrelated events and decisions.',
    coverUrl: 'https://m.media-amazon.com/images/I/81JgAez6wHL.jpg'
  },
  {
    id: 'EB0033',
    title: 'Principles: Life and Work',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Ray Dalio',
    pages: 592,
    synopsis: "A collection of principles developed from Ray Dalio's experiences in business, investing, and life. The book presents ideas about decision-making, leadership, learning from mistakes, and building effective organizations, with an emphasis on using clear principles to navigate challenges and achieve meaningful goals.",
    coverUrl: 'https://m.media-amazon.com/images/I/81OlHz-7yPL._SL1500_.jpg'
  },
  {
    id: 'EB0034',
    title: 'Homo Deus: A Brief History of Tomorrow',
    category: 'تاريخ',
    language: 'en',
    author: 'Yuval Noah Harari',
    pages: 450,
    synopsis: "A thought-provoking exploration of humanity's possible future as technology continues to transform society. The book examines artificial intelligence, biotechnology, data, and human evolution while asking how technological progress could change the way people live, work, and understand themselves.",
    coverUrl: 'https://m.media-amazon.com/images/I/412a-nmrw8L.jpg'
  },
  {
    id: 'EB0035',
    title: 'Born a Crime',
    category: 'رواية وقصص',
    language: 'en',
    author: 'Trevor Noah',
    pages: 304,
    synopsis: "A memoir describing Trevor Noah's childhood and upbringing in South Africa during and after apartheid. Through humor and personal stories, the book explores identity, family, poverty, racism, and resilience, offering a unique perspective on growing up in a society shaped by deep social and political divisions.",
    coverUrl: 'https://m.media-amazon.com/images/I/91eGtPznS8L._SL1500_.jpg'
  },
  {
    id: 'EB0036',
    title: 'Grit: The Power of Passion and Perseverance',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Angela Duckworth',
    pages: 368,
    synopsis: 'An exploration of the qualities that help people achieve long-term goals, focusing on passion, persistence, and resilience. The book argues that success is not determined by talent alone and explains how sustained effort and commitment can play a major role in overcoming obstacles and achieving excellence.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1632024090i/27213329.jpg'
  },
  {
    id: 'EB0037',
    title: 'Factfulness',
    category: 'علمي',
    language: 'en',
    author: 'Hans Rosling',
    pages: 352,
    synopsis: 'A data-driven exploration of how people often misunderstand the world and its progress. The book identifies common ways of thinking that lead to misconceptions about poverty, health, population, and global development, while encouraging readers to use facts and evidence to form a more accurate view of reality.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1544963815i/34890015.jpg'
  },
  {
    id: 'EB0038',
    title: 'The Lean Startup',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Eric Ries',
    pages: 336,
    synopsis: 'A practical guide to building businesses and developing products in uncertain environments. The book introduces the Lean Startup approach, which emphasizes experimentation, customer feedback, rapid learning, and continuous improvement to help entrepreneurs create products that people actually need while reducing wasted time and resources.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1629999184i/10127019.jpg'
  },
  {
    id: 'EB0039',
    title: 'Range: Why Generalists Triumph in a Specialized World',
    category: 'تطوير ذات',
    language: 'en',
    author: 'David Epstein',
    pages: 352,
    synopsis: 'An exploration of how people with broad knowledge and diverse experiences can succeed in a world that increasingly values specialization. The book examines the benefits of learning across different fields, adapting to new situations, and developing a wide range of skills rather than focusing exclusively on one narrow area.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1550048292i/41795733.jpg'
  },
  {
    id: 'EB0040',
    title: 'The Black Swan',
    category: 'فلسفة',
    language: 'en',
    author: 'Nassim Nicholas Taleb',
    pages: 400,
    synopsis: 'Highlights the benefits of diverse experiences and their role in problem-solving and achieving success.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1714172313i/242472.jpg'
  },
  {
    id: 'EB0041',
    title: 'Antifragile',
    category: 'فلسفة',
    language: 'en',
    author: 'Nassim Nicholas Taleb',
    pages: 544,
    synopsis: 'Discusses the impact of rare and unpredictable events on the economy, society, and decision-making.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1352422827i/13530973.jpg'
  },
  {
    id: 'EB0042',
    title: 'Make Time: How to Focus on What Matters Every Day',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Jake Knapp & John Zeratsky',
    pages: 304,
    synopsis: 'Explains how systems can become stronger when exposed to disorder and stress.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1524067121i/37880811.jpg'
  },
  {
    id: 'EB0043',
    title: 'Daring Greatly',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Brené Brown',
    pages: 304,
    synopsis: 'Provides a practical method for managing time, focusing on priorities, and reducing distractions.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1337110319i/13588356.jpg'
  },
  {
    id: 'EB0044',
    title: 'Show Your Work!',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Austin Kleon',
    pages: 224,
    synopsis: 'Explores courage and emotional vulnerability and their role in building more authentic relationships and lives.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1404580714i/18290401.jpg'
  },
  {
    id: 'EB0045',
    title: 'Steal Like an Artist',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Austin Kleon',
    pages: 160,
    synopsis: 'Encourages sharing ideas and work-in-progress while building an influential creative presence.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1404576602i/13099738.jpg'
  },
  {
    id: 'EB0046',
    title: 'Hooked: How to Build Habit-Forming Products',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Nir Eyal',
    pages: 256,
    synopsis: "Offers advice on developing creativity, learning from others' work, and cultivating a personal style.",
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1407112405i/22668729.jpg'
  },
  {
    id: 'EB0047',
    title: 'Algorithms to Live By',
    category: 'علمي',
    language: 'en',
    author: 'Brian Christian & Tom Griffiths',
    pages: 368,
    synopsis: 'Explains how to build products that encourage repeated use through habits and rewards.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1454296875i/25666050.jpg'
  },
  {
    id: 'EB0048',
    title: 'Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Jake Knapp',
    pages: 288,
    synopsis: 'Connects computer science with everyday life to improve decision-making and problem-solving.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284924i/25814544.jpg'
  },
  {
    id: 'EB0049',
    title: 'Never Split the Difference',
    category: 'فلسفة',
    language: 'en',
    author: 'Chris Voss',
    pages: 288,
    synopsis: 'Presents a five-day methodology for solving problems and testing ideas.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1460910517i/26156469.jpg'
  },
  {
    id: 'EB0050',
    title: 'The Almanack of Naval Ravikant',
    category: 'تطوير ذات',
    language: 'en',
    author: 'Eric Jorgenson',
    pages: 244,
    synopsis: 'Presents practical negotiation techniques based on listening, empathy, and asking questions to achieve the best outcomes.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598011736i/54898389.jpg'
  }
];

const startMarker = '  // --- English Books (EB0001 - EB0050) ---';
const endMarker = 'export const INITIAL_REVIEWS = [';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers in file:', { startIndex, endIndex });
  process.exit(1);
}

// Generate replacement code
const booksCode = englishBooksData.map((b) => {
  return `  {
    id: ${JSON.stringify(b.id)},
    title: ${JSON.stringify(b.title)},
    category: ${JSON.stringify(b.category)},
    language: ${JSON.stringify(b.language)},
    author: ${JSON.stringify(b.author)},
    pages: ${b.pages},
    synopsis: ${JSON.stringify(b.synopsis)},
    coverUrl: ${b.coverUrl ? JSON.stringify(b.coverUrl) : 'null'}
  }`;
}).join(',\n');

const newContent = content.substring(0, startIndex) +
  startMarker + '\n' +
  booksCode + '\n];\n\n' +
  content.substring(endIndex);

fs.writeFileSync(mockDataPath, newContent, 'utf8');
console.log('Successfully updated English books in mockData.js');
