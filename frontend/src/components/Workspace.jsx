import React from 'react';
import { useResume } from '../context/ResumeContext';
import { MultiStepForm } from './form/MultiStepForm';
import { ResumePreview } from './preview/ResumePreview';
import { PreviewModal } from './preview/PreviewModal';
import { FileText, Eye } from 'lucide-react';

export const Workspace = () => {
  const { mobileView, setMobileView, resumeConfig } = useResume();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-100/70">
      {/* Mobile/Tablet Switcher Tab */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-white border-b border-gray-200">
        <div className="flex items-center bg-gray-100 p-1 rounded-xl max-w-xs w-full">
          <button
            onClick={() => setMobileView('form')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'form' ? 'bg-white text-rnw-red shadow-sm' : 'text-gray-600'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edit Form</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'preview' ? 'bg-white text-rnw-red shadow-sm' : 'text-gray-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live A4 Preview</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Main Container */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Panel: Multi-Step Form (50% Desktop width) */}
        <div
          className={`w-full lg:w-1/2 h-full overflow-y-auto bg-white border-r border-gray-200 flex flex-col ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <MultiStepForm />
        </div>

        {/* Right Panel: Real-time Dynamic A4 Resume Live Preview (50% Desktop width) */}
        <div
          className={`w-full lg:w-1/2 h-full overflow-y-auto bg-slate-900/5 lg:bg-gray-200/80 flex flex-col ${
            mobileView === 'form' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <ResumePreview />
        </div>

      </div>

      <PreviewModal />
    </div>
  );
};
