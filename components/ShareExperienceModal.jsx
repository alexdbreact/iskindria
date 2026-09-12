'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Phone, Sparkles, Link as LinkIcon, FileText, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import LighthouseIcon from './LighthouseIcon';

export default function ShareExperienceModal({ isOpen, onClose, t, lang = 'en' }) {
  const isArabic = lang === 'ar';
  const modalT = t?.shareExperienceModal || {};

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState('story');
  const [content, setContent] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const modalRef = useRef(null);

  // Reset form or error when opening
  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessToast(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = modalT.categories || {
    story: isArabic ? 'قصص وذكريات شخصية' : 'Personal Story & Memories',
    history: isArabic ? 'تاريخ وتراث سكندري' : 'History & Heritage Discovery',
    photo: isArabic ? 'تصوير ومعالم ساحرة' : 'Photography & Landmarks',
    guide: isArabic ? 'أماكن وتجارب مميزة' : 'Travel Tips & Hidden Gems'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim() || !mobile.trim() || !content.trim()) {
      setError(modalT.validationError || (isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields.'));
      return;
    }

    setIsSubmitting(true);

    const categoryName = categories[category] || category;
    const phoneRecipient = '201159666279';

    // Format WhatsApp message
    let message = '';
    if (isArabic) {
      message = `🏛️ *طلب نشر محتوى وتجربة جديدة - إسكندرية*\n` +
        `*(Alexandria Odyssey - Iskindria)*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *الاسم:* ${name.trim()}\n` +
        `📱 *رقم الهاتف / الواتساب:* ${mobile.trim()}\n` +
        `🏷️ *تصنيف التجربة:* ${categoryName}\n` +
        `📝 *نص التجربة أو القصة:*\n${content.trim()}\n` +
        (mediaLink.trim() ? `🔗 *رابط الوسائط / الصور:* ${mediaLink.trim()}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📍 *مرسل من:* صفحة رحلة الإسكندرية (طلب مراجعة ونشر)`;
    } else {
      message = `🏛️ *New Experience Submission for Iskindria*\n` +
        `*(Alexandria Odyssey Community)*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${name.trim()}\n` +
        `📱 *Mobile / WhatsApp:* ${mobile.trim()}\n` +
        `🏷️ *Category:* ${categoryName}\n` +
        `📝 *Experience & Content:*\n${content.trim()}\n` +
        (mediaLink.trim() ? `🔗 *Media Link:* ${mediaLink.trim()}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📍 *Sent from:* Alexandria Odyssey Page (Review Request)`;
    }

    const whatsappUrl = `https://wa.me/${phoneRecipient}?text=${encodeURIComponent(message)}`;

    setSuccessToast(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        dir={t?.dir || (isArabic ? 'rtl' : 'ltr')}
        className={`relative w-full max-w-2xl my-auto rounded-3xl bg-[#13101A]/95 border border-amber-400/40 p-5 sm:p-7 md:p-8 shadow-[0_0_60px_rgba(245,158,11,0.22)] backdrop-blur-2xl text-neutral-100 transition-all duration-300 ${
          isArabic ? 'font-cairo' : 'font-outfit'
        }`}
      >
        {/* Glow corner accents */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${
            isArabic ? 'left-4' : 'right-4'
          } p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer z-20`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 sm:mb-8 pr-6 pl-6 sm:px-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-300 font-cinzel text-xs tracking-widest uppercase">
            <LighthouseIcon className="w-4 h-4 text-amber-400" />
            <span>{modalT.badge || (isArabic ? 'مشاركات مجتمع إسكندرية' : 'Community Contributions')}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-300">
            {modalT.title || (isArabic ? 'شارك محتواك وتجربتك' : 'Share Your Experience Content')}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
            {modalT.subtitle ||
              (isArabic
                ? 'أرسل قصتك أو صورك أو ذكرياتك لنقوم بمراجعتها ونشرها مباشرة في صفحة رحلة الإسكندرية.'
                : 'Submit your story, photos, or memories to be reviewed and published directly on the Alexandria Odyssey page.')}
          </p>
        </div>

        {/* Error / Feedback Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs sm:text-sm animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Confirmation Toast */}
        {successToast && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-3 text-emerald-200 text-xs sm:text-sm animate-pulse">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span>{modalT.successMessage || (isArabic ? 'جاري فتح واتساب للإرسال...' : 'Redirecting to WhatsApp...')}</span>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Row 1: Name and Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-amber-200/90 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{modalT.nameLabel || (isArabic ? 'الاسم بالكامل' : 'Your Full Name')} *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={modalT.namePlaceholder || (isArabic ? 'مثال: أحمد السيد' : 'e.g. Captain Ahmed')}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-all duration-200"
              />
            </div>

            {/* Mobile / WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-amber-200/90 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{modalT.phoneLabel || (isArabic ? 'رقم الهاتف / الواتساب' : 'Mobile / WhatsApp Number')} *</span>
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder={modalT.phonePlaceholder || (isArabic ? 'مثال: 01159666279' : 'e.g. +20 115 966 6279')}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-amber-200/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{modalT.categoryLabel || (isArabic ? 'تصنيف المحتوى' : 'Content Category')}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(categories).map(([key, label]) => {
                const isSelected = category === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 text-center ${
                      isSelected
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience / Story Content Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider text-amber-200/90 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>{modalT.contentLabel || (isArabic ? 'نص التجربة أو القصة أو المحتوى' : 'Your Experience & Content Details')} *</span>
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">
                {content.length} {isArabic ? 'حرف' : 'chars'}
              </span>
            </div>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                modalT.contentPlaceholder ||
                (isArabic
                  ? 'اكتب قصتك أو ذكرياتك أو محتواك الذي ترغب بنشره في صفحة رحلة الإسكندرية...'
                  : 'Write your story, memories, historical note, or describe your experience in Alexandria in detail...')
              }
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-all duration-200 resize-none"
            />
          </div>

          {/* Optional Media Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wider text-amber-200/90 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{modalT.mediaLabel || (isArabic ? 'رابط الصور أو الفيديو (اختياري)' : 'Media / Cloud Link (Optional)')}</span>
            </label>
            <input
              type="url"
              value={mediaLink}
              onChange={(e) => setMediaLink(e.target.value)}
              placeholder={
                modalT.mediaPlaceholder ||
                (isArabic
                  ? 'رابط جوجل درايف، دروب بوكس، أو منشور إنستجرام...'
                  : 'Google Drive, Dropbox, iCloud, or Social media link')
              }
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 focus:border-amber-400 focus:bg-white/[0.08] focus:outline-none text-white text-sm placeholder:text-neutral-500 transition-all duration-200"
            />
          </div>

          {/* Notice */}
          <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/15 text-[11px] sm:text-xs text-amber-200/75 leading-relaxed">
            {modalT.reviewNotice ||
              (isArabic
                ? 'سيتم إرسال محتواك مباشرة للمطور عبر واتساب (+201159666279) لمراجعته ونشره في هذه الصفحة.'
                : 'Your submission will be sent directly to the creator (+201159666279) for review and publishing on the platform.')}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:via-teal-500 hover:to-amber-400 text-white font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            <MessageCircle className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>{modalT.submitButton || (isArabic ? 'إرسال للمراجعة عبر واتساب (+201159666279)' : 'Send via WhatsApp for Review (+201159666279)')}</span>
            <Send className={`w-4 h-4 text-amber-200 transition-transform ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </button>
        </form>
      </div>
    </div>
  );
}
