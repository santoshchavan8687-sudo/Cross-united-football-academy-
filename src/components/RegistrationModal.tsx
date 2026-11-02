import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { AcademySettings, StudentRegistration } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AcademySettings;
  onAddRegistration: (registration: StudentRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  settings,
  onAddRegistration,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Form State
  const [childName, setChildName] = useState<string>('');
  const [childAge, setChildAge] = useState<number>(7);
  const [gender, setGender] = useState<'Boy' | 'Girl'>('Boy');
  const [parentName, setParentName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDay, setPreferredDay] = useState<'Monday' | 'Wednesday' | 'Friday' | 'Any Day'>('Monday');
  const [experienceLevel, setExperienceLevel] = useState<
    'Beginner (No experience)' | 'Basic School Level' | 'Intermediate' | 'Played in Academy'
  >('Beginner (No experience)');
  const [notes, setNotes] = useState<string>('');
  const [submittedLead, setSubmittedLead] = useState<StudentRegistration | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !parentName.trim() || !phone.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const regId = `CU-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg: StudentRegistration = {
      id: regId,
      childName: childName.trim(),
      childAge,
      gender,
      parentName: parentName.trim(),
      phone: phone.trim(),
      preferredDay,
      preferredTime: settings.coachingTime,
      location: settings.venueLocation,
      experienceLevel,
      notes: notes.trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    onAddRegistration(newReg);
    setSubmittedLead(newReg);
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    setChildName('');
    setParentName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  // WhatsApp confirmation url for parent
  const waConfirmationText = submittedLead
    ? encodeURIComponent(
        `Hello Cross United Football Academy! I have booked a Free Trial Pass (${submittedLead.id}) for my child ${submittedLead.childName} (Age ${submittedLead.childAge}, ${submittedLead.gender}) for ${submittedLead.preferredDay} at Dropout Turf, Vasai West. Looking forward to attending!`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <CrestLogo size={48} className="w-10 h-10 shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Cross United Football Academy
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl uppercase tracking-tight text-white leading-tight">
                {step === 'form' ? 'Book Free Football Trial' : 'Trial Pass Confirmed!'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Free Trial</strong> • No prior football experience required • Boys &amp; Girls Ages 4–15
              </span>
            </div>

            {/* Child Details */}
            <div className="space-y-3">
              <div className="font-heading font-extrabold text-xs uppercase text-slate-800 tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                1. Player Information
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Child&apos;s Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Child&apos;s Age (4-15) *
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 4).map((a) => (
                      <option key={a} value={a}>
                        {a} Years Old
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 h-[38px]">
                    <button
                      type="button"
                      onClick={() => setGender('Boy')}
                      className={`text-xs font-bold rounded-lg border cursor-pointer flex items-center justify-center transition-colors ${
                        gender === 'Boy'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Boy
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Girl')}
                      className={`text-xs font-bold rounded-lg border cursor-pointer flex items-center justify-center transition-colors ${
                        gender === 'Girl'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Girl
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div className="space-y-3 pt-2">
              <div className="font-heading font-extrabold text-xs uppercase text-slate-800 tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                2. Parent / Guardian Contact
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Rohit Sharma"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98201 44521"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Session Preference */}
            <div className="space-y-3 pt-2">
              <div className="font-heading font-extrabold text-xs uppercase text-slate-800 tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                3. Trial Session Preference
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Preferred Trial Day
                  </label>
                  <select
                    value={preferredDay}
                    onChange={(e) =>
                      setPreferredDay(
                        e.target.value as 'Monday' | 'Wednesday' | 'Friday' | 'Any Day'
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Monday">Monday (6:00 PM – 7:00 PM)</option>
                    <option value="Wednesday">Wednesday (6:00 PM – 7:00 PM)</option>
                    <option value="Friday">Friday (6:00 PM – 7:00 PM)</option>
                    <option value="Any Day">Any Day (Flexible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Playing Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) =>
                      setExperienceLevel(
                        e.target.value as
                          | 'Beginner (No experience)'
                          | 'Basic School Level'
                          | 'Intermediate'
                          | 'Played in Academy'
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Beginner (No experience)">Beginner (First time)</option>
                    <option value="Basic School Level">Basic School Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Played in Academy">Played in Academy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Special Notes or Questions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Any health condition, position interest..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-heading font-black text-sm py-3 rounded-lg shadow-md hover:shadow-lg transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Free Trial Booking</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-2">
                🔒 Your contact details are stored securely for academy trial coordination.
              </p>
            </div>
          </form>
        ) : (
          /* ========================================================
             SUCCESS / TRIAL PASS CONFIRMATION SCREEN
             ======================================================== */
          <div className="p-4 sm:p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-heading font-black text-xl text-slate-900 uppercase">
                Trial Session Reserved!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                We have registered <strong className="text-slate-900">{submittedLead?.childName}</strong> for a complimentary football trial session.
              </p>
            </div>

            {/* Trial Voucher Card */}
            <div className="bg-slate-900 text-white p-4 rounded-xl text-left border-2 border-amber-400/80 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <CrestLogo size={32} className="w-7 h-7" />
                  <div>
                    <div className="font-heading font-black text-xs text-white">CROSS UNITED</div>
                    <div className="text-[9px] text-amber-400 font-bold uppercase">Official Trial Pass</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-black px-2 py-0.5 rounded">
                    {submittedLead?.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Player</span>
                  <span className="font-bold text-slate-100">{submittedLead?.childName}</span> (Age {submittedLead?.childAge})
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Scheduled Day</span>
                  <span className="font-bold text-amber-300">{submittedLead?.preferredDay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Timing</span>
                  <span className="font-semibold text-slate-200">{settings.coachingTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Venue</span>
                  <span className="font-semibold text-slate-200">{settings.venueName}, {settings.venueLocation}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] text-slate-400 gap-1">
                <span>Helpline: +91 85917 66653 / +91 93269 59358</span>
                <span className="text-emerald-400 font-bold">Free Entry Pass</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/918591766653?text=${waConfirmationText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Pass Confirmation on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-bold text-xs py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
