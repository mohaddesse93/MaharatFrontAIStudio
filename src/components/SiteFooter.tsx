import React from 'react';
import { ArrowUp, Instagram, Send, Sliders } from 'lucide-react';

interface SiteFooterProps {
  onOpenStory?: () => void;
  onOpenCustomizer?: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onOpenCustomizer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      dir="rtl"
      className="w-full border-t border-[#E5E0D2] bg-[#F4F8F1] py-8 text-xs text-[#556952]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E9F4E5] to-[#D5E6CF] text-[#2A4527] flex items-center justify-center font-bold shadow-xs text-sm">
              🌱
            </div>
            <span className="text-sm font-extrabold text-[#2F402D]">
              دبستان پسرانه مهارت
            </span>
          </div>

          {/* Exact License Sentence preserved */}
          <div className="text-center text-xs text-[#6B7E67] font-medium leading-relaxed">
            © ۱۴۰۵ تمامی حقوق برای دبستان پسرانه مهارت محفوظ است.
          </div>

          {/* Minimal Controls & Back to Top */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://instagram.com/maharat_school"
              target="_blank"
              rel="noreferrer"
              className="clay-btn clay-btn--soft w-8 h-8 !p-0 text-[#8C4123] rounded-xl flex items-center justify-center transition-all hover:scale-105"
              title="اینستاگرام دبستان مهارت"
              aria-label="اینستاگرام"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://t.me/maharat_school"
              target="_blank"
              rel="noreferrer"
              className="clay-btn clay-btn--soft w-8 h-8 !p-0 text-[#2F5370] rounded-xl flex items-center justify-center transition-all hover:scale-105"
              title="کانال تلگرام دبستان مهارت"
              aria-label="تلگرام"
            >
              <Send className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="clay-btn clay-btn--soft px-3 py-1.5 text-[11px] font-bold text-[#2A3E27] inline-flex items-center gap-1 transition-transform hover:-translate-y-0.5"
              title="بازگشت به ابتدای صفحه"
            >
              <span>بالا</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
