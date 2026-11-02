import React, { useState, useEffect } from 'react';
import { FlyerPoster } from './components/FlyerPoster';
import { WebsiteView } from './components/WebsiteView';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminPortal } from './components/AdminPortal';
import { CrestLogo } from './components/CrestLogo';
import {
  DEFAULT_ACADEMY_PHOTOS,
  DEFAULT_ACADEMY_SETTINGS,
  INITIAL_REGISTRATIONS,
} from './data/mockData';
import { AcademyPhotos, AcademySettings, StudentRegistration } from './types';
import {
  Lock,
  Printer,
  FileText,
  Globe,
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  // Load saved settings & registrations & photos from localStorage if present
  const [settings, setSettings] = useState<AcademySettings>(() => {
    try {
      const saved = localStorage.getItem('cu_academy_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_ACADEMY_SETTINGS,
          ...parsed,
          ageGroup: parsed.ageGroup === 'BOYS & GIRLS AGES 4-13' ? 'BOYS & GIRLS AGES 4-15' : (parsed.ageGroup || DEFAULT_ACADEMY_SETTINGS.ageGroup),
          secondaryContactNumber: parsed.secondaryContactNumber || DEFAULT_ACADEMY_SETTINGS.secondaryContactNumber,
        };
      }
      return DEFAULT_ACADEMY_SETTINGS;
    } catch {
      return DEFAULT_ACADEMY_SETTINGS;
    }
  });

  const [photos, setPhotos] = useState<AcademyPhotos>(() => {
    try {
      const saved = localStorage.getItem('cu_academy_photos');
      return saved ? JSON.parse(saved) : DEFAULT_ACADEMY_PHOTOS;
    } catch {
      return DEFAULT_ACADEMY_PHOTOS;
    }
  });

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('cu_academy_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  // UI Modal & View States
  const [viewMode, setViewMode] = useState<'flyer' | 'website'>('flyer');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cu_academy_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('cu_academy_photos', JSON.stringify(photos));
    } catch (e) {
      console.error(e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem('cu_academy_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  // Handlers
  const handleAddRegistration = (newReg: StudentRegistration) => {
    setRegistrations((prev) => [newReg, ...prev]);
  };

  const handleUpdateRegistrations = (updatedList: StudentRegistration[]) => {
    setRegistrations(updatedList);
  };

  const handleUpdateSettings = (newSettings: AcademySettings) => {
    setSettings(newSettings);
  };

  const handlePrint = () => {
    // If user is on website view, temporarily switch to flyer view for printing
    if (viewMode !== 'flyer') {
      setViewMode('flyer');
      setTimeout(() => {
        window.print();
      }, 250);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-slate-900">
      
      {/* ========================================================
          TOP NAVIGATION BAR (NO-PRINT)
          ======================================================== */}
      <header className="no-print sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <CrestLogo size={36} className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
            <div className="leading-tight">
              <div className="font-heading font-black text-xs sm:text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                <span>CROSS UNITED FA</span>
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded font-sans uppercase">
                  Vasai West
                </span>
              </div>
              <div className="text-[10px] text-slate-400 hidden sm:block">
                Dropout Turf • Mon/Wed/Fri 6-7 PM
              </div>
            </div>
          </div>

          {/* Center Mode Switcher */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('flyer')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'flyer'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="View exact 1:1 flyer layout"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Original Flyer</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('website')}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'website'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="View full website sections & curriculum"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Academy Info</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Print Flyer */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden md:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-slate-700 transition-colors cursor-pointer"
              title="Print flyer or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Book Trial CTA */}
            <button
              type="button"
              onClick={() => setIsRegisterOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-black px-2.5 sm:px-3.5 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Free Trial</span>
            </button>

            {/* Admin Login Button */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 text-xs font-bold px-2 sm:px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Admin & Coach Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================
          NOTIFICATION BANNER FOR VASAI WEST PARENTS
          ======================================================== */}
      <div className="no-print bg-emerald-800 text-white text-[11px] sm:text-xs py-1.5 px-3 text-center flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="font-bold uppercase tracking-wider">⚽ Admissions Open:</span>
        <span>Coaching at Dropout Turf, Vasai West • Ages 4-15 • Call/WhatsApp:</span>
        <a
          href="tel:+918591766653"
          className="font-bold underline text-amber-300 hover:text-amber-200"
        >
          +91 85917 66653
        </a>
        <span className="opacity-80">/</span>
        <a
          href="tel:+919326959358"
          className="font-bold underline text-amber-300 hover:text-amber-200"
        >
          +91 93269 59358
        </a>
      </div>

      {/* ========================================================
          MAIN VIEW CONTAINER
          ======================================================== */}
      <main className="flex-1 py-4 sm:py-8 px-2 sm:px-4">
        {viewMode === 'flyer' ? (
          <div className="flex flex-col items-center">
            {/* Header info badge before the flyer */}
            <div className="no-print text-center mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-stone-200/70 px-3 py-1 rounded-full">
                Original Flyer Design • 1:1 Layout
              </span>
            </div>

            {/* Exact Flyer Component */}
            <FlyerPoster
              settings={settings}
              photos={photos}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </div>
        ) : (
          <WebsiteView
            settings={settings}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}
      </main>

      {/* ========================================================
          FLOATING QUICK CONTACT ACTION (MOBILE / DESKTOP)
          ======================================================== */}
      <div className="no-print fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/918591766653?text=Hello%20Cross%20United%20Football%20Academy,%20I%20want%20to%20know%20more%20about%20football%20coaching%20at%20Dropout%20Turf%20Vasai%20West."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 shadow-xl hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
          title="Direct WhatsApp Support"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold hidden group-hover:inline pr-1 transition-all">
            WhatsApp Us
          </span>
        </a>
      </div>

      {/* ========================================================
          INTERACTIVE REGISTRATION MODAL
          ======================================================== */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        settings={settings}
        onAddRegistration={handleAddRegistration}
      />

      {/* ========================================================
          PASSWORD PROTECTED ADMIN PORTAL
          Only Admin has access to add/manage photos and registrations
          ======================================================== */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        registrations={registrations}
        onUpdateRegistrations={handleUpdateRegistrations}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        photos={photos}
        onUpdatePhotos={setPhotos}
      />

      {/* ========================================================
          FOOTER COPYRIGHT & CREDITS (NO-PRINT)
          ======================================================== */}
      <footer className="no-print bg-slate-900 text-slate-400 text-xs py-4 px-4 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Cross United Football Academy • Vasai West, Mumbai
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Venue: Dropout Turf</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
