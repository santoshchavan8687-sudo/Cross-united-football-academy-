import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Download,
  Plus,
  Trash2,
  X,
  Search,
  Filter,
  Save,
  LogOut,
  MapPin,
  Sparkles,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Camera,
  Check,
} from 'lucide-react';
import { AcademyPhotos, AcademySettings, StudentRegistration } from '../types';
import { DEFAULT_ACADEMY_PHOTOS } from '../data/mockData';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: StudentRegistration[];
  onUpdateRegistrations: (updated: StudentRegistration[]) => void;
  settings: AcademySettings;
  onUpdateSettings: (newSettings: AcademySettings) => void;
  photos: AcademyPhotos;
  onUpdatePhotos: (newPhotos: AcademyPhotos) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  registrations,
  onUpdateRegistrations,
  settings,
  onUpdateSettings,
  photos,
  onUpdatePhotos,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'leads' | 'new-lead' | 'photos' | 'settings'>('leads');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // New Lead Form State
  const [newChildName, setNewChildName] = useState<string>('');
  const [newChildAge, setNewChildAge] = useState<number>(7);
  const [newGender, setNewGender] = useState<'Boy' | 'Girl'>('Boy');
  const [newParentName, setNewParentName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newDay, setNewDay] = useState<'Monday' | 'Wednesday' | 'Friday' | 'Any Day'>('Monday');
  const [newExperience, setNewExperience] = useState<
    'Beginner (No experience)' | 'Basic School Level' | 'Intermediate' | 'Played in Academy'
  >('Beginner (No experience)');
  const [newNotes, setNewNotes] = useState<string>('');

  // Editable settings & photos forms
  const [localSettings, setLocalSettings] = useState<AcademySettings>(settings);
  const [localPhotos, setLocalPhotos] = useState<AcademyPhotos>(photos);

  // Toast notification for CSV export & actions
  const [exportToast, setExportToast] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);

  useEffect(() => {
    setLocalPhotos(photos);
  }, [photos]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Exact password required by user
  const REQUIRED_PASSWORD = '12616179';

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === REQUIRED_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect password! Please check and enter the valid admin password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setErrorMsg('');
  };

  // Status Change Handler
  const handleStatusChange = (id: string, newStatus: StudentRegistration['status']) => {
    const updated = registrations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    onUpdateRegistrations(updated);
  };

  // Delete lead handler
  const handleDeleteRegistration = (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      const updated = registrations.filter((r) => r.id !== id);
      onUpdateRegistrations(updated);
    }
  };

  // Create Manual Offline Lead
  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || !newParentName.trim() || !newPhone.trim()) {
      alert('Please fill in child name, parent name, and contact number.');
      return;
    }

    const newEntry: StudentRegistration = {
      id: `REG-2026-${String(registrations.length + 1).padStart(3, '0')}`,
      childName: newChildName.trim(),
      childAge: Number(newChildAge),
      gender: newGender,
      parentName: newParentName.trim(),
      phone: newPhone.trim(),
      preferredDay: newDay,
      preferredTime: settings.coachingTime,
      location: 'Vasai West',
      experienceLevel: newExperience,
      notes: newNotes.trim() || 'Offline turf walk-in registration.',
      status: 'Trial Scheduled',
      createdAt: new Date().toISOString(),
    };

    onUpdateRegistrations([newEntry, ...registrations]);
    // Reset form
    setNewChildName('');
    setNewParentName('');
    setNewPhone('');
    setNewNotes('');
    setActiveTab('leads');
  };

  // File upload handler for photos (Admin only)
  const handlePhotoFileUpload = (key: keyof AcademyPhotos, file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG,PDF, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLocalPhotos((prev) => ({
          ...prev,
          [key]: event.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Photos
  const handleSavePhotos = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePhotos(localPhotos);
    setExportToast('Academy photos updated successfully on the flyer & website!');
    setTimeout(() => setExportToast(null), 4000);
  };

  // Reset to original default photos
  const handleResetPhotos = () => {
    if (window.confirm('Reset all photos to original academy flyer images?')) {
      setLocalPhotos(DEFAULT_ACADEMY_PHOTOS);
      onUpdatePhotos(DEFAULT_ACADEMY_PHOTOS);
      setExportToast('Photos reset to original academy defaults.');
      setTimeout(() => setExportToast(null), 4000);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    alert('Academy settings successfully updated!');
  };

  // Filtered Leads
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV Function with UTF-8 BOM and formatting
  const handleExportCSV = (mode: 'all' | 'filtered' = 'all') => {
    const targetData = mode === 'filtered' ? filteredRegistrations : registrations;
    if (targetData.length === 0) {
      alert('No registration records to export.');
      return;
    }

    const headers = [
      'Registration ID',
      'Child Name',
      'Age',
      'Gender',
      'Parent / Guardian Name',
      'Phone / WhatsApp',
      'Preferred Trial Day',
      'Session Timing',
      'Turf Location',
      'Football Experience',
      'Registration Status',
      'Date Submitted',
      'Coach Notes / Requests',
    ];

    const escapeValue = (val: string | number | undefined | null) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = targetData.map((r) => [
      escapeValue(r.id),
      escapeValue(r.childName),
      r.childAge,
      escapeValue(r.gender),
      escapeValue(r.parentName),
      escapeValue(r.phone),
      escapeValue(r.preferredDay),
      escapeValue(r.preferredTime || '6:00 PM – 7:00 PM'),
      escapeValue(r.location || 'Vasai West'),
      escapeValue(r.experienceLevel),
      escapeValue(r.status),
      escapeValue(new Date(r.createdAt).toLocaleString('en-IN')),
      escapeValue(r.notes || ''),
    ]);

    // Prepend UTF-8 Byte Order Mark (BOM) so Excel and Google Sheets render correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const todayDate = new Date().toISOString().slice(0, 10);
    const tag = mode === 'filtered' && (statusFilter !== 'All' || searchTerm.trim()) ? '_filtered' : '_all';
    link.href = url;
    link.setAttribute('download', `Cross_United_Registrations_${todayDate}${tag}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowExportMenu(false);
    setExportToast(`Exported ${targetData.length} registration(s) to CSV successfully!`);
    setTimeout(() => {
      setExportToast(null);
    }, 4500);
  };

  // KPI Metrics
  const totalLeads = registrations.length;
  const newLeads = registrations.filter((r) => r.status === 'New').length;
  const scheduledTrials = registrations.filter((r) => r.status === 'Trial Scheduled').length;
  const enrolledCount = registrations.filter((r) => r.status === 'Enrolled').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg uppercase tracking-tight text-white flex items-center gap-2">
                Cross United Admin Portal
                {isAuthenticated && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase">
                    Authorized Access
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                Vasai West Academy Management & Registrations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                type="button"
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md transition-colors"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* ========================================================
             LOGIN / PASSWORD SCREEN (PROTECTED)
             ======================================================== */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center max-w-md mx-auto text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-800 mb-4 shadow-inner">
              <KeyRound className="w-8 h-8 text-slate-700" />
            </div>

            <h4 className="font-heading font-black text-xl text-slate-900 uppercase tracking-tight mb-1">
              Admin Password Verification
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Enter your authorized coach / staff password to manage student trial registrations, turf schedules, and inquiries.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="relative text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Enter admin password"
                    className="w-full pl-3 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-md border border-red-200">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-sm py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                Unlock Admin Dashboard
              </button>
            </form>

            <div className="mt-6 text-[11px] text-slate-500 bg-stone-100 p-2.5 rounded-md border border-stone-200 text-left w-full">
              <span className="font-bold text-slate-700">Security Notice:</span> Access restricted to authorized Cross United coaching staff and administrators only.
            </div>
          </div>
        ) : (
          /* ========================================================
             AUTHENTICATED ADMIN DASHBOARD
             ======================================================== */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            {/* Top Navigation Tabs */}
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 overflow-x-auto">
              <div className="flex gap-2 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'leads'
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Trial Registrations ({registrations.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('new-lead')}
                  className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'new-lead'
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add Walk-In / Offline Lead
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('photos')}
                  className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'photos'
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Academy Photos</span>
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded font-sans uppercase">
                    Admin Only
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'settings'
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Turf & Schedule Info
                </button>
              </div>

              {activeTab === 'leads' && (
                <div className="relative py-2 sm:py-0 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleExportCSV(statusFilter !== 'All' || searchTerm.trim() ? 'filtered' : 'all')}
                      type="button"
                      className="flex items-center gap-1.5 text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-md shadow-xs transition-colors cursor-pointer"
                      title="Export current registration list as CSV"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV ({filteredRegistrations.length})</span>
                    </button>
                    <button
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      type="button"
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-300 transition-colors cursor-pointer"
                      title="More export options"
                    >
                      <span className="text-[10px] font-bold">▾</span>
                    </button>
                  </div>

                  {/* Dropdown Menu for Export Options */}
                  {showExportMenu && (
                    <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-20 text-xs text-slate-800">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        Export Options
                      </div>
                      <button
                        type="button"
                        onClick={() => handleExportCSV('all')}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold">Export All Leads</span>
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          {registrations.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExportCSV('filtered')}
                        className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold">Export Filtered List</span>
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          {filteredRegistrations.length}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* TAB 1: REGISTRATIONS & LEADS */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Export Success Notification Toast */}
                {exportToast && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-lg flex items-center justify-between text-xs font-semibold shadow-xs animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{exportToast}</span>
                    </div>
                    <button
                      onClick={() => setExportToast(null)}
                      type="button"
                      className="text-emerald-700 hover:text-emerald-900 text-xs font-bold p-0.5"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* KPI Cards Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Total Leads</div>
                      <div className="text-lg font-black text-slate-900">{totalLeads}</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">New Leads</div>
                      <div className="text-lg font-black text-amber-600">{newLeads}</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Trials Booked</div>
                      <div className="text-lg font-black text-emerald-600">{scheduledTrials}</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Enrolled</div>
                      <div className="text-lg font-black text-purple-700">{enrolledCount}</div>
                    </div>
                  </div>
                </div>

                {/* Filter, Search, and Secondary Export Bar */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search child, parent, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-xs text-slate-500 font-semibold shrink-0">Filter:</span>
                      {['All', 'New', 'Trial Scheduled', 'Contacted', 'Enrolled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          type="button"
                          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors shrink-0 cursor-pointer ${
                            statusFilter === st
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    {/* Secondary Quick Export Button */}
                    <button
                      onClick={() => handleExportCSV('filtered')}
                      type="button"
                      className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer ml-auto"
                      title="Download displayed registrations"
                    >
                      <Download className="w-3 h-3 text-slate-600" />
                      <span>Download CSV</span>
                    </button>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 uppercase font-heading font-bold text-[11px]">
                          <th className="py-2.5 px-3">Student Details</th>
                          <th className="py-2.5 px-3">Parent & Contact</th>
                          <th className="py-2.5 px-3">Preferred Session</th>
                          <th className="py-2.5 px-3">Experience</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Quick Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                              No registrations found matching the search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map((lead) => {
                            const waCleanPhone = lead.phone.replace(/[^0-9]/g, '');
                            const waMessage = encodeURIComponent(
                              `Hello ${lead.parentName}, this is Coach from Cross United Football Academy (Vasai West). We received your Free Football Trial request for ${lead.childName} (Age ${lead.childAge}). We are excited to welcome you at Dropout Turf!`
                            );
                            const waUrl = `https://wa.me/${waCleanPhone.length === 10 ? `91${waCleanPhone}` : waCleanPhone}?text=${waMessage}`;

                            return (
                              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                                {/* Student */}
                                <td className="py-3 px-3">
                                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                    {lead.childName}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Age {lead.childAge} • {lead.gender}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    {lead.id}
                                  </div>
                                </td>

                                {/* Parent */}
                                <td className="py-3 px-3">
                                  <div className="font-semibold text-slate-800">{lead.parentName}</div>
                                  <div className="text-slate-600 font-mono text-[11px]">{lead.phone}</div>
                                  {lead.location && (
                                    <div className="text-[10px] text-slate-400">{lead.location}</div>
                                  )}
                                </td>

                                {/* Session */}
                                <td className="py-3 px-3">
                                  <span className="font-semibold text-slate-800 bg-stone-100 px-1.5 py-0.5 rounded text-[11px]">
                                    {lead.preferredDay}
                                  </span>
                                  <div className="text-[10px] text-slate-500 mt-1">
                                    {lead.preferredTime || '6:00 PM – 7:00 PM'}
                                  </div>
                                </td>

                                {/* Experience */}
                                <td className="py-3 px-3">
                                  <div className="text-slate-700 text-[11px] max-w-[150px] truncate" title={lead.experienceLevel}>
                                    {lead.experienceLevel}
                                  </div>
                                  {lead.notes && (
                                    <div className="text-[10px] text-slate-500 italic truncate max-w-[150px]" title={lead.notes}>
                                      &quot;{lead.notes}&quot;
                                    </div>
                                  )}
                                </td>

                                {/* Status Dropdown */}
                                <td className="py-3 px-3">
                                  <select
                                    value={lead.status}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        lead.id,
                                        e.target.value as StudentRegistration['status']
                                      )
                                    }
                                    className={`text-[11px] font-bold rounded-md px-2 py-1 border focus:outline-none cursor-pointer ${
                                      lead.status === 'New'
                                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                                        : lead.status === 'Trial Scheduled'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : lead.status === 'Enrolled'
                                        ? 'bg-purple-50 text-purple-800 border-purple-300'
                                        : lead.status === 'Contacted'
                                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                                        : 'bg-stone-100 text-stone-700 border-stone-300'
                                    }`}
                                  >
                                    <option value="New">🟡 New</option>
                                    <option value="Contacted">🔵 Contacted</option>
                                    <option value="Trial Scheduled">🟢 Trial Scheduled</option>
                                    <option value="Attended">⚽ Attended Trial</option>
                                    <option value="Enrolled">🏆 Enrolled</option>
                                    <option value="Cancelled">❌ Cancelled</option>
                                  </select>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {/* WhatsApp Direct */}
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                                      title="Send WhatsApp message to parent"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Call Direct */}
                                    <a
                                      href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                                      className="p-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                      title="Call parent"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Delete */}
                                    <button
                                      onClick={() => handleDeleteRegistration(lead.id)}
                                      type="button"
                                      className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                      title="Delete record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ADD WALK-IN / OFFLINE LEAD */}
            {activeTab === 'new-lead' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl mx-auto w-full">
                <div className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="font-heading font-black text-base text-slate-900 uppercase tracking-tight mb-1 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    Register New Walk-in / Turf Trial
                  </h4>
                  <p className="text-xs text-slate-500 mb-5">
                    Record offline walk-in student registrations at Dropout Turf, Vasai West.
                  </p>

                  <form onSubmit={handleCreateManualLead} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Child&apos;s Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newChildName}
                          onChange={(e) => setNewChildName(e.target.value)}
                          placeholder="e.g. Aryan D'Costa"
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Age (4-15) *
                          </label>
                          <select
                            value={newChildAge}
                            onChange={(e) => setNewChildAge(Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 4).map((age) => (
                              <option key={age} value={age}>
                                {age} years
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Gender
                          </label>
                          <select
                            value={newGender}
                            onChange={(e) => setNewGender(e.target.value as 'Boy' | 'Girl')}
                            className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="Boy">Boy</option>
                            <option value="Girl">Girl</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newParentName}
                          onChange={(e) => setNewParentName(e.target.value)}
                          placeholder="e.g. Rahul D'Costa"
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Preferred Trial Day
                        </label>
                        <select
                          value={newDay}
                          onChange={(e) =>
                            setNewDay(e.target.value as 'Monday' | 'Wednesday' | 'Friday' | 'Any Day')
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="Monday">Monday (6:00 PM – 7:00 PM)</option>
                          <option value="Wednesday">Wednesday (6:00 PM – 7:00 PM)</option>
                          <option value="Friday">Friday (6:00 PM – 7:00 PM)</option>
                          <option value="Any Day">Any Available Day</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Previous Football Experience
                        </label>
                        <select
                          value={newExperience}
                          onChange={(e) =>
                            setNewExperience(
                              e.target.value as
                                | 'Beginner (No experience)'
                                | 'Basic School Level'
                                | 'Intermediate'
                                | 'Played in Academy'
                            )
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="Beginner (No experience)">Beginner (No experience)</option>
                          <option value="Basic School Level">Basic School Level</option>
                          <option value="Intermediate">Intermediate (Played regularly)</option>
                          <option value="Played in Academy">Played in Academy</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Coach Notes / Area
                      </label>
                      <textarea
                        rows={2}
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                        placeholder="e.g. Lives in Vasai West, interested in striker drills..."
                        className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-heading font-bold uppercase tracking-wide bg-emerald-700 hover:bg-emerald-600 text-white rounded shadow-sm cursor-pointer"
                      >
                        Save Registration
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB: ACADEMY PHOTOS (ADMIN ONLY ACCESS) */}
            {activeTab === 'photos' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
                {/* Security Access Notice */}
                <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-black text-sm uppercase text-emerald-950">
                          Academy Photo Management
                        </h4>
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                          Restricted Admin Access
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        Only verified coaches &amp; admins can upload, replace, or edit flyer and website imagery.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetPhotos}
                    className="flex items-center gap-1.5 text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors font-medium shrink-0 cursor-pointer"
                    title="Restore original photos"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                <form onSubmit={handleSavePhotos} className="space-y-6">
                  {/* Photo 1: Hero Header Photo */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                          Slot 1 (Header Flyer)
                        </span>
                        <h5 className="font-heading font-bold text-sm text-slate-900 uppercase">
                          Hero Action Photo (Boys &amp; Girls Ages 4–15)
                        </h5>
                      </div>
                      <span className="text-[11px] text-slate-400">Top-right on flyer poster</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4 h-36 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 relative group shadow-inner">
                        <img
                          src={localPhotos.heroPhoto}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          Current Live Photo
                        </div>
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Upload Photo from Device / Mobile *
                          </label>
                          <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-colors text-xs font-semibold text-slate-700">
                            <Upload className="w-4 h-4 text-emerald-600" />
                            <span>Click to browse or take photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoFileUpload('heroPhoto', e.target.files?.[0] || null)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Or Enter Direct Image URL
                          </label>
                          <input
                            type="url"
                            value={localPhotos.heroPhoto}
                            onChange={(e) =>
                              setLocalPhotos({ ...localPhotos, heroPhoto: e.target.value })
                            }
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo 2: MAKE FRIENDS */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                          Slot 2 (Gallery Strip)
                        </span>
                        <h5 className="font-heading font-bold text-sm text-slate-900 uppercase">
                          &quot;Make Friends&quot; Photo (Team Huddle &amp; Camaraderie)
                        </h5>
                      </div>
                      <span className="text-[11px] text-slate-400">Left card in bottom photo strip</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4 h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 relative shadow-inner">
                        <img
                          src={localPhotos.makeFriendsPhoto}
                          alt="Make Friends Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Upload Photo from Device
                          </label>
                          <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-colors text-xs font-semibold text-slate-700">
                            <Upload className="w-4 h-4 text-emerald-600" />
                            <span>Upload Huddle / Friends Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoFileUpload('makeFriendsPhoto', e.target.files?.[0] || null)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Or Image URL
                          </label>
                          <input
                            type="url"
                            value={localPhotos.makeFriendsPhoto}
                            onChange={(e) =>
                              setLocalPhotos({ ...localPhotos, makeFriendsPhoto: e.target.value })
                            }
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo 3: IMPROVE SKILLS */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                          Slot 3 (Gallery Strip)
                        </span>
                        <h5 className="font-heading font-bold text-sm text-slate-900 uppercase">
                          &quot;Improve Skills&quot; Photo (Agility &amp; Cone Drills)
                        </h5>
                      </div>
                      <span className="text-[11px] text-slate-400">Center card in photo strip</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4 h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 relative shadow-inner">
                        <img
                          src={localPhotos.improveSkillsPhoto}
                          alt="Improve Skills Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Upload Photo from Device
                          </label>
                          <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-colors text-xs font-semibold text-slate-700">
                            <Upload className="w-4 h-4 text-emerald-600" />
                            <span>Upload Skills / Dribbling Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoFileUpload('improveSkillsPhoto', e.target.files?.[0] || null)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Or Image URL
                          </label>
                          <input
                            type="url"
                            value={localPhotos.improveSkillsPhoto}
                            onChange={(e) =>
                              setLocalPhotos({ ...localPhotos, improveSkillsPhoto: e.target.value })
                            }
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo 4: PLAY MATCHES */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                          Slot 4 (Gallery Strip)
                        </span>
                        <h5 className="font-heading font-bold text-sm text-slate-900 uppercase">
                          &quot;Play Matches&quot; Photo (Competitive Match Action)
                        </h5>
                      </div>
                      <span className="text-[11px] text-slate-400">Right card in photo strip</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4 h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 relative shadow-inner">
                        <img
                          src={localPhotos.playMatchesPhoto}
                          alt="Play Matches Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Upload Photo from Device
                          </label>
                          <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-colors text-xs font-semibold text-slate-700">
                            <Upload className="w-4 h-4 text-emerald-600" />
                            <span>Upload Match Play Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handlePhotoFileUpload('playMatchesPhoto', e.target.files?.[0] || null)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Or Image URL
                          </label>
                          <input
                            type="url"
                            value={localPhotos.playMatchesPhoto}
                            onChange={(e) =>
                              setLocalPhotos({ ...localPhotos, playMatchesPhoto: e.target.value })
                            }
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit / Save Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-xs text-slate-500">
                      🔒 Only authenticated admins can save these changes.
                    </span>

                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Apply Photos</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: TURF & SCHEDULE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl mx-auto w-full">
                <div className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="font-heading font-black text-base text-slate-900 uppercase tracking-tight mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Academy Venue & Contact Configuration
                  </h4>
                  <p className="text-xs text-slate-500 mb-5">
                    Update the operational timings, turf location, and contact numbers displayed on the flyer.
                  </p>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Academy Name
                        </label>
                        <input
                          type="text"
                          value={localSettings.name}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, name: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Age Group Tag
                        </label>
                        <input
                          type="text"
                          value={localSettings.ageGroup}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, ageGroup: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Coaching Days
                        </label>
                        <input
                          type="text"
                          value={localSettings.coachingDays}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, coachingDays: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Coaching Timings
                        </label>
                        <input
                          type="text"
                          value={localSettings.coachingTime}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, coachingTime: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Venue / Turf Name
                        </label>
                        <input
                          type="text"
                          value={localSettings.venueName}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, venueName: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Location City / Area
                        </label>
                        <input
                          type="text"
                          value={localSettings.venueLocation}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, venueLocation: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Primary Call / Contact
                        </label>
                        <input
                          type="text"
                          value={localSettings.contactNumber}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, contactNumber: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Secondary Contact Number
                        </label>
                        <input
                          type="text"
                          value={localSettings.secondaryContactNumber || ''}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, secondaryContactNumber: e.target.value })
                          }
                          placeholder="+91 93269 59358"
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={localSettings.whatsappNumber}
                          onChange={(e) =>
                            setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 text-xs font-heading font-bold uppercase tracking-wide bg-slate-900 hover:bg-slate-800 text-white rounded shadow-sm cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-emerald-400" />
                        Save Academy Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
