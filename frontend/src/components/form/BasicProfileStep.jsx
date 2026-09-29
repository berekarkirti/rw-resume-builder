import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { RNW_BRANCHES, RNW_COURSES } from '../../data/initialData';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Camera, 
  Trash2, 
  Building, 
  GraduationCap,
  ShieldAlert
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, FigmaIcon } from '../Icons';

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
];

export const BasicProfileStep = () => {
  const { profile, updateProfile, showToast, lookups } = useResume();
  const baseBranches = lookups?.branches?.length ? lookups.branches : RNW_BRANCHES;
  const baseCourses = lookups?.courses?.length ? lookups.courses : RNW_COURSES;
  const branches = profile.branch && !baseBranches.includes(profile.branch)
    ? [profile.branch, ...baseBranches]
    : baseBranches;
  const courses = profile.course && !baseCourses.includes(profile.course)
    ? [profile.course, ...baseCourses]
    : baseCourses;
  const fileInputRef = useRef(null);
  const photoFrameRef = useRef(null);
  const dragRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Please upload an image smaller than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile('profilePhoto', reader.result);
        updateProfile('photoPositionX', 50);
        updateProfile('photoPositionY', 50);
        showToast('Profile photo updated', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const clampPos = (value) => Math.min(100, Math.max(0, value));

  const startPhotoDrag = (e) => {
    if (!profile.profilePhoto) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: profile.photoPositionX ?? 50,
      posY: profile.photoPositionY ?? 50,
    };
  };

  const movePhotoDrag = (e) => {
    if (!dragRef.current || !photoFrameRef.current) return;
    const size = photoFrameRef.current.getBoundingClientRect().width || 96;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    updateProfile('photoPositionX', clampPos(dragRef.current.posX - (dx / size) * 100));
    updateProfile('photoPositionY', clampPos(dragRef.current.posY - (dy / size) * 100));
  };

  const endPhotoDrag = () => {
    dragRef.current = null;
  };

  const setPhoto = (url) => {
    updateProfile('profilePhoto', url);
    updateProfile('photoPositionX', 50);
    updateProfile('photoPositionY', 50);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Basic Profile & Contact Details</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
            Step 1 of 9
          </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Provide your official Red & White student credentials and verified contact channels.
        </p>
      </div>

      {/* Safety Compliance Banner */}
      <div className="flex items-center gap-2 text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg">
        <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Privacy Protected: We strictly do not collect sensitive national IDs (Aadhaar / PAN).</span>
      </div>

      {/* Profile Photo & Student ID Section */}
      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Avatar Preview — drag to reposition crop */}
          <div className="relative group shrink-0">
            <div
              ref={photoFrameRef}
              className={`w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-rnw-red/30 shadow-sm flex items-center justify-center ${
                profile.profilePhoto ? 'cursor-grab active:cursor-grabbing touch-none' : ''
              }`}
              onPointerDown={startPhotoDrag}
              onPointerMove={movePhotoDrag}
              onPointerUp={endPhotoDrag}
              onPointerCancel={endPhotoDrag}
              title={profile.profilePhoto ? 'Drag to adjust photo' : undefined}
            >
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                  style={{
                    objectPosition: `${profile.photoPositionX ?? 50}% ${profile.photoPositionY ?? 50}%`,
                  }}
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white rounded-full shadow-md transition-colors"
              title="Upload photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Avatar options and controls */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800">Profile Photo</h4>
                <p className="text-[11px] text-gray-500">
                  Square JPG or PNG, max 2MB. Photo par drag karke upar-neeche adjust karo.
                </p>
              </div>
              {profile.profilePhoto && (
                <button
                  onClick={() => setPhoto('')}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            {/* Quick avatar selection */}
            <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
              <span className="text-[10px] text-gray-400 font-medium">Or choose avatar:</span>
              <div className="flex items-center gap-1.5">
                {SAMPLE_AVATARS.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setPhoto(url)}
                    className="w-7 h-7 rounded-full overflow-hidden border border-gray-300 hover:border-rnw-red focus:ring-1 focus:ring-rnw-red transition-all"
                  >
                    <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identity & Basic Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Student ID */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Student Enrollment ID <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.studentId || ''}
              onChange={(e) => updateProfile('studentId', e.target.value)}
              placeholder="e.g. RNW-2026-WD-108"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red font-mono uppercase"
            />
          </div>
          <span className="text-[10px] text-gray-400">Official Red & White Institute registration number</span>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name (Official) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={profile.fullName || ''}
            onChange={(e) => updateProfile('fullName', e.target.value)}
            placeholder="e.g. Rohan V. Patel"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
          />
        </div>

        {/* Display / Preferred Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Professional Display Name
          </label>
          <input
            type="text"
            value={profile.displayName || ''}
            onChange={(e) => updateProfile('displayName', e.target.value)}
            placeholder="e.g. Rohan Patel"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => updateProfile('email', e.target.value)}
              placeholder="rohan.patel@rnwstudents.in"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Mobile Number (WhatsApp Enabled) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="tel"
              value={profile.mobileNumber || ''}
              onChange={(e) => updateProfile('mobileNumber', e.target.value)}
              placeholder="+91 98251 44789"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>
        </div>

        {/* Location (City & State) */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Current City & State <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={profile.city ? `${profile.city}, ${profile.state || 'Gujarat'}` : ''}
              onChange={(e) => {
                const parts = e.target.value.split(',');
                updateProfile('city', parts[0]?.trim() || '');
                if (parts[1]) updateProfile('state', parts[1]?.trim() || '');
              }}
              placeholder="Surat, Gujarat"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>
        </div>
      </div>

      {/* Red & White Academic Details */}
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-rnw-red" />
          <span>Red & White Institute Enrolled Center</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Institute Branch / Campus
            </label>
            <select
              value={profile.branch || ''}
              onChange={(e) => updateProfile('branch', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white"
            >
              <option value="">Select Gujarat campus</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Current Registered Course
            </label>
            <select
              value={profile.course || ''}
              onChange={(e) => updateProfile('course', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white"
            >
              <option value="">Select registered course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Professional Links & Portfolios */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-rnw-red" />
          <span>Professional Web & Portfolio Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* LinkedIn */}
          <div className="relative">
            <LinkedinIcon className="w-3.5 h-3.5 text-blue-600 absolute left-3 top-2.5" />
            <input
              type="url"
              value={profile.linkedinUrl || ''}
              onChange={(e) => updateProfile('linkedinUrl', e.target.value)}
              placeholder="LinkedIn Profile URL"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>

          {/* GitHub */}
          <div className="relative">
            <GithubIcon className="w-3.5 h-3.5 text-gray-800 absolute left-3 top-2.5" />
            <input
              type="url"
              value={profile.githubUrl || ''}
              onChange={(e) => updateProfile('githubUrl', e.target.value)}
              placeholder="GitHub Profile URL"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>

          {/* Portfolio */}
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-2.5" />
            <input
              type="url"
              value={profile.portfolioUrl || ''}
              onChange={(e) => updateProfile('portfolioUrl', e.target.value)}
              placeholder="Personal Portfolio URL"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>

          {/* Behance / Dribbble */}
          <div className="relative">
            <FigmaIcon className="w-3.5 h-3.5 text-pink-600 absolute left-3 top-2.5" />
            <input
              type="url"
              value={profile.behanceUrl || profile.dribbbleUrl || ''}
              onChange={(e) => updateProfile('behanceUrl', e.target.value)}
              placeholder="Behance or Dribbble URL (Designers)"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
