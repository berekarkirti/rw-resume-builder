import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { exportLivePreviewPdf, LIVE_PREVIEW_SHEET_ID } from '../../utils/exportLivePreview';
import { renderResumeTemplate, getResumeFontFamily } from './renderResumeTemplate';
import { Download, X } from 'lucide-react';

export const PreviewModal = () => {
  const {
    isPreviewModalOpen,
    setPreviewModalOpen,
    profile,
    educations,
    experiences,
    projects,
    skills,
    certifications,
    resumeConfig,
    showToast,
  } = useResume();

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportLivePreviewPdf(profile.fullName || 'Student', showToast);
    } catch (err) {
      console.error(err);
      showToast('Could not export the live preview. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const sheet = (
    <div
      id={LIVE_PREVIEW_SHEET_ID}
      className={`a4-sheet shadow-a4 text-rnw-charcoal ${getResumeFontFamily(resumeConfig.fontFamily)}`}
      style={{
        fontFamily: resumeConfig.fontFamily ? `'${resumeConfig.fontFamily}', sans-serif` : 'inherit',
      }}
    >
      {renderResumeTemplate({
        profile,
        educations,
        experiences,
        projects,
        skills,
        certifications,
        resumeConfig,
      })}
    </div>
  );

  if (!isPreviewModalOpen) {
    return (
      <div aria-hidden className="fixed left-[-10000px] top-0 pointer-events-none">
        {sheet}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex flex-col">
      <div className="shrink-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-semibold">Live Resume Preview</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Saving...' : 'Save as'}</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewModalOpen(false)}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2 sm:p-4 lg:p-6 flex justify-center items-start">
        {sheet}
      </div>
    </div>
  );
};
