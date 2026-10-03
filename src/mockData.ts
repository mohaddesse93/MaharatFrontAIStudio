import type { Teacher, Workshop, SchoolInfo, FooterInfo, Event, GeneralSettings } from "./types/school";

import staff1Img from "./assets/images/staff1_1790956098733.jpg";
import staff2Img from "./assets/images/staff2_1790956112664.jpg";
import staff3Img from "./assets/images/staff3_1790956124959.jpg";

import eventStageImg from "./assets/images/event_stage_1790956187189.jpg";
import eventRoboticsImg from "./assets/images/event_robotics_1790956140260.jpg";
import eventOutdoorImg from "./assets/images/event_outdoor_1790956155223.jpg";
import eventPaintingImg from "./assets/images/event_painting_1790956172170.jpg";

// Mock teachers data — swap with API call in next phase
export const mockTeachers: Teacher[] = [
  {
    id: "t2",
    name: "دکتر محمد آقاسی زاده",
    role: "مدیریت",
    avatar: staff1Img,
    bio: "دکترای برنامه‌ریزی درسی و مدیریت آموزشی، با بیش از ۱۵ سال تجربه در راه‌اندازی و هدایت مدارس نوین و پژوهش‌محور.",
    education: "دکترای علوم تربیتی و مدیریت آموزشی",
    socials: [{ telegram: "#" }],
  },
  {
    id: "t3",
    name: "مهربانو مرجانه علیزاده",
    role: "معاونت آموزشی",
    avatar: staff2Img,
    bio: "کارشناس ارشد آموزش ابتدایی، متخصص در متدهای تدریس تلفیقی و استعدادیابی کودکان در سنین پایه.",
    education: "کارشناسی ارشد تکنولوژی آموزشی",
    socials: [{ instagram: "#", telegram: "#" }],
  },
  {
    id: "t1",
    name: "مهربانو نفیسه مقدم",
    role: "معاونت اجرایی و انضباطی",
    avatar: staff3Img,
    bio: "کارشناس ارشد روانشناسی تربیتی با رویکرد تشویقی و تربیت مهارتی در محیطی پویا و سرشار از صمیمیت.",
    education: "کارشناسی ارشد روانشناسی تربیتی",
    socials: [{ instagram: "#", telegram: "#" }],
  }
];

// Mock workshops data — swap with API call in next phase
export const mockWorkshops: Workshop[] = [
  {
    id: "w1",
    title: "چرمدوزی و هنر",
    description: "هنر دست · خلاقیت بی‌پایان",
    icon: "Palette",
    color: "#FF6B4A",
    bgColor: "#FFF0EC",
    hours: "۴ ساعت در هفته",
    ageGroup: "پایه‌های سوم تا ششم",
    skillsTaught: ["الگوبرداری دقیق", "دوخت سنتی دوطرفه", "شناخت انواع بافت چرم", "طراحی محصولات کاربردی"],
  },
  {
    id: "w2",
    title: "آزمایشگاه علوم",
    description: "کاوش، تحقیق، تجربه",
    icon: "FlaskConical",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    hours: "۳ ساعت در هفته",
    ageGroup: "تمامی پایه‌ها",
    skillsTaught: ["مشاهده علمی و فرضیه‌سازی", "آزمایش‌های فیزیک و شیمی پایه", "میکروسکوپ و سلول‌شناسی", "محیط زیست و گیاهان"],
  },
  {
    id: "w3",
    title: "برنامه‌نویسی و رباتیک",
    description: "از ایده تا ساخت، با تکنولوژی",
    icon: "Code2",
    color: "#10B981",
    bgColor: "#ECFDF5",
    hours: "۴ ساعت در هفته",
    ageGroup: "پایه‌های دوم تا ششم",
    skillsTaught: ["الگوریتم و تفکر محاسباتی", "کدنویسی تصویری Scratch", "مکانیک ربات و سنسورها", "طراحی ماشین‌های هوشمند"],
  },
  {
    id: "w4",
    title: "کارگاه چوب و ابزار",
    description: "ساخت، خلاقیت، اعتماد به نفس",
    icon: "Hammer",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    hours: "۳ ساعت در هفته",
    ageGroup: "پایه‌های چهارم تا ششم",
    skillsTaught: ["اصول ایمنی و کار با ابزار دستی", "اندازه‌گیری و سوهان‌کاری", "ساخت سازه‌های چوبی رومیزی", "رنگ‌آمیزی ارگانیک چوب"],
  },
];

// Mock school info for hero
export const mockSchoolInfo: SchoolInfo = {
  name: "مهارت",
  tagline: "دبستان هوشمند و مهارت محور مهارت",
  description:
    "اولین مدرسه تخصصی مهارت‌ محور با رویکرد آموزش پروژه محور در مشهد.",
  foundedYear: "۱۳۹۵",
  mission: "پرورش دانش‌آموزانی خودباور، خلاق و اهل حل مسئله که یادگیری را در میدان عمل تجربه می‌کنند.",
  vision: "ایجاد الگویی پیشرو از مدرسه شاد و مهارت‌محور در سطح کشور با تلفیق هنر، صنعت، علوم و فناوری.",
};

// Mock footer info
export const mockFooterInfo: FooterInfo = {
  phone: '۰۵۱-۳۸۲۱۰۰۷۵',
  phone2: '۰۵۱-۳۸۲۱۰۰۷۶',
  phone3: '۰۵۱-۳۸۲۱۰۰۷۷',
  email: 'info@maharat-school.ir',
  address: 'مشهد، بلوار سرافرازان، سرافرازان ۱۱، ایمانیان ۱',
  workingHours: 'شنبه تا پنج‌شنبه: ۸ صبح تا ۱۴',
  workingHoursLabel: 'زمان پاسخگویی',
  phoneNumbers: [
    { id: 'p1', label: 'شماره تماس واحد حسابداری', number: '۰۹۰۵۱۶۲۱۷۷۵' },
    { id: 'p2', label: 'راه ارتباطی واتس‌اپ و تلگرام', number: '۰۹۱۵۲۰۰۱۷۷۵' }
  ],
  socialLinks: [
    { id: 's1', platform: 'instagram', title: 'اینستاگرام مدرسه', url: 'https://instagram.com/maharat_school' },
    { id: 's2', platform: 'telegram', title: 'کانال تلگرام', url: 'https://t.me/maharat_school' },
    { id: 's3', platform: 'eitaa', title: 'پیام‌رسان ایتا', url: 'https://eitaa.com/maharat_school' },
    { id: 's4', platform: 'bale', title: 'پیام‌رسان بله', url: 'https://ble.ir/maharat_school' }
  ]
};

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  schoolName: 'دبستان مهارت',
  heroBadge: 'سال تحصیلی ۱۴۰۶–۱۴۰۵',
  heroHeadlinePrefix: 'جایی برای ',
  heroHeadlineHighlight1: 'بازی',
  heroHeadlineMiddle: ' و ',
  heroHeadlineHighlight2: 'یادگیری',
  heroSubtitle: 'اولین مدرسه هوشمند و تخصصی مهارت محور با کادر آموزشی متخصص و مجرب',
  studentsCount: '۲۴۰',
  studentsLabel: 'دانش‌آموز',
  teachersCount: '۱۸',
  teachersLabel: 'کادر آموزشی',
  experienceCount: '۱۰',
  experienceLabel: 'سال تجربه',
};

// Mock events for hero slider and events section
export const EVENTS: Event[] = [
  {
    id: 1,
    title: 'جشن پایان سال تحصیلی',
    dateFa: '۵ خرداد',
    image: eventStageImg,
    category: 'جشن‌ها و مراسم',
    description: 'مراسم باشکوه و خاطره‌انگیز پایان سال تحصیلی به همراه اجرای نمایش صحنه‌ای موزیکال، تقدیر از دانش‌آموزان پرتلاش و اهدای کارنامه و جوایز با حضور گرم خانواده‌ها.',
    highlights: ['اجرای سرود همگانی کودکان', 'نمایش موزیکال هفت خان مهارت', 'اهدای نشان دانش‌آموز پژوهشگر']
  },
  {
    id: 2,
    title: 'نمایشگاه رباتیک دانش‌آموزی',
    dateFa: '۲۲ اردیبهشت',
    image: eventRoboticsImg,
    category: 'علمی و فناوری',
    description: 'نمایش دستاوردهای خلاقانه دانش‌آموزان در ساخت پروژه‌های رباتیک، کدنویسی با اسکرچ و ماشین‌های هوشمند با رقابت‌های مهیج در پیست اختصاصی مدرسه.',
    highlights: ['مسابقه ربات‌های جنگجو و امدادگر', 'ارائه پروژه توسط خود کودکان به زبان ساده', 'تقدیر از تیم‌های برتر توسط هیئت داوران']
  },
  {
    id: 3,
    title: 'روز بازی و شادی',
    dateFa: '۱۵ اردیبهشت',
    image: eventOutdoorImg,
    category: 'ورزش و تندرستی',
    description: 'یک روز بدون کیف و کتاب در فضای سبز حیاط و باغچه مدرسه؛ پر از مسابقات طناب‌کشی، دوهای با مانع، بازی‌های فکری تیمی و خنده‌های بی‌پایان دانش‌آموزان.',
    highlights: ['ایستگاه‌های بازی بومی و سنتی', 'مسابقه آب‌بازی دوستانه', 'سرو میان‌وعده سالم میوه‌ای']
  },
  {
    id: 4,
    title: 'جشنواره نقاشی رنگین‌کمان',
    dateFa: '۲۸ فروردین',
    image: eventPaintingImg,
    category: 'هنر و فرهنگ',
    description: 'خلق بزرگترین نقاشی دیواری جمعی توسط دستان کوچک دانش‌آموزان با موضوع "محیط زیست و زمین زیبای ما" همراه با موسیقی آرامش‌بخش کودکانه.',
    highlights: ['نقاشی مشترک روی بوم پارچه‌ای ۵۰ متری', 'کارگاه چاپ دستی با سبزیجات و مهر', 'عکس یادگاری دسته‌جمعی']
  }
];
