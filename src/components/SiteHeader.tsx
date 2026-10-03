import React, { useState } from 'react';
import { Sliders, Menu, X, Sparkles } from 'lucide-react';
import { mockFooterInfo, mockSchoolInfo } from '../mockData';

interface SiteHeaderProps {
  onOpenCustomizer: () => void;
  onOpenAbout?: () => void;
  activeSection?: string;
  menuTopOffset?: number;
  onMenuTopOffsetChange?: (offset: number) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenCustomizer,
  onOpenAbout,
  activeSection = 'hero',
  menuTopOffset = 1,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'صفحه اصلی', href: '#hero' },
    { id: 'faculty', label: 'کادر آموزشی و اجرایی', href: '#faculty' },
    { id: 'events', label: 'رویدادها', href: '#events' },
    { id: 'workshops', label: 'کارگاه‌های مهارتی', href: '#workshops' },
    { id: 'contact', label: 'تماس با ما', href: '#contact' },
    { id: 'about', label: 'معرفی مدرسه', href: '#about' },
  ];

  return (
    <header 
      dir="rtl"
      className="sticky z-40 w-full transition-all duration-200"
      style={{
        top: `${menuTopOffset}px`,
        paddingTop: menuTopOffset === 0 ? '0px' : '0.25rem',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-1.5">
        {/* Claymorphic Organic Navigation Bar */}
        <nav 
          className={`clay-nav px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 transition-all duration-200 ${
            menuTopOffset === 0 ? 'rounded-t-none' : ''
          }`}
        >
          {/* Brand Logo & Sprout Emblem */}
          <a 
            href="#hero" 
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#E9F4E5] to-[#D5E6CF] shadow-[3px_4px_10px_rgba(141,155,109,0.35),inset_2px_3px_5px_rgba(255,255,255,0.9),inset_-2px_-3px_5px_rgba(156,172,124,0.3)] flex items-center justify-center text-[#2A4527] transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22V12" stroke="#254222" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 12C12 7.5 15.5 4 20 4C20 8.5 16.5 12 12 12Z" fill="#249D8F" opacity="0.95" />
                <path d="M12 15C12 11.5 9 9 5 9C5 12.5 8 15 12 15Z" fill="#3D6438" opacity="0.85" />
              </svg>
            </div>
            <div className="flex flex-col">
              <strong className="text-base sm:text-lg font-extrabold tracking-tight text-[#4A3D2E]">
                دبستان مهارت
              </strong>
              <span className="text-[10px] sm:text-[11px] text-[#7E6C58] font-medium hidden xs:inline">
                هوشمند و مهارتمحور
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links styled as tactile clay buttons */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    if (link.id === 'about' && onOpenAbout) {
                      e.preventDefault();
                      onOpenAbout();
                    }
                  }}
                  className={`clay-btn px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? '!text-white !bg-[linear-gradient(150deg,#2fb3a2_0%,#249d8f_45%,#1e8579_100%)] shadow-md scale-102'
                      : 'clay-btn--soft !text-[#4A3D2E] hover:!text-[#249D8F] hover:-translate-y-0.5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Action Controls & Contact CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme & Palette Customizer Toggle Button */}
            <button
              onClick={onOpenCustomizer}
              className="clay-btn clay-btn--soft px-2.5 sm:px-3 py-2 text-xs font-bold"
              title="تغییر تم رنگی خمیر و جلوه‌های سایت"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">تم خمیر</span>
            </button>

            {/* Direct Contact Button */}
            <a
              href="#contact"
              className="clay-btn hidden md:inline-flex px-3.5 py-2 text-xs"
            >
              <span>پیش‌ثبت‌نام</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-2xl bg-[#E8EFE1] text-[#344832] flex items-center justify-center shadow-[inset_2px_3px_5px_rgba(255,255,255,0.8),inset_-2px_-3px_5px_rgba(156,172,124,0.3)] transition-colors focus:outline-none"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown with Clay styling */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 clay-card clay-card--sm p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.id === 'about' && onOpenAbout) {
                        e.preventDefault();
                        onOpenAbout();
                      }
                    }}
                    className={`clay-btn w-full justify-between px-3.5 py-2.5 text-xs font-bold transition-all ${
                      isActive
                        ? '!text-white !bg-[linear-gradient(150deg,#2fb3a2_0%,#249d8f_45%,#1e8579_100%)]'
                        : 'clay-btn--soft !text-[#4A3D2E]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs">←</span>
                  </a>
                );
              })}

              <div className="pt-2 border-t border-[#D5E1C3] flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="clay-btn w-full py-2.5 text-xs text-center"
                >
                  پیش‌ثبت‌نام در مدرسه
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
