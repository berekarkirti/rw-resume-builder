import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, Edit3, Check, Calendar, MapPin, Award } from 'lucide-react';

export const ExperienceStep = () => {
  const { experiences, addExperience, updateExperience, removeExperience, showToast } = useResume();
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNew = () => {
    addExperience({
      employmentType: 'Internship',
      companyName: '',
      designation: '',
      location: 'Surat, Gujarat',
      startDate: 'Jan 2026',
      endDate: '',
      isCurrentlyWorking: true,
      responsibilities: [
        'Collaborated with design and backend teams to build responsive UI components.',
        'Assisted in writing unit tests and debugging production API endpoints.',
      ],
      achievements: '',
    });
    setEditingIndex(experiences.length);
    showToast('New experience entry added', 'info');
  };

  const handleAddBullet = (expIndex) => {
    const current = experiences[expIndex];
    const updatedBullets = [...(current.responsibilities || []), ''];
    updateExperience(expIndex, { responsibilities: updatedBullets });
  };

  const handleUpdateBullet = (expIndex, bulletIndex, value) => {
    const current = experiences[expIndex];
    const updatedBullets = [...(current.responsibilities || [])];
    updatedBullets[bulletIndex] = value;
    updateExperience(expIndex, { responsibilities: updatedBullets });
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const current = experiences[expIndex];
    const updatedBullets = (current.responsibilities || []).filter((_, i) => i !== bulletIndex);
    updateExperience(expIndex, { responsibilities: updatedBullets });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Work Experience & Internships</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
              Step 5 of 9
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Detail your internships, freelance contracts, or full-time roles. (Freshers can highlight apprenticeship).
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp, idx) => {
          const isEditing = editingIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isEditing
                  ? 'border-rnw-red ring-1 ring-rnw-red/20 bg-white p-4 shadow-sm'
                  : 'border-gray-200 bg-gray-50/60 p-4 hover:border-gray-300'
              }`}
            >
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-rnw-red uppercase tracking-wider">
                      Edit Experience #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={exp.companyName || ''}
                        onChange={(e) => updateExperience(idx, { companyName: e.target.value })}
                        placeholder="e.g. Infinitum Code Labs"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Job Title / Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={exp.designation || ''}
                        onChange={(e) => updateExperience(idx, { designation: e.target.value })}
                        placeholder="e.g. MERN Stack Developer Intern"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={exp.employmentType || 'Internship'}
                        onChange={(e) => updateExperience(idx, { employmentType: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
                      >
                        <option value="Internship">Internship</option>
                        <option value="Full-time Job">Full-time Job</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Part-time Job">Part-time Job</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(idx, { location: e.target.value })}
                        placeholder="e.g. Surat, Gujarat (or Remote)"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
                        placeholder="e.g. Jan 2026"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-gray-700">
                          End Date
                        </label>
                        <label className="flex items-center gap-1 text-[11px] text-rnw-red font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(exp.isCurrentlyWorking)}
                            onChange={(e) => updateExperience(idx, { isCurrentlyWorking: e.target.checked })}
                            className="rounded text-rnw-red focus:ring-rnw-red w-3 h-3"
                          />
                          <span>Currently Working</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.isCurrentlyWorking}
                        value={exp.isCurrentlyWorking ? 'Present' : exp.endDate || ''}
                        onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
                        placeholder="e.g. Present or Dec 2025"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Bulleted Responsibilities */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-gray-700">
                        Key Responsibilities (Action-driven bullets)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddBullet(idx)}
                        className="text-[11px] text-rnw-red hover:underline font-medium flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    {(exp.responsibilities || []).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">&bull;</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleUpdateBullet(idx, bIdx, e.target.value)}
                          placeholder="Engineered modular components and improved database query efficiency..."
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(idx, bIdx)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Key Achievements */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Key Impact / Achievements
                    </label>
                    <input
                      type="text"
                      value={exp.achievements || ''}
                      onChange={(e) => updateExperience(idx, { achievements: e.target.value })}
                      placeholder="e.g. Awarded Intern of the Month; reduced API payload latency by 30%."
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                    />
                  </div>
                </div>
              ) : (
                /* Card Preview */
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Briefcase className="w-4 h-4 text-rnw-red shrink-0" />
                      <h4 className="text-xs font-bold text-gray-900">
                        {exp.designation || 'Designation'}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                        {exp.employmentType}
                      </span>
                      {exp.isCurrentlyWorking && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-700 font-medium">
                      {exp.companyName} {exp.location && `• ${exp.location}`}
                    </p>

                    <p className="text-[10px] text-gray-500">
                      {exp.startDate} - {exp.isCurrentlyWorking ? 'Present' : exp.endDate || 'N/A'}
                    </p>

                    {/* Bullet summary preview */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-0.5 pt-1">
                        {exp.responsibilities.slice(0, 2).map((b, i) => (
                          <li key={i} className="line-clamp-1">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 text-gray-500 hover:text-rnw-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Edit experience"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeExperience(idx);
                        showToast('Experience removed', 'info');
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {experiences.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-600">No work experience listed yet</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Click "Add Experience" to add an internship or contract.</p>
          </div>
        )}
      </div>
    </div>
  );
};
