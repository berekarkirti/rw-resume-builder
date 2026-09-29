import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Globe, HeartHandshake, Plus, Trash2, Check, Sparkles, X } from 'lucide-react';

const COMMON_LANGUAGES = ['English', 'Hindi', 'Gujarati', 'Marathi', 'German', 'French'];
const POPULAR_SOFT_SKILLS = [
  'Problem Solving',
  'Team Collaboration',
  'Agile / Scrum Mindset',
  'Effective Communication',
  'Critical Thinking',
  'Time Management',
  'Fast Learner',
  'Client Interaction',
  'Adaptability',
];

export const LanguagesStep = () => {
  const { profile, updateProfile, showToast } = useResume();
  const [newLangName, setNewLangName] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const currentLanguages = profile.languages || [];
  const currentSoftSkills = profile.softSkills || [];

  const handleAddLanguage = (name) => {
    const lang = name || newLangName.trim();
    if (!lang) return;
    if (currentLanguages.some((l) => l.language.toLowerCase() === lang.toLowerCase())) {
      showToast('Language already added', 'info');
      return;
    }
    const updated = [
      ...currentLanguages,
      { language: lang, proficiency: 'Fluent', canSpeak: true, canRead: true, canWrite: true },
    ];
    updateProfile('languages', updated);
    setNewLangName('');
    showToast(`Added ${lang}`, 'success');
  };

  const handleRemoveLanguage = (idx) => {
    const updated = currentLanguages.filter((_, i) => i !== idx);
    updateProfile('languages', updated);
  };

  const handleUpdateLanguage = (idx, field, value) => {
    const updated = currentLanguages.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
    updateProfile('languages', updated);
  };

  const handleToggleSoftSkill = (skill) => {
    if (currentSoftSkills.includes(skill)) {
      updateProfile(
        'softSkills',
        currentSoftSkills.filter((s) => s !== skill)
      );
    } else {
      updateProfile('softSkills', [...currentSoftSkills, skill]);
      showToast(`Added ${skill}`, 'success');
    }
  };

  const handleAddCustomSoftSkill = (e) => {
    e?.preventDefault();
    if (!newSoftSkill.trim()) return;
    if (!currentSoftSkills.includes(newSoftSkill.trim())) {
      updateProfile('softSkills', [...currentSoftSkills, newSoftSkill.trim()]);
      showToast(`Added ${newSoftSkill.trim()}`, 'success');
    }
    setNewSoftSkill('');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Languages & Interpersonal Soft Skills</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
            Step 8 of 9
          </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Specify languages with speaking/reading/writing skills and highlight key professional traits.
        </p>
      </div>

      {/* Languages Section */}
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-rnw-red" />
            <span>Languages Known ({currentLanguages.length})</span>
          </h3>

          <div className="flex items-center gap-1.5">
            {COMMON_LANGUAGES.map((lang) => {
              const isAdded = currentLanguages.some((l) => l.language.toLowerCase() === lang.toLowerCase());
              if (isAdded) return null;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleAddLanguage(lang)}
                  className="text-[10px] px-2 py-0.5 rounded bg-white hover:bg-red-50 text-gray-600 hover:text-rnw-red border border-gray-200"
                >
                  +{lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Custom Language */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newLangName}
            onChange={(e) => setNewLangName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
            placeholder="Add language (e.g. Japanese, German)..."
            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
          />
          <button
            type="button"
            onClick={() => handleAddLanguage()}
            className="px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Languages Matrix */}
        <div className="space-y-2 pt-1">
          {currentLanguages.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-800">{item.language}</span>
                <select
                  value={item.proficiency || 'Fluent'}
                  onChange={(e) => handleUpdateLanguage(idx, 'proficiency', e.target.value)}
                  className="text-[10px] font-medium py-0.5 px-1.5 border border-gray-200 rounded bg-gray-50 text-gray-700"
                >
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(item.canSpeak)}
                    onChange={(e) => handleUpdateLanguage(idx, 'canSpeak', e.target.checked)}
                    className="rounded text-rnw-red focus:ring-rnw-red w-3 h-3"
                  />
                  <span>Speak</span>
                </label>
                <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(item.canRead)}
                    onChange={(e) => handleUpdateLanguage(idx, 'canRead', e.target.checked)}
                    className="rounded text-rnw-red focus:ring-rnw-red w-3 h-3"
                  />
                  <span>Read</span>
                </label>
                <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(item.canWrite)}
                    onChange={(e) => handleUpdateLanguage(idx, 'canWrite', e.target.checked)}
                    className="rounded text-rnw-red focus:ring-rnw-red w-3 h-3"
                  />
                  <span>Write</span>
                </label>

                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(idx)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills Section */}
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-rnw-red" />
          <span>Soft Skills & Professional Attributes</span>
        </h3>

        {/* Popular chips */}
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SOFT_SKILLS.map((skill) => {
            const isSelected = currentSoftSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => handleToggleSoftSkill(skill)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rnw-red text-white border-rnw-red shadow-xs font-medium'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-gray-400" />}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Soft Skill input */}
        <form onSubmit={handleAddCustomSoftSkill} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Add custom soft skill (e.g. Stakeholder Management)..."
            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
          />
          <button
            type="submit"
            disabled={!newSoftSkill.trim()}
            className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-lg disabled:opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
