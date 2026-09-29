import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Edit3, Check, Calendar, Award } from 'lucide-react';

export const EducationStep = () => {
  const { educations, addEducation, updateEducation, removeEducation, showToast } = useResume();
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNew = () => {
    addEducation({
      qualification: 'Diploma in Web & Mobile Technologies',
      specialization: 'Full Stack Engineering',
      institute: 'Red & White Multimedia Institute',
      boardOrUniversity: 'Red & White Skill Education',
      startYear: '2025',
      endYear: '2026',
      isPursuing: true,
      gradeOrPercentage: 'Pursuing',
    });
    setEditingIndex(educations.length);
    showToast('New education entry added', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Education & Academic Credentials</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
              Step 3 of 9
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            List your diploma, degrees, or school education in reverse chronological order.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Qualification</span>
        </button>
      </div>

      {/* Educations List */}
      <div className="space-y-4">
        {educations.map((edu, idx) => {
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
                /* Editable Form */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-rnw-red uppercase tracking-wider">
                      Edit Education #{idx + 1}
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
                        Qualification / Degree <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.qualification || ''}
                        onChange={(e) => updateEducation(idx, { qualification: e.target.value })}
                        placeholder="e.g. Master in Full Stack Web Development"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Field / Specialization
                      </label>
                      <input
                        type="text"
                        value={edu.specialization || ''}
                        onChange={(e) => updateEducation(idx, { specialization: e.target.value })}
                        placeholder="e.g. MERN Stack & Cloud Deployment"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Institute / College <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={edu.institute || ''}
                        onChange={(e) => updateEducation(idx, { institute: e.target.value })}
                        placeholder="e.g. Red & White Multimedia Institute"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Board / University
                      </label>
                      <input
                        type="text"
                        value={edu.boardOrUniversity || ''}
                        onChange={(e) => updateEducation(idx, { boardOrUniversity: e.target.value })}
                        placeholder="e.g. Gujarat Technological University / VNSGU"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Start Year
                      </label>
                      <input
                        type="text"
                        value={edu.startYear || ''}
                        onChange={(e) => updateEducation(idx, { startYear: e.target.value })}
                        placeholder="e.g. 2024"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-gray-700">
                          End Year
                        </label>
                        <label className="flex items-center gap-1 text-[11px] text-rnw-red font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(edu.isPursuing)}
                            onChange={(e) => updateEducation(idx, { isPursuing: e.target.checked })}
                            className="rounded text-rnw-red focus:ring-rnw-red w-3 h-3"
                          />
                          <span>Pursuing</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={edu.isPursuing}
                        value={edu.isPursuing ? 'Present / Pursuing' : edu.endYear || ''}
                        onChange={(e) => updateEducation(idx, { endYear: e.target.value })}
                        placeholder="e.g. 2026"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Percentage / CGPA / Grade
                      </label>
                      <input
                        type="text"
                        value={edu.gradeOrPercentage || ''}
                        onChange={(e) => updateEducation(idx, { gradeOrPercentage: e.target.value })}
                        placeholder="e.g. 8.6 CGPA or Distinction (Grade A+)"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Card Summary View */
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-rnw-red shrink-0" />
                      <h4 className="text-xs font-bold text-gray-900">
                        {edu.qualification || 'Qualification'}
                      </h4>
                      {edu.isPursuing && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Pursuing
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-700 font-medium">
                      {edu.institute} {edu.specialization && `• ${edu.specialization}`}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span>{edu.startYear} - {edu.isPursuing ? 'Present' : edu.endYear || 'N/A'}</span>
                      {edu.gradeOrPercentage && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-gray-700">{edu.gradeOrPercentage}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 text-gray-500 hover:text-rnw-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Edit education"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeEducation(idx);
                        showToast('Education removed', 'info');
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete education"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {educations.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <GraduationCap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-600">No education entries added yet</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Click "Add Qualification" above to list your diploma or degree.</p>
          </div>
        )}
      </div>
    </div>
  );
};
