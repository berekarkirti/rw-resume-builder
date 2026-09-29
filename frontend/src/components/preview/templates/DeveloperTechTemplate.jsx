import React from 'react';
import { Terminal, Globe, Code2, Database, Server, Cpu, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../Icons';

export const DeveloperTechTemplate = ({
  profile = {},
  educations = [],
  experiences = [],
  projects = [],
  skills = [],
  certifications = [],
  config = {},
}) => {
  const accentColor = config.accentColor || '#047857'; // Deep emerald or custom

  return (
    <div className="w-full h-full bg-white p-7 text-gray-800 leading-normal flex flex-col justify-between font-sans">
      <div className="space-y-4">
        {/* Terminal Header */}
        <div className="border border-gray-800 bg-gray-950 text-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-[10px] text-gray-400 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-gray-300">~/rnw/developer/{profile.studentId || 'profile'}.sh</span>
            </div>
            <span>Red & White Skill Education</span>
          </div>

          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-xl font-bold font-mono tracking-normal text-white flex flex-wrap items-center gap-2">
                <span className="text-emerald-400 shrink-0">$ whoami:</span>
                <span className="break-words">{profile.fullName || 'Developer'}</span>
              </h1>
              <p className="text-xs font-mono text-emerald-400 mt-0.5">
                &gt; {profile.targetRole || 'Full Stack Engineer'}
              </p>
            </div>

            <div className="text-right text-[11px] font-mono text-gray-300 space-y-0.5">
              <div>{profile.email}</div>
              <div>{profile.mobileNumber} &bull; {profile.city}</div>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-2.5 pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400">
            {profile.githubUrl && (
              <span className="text-white flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-emerald-400" />
                <span>{profile.githubUrl.replace('https://', '')}</span>
              </span>
            )}
            {profile.linkedinUrl && (
              <span className="text-white flex items-center gap-1">
                <span>in: {profile.linkedinUrl.replace('https://linkedin.com/in/', '')}</span>
              </span>
            )}
            {profile.portfolioUrl && (
              <span className="text-emerald-300 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{profile.portfolioUrl.replace('https://', '')}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        {skills.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/70 space-y-1.5">
            <h3 className="text-xs font-bold font-mono uppercase text-gray-900 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>Technology Stack & Tools</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white text-gray-800 border border-gray-300 shadow-2xs"
                >
                  <span className="text-emerald-600 font-bold">#</span> {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects / Repositories */}
        {projects.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>Open Source & Capstone Projects</span>
            </h3>

            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-gray-200 space-y-1 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 font-mono min-w-0 flex-1 break-words">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-500 shrink-0">
                      [{proj.role || 'Developer'}]
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-700 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {(proj.technologies || []).map((t, i) => (
                        <span key={i} className="text-[9px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono">
                      {proj.githubUrl && (
                        <span className="text-gray-800 hover:underline flex items-center gap-0.5">
                          <GithubIcon className="w-3 h-3" />
                          <span>repo</span>
                        </span>
                      )}
                      {proj.liveDemoUrl && (
                        <span className="text-emerald-700 hover:underline flex items-center gap-0.5 font-bold">
                          <ExternalLink className="w-3 h-3" />
                          <span>demo</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-1">
              Engineering Work Experience
            </h3>

            <div className="space-y-2.5">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-0.5 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-0.5 font-mono">
                    <span className="font-bold text-gray-900 min-w-0 flex-1 break-words">
                      {exp.designation} @ {exp.companyName}
                    </span>
                    <span className="text-[10px] text-gray-500 shrink-0">
                      {exp.startDate} – {exp.isCurrentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.responsibilities && (
                    <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5 pt-0.5">
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

        {/* Education & Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {educations.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold font-mono uppercase text-gray-800 border-b border-gray-200 pb-0.5">
                Education
              </h4>
              {educations.map((edu, idx) => (
                <div key={idx} className="text-[11px] space-y-0.5">
                  <div className="font-semibold text-gray-900 break-words">{edu.qualification}</div>
                  <div className="text-[10px] text-gray-600">{edu.institute} ({edu.startYear}-{edu.endYear})</div>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold font-mono uppercase text-gray-800 border-b border-gray-200 pb-0.5">
                Accreditations
              </h4>
              {certifications.map((c, idx) => (
                <div key={idx} className="text-[11px] space-y-0.5">
                  <div className="font-semibold text-gray-900 break-words">{c.title}</div>
                  <div className="text-[10px] text-gray-600">{c.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-[9px] font-mono text-gray-400">
        <span>RED & WHITE MULTIMEDIA INSTITUTE &bull; VERIFIED REPO CANDIDATE</span>
        <span>ID: {profile.studentId || 'RNW-DEV'}</span>
      </div>
    </div>
  );
};
