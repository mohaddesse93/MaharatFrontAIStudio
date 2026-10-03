import React, { useState } from 'react';
import { X, Compass, Sparkles, BookOpen, Building, CheckCircle2, Award, Users, Wrench } from 'lucide-react';
import { COURTYARD_IMAGE, ROBOTICS_IMAGE, OUTDOOR_IMAGE, PAINTING_IMAGE } from '../constants';
import { mockSchoolInfo, DEFAULT_GENERAL_SETTINGS } from '../mockData';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'mission' | 'campus' | 'academics' | 'admissions'>('mission');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        dir="rtl"
        className="w-full max-w-3xl bg-[#FAF9F5] rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-[#E7E2D5] flex items-center justify-between bg-[#F4F0E6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E3EFE0] text-[#284924] flex items-center justify-center font-bold text-lg shadow-inner">
              🌱
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#546853] block mb-0.5">
                معرفی کامل مجموعه آموزشی
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F291E]">
                دبستان هوشمند و مهارت‌محور مهارت
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#E5DFCFC7] hover:bg-[#D8D0BF] flex items-center justify-center text-[#4B5E48] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E7E2D5] bg-[#EFECE2]/70 px-6 gap-2 pt-2 overflow-x-auto">
          {[
            { id: 'mission', label: 'رسالت و ارزش‌ها', icon: Compass },
            { id: 'campus', label: 'فضا و امکانات پردیس', icon: Building },
            { id: 'academics', label: 'الگوی آموزش پروژه‌محور', icon: BookOpen },
            { id: 'admissions', label: 'مراحل پذیرش و ثبت‌نام', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-[#334E31] text-[#1D2F1B] bg-[#FAF9F5] rounded-t-xl'
                    : 'border-transparent text-[#627361] hover:text-[#1D2F1B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-[#313C30]">
          {activeTab === 'mission' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#EEF4EC] border border-[#DEE9DC]">
                <p className="text-base sm:text-lg italic text-[#253924] font-medium leading-relaxed">
                  «در دبستان مهارت، آموزش تنها انباشتن محفوظات نیست؛ ما فرزندانی متفکر، اخلاق‌مدار، شاد و دست‌ورز برای ساختن ایرانی پرامید تربیت می‌کنیم.»
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#EAE5D9]">
                  <div className="flex items-center gap-2 text-[#354E33] font-bold mb-2 text-sm">
                    <Sparkles className="w-4 h-4 text-[#446E3F]" />
                    <span>یادگیری مبتنی بر کنجکاوی</span>
                  </div>
                  <p className="text-xs text-[#5D6D5C] leading-relaxed">
                    دانش‌آموزان به جای پاسخ‌های آماده، مهارت طرح پرسش‌های عمیق و حل خلاقانه مسائل پیچیده را در فضای تعاملی کارگاه‌ها فرا می‌گیرند.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EAE5D9]">
                  <div className="flex items-center gap-2 text-[#354E33] font-bold mb-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#446E3F]" />
                    <span>شایستگی‌های فردی و اجتماعی</span>
                  </div>
                  <p className="text-xs text-[#5D6D5C] leading-relaxed">
                    تقویت مهارت کار تیمی، مسئولیت‌پذیری اخلاقی و استقلال فردی در محیطی سرشار از نشاط کودکانه و احترام متقابل.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campus' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-[#E4DFD2] aspect-[16/10] relative">
                  <img
                    src={ROBOTICS_IMAGE}
                    alt="Robotics Lab"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-bold">
                      آزمایشگاه هوشمند و کارگاه رباتیک
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E4DFD2] aspect-[16/10] relative">
                  <img
                    src={PAINTING_IMAGE}
                    alt="Art Atelier"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-bold">
                      آتلیه تخصصی چرمدوزی، هنر و سفال
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E9E4D8]">
                <h4 className="font-bold text-[#233521] mb-2 text-xs">
                  امکانات سخت‌افزاری و فضای پردیس:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#526450]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6C38]" />
                    <span>کلاس‌های مجهز به نمایشگر هوشمند</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6C38]" />
                    <span>کارگاه ایمن چوب و ابزار</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6C38]" />
                    <span>زمین بازی و حیاط چمن استاندارد</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F6C38]" />
                    <span>کتابخانه غنی با بیش از ۲۰۰۰ جلد کتاب</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academics' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9]">
                <h4 className="font-bold text-sm text-[#1F2F1D] mb-1">
                  آموزش پروژه‌محور (Project-Based Learning)
                </h4>
                <p className="text-xs text-[#546852] leading-relaxed">
                  دانش‌آموزان به جای حفظ فرمول‌ها، پروژه‌های واقعی مانند ساخت مدل تصفیه آب، برنامه‌نویسی بازی‌های ساده رایانه‌ای، دوخت کیف چرمی و پرورش گیاهان دارویی را در کارگاه‌ها اجرا می‌کنند.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9]">
                <h4 className="font-bold text-sm text-[#1F2F1D] mb-1">
                  ارزشیابی توصیفی و کارنامه مهارتی
                </h4>
                <p className="text-xs text-[#546852] leading-relaxed">
                  در کنار کارنامه تحصیلی مصوب آموزش و پرورش، اولیا به صورت ماهانه کارنامه رشد مهارتی فرزند خود را دریافت می‌کنند که پیشرفت دست‌ورزی، دقت، حل مسئله و مشارکت گروهی را مستند می‌کند.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'admissions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9]">
                <h4 className="font-bold text-sm text-[#1F2F1D] mb-2">
                  مراحل پیش‌ثبت‌نام سال تحصیلی ۱۴۰۶–۱۴۰۵:
                </h4>
                <ol className="space-y-2.5 text-xs text-[#526550] list-decimal list-inside">
                  <li>ثبت مشخصات اولیه در فرم آنلاین تماس یا تماس تلفنی با مدرسه.</li>
                  <li>هماهنگی روز و ساعت بازدید حضوری ولی و دانش‌آموز از فضای مدرسه.</li>
                  <li>جلسه معارفه روانشناختی و استعدادیابی صمیمانه برای کودک (بدون استرس آزمون).</li>
                  <li>تکمیل مدارک و نهایی‌سازی ثبت‌نام در پایه تحصیلی مورد نظر.</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF5EB] border border-[#D5E6D2] text-center">
                <p className="text-xs text-[#2D4D28] font-bold mb-2">
                  ظرفیت کلاس‌ها محدود (حداکثر ۱۸ نفر در هر کلاس) جهت حفظ کیفیت آموزش
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-block px-6 py-2 rounded-full bg-[#354E33] text-white text-xs font-semibold hover:bg-[#253923] transition-colors"
                >
                  تکمیل فرم درخواست پیش‌ثبت‌نام
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E7E2D5] bg-[#F4F0E6] flex items-center justify-between">
          <span className="text-xs text-[#6C7E6A]">
            دبستان هوشمند و مهارت‌محور مهارت · مشهد
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-bold text-white bg-[#344E32] hover:bg-[#253923] transition-colors"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
