import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PageFeaturesProps {
  language: 'en' | 'fa';
  onExplore: () => void;
}

export const PageFeatures: React.FC<PageFeaturesProps> = ({
  language,
  onExplore,
}) => {
  const isRtl = language === 'fa';

  const metricsEn = [
    {
      num: '15 : 1',
      title: 'Individualized Mentorship Ratio',
      desc: 'Small studio cohorts fostering deep critical dialogue between scholars and faculty.',
    },
    {
      num: '100%',
      title: 'Global University Progression',
      desc: 'Graduates earn entrance into premier research universities across Europe, the Americas, and Asia.',
    },
    {
      num: '4.8 Ha',
      title: 'Biophilic Botanical Campus',
      desc: 'Curved stone colonnades and courtyard gardens designed for reflective, focused learning.',
    },
  ];

  const metricsFa = [
    {
      num: '۱۵ : ۱',
      title: 'نسبت راهنمایی تحصیلی فردی',
      desc: 'کلاس‌های کم‌جمعیت برای گفتگوی عمیق علمی و تفکر انتقادی میان اساتید و دانش‌آموزان.',
    },
    {
      num: '۱۰۰٪',
      title: 'پذیرش در برترین دانشگاه‌ها',
      desc: 'فارغ‌التحصیلان ما در معتبرترین دانشگاه‌های پژوهشی جهان به ادامه تحصیل می‌پردازند.',
    },
    {
      num: '۴.۸ هکتار',
      title: 'پردیس معماری پایدار و فضای سبز',
      desc: 'فضاهای یادگیری با بهره‌گیری از نور طبیعی، باغ‌های گیاه‌شناسی و معماری ارگانیک.',
    },
  ];

  const metrics = isRtl ? metricsFa : metricsEn;

  return (
    <section 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12"
    >
      {/* Proof Metrics Section */}
      <div className="border-t border-[#E5E0D2] pt-12 sm:pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#5A6D58] block mb-2">
              {isRtl ? '۰۱. شاخص‌های برتر آموزشی' : '01. ACADEMIC FOUNDATIONS'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold text-[#1F291E] ${isRtl ? 'font-fa' : 'font-display'}`}>
              {isRtl ? 'آموزش اصیل، تجربه‌ای دگرگون‌کننده' : 'Cultivating Confident Minds'}
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#374936] hover:text-[#1F291E] group"
          >
            <span>{isRtl ? 'مشاهده دستاوردهای تحصیلی' : 'Explore Academic Achievements'}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 3 Metric Cards with Clean Editorial Style (Anti-slop, zero pills) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#FAF9F5] border border-[#E9E4D8] transition-all duration-300 hover:border-[#CCD5CA] hover:shadow-sm"
            >
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#273B25] mb-3 tracking-tight">
                {item.num}
              </div>
              <h3 className={`text-base font-semibold text-[#1F291E] mb-2 ${isRtl ? 'font-fa' : ''}`}>
                {item.title}
              </h3>
              <p className={`text-xs sm:text-sm text-[#5C6E5A] leading-relaxed ${isRtl ? 'font-fa' : ''}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
