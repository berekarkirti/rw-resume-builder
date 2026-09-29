import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, Trash2, Edit3, Check, ExternalLink, Calendar } from 'lucide-react';

export const CertificationsStep = () => {
  const { certifications, addCertification, updateCertification, removeCertification, showToast } = useResume();
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNew = () => {
    addCertification({
      title: 'Master in Full Stack Web Development (MERN)',
      issuer: 'Red & White Multimedia Education',
      issueDate: 'Feb 2026',
      credentialUrl: '',
      description: 'Accredited skill education certification verifying comprehensive training in frontend, backend, and database architecture.',
    });
    setEditingIndex(certifications.length);
    showToast('New certification added', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Certifications & Verified Badges</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
              Step 7 of 9
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Highlight your official Red & White course certifications, hackathon awards, and verified technical credentials.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.map((cert, idx) => {
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
                      Edit Certificate #{idx + 1}
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
                        Certificate Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cert.title || ''}
                        onChange={(e) => updateCertification(idx, { title: e.target.value })}
                        placeholder="e.g. Master in Web Development"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Issuing Organization <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cert.issuer || ''}
                        onChange={(e) => updateCertification(idx, { issuer: e.target.value })}
                        placeholder="e.g. Red & White Skill Education"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Issue Date
                      </label>
                      <input
                        type="text"
                        value={cert.issueDate || ''}
                        onChange={(e) => updateCertification(idx, { issueDate: e.target.value })}
                        placeholder="e.g. Feb 2026"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Verification / Credential URL
                      </label>
                      <input
                        type="url"
                        value={cert.credentialUrl || ''}
                        onChange={(e) => updateCertification(idx, { credentialUrl: e.target.value })}
                        placeholder="https://verify.rnwmultimedia.com/cert/..."
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Description / Key Topics
                      </label>
                      <textarea
                        rows={2}
                        value={cert.description || ''}
                        onChange={(e) => updateCertification(idx, { description: e.target.value })}
                        placeholder="Rigorous 12-month program covering React, Node.js, Express, MongoDB, UI/UX implementation..."
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
                      <Award className="w-4 h-4 text-rnw-red shrink-0" />
                      <h4 className="text-xs font-bold text-gray-900">
                        {cert.title || 'Certification Title'}
                      </h4>
                    </div>

                    <p className="text-[11px] text-gray-700 font-medium">
                      {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                    </p>

                    {cert.description && (
                      <p className="text-[10px] text-gray-500 line-clamp-1">
                        {cert.description}
                      </p>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-rnw-red hover:underline inline-flex items-center gap-1 font-medium pt-0.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 text-gray-500 hover:text-rnw-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Edit certification"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeCertification(idx);
                        showToast('Certification removed', 'info');
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {certifications.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-600">No certifications listed yet</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Click "Add Certification" to feature your Red & White diploma or certifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};
