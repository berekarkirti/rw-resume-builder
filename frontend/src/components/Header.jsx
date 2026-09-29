import React from 'react';
import { useResume } from '../context/ResumeContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle,
} from 'lucide-react';

export const Header = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    resumeConfig,
    completionPercentage,
    saveStatus,
    lastSavedTime,
    submitToPlacement,
  } = useResume();

  // Status badge styling
  const getStatusBadge = () => {
    const s = resumeConfig.status || 'Draft';
    switch (s) {
      case 'Approved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Approved for Placements',
        };
      case 'Under Review':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'Under Placement Review',
        };
      case 'Needs Changes':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Changes Requested',
        };
      case 'Submitted':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500',
          label: 'Submitted for Review',
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          dot: 'bg-gray-400',
          label: 'Draft in Progress',
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1920px] mx-auto w-full px-3 sm:px-4 lg:px-6 min-h-16 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="flex items-center gap-2.5">
            {/* Red & White Custom Logo Shield */}
            <div className="w-10 h-10 rounded-lg bg-rnw-red flex items-center justify-center text-white font-black text-lg shadow-md tracking-tighter border-2 border-white ring-2 ring-rnw-red/20">
              RW
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-rnw-red">RED & WHITE</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-bold uppercase bg-gray-900 text-white tracking-wider">
                  Portal
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide -mt-0.5">
                Multimedia Education &bull; Placement Cell
              </p>
            </div>
          </div>

          <div className="hidden xl:block h-6 w-[1px] bg-gray-200 ml-2" />

          {/* Student ID & Branch Tag */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 text-gray-600">
            <span className="font-semibold text-gray-800">{profile.studentId || 'RNW-STUDENT'}</span>
            <span>&bull;</span>
            <span className="truncate max-w-[140px]">{profile.branch || 'Surat'}</span>
          </div>
        </div>

        {/* Center: Portal Mode Toggle (Student Workspace vs Admin Dashboard) */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200/80">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'workspace'
                ? 'bg-white text-rnw-red shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Builder</span>
          </button>
          
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-rnw-red shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Placement Admin</span>
            <span className="w-2 h-2 rounded-full bg-rnw-red animate-pulse" />
          </button>
        </div>

        {/* Right: Status, Auto-Save, and Actions */}
        <div className="flex items-center gap-2.5">
          {/* Submission Status Pill */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.bg}`}>
            <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
            <span>{statusInfo.label}</span>
          </div>

          {/* Completion Progress Gauge */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 font-bold uppercase leading-none">Profile</div>
              <div className="text-xs font-bold text-gray-800 leading-tight">{completionPercentage}%</div>
            </div>
            <div className="w-12 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completionPercentage >= 80 ? 'bg-emerald-500' : completionPercentage >= 50 ? 'bg-amber-500' : 'bg-rnw-red'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Auto-save Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500">
            {saveStatus === 'saving' ? (
              <>
                <div className="w-2.5 h-2.5 rounded-full border-2 border-rnw-red border-t-transparent animate-spin" />
                <span className="text-rnw-red font-medium">Saving...</span>
              </>
            ) : saveStatus === 'error' ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-red-500 font-medium">Offline</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-gray-500">{lastSavedTime}</span>
              </>
            )}
          </div>

          {/* Submit for Placement Review Button */}
          {activeTab === 'workspace' && (
            <button
              onClick={submitToPlacement}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Review</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
