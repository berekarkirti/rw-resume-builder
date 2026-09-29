import React from 'react';

export const ClassicAtsTemplate = ({
  profile = {},
  educations = [],
  experiences = [],
  projects = [],
  skills = [],
  certifications = [],
  config = {},
}) => {
  const accentColor = config.accentColor || '#1F2937';

  return (
    <div className="w-full h-full bg-white p-8 text-gray-900 leading-normal flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header Section (Centered ATS Classic) */}
        <div className="text-center border-b border-gray-400 pb-3 space-y-1">
          <h1 className="text-2xl font-bold tracking-normal uppercase text-gray-900 break-words">
            {profile.fullName || 'Full Name'}
          </h1>
          <p className="text-xs font-semibold text-gray-700 tracking-wide">
            {profile.targetRole || 'Software Professional'}
          </p>

          {/* Contact Line */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-600">
            {profile.mobileNumber && <span>{profile.mobileNumber}</span>}
            {profile.email && <span>• {profile.email}</span>}
            {profile.city && <span>• {profile.city}, {profile.state}</span>}
            {profile.linkedinUrl && (
              <span>• {profile.linkedinUrl.replace(/^https?:\/\//, '')}</span>
            )}
            {profile.githubUrl && (
              <span>• {profile.githubUrl.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {profile.professionalSummary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-800 leading-relaxed text-left break-words">
              {profile.professionalSummary}
            </p>
          </div>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
              Technical & Core Competencies
            </h2>
            <div className="text-xs text-gray-800 leading-relaxed">
              <span className="font-semibold">Core Technologies: </span>
              {skills.map((s) => `${s.name} (${s.proficiencyLevel})`).join(' • ')}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <span className="text-xs font-bold text-gray-900 min-w-0 flex-1 break-words">
                      {exp.designation} — <span className="font-semibold">{exp.companyName}</span>
                    </span>
                    <span className="text-[11px] text-gray-600 shrink-0">
                      {exp.startDate} - {exp.isCurrentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{exp.location} | {exp.employmentType}</p>

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pt-0.5">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                  {exp.achievements && (
                    <p className="text-xs text-gray-700 italic pt-0.5">
                      Key Achievement: {exp.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2">
              Key Technical Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <span className="text-xs font-bold text-gray-900 min-w-0 flex-1 break-words">
                      {proj.title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium shrink-0">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] text-gray-600">
                      <span className="font-semibold">Technologies:</span> {proj.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
              Education & Academic Background
            </h2>
            <div className="space-y-1.5">
              {educations.map((edu, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1 break-words">
                    <span className="font-bold text-gray-900">{edu.qualification}</span>
                    {edu.specialization && <span> in {edu.specialization}</span>}
                    <div className="text-[11px] text-gray-600">{edu.institute}</div>
                  </div>
                  <div className="text-right text-[11px] text-gray-600 shrink-0">
                    <div>{edu.startYear} - {edu.isPursuing ? 'Present' : edu.endYear}</div>
                    {edu.gradeOrPercentage && <div className="font-semibold text-gray-800">{edu.gradeOrPercentage}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
              Certifications & Honors
            </h2>
            <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5">
              {certifications.map((c, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{c.title}</span> — {c.issuer} ({c.issueDate || 'Verified'})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="text-center text-[9px] text-gray-400 pt-4 border-t border-gray-200">
        Candidate ID: {profile.studentId || 'RNW-STUDENT'} &bull; Red & White Skill Education
      </div>
    </div>
  );
};
