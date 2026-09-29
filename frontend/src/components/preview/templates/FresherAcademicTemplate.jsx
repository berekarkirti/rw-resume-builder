import React from 'react';
import { GraduationCap, Award, FolderGit2, Sparkles, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { PdfSafeHeading, PdfSafeIconText } from '../PdfSafeHeading';

export const FresherAcademicTemplate = ({
  profile = {},
  educations = [],
  experiences = [],
  projects = [],
  skills = [],
  certifications = [],
  config = {},
}) => {
  const accentColor = config.accentColor || '#C8102E';

  return (
    <div className="w-full h-full bg-white p-7 text-gray-800 leading-normal flex flex-col justify-between font-sans">
      <div className="space-y-4">
        {/* Top Header Card */}
        <div className="border-b-2 pb-3.5 space-y-1" style={{ borderColor: accentColor }}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h1 className="text-2xl font-black tracking-normal text-gray-900 uppercase min-w-0 flex-1 break-words">
              {profile.fullName || 'Student Name'}
            </h1>
            <span
              className="text-[10px] uppercase font-bold px-2 py-1 rounded text-white shrink-0 whitespace-nowrap"
              style={{ backgroundColor: accentColor }}
            >
              Entry-Level Placement Candidate
            </span>
          </div>

          <p className="text-xs font-bold text-gray-700 tracking-wide">
            {profile.targetRole || 'Fresher Graduate'} &bull; <span className="font-normal text-gray-500">Enrolled at Red & White Multimedia Institute ({profile.branch || 'Surat'})</span>
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center text-[11px] text-gray-600 pt-1">
            {profile.email && <div className="mr-4 mb-1"><PdfSafeIconText icon={Mail} iconClassName="w-3 h-3 text-gray-400">{profile.email}</PdfSafeIconText></div>}
            {profile.mobileNumber && <div className="mr-4 mb-1"><PdfSafeIconText icon={Phone} iconClassName="w-3 h-3 text-gray-400">{profile.mobileNumber}</PdfSafeIconText></div>}
            {profile.city && <div className="mr-4 mb-1"><PdfSafeIconText icon={MapPin} iconClassName="w-3 h-3 text-gray-400">{profile.city}, {profile.state}</PdfSafeIconText></div>}
            {profile.githubUrl && <div className="mr-4 mb-1"><PdfSafeIconText icon={Globe} iconClassName="w-3 h-3 text-gray-400">{profile.githubUrl.replace('https://', '')}</PdfSafeIconText></div>}
          </div>
        </div>

        {/* Career Objective / Summary */}
        {profile.professionalSummary && (
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
              Career Objective & Profile
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed text-left break-words">
              {profile.professionalSummary}
            </p>
          </div>
        )}

        {/* 1. Education (Fresher Priority: Comes FIRST) */}
        {educations.length > 0 && (
          <div className="space-y-2">
            <PdfSafeHeading icon={GraduationCap} color={accentColor} thick>Academic Qualifications</PdfSafeHeading>

            <div className="space-y-2.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1 break-words">
                    <div className="font-bold text-gray-900">
                      {edu.qualification} {edu.specialization && `(${edu.specialization})`}
                    </div>
                    <div className="text-[11px] text-gray-600 font-medium">
                      {edu.institute} &bull; <span className="text-gray-500">{edu.boardOrUniversity}</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-gray-600 shrink-0">
                    <span className="font-semibold text-gray-800">
                      {edu.isPursuing ? 'Pursuing' : edu.endYear}
                    </span>
                    {edu.gradeOrPercentage && (
                      <div className="font-bold text-rnw-red">{edu.gradeOrPercentage}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Capstones & Projects (Fresher Core) */}
        {projects.length > 0 && (
          <div className="space-y-2">
            <PdfSafeHeading icon={FolderGit2} color={accentColor} thick>Capstone & Academic Projects</PdfSafeHeading>

            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 min-w-0 flex-1 break-words">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium shrink-0">
                      {proj.projectType}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-700 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1 text-[9px] font-medium text-gray-600">
                      <span className="font-semibold text-gray-700">Tech Stack:</span>
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Technical Skills & Tools */}
        {skills.length > 0 && (
          <div className="space-y-1.5">
            <PdfSafeHeading icon={Sparkles} color={accentColor} thick>Key Technical Proficiencies</PdfSafeHeading>

            <div className="flex flex-wrap pt-0.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-50 text-rnw-red border border-red-200 mr-1.5 mb-1.5"
                >
                  {s.name} ({s.proficiencyLevel})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4. Certifications & Achievements */}
        {certifications.length > 0 && (
          <div className="space-y-1.5">
            <PdfSafeHeading icon={Award} color={accentColor} thick>Certifications & Specialized Training</PdfSafeHeading>

            <div className="space-y-1">
              {certifications.map((c, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                  <div className="min-w-0 flex-1 break-words">
                    <span className="font-bold text-gray-900">{c.title}</span>
                    <span className="text-[11px] text-gray-600"> — {c.issuer}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">{c.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-[9px] text-gray-400">
        <span>RED & WHITE MULTIMEDIA INSTITUTE &bull; CAMPUS PLACEMENT DIVISION</span>
        <span>REG NO: {profile.studentId || 'RNW-STUDENT'}</span>
      </div>
    </div>
  );
};
