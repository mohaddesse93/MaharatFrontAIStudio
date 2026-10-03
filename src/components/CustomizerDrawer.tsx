import React from 'react';
import { WidgetCustomization } from '../types';
import { CLAY_PALETTES, DEFAULT_SLIDES, DEFAULT_CONFIG_EN, DEFAULT_CONFIG_FA, GREEN_CLAY_SWATCHES, GREEN_TEXT_SWATCHES } from '../constants';
import { X, Sparkles, Sliders, Layers, Palette, Image as ImageIcon, Type, RotateCcw, Clock, Check, Pipette, Maximize2, ArrowUpDown, Plus, Minus } from 'lucide-react';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: WidgetCustomization;
  onChange: (newConfig: WidgetCustomization) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
}) => {
  if (!isOpen) return null;

  const isRtl = config.language === 'fa';

  const handleReset = () => {
    onChange(config.language === 'fa' ? { ...DEFAULT_CONFIG_FA } : { ...DEFAULT_CONFIG_EN });
  };

  const toggleSlideInclusion = (slideId: string) => {
    const isPresent = config.slides.some((s) => s.id === slideId);
    if (isPresent) {
      if (config.slides.length <= 1) return; // Keep at least 1 slide
      onChange({
        ...config,
        slides: config.slides.filter((s) => s.id !== slideId),
      });
    } else {
      const original = DEFAULT_SLIDES.find((s) => s.id === slideId);
      if (original) {
        onChange({
          ...config,
          slides: [...config.slides, original],
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col border-l border-[#E5E0D3] overflow-hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E3D7] flex items-center justify-between bg-[#F4F1E8]">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#3E523D]" />
            <div>
              <h2 className="text-base font-semibold text-[#1F291E]">
                {isRtl ? 'شخصی‌سازی ویجت ۳بعدی خمیری' : '3D Clay Widget Studio'}
              </h2>
              <p className="text-xs text-[#637362]">
                {isRtl ? 'تنظیم اسلایدر، فرورفتگی، پیچ و خم و رنگ خمیر' : 'Tune slider, organic curves & clay relief'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E4DFD2] text-[#556353] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable controls */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-[#2C332B]">
          {/* Section 1: Recess Depth (فرورفتگی وسط) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3E523D]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'شدت فرورفتگی (عمق ۳بعدی)' : '3D Carved Recess Depth'}
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EEF3EB] text-[#344833] font-medium">
                {config.recessDepth}
              </span>
            </div>
            <p className="text-xs text-[#6B7869] mb-3">
              {isRtl 
                ? 'تنظیم سایه داخلی و تراش خمیری پنجره اسلایدر عکس (حفظ فرم اصلی فرورفتگی)' 
                : 'Controls the carved 3D bevel and inner shadow slope inside the cut-out.'}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {(['subtle', 'medium', 'deep', 'sculpted'] as const).map((depth) => {
                const isSelected = config.recessDepth === depth;
                const depthLabelsFa = {
                  subtle: 'ملایم',
                  medium: 'استاندارد',
                  deep: 'عمیق',
                  sculpted: 'برجسته',
                };
                return (
                  <button
                    key={depth}
                    onClick={() => onChange({ ...config, recessDepth: depth })}
                    className={`py-2 px-2 rounded-xl text-xs font-medium capitalize transition-all border ${
                      isSelected
                        ? 'bg-[#374936] text-white border-[#374936] shadow-sm'
                        : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                    }`}
                  >
                    {isRtl ? depthLabelsFa[depth] : depth}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Hero Box Width (ابعاد و عرض باکس هیرو به پیکسل) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#3E523D]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'عرض و اندازه باکس هیرو' : 'Hero Box Width'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#249D8F]/15 text-[#177064] font-bold font-mono">
                {config.heroWidth || 1150}px
              </span>
            </div>
            <p className="text-xs text-[#6B7869] mb-3">
              {isRtl 
                ? 'تنظیم دقیق عرض باکس هیرو به پیکسل (حفظ انحناها و فرم سه‌بعدی):' 
                : 'Adjust hero box width in pixels while maintaining 3D curves.'}
            </p>
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="range" 
                min={860} 
                max={1260} 
                step={10} 
                value={config.heroWidth || 1150}
                onChange={(e) => onChange({ ...config, heroWidth: Number(e.target.value) })}
                className="flex-1 accent-[#249D8F] cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { label: 'کوچک (940)', val: 940 },
                { label: 'متوسط (1040)', val: 1040 },
                { label: '۱۱۵۰ (فعلی)', val: 1150 },
                { label: 'بزرگ (1220)', val: 1220 },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => onChange({ ...config, heroWidth: item.val })}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium transition-all border ${
                    (config.heroWidth || 1150) === item.val
                      ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                      : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Menu Vertical Position (موقعیت عمودی و ارتفاع منو) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#249D8F]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'فاصله منو از بالای صفحه' : 'Menu Top Distance'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#249D8F]/15 text-[#249D8F] font-bold font-mono">
                {config.menuTopOffset ?? 0}px
              </span>
            </div>

            <p className="text-xs text-[#6B7869] mb-3">
              {isRtl
                ? 'تنظیم دستی و پیکسلی موقعیت منو (بالا بردن تا چسبیدن کامل به سقف یا پایین آوردن به حالت شناور):'
                : 'Adjust menu vertical offset from the top boundary.'}
            </p>

            {/* Slider with step buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, menuTopOffset: Math.max(0, (config.menuTopOffset ?? 0) - 2) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="کاهش فاصله"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={config.menuTopOffset ?? 0}
                  onChange={(e) => onChange({ ...config, menuTopOffset: Number(e.target.value) })}
                  className="flex-1 accent-[#249D8F] cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => onChange({ ...config, menuTopOffset: Math.min(40, (config.menuTopOffset ?? 0) + 2) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="افزایش فاصله"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                {[
                  { label: '۰ (چسبیده)', val: 0 },
                  { label: '۲px (انتخابی)', val: 2 },
                  { label: '۱۲px (متوسط)', val: 12 },
                  { label: '۲۰px (شناور)', val: 20 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => onChange({ ...config, menuTopOffset: item.val })}
                    className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                      (config.menuTopOffset ?? 2) === item.val
                        ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                        : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Gap between Menu and Hero Section (فاصله بین منو و هیرو سکشن) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#249D8F]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'فاصله بین منو و هیرو سکشن' : 'Gap: Menu to Hero Section'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#249D8F]/15 text-[#249D8F] font-bold font-mono">
                {config.heroTopGap ?? 32}px
              </span>
            </div>

            <p className="text-xs text-[#6B7869] mb-3">
              {isRtl
                ? 'تنظیم فاصله عمودی بین نوار منو و کادر خمیری هیرو سکشن:'
                : 'Adjust vertical spacing between navigation bar and hero widget.'}
            </p>

            {/* Slider with step buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, heroTopGap: Math.max(0, (config.heroTopGap ?? 32) - 4) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="کاهش فاصله"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <input
                  type="range"
                  min={0}
                  max={80}
                  step={2}
                  value={config.heroTopGap ?? 32}
                  onChange={(e) => onChange({ ...config, heroTopGap: Number(e.target.value) })}
                  className="flex-1 accent-[#249D8F] cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => onChange({ ...config, heroTopGap: Math.min(80, (config.heroTopGap ?? 32) + 4) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="افزایش فاصله"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                {[
                  { label: '۰px (چسبیده)', val: 0 },
                  { label: '۱۶px (انتخابی)', val: 16 },
                  { label: '۳۲px (معمولی)', val: 32 },
                  { label: '۴۸px (باز)', val: 48 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => onChange({ ...config, heroTopGap: item.val })}
                    className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                      (config.heroTopGap ?? 16) === item.val
                        ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                        : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Distance between Leaf & Hero Box (فاصله بین برگ و باکس هیرو) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8ea694]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'فاصله بین برگ و باکس هیرو' : 'Leaf & Hero Box Distance'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#8ea694]/20 text-[#2f4834] font-bold font-mono">
                {(config.leafTopOffset ?? 19) === 0 ? '۰px (لبه)' : (config.leafTopOffset ?? 19) > 0 ? `+${config.leafTopOffset ?? 19}px (روی خمیر)` : `${config.leafTopOffset}px (بالا)`}
              </span>
            </div>

            <p className="text-xs text-[#6B7869] mb-3">
              {isRtl
                ? 'تنظیم فاصله شاخه و برگ گیاهی از بالای کادر هیرو (بالا بردن و فاصله دادن از باکس یا نشاندن روی لبه):'
                : 'Adjust vertical clearance of botanical leaf above or onto the hero box:'}
            </p>

            {/* Vertical Distance Slider */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs text-[#556853]">
                <span>فاصله عمودی (بالا / پایین):</span>
                <span className="font-mono font-bold text-[#355239]">
                  {config.leafTopOffset ?? 19}px
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, leafTopOffset: Math.max(-50, (config.leafTopOffset ?? 19) - 2) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="بالاتر (فاصله بیشتر از باکس)"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <input
                  type="range"
                  min={-50}
                  max={40}
                  step={1}
                  value={config.leafTopOffset ?? 19}
                  onChange={(e) => onChange({ ...config, leafTopOffset: Number(e.target.value) })}
                  className="flex-1 accent-[#8ea694] cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => onChange({ ...config, leafTopOffset: Math.min(40, (config.leafTopOffset ?? 19) + 2) })}
                  className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                  title="پایین‌تر (نزدیک‌تر به باکس)"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Presets for Vertical Offset */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                {[
                  { label: '۱۹+ (انتخابی)', val: 19 },
                  { label: '۰ (روی لبه)', val: 0 },
                  { label: '۱۲- (بافاصله)', val: -12 },
                  { label: '۲۴- (شناور)', val: -24 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => onChange({ ...config, leafTopOffset: item.val })}
                    className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                      (config.leafTopOffset ?? 19) === item.val
                        ? 'bg-[#8ea694] text-white border-[#8ea694] shadow-xs'
                        : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Position Slider */}
            <div className="pt-3 border-t border-[#EDE8DE] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#556853]">
                <span>جابجایی افقی (چپ و راست):</span>
                <span className="font-mono font-bold text-[#355239]">
                  {config.leafRightOffset ?? 0}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={-40}
                  max={60}
                  step={2}
                  value={config.leafRightOffset ?? 0}
                  onChange={(e) => onChange({ ...config, leafRightOffset: Number(e.target.value) })}
                  className="flex-1 accent-[#8ea694] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section: Daricheh Box (باکس خمیری دریچه - کجکی بالای چپ هیرو) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#249D8F]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'باکس دریچه (بالای چپ هیرو)' : 'Daricheh Box Settings'}
                </span>
              </div>
              <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-bold font-mono ${
                (config.showDaricheh ?? true)
                  ? 'bg-[#249D8F]/15 text-[#177064]'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {(config.showDaricheh ?? true) ? 'فعال' : 'غیرفعال'}
              </span>
            </div>

            <p className="text-xs text-[#6B7869]">
              {isRtl
                ? 'باکس دکوراتیو خمیری «دریچه» با رنگ سبز معرفی مدرسه در گوشه چپ بالای هیرو با قابلیت تنظیم میزان کج بودن و موقعیت:'
                : 'Customizable tilted teal clay badge at top-left of the hero card.'}
            </p>

            {/* Toggle show/hide */}
            <label className="flex items-center justify-between cursor-pointer py-1 border-b border-[#EDE8DE]">
              <span className="text-xs text-[#3E4D3D] font-medium">
                {isRtl ? 'نمایش دکمه و باکس دریچه در هیرو' : 'Show Daricheh Badge'}
              </span>
              <input
                type="checkbox"
                checked={config.showDaricheh ?? true}
                onChange={(e) => onChange({ ...config, showDaricheh: e.target.checked })}
                className="w-4 h-4 accent-[#249D8F] rounded"
              />
            </label>

            {(config.showDaricheh ?? true) && (
              <>
                {/* 1. Rotation / Tilt Angle (کج بودن) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">زاویه و کج بودن (چرخش به درجه):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.darichehRotate ?? -10}° { (config.darichehRotate ?? -10) < 0 ? '(کج چپ)' : (config.darichehRotate ?? -10) > 0 ? '(کج راست)' : '(صاف)' }
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehRotate: Math.max(-35, (config.darichehRotate ?? -10) - 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="کج‌تر به چپ"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-35}
                      max={35}
                      step={1}
                      value={config.darichehRotate ?? -10}
                      onChange={(e) => onChange({ ...config, darichehRotate: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehRotate: Math.min(35, (config.darichehRotate ?? -10) + 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="کج‌تر به راست"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Rotation */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۸°- (خیلی کج)', val: -18 },
                      { label: '۱۰°- (پیش‌فرض)', val: -10 },
                      { label: '۰° (صاف)', val: 0 },
                      { label: '۱۰°+ (کج راست)', val: 10 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, darichehRotate: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.darichehRotate ?? -10) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Vertical Position (Top) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">موقعیت عمودی (فاصله از بالای هیرو):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.darichehTop ?? 14}px
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehTop: Math.max(-40, (config.darichehTop ?? 14) - 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="بالاتر"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-40}
                      max={80}
                      step={2}
                      value={config.darichehTop ?? 14}
                      onChange={(e) => onChange({ ...config, darichehTop: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehTop: Math.min(80, (config.darichehTop ?? 14) + 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="پایین‌تر"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Top */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۰- (شناور)', val: -10 },
                      { label: '۰ (روی لبه)', val: 0 },
                      { label: '۱۴ (پیش‌فرض)', val: 14 },
                      { label: '۳۲ (داخل‌تر)', val: 32 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, darichehTop: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.darichehTop ?? 14) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Horizontal Position (Left) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">موقعیت افقی (فاصله از چپ هیرو):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.darichehLeft ?? 35}px
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehLeft: Math.max(-20, (config.darichehLeft ?? 35) - 3) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="چپ‌تر"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-20}
                      max={120}
                      step={2}
                      value={config.darichehLeft ?? 35}
                      onChange={(e) => onChange({ ...config, darichehLeft: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, darichehLeft: Math.min(120, (config.darichehLeft ?? 35) + 3) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="راست‌تر / داخل‌تر"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Left */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۰px (لبه)', val: 10 },
                      { label: '۳۵px (پیش‌فرض)', val: 35 },
                      { label: '۶۰px (وسط‌تر)', val: 60 },
                      { label: '۹۰px (داخلی)', val: 90 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, darichehLeft: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.darichehLeft ?? 35) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Text & Link Inputs */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-[#556853] font-medium block mb-1">
                        متن خط اول:
                      </label>
                      <input
                        type="text"
                        value={config.darichehSub ?? 'ورود به'}
                        onChange={(e) => onChange({ ...config, darichehSub: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF9F5] text-[#2C372B] focus:outline-none focus:border-[#249D8F]"
                        placeholder="ورود به"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#556853] font-medium block mb-1">
                        متن خط دوم (اصلی):
                      </label>
                      <input
                        type="text"
                        value={config.darichehTitle ?? 'دریچه'}
                        onChange={(e) => onChange({ ...config, darichehTitle: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF9F5] text-[#2C372B] focus:outline-none focus:border-[#249D8F]"
                        placeholder="دریچه"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#556853] font-medium block mb-1">
                      آدرس لینک مقصد هنگام کلیک:
                    </label>
                    <input
                      type="url"
                      dir="ltr"
                      value={config.darichehUrl ?? 'http://194.48.198.146/auth/login'}
                      onChange={(e) => onChange({ ...config, darichehUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#DDD5C5] bg-[#FAF9F5] text-[#2C372B] font-mono focus:outline-none focus:border-[#249D8F]"
                      placeholder="http://194.48.198.146/auth/login"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Section: Clock Widget (باکس ساعت خمیری سمت راست هیرو) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#249D8F]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'باکس ساعت خمیری (سمت راست هیرو)' : 'Clock Widget Settings'}
                </span>
              </div>
              <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-bold font-mono ${
                (config.showClockWidget ?? true)
                  ? 'bg-[#249D8F]/15 text-[#177064]'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {(config.showClockWidget ?? true) ? 'فعال' : 'غیرفعال'}
              </span>
            </div>

            <p className="text-xs text-[#6B7869]">
              {isRtl
                ? 'تنظیم اندازه، رنگ خمیر، موقعیت و زاویه کج بودن ساعت هوشمند خمیری در سمت راست هیرو:'
                : 'Customize size, clay color, coordinates, and tilt of the organic clock widget on the right:'}
            </p>

            {/* Toggle show/hide */}
            <label className="flex items-center justify-between cursor-pointer py-1 border-b border-[#EDE8DE]">
              <span className="text-xs text-[#3E4D3D] font-medium">
                {isRtl ? 'نمایش باکس ساعت در هیرو' : 'Show Clock Widget'}
              </span>
              <input
                type="checkbox"
                checked={config.showClockWidget ?? true}
                onChange={(e) => onChange({ ...config, showClockWidget: e.target.checked })}
                className="w-4 h-4 accent-[#249D8F] rounded"
              />
            </label>

            {(config.showClockWidget ?? true) && (
              <>
                {/* 1. Clock Size (اندازه) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">اندازه باکس ساعت:</span>
                    <span className="font-mono font-bold text-[#177064]">
                      {config.clockSize === 'small' ? 'کوچک' : config.clockSize === 'large' ? 'بزرگ' : 'استاندارد'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'small', label: 'کوچک' },
                      { id: 'normal', label: 'استاندارد' },
                      { id: 'large', label: 'بزرگ' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => onChange({ ...config, clockSize: s.id as any })}
                        className={`py-2 px-2 rounded-xl font-bold transition-all border ${
                          (config.clockSize || 'normal') === s.id
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Clock Color (رنگ خمیر ساعت) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">رنگ خمیر ساعت:</span>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#177064]">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                        style={{ backgroundColor: config.clockColor || '#E76F51' }}
                      />
                      <span>{config.clockColor || '#E76F51'}</span>
                    </div>
                  </div>

                  {/* Preset Color Swatches */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { name: 'مرجانی گرم (پیش‌فرض)', hex: '#E76F51' },
                      { name: 'زمردی مدرسه', hex: '#249D8F' },
                      { name: 'نعنایی ملایم', hex: '#52B788' },
                      { name: 'طلایی خاکی', hex: '#D4A373' },
                      { name: 'زیتونی ملایم', hex: '#8D9B6D' },
                      { name: 'یاسی مدرن', hex: '#7B2CBF' },
                      { name: 'سورمه‌ای عمیق', hex: '#264653' },
                    ].map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => onChange({ ...config, clockColor: swatch.hex })}
                        title={swatch.name}
                        className={`w-7 h-7 rounded-xl border-2 transition-transform hover:scale-110 active:scale-95 shadow-xs flex items-center justify-center ${
                          (config.clockColor || '#E76F51').toLowerCase() === swatch.hex.toLowerCase()
                            ? 'border-black/50 scale-105'
                            : 'border-white/80'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {(config.clockColor || '#E76F51').toLowerCase() === swatch.hex.toLowerCase() && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}

                    {/* Custom Color Input */}
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#DDD5C5] bg-[#F9F8F5] text-xs font-medium text-[#4A3D2E] hover:bg-[#EAEFE4]">
                      <Pipette className="w-3.5 h-3.5 text-[#E76F51]" />
                      <span>رنگ دلخواه</span>
                      <input
                        type="color"
                        value={config.clockColor || '#E76F51'}
                        onChange={(e) => onChange({ ...config, clockColor: e.target.value })}
                        className="w-0 h-0 opacity-0 absolute"
                      />
                    </label>
                  </div>
                </div>

                {/* 3. Rotation / Tilt Angle (کج بودن) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">زاویه و کج بودن (چرخش به درجه):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.clockRotate ?? 8}° { (config.clockRotate ?? 8) > 0 ? '(کج راست)' : (config.clockRotate ?? 8) < 0 ? '(کج چپ)' : '(صاف)' }
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockRotate: Math.max(-35, (config.clockRotate ?? 8) - 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="کج‌تر به چپ"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-35}
                      max={35}
                      step={1}
                      value={config.clockRotate ?? 8}
                      onChange={(e) => onChange({ ...config, clockRotate: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockRotate: Math.min(35, (config.clockRotate ?? 8) + 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="کج‌تر به راست"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Rotation */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۰°- (کج چپ)', val: -10 },
                      { label: '۰° (صاف)', val: 0 },
                      { label: '۸°+ (پیش‌فرض)', val: 8 },
                      { label: '۱۶°+ (کج زیاد)', val: 16 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, clockRotate: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.clockRotate ?? 8) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Vertical Position (Top) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">موقعیت عمودی (فاصله از بالای هیرو):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.clockTop ?? 14}px
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockTop: Math.max(-40, (config.clockTop ?? 14) - 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="بالاتر"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-40}
                      max={80}
                      step={2}
                      value={config.clockTop ?? 14}
                      onChange={(e) => onChange({ ...config, clockTop: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockTop: Math.min(80, (config.clockTop ?? 14) + 2) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="پایین‌تر"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Top */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۰- (شناور)', val: -10 },
                      { label: '۰ (روی لبه)', val: 0 },
                      { label: '۱۴ (پیش‌فرض)', val: 14 },
                      { label: '۳۲ (داخل‌تر)', val: 32 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, clockTop: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.clockTop ?? 14) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Horizontal Position (Right) */}
                <div className="pt-2 border-t border-[#EDE8DE] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#556853]">
                    <span className="font-medium">موقعیت افقی (فاصله از راست هیرو):</span>
                    <span className="font-mono font-bold text-[#177064] bg-[#249D8F]/10 px-2 py-0.5 rounded-md">
                      {config.clockRight ?? 35}px
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockRight: Math.max(-20, (config.clockRight ?? 35) - 3) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="راست‌تر"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min={-20}
                      max={120}
                      step={2}
                      value={config.clockRight ?? 35}
                      onChange={(e) => onChange({ ...config, clockRight: Number(e.target.value) })}
                      className="flex-1 accent-[#249D8F] cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => onChange({ ...config, clockRight: Math.min(120, (config.clockRight ?? 35) + 3) })}
                      className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                      title="چپ‌تر / داخل‌تر"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Presets for Right */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                    {[
                      { label: '۱۰px (لبه)', val: 10 },
                      { label: '۳۵px (پیش‌فرض)', val: 35 },
                      { label: '۶۰px (وسط‌تر)', val: 60 },
                      { label: '۹۰px (داخلی)', val: 90 },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => onChange({ ...config, clockRight: item.val })}
                        className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                          (config.clockRight ?? 35) === item.val
                            ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                            : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Section: Slider Badge (باکس زیر اسلایدر - عنوان و نقطه‌ها) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#249D8F]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'باکس زیر اسلایدر (عنوان و نقطه‌ها)' : 'Slider Bottom Badge'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#249D8F]/15 text-[#249D8F] font-bold">
                {config.sliderBadgeSize === 'small' ? 'کوچک' : config.sliderBadgeSize === 'large' ? 'بزرگ' : config.sliderBadgeSize === 'xlarge' ? 'خیلی بزرگ' : 'استاندارد'}
              </span>
            </div>

            {/* 1. Size Options */}
            <p className="text-xs text-[#6B7869] mb-2">
              {isRtl ? 'اندازه و مقیاس باکس زیر اسلایدر:' : 'Badge size & scale:'}
            </p>
            <div className="grid grid-cols-4 gap-1.5 mb-4 text-center">
              {[
                { label: 'کوچک', val: 'small' as const },
                { label: 'استاندارد', val: 'normal' as const },
                { label: 'بزرگ', val: 'large' as const },
                { label: 'خیلی بزرگ', val: 'xlarge' as const },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => onChange({ ...config, sliderBadgeSize: item.val })}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium transition-all border ${
                    (config.sliderBadgeSize || 'normal') === item.val
                      ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                      : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 2. Vertical Position (Offset) */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7869]">
                {isRtl ? 'موقعیت عمودی (بالا و پایین کردن):' : 'Vertical offset:'}
              </span>
              <span className="text-xs font-mono font-bold text-[#249D8F] bg-[#249D8F]/10 px-2 py-0.5 rounded-full">
                {(config.sliderBadgeOffset ?? 0) > 0 ? `+${config.sliderBadgeOffset}px` : `${config.sliderBadgeOffset ?? 0}px`}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => onChange({ ...config, sliderBadgeOffset: Math.max(-20, (config.sliderBadgeOffset ?? 0) - 2) })}
                className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                title="بالاتر"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <input
                type="range"
                min={-20}
                max={30}
                step={1}
                value={config.sliderBadgeOffset ?? 0}
                onChange={(e) => onChange({ ...config, sliderBadgeOffset: Number(e.target.value) })}
                className="flex-1 accent-[#249D8F] cursor-pointer"
              />

              <button
                type="button"
                onClick={() => onChange({ ...config, sliderBadgeOffset: Math.min(30, (config.sliderBadgeOffset ?? 0) + 2) })}
                className="w-8 h-8 rounded-xl bg-[#F4F1E8] border border-[#DDD5C5] font-bold text-xs flex items-center justify-center text-[#4A3D2E] hover:bg-[#EAEFE4] active:scale-95 transition-all"
                title="پایین‌تر"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Presets for Badge Offset */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
              {[
                { label: 'بالاتر (-10)', val: -10 },
                { label: 'وسط (0)', val: 0 },
                { label: 'کمی پایین (+8)', val: 8 },
                { label: 'پایین‌تر (+18)', val: 18 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => onChange({ ...config, sliderBadgeOffset: item.val })}
                  className={`py-1.5 px-1 rounded-xl font-medium transition-all border ${
                    (config.sliderBadgeOffset ?? 0) === item.val
                      ? 'bg-[#249D8F] text-white border-[#249D8F] shadow-xs'
                      : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Stat Boxes (اندازه و موقعیت دکمه‌های آمار هیرو) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3E523D]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'دکمه‌های آمار هیرو سکشن' : 'Hero Stat Boxes'}
                </span>
              </div>
              <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#E76F51]/15 text-[#E76F51] font-bold">
                {config.statBoxSize === 'normal' ? 'کوچک' : config.statBoxSize === 'xlarge' ? 'خیلی بزرگ' : 'بزرگ'}
              </span>
            </div>

            {/* Size options */}
            <p className="text-xs text-[#6B7869] mb-2">
              {isRtl ? 'سایز و مقیاس باکس‌های آمار (دانش‌آموز، کادر، تجربه):' : 'Stat boxes size:'}
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-4 text-center">
              {[
                { label: 'استاندارد', val: 'normal' as const },
                { label: 'بزرگ (فعلی)', val: 'large' as const },
                { label: 'خیلی بزرگ', val: 'xlarge' as const },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => onChange({ ...config, statBoxSize: item.val })}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium transition-all border ${
                    (config.statBoxSize || 'large') === item.val
                      ? 'bg-[#E76F51] text-white border-[#E76F51] shadow-xs'
                      : 'bg-[#F9F8F5] text-[#526350] border-[#E5E0D5] hover:border-[#BFCABF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Vertical Offset Slider */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7869]">
                {isRtl ? 'فاصله از دکمه‌های بالا (پایین‌تر آمدن):' : 'Downwards distance:'}
              </span>
              <span className="text-xs font-mono font-bold text-[#E76F51] bg-[#E76F51]/10 px-2 py-0.5 rounded-full">
                {config.statBoxOffset ?? 60}px
              </span>
            </div>
            <input 
              type="range" 
              min={10} 
              max={80} 
              step={2} 
              value={config.statBoxOffset ?? 60}
              onChange={(e) => onChange({ ...config, statBoxOffset: Number(e.target.value) })}
              className="w-full accent-[#E76F51] cursor-pointer"
            />
          </div>

          {/* Section 2: Slider Photos & Settings */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#3E523D]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'اسلایدهای درون فرورفتگی' : 'Recess Slider Photos'}
                </span>
              </div>
              <span className="text-[11px] text-[#637362] font-mono">
                {config.slides.length} {isRtl ? 'عکس' : 'slides'}
              </span>
            </div>

            <p className="text-xs text-[#6B7869]">
              {isRtl
                ? 'عکس‌های فعال در اسلایدر (روی هر عکس کلیک کنید تا فعال یا غیرفعال شود):'
                : 'Select photos to include in the organic carved slider:'}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {DEFAULT_SLIDES.map((slide) => {
                const isIncluded = config.slides.some((s) => s.id === slide.id);
                return (
                  <button
                    key={slide.id}
                    onClick={() => toggleSlideInclusion(slide.id)}
                    className={`group relative rounded-xl overflow-hidden border-2 aspect-[4/3] transition-all text-left ${
                      isIncluded
                        ? 'border-[#374936] ring-2 ring-[#374936]/20'
                        : 'border-[#EAE6DB] opacity-40 hover:opacity-75 grayscale'
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={slide.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[10px] text-white font-medium truncate w-full">
                        {isRtl ? slide.titleFa : slide.titleEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slider Interval and AutoPlay */}
            <div className="pt-2 border-t border-[#EDE8DE] space-y-2">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-xs text-[#3E4D3D]">
                  {isRtl ? 'پخش خودکار اسلایدها (Auto-play)' : 'Auto-play slideshow'}
                </span>
                <input
                  type="checkbox"
                  checked={config.autoPlaySlider}
                  onChange={(e) => onChange({ ...config, autoPlaySlider: e.target.checked })}
                  className="w-4 h-4 accent-[#374936] rounded"
                />
              </label>

              {config.autoPlaySlider && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-[#526350] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#5F785D]" />
                    {isRtl ? 'مدت زمان هر اسلاید:' : 'Duration per slide:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[3, 4.5, 6].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => onChange({ ...config, sliderInterval: sec })}
                        className={`px-2 py-0.5 rounded text-xs transition-colors ${
                          config.sliderInterval === sec
                            ? 'bg-[#374936] text-white font-medium'
                            : 'bg-[#F4F1E8] text-[#556353] hover:bg-[#EAE5D9]'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-xs text-[#3E4D3D]">
                  {isRtl ? 'نمایش دکمه‌های کنترل اسلایدر' : 'Show slider controls & dots'}
                </span>
                <input
                  type="checkbox"
                  checked={config.showSliderControls}
                  onChange={(e) => onChange({ ...config, showSliderControls: e.target.checked })}
                  className="w-4 h-4 accent-[#374936] rounded"
                />
              </label>
            </div>
          </div>

          {/* Section 3: Clay Material Color Palette & Green Examples */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#3E523D]" />
                <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                  {isRtl ? 'پالت‌های ارگانیک و طیف‌های سبز' : 'Organic Palettes & Green Themes'}
                </span>
              </div>
              {(config.customClayBg || config.customTextColor) && (
                <button
                  onClick={() => onChange({ ...config, customClayBg: undefined, customTextColor: undefined })}
                  className="text-[10px] text-[#556F52] hover:text-[#253923] underline flex items-center gap-1"
                  title={isRtl ? 'بازنشانی رنگ‌های سفارشی به تم اصلی' : 'Reset to theme defaults'}
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>{isRtl ? 'بازنشانی رنگ‌ها' : 'Reset custom colors'}</span>
                </button>
              )}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {Object.values(CLAY_PALETTES).map((pal) => {
                const isSelected = config.clayTheme === pal.id && !config.customClayBg && !config.customTextColor;
                const isGreen = ['sage', 'forest', 'matcha', 'pistachio', 'eucalyptus', 'emerald'].includes(pal.id);
                return (
                  <button
                    key={pal.id}
                    onClick={() => onChange({ 
                      ...config, 
                      clayTheme: pal.id as any,
                      customClayBg: undefined,
                      customTextColor: undefined,
                    })}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#374936] bg-[#F2F6EF] ring-1 ring-[#374936]'
                        : 'border-[#EAE6DB] hover:border-[#CAD2C8] bg-[#FAF9F6]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shadow-xs border border-black/10 shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${pal.bgLight}, ${pal.bgDark})`,
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-[11px] text-[#263124] truncate">
                        {isRtl ? pal.nameFa : pal.name}
                      </div>
                      {isGreen && (
                        <div className="text-[9px] text-[#52774F] font-medium leading-none mt-0.5">
                          {isRtl ? 'طیف سبز' : 'Green tone'}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* GREEN COLOR EXAMPLES: Clay Surface */}
            <div className="pt-3 border-t border-[#EDE8DE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3F2C] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7D9F79] inline-block shadow-xs" />
                  {isRtl ? 'نمونه‌های رنگ سبز برای خمیر (Clay Surface):' : 'Green Color Examples for Clay:'}
                </span>
                {config.customClayBg && (
                  <span className="text-[10px] font-mono text-[#4C644B] bg-[#EBF2E8] px-1.5 py-0.5 rounded">
                    {config.customClayBg.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#697968]">
                {isRtl 
                  ? 'رنگ‌های سرامیکی و خاکی سبز روشن که به بافت ۳بعدی و فرورفتگی زیبایی ارگانیک می‌دهند:' 
                  : 'Soft ceramic and pastel green clay tones designed to maintain depth and natural light:'}
              </p>

              <div className="grid grid-cols-3 gap-1.5">
                {GREEN_CLAY_SWATCHES.map((swatch) => {
                  const isActive = (config.customClayBg || '').toLowerCase() === swatch.hex.toLowerCase();
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => onChange({ ...config, customClayBg: swatch.hex })}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                        isActive
                          ? 'border-[#2D452B] ring-2 ring-[#2D452B]/20 bg-white shadow-xs'
                          : 'border-[#E6E1D4] hover:border-[#B7C5B5] bg-[#FAF9F5]'
                      }`}
                      title={swatch.nameEn}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-inner border border-black/10 mb-1 flex items-center justify-center"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {isActive && <Check className="w-3 h-3 text-[#21351F] stroke-[2.5]" />}
                      </div>
                      <span className="text-[10px] font-medium text-[#293527] leading-tight line-clamp-1">
                        {isRtl ? swatch.nameFa : swatch.nameEn}
                      </span>
                      <span className="text-[9px] font-mono text-[#677A65] mt-0.5">
                        {swatch.hex}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Clay Hex Picker */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-[#556853]">
                  {isRtl ? 'یا انتخاب رنگ سبز دلخواه برای خمیر:' : 'Or custom clay hex color:'}
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.customClayBg || '#EEF3EB'}
                    onChange={(e) => onChange({ ...config, customClayBg: e.target.value })}
                    className="w-6 h-6 rounded-md border border-[#D5CFC2] cursor-pointer p-0 bg-transparent"
                    title={isRtl ? 'انتخاب پالت رنگ' : 'Choose custom color'}
                  />
                  <input
                    type="text"
                    value={config.customClayBg || ''}
                    placeholder="#EEF3EB"
                    onChange={(e) => onChange({ ...config, customClayBg: e.target.value })}
                    className="w-18 px-2 py-0.5 text-[11px] font-mono rounded border border-[#D5CFC2] bg-[#FAF9F5] text-[#2C372B]"
                  />
                </div>
              </div>
            </div>

            {/* GREEN COLOR EXAMPLES: Text & Typography */}
            <div className="pt-3 border-t border-[#EDE8DE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3F2C] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#18381D] inline-block shadow-xs" />
                  {isRtl ? 'نمونه‌های رنگ سبز برای تیتر و متن‌ها (Typography):' : 'Green Color Examples for Text:'}
                </span>
                {config.customTextColor && (
                  <span className="text-[10px] font-mono text-[#18381D] bg-[#E3EFE0] px-1.5 py-0.5 rounded">
                    {config.customTextColor.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#697968]">
                {isRtl 
                  ? 'رنگ‌های سبز عمیق و پرکنتراست با خوانایی عالی برای عنوان، توضیحات و دکمه:' 
                  : 'Deep, rich contrasting greens optimized for crisp readability on clay surfaces:'}
              </p>

              <div className="grid grid-cols-3 gap-1.5">
                {GREEN_TEXT_SWATCHES.map((swatch) => {
                  const isActive = (config.customTextColor || '').toLowerCase() === swatch.hex.toLowerCase();
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => onChange({ ...config, customTextColor: swatch.hex })}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                        isActive
                          ? 'border-[#153419] ring-2 ring-[#153419]/25 bg-white shadow-xs'
                          : 'border-[#E6E1D4] hover:border-[#B7C5B5] bg-[#FAF9F5]'
                      }`}
                      title={swatch.nameEn}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-inner border border-white/40 mb-1 flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: swatch.hex, color: '#FFFFFF' }}
                      >
                        {isActive ? <Check className="w-3 h-3 text-white stroke-[2.5]" /> : 'Aa'}
                      </div>
                      <span className="text-[10px] font-medium text-[#293527] leading-tight line-clamp-1">
                        {isRtl ? swatch.nameFa : swatch.nameEn}
                      </span>
                      <span className="text-[9px] font-mono text-[#677A65] mt-0.5">
                        {swatch.hex}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Text Hex Picker */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-[#556853]">
                  {isRtl ? 'یا انتخاب رنگ سبز دلخواه برای متن:' : 'Or custom text hex color:'}
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={config.customTextColor || '#1F291E'}
                    onChange={(e) => onChange({ ...config, customTextColor: e.target.value })}
                    className="w-6 h-6 rounded-md border border-[#D5CFC2] cursor-pointer p-0 bg-transparent"
                    title={isRtl ? 'انتخاب پالت رنگ متن' : 'Choose custom text color'}
                  />
                  <input
                    type="text"
                    value={config.customTextColor || ''}
                    placeholder="#1F291E"
                    onChange={(e) => onChange({ ...config, customTextColor: e.target.value })}
                    className="w-18 px-2 py-0.5 text-[11px] font-mono rounded border border-[#D5CFC2] bg-[#FAF9F5] text-[#2C372B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Typography & Content */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Type className="w-4 h-4 text-[#3E523D]" />
              <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                {isRtl ? 'ویرایش متن‌های ویجت' : 'Content & Typography'}
              </span>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#556353] block mb-1">
                {isRtl ? 'سربرگ کوچک (Subtitle)' : 'Kicker / Subtitle'}
              </label>
              <input
                type="text"
                value={config.subtitle}
                onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7CA] bg-[#FAF9F6] text-[#2C332B] focus:outline-none focus:border-[#374936]"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#556353] block mb-1">
                {isRtl ? 'عنوان اصلی (با اینتر سطر بعد بروید)' : 'Main Heading (multiline)'}
              </label>
              <textarea
                rows={2}
                value={config.title}
                onChange={(e) => onChange({ ...config, title: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7CA] bg-[#FAF9F6] text-[#2C332B] focus:outline-none focus:border-[#374936]"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#556353] block mb-1">
                {isRtl ? 'متن توضیحات' : 'Description Paragraph'}
              </label>
              <textarea
                rows={3}
                value={config.description}
                onChange={(e) => onChange({ ...config, description: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7CA] bg-[#FAF9F6] text-[#2C332B] focus:outline-none focus:border-[#374936]"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#556353] block mb-1">
                {isRtl ? 'متن دکمه (CTA Button)' : 'Button Label'}
              </label>
              <input
                type="text"
                value={config.buttonText}
                onChange={(e) => onChange({ ...config, buttonText: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7CA] bg-[#FAF9F6] text-[#2C332B] focus:outline-none focus:border-[#374936]"
              />
            </div>
          </div>

          {/* Section 5: Interaction & Accents */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E4D9] shadow-xs space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#3E523D]" />
              <span className="font-semibold text-xs tracking-wide uppercase text-[#3E523D]">
                {isRtl ? 'جزئیات تزئینی' : 'Accents & Details'}
              </span>
            </div>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="text-xs text-[#3E4D3D]">
                {isRtl ? 'شاخه و برگ دکوراتیو گوشه بالا' : 'Botanical Leaf Sprout Accent'}
              </span>
              <input
                type="checkbox"
                checked={config.showSproutAccent}
                onChange={(e) => onChange({ ...config, showSproutAccent: e.target.checked })}
                className="w-4 h-4 accent-[#374936] rounded"
              />
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E8E3D7] bg-[#F4F1E8] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#556353] hover:text-[#1F291E] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRtl ? 'بازنشانی به حالت اولیه' : 'Reset Defaults'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#374936] hover:bg-[#283727] rounded-xl transition-colors shadow-sm"
          >
            {isRtl ? 'تأیید و بستن' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

