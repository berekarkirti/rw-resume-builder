import React, { useRef, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { exportLivePreviewPdf } from '../../utils/exportLivePreview';
import { renderResumeTemplate, getResumeFontFamily } from './renderResumeTemplate';

import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  MessageSquare,
} from 'lucide-react';

export const ResumePreview = () => {
  const {
    profile,
    educations,
    experiences,
    projects,
    skills,
    certifications,
    resumeConfig,
    zoomLevel,
    setZoomLevel,
    showToast,
    setPreviewModalOpen,
  } = useResume();

  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleFitWidth = () => setZoomLevel(100);

  const handlePdfDownload = async () => {
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

  return (
    <div className="flex flex-col h-full bg-slate-100/90 select-none">
      <div className="bg-white/95 backdrop-blur-xs border-b border-gray-200 px-4 py-2.5 flex items-center justify-between gap-3 shrink-0 z-10 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-red-50 text-rnw-red px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rnw-red animate-pulse" />
            <span>Live A4 Preview</span>
          </div>
          <span className="hidden sm:inline text-xs text-gray-400 font-medium">|</span>
          <span className="hidden sm:inline text-xs text-gray-500 capitalize">
            {resumeConfig.templateId?.replace('-', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-white text-gray-600 hover:text-gray-900 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-gray-700 min-w-[42px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-white text-gray-600 hover:text-gray-900 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(100);
                setPreviewModalOpen(true);
              }}
              className="p-1 hover:bg-white text-gray-600 hover:text-gray-900 rounded transition-colors border-l border-gray-200 ml-0.5"
              title="Open full preview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handlePdfDownload}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isExporting ? 'Saving...' : 'Save as'}</span>
          </button>
        </div>
      </div>

      {resumeConfig.adminNotes && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2.5 text-xs text-amber-900 shrink-0">
          <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Placement Cell Feedback: </span>
            <span className="italic">"{resumeConfig.adminNotes}"</span>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 lg:p-8 flex justify-center items-start scrollbar-thin"
      >
        <div
          className="transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <div
            id="resume-a4-preview"
            className={`a4-sheet shadow-a4 hover:shadow-a4-hover transition-shadow text-rnw-charcoal relative ${getResumeFontFamily(resumeConfig.fontFamily)}`}
            style={{
              fontFamily: resumeConfig.fontFamily ? `'${resumeConfig.fontFamily}', sans-serif` : 'inherit',
            }}
          >
            <div className="absolute top-[297mm] left-0 right-0 border-b border-dashed border-red-300 pointer-events-none no-print">
              <span className="absolute right-2 -top-4 text-[9px] font-mono text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                A4 Page 1 End Marker
              </span>
            </div>

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
        </div>
      </div>
    </div>
  );
};
