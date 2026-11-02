import React from 'react';
import {
  CrestLogo,
} from './CrestLogo';
import {
  CrownDoodle,
  CurvedArrowDoodle,
  MotionMarks,
  StrikerSilhouette,
  AcademyQRCode,
} from './Doodles';
import {
  Shield,
  ShieldCheck,
  Users,
  HeartHandshake,
  Calendar,
  Clock,
  MapPin,
  Smile,
  Zap,
  Activity,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { AcademyPhotos, AcademySettings } from '../types';

interface FlyerPosterProps {
  settings: AcademySettings;
  photos: AcademyPhotos;
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
}

export const FlyerPoster: React.FC<FlyerPosterProps> = ({
  settings,
  photos,
  onOpenRegister,
  onOpenAdmin,
}) => {
  const whatsappUrl = `https://wa.me/${(settings.whatsappNumber || '918591766653').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Cross United Football Academy, I want to book a Free Football Trial for my child at Dropout Turf, Vasai West.'
  )}`;

  return (
    <div className="relative mx-auto w-full max-w-[820px] bg-white text-slate-900 shadow-2xl rounded-sm p-3 sm:p-6 md:p-8 border-[3px] border-slate-800 select-none flyer-container">
      {/* Outer Inner Border Frame Matching Original Print */}
      <div className="border border-slate-700/60 p-3 sm:p-5 flex flex-col gap-4 sm:gap-6 bg-white">
        
        {/* ========================================================
            HEADER SECTION: LOGO, TITLE, BADGE & HERO IMAGE
            ======================================================== */}
        <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
          {/* Left Column: Crest & Academy Name & Big Headline */}
          <div className="col-span-7 sm:col-span-7 flex flex-col justify-between">
            {/* Logo and Academy Name */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 mb-1 sm:mb-2">
              <CrestLogo size={70} className="shrink-0 w-12 h-12 sm:w-16 sm:h-16" />
              <div className="leading-none">
                <div className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-slate-900 uppercase">
                  CROSS
                </div>
                <div className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-slate-900 uppercase">
                  UNITED
                </div>
                <div className="font-heading font-bold text-[10px] sm:text-xs tracking-wider text-slate-700 uppercase mt-0.5">
                  FOOTBALL ACADEMY
                </div>
              </div>
            </div>

            {/* Crown Doodle above Headline */}
            <div className="flex items-center gap-1 mt-1 -mb-1">
              <CrownDoodle size={30} className="w-6 h-5 sm:w-8 sm:h-6 text-amber-500" />
            </div>

            {/* Main Headline */}
            <div className="relative">
              <div className="font-heading font-black text-2xl sm:text-4xl md:text-[42px] leading-[1.05] text-slate-900 tracking-tight">
                HELP YOUR
                <br />
                CHILD GROW
                <br />
                THROUGH
              </div>

              {/* Hand-drawn Green FOOTBALL Script */}
              <div className="relative inline-block mt-0.5">
                <span className="font-marker text-3xl sm:text-5xl md:text-[54px] text-emerald-800 tracking-wide font-black transform -rotate-1 inline-block drop-shadow-xs">
                  FOOTBALL
                </span>
                
                {/* Hand-drawn motion marks next to FOOTBALL */}
                <span className="absolute -top-1 -right-7 hidden sm:inline-block">
                  <MotionMarks color="#15803d" />
                </span>
              </div>

              {/* Doodle Curved Arrow pointing from photo to FOOTBALL */}
              <div className="absolute -top-4 right-2 sm:right-6 pointer-events-none">
                <CurvedArrowDoodle
                  size={38}
                  color="#15803d"
                  direction="down-left"
                  className="w-7 h-7 sm:w-9 sm:h-9"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div className="mt-2 text-slate-800 text-[11px] sm:text-sm font-semibold leading-snug">
              <div>Learn skills. Build confidence.</div>
              <div>Make friends. Stay active.</div>
            </div>
          </div>

          {/* Right Column: AGES Badge & Kids Action Photo */}
          <div className="col-span-5 sm:col-span-5 relative flex flex-col items-end">
            {/* Top Right "BOYS & GIRLS AGES 4-15" Badge */}
            <div className="relative z-10 -mr-1 sm:-mr-2 -mt-1 sm:-mt-2 mb-2">
              <div className="bg-slate-900 text-white rounded-full w-20 h-20 sm:w-26 sm:h-26 flex flex-col items-center justify-center text-center p-1 border-2 border-slate-700 shadow-md">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-200">
                  BOYS & GIRLS
                </span>
                <span className="text-[8px] sm:text-[10px] font-semibold text-slate-300 uppercase tracking-widest -mt-0.5">
                  AGES
                </span>
                <span className="text-xl sm:text-3xl font-black text-amber-400 font-heading leading-tight -mt-0.5">
                  4-15
                </span>
              </div>
            </div>

            {/* Hero Photo: Kids playing football happily */}
            <div className="w-full h-36 sm:h-48 md:h-56 rounded-md overflow-hidden relative border border-slate-200 shadow-inner group">
              <img
                src={photos.heroPhoto}
                alt="Children running and playing football"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle natural sunlight tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-sm">
                ⚽ Live Academy Action
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FOUR PILLARS: 4 ICON CIRCLES WITH BULLETS
            ======================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 py-1">
          {/* 1. Develop Football Skills */}
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50/60 border border-stone-200/60">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900 text-white flex items-center justify-center mb-2 shadow-sm">
              {/* Soccer Ball Icon */}
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="white" stroke="#0f172a" strokeWidth="2" />
                <polygon points="12,7 15,10 14,14 10,14 9,10" fill="#0f172a" />
                <line x1="12" y1="2" x2="12" y2="7" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="21.5" y1="9" x2="15" y2="10" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="18" y1="19" x2="14" y2="14" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="6" y1="19" x2="10" y2="14" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="2.5" y1="9" x2="9" y2="10" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
            </div>
            <h4 className="font-heading font-black text-[11px] sm:text-xs text-slate-900 tracking-tight leading-tight uppercase mb-1">
              DEVELOP<br />FOOTBALL SKILLS
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-700 leading-tight">
              Dribbling • Passing<br />Shooting • Game Understanding
            </p>
          </div>

          {/* 2. Get Fit & Active */}
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50/60 border border-stone-200/60">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-2 shadow-sm">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <h4 className="font-heading font-black text-[11px] sm:text-xs text-slate-900 tracking-tight leading-tight uppercase mb-1">
              GET FIT & ACTIVE
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-700 leading-tight mt-auto">
              Agility • Coordination<br />Balance • Fitness
            </p>
          </div>

          {/* 3. Build Confidence & Discipline */}
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50/60 border border-stone-200/60">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-orange-600 text-white flex items-center justify-center mb-2 shadow-sm">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <h4 className="font-heading font-black text-[11px] sm:text-xs text-slate-900 tracking-tight leading-tight uppercase mb-1">
              BUILD CONFIDENCE<br />& DISCIPLINE
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-700 leading-tight">
              Focus • Teamwork<br />Communication • Respect
            </p>
          </div>

          {/* 4. Most Importantly... Have Fun! */}
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-stone-50/60 border border-stone-200/60">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-teal-700 text-white flex items-center justify-center mb-2 shadow-sm">
              <Smile className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <h4 className="font-heading font-black text-[11px] sm:text-xs text-slate-900 tracking-tight leading-tight uppercase mb-1">
              MOST IMPORTANTLY...<br />HAVE FUN!
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-700 leading-tight">
              A positive environment where children enjoy football.
            </p>
          </div>
        </div>

        {/* ========================================================
            TRUST BADGES BAR: 4 ROUNDED CAPSULES
            ======================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 pb-1">
          {/* Capsule 1: AGE-APPROPRIATE COACHING */}
          <div className="border border-slate-400/80 rounded-md py-1.5 px-2 flex items-center justify-center gap-1.5 bg-white text-slate-800">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
            <span className="font-heading font-bold text-[9px] sm:text-[10px] tracking-tight uppercase leading-tight text-center">
              AGE-APPROPRIATE COACHING
            </span>
          </div>

          {/* Capsule 2: AIFF-CERTIFIED COACHES */}
          <div className="border border-slate-400/80 rounded-md py-1.5 px-2 flex items-center justify-center gap-1.5 bg-white text-slate-800">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
            <span className="font-heading font-bold text-[9px] sm:text-[10px] tracking-tight uppercase leading-tight text-center">
              AIFF-CERTIFIED COACHES
            </span>
          </div>

          {/* Capsule 3: SMALL-GROUP COACHING */}
          <div className="border border-slate-400/80 rounded-md py-1.5 px-2 flex items-center justify-center gap-1.5 bg-white text-slate-800">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
            <span className="font-heading font-bold text-[9px] sm:text-[10px] tracking-tight uppercase leading-tight text-center">
              SMALL-GROUP COACHING
            </span>
          </div>

          {/* Capsule 4: SAFE & POSITIVE ENVIRONMENT */}
          <div className="border border-slate-400/80 rounded-md py-1.5 px-2 flex items-center justify-center gap-1.5 bg-white text-slate-800">
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
            <span className="font-heading font-bold text-[9px] sm:text-[10px] tracking-tight uppercase leading-tight text-center">
              SAFE & POSITIVE ENVIRONMENT
            </span>
          </div>
        </div>

        {/* ========================================================
            MIDDLE SECTION: FREE TRIAL SPLATTER + COACHING STARTS BOX
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
          {/* Left: FREE FOOTBALL TRIAL Splatter Box */}
          <button
            onClick={onOpenRegister}
            type="button"
            className="w-full text-left relative bg-slate-900 text-white rounded-lg p-4 sm:p-5 flex flex-col justify-between items-center text-center overflow-hidden border-2 border-slate-800 hover:border-amber-400 transition-all duration-300 shadow-md group cursor-pointer"
          >
            {/* Dark Grunge / Splatter Texture Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-90" />
            
            {/* Speed marks in corner */}
            <div className="absolute top-2 left-2">
              <MotionMarks color="#f59e0b" />
            </div>

            <div className="relative z-10 w-full">
              {/* Huge Bold Yellow "FREE" */}
              <div className="font-heading font-black text-4xl sm:text-6xl text-amber-400 tracking-tight leading-none drop-shadow-sm group-hover:scale-105 transition-transform">
                FREE
              </div>

              {/* Bold White "FOOTBALL TRIAL" */}
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-wider uppercase mt-1">
                FOOTBALL TRIAL
              </div>
            </div>

            {/* Green rounded pill banner: "NO EXPERIENCE REQUIRED" */}
            <div className="relative z-10 mt-3 w-full max-w-[280px]">
              <div className="bg-emerald-700 text-white text-[11px] sm:text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow-sm group-hover:bg-emerald-600 transition-colors">
                NO EXPERIENCE REQUIRED
              </div>
            </div>

            {/* Click CTA hint */}
            <div className="relative z-10 mt-2 text-[10px] text-amber-300 font-medium">
              👉 Click here to Book Your Child&apos;s Free Slot
            </div>

            {/* Hand-drawn curved arrow pointing upwards */}
            <div className="absolute bottom-2 left-2 pointer-events-none hidden sm:block">
              <CurvedArrowDoodle size={30} color="#f59e0b" direction="curve-up" />
            </div>
          </button>

          {/* Right: COACHING STARTS Details Box */}
          <div className="relative border-2 border-slate-400/80 rounded-lg p-3 sm:p-4 bg-white flex flex-col justify-between">
            {/* Heading */}
            <div className="text-center font-heading font-black text-sm sm:text-base text-slate-900 tracking-wide uppercase border-b border-slate-200 pb-1.5 mb-2.5">
              COACHING STARTS
            </div>

            {/* Details with icons */}
            <div className="flex flex-col gap-2.5 my-auto pl-1 sm:pl-2">
              {/* Days */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 border border-slate-300">
                  <Calendar className="w-4 h-4 text-slate-800" />
                </div>
                <div className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                  {settings.coachingDays}
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 border border-slate-300">
                  <Clock className="w-4 h-4 text-slate-800" />
                </div>
                <div className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                  {settings.coachingTime}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-sm bg-slate-100 flex items-center justify-center shrink-0 text-slate-800 border border-slate-300">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
                <div className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                  {settings.venueName}, {settings.venueLocation}
                </div>
              </div>
            </div>

            {/* Striker Player Silhouette with Ball */}
            <div className="absolute right-2 bottom-1 pointer-events-none opacity-90 hidden sm:block">
              <StrikerSilhouette size={80} />
            </div>
          </div>
        </div>

        {/* ========================================================
            THREE PHOTOS GALLERY STRIP WITH LABELS
            ======================================================== */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
          {/* Photo 1: MAKE FRIENDS */}
          <div className="flex flex-col rounded-md overflow-hidden border border-slate-300 shadow-xs group">
            <div className="h-24 sm:h-36 md:h-40 overflow-hidden relative">
              <img
                src={photos.makeFriendsPhoto}
                alt="Children making friends in soccer team huddle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 inset-x-1 sm:inset-x-2 text-center">
                <span className="bg-emerald-800/90 text-white text-[9px] sm:text-[11px] font-heading font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block shadow-xs">
                  MAKE FRIENDS
                </span>
              </div>
            </div>
          </div>

          {/* Photo 2: IMPROVE SKILLS */}
          <div className="flex flex-col rounded-md overflow-hidden border border-slate-300 shadow-xs group">
            <div className="h-24 sm:h-36 md:h-40 overflow-hidden relative">
              <img
                src={photos.improveSkillsPhoto}
                alt="Young football player dribbling through cones to improve skills"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 inset-x-1 sm:inset-x-2 text-center">
                <span className="bg-emerald-800/90 text-white text-[9px] sm:text-[11px] font-heading font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block shadow-xs">
                  IMPROVE SKILLS
                </span>
              </div>
            </div>
          </div>

          {/* Photo 3: PLAY MATCHES */}
          <div className="flex flex-col rounded-md overflow-hidden border border-slate-300 shadow-xs group">
            <div className="h-24 sm:h-36 md:h-40 overflow-hidden relative">
              <img
                src={photos.playMatchesPhoto}
                alt="Kids playing competitive mini matches on turf"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 inset-x-1 sm:inset-x-2 text-center">
                <span className="bg-emerald-800/90 text-white text-[9px] sm:text-[11px] font-heading font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block shadow-xs">
                  PLAY MATCHES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM FOOTER: REGISTER NOW + QR CODE + WHATSAPP
            ======================================================== */}
        <div className="bg-slate-900 text-white rounded-lg p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 border border-slate-800 shadow-lg">
          {/* Left: Crown + Register Child Now */}
          <button
            onClick={onOpenRegister}
            type="button"
            className="flex items-center gap-2 text-left group cursor-pointer hover:opacity-90 transition-opacity"
          >
            <CrownDoodle size={30} className="w-6 h-5 sm:w-8 sm:h-6 text-amber-400 shrink-0" />
            <div>
              <div className="font-heading font-black text-sm sm:text-lg md:text-xl text-white tracking-tight uppercase leading-tight group-hover:text-amber-400 transition-colors">
                REGISTER YOUR<br />CHILD NOW
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold tracking-wide">
                ⚡ Limited slots for upcoming batch
              </div>
            </div>
          </button>

          {/* Middle: QR Code with Hand-drawn Arrow & "SCAN TO REGISTER" */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRegister}
              type="button"
              className="group cursor-pointer hover:scale-105 transition-transform"
              title="Click or Scan to Register"
            >
              <AcademyQRCode size={64} className="sm:w-18 sm:h-18" />
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                SCAN TO REGISTER
              </span>
              <CurvedArrowDoodle
                size={24}
                color="#f59e0b"
                direction="down-left"
                className="text-amber-400"
              />
            </div>
          </div>

          {/* Right: WhatsApp & Phone Call */}
          <div className="flex items-center gap-2.5">
            {/* Clickable WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
            </a>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                  CALL / WHATSAPP
                </span>
                <span className="hidden sm:inline-block">
                  <MotionMarks color="#22c55e" />
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <a
                  href={`tel:${settings.contactNumber.replace(/\s+/g, '')}`}
                  className="font-heading font-black text-sm sm:text-base md:text-lg text-amber-400 hover:text-amber-300 tracking-tight leading-tight"
                >
                  {settings.contactNumber}
                </a>
                {settings.secondaryContactNumber && (
                  <>
                    <span className="hidden sm:inline text-slate-400 text-xs">•</span>
                    <a
                      href={`tel:${settings.secondaryContactNumber.replace(/\s+/g, '')}`}
                      className="font-heading font-black text-sm sm:text-base md:text-lg text-amber-400 hover:text-amber-300 tracking-tight leading-tight"
                    >
                      {settings.secondaryContactNumber}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Admin Link at Bottom Corner */}
      <div
        style={{
          color: '#161717',
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
          lineHeight: '18px',
        }}
        className="no-print mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 px-1"
      >
        <span>Cross United Football Academy • Dropout Turf, Vasai West</span>
        <button
          onClick={onOpenAdmin}
          type="button"
          className="bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-slate-800 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Staff & Admin Login</span>
          <span>🔒</span>
        </button>
      </div>
    </div>
  );
};
