import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  Sparkles,
  Award,
  Shield,
  Smile,
  Users,
} from 'lucide-react';
import { AcademySettings } from '../types';

interface WebsiteViewProps {
  settings: AcademySettings;
  onOpenRegister: () => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  settings,
  onOpenRegister,
}) => {
  const faqs = [
    {
      q: 'Does my child need previous football experience?',
      a: 'Not at all! As our banner says, "No Experience Required". Our AIFF-certified coaches specialize in foundational age-appropriate coaching for beginners aged 4 to 15.',
    },
    {
      q: 'What should my child wear to the free trial session?',
      a: 'Comfortable sports t-shirt, shorts/track pants, and sports shoes or turf football studs. Don’t forget to bring a water bottle to stay hydrated!',
    },
    {
      q: 'Are girls included in the training sessions?',
      a: 'Yes, absolutely! Cross United is a proud co-ed academy welcoming both boys and girls with safe, encouraging, and supportive coaching.',
    },
    {
      q: 'Where is Dropout Turf located in Vasai West?',
      a: 'Dropout Turf is conveniently located in Vasai West, equipped with premium artificial turf, floodlights, safety netting, and parent viewing areas.',
    },
    {
      q: 'What are the batch timings and days?',
      a: 'Sessions are held on Monday, Wednesday, and Friday from 6:00 PM to 7:00 PM in small focused groups for maximum individual attention.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-6 px-3 sm:px-6">
      
      {/* Academy Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="max-w-2xl">
          <span className="bg-amber-400 text-slate-950 text-xs font-heading font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            Vasai West&apos;s Premier Youth Academy
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight text-white">
            Nurturing Tomorrow&apos;s Champions with Joy &amp; Discipline
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            At Cross United Football Academy, we believe football is a catalyst for life skills. Beyond dribbling and scoring goals, your child builds resilience, sportsmanship, focus, and enduring friendships.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onOpenRegister}
              type="button"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs sm:text-sm px-6 py-3 rounded-lg uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Book Your Free Trial</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>

            <a
              href="https://wa.me/918591766653?text=Hi%20Cross%20United%20Academy,%20I%20have%20an%20inquiry%20regarding%20football%20coaching."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-heading font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars Deep Dive */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 uppercase tracking-tight">
            Our 4 Core Development Pillars
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed specifically for physical and cognitive growth in children ages 4 to 15.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 uppercase">
                1. Develop Football Skills
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Foundations in ball control, smart passing, shooting technique, and game vision through engaging small-sided match drills.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 uppercase">
                2. Get Fit &amp; Active
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Counter screen time with healthy physical activity! Dynamic agility ladders, footwork coordination, balance, and stamina.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-orange-200" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 uppercase">
                3. Build Confidence &amp; Discipline
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Children learn communication, punctuality, respecting teammates, and the courage to bounce back from missed goals.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Smile className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 uppercase">
                4. Most Importantly... Have Fun!
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                A joyful, zero-pressure atmosphere where every child feels valued, celebrated, and inspired to fall in love with football.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Venue & Schedule Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Coaching Venue &amp; Timings
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 uppercase mt-2">
              Dropout Turf, Vasai West
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Sessions are curated on top-tier astro-turf with high safety netting and shock-absorbing rubber infill to protect young joints.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">{settings.coachingDays}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">{settings.coachingTime}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>Dropout Turf, Vasai West, Palghar District, Mumbai MMR</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://maps.google.com/?q=Dropout+Turf+Vasai+West"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-300 h-64 bg-slate-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
              alt="Turf Football pitch"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <div className="font-heading font-black text-sm uppercase">Dropout Turf Facilities</div>
              <div className="text-[11px] text-slate-300">Astro-turf • Floodlit • Parent Sitting Area • Clean Washrooms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
        <h3 className="font-heading font-black text-xl text-slate-900 uppercase tracking-tight text-center mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200">
              <h5 className="font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                {faq.q}
              </h5>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-6 text-center space-y-3">
        <h4 className="font-heading font-black text-lg uppercase text-white">
          Still Have Questions?
        </h4>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Call or WhatsApp our Head Coach directly. We are always happy to guide parents!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="tel:+918591766653"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-black text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors uppercase tracking-wider"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 85917 66653</span>
          </a>

          <a
            href="tel:+919326959358"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-black text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors uppercase tracking-wider"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 93269 59358</span>
          </a>

          <a
            href="https://wa.me/918591766653"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Coach</span>
          </a>
        </div>
      </div>

    </div>
  );
};
