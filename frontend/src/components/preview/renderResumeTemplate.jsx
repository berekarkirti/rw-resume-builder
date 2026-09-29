import React from 'react';
import { CreativeRnwTemplate } from './templates/CreativeRnwTemplate';
import { ClassicAtsTemplate } from './templates/ClassicAtsTemplate';
import { ModernMinimalTemplate } from './templates/ModernMinimalTemplate';
import { DeveloperTechTemplate } from './templates/DeveloperTechTemplate';
import { FresherAcademicTemplate } from './templates/FresherAcademicTemplate';

export const renderResumeTemplate = ({
  profile,
  educations,
  experiences,
  projects,
  skills,
  certifications,
  resumeConfig,
}) => {
  const props = {
    profile,
    educations,
    experiences,
    projects,
    skills,
    certifications,
    config: resumeConfig,
  };

  switch (resumeConfig?.templateId) {
    case 'classic-ats':
      return <ClassicAtsTemplate {...props} />;
    case 'modern-minimal':
      return <ModernMinimalTemplate {...props} />;
    case 'developer-tech':
      return <DeveloperTechTemplate {...props} />;
    case 'fresher-academic':
      return <FresherAcademicTemplate {...props} />;
    case 'creative-rnw':
    default:
      return <CreativeRnwTemplate {...props} />;
  }
};

export const getResumeFontFamily = (fontFamily) => {
  switch (fontFamily) {
    case 'Poppins':
    case 'Outfit':
      return 'font-display';
    case 'JetBrains Mono':
      return 'font-mono';
    default:
      return 'font-sans';
  }
};
