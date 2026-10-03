import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Users, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { createContainerVariants, createCardVariants, defaultViewport } from '../utils/motionVariants';
import { ClaySectionBubbles } from './ClaySectionBubbles';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const containerVariants = createContainerVariants(0.1);
  const cardVariants = createCardVariants(!!shouldReduceMotion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', phone: '', message: '' });
    }, 4500);
  };

  const contactCards = [
    {
      id: 'address',
      title: 'نشانی',
      content: 'مشهد، بلوار سرافرازان، سرافرازان ۱۱، ایمانیان ۱',
      icon: MapPin,
      iconBg: 'bg-[#FFEAE3]',
      iconColor: 'text-[#E76F51]',
      isMultiline: false,
    },
    {
      id: 'phones',
      title: 'شماره‌های تماس',
      content: ['۳۸۲۱۰۰۷۵', '۳۸۲۱۰۰۷۶', '۳۸۲۱۰۰۷۷'],
      icon: Phone,
      iconBg: 'bg-[#E3F6F2]',
      iconColor: 'text-[#249D8F]',
      isMultiline: true,
    },
    {
      id: 'accounting',
      title: 'شماره تماس واحد حسابداری',
      content: '09051621775',
      href: 'tel:09051621775',
      icon: Users,
      iconBg: 'bg-[#FFF2E2]',
      iconColor: 'text-[#D97706]',
      isMultiline: false,
    },
    {
      id: 'social',
      title: 'راه ارتباطی واتس اپ و تلگرام',
      content: '۰۹۱۵۲۰۰۱۷۷۵',
      href: 'https://wa.me/989152001775',
      icon: MessageCircle,
      iconBg: 'bg-[#E5F7EB]',
      iconColor: 'text-[#10B981]',
      isMultiline: false,
    },
    {
      id: 'email',
      title: 'ایمیل',
      content: 'info@maharat-school.ir',
      href: 'mailto:info@maharat-school.ir',
      icon: Mail,
      iconBg: 'bg-[#E3F2F8]',
      iconColor: 'text-[#0284C7]',
      isMultiline: false,
    },
    {
      id: 'hours',
      title: 'زمان پاسخگویی',
      content: 'شنبه تا پنج شنبه: ۸ صبح تا ۱۴',
      icon: Clock,
      iconBg: 'bg-[#FEF3CD]',
      iconColor: 'text-[#B45309]',
      isMultiline: false,
      hasMascot: true,
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Unified 3D Clay Bubbles and Ambient Glow */}
      <ClaySectionBubbles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Outer Grid dir="ltr" guarantees Form on LEFT and Info Cards on RIGHT */}
        <motion.div 
          dir="ltr"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Visually on LEFT: Form Card (7 Columns) */}
          <motion.div 
            dir="rtl"
            variants={cardVariants}
            className="lg:col-span-7"
          >
            <div 
              className="relative p-6 sm:p-8 md:p-10 rounded-[32px] sm:rounded-[40px] transition-transform duration-300"
              style={{
                background: 'linear-gradient(155deg, #F3F9EF 0%, #E9F4E3 55%, #E1EFE0 100%)',
                boxShadow: `
                  0 18px 40px rgba(141, 155, 109, 0.22),
                  0 4px 12px rgba(120, 140, 100, 0.12),
                  inset 0 3px 6px rgba(255, 255, 255, 0.95),
                  inset 0 -4px 8px rgba(156, 172, 124, 0.28)
                `,
                border: '2px solid rgba(255, 255, 255, 0.8)',
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name (Right) and Phone (Left) in RTL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name (Right side of row) */}
                  <div className="space-y-1.5 text-right">
                    <label className="block text-xs sm:text-[13px] font-bold text-[#6D7D67] pr-1">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="مثلاً سارا محمدی"
                      className="w-full px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium rounded-2xl text-[#2F3D2C] placeholder-[#94A58E] focus:outline-none focus:ring-2 focus:ring-[#249D8F]/30 transition-all text-right"
                      style={{
                        background: 'linear-gradient(150deg, #E2EEE0 0%, #D8E7D5 100%)',
                        boxShadow: `
                          inset 2px 3px 6px rgba(115, 135, 100, 0.32),
                          inset -2px -2px 4px rgba(255, 255, 255, 0.85)
                        `,
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                      }}
                    />
                  </div>

                  {/* Phone Number (Left side of row) */}
                  <div className="space-y-1.5 text-right">
                    <label className="block text-xs sm:text-[13px] font-bold text-[#6D7D67] pr-1">
                      شماره تماس
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="۰۹۱۵۰۰۰۰۰۰۰"
                      className="w-full px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-mono font-medium rounded-2xl text-[#2F3D2C] placeholder-[#94A58E] focus:outline-none focus:ring-2 focus:ring-[#249D8F]/30 transition-all text-right"
                      style={{
                        background: 'linear-gradient(150deg, #E2EEE0 0%, #D8E7D5 100%)',
                        boxShadow: `
                          inset 2px 3px 6px rgba(115, 135, 100, 0.32),
                          inset -2px -2px 4px rgba(255, 255, 255, 0.85)
                        `,
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Message Content */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs sm:text-[13px] font-bold text-[#6D7D67] pr-1">
                    متن پیام
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="سؤال یا پیام خود را بنویسید..."
                    className="w-full px-4 py-3.5 text-xs sm:text-sm font-medium rounded-2xl text-[#2F3D2C] placeholder-[#94A58E] focus:outline-none focus:ring-2 focus:ring-[#249D8F]/30 transition-all resize-none text-right"
                    style={{
                      background: 'linear-gradient(150deg, #E2EEE0 0%, #D8E7D5 100%)',
                      boxShadow: `
                        inset 2px 3px 7px rgba(115, 135, 100, 0.32),
                        inset -2px -2px 4px rgba(255, 255, 255, 0.85)
                      `,
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                    }}
                  />
                </div>

                {/* Row 3: Submit Button at Right side as in 2.PNG */}
                <div className="pt-2 flex items-center justify-start gap-4">
                  {/* Send Button placed on the right side of the bottom row */}
                  <button
                    type="submit"
                    className="group relative cursor-pointer inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-black text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                    style={{
                      background: 'linear-gradient(150deg, #2FC4B6 0%, #249D8F 55%, #187266 100%)',
                      boxShadow: `
                        0 8px 20px rgba(36, 157, 143, 0.42),
                        0 2px 6px rgba(18, 76, 68, 0.22),
                        inset 0 2px 3px rgba(255, 255, 255, 0.65),
                        inset 0 -2px 4px rgba(12, 60, 54, 0.4)
                      `,
                      border: '1px solid rgba(255, 255, 255, 0.45)',
                    }}
                  >
                    <span>ارسال پیام</span>
                    <Send className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  </button>

                  {submitted && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E7D71] animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-[#249D8F]" />
                      <span>پیام شما با موفقیت ثبت شد.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Visually on RIGHT: 6 Stacked Cards (5 Columns) */}
          <motion.div 
            dir="rtl"
            variants={cardVariants}
            className="lg:col-span-5 space-y-3.5 sm:space-y-4"
          >
            {contactCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className="relative group p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(150deg, #F9FCF7 0%, #F1F7EE 60%, #E9F3E5 100%)',
                    boxShadow: `
                      0 8px 20px rgba(141, 155, 109, 0.18),
                      0 2px 6px rgba(120, 140, 100, 0.08),
                      inset 0 2px 4px rgba(255, 255, 255, 0.95),
                      inset 0 -2px 4px rgba(156, 172, 124, 0.22)
                    `,
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                  }}
                >
                  {/* Mirrored layout: Icon on RIGHT (first in RTL), Text to the LEFT of icon */}
                  <div className="flex items-center justify-start gap-3.5">
                    {/* Circular Icon Badge on the RIGHT (first child in RTL) */}
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                      style={{
                        boxShadow: `
                          0 3px 8px rgba(0, 0, 0, 0.06),
                          inset 0 1.5px 2px rgba(255, 255, 255, 0.8),
                          inset 0 -1.5px 2px rgba(0, 0, 0, 0.08)
                        `,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Text Details to the LEFT of the icon */}
                    <div className="flex-1 text-right pr-0.5">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#71826B] block mb-0.5">
                        {card.title}
                      </span>

                      {card.isMultiline && Array.isArray(card.content) ? (
                        <div className="space-y-0.5">
                          {card.content.map((phoneNum, idx) => (
                            <a
                              key={idx}
                              href={`tel:${phoneNum}`}
                              className="block text-xs sm:text-[13px] font-black font-mono text-[#324530] hover:text-[#249D8F] transition-colors leading-tight"
                            >
                              {phoneNum}
                            </a>
                          ))}
                        </div>
                      ) : card.href ? (
                        <a
                          href={card.href}
                          className="text-xs sm:text-[13px] font-black font-mono text-[#324530] hover:text-[#249D8F] transition-colors"
                        >
                          {card.content as string}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-[13px] font-bold text-[#324530] leading-snug m-0">
                          {card.content as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mascot Puppy Dog on Card 6 (at the far bottom-LEFT) */}
                  {card.hasMascot && (
                    <div 
                      className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 pointer-events-none select-none drop-shadow-lg z-20"
                      title="ماسکوت مدرسه مهارت"
                    >
                      <svg width="58" height="58" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-6">
                        {/* Shadow */}
                        <ellipse cx="35" cy="62" rx="22" ry="6" fill="rgba(80,60,40,0.22)" />
                        
                        {/* Body */}
                        <ellipse cx="35" cy="46" rx="16" ry="15" fill="#995D3F" />
                        <ellipse cx="35" cy="48" rx="10" ry="10" fill="#E8C39E" />
                        
                        {/* Back paws */}
                        <ellipse cx="20" cy="54" rx="6" ry="5" fill="#7D4629" />
                        <ellipse cx="50" cy="54" rx="6" ry="5" fill="#7D4629" />
                        
                        {/* Front paws */}
                        <ellipse cx="29" cy="56" rx="5" ry="4" fill="#995D3F" />
                        <ellipse cx="41" cy="56" rx="5" ry="4" fill="#995D3F" />
                        <circle cx="28" cy="58" r="1.5" fill="#4A2612" />
                        <circle cx="31" cy="58" r="1.5" fill="#4A2612" />
                        <circle cx="40" cy="58" r="1.5" fill="#4A2612" />
                        <circle cx="43" cy="58" r="1.5" fill="#4A2612" />

                        {/* Head */}
                        <ellipse cx="35" cy="27" rx="17" ry="15" fill="#A86847" />
                        
                        {/* Ears */}
                        <path d="M 19 18 C 12 18, 12 34, 18 36 C 22 36, 23 24, 21 19 Z" fill="#69371D" />
                        <path d="M 51 18 C 58 18, 58 34, 52 36 C 48 36, 47 24, 49 19 Z" fill="#69371D" />

                        {/* Snout */}
                        <ellipse cx="35" cy="31" rx="8" ry="6.5" fill="#F0D3B7" />
                        
                        {/* Nose */}
                        <ellipse cx="35" cy="28" rx="3.5" ry="2.5" fill="#24140E" />
                        <circle cx="34" cy="27.5" r="0.8" fill="#FFFFFF" />
                        
                        {/* Mouth */}
                        <path d="M 35 30.5 L 35 33 M 32.5 33.5 C 33.5 34.5, 36.5 34.5, 37.5 33.5" stroke="#4A2612" strokeWidth="1.2" strokeLinecap="round" />

                        {/* Eyes */}
                        <ellipse cx="27" cy="23" rx="3" ry="3.5" fill="#1C100B" />
                        <ellipse cx="43" cy="23" rx="3" ry="3.5" fill="#1C100B" />
                        <circle cx="26" cy="22" r="1.2" fill="#FFFFFF" />
                        <circle cx="42" cy="22" r="1.2" fill="#FFFFFF" />
                        <circle cx="28" cy="24.5" r="0.6" fill="#FFFFFF" />
                        <circle cx="44" cy="24.5" r="0.6" fill="#FFFFFF" />

                        {/* Eyebrows */}
                        <ellipse cx="26" cy="18" rx="2" ry="1.2" fill="#F0D3B7" />
                        <ellipse cx="44" cy="18" rx="2" ry="1.2" fill="#F0D3B7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
