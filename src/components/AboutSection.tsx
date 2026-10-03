import React from 'react';
import { Sparkles, CheckCircle2, Target, HeartHandshake, Compass, BookOpen, Users2, Lightbulb } from 'lucide-react';
import { mockSchoolInfo, DEFAULT_GENERAL_SETTINGS } from '../mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutSectionProps {
  onOpenIntroModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenIntroModal }) => {
  const { ref, isVisible } = useScrollReveal();

  const pillars = [
    {
      id: 'pbl',
      title: 'آموزش پروژه‌محور (PBL)',
      desc: 'دانش‌آموزان به جای حفظ‌کردن تئوری‌ها، با اجرای پروژه‌های ملموس و حل مسئله واقعی یاد می‌گیرند.',
      icon: Target,
      color: '#3B6837',
      bg: '#EEF4EC',
    },
    {
      id: 'multi-int',
      title: 'پرورش هوش‌های چندگانه',
      desc: 'کشف و شکوفایی استعدادهای نهفته در زمینه‌های تجسمی، حرکتی، منطقی و مهارت‌های ارتباطی.',
      icon: Lightbulb,
      color: '#A0682B',
      bg: '#FDF5EC',
    },
    {
      id: 'workshop-centered',
      title: 'کارگاه‌های مهارتی تخصصی',
      desc: 'کار با ابزار واقعی در کارگاه‌های چوب، چرم‌دوزی، رباتیک و آزمایشگاه از همان پایه‌های اول دبستان.',
      icon: Compass,
      color: '#296884',
      bg: '#EEF6F9',
    },
    {
      id: 'family-companion',
      title: 'همراهی مستمر اولیا و مربیان',
      desc: 'ارائه کارنامه مهارتی و گزارش‌های دوره‌ای رشد اخلاقی و شخصیتی کودک در محیطی صمیمی و شفاف.',
      icon: HeartHandshake,
      color: '#8A3B58',
      bg: '#FAF0F4',
    },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-20 sm:py-24 relative overflow-hidden reveal-fade-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Background organic blur accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#DFEBDC]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#E8E2D2]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EEDF] border border-[#CCDBC6] text-xs font-semibold text-[#2D4D28] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#426F3A]" />
            <span>درباره دبستان مهارت</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2C1A] tracking-tight mb-5 leading-tight">
            مدرسه‌ای برای ساختن آینده با دست‌ها و اندیشه‌های کوچک
          </h2>
          <p className="text-base sm:text-lg text-[#52644F] leading-relaxed">
            {mockSchoolInfo.description} ما باور داریم هر کودک دانشمندی کوچک و آفریننده‌ای خلاق است که با انگیزش درست، به اوج توانمندی‌های فردی خود می‌رسد.
          </p>
        </div>

        {/* Vision & Mission Tactile Clay Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="clay-wrap">
            <div className="clay-card clay-card--lg clay-card-curve-1 p-8 h-full">
              <div className="w-12 h-12 rounded-[20px_26px_18px_24px/24px_18px_24px_20px] bg-[#E2EDE0] text-[#249D8F] flex items-center justify-center font-bold text-lg mb-5 shadow-[inset_2px_3px_5px_rgba(255,255,255,0.9),inset_-2px_-3px_5px_rgba(156,172,124,0.3)]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#5F4D3C] mb-3">
                رسالت و ماموریت ما
              </h3>
              <p className="text-[#5F4D3C]/90 leading-relaxed text-sm sm:text-base">
                {mockSchoolInfo.mission} در دبستان مهارت، آموزش تنها پشت میز نشستن و پر کردن دفترچه‌ها نیست؛ دانش‌آموزان در کنار ریاضی، علوم و ادبیات، تفکر انتقادی، اخلاق اجتماعی، سخنوری و دست‌ورزی را می‌آموزند.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="clay-wrap">
            <div 
              className="clay-card clay-card--lg clay-card-curve-2 p-8 h-full"
              style={{
                ['--clay-bg' as any]: 'linear-gradient(150deg, #FDEEE8 0%, #FBE3D8 55%, #F6D8C9 100%)',
                ['--clay-shadow-outer' as any]: 'rgba(231,111,81,0.32)',
                ['--clay-inset-dark' as any]: 'rgba(226,143,114,0.28)',
                ['--clay-accent' as any]: '#E76F51',
              }}
            >
              <div className="w-12 h-12 rounded-[20px_26px_18px_24px/24px_18px_24px_20px] bg-[#FFF0E8] text-[#E76F51] flex items-center justify-center font-bold text-lg mb-5 shadow-[inset_2px_3px_5px_rgba(255,255,255,0.9),inset_-2px_-3px_5px_rgba(231,111,81,0.25)]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#5F4D3C] mb-3">
                چشم‌انداز آموزشی
              </h3>
              <p className="text-[#5F4D3C]/90 leading-relaxed text-sm sm:text-base">
                {mockSchoolInfo.vision} ایجاد مدرسه‌ای مستقل، شاد، اخلاق‌مدار و نوآور که فارغ‌التحصیلان آن با استقلال فکری، مهارت حل مسئله و اعتماد به نفس بالا گام به مقاطع بعدی تحصیلی و زندگی اجتماعی می‌گذارند.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Learning */}
        <div className="mb-14">
          <h3 className="text-center text-xl sm:text-2xl font-extrabold text-[#5F4D3C] mb-8">
            ارکان آموزش مهارت‌محور در دبستان مهارت
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const curveClass = idx % 2 === 0 ? 'clay-card-curve-1' : 'clay-card-curve-3';
              return (
                <div key={item.id} className="clay-wrap">
                  <div
                    className={`clay-card clay-card--sm ${curveClass} p-6 h-full flex flex-col justify-between`}
                  >
                    <div>
                      <div 
                        className="w-11 h-11 rounded-[18px_24px_16px_22px/22px_16px_22px_18px] flex items-center justify-center mb-4 shadow-[inset_2px_3px_5px_rgba(255,255,255,0.9),inset_-2px_-3px_5px_rgba(156,172,124,0.3)]"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-[#5F4D3C] text-base mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#73604C] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA trigger for full school intro */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenIntroModal}
            className="clay-btn px-8 py-3.5 text-sm font-bold"
          >
            <span>مشاهده معرفی کامل و امکانات مدرسه</span>
            <span className="text-xs">←</span>
          </button>
        </div>
      </div>
    </section>
  );
};
