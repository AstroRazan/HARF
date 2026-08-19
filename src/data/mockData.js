// Mock Data for "حرف" (Harf) Arabic Reading Community Platform

export const INITIAL_USERS = [
  { id: 'user-1', name: 'أحمد يوسف', avatarInitials: 'أي', isCurrentUser: true },
  { id: 'user-2', name: 'سارة الأحمد', avatarInitials: 'سأ', isCurrentUser: false },
  { id: 'user-3', name: 'طارق منصور', avatarInitials: 'طم', isCurrentUser: false },
  { id: 'user-4', name: 'ريم القحطاني', avatarInitials: 'رق', isCurrentUser: false },
  { id: 'user-5', name: 'عمر السعيد', avatarInitials: 'عس', isCurrentUser: false },
  { id: 'user-6', name: 'مريم خالد', avatarInitials: 'مخ', isCurrentUser: false },
];

export const INITIAL_CATEGORIES = ['تاريخ', 'روايات', 'علمي', 'فلسفة', 'سيرة'];

export const INITIAL_BOOKS = [
  // 1. تاريخ (History)
  {
    id: 'book-1',
    title: 'مقدمة ابن خلدون',
    author: 'عبد الرحمن بن خلدون',
    category: 'تاريخ',
    pages: 580,
    year: 1377,
    coverColor: '#5B7065',
    synopsis: 'تأسيس علم العمران البشري والاجتماع، يحلل فيه ابن خلدون صعود وسقوط الدول والعصبيات عبر رؤية تاريخية وفلسفية استبقت عصرها بقرون.'
  },
  {
    id: 'book-2',
    title: 'فجر الإسلام',
    author: 'أحمد أمين',
    category: 'تاريخ',
    pages: 360,
    year: 1928,
    coverColor: '#7A6B5D',
    synopsis: 'بحث موسع ودقيق في الحياة العقلية والأدبية للأمة العربية وتطورها من العصر الجاهلي حتى أواخر العصر الأموي.'
  },
  {
    id: 'book-3',
    title: 'تاريخ الدولة العثمانية',
    author: 'علي محمد الصلابي',
    category: 'تاريخ',
    pages: 620,
    year: 2001,
    coverColor: '#8C6D53',
    synopsis: 'رصد شامل لعوامل نشأة الدولة العثمانية ومسيرتها القيادية ومعاركها الكبرى حتى سقوطها، مع تحليل وافٍ لأسباب القوة والانحدار.'
  },
  {
    id: 'book-4',
    title: 'تاريخ الشعوب الإسلامية',
    author: 'كارل بروكلمان',
    category: 'تاريخ',
    pages: 740,
    year: 1939,
    coverColor: '#6B7A82',
    synopsis: 'مرجع تاريخي كلاسيكي يستعرض تاريخ الأقطار الإسلامية من المغرب العربي إلى الهند عبر العصور المتتابعة بأسلوب منهجي مكثف.'
  },

  // 2. روايات (Novels)
  {
    id: 'book-5',
    title: 'بين القصرين (ثلاثية القاهرة)',
    author: 'نجيب محفوظ',
    category: 'روايات',
    pages: 530,
    year: 1956,
    coverColor: '#9C6644',
    synopsis: 'الجزء الأول من الملحمة الروائية الخالدة التي تجسد تحولات الأسرة المصرية في حي الحسين بين قيد التقاليد الصارمة ورياح الثورة والتغيير.'
  },
  {
    id: 'book-6',
    title: 'رجال في الشمس',
    author: 'غسان كنفاني',
    category: 'روايات',
    pages: 110,
    year: 1963,
    coverColor: '#B07D62',
    synopsis: 'رواية مكثفة وصادمة عن ثلاثة فلسطينيين من أجيال مختلفة يسعون للوصول إلى الكويت داخل خزان شاحنة تحت شمس حارقة، صرخة ضد الصمت والعجز.'
  },
  {
    id: 'book-7',
    title: 'موسم الهجرة إلى الشمال',
    author: 'الطيب صالح',
    category: 'روايات',
    pages: 170,
    year: 1966,
    coverColor: '#7F5539',
    synopsis: 'صدام الشرق والغرب عبر شخصية مصطفى سعيد، رحلة ملحمية تجمع بين الفكر والدراما النفسية في عمق الريف السوداني وضباب لندن.'
  },
  {
    id: 'book-8',
    title: 'ثلاثية غرناطة',
    author: 'رضوى عاشور',
    category: 'روايات',
    pages: 504,
    year: 1994,
    coverColor: '#8D5B4C',
    synopsis: 'تتبع حياة عائلة أندلسية في حي البيازين بغرناطة إبان سقوط الحكم الإسلامي وفرض التعميد القسري ومحاكم التفتيش، مرثية للأمل والمقاومة.'
  },

  // 3. علمي (Science)
  {
    id: 'book-9',
    title: 'أينشتاين والنسبية',
    author: 'د. مصطفى محمود',
    category: 'علمي',
    pages: 130,
    year: 1961,
    coverColor: '#4A6B6C',
    synopsis: 'تبسيط رائع وعميق للنظرية النسبية الخاصة والعامة مع ربط المفاهيم الفيزيائية لأبعاد الزمان والمكان بالأسئلة الوجودية.'
  },
  {
    id: 'book-10',
    title: 'الكون: أسرار الفضاء والزمن',
    author: 'كارل ساغان',
    category: 'علمي',
    pages: 410,
    year: 1980,
    coverColor: '#3D5A80',
    synopsis: 'رحلة استكشافية مذهلة تمزج بين علم الفلك، والتطور البيولوجي، وتاريخ الحضارات، متسائلة عن مكانة الإنسان في هذا الكون الفسيح.'
  },
  {
    id: 'book-11',
    title: 'فيزياء المستحيل',
    author: 'ميتشيو كاكو',
    category: 'علمي',
    pages: 380,
    year: 2008,
    coverColor: '#293241',
    synopsis: 'استكشاف علمي رصين لإمكانية تحقق تقنيات الخيال العلمي مثل السفر عبر الزمن والاختفاء والانتقال الآني وفق قوانين الفيزياء المعروفة.'
  },
  {
    id: 'book-12',
    title: 'لغة الجينات',
    author: 'ستيف جونز',
    category: 'علمي',
    pages: 350,
    year: 1993,
    coverColor: '#52796F',
    synopsis: 'شرح مشوق لآليات الشفرة الوراثية وتاريخ البشرية المكتوب في خلايانا، وكيف تؤثر الطفرات والبيئة على مصير الكائنات الحية.'
  },

  // 4. فلسفة (Philosophy)
  {
    id: 'book-13',
    title: 'الإسلام بين الشرق والغرب',
    author: 'علي عزت بيجوفيتش',
    category: 'فلسفة',
    pages: 390,
    year: 1980,
    coverColor: '#5C6B73',
    synopsis: 'دراسة فلسفية متعمقة تضع الإسلام كمنهج وسط يوفق بين مادية الغرب وروحانية الشرق، جامعاً بين متطلبات الروح وحاجات الجسد.'
  },
  {
    id: 'book-14',
    title: 'شروط النهضة',
    author: 'مالك بن نبي',
    category: 'فلسفة',
    pages: 180,
    year: 1948,
    coverColor: '#6B705C',
    synopsis: 'تشخيص فكري لعلل العالم الإسلامي وتحليل معادلة الحضارة (إنسان + تراب + وقت)، ومفهوم القابلية للاستعمار كعائق رئيسي للتقدم.'
  },
  {
    id: 'book-15',
    title: 'تهافت التهافت',
    author: 'ابن رشد الأندلسي',
    category: 'فلسفة',
    pages: 420,
    year: 1180,
    coverColor: '#936639',
    synopsis: 'رد فلسفي منهجي من ابن رشد على كتاب الغزالي "تهافت الفلاسفة"، دفاعاً عن مكانة العقل والبرهان الفلسفي وتوافقهما مع الشريعة.'
  },
  {
    id: 'book-16',
    title: 'رسالة في التسامح',
    author: 'جون لوك',
    category: 'فلسفة',
    pages: 120,
    year: 1689,
    coverColor: '#A68A64',
    synopsis: 'أحد أهم النصوص المؤسسة لمفهوم حرية المعتقد والفصل بين سلطة الدولة والشؤون الدينية، مع التأكيد على ضرورة التعايش السلمي.'
  },

  // 5. سيرة (Biography / Memoir)
  {
    id: 'book-17',
    title: 'الأيام',
    author: 'طه حسين',
    category: 'سيرة',
    pages: 310,
    year: 1929,
    coverColor: '#70587C',
    synopsis: 'السيرة الذاتية لعميد الأدب العربي، صاغها بضمير الغائب مستعرضاً طفولته في قرية الصعيد وفقدانه البصر وتحديه للصعاب حتى بلوغ الأزهر والسوربون.'
  },
  {
    id: 'book-18',
    title: 'رحلتي الفكرية: في البذور والجذور والثمر',
    author: 'د. عبد الوهاب المسيري',
    category: 'سيرة',
    pages: 560,
    year: 2005,
    coverColor: '#587B7C',
    synopsis: 'سيرة فكرية تأملية تروي التحولات المعرفية للمفكر المسيري من المادية إلى التوحيد ونشأة مشروعه الموسوعي الرائد.'
  },
  {
    id: 'book-19',
    title: 'حياة في الإدارة',
    author: 'د. غازي القصيبي',
    category: 'سيرة',
    pages: 330,
    year: 1998,
    coverColor: '#4F5D75',
    synopsis: 'مذكرات إدارية ملهمة وممتعة تسرد تجارب الكاتب الوزارية والأكاديمية، مقدماً دروساً ثرية في القيادة والنزاهة وصناعة القرار.'
  },
  {
    id: 'book-20',
    title: 'مذكرات أميرة عربية',
    author: 'إميلي رويتي (سلمى بنت سعيد)',
    category: 'سيرة',
    pages: 280,
    year: 1886,
    coverColor: '#8F5D5D',
    synopsis: 'يوميات أميرة زنجبار وعمان التي تزوجت تاجراً ألمانياً، تصف فيها عادات البلاط السلطاني والحياة الاجتماعية في القرن التاسع عشر.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'book-1',
    rating: 5,
    text: 'كتاب لا يمكن تجاوزه لأي قارئ مهتم بفهم الاجتماع البشري. تحليل ابن خلدون للعصبية ودورات الحضارات مذهل وما زال صالحاً لتفسير أحداث عالمنا المعاصر.',
    createdAt: '2026-06-15T10:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-4'],
    comments: [
      {
        id: 'c-1',
        userId: 'user-3',
        userName: 'طارق منصور',
        text: 'أتفق معك تماماً، خصوصاً فصل طبائع الملك والدول.',
        createdAt: '2026-06-15T12:30:00.000Z'
      }
    ]
  },
  {
    id: 'rev-2',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'book-1',
    rating: 5,
    text: 'المنهج الاستقرائي لابن خلدون يجعل هذه المقدمة أصلاً حقيقياً لعلم الاجتماع قبل أن يعرفه الغرب بقرون. لغة رصينة وفكر ثاقب.',
    createdAt: '2026-07-02T14:15:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-3',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'book-5',
    rating: 5,
    text: 'بين القصرين تحفة أدبية لا تتكرر. نجيب محفوظ يرسم تفاصيل الشخصيات بدقة جراح؛ شخصية السيد أحمد عبد الجواد تجسيد عبقري للتناقض الإنساني.',
    createdAt: '2026-07-10T18:00:00.000Z',
    likedBy: ['user-1', 'user-5', 'user-6'],
    comments: [
      {
        id: 'c-2',
        userId: 'user-1',
        userName: 'أحمد يوسف',
        text: 'وصف محفوظ لطقوس القهوة والسمر في الحسين يجعل القارئ يعيش تلك الحقبة بكل حواسه.',
        createdAt: '2026-07-11T09:20:00.000Z'
      }
    ]
  },
  {
    id: 'rev-4',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'book-5',
    rating: 4,
    text: 'رواية بديعة تأخذك إلى عبق القاهرة التاريخية، الإيقاع بطيء بعض الشيء في البداية لكن التطور الدرامي مذهل.',
    createdAt: '2026-07-18T11:00:00.000Z',
    likedBy: ['user-4'],
    comments: []
  },
  {
    id: 'rev-5',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'book-6',
    rating: 5,
    text: 'رواية تقطع الأنفاس! رمزية الصمت والموت في الصحراء تحرك المشاعر وتطرح السؤال الخالد: لماذا لم يدقوا جدران الخزان؟',
    createdAt: '2026-06-20T16:40:00.000Z',
    likedBy: ['user-1', 'user-2', 'user-3', 'user-4'],
    comments: [
      {
        id: 'c-3',
        userId: 'user-4',
        userName: 'ريم القحطاني',
        text: 'أفضل ما كتب غسان كنفاني بلا شك.',
        createdAt: '2026-06-21T08:10:00.000Z'
      }
    ]
  },
  {
    id: 'rev-6',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'book-6',
    rating: 5,
    text: 'قراءة موجعة ولكنها واجبة. الاقتصاد اللغوي لكنفاني يجعل كل كلمة تضرب في الصميم.',
    createdAt: '2026-06-28T19:30:00.000Z',
    likedBy: ['user-5'],
    comments: []
  },
  {
    id: 'rev-7',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'book-7',
    rating: 4,
    text: 'عمل إشكالي وفذ. مصطفى سعيد شخصية معقدة تجسد أزمة الهوية والانقسام الثقافي بين المستعمِر والمستعمَر.',
    createdAt: '2026-07-05T13:20:00.000Z',
    likedBy: ['user-1', 'user-6'],
    comments: []
  },
  {
    id: 'rev-8',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'book-8',
    rating: 5,
    text: 'ثلاثية غرناطة أبكتني بحق. رضوى عاشور كتبت عن الفقد والهزيمة بلغة ملحمية دافئة لا تغادر الذاكرة أبداً.',
    createdAt: '2026-07-22T20:10:00.000Z',
    likedBy: ['user-1', 'user-2', 'user-5', 'user-6'],
    comments: [
      {
        id: 'c-4',
        userId: 'user-6',
        userName: 'مريم خالد',
        text: 'ماريامة وأبو جعفر من أكثر الشخصيات المؤثرة في الرواية العربية.',
        createdAt: '2026-07-23T10:00:00.000Z'
      }
    ]
  },
  {
    id: 'rev-9',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'book-9',
    rating: 5,
    text: 'د. مصطفى محمود يمتلك قدرة نادرة على تبسيط أعتى المفاهيم الفيزيائية بلغة أدبية عذبة تأسر القارئ وتفتح آفاقه.',
    createdAt: '2026-07-01T15:00:00.000Z',
    likedBy: ['user-1', 'user-3'],
    comments: []
  },
  {
    id: 'rev-10',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'book-9',
    rating: 4,
    text: 'مدخل ممتاز لفهم النسبية وانحناء الزمكان للمبتدئين، مع طابع فلسفي تأملي خاص بالمؤلف.',
    createdAt: '2026-07-12T17:45:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-11',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'book-10',
    rating: 5,
    text: 'كارل ساغان لا يشرح العلم فحسب، بل يجعلك تشعر بالشعر في النجوم وبالتواضع أمام عظمة الكون. كتاب غير نظرتي للعالم.',
    createdAt: '2026-06-18T12:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-5'],
    comments: []
  },
  {
    id: 'rev-12',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'book-11',
    rating: 4,
    text: 'ميتشيو كاكو ينقلنا من الخيال إلى صلب المعادلات العلمية. ممتع ومحفز للتفكير حول مستقبل التكنولوجيا.',
    createdAt: '2026-07-25T14:30:00.000Z',
    likedBy: ['user-4'],
    comments: []
  },
  {
    id: 'rev-13',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'book-13',
    rating: 5,
    text: 'كتاب فارق في الفكر الإسلامي الحديث. تحليل بيجوفيتش للثنائيات (المادة والروح، القانون والأخلاق) عميق ومبتكر للغاية.',
    createdAt: '2026-06-10T11:20:00.000Z',
    likedBy: ['user-1', 'user-2', 'user-4', 'user-5'],
    comments: [
      {
        id: 'c-5',
        userId: 'user-5',
        userName: 'عمر السعيد',
        text: 'أهم كتاب فلسفي قرأته في العقد الأخير دون مبالغة.',
        createdAt: '2026-06-11T16:00:00.000Z'
      }
    ]
  },
  {
    id: 'rev-14',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'book-13',
    rating: 5,
    text: 'قراءة واجبة لكل باحث عن فهم شمولية الإسلام وتركيبه الفريد بين مطالب الحياة الدنيا وقيم الروحانية.',
    createdAt: '2026-06-25T09:40:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-15',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'book-14',
    rating: 5,
    text: 'مالك بن نبي صاحب تشخيص دقيق لواقعنا. فكرة القابلية للاستعمار وشروط النهضة تمثل خارطة طريق فكرية.',
    createdAt: '2026-07-08T18:15:00.000Z',
    likedBy: ['user-1', 'user-3'],
    comments: []
  },
  {
    id: 'rev-16',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'book-15',
    rating: 4,
    text: 'مبارزة فكرية رفيعة المستوى بين قامتين إسلاميتين كبيرتين؛ يظهر فيها اعتزاز ابن رشد بالبرهان العقلي.',
    createdAt: '2026-07-20T19:50:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-17',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'book-17',
    rating: 5,
    text: 'أسلوب طه حسين في الأيام ساحر وإيقاعي. سيرة ذاتية كلاسيكية تلهم العزيمة وتوضح كيف يمكن للإرادة أن تقهر الظلام.',
    createdAt: '2026-06-05T14:00:00.000Z',
    likedBy: ['user-1', 'user-4', 'user-6'],
    comments: []
  },
  {
    id: 'rev-18',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'book-17',
    rating: 5,
    text: 'استخدام ضمير الغائب أضاف للعمل تجريداً فنياً نادراً. من أجمل ما كُتب في أدب السيرة الذاتية باللغة العربية.',
    createdAt: '2026-06-12T16:30:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-19',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'book-18',
    rating: 5,
    text: 'المسيري يفتح قلبه وعقله في هذا الكتاب. سيرة فكرية تأسيسية تشرح كيفية بناء النماذج التفسيرية ومواجهة النزعة المادية.',
    createdAt: '2026-07-14T21:00:00.000Z',
    likedBy: ['user-1', 'user-5'],
    comments: []
  },
  {
    id: 'rev-20',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'book-19',
    rating: 5,
    text: 'كتاب ممتع للغاية ومليء بالحكمة العملية والفكاهة الذكية. غازي القصيبي يقدم دروساً لا تقدر بثمن في الإدارة والحياة.',
    createdAt: '2026-06-29T10:10:00.000Z',
    likedBy: ['user-1', 'user-2', 'user-4', 'user-6'],
    comments: [
      {
        id: 'c-6',
        userId: 'user-2',
        userName: 'سارة الأحمد',
        text: 'فصل مواجهة البيروقراطية من أروع ما قرأت في الإدارة.',
        createdAt: '2026-06-30T11:45:00.000Z'
      }
    ]
  },
  {
    id: 'rev-21',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'book-19',
    rating: 5,
    text: 'صراحة غازي القصيبي وأسلوبه السلس يجعلانك تنهي الكتاب في جلسة واحدة. مرجع إداري وإنساني ملهم.',
    createdAt: '2026-07-16T15:20:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-22',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'book-2',
    rating: 4,
    text: 'أحمد أمين يقدم دراسة تاريخية رصينة وموضوعية لتطور العقل العربي في فجر الإسلام، كتاب تأسيسي لكل باحث.',
    createdAt: '2026-07-28T09:00:00.000Z',
    likedBy: ['user-2', 'user-5'],
    comments: []
  },
  {
    id: 'rev-23',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'book-8',
    rating: 5,
    text: 'غرناطة ليست مجرد مكان، بل هي جرح حضاري وثقت رضوى عاشور تفاصيله بعاطفة جياشة وأمانة تاريخية تستحق التقدير.',
    createdAt: '2026-07-29T18:40:00.000Z',
    likedBy: ['user-1', 'user-4'],
    comments: []
  },
  {
    id: 'rev-24',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'book-12',
    rating: 4,
    text: 'كتاب قيم يفكك طلاسم علم الوراثة المعاصر ويبرز أثر الجينات في تطور المجتمعات البشرية بأسلوب علمي مبسط.',
    createdAt: '2026-07-30T13:10:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-25',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'book-20',
    rating: 4,
    text: 'وثيقة تاريخية واجتماعية فريدة تسلط الضوء على الحياة الشرقية في بلاط زنجبار من منظور نسائي نادر وصادق.',
    createdAt: '2026-08-01T16:00:00.000Z',
    likedBy: ['user-1', 'user-6'],
    comments: []
  }
];

export const INITIAL_LIBRARY = [
  {
    userId: 'user-1',
    bookId: 'book-1',
    status: 'reading',
    currentPage: 240,
    startedAt: '2026-08-01T08:00:00.000Z',
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'book-5',
    status: 'reading',
    currentPage: 380,
    startedAt: '2026-08-05T12:00:00.000Z',
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'book-8',
    status: 'want',
    currentPage: 0,
    startedAt: null,
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'book-9',
    status: 'finished',
    currentPage: 130,
    startedAt: '2026-07-01T10:00:00.000Z',
    finishedAt: '2026-07-12T17:45:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'book-13',
    status: 'finished',
    currentPage: 390,
    startedAt: '2026-06-15T09:00:00.000Z',
    finishedAt: '2026-07-05T18:30:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'book-17',
    status: 'finished',
    currentPage: 310,
    startedAt: '2026-05-20T11:00:00.000Z',
    finishedAt: '2026-06-10T14:20:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'book-19',
    status: 'finished',
    currentPage: 330,
    startedAt: '2026-07-15T10:00:00.000Z',
    finishedAt: '2026-07-28T20:00:00.000Z'
  }
];

export const INITIAL_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'تاريخ',
    category: 'تاريخ',
    description: 'نقاشات حول وقائع التاريخ، صعود الحضارات، والوثائق المؤسسة للثقافة الإنسانية.'
  },
  {
    id: 'comm-2',
    name: 'روايات',
    category: 'روايات',
    description: 'قراءات في السرد والدراما والشخصيات وتحليلات الرواية العربية والعالمية.'
  },
  {
    id: 'comm-3',
    name: 'علمي',
    category: 'علمي',
    description: 'استكشاف أسرار الكون، الفيزياء، علم الأحياء، وتبسيط العلوم لعموم القراء.'
  },
  {
    id: 'comm-4',
    name: 'فلسفة',
    category: 'فلسفة',
    description: 'حوارات فكرية حول قضايا الوجود والمعرفة والأخلاق ومناهج التفكير النقدي.'
  },
  {
    id: 'comm-5',
    name: 'سيرة',
    category: 'سيرة',
    description: 'استلهام العبر من مسارات القادة والمفكرين والأدباء ومذكراتهم الشخصية.'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    category: 'تاريخ',
    bookId: 'book-1',
    reason: 'أنصح كل من يريد بناء رؤية نقدية للتاريخ بقراءة مقدمة ابن خلدون، فهي ليست مجرد سرد للوقائع بل نظرية متكاملة في العمران.',
    createdAt: '2026-08-10T11:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-4'],
    comments: [
      {
        id: 'pc-1',
        userId: 'user-3',
        userName: 'طارق منصور',
        text: 'أفضل استثمار لوقت القراءة هذا العام.',
        createdAt: '2026-08-10T14:30:00.000Z'
      }
    ]
  },
  {
    id: 'post-2',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    category: 'روايات',
    bookId: 'book-8',
    reason: 'ثلاثية غرناطة لرضوى عاشور تمس الروح وتجعلك تشعر بوطأة التاريخ وعظمة التشبث بالذاكرة واللغة حتى آخر رمق.',
    createdAt: '2026-08-12T15:20:00.000Z',
    likedBy: ['user-1', 'user-5', 'user-6'],
    comments: []
  },
  {
    id: 'post-3',
    userId: 'user-3',
    userName: 'طارق منصور',
    category: 'فلسفة',
    bookId: 'book-13',
    reason: 'كتاب الإسلام بين الشرق والغرب يقدم إجابات عقلانية رصينة عن التحديات الفكرية المعاصرة وتناقضات الحضارة المادية.',
    createdAt: '2026-08-14T09:15:00.000Z',
    likedBy: ['user-1', 'user-2'],
    comments: []
  },
  {
    id: 'post-4',
    userId: 'user-6',
    userName: 'مريم خالد',
    category: 'علمي',
    bookId: 'book-10',
    reason: 'كتاب الكون لكارل ساغان يفتح عينيك على روعة العلم بأسلوب شاعري ساحر، لن تندم على تخصيص وقتك له.',
    createdAt: '2026-08-15T18:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-5'],
    comments: []
  },
  {
    id: 'post-5',
    userId: 'user-5',
    userName: 'عمر السعيد',
    category: 'سيرة',
    bookId: 'book-19',
    reason: 'حياة في الإدارة لغازي القصيبي يجمع بين الفائدة الإدارية والأسلوب الأدبي المشوق، كتاب لا تمل من إعادة قراءته.',
    createdAt: '2026-08-16T13:40:00.000Z',
    likedBy: ['user-2', 'user-4', 'user-6'],
    comments: []
  }
];

export const INITIAL_LIVE_SESSION = {
  active: true,
  timerMinutes: 25,
  title: 'جلسة قراءة صامتة مسائية',
  participants: [
    { id: 'p-1', userId: 'user-2', userName: 'سارة الأحمد', bookTitle: 'مقدمة ابن خلدون' },
    { id: 'p-2', userId: 'user-3', userName: 'طارق منصور', bookTitle: 'الإسلام بين الشرق والغرب' },
    { id: 'p-3', userId: 'user-4', userName: 'ريم القحطاني', bookTitle: 'ثلاثية غرناطة' },
    { id: 'p-4', userId: 'user-6', userName: 'مريم خالد', bookTitle: 'الكون: أسرار الفضاء والزمن' }
  ]
};
