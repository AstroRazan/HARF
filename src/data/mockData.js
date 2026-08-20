// Mock Data for "حرف" (Harf) Arabic Reading Community Platform

export const INITIAL_USERS = [
  { id: 'user-1', name: 'أحمد يوسف', avatarInitials: 'أي', isCurrentUser: true },
  { id: 'user-2', name: 'سارة الأحمد', avatarInitials: 'سأ', isCurrentUser: false },
  { id: 'user-3', name: 'طارق منصور', avatarInitials: 'طم', isCurrentUser: false },
  { id: 'user-4', name: 'ريم القحطاني', avatarInitials: 'رق', isCurrentUser: false },
  { id: 'user-5', name: 'عمر السعيد', avatarInitials: 'عس', isCurrentUser: false },
  { id: 'user-6', name: 'مريم خالد', avatarInitials: 'مخ', isCurrentUser: false },
];

export const INITIAL_CATEGORIES = [
  'أدب',
  'رواية وقصص',
  'تاريخ',
  'فلسفة',
  'علمي',
  'تطوير ذات',
  'مذكرات',
  'سيرة ذاتية'
];

export const INITIAL_BOOKS = [
  // --- Arabic Books (AB0001 - AB0048) ---
  {
    id: 'AB0001',
    title: 'أربعون 40',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'أحمد الشقيري',
    pages: 267,
    synopsis: 'عمل تأملي يجمع فيه الكاتب مجموعة من التجارب والأفكار التي مر بها خلال مراحل مختلفة من حياته، ويتناول موضوعات مثل النفس والحياة والعلاقات والتغيير. يقدم الكتاب خلاصة تجارب بأسلوب بسيط يدعو القارئ إلى التأمل وإعادة النظر في كثير من تفاصيل حياته اليومية.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1546894949i/43500899.jpg'
  },
  {
    id: 'AB0002',
    title: 'أريد ان أعيش',
    category: 'فلسفة',
    language: 'ar',
    author: 'دار مدارك للنشر',
    pages: 152,
    synopsis: 'كتاب يتناول معنى الحياة والرغبة في عيشها بصورة أكثر وعيًا ورضا، ويناقش مجموعة من المشاعر والتجارب التي يمر بها الإنسان في رحلته. يقدم أفكارًا تساعد على تجاوز الصعوبات والتمسك بالأمل والاستمتاع بالتفاصيل الصغيرة التي تمنح الحياة معناها.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/j/b/jbb603124.jpg'
  },
  {
    id: 'AB0003',
    title: 'الحلم الكبير',
    category: 'مذكرات',
    language: 'ar',
    author: 'عمر الجريسي',
    pages: 407,
    synopsis: 'كتاب يدور حول الطموح والسعي نحو تحقيق الأحلام، ويستعرض أهمية الإيمان بالهدف والاستمرار في العمل رغم العقبات. يقدم مجموعة من الأفكار والتجارب التي تشجع القارئ على تطوير ذاته وعدم الاستسلام أمام الصعوبات التي قد تواجهه في طريق النجاح.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/a/5/f/3/a5f3bd83fc053c63a1e2919e2af0e97f2f923019_JRB5000011859.jpg'
  },
  {
    id: 'AB0004',
    title: 'السما',
    category: 'علمي',
    language: 'ar',
    author: 'شادي عبدالحافظ',
    pages: 334,
    synopsis: 'عمل أدبي يتناول مجموعة من المشاعر والأفكار الإنسانية بأسلوب أدبي وتأملي، ويركز على علاقة الإنسان بما حوله وما يختبئ خلف الأحداث اليومية من معانٍ ومشاعر. يأخذ القارئ في رحلة هادئة بين التأمل والخيال والواقع.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1/delta/563133.jpg'
  },
  {
    id: 'AB0005',
    title: 'رسالة الغفران',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'أبو العلاء المعري',
    pages: 342,
    synopsis: 'عمل أدبي نثري فريد ألفه الشاعر والفيلسوف العباسي أبو العلاء المعري (توفي 449 هـ) في أسلوب خيالي ساخر. وتعد من أمهات كتب التراث العربي، وقيل إنها ألهمت الكاتب الإيطالي دانتي أليغييري في كتابة ملحمته الشهيرة "الكوميديا الإلهية".',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/2/4/241435.jpg'
  },
  {
    id: 'AB0006',
    title: 'حياة في الإدارة',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'غازي عبد الرحمن القصيبي',
    pages: 360,
    synopsis: 'كتاب يستعرض تجربة عملية في عالم الإدارة، ويقدم مجموعة من المواقف والتجارب التي مر بها الكاتب خلال مسيرته المهنية. يتناول أساليب القيادة واتخاذ القرارات والتعامل مع الموظفين والتحديات الإدارية، ويقدم دروسًا عملية يمكن الاستفادة منها في بيئة العمل.',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/ar/archive/3/3e/20170619004501%21%D8%BA%D9%84%D8%A7%D9%81_%D9%83%D8%AA%D8%A7%D8%A8_%D8%AD%D9%8A%D8%A7%D8%A9_%D9%81%D9%8A_%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9.jpg'
  },
  {
    id: 'AB0007',
    title: 'من البادية إلى عالم النفط',
    category: 'مذكرات',
    language: 'ar',
    author: 'علي بن إبراهيم النعيمي',
    pages: 293,
    synopsis: 'عمل يوثق التحولات الكبيرة التي شهدها المجتمع السعودي مع الانتقال من الحياة البدوية التقليدية إلى مرحلة اكتشاف النفط وبناء الدولة الحديثة. يستعرض الكتاب جوانب من الحياة الاجتماعية والاقتصادية والتغيرات التي رافقت هذه المرحلة المهمة من تاريخ المملكة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/4/7/471956.jpg'
  },
  {
    id: 'AB0008',
    title: 'موسم الهجرة إلى الشمال',
    category: 'الأدب واللغة',
    language: 'ar',
    author: 'الطيب صالح',
    pages: 170,
    synopsis: 'رواية أدبية تتناول رحلة الإنسان بين ثقافتين مختلفتين، وتناقش قضايا الهوية والانتماء والصراع بين الشرق والغرب. من خلال أحداث الرواية وشخصياتها، يستعرض الكاتب تأثير الماضي والثقافة والتجارب الشخصية في تشكيل الإنسان وعلاقته بالمجتمع من حوله.',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/ar/c/ce/%D9%85%D9%88%D8%B3%D9%85_%D8%A7%D9%84%D9%87%D8%AC%D8%B1%D8%A9_%D8%A5%D9%84%D9%89_%D8%A7%D9%84%D8%B4%D9%85%D8%A7%D9%84.jpg'
  },
  {
    id: 'AB0009',
    title: 'ثلاثية القاهرة (بين القصرين)',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'نجيب محفوظ',
    pages: 510,
    synopsis: 'رواية تصور الحياة الاجتماعية والسياسية لأسرة مصرية خلال فترة تاريخية مليئة بالتغيرات والتحولات. تقدم الرواية تفاصيل دقيقة عن العلاقات الأسرية والعادات والتقاليد والصراعات بين الأجيال، إلى جانب انعكاس الأحداث السياسية على حياة الأفراد والمجتمع.',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/ar/2/2c/%D8%A8%D9%8A%D9%86_%D8%A7%D9%84%D9%82%D8%B5%D8%B1%D9%8A%D9%86.jpg'
  },
  {
    id: 'AB0010',
    title: 'قواعد العشق الأربعون',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'إليف شافاك (ترجمة: خالد الجبيلي)',
    pages: 500,
    synopsis: 'رواية تجمع بين الحب والتصوف والفلسفة، وتتناول قصة جلال الدين الرومي وشمس التبريزي وما أحدثه هذا اللقاء من تحول فكري وروحي. تقدم الرواية مجموعة من القواعد والتأملات حول الحب والتسامح والإيمان، وتربط بين أحداث الماضي وأسئلة الإنسان في الحاضر.',
    coverUrl: 'https://media.zid.store/5abe3ad7-c146-46bc-8483-178207add9c7/dd5f2e5a-fe68-4793-b308-1331305b6ed9.jpeg'
  },
  {
    id: 'AB0011',
    title: 'رجال في الشمس',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'غسان كنفاني',
    pages: 110,
    synopsis: 'رواية قصيرة تتناول معاناة ثلاثة فلسطينيين يحاولون البحث عن حياة أفضل وسط ظروف قاسية. تعكس الرواية واقع اللجوء والفقر وفقدان الوطن، وتقدم صورة مؤثرة عن الأمل واليأس والقرارات التي قد يضطر الإنسان لاتخاذها في سبيل النجاة.',
    coverUrl: 'https://sadimbook.com/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-22-at-12.02.14-PM.jpeg'
  },
  {
    id: 'AB0012',
    title: 'ذاكرة الجسد',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'أحلام مستغانمي',
    pages: 400,
    synopsis: 'رواية أدبية تجمع بين الحب والذاكرة والتاريخ، وتحكي تجربة إنسان يعيش صراعًا بين ماضيه ومشاعره وحاضره. تتداخل في أحداثها قصة الحب مع التحولات السياسية والاجتماعية، لتقدم صورة عميقة عن تأثير الذاكرة في الإنسان وعلاقته بالآخرين.',
    coverUrl: 'https://upload.wikimedia.org/wikipedia/ar/f/fe/%D8%B0%D8%A7%D9%83%D8%B1%D8%A9_%D8%A7%D9%84%D8%AC%D8%B3%D8%AF.jpg'
  },
  {
    id: 'AB0013',
    title: 'عزازيل',
    category: 'تاريخ',
    language: 'ar',
    author: 'يوسف زيدان',
    pages: 380,
    synopsis: 'رواية تاريخية تدور أحداثها في القرن الخامس الميلادي، وتتناول رحلة راهب يعيش صراعات فكرية وروحية بين الإيمان والشك. تستعرض الرواية قضايا الدين والفلسفة والسلطة والصراع الداخلي، من خلال أحداث وشخصيات تعكس أجواء تلك المرحلة التاريخية.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/8/a/2/2/8a2265a20bbb43b37c27a233e9029a8da989c10e_JRB5000001180.jpg'
  },
  {
    id: 'AB0014',
    title: 'الأيام',
    category: 'مذكرات',
    language: 'ar',
    author: 'طه حسين',
    pages: 216,
    synopsis: 'سيرة أدبية يروي فيها طه حسين مراحل من طفولته وشبابه ورحلته الطويلة في طلب العلم، متحدثًا عن الصعوبات التي واجهها منذ صغره. يقدم الكتاب صورة مؤثرة عن قوة الإرادة والتعليم، ويكشف تفاصيل الحياة الاجتماعية والتعليمية في مصر خلال تلك الفترة.',
    coverUrl: null
  },
  {
    id: 'AB0015',
    title: 'حديقة الغروب',
    category: 'الأدب واللغة',
    language: 'ar',
    author: 'غازي عبد الرحمن القصيبي',
    pages: 78,
    synopsis: 'عمل أدبي يتناول مجموعة من المشاعر الإنسانية المرتبطة بالحب والحنين والفقد وتأمل مراحل الحياة. يستخدم الكاتب لغة شاعرية وتأملية ليعبر عن الذكريات وتغير الإنسان مع مرور الزمن، ويأخذ القارئ في رحلة بين الماضي والحاضر.',
    coverUrl: 'https://daralzaman.sa/wp-content/uploads/2025/03/0010570_-.jpeg'
  },
  {
    id: 'AB0016',
    title: 'مقدمة ابن خلدون',
    category: 'تاريخ',
    language: 'ar',
    author: 'ابن خلدون',
    pages: 600,
    synopsis: 'عمل فكري وفلسفي يعد من أبرز المؤلفات في دراسة التاريخ والمجتمع والعمران البشري، حيث يبحث ابن خلدون في أسباب قيام الدول وسقوطها وتطور المجتمعات. يناقش الكتاب موضوعات متعددة مثل الاقتصاد والسياسة والتعليم والعادات، ويقدم رؤية عميقة لطبيعة المجتمعات البشرية.',
    coverUrl: 'https://cdn.salla.sa/gbWPN/6c7ab985-a410-4928-b168-fa1d88b4b55e-705x1000-4s6R3FrzlDP1letqHSA44tyvICCV0Kq4NT0iPrF6.jpg'
  },
  {
    id: 'AB0017',
    title: 'مولد أمة',
    category: 'تاريخ',
    language: 'ar',
    author: 'خالد عبدالله العبودي',
    pages: 440,
    synopsis: 'كتاب يتناول مراحل تشكل الأمة وبناء هويتها، ويركز على الأحداث والتحولات التي ساهمت في تأسيس المجتمع والدولة. يقدم قراءة في التاريخ والهوية والإنجازات التي شكلت مسيرة الأمة، مع إبراز أثر الشخصيات والأحداث في صناعة المستقبل.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/5/0/f/7/50f7bfc14c60109c319b5452b085e64db70a1d1e_595534.jpg'
  },
  {
    id: 'AB0018',
    title: 'طوق الحمامة في الأُلفة والألَّاف',
    category: 'فلسفة',
    language: 'ar',
    author: 'ابن حزم الأندلسي',
    pages: 280,
    synopsis: 'عمل أدبي وفلسفي ضخم يتناول الحب وأحوال المحبين والعلاقات الإنسانية، ويقدم ابن حزم من خلاله مجموعة من القصص والتجارب والتحليلات النفسية للحب. يعد الكتاب من أهم كتب التراث العربي، ويجمع بين الأدب والملاحظة الاجتماعية والتحليل الدقيق لمشاعر الإنسان.',
    coverUrl: 'https://cdn.salla.sa/dbqlr/8e727010-9a51-4039-9f9a-dc4f57d510f1-714x1000-LLnEeZUedkvdPS9BZj2fQXLGqDPYd0xPkvePV7qE.jpg'
  },
  {
    id: 'AB0019',
    title: 'الى الظل قوانين للحياة',
    category: 'فلسفة',
    language: 'ar',
    author: 'علي جابر الفيفي',
    pages: 203,
    synopsis: 'كتاب تأملي يقدم مجموعة من الأفكار والقواعد التي تساعد الإنسان على فهم الحياة والتعامل مع مواقفها المختلفة. يتناول موضوعات مثل العلاقات والنجاح والتغيير والرضا، ويقدم للقارئ وقفات تساعده على مراجعة أفكاره وطريقة تعامله مع نفسه ومع الآخرين.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/4/546898.jpg'
  },
  {
    id: 'AB0020',
    title: 'تاريخ المملكة العربية السعودية الجزء الاول',
    category: 'تاريخ',
    language: 'ar',
    author: 'عبدالله الصالح العثيمين',
    pages: 287,
    synopsis: 'كتاب يستعرض جوانب من تاريخ المملكة العربية السعودية ومراحل تأسيسها وتطورها، ويتناول الأحداث والشخصيات التي ساهمت في بناء الدولة. يقدم للقارئ صورة عن التحولات السياسية والاجتماعية والاقتصادية التي مرت بها المملكة وصولًا إلى مراحلها الحديثة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/2/521215.jpg'
  },
  {
    id: 'AB0021',
    title: 'العالم المفقود',
    category: 'أدب',
    language: 'ar',
    author: 'آرثر كونان دويل',
    pages: 332,
    synopsis: 'رواية مغامرات وخيال تأخذ القارئ في رحلة إلى مكان غامض بعيد عن العالم المعروف، حيث يواجه الأبطال مجموعة من الأحداث والمخاطر غير المتوقعة. تجمع الرواية بين الاستكشاف والإثارة والخيال، وتقدم تجربة مليئة بالمغامرات والاكتشافات.',
    coverUrl: 'https://d11v1jq8owgw3u.cloudfront.net/wp-content/uploads/2022/01/31172222/3lemmfkod.jpg'
  },
  {
    id: 'AB0022',
    title: 'افضل نسخة منك',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'مودي عبدربه',
    pages: 148,
    synopsis: 'دليل عملي لتطوير الذات وبناء الوعي. يقدم الكاتب بأسلوب ودي وقريب من القلب رحلة صادقة لاستكشاف النفس، والتصالح مع الذات بعيداً عن ضغوط المثالية، لمساعدة القارئ على تجاوز عثرات الحياة والنهوض من جديد.',
    coverUrl: 'https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=85,metadata=none,format=auto/https://ak-asset.jarir.com/akeneo-prod/asset/c/a/b/5/cab58930fa3d4aaef475e7d547031d4fab7d614c_664508.jpg'
  },
  {
    id: 'AB0023',
    title: 'الليالي البيضاء',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'فيودور دوستويفسكي',
    pages: 144,
    synopsis: 'رواية عاطفية قصيرة للكاتب الروسي فيودور دوستويفسكي، تدور أحداثها خلال أربع ليالٍ في مدينة سانت بطرسبرغ، وتستعرض مشاعر العزلة والحب غير المتبادل واللقاء العابر بين شاب حالم وفتاة تنتظر حبيبها.',
    coverUrl: 'https://f.top4top.io/p_3883wvidy1.png'
  },
  {
    id: 'AB0024',
    title: 'الأجنحة المتكسرة',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'جبران خليل جبران',
    pages: 130,
    synopsis: 'رواية رومانسية كلاسيكية للأديب جبران خليل جبران، يسرد فيها بأسلوب شاعري قصة حب عذري ومأساوي في بيروت، منتقداً القيود الاجتماعية والتقاليد والأطماع المادية التي تقف عائقاً أمام حرية القلب والمشاعر.',
    coverUrl: 'https://i.pinimg.com/474x/20/fc/cc/20fccc3c52b82da54865a94cae0f553a.jpg'
  },
  {
    id: 'AB0025',
    title: 'في قلبي أنثى عبرية',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'خولة حمدي',
    pages: 385,
    synopsis: 'رواية مستوحاة من أحداث حقيقية للكاتبة خولة حمدي، تدور أحداثها بين تونس وجنوب لبنان، وتتناول قصة حب تجمع بين شاب مسلم وفتاة يهودية وسط صراعات الهوية والدين والتسامح والتعايش الإنساني.',
    coverUrl: null
  },
  {
    id: 'AB0026',
    title: 'المرونة النفسية',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'بندر آل جلالة',
    pages: 177,
    synopsis: 'دليل تطويري ونفسي يوضح كيفية بناء القدرة على التعافي والتكيف السريع مع الصدمات وتقلبات الحياة، مساعداً القارئ على تحويل الضغوط والتحديات إلى فرص للنمو والنضج الذاتي.',
    coverUrl: 'https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=85,metadata=none,format=auto/https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/4/544166.jpg'
  },
  {
    id: 'AB0027',
    title: 'مع الزمان محطات في الحياة',
    category: 'مذكرات',
    language: 'ar',
    author: 'محمد عبدالوهاب أبو ملحة',
    pages: 504,
    synopsis: 'كتاب يجمع بين السيرة الذاتية والتأملات الحياتية، يستعرض فيه الكاتب محطات بارزة وتجارب شخصية وخبرات تراكمت عبر السنين، مقدماً دروساً وعِبراً ملهمة حول مسارات الحياة وتقلباتها.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/4/5/453358.jpg'
  },
  {
    id: 'AB0028',
    title: 'ساق البامبو',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'سعود السنعوسي',
    pages: 396,
    synopsis: 'رواية حائزة على جائزة البوكر العربية للكاتب الكويتي سعود السنعوسي، تناقش بعمق إشكالية الهوية والانتماء والاغتراب من خلال قصة شاب وُلد لأب كويتي وأم فلبينية ويبحث عن الاعتراف والقبول في مجتمعه.',
    coverUrl: 'https://2.bp.blogspot.com/-edq1XGOGHck/XIhN0PzS1sI/AAAAAAAAAnk/toLdir_QZpgFSkL9wVHmv-EH3yXbROmrwCLcBGAs/s1600/46368451_254983658510321_1369705576807253521_n.jpg'
  },
  {
    id: 'AB0029',
    title: 'رحلة الى الماضي',
    category: 'أدب',
    language: 'ar',
    author: 'شتيفان تسفايغ',
    pages: 77,
    synopsis: 'كتاب توثيقي يستحضر عبق الزمن الجميل وذكريات الأيام الخالية، متنقلاً بين تفاصيل الحياة القديمة وبساطة العيش وعادات الناس التي طواها تطور العصر الحديث.',
    coverUrl: 'https://f.top4top.io/p_388352qmg1.png'
  },
  {
    id: 'AB0030',
    title: 'الذاكرة الشعبية',
    category: 'تاريخ',
    language: 'ar',
    author: 'عبدالرحمن عبدالله الشقير',
    pages: 184,
    synopsis: 'عمل يركز على توثيق التراث الشفهي والثقافة المجتمعية، جامعاً الحكايات والعادات والتقاليد والأمثال المتوارثة التي شكلت الوجدان الجمعي والهوية الثقافية للمجتمع عبر الأجيال.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1/delta/549755.jpg'
  },
  {
    id: 'AB0031',
    title: 'أكسير الطمأنينة',
    category: 'فلسفة',
    language: 'ar',
    author: 'علي العبيدلي',
    pages: 170,
    synopsis: 'كتاب إيماني يركز على تزكية النفس وبناء السكينة القلبية، يقدم تأملات روحية عميقة ترشد القارئ إلى التحرر من القلق ومخاوف الحياة عبر اليقين وحسن التوكل على الله.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/9/c/6/d/9c6d3c4bd26be408bd1182043ac4cc3b35cf4908_625613.jpg'
  },
  {
    id: 'AB0032',
    title: 'أولاد حارتنا',
    category: 'فلسفة',
    language: 'ar',
    author: 'نجيب محفوظ',
    pages: 566,
    synopsis: 'رواية رمزية وفلسفية شهيرة للأديب العالمي نجيب محفوظ، تستعرض مسيرة البشرية وصراعها الأزلي من أجل العدالة والحرية والكرامة الإنسانية من خلال أجيال متعاقبة تسكن حارة واحدة.',
    coverUrl: null
  },
  {
    id: 'AB0033',
    title: 'شداد',
    category: 'تاريخ',
    language: 'ar',
    author: 'ابراهيم سرحان',
    pages: 360,
    synopsis: 'رواية فنتازيا ملحمية للكاتب أسامة المسلم، تأخذ القارئ في رحلة مشوقة تدور حول الصراعات والانتقام والشجاعة وسط عوالم أسطورية مليئة بالغموض والإثارة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/e/7/1/5/e71532872dd5ffeb6595018bd930cc86ff4a59e9_676867.jpg'
  },
  {
    id: 'AB0034',
    title: 'مدن الملح (التيه)',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'عبد الرحمن منيف',
    pages: 600,
    synopsis: 'الجزء الأول من ملحمة عبد الرحمن منيف الروائية، يرصد التحولات الاجتماعية والنفسية العاصفة التي طرأت على منطقة شبه الجزيرة العربية وسكانها مع بداية اكتشاف النفط وتغير ملامح المكان.',
    coverUrl: 'https://daroueya.com/wp-content/uploads/2023/04/%D9%85%D8%AF%D9%86-%D8%A7%D9%84%D9%85%D9%84%D8%AD-5-%D8%A8%D8%A7%D8%AF%D9%8A%D8%A9-%D8%A7%D9%84%D8%B8%D9%84%D9%85%D8%A7%D8%AA.jpeg'
  },
  {
    id: 'AB0035',
    title: 'النبي',
    category: 'فلسفة',
    language: 'ar',
    author: 'جبران خليل جبران',
    pages: 120,
    synopsis: 'رائعة الأديب والفيلسوف جبران خليل جبران، يقدم فيها خلاصة تأملاته وفلسفته حول أسمى معاني الحياة كالحب والحرية والعمل والموت عبر نصائح بليغة يوجهها الحكيم «المصطفى» لشعب مدينة أورفليس.',
    coverUrl: 'https://m.media-amazon.com/images/I/71jH7vIn+4L._AC_UF350,350_QL50_.jpg'
  },
  {
    id: 'AB0036',
    title: 'حي بن يقظان',
    category: 'فلسفة',
    language: 'ar',
    author: 'ابن طفيل',
    pages: 140,
    synopsis: 'قصة فلسفية رائدة للفيلسوف ابن طفيل، تروي نشأة طفل بمفرده في جزيرة معزولة، وكيف استطاع التدرج في التفكير واكتشاف أسرار الكون والوصول إلى حقيقة الخالق بمجرد إعمال العقل والتأمل.',
    coverUrl: null
  },
  {
    id: 'AB0037',
    title: 'كليلة ودمنة',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'عبد الله بن المقفع',
    pages: 300,
    synopsis: 'تحفة أدبية خالدة ترجمها وصاغها عبد الله بن المقفع، تتضمن حكايات وقصصاً رمزية على ألسنة الحيوانات والطيور تحمل في طياتها حِكماً سياسية وأخلاقية لإدارة الحكم والحياة الاجتماعية.',
    coverUrl: 'https://www.neelwafurat.com/images/lb/abookstore/covers/carton/103/103257.jpg'
  },
  {
    id: 'AB0038',
    title: 'اركض بقلبك',
    category: 'فلسفة',
    language: 'ar',
    author: 'تركي عبدالله الميمان',
    pages: 346,
    synopsis: 'كتاب يحث على السعي الصادق وتهذيب النفس نحو الغايات الروحية والإنسانية، يجمع بين التوجيه النفسي والتأمل الوجداني ليساعد القارئ على تجاوز العوائق واستعادة شغفه وسلامه الداخلي.',
    coverUrl: 'https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=85,metadata=none,format=auto/https://ak-asset.jarir.com/akeneo-prod/asset/7/e/5/5/7e5510ba9fef747d877294530d0b642d5efdf206_624731.jpg'
  },
  {
    id: 'AB0039',
    title: 'ألف شمس ساطعة',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'خالد حسيني (ترجمة عربية)',
    pages: 400,
    synopsis: 'رواية درامية مؤثرة للروائي خالد حسيني، ترصد واقع المرأة الأفغانية خلال عقود من الحروب والاضطرابات، متناولةً قصة امرأتين تجمعهما المحن وصمود الروح الإنسانية في وجه القهر.',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1359885604i/17310208.jpg'
  },
  {
    id: 'AB0040',
    title: 'وألقيت عليك محبة مني',
    category: 'علمي',
    language: 'ar',
    author: 'رولا خرسا',
    pages: 272,
    synopsis: 'كتاب وجداني تأملي يستمد رسائله من فيض المعاني القرآنية، يهدف إلى غرس مشاعر الأنس والسكينة في القلوب وتذكير القارئ برحمة الله وألطافه الخفية في أدق تفاصيل الحياة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/9/c/a/a/9caa918e5c22335faa53995a7089b896abd1b19b_581084.jpg'
  },
  {
    id: 'AB0041',
    title: 'هو علي هين',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'رولا خرسا',
    pages: 256,
    synopsis: 'كتاب إيماني يبعث الأمل ويجدد اليقين في النفوس، يستعرض كيف تتلاشى الصعاب والمستحيلات أمام قدرة الله وتدبيره، داعياً القارئ إلى حسن الظن واللجوء الدائم للخالق في أوقات الشدة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/3/b/5/8/3b584a81a9841f2e0a56a849f36fac1910c0ffda_633223.jpg'
  },
  {
    id: 'AB0042',
    title: 'متى يستيقظ الناجحون',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'زياد الدريس',
    pages: 132,
    synopsis: 'دليل تطويري وعملي يركز على استثمار الساعات الأولى من اليوم، مستعرضاً العادات والروتين الصباحي للشخصيات المؤثرة وكيفية تنظيم الوقت لتحقيق أعلى مستويات الإنتاجية والنجاح.',
    coverUrl: 'https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=85,metadata=none,format=auto/https://ak-asset.jarir.com/akeneo-prod/asset/m1images/4/4/448877.jpg'
  },
  {
    id: 'AB0043',
    title: 'البخلاء',
    category: 'رواية وقصص',
    language: 'ar',
    author: 'الجاحظ',
    pages: 264,
    synopsis: 'أحد أشهر كلاسيكيات الأدب العربي للجاحظ، يجمع بين الطرافة والتحليل النفسي والاجتماعي عبر رصد قصص ومواقف البخلاء في عصره بأسلوب أدبي ساخر وبلاغة لغوية فريدة.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/4/d/0/a/4d0ab2a072fb2bb27c996eb653e0c786099b6dae_671083.jpg'
  },
  {
    id: 'AB0044',
    title: 'فن اللامبالاه',
    category: 'تطوير ذات',
    language: 'ar',
    author: 'مارك مانسون',
    pages: 272,
    synopsis: 'كتاب شهير في التنمية الذاتية للكاتب مارك مانسون، يطرح رؤية واقعية تتحدى الإيجابية الساذجة، داعياً إلى تقبل المعاناة وتحديد الأولويات والقيم التي تستحق أن يبذل الإنسان طاقته من أجلها.',
    coverUrl: 'https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=85,metadata=none,format=auto/https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/1/511747.jpg'
  },
  {
    id: 'AB0045',
    title: 'رحلة ابن بطوطة',
    category: 'تاريخ',
    language: 'ar',
    author: 'درويش الجويدي',
    pages: 687,
    synopsis: 'وثيقة تاريخية وجغرافية فريدة تسجل مشاهدات الرحالة المسلم ابن بطوطة على مدار نحو ثلاثين عاماً، واصفاً عادات الشعوب، وثقافات البلدان، وأحوال الملوك في شتى بقاع الأرض.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/2/2/223393.jpg'
  },
  {
    id: 'AB0046',
    title: 'قصص العرب',
    category: 'تاريخ',
    language: 'ar',
    author: 'محمد أحمد جاد المولى',
    pages: 1265,
    synopsis: 'موسوعة تراثية تجمع أطرف وأبلغ ما نُقل عن العرب في الجاهلية والإسلام، مبرزةً خصالهم ومروءتهم وشجاعتهم ونوادرهم وأخبار فصحائهم وحكمائهم.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/2/2/b/4/22b4f8b5cd111a4f42cfa761046ef51462112959_216752.jpg'
  },
  {
    id: 'AB0047',
    title: 'مجمع الامثال',
    category: 'أدب',
    language: 'ar',
    author: 'ابوالفضل ابراهيم',
    pages: 1499,
    synopsis: 'أضخم مرجع تراثي في بابه للأديب أحمد بن محمد الميداني، يوثق آلاف الأمثال العربية مع شرح معانيها وسياقاتها وذكر القصص التاريخية التي كانت سبباً في نشأتها.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/m1images/3/0/308220.jpg'
  },
  {
    id: 'AB0048',
    title: 'الشعر والشعراء',
    category: 'أدب',
    language: 'ar',
    author: 'ابن قتيبة',
    pages: 769,
    synopsis: 'من أقدم وأهم عيون التراث الأدبي ونقده في القرن الثالث الهجري. يُعد مرجعاً أساسياً لأخبار الشعراء العرب وقضايا الشعر منذ العصر الجاهلي وحتى منتصف العصر العباسي.',
    coverUrl: 'https://ak-asset.jarir.com/akeneo-prod/asset/a/6/1/b/a61ba21113452fecfb22d898db0dd3c96d8e7134_619424.jpg'
  },

  // --- English Books (EB0001 - EB0050) ---
  {
    id: "EB0001",
    title: "Atomic Habits",
    category: "تطوير ذات",
    language: "en",
    author: "James Clear",
    pages: 320,
    synopsis: "Unlock massive success and transform your life—one tiny, game-changing habit at a time!",
    coverUrl: "https://m.media-amazon.com/images/I/41VTcv2HL1L.jpg"
  },
  {
    id: "EB0002",
    title: "Sister, Missing, Book 2",
    category: "رواية وقصص",
    language: "en",
    author: "Sophie McKenzie",
    pages: 250,
    synopsis: "A heart-pounding thriller where a desperate sister races against time and dark family secrets to find her kidnapped sibling before it's too late.",
    coverUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/6/9/0/9/6909162a2835d1ba3a6f123db8cb8388cda8d4cc_595970.jpg"
  },
  {
    id: "EB0003",
    title: "Sapiens: A Brief History of Humankind",
    category: "تاريخ",
    language: "en",
    author: "Yuval Noah Harari",
    pages: 464,
    synopsis: "A groundbreaking journey through 70,000 years of human history, exploring how an insignificant ape conquered the planet through shared myths, science, and empire.",
    coverUrl: "https://m.media-amazon.com/images/I/71f6c5Ay+LL._SX342_.jpg"
  },
  {
    id: "EB0004",
    title: "Thinking, Fast and Slow",
    category: "علمي",
    language: "en",
    author: "Daniel Kahneman",
    pages: 512,
    synopsis: "An eye-opening dive into the human mind, revealing how the constant tug-of-war between fast intuition and slow, deliberate logic shapes every decision we make.",
    coverUrl: "https://m.media-amazon.com/images/I/71InwoMfGSL._SL1500_.jpg"
  },
  {
    id: "EB0005",
    title: "Educated",
    category: "تطوير ذات",
    language: "en",
    author: "Tara Westover",
    pages: 352,
    synopsis: "An unforgettable memoir of survival and self-reinvention, following a woman who escapes an isolated, survivalist family in the Idaho mountains to teach herself into the world of higher education.",
    coverUrl: "https://m.media-amazon.com/images/I/61xta2jWBBL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: "EB0006",
    title: "The Psychology Of Money",
    category: "تاريخ",
    language: "en",
    author: "Morgan Housel",
    pages: 256,
    synopsis: "A compelling exploration of wealth, greed, and happiness, proving that financial success isn't about what you know, but how you behave.",
    coverUrl: "https://m.media-amazon.com/images/I/71si36sM1BL._SL1500_.jpg"
  },
  {
    id: "EB0007",
    title: "Deep Work",
    category: "علمي",
    language: "en",
    author: "Cal Newport",
    pages: 304,
    synopsis: "An indispensable guide to mastering distraction-free focus, showing you how to produce your best results and thrive in an increasingly chaotic, noisy world.",
    coverUrl: "https://m.media-amazon.com/images/I/71din4TLubL.jpg"
  },
  {
    id: "EB0008",
    title: "Can't Hurt Me",
    category: "تطوير ذات",
    language: "en",
    author: "David Goggins",
    pages: 364,
    synopsis: "An unvarnished blueprint for mental toughness, tracing one man's brutal journey from rock bottom to Navy SEAL to show how you can conquer your mind and shatter any limit.",
    coverUrl: "https://m.media-amazon.com/images/I/81VpFFpZTtL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: "EB0009",
    title: "The 7 Habits of Highly Effective People",
    category: "تطوير ذات",
    language: "en",
    author: "Stephen R. Covey",
    pages: 432,
    synopsis: "A timeless framework for personal and professional success, teaching you how to build lasting greatness from the inside out through character, purpose, and proactive action.",
    coverUrl: "https://m.media-amazon.com/images/I/810oMMWrltL._SY466_.jpg"
  },
  {
    id: "EB0010",
    title: "Outliers: The Story of Success",
    category: "علمي",
    language: "en",
    author: "Malcolm Gladwell",
    pages: 336,
    synopsis: "An eye-opening look at what truly drives high achievers, revealing that extraordinary success is less about raw talent and far more about hidden advantages, cultural legacy, and timing.",
    coverUrl: "https://m.media-amazon.com/images/I/61kwmVkSAmL._SL1500_.jpg"
  },
  {
    id: "EB0011",
    title: "Man's Search for Meaning",
    category: "علمي",
    language: "en",
    author: "Viktor E. Frankl",
    pages: 200,
    synopsis: "A profound memoir and psychological exploration born from the horrors of Nazi death camps, showing how finding purpose in suffering is the ultimate key to human survival and inner freedom.",
    coverUrl: "https://m.media-amazon.com/images/I/51m5khg0C1L._SY445_SX342_FMwebp_.jpg"
  },
  {
    id: "EB0012",
    title: "Why We Sleep",
    category: "علمي",
    language: "en",
    author: "Matthew Walker",
    pages: 368,
    synopsis: "A fascinating dive into the science of rest, revealing how sleep dictates your health, brainpower, and longevity—and the hidden dangers of missing out on it.",
    coverUrl: "https://m.media-amazon.com/images/I/814sf-LvR0L._SL1500_.jpg"
  },
  {
    id: "EB0013",
    title: "Start with Why",
    category: "تطوير ذات",
    language: "en",
    author: "Simon Sinek",
    pages: 356,
    synopsis: "A powerful blueprint for inspirational leadership, showing that the world's most influential figures and organizations achieve lasting success by focusing on *why* they do what they do, not just *what*.",
    coverUrl: "https://m.media-amazon.com/images/I/71NBZIExBCL._SY466_.jpg"
  },
  {
    id: "EB0014",
    title: "Shoe Dog",
    category: "مذكرات",
    language: "en",
    author: "Phil Knight",
    pages: 400,
    synopsis: "A candid and thrilling memoir from Nike's co-founder, Phil Knight, chronicling the chaotic, high-stakes early hustle that turned a $50 loan and an imported sneaker side project into a global empire.",
    coverUrl: "https://m.media-amazon.com/images/I/81tXVF9zTqL._SL1500_.jpg"
  },
  {
    id: "EB0015",
    title: "Guns, Germs, and Steel",
    category: "تاريخ",
    language: "en",
    author: "Jared Diamond",
    pages: 528,
    synopsis: "A groundbreaking look at human history, showing how geography and environment—rather than biological superiority—determined the unequal rise and dominance of civilizations across the globe.",
    coverUrl: "https://m.media-amazon.com/images/I/71BByzm98gL._SL1200_.jpg"
  },
  {
    id: "EB0016",
    title: "Quiet: The Power of Introverts",
    category: "علمي",
    language: "en",
    author: "Susan Cain",
    pages: 352,
    synopsis: "An empowering exploration of the introverted mind, showing how quiet thinkers, listeners, and creators hold tremendous, undervalued power in a world built for the loudest voices.",
    coverUrl: "https://m.media-amazon.com/images/I/71BXRqKq4nL.jpg"
  },
  {
    id: "EB0017",
    title: "Zero to One",
    category: "تطوير ذات",
    language: "en",
    author: "Peter Thiel",
    pages: 224,
    synopsis: "A provocative guide to building the future, showing how true innovation comes from creating entirely new, monopoly-scale breakthroughs rather than competing in crowded markets.",
    coverUrl: "https://cdn2.penguin.com.au/covers/original/9780753555200.jpg"
  },
  {
    id: "EB0018",
    title: "Mindset: The New Psychology of Success",
    category: "علمي",
    language: "en",
    author: "Carol S. Dweck",
    pages: 320,
    synopsis: "A transformative guide to personal achievement, revealing how adopting a \"growth mindset\" can unlock your potential, reshape your abilities, and revolutionize the way you learn and lead.",
    coverUrl: "https://m.media-amazon.com/images/I/61vmgqt2W9L._SL1500_.jpg"
  },
  {
    id: "EB0019",
    title: "Steve Jobs",
    category: "تطوير ذات",
    language: "en",
    author: "Walter Isaacson",
    pages: 656,
    synopsis: "An intimate and unsparing biography of Apple’s legendary visionary, capturing the relentless passion, volatile genius, and design obsession that revolutionized multiple global industries.",
    coverUrl: "https://m.media-amazon.com/images/I/81NSb9Jy0HL.jpg"
  },
  {
    id: "EB0020",
    title: "Essentialism: The Disciplined Pursuit of Less",
    category: "تطوير ذات",
    language: "en",
    author: "Greg McKeown",
    pages: 272,
    synopsis: "A masterclass in intentional living, showing you how to cut through the noise, reclaim your time, and achieve more by doing only what is truly essential.",
    coverUrl: "https://m.media-amazon.com/images/I/81-PxXFnD7L.jpg"
  },
  {
    id: "EB0021",
    title: "Bad Blood: Secrets and Lies in a Silicon Valley Startup",
    category: "رواية وقصص",
    language: "en",
    author: "John Carreyrou",
    pages: 352,
    synopsis: "A gripping account of the rise and collapse of Theranos, the Silicon Valley company founded by Elizabeth Holmes. The book explores the ambitious claims behind the company, the culture of secrecy that surrounded it, and the deception that eventually led to one of the most notorious scandals in the technology industry.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/I/71VaZtLA2GL.jpg"
  },
  {
    id: "EB0022",
    title: "365 Days of Art",
    category: "تطوير ذات",
    language: "en",
    author: "Lorna Scobie",
    pages: 352,
    synopsis: "An interactive collection of creative exercises designed to inspire artistic expression throughout the year. Each day offers a simple activity or idea that encourages readers to experiment with different forms of art, develop their creativity, and make artistic practice a regular part of everyday life.",
    coverUrl: "https://m.media-amazon.com/images/I/71+dtsNsPtL._SL1500_.jpg"
  },
  {
    id: "EB0023",
    title: "When Breath Becomes Air",
    category: "مذكرات",
    language: "en",
    author: "Paul Kalanithi",
    pages: 256,
    synopsis: "A deeply personal memoir written by neurosurgeon Paul Kalanithi after being diagnosed with terminal cancer. The book reflects on medicine, mortality, identity, and the meaning of life, offering an emotional exploration of what it means to build a meaningful life while facing death.",
    coverUrl: "https://m.media-amazon.com/images/I/61gwba1pQnL._SY466_.jpg"
  },
  {
    id: "EB0024",
    title: "The Power of Habit",
    category: "علمي",
    language: "en",
    author: "Charles Duhigg",
    pages: 416,
    synopsis: "A fascinating exploration of how habits are formed and how they influence individual behavior, organizations, and society. The book explains the science behind habits and presents practical ideas for understanding, changing, and developing routines that can lead to lasting personal and professional improvements.",
    coverUrl: "https://m.media-amazon.com/images/I/71fFIwvOipL._SX342_.jpg"
  },
  {
    id: "EB0025",
    title: "Influence: The Psychology of Persuasion",
    category: "علمي",
    language: "en",
    author: "Robert B. Cialdini",
    pages: 336,
    synopsis: "A detailed exploration of the psychological principles that influence people's decisions and behavior. The book examines techniques such as reciprocity, social proof, authority, and scarcity, helping readers understand how persuasion works and how these principles are used in everyday interactions, marketing, and business.",
    coverUrl: "https://m.media-amazon.com/images/I/717TArPQj1S._SL1500_.jpg"
  },
  {
    id: "EB0026",
    title: "Cosmos",
    category: "علمي",
    language: "en",
    author: "Carl Sagan",
    pages: 384,
    synopsis: "A journey through the universe that combines science, history, philosophy, and human curiosity. Carl Sagan explores the origins of the cosmos, the development of life, and humanity's place in the universe, encouraging readers to look at science and the world with a deeper sense of wonder.",
    coverUrl: "https://cdn.kobo.com/book-images/362a218a-aadd-453e-a97a-5acae38c4f83/1200/1200/False/cosmos-8.jpg"
  },
  {
    id: "EB0027",
    title: "Rich Dad Poor Dad",
    category: "تطوير ذات",
    language: "en",
    author: "Robert T. Kiyosaki (co-authored with Sharon Lechter)",
    pages: 302,
    synopsis: "A personal finance book that compares the different approaches to money and investing taught by two influential figures in the author's life. It challenges traditional ideas about education, employment, and wealth, while emphasizing financial literacy, investing, entrepreneurship, and building assets that can generate long-term income.",
    coverUrl: "https://ak-asset.jarir.com/akeneo-prod/asset/1/c/b/7/1cb754763fb1d5badbcd73e5ec4e47b5257b69f5_581225.jpg"
  },
  {
    id: "EB0028",
    title: "A Brief History of Time",
    category: "علمي",
    language: "en",
    author: "Stephen Hawking",
    pages: 336,
    synopsis: "A popular science book that explores some of the biggest questions about the universe, including the origins of time, black holes, space, and the nature of reality. Stephen Hawking presents complex scientific concepts in an accessible way and invites readers to think about humanity's place within the vast universe.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg"
  },
  {
    id: "EB0029",
    title: "Flow: The Psychology of Optimal Experience",
    category: "علمي",
    language: "en",
    author: "Mihaly Csikszentmihalyi",
    pages: 336,
    synopsis: "A psychological exploration of the state of deep concentration and complete involvement known as “flow.” The book explains how people can become fully engaged in meaningful activities and how achieving this state can improve creativity, performance, satisfaction, and overall quality of life.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1678896707i/100488231.jpg"
  },
  {
    id: "EB0030",
    title: "The Body Keeps the Score",
    category: "علمي",
    language: "en",
    author: "Bessel van der Kolk",
    pages: 464,
    synopsis: "A detailed exploration of how traumatic experiences can affect the brain, body, emotions, and behavior. The book examines the relationship between trauma and physical and psychological responses, while discussing different approaches that can help people understand and recover from traumatic experiences.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1697984412i/122888060.jpg"
  },
  {
    id: "EB0031",
    title: "Becoming",
    category: "تطوير ذات",
    language: "en",
    author: "Michelle Obama",
    pages: 448,
    synopsis: "A personal memoir in which Michelle Obama reflects on her childhood, education, family, career, and experiences in public life. Through stories from different stages of her journey, she explores identity, relationships, ambition, challenges, and the experiences that shaped her perspective on life.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg"
  },
  {
    id: "EB0032",
    title: "Freakonomics",
    category: "أدب",
    language: "en",
    author: "Steven D. Levitt & Stephen J. Dubner",
    pages: 336,
    synopsis: "A fascinating look at everyday life through the lens of economics, using unusual questions and surprising data to challenge common assumptions. The book explores how incentives influence human behavior and reveals unexpected connections between seemingly unrelated events and decisions.",
    coverUrl: "https://m.media-amazon.com/images/I/81JgAez6wHL.jpg"
  },
  {
    id: "EB0033",
    title: "Principles: Life and Work",
    category: "تطوير ذات",
    language: "en",
    author: "Ray Dalio",
    pages: 592,
    synopsis: "A collection of principles developed from Ray Dalio's experiences in business, investing, and life. The book presents ideas about decision-making, leadership, learning from mistakes, and building effective organizations, with an emphasis on using clear principles to navigate challenges and achieve meaningful goals.",
    coverUrl: "https://m.media-amazon.com/images/I/81OlHz-7yPL._SL1500_.jpg"
  },
  {
    id: "EB0034",
    title: "Homo Deus: A Brief History of Tomorrow",
    category: "تاريخ",
    language: "en",
    author: "Yuval Noah Harari",
    pages: 450,
    synopsis: "A thought-provoking exploration of humanity's possible future as technology continues to transform society. The book examines artificial intelligence, biotechnology, data, and human evolution while asking how technological progress could change the way people live, work, and understand themselves.",
    coverUrl: "https://m.media-amazon.com/images/I/412a-nmrw8L.jpg"
  },
  {
    id: "EB0035",
    title: "Born a Crime",
    category: "رواية وقصص",
    language: "en",
    author: "Trevor Noah",
    pages: 304,
    synopsis: "A memoir describing Trevor Noah's childhood and upbringing in South Africa during and after apartheid. Through humor and personal stories, the book explores identity, family, poverty, racism, and resilience, offering a unique perspective on growing up in a society shaped by deep social and political divisions.",
    coverUrl: "https://m.media-amazon.com/images/I/91eGtPznS8L._SL1500_.jpg"
  },
  {
    id: "EB0036",
    title: "Grit: The Power of Passion and Perseverance",
    category: "تطوير ذات",
    language: "en",
    author: "Angela Duckworth",
    pages: 368,
    synopsis: "An exploration of the qualities that help people achieve long-term goals, focusing on passion, persistence, and resilience. The book argues that success is not determined by talent alone and explains how sustained effort and commitment can play a major role in overcoming obstacles and achieving excellence.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1632024090i/27213329.jpg"
  },
  {
    id: "EB0037",
    title: "Factfulness",
    category: "علمي",
    language: "en",
    author: "Hans Rosling",
    pages: 352,
    synopsis: "A data-driven exploration of how people often misunderstand the world and its progress. The book identifies common ways of thinking that lead to misconceptions about poverty, health, population, and global development, while encouraging readers to use facts and evidence to form a more accurate view of reality.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1544963815i/34890015.jpg"
  },
  {
    id: "EB0038",
    title: "The Lean Startup",
    category: "تطوير ذات",
    language: "en",
    author: "Eric Ries",
    pages: 336,
    synopsis: "A practical guide to building businesses and developing products in uncertain environments. The book introduces the Lean Startup approach, which emphasizes experimentation, customer feedback, rapid learning, and continuous improvement to help entrepreneurs create products that people actually need while reducing wasted time and resources.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1629999184i/10127019.jpg"
  },
  {
    id: "EB0039",
    title: "Range: Why Generalists Triumph in a Specialized World",
    category: "تطوير ذات",
    language: "en",
    author: "David Epstein",
    pages: 352,
    synopsis: "An exploration of how people with broad knowledge and diverse experiences can succeed in a world that increasingly values specialization. The book examines the benefits of learning across different fields, adapting to new situations, and developing a wide range of skills rather than focusing exclusively on one narrow area.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1550048292i/41795733.jpg"
  },
  {
    id: "EB0040",
    title: "The Black Swan",
    category: "فلسفة",
    language: "en",
    author: "Nassim Nicholas Taleb",
    pages: 400,
    synopsis: "Highlights the benefits of diverse experiences and their role in problem-solving and achieving success.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1714172313i/242472.jpg"
  },
  {
    id: "EB0041",
    title: "Antifragile",
    category: "فلسفة",
    language: "en",
    author: "Nassim Nicholas Taleb",
    pages: 544,
    synopsis: "Discusses the impact of rare and unpredictable events on the economy, society, and decision-making.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1352422827i/13530973.jpg"
  },
  {
    id: "EB0042",
    title: "Make Time: How to Focus on What Matters Every Day",
    category: "تطوير ذات",
    language: "en",
    author: "Jake Knapp & John Zeratsky",
    pages: 304,
    synopsis: "Explains how systems can become stronger when exposed to disorder and stress.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1524067121i/37880811.jpg"
  },
  {
    id: "EB0043",
    title: "Daring Greatly",
    category: "تطوير ذات",
    language: "en",
    author: "Brené Brown",
    pages: 304,
    synopsis: "Provides a practical method for managing time, focusing on priorities, and reducing distractions.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1337110319i/13588356.jpg"
  },
  {
    id: "EB0044",
    title: "Show Your Work!",
    category: "تطوير ذات",
    language: "en",
    author: "Austin Kleon",
    pages: 224,
    synopsis: "Explores courage and emotional vulnerability and their role in building more authentic relationships and lives.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1404580714i/18290401.jpg"
  },
  {
    id: "EB0045",
    title: "Steal Like an Artist",
    category: "تطوير ذات",
    language: "en",
    author: "Austin Kleon",
    pages: 160,
    synopsis: "Encourages sharing ideas and work-in-progress while building an influential creative presence.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1404576602i/13099738.jpg"
  },
  {
    id: "EB0046",
    title: "Hooked: How to Build Habit-Forming Products",
    category: "تطوير ذات",
    language: "en",
    author: "Nir Eyal",
    pages: 256,
    synopsis: "Offers advice on developing creativity, learning from others' work, and cultivating a personal style.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1407112405i/22668729.jpg"
  },
  {
    id: "EB0047",
    title: "Algorithms to Live By",
    category: "علمي",
    language: "en",
    author: "Brian Christian & Tom Griffiths",
    pages: 368,
    synopsis: "Explains how to build products that encourage repeated use through habits and rewards.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1454296875i/25666050.jpg"
  },
  {
    id: "EB0048",
    title: "Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
    category: "تطوير ذات",
    language: "en",
    author: "Jake Knapp",
    pages: 288,
    synopsis: "Connects computer science with everyday life to improve decision-making and problem-solving.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284924i/25814544.jpg"
  },
  {
    id: "EB0049",
    title: "Never Split the Difference",
    category: "فلسفة",
    language: "en",
    author: "Chris Voss",
    pages: 288,
    synopsis: "Presents a five-day methodology for solving problems and testing ideas.",
    coverUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1460910517i/26156469.jpg"
  },
  {
    id: "EB0050",
    title: "The Almanack of Naval Ravikant",
    category: "تطوير ذات",
    language: "en",
    author: "Eric Jorgenson",
    pages: 244,
    synopsis: "Presents practical negotiation techniques based on listening, empathy, and asking questions to achieve the best outcomes.",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598011736i/54898389.jpg"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'AB0016',
    rating: 5,
    text: 'عمل عبقري ومؤسس لعلم الاجتماع البشري. عمق تحليلات ابن خلدون في طبائع العمران السياسي والاقتصادي ما زال راهناً ومبهراً حتى يومنا هذا.',
    createdAt: '2026-06-10T14:30:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-4'],
    comments: [
      {
        id: 'c-1',
        userId: 'user-1',
        userName: 'أحمد يوسف',
        text: 'أتفق تماماً! فصول العصبية وبناء الدول وسقوطها كتب كأنها موجهة لأحداث اليوم.',
        createdAt: '2026-06-11T09:15:00.000Z'
      }
    ]
  },
  {
    id: 'rev-2',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'AB0016',
    rating: 5,
    text: 'كتاب لا غنى عنه لكل قارئ جاد في فهم حركة التاريخ وتقلبات الحضارات الإنسانية.',
    createdAt: '2026-06-15T18:20:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-3',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'AB0016',
    rating: 4,
    text: 'لغة رصينة ورؤية فلسفية سبقت عصرها بقرون. يحتاج إلى قراءة متأنية وهادئة.',
    createdAt: '2026-07-02T11:00:00.000Z',
    likedBy: ['user-1', 'user-6'],
    comments: []
  },
  {
    id: 'rev-4',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'AB0008',
    rating: 5,
    text: 'رواية استثنائية بلغة شاعرية مكثفة. الطيب صالح أبدع في تصوير صدمة الحضارة واغتراب الهوية بين الشرق والغرب.',
    createdAt: '2026-06-20T10:00:00.000Z',
    likedBy: ['user-1', 'user-2', 'user-5'],
    comments: []
  },
  {
    id: 'rev-5',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'AB0008',
    rating: 4,
    text: 'نص أدبي فريد يحفر عميقاً في الوجدان الإنساني وأسئلة الانتماء.',
    createdAt: '2026-06-22T16:45:00.000Z',
    likedBy: ['user-4'],
    comments: []
  },
  {
    id: 'rev-6',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'AB0006',
    rating: 5,
    text: 'صراحة غازي القصيبي وسلاسة أسلوبه تجعلانك تنهي الكتاب في جلسة واحدة. مرجع إداري وإنساني ملهم للجميع.',
    createdAt: '2026-07-01T15:20:00.000Z',
    likedBy: ['user-2', 'user-3'],
    comments: []
  },
  {
    id: 'rev-7',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'AB0006',
    rating: 5,
    text: 'دروس قيادية حية تنبض بالواقعية والذكاء وحب الوطن.',
    createdAt: '2026-07-05T12:00:00.000Z',
    likedBy: ['user-5'],
    comments: []
  },
  {
    id: 'rev-8',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'AB0011',
    rating: 5,
    text: 'صرخة مدوية وإبداع رمزي مذهل من غسان كنفاني. النهاية تترك في الحلق غصة وفي العقل ألف سؤال.',
    createdAt: '2026-07-10T14:10:00.000Z',
    likedBy: ['user-1', 'user-4'],
    comments: []
  },
  {
    id: 'rev-9',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'AB0011',
    rating: 4,
    text: 'نص قصير في حجمه، هائل في دلالاته وتأثيره الإنساني والوطني.',
    createdAt: '2026-07-12T09:30:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-10',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'AB0001',
    rating: 5,
    text: 'تأملات عفوية صادقة تلامس القلب وتدعو القارئ للعودة إلى ذاته ومحاسبة النفس بهدوء.',
    createdAt: '2026-07-18T17:00:00.000Z',
    likedBy: ['user-1', 'user-3'],
    comments: []
  },
  {
    id: 'rev-11',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'AB0001',
    rating: 4,
    text: 'كتاب خفيف وملهم، مثالي للقراءة في خلوة تأملية.',
    createdAt: '2026-07-20T19:30:00.000Z',
    likedBy: ['user-5'],
    comments: []
  },
  {
    id: 'rev-12',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'AB0018',
    rating: 5,
    text: 'ابن حزم يجمع بين التحليل النفسي البارع والبلاغة الأندلسية الرفيعة. كتاب فريد في تراثنا العربي.',
    createdAt: '2026-07-22T08:00:00.000Z',
    likedBy: ['user-2', 'user-6'],
    comments: []
  },
  {
    id: 'rev-13',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'AB0018',
    rating: 4,
    text: 'وصف دقيق لأحوال المحبين ومشاعرهم بروح أدبية نادرة.',
    createdAt: '2026-07-25T11:40:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-14',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'AB0014',
    rating: 5,
    text: 'سيرة ملهمة تحكي قصة التحدي وقهر العتمة بنور البصيرة والعلم. أسلوب طه حسين السردي ساحر لا نظير له.',
    createdAt: '2026-07-28T13:00:00.000Z',
    likedBy: ['user-1', 'user-4'],
    comments: []
  },
  {
    id: 'rev-15',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'AB0014',
    rating: 5,
    text: 'من أروع السير الذاتية في الأدب العربي، تجربة إنسانية تشحذ الهمم.',
    createdAt: '2026-07-30T10:15:00.000Z',
    likedBy: ['user-6'],
    comments: []
  },
  {
    id: 'rev-16',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'AB0036',
    rating: 5,
    text: 'رحلة فلسفية إشراقية مدهشة عن قدرة العقل الفطري على الاستدلال والوصول إلى المعرفة.',
    createdAt: '2026-08-01T15:00:00.000Z',
    likedBy: ['user-3', 'user-5'],
    comments: []
  },
  {
    id: 'rev-17',
    userId: 'user-5',
    userName: 'عمر السعيد',
    bookId: 'AB0036',
    rating: 4,
    text: 'عمل سابق لعصره بقرون في الفلسفة وعلم النفس المعرفي.',
    createdAt: '2026-08-03T18:20:00.000Z',
    likedBy: ['user-1'],
    comments: []
  },
  {
    id: 'rev-18',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'AB0023',
    rating: 5,
    text: 'دوستويفسكي يجسد رهافة المشاعر والعزلة الحالمة في أربع ليالٍ لا تُنسى في بطرسبرغ.',
    createdAt: '2026-08-05T20:00:00.000Z',
    likedBy: ['user-2'],
    comments: []
  },
  {
    id: 'rev-19',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'AB0028',
    rating: 5,
    text: 'سعود السنعوسي يطرح قضية الهوية والاغتراب الاجتماعي بجرأة فنية وحبكة روائية ممتعة جداً.',
    createdAt: '2026-08-07T12:30:00.000Z',
    likedBy: ['user-1', 'user-4', 'user-6'],
    comments: []
  },
  {
    id: 'rev-20',
    userId: 'user-3',
    userName: 'طارق منصور',
    bookId: 'AB0047',
    rating: 5,
    text: 'موسوعة تراثية باهرة تختزل حكمة العرب وبلاغتهم في سياقاتها التاريخية الممتعة.',
    createdAt: '2026-08-09T16:10:00.000Z',
    likedBy: ['user-1'],
    comments: []
  },
  {
    id: 'rev-21',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    bookId: 'AB0020',
    rating: 5,
    text: 'توثيق تاريخي رصين لمراحل تأسيس الدولة السعودية الأولى وقادتها، مرجع هام لكل باحث.',
    createdAt: '2026-08-11T14:00:00.000Z',
    likedBy: ['user-2', 'user-5'],
    comments: []
  },
  {
    id: 'rev-22',
    userId: 'user-6',
    userName: 'مريم خالد',
    bookId: 'AB0044',
    rating: 4,
    text: 'طرح واقعي صريح يساعد على ترتيب أولويات الحياة والتركيز على ما يستحق طاقتك بالفعل.',
    createdAt: '2026-08-12T17:40:00.000Z',
    likedBy: ['user-3'],
    comments: []
  },
  {
    id: 'rev-23',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    bookId: 'AB0013',
    rating: 5,
    text: 'سرد تاريخي ولغة أدبية عالية تأخذك في تفاصيل الصراع الروحي والفكري في القرن الخامس الميلادي.',
    createdAt: '2026-08-14T11:00:00.000Z',
    likedBy: ['user-1', 'user-5'],
    comments: []
  },
  {
    id: 'rev-24',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    bookId: 'AB0005',
    rating: 5,
    text: 'عبقرية المعري اللغوية وخياله الساخر يجعلان رسالة الغفران درة من درر الأدب العالمي.',
    createdAt: '2026-08-15T09:20:00.000Z',
    likedBy: ['user-3', 'user-6'],
    comments: []
  }
];

export const INITIAL_LIBRARY = [
  {
    userId: 'user-1',
    bookId: 'AB0016',
    status: 'reading',
    currentPage: 240,
    startedAt: '2026-08-01T08:00:00.000Z',
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'AB0009',
    status: 'reading',
    currentPage: 380,
    startedAt: '2026-08-05T12:00:00.000Z',
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'AB0008',
    status: 'want',
    currentPage: 0,
    startedAt: null,
    finishedAt: null
  },
  {
    userId: 'user-1',
    bookId: 'AB0001',
    status: 'finished',
    currentPage: 267,
    startedAt: '2026-07-01T10:00:00.000Z',
    finishedAt: '2026-07-12T17:45:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'AB0018',
    status: 'finished',
    currentPage: 280,
    startedAt: '2026-06-15T09:00:00.000Z',
    finishedAt: '2026-07-05T18:30:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'AB0006',
    status: 'finished',
    currentPage: 360,
    startedAt: '2026-05-20T11:00:00.000Z',
    finishedAt: '2026-06-10T14:20:00.000Z'
  },
  {
    userId: 'user-1',
    bookId: 'AB0014',
    status: 'finished',
    currentPage: 216,
    startedAt: '2026-07-15T10:00:00.000Z',
    finishedAt: '2026-07-28T20:00:00.000Z'
  }
];

export const INITIAL_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'رواية وقصص',
    category: 'رواية وقصص',
    description: 'قراءات في السرد والدراما والشخصيات وتحليلات الرواية العربية والعالمية.'
  },
  {
    id: 'comm-2',
    name: 'تاريخ',
    category: 'تاريخ',
    description: 'نقاشات حول وقائع التاريخ، صعود الحضارات، وتاريخ الأمة والمملكة.'
  },
  {
    id: 'comm-3',
    name: 'فلسفة',
    category: 'فلسفة',
    description: 'حوارات فكرية وتأملية حول قضايا الوجود والإنسان ومناهج التفكير.'
  },
  {
    id: 'comm-4',
    name: 'تطوير ذات',
    category: 'تطوير ذات',
    description: 'تجارب ورؤى لبناء الوعي، المرونة النفسية، والإنتاجية واكتساب العادات الإيجابية.'
  },
  {
    id: 'comm-5',
    name: 'مذكرات',
    category: 'مذكرات',
    description: 'استلهام العبر من مسارات القادة والمفكرين وتجاربهم الشخصية والمهنية.'
  },
  {
    id: 'comm-6',
    name: 'أدب',
    category: 'أدب',
    description: 'حوارات ونقاشات حول عيون التراث الأدبي، البلاغة، والشعر العربي.'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    userId: 'user-2',
    userName: 'سارة الأحمد',
    category: 'تاريخ',
    bookId: 'AB0016',
    reason: 'أنصح كل من يريد بناء رؤية نقدية للتاريخ بقراءة مقدمة ابن خلدون، فهي ليست مجرد سرد للوقائع بل نظرية متكاملة في العمران.',
    createdAt: '2026-08-10T11:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-4'],
    comments: [
      {
        id: 'pc-1',
        userId: 'user-1',
        userName: 'أحمد يوسف',
        text: 'أفضل استثمار لوقت القراءة هذا العام.',
        createdAt: '2026-08-10T14:30:00.000Z'
      }
    ]
  },
  {
    id: 'post-2',
    userId: 'user-4',
    userName: 'ريم القحطاني',
    category: 'أدب',
    bookId: 'AB0008',
    reason: 'موسم الهجرة إلى الشمال للطيب صالح تمس الروح وتجعلك تشعر بوطأة صراع الهوية وعظمة التشبث باللغة والذاكرة.',
    createdAt: '2026-08-12T15:20:00.000Z',
    likedBy: ['user-1', 'user-5', 'user-6'],
    comments: []
  },
  {
    id: 'post-3',
    userId: 'user-3',
    userName: 'طارق منصور',
    category: 'فلسفة',
    bookId: 'AB0036',
    reason: 'كتاب حي بن يقظان لابن طفيل يقدم رحلة فلسفية إشراقية فريدة عن قدرة العقل البشري على الاستدلال والتأمل في الكون.',
    createdAt: '2026-08-14T09:15:00.000Z',
    likedBy: ['user-1', 'user-2'],
    comments: []
  },
  {
    id: 'post-4',
    userId: 'user-5',
    userName: 'عمر السعيد',
    category: 'تطوير ذات',
    bookId: 'AB0006',
    reason: 'حياة في الإدارة لغازي القصيبي يجمع بين الفائدة الإدارية والأسلوب الأدبي المشوق، كتاب لا تمل من قراءته والاستفادة من تجاربه.',
    createdAt: '2026-08-15T18:00:00.000Z',
    likedBy: ['user-1', 'user-3', 'user-5'],
    comments: []
  },
  {
    id: 'post-5',
    userId: 'user-6',
    userName: 'مريم خالد',
    category: 'مذكرات',
    bookId: 'AB0014',
    reason: 'كتاب الأيام لعميد الأدب العربي طه حسين ملحمة إنسانية في الإرادة والعصامية وقهر الظروف القاسية في سبيل طلب العلم.',
    createdAt: '2026-08-16T13:40:00.000Z',
    likedBy: ['user-2', 'user-4', 'user-6'],
    comments: []
  },
  {
    id: 'post-6',
    userId: 'user-1',
    userName: 'أحمد يوسف',
    category: 'رواية وقصص',
    bookId: 'AB0028',
    reason: 'رواية ساق البامبو لسعود السنعوسي تضع القارئ أمام تساؤلات حاسمة حول الانتماء والعدالة الإنسانية بأسلوب روائي مشوق.',
    createdAt: '2026-08-17T10:00:00.000Z',
    likedBy: ['user-2', 'user-3'],
    comments: []
  }
];

export const INITIAL_LIVE_SESSION = {
  active: true,
  timerMinutes: 25,
  title: 'جلسة قراءة صامتة مسائية',
  participants: [
    { id: 'p-1', userId: 'user-2', userName: 'سارة الأحمد', bookTitle: 'مقدمة ابن خلدون' },
    { id: 'p-2', userId: 'user-3', userName: 'طارق منصور', bookTitle: 'طوق الحمامة في الأُلفة والألَّاف' },
    { id: 'p-3', userId: 'user-4', userName: 'ريم القحطاني', bookTitle: 'موسم الهجرة إلى الشمال' },
    { id: 'p-4', userId: 'user-6', userName: 'مريم خالد', bookTitle: 'حياة في الإدارة' }
  ]
};
