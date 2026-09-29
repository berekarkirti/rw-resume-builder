import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TARGET_ROLES } from '../../data/initialData';
import { Briefcase, FileText, MapPin, Clock, Calendar, Sparkles, Check } from 'lucide-react';

const SUMMARY_PRESETS = [
  {
    role: 'Full Stack MERN Developer',
    text: 'Results-driven Full Stack Developer trained at Red & White Multimedia Institute with strong expertise in React.js, Node.js, Express, and MongoDB. Proven track record in developing modular components, scalable REST APIs, and database schemas. Eager to contribute technical rigor and passion for software engineering to high-growth development teams.',
  },
  {
    role: 'UI/UX & Product Designer',
    text: 'User-centric UI/UX and Product Designer certified by Red & White Skill Education. Proficient in wireframing, high-fidelity Figma prototyping, design systems, and conducting qualitative user research. Dedicated to designing intuitive digital interfaces that balance business goals with seamless, delightful user experiences.',
  },
  {
    role: 'Flutter Mobile Developer',
    text: 'Enthusiastic Flutter Application Developer with hands-on experience in cross-platform mobile architecture, Dart language semantics, Bloc state management, and Firebase integration. Skilled at delivering responsive, smooth 60fps mobile interfaces with clean code and robust offline persistence.',
  },
];

export const CareerProfileStep = () => {
  const { profile, updateProfile, showToast, lookups } = useResume();
  const roleOptions = lookups?.targetRoles?.length ? lookups.targetRoles : TARGET_ROLES;
  const [isCustomRole, setIsCustomRole] = useState(
    Boolean(profile.targetRole && !roleOptions.includes(profile.targetRole))
  );

  // Word count helper
  const words = (profile.professionalSummary || '').trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const handleApplyPreset = (presetText) => {
    updateProfile('professionalSummary', presetText);
    showToast('Applied recommended summary template', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Career Profile & Professional Summary</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
            Step 2 of 9
          </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Define your target placement role and write a compelling 40–100 word elevator pitch for recruiters.
        </p>
      </div>

      {/* Target Role Selection */}
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-gray-800">
            Target Placement Job Role <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsCustomRole(!isCustomRole)}
            className="text-[11px] text-rnw-red hover:underline font-medium"
          >
            {isCustomRole ? 'Choose from Institute list' : '+ Enter Custom Role'}
          </button>
        </div>

        {isCustomRole ? (
          <input
            type="text"
            value={profile.targetRole || ''}
            onChange={(e) => updateProfile('targetRole', e.target.value)}
            placeholder="e.g. Next.js & Cloud Solutions Architect"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white"
          />
        ) : (
          <select
            value={roleOptions.includes(profile.targetRole) ? profile.targetRole : ''}
            onChange={(e) => updateProfile('targetRole', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white font-medium text-gray-800"
          >
            <option value="">Select target role</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        )}
      </div>

      {/* Professional Summary with Word Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-gray-800 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-rnw-red" />
            <span>Professional Summary</span>
            <span className="text-red-500">*</span>
          </label>
          
          {/* Word Count Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className={wordCount >= 40 && wordCount <= 100 ? 'text-emerald-600 font-bold' : wordCount > 100 ? 'text-amber-600' : 'text-gray-400'}>
              {wordCount} words
            </span>
            <span className="text-[10px] text-gray-400">(Ideal: 40 - 100 words)</span>
          </div>
        </div>

        <textarea
          rows={4}
          value={profile.professionalSummary || ''}
          onChange={(e) => updateProfile('professionalSummary', e.target.value)}
          placeholder="Highlight your training at Red & White Institute, key technical capabilities, capstone accomplishments, and the immediate value you bring to an engineering or design team..."
          className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red leading-relaxed"
        />

        {/* Suggestion Presets */}
        <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-rnw-red mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Quick-Insert Recommended Summaries:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SUMMARY_PRESETS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPreset(p.text)}
                className="text-left p-2 rounded-md bg-white border border-gray-200 hover:border-rnw-red text-[11px] text-gray-700 hover:text-rnw-red transition-all shadow-xs"
              >
                <div className="font-semibold truncate">{p.role}</div>
                <div className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{p.text}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Placement Preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Preferred Work Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>Preferred Location</span>
          </label>
          <input
            type="text"
            value={profile.preferredLocation || ''}
            onChange={(e) => updateProfile('preferredLocation', e.target.value)}
            placeholder="e.g. Surat / Ahmedabad / Remote"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
            <span>Employment Type</span>
          </label>
          <select
            value={profile.employmentType || 'Full-time'}
            onChange={(e) => updateProfile('employmentType', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white"
          >
            <option value="Full-time">Full-time Job</option>
            <option value="Internship">Internship / Apprenticeship</option>
            <option value="Freelance">Freelance / Contract</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Joining Availability</span>
          </label>
          <select
            value={profile.availability || 'Immediate'}
            onChange={(e) => updateProfile('availability', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-rnw-red/20 focus:border-rnw-red bg-white"
          >
            <option value="Immediate">Immediate (Ready to Join)</option>
            <option value="Within 15 Days">Within 15 Days</option>
            <option value="Within 1 Month">Within 1 Month</option>
            <option value="Within 2 Months">Within 2 Months</option>
          </select>
        </div>
      </div>
    </div>
  );
};
