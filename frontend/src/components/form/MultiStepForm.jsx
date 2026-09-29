import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { BasicProfileStep } from './BasicProfileStep';
import { CareerProfileStep } from './CareerProfileStep';
import { EducationStep } from './EducationStep';
import { SkillsStep } from './SkillsStep';
import { ExperienceStep } from './ExperienceStep';
import { ProjectsStep } from './ProjectsStep';
import { CertificationsStep } from './CertificationsStep';
import { LanguagesStep } from './LanguagesStep';
import { TemplateCustomizeStep } from './TemplateCustomizeStep';

import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  FolderGit2,
  Award,
  Globe,
  Palette,
  ChevronLeft,
  ChevronRight,
  Save,
  FastForward,
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Profile & Contact', icon: User, short: 'Profile' },
  { id: 2, title: 'Career & Summary', icon: Briefcase, short: 'Career' },
  { id: 3, title: 'Education', icon: GraduationCap, short: 'Education' },
  { id: 4, title: 'Skills & Priority', icon: Sparkles, short: 'Skills' },
  { id: 5, title: 'Work Experience', icon: Layers, short: 'Experience' },
  { id: 6, title: 'Projects & Capstones', icon: FolderGit2, short: 'Projects' },
  { id: 7, title: 'Certifications', icon: Award, short: 'Certificates' },
  { id: 8, title: 'Languages & Soft Skills', icon: Globe, short: 'Languages' },
  { id: 9, title: 'Template & Theme', icon: Palette, short: 'Template' },
];

export const MultiStepForm = () => {
  const { currentStep, goToStep, nextStep, prevStep, showToast, saveStatus, setPreviewModalOpen, setMobileView } = useResume();

  const handleSaveDraft = () => {
    showToast('Draft progress auto-saved successfully!', 'success');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicProfileStep />;
      case 2:
        return <CareerProfileStep />;
      case 3:
        return <EducationStep />;
      case 4:
        return <SkillsStep />;
      case 5:
        return <ExperienceStep />;
      case 6:
        return <ProjectsStep />;
      case 7:
        return <CertificationsStep />;
      case 8:
        return <LanguagesStep />;
      case 9:
        return <TemplateCustomizeStep />;
      default:
        return <BasicProfileStep />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Stepper Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rnw-red text-white shadow-sm ring-2 ring-rnw-red/20'
                    : isCompleted
                    ? 'bg-red-50 text-rnw-red hover:bg-red-100'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-rnw-red'
                      : isCompleted
                      ? 'bg-rnw-red text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <span>{step.short}</span>
              </button>
            );
          })}
        </div>

        {/* Step Progress Line */}
        <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-rnw-red h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 9) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {renderStepContent()}
        </div>
      </div>

      {/* Bottom Sticky Action Controls */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0 flex items-center justify-between gap-3">
        <div>
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          {/* Skip Button */}
          {currentStep < 9 && (
            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              <span>Skip</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Next / Finish Button */}
          {currentStep < 9 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rnw-red hover:bg-rnw-red-dark rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileView('preview');
                setPreviewModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>Finalize & Preview</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
