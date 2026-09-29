import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Award, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Icons';
import { PdfSafeHeading, PdfSafeIconText } from '../PdfSafeHeading';

export const CreativeRnwTemplate = ({
  profile = {},
  educations = [],
  experiences = [],
  projects = [],
  skills = [],
  certifications = [],
  config = {},
}) => {
  const accentColor = config.accentColor || '#C8102E'; // Red & White Primary Red
  const isCompact = config.spacingDensity === 'compact';

  return (
    <div className="w-full h-full bg-white flex flex-col text-gray-800 leading-normal">
      {/* Top Header Banner with Red & White Brand Stripe */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: accentColor }}
      >
        {/* Subtle decorative geometric overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-32 h-32 bg-black/10 rounded-full pointer-events-none" />

        <div className="flex items-center relative z-10">
          {/* Profile Photo (if available) */}
          {profile.profilePhoto && (
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-white mr-5">
              <img
                src={profile.profilePhoto}
                alt={profile.fullName}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${profile.photoPositionX ?? 50}% ${profile.photoPositionY ?? 50}%`,
                }}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center">
              <h1 className="text-2xl font-black tracking-normal text-white uppercase mr-2">
                {profile.fullName || 'Student Name'}
              </h1>
              <span className="text-[9px] uppercase font-extrabold bg-white text-rnw-red px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                Verified Student
              </span>
            </div>

            <p className="text-sm font-semibold text-white/90 tracking-wide mt-0.5">
              {profile.targetRole || 'Professional Role'}
            </p>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center text-[11px] text-white/85 mt-2.5">
              {profile.email && (
                <div className="mr-4 mb-1">
                  <PdfSafeIconText icon={Mail}>{profile.email}</PdfSafeIconText>
                </div>
              )}
              {profile.mobileNumber && (
                <div className="mr-4 mb-1">
                  <PdfSafeIconText icon={Phone}>{profile.mobileNumber}</PdfSafeIconText>
                </div>
              )}
              {profile.city && (
                <div className="mr-4 mb-1">
                  <PdfSafeIconText icon={MapPin}>{profile.city}, {profile.state || 'India'}</PdfSafeIconText>
                </div>
              )}
            </div>
          </div>

          {/* Red & White Institutional Stamp */}
          <div className="hidden sm:flex flex-col items-end text-right border-l border-white/20 pl-4 shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Institute</span>
            <span className="text-xs font-black text-white">RED & WHITE</span>
            <span className="text-[9px] text-white/70">{profile.branch?.split('-')[0] || 'Surat'} Campus</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Body */}
      <div className={`p-6 flex flex-1 ${isCompact ? 'space-y-0' : ''}`}>
        
        {/* Left Column (Main details - 7 cols) */}
        <div className="w-[58%] pr-6 space-y-5">
          
          {/* Professional Summary */}
          {profile.professionalSummary && (
            <div>
              <PdfSafeHeading color={accentColor} thick>Professional Profile</PdfSafeHeading>
              <p className="text-xs text-gray-700 leading-relaxed text-justify">
                {profile.professionalSummary}
              </p>
            </div>
          )}

          {/* Projects / Capstones */}
          {projects.length > 0 && (
            <div>
              <PdfSafeHeading icon={FolderGit2} color={accentColor} thick>Featured Projects & Capstones</PdfSafeHeading>

              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-bold text-gray-900">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {proj.projectType}
                      </span>
                    </div>

                    {proj.role && (
                      <p className="text-[10px] font-semibold text-gray-600">
                        Role: {proj.role}
                      </p>
                    )}

                    <p className="text-[11px] text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech tags */}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap pt-0.5">
                        {proj.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200 mr-1 mb-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <PdfSafeHeading icon={Briefcase} color={accentColor} thick>Experience & Internships</PdfSafeHeading>

              <div className="space-y-3">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-bold text-gray-900">
                        {exp.designation} &bull; <span className="font-semibold text-gray-700">{exp.companyName}</span>
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {exp.startDate} - {exp.isCurrentlyWorking ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}

                    {exp.achievements && (
                      <p className="text-[10px] italic text-gray-600 pt-0.5">
                        Key Result: {exp.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar - 5 cols) */}
        <div className="w-[42%] space-y-5 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
          
          {/* Technical Skills */}
          {skills.length > 0 && (
            <div>
              <PdfSafeHeading icon={Sparkles} color={accentColor}>Core Skills</PdfSafeHeading>

              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-gray-800">{skill.name}</span>
                      <span className="text-[9px] text-gray-500">{skill.proficiencyLevel}</span>
                    </div>
                    {/* Proficiency Bar */}
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: accentColor,
                          width:
                            skill.proficiencyLevel === 'Expert'
                              ? '100%'
                              : skill.proficiencyLevel === 'Advanced'
                              ? '80%'
                              : skill.proficiencyLevel === 'Intermediate'
                              ? '60%'
                              : '40%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div>
              <PdfSafeHeading icon={GraduationCap} color={accentColor}>Education</PdfSafeHeading>

              <div className="space-y-2.5">
                {educations.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h5 className="text-[11px] font-bold text-gray-900 leading-tight">
                      {edu.qualification}
                    </h5>
                    <p className="text-[10px] text-gray-600">{edu.institute}</p>
                    <div className="flex items-center justify-between text-[9px] text-gray-500 font-medium">
                      <span>{edu.startYear} - {edu.isPursuing ? 'Present' : edu.endYear}</span>
                      {edu.gradeOrPercentage && (
                        <span className="font-bold text-gray-700">{edu.gradeOrPercentage}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <PdfSafeHeading icon={Award} color={accentColor}>Certifications</PdfSafeHeading>

              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <h5 className="text-[11px] font-bold text-gray-900 leading-tight">
                      {cert.title}
                    </h5>
                    <p className="text-[10px] text-gray-600">
                      {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Web Portfolios & Socials */}
          {(profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl || profile.behanceUrl) && (
            <div>
              <PdfSafeHeading icon={Globe} color={accentColor}>Profiles & Portfolios</PdfSafeHeading>

              <div className="space-y-1 text-[10px] text-gray-600">
                {profile.linkedinUrl && (
                  <div className="flex items-center gap-1 truncate">
                    <LinkedinIcon className="w-3 h-3 text-blue-600 shrink-0" />
                    <span className="truncate">{profile.linkedinUrl.replace('https://', '')}</span>
                  </div>
                )}
                {profile.githubUrl && (
                  <div className="flex items-center gap-1 truncate">
                    <GithubIcon className="w-3 h-3 text-gray-800 shrink-0" />
                    <span className="truncate">{profile.githubUrl.replace('https://', '')}</span>
                  </div>
                )}
                {profile.portfolioUrl && (
                  <div className="flex items-center gap-1 truncate">
                    <Globe className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{profile.portfolioUrl.replace('https://', '')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Languages & Soft Skills */}
          {profile.languages && profile.languages.length > 0 && (
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-700 block mb-1">
                Languages:
              </span>
              <p className="text-[10px] text-gray-600">
                {profile.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Red & White Official Placement Cell Footer */}
      <div className="mt-auto border-t border-gray-200 px-6 py-2 bg-gray-50 flex items-center justify-between text-[9px] text-gray-500">
        <span>Red & White Multimedia Education &bull; Placement Department Certified</span>
        <span className="font-mono">{profile.studentId || 'RNW-STUDENT'}</span>
      </div>
    </div>
  );
};
