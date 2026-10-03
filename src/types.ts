export interface SlideItem {
  id: string;
  url: string;
  titleEn: string;
  titleFa: string;
  captionEn: string;
  captionFa: string;
}

export interface WidgetCustomization {
  // Content
  language: 'en' | 'fa';
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  brandName: string;
  
  // Visual Theme & Clay
  clayTheme: 'sage' | 'forest' | 'matcha' | 'pistachio' | 'eucalyptus' | 'emerald' | 'ivory' | 'terracotta' | 'mist' | 'rose' | string;
  customClayBg?: string; // Custom green or hex for clay surface
  customTextColor?: string; // Custom green or hex for typography
  recessDepth: 'subtle' | 'medium' | 'deep' | 'sculpted'; // شدت فرورفتگی
  tiltEnabled: boolean;
  showSproutAccent: boolean;
  leafTopOffset?: number; // فاصله عمودی برگ از بالای باکس هیرو به پیکسل (-50 تا +40)
  leafRightOffset?: number; // جابجایی افقی برگ به پیکسل (-40 تا +60)
  
  // باکس دریچه (کجکی بالای سمت چپ هیرو)
  showDaricheh?: boolean; // فعال/غیرفعال بودن باکس دریچه
  darichehSub?: string; // متن خط اول (پیش‌فرض: ورود به)
  darichehTitle?: string; // عنوان باکس / خط دوم (پیش‌فرض: دریچه)
  darichehUrl?: string; // آدرس ورود به سامانه دریچه
  darichehRotate?: number; // زاویه کج بودن به درجه (-35 تا +35، پیش‌فرض -10)
  darichehTop?: number; // فاصله عمودی از بالای هیرو به پیکسل (-50 تا +120، پیش‌فرض 14)
  darichehLeft?: number; // فاصله افقی از چپ هیرو به پیکسل (-40 تا +160، پیش‌فرض 35)

  // باکس ساعت خمیری هوشمند (سمت راست هیرو با طراحی ارگانیک)
  showClockWidget?: boolean; // فعال/غیرفعال بودن ساعت
  clockSize?: 'small' | 'normal' | 'large'; // اندازه باکس ساعت
  clockColor?: string; // رنگ سفارشی خمیر ساعت
  clockTop?: number; // فاصله عمودی از بالای هیرو به پیکسل (-50 تا +120، پیش‌فرض 14)
  clockRight?: number; // فاصله افقی از راست هیرو به پیکسل (-40 تا +160، پیش‌فرض 35)
  clockRotate?: number; // زاویه کج بودن به درجه (-35 تا +35، پیش‌فرض 8)

  heroWidth?: number; // عرض باکس هیرو به پیکسل (پیش‌فرض 1150)
  statBoxSize?: 'normal' | 'large' | 'xlarge'; // اندازه باکس‌های آمار
  statBoxOffset?: number; // جابجایی عمودی باکس‌های آمار به پیکسل (مثلاً 30)
  menuTopOffset?: number; // فاصله منو از بالای صفحه به پیکسل (0 تا 50)
  heroTopGap?: number; // فاصله بین منو و هیرو سکشن به پیکسل (0 تا 80)
  sliderBadgeSize?: 'small' | 'normal' | 'large' | 'xlarge'; // اندازه باکس زیر اسلایدر
  sliderBadgeOffset?: number; // موقعیت عمودی باکس زیر اسلایدر به پیکسل (-20 تا +30)
  
  // Slider Images
  slides: SlideItem[];
  autoPlaySlider: boolean;
  sliderInterval: number; // in seconds, e.g. 4
  showSliderControls: boolean;
}

export interface ClayPalette {
  id: string;
  name: string;
  nameFa: string;
  bgLight: string;
  bgDark: string;
  recessShadowColor: string;
  recessHighlightColor: string;
  outerShadowColor: string;
  textPrimary: string;
  textSecondary: string;
  accentLeaf: string;
  btnBorder: string;
  btnHoverBg: string;
}
