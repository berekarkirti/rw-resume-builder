import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const ModernMinimalTemplate = ({
  profile = {},
  educations = [],
  experiences = [],
  projects = [],
  skills = [],
  certifications = [],
  config = {},
}) => {
  const accentColor = config.accentColor || '#1E293B';

  return (
    <div className="w-full h-full bg-white p-7 text-gray-800 leading-normal flex flex-col justify-between">
      <div className="space-y-5">
        {/* Top Header Section */}
        <div className="flex items-start justify-between gap-4 border-b pb-4" style={{ borderColor: accentColor }}>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold tracking-normal text-gray-900 break-words pr-3">
              {profile.fullName || 'Student Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: accentColor }}>
              {profile.targetRole || 'Professional Role'}
            </p>
            {profile.branch && (
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                Red & White Multimedia Institute &bull; {profile.branch}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="text-right text-[11px] text-gray-600 space-y-0.5 shrink-0 max-w-[42%]">
            {profile.email && <div>{profile.email}</div>}
            {profile.mobileNumber && <div>{profile.mobileNumber}</div>}
            {profile.city && <div>{profile.city}, {profile.state}</div>}
            <div className="flex items-center justify-end gap-2 pt-1 text-[10px] text-gray-500">
              {profile.linkedinUrl && <span>LinkedIn</span>}
              {profile.githubUrl && <span>&bull; GitHub</span>}
              {profile.portfolioUrl && <span>&bull; Portfolio</span>}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {profile.professionalSummary && (
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              About
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed text-left break-words">
              {profile.professionalSummary}
            </p>
          </div>
        )}

        {/* Skills Tag Pills */}
        {skills.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {s.name} <span className="text-[9px] text-gray-400 font-normal">({s.proficiencyLevel})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Experience
            </h3>
            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 min-w-0 flex-1 break-words">
                      {exp.designation} &bull; <span className="font-semibold text-gray-600">{exp.companyName}</span>
                    </h4>
                    <span className="text-[10px] text-gray-500 shrink-0">
                      {exp.startDate} – {exp.isCurrentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5 pt-0.5">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/50 space-y-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 min-w-0 flex-1 break-words">{proj.title}</h4>
                    <span className="text-[9px] text-gray-500 shrink-0">{proj.projectType}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.technologies && (
                    <p className="text-[10px] text-gray-500 font-mono">
                      {proj.technologies.slice(0, 4).join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Education */}
          {educations.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Education
              </h3>
              <div className="space-y-2">
                {educations.map((edu, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <div className="font-bold text-gray-900">{edu.qualification}</div>
                    <div className="text-[11px] text-gray-600">{edu.institute}</div>
                    <div className="text-[10px] text-gray-500">
                      {edu.startYear} - {edu.isPursuing ? 'Present' : edu.endYear} {edu.gradeOrPercentage && `(${edu.gradeOrPercentage})`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <div className="font-bold text-gray-900">{c.title}</div>
                    <div className="text-[11px] text-gray-600">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400">
        <span>Red & White Skill Education Portfolio</span>
        <span>ID: {profile.studentId || 'RNW-STUDENT'}</span>
      </div>
    </div>
  );
};
