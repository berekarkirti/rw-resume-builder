import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Plus, Trash2, Edit3, Check, Globe, Tag, X } from 'lucide-react';
import { GithubIcon } from '../Icons';

export const ProjectsStep = () => {
  const { projects, addProject, updateProject, removeProject, showToast } = useResume();
  const [editingIndex, setEditingIndex] = useState(null);
  const [techInput, setTechInput] = useState('');

  const handleAddNew = () => {
    addProject({
      title: 'Full Stack MERN Web Application',
      projectType: 'Academic Capstone',
      role: 'Lead Developer',
      description: 'End-to-end full stack application built during Red & White coursework featuring real-time state management, secure authentication, and responsive Tailwind UI.',
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB'],
      liveDemoUrl: '',
      githubUrl: '',
    });
    setEditingIndex(projects.length);
    showToast('New project entry added', 'info');
  };

  const handleAddTech = (projIndex) => {
    if (!techInput.trim()) return;
    const current = projects[projIndex];
    const tech = techInput.trim();
    if (!current.technologies?.includes(tech)) {
      updateProject(projIndex, {
        technologies: [...(current.technologies || []), tech],
      });
    }
    setTechInput('');
  };

  const handleRemoveTech = (projIndex, techToRemove) => {
    const current = projects[projIndex];
    updateProject(projIndex, {
      technologies: (current.technologies || []).filter((t) => t !== techToRemove),
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Projects & Capstones</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
              Step 6 of 9
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Crucial for Freshers! Showcase your institute capstone, live deployments, and GitHub codebases.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => {
          const isEditing = editingIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isEditing
                  ? 'border-rnw-red ring-1 ring-rnw-red/20 bg-white p-4 shadow-sm'
                  : 'border-gray-200 bg-gray-50/60 p-4 hover:border-gray-300'
              }`}
            >
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-rnw-red uppercase tracking-wider">
                      Edit Project #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={proj.title || ''}
                        onChange={(e) => updateProject(idx, { title: e.target.value })}
                        placeholder="e.g. SmartCampus - Institute Management System"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Project Type
                      </label>
                      <select
                        value={proj.projectType || 'Academic Capstone'}
                        onChange={(e) => updateProject(idx, { projectType: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
                      >
                        <option value="Academic Capstone">Academic Capstone (Red & White)</option>
                        <option value="Client Project">Client Project</option>
                        <option value="Personal Project">Personal Project</option>
                        <option value="Hackathon / Competition">Hackathon / Competition</option>
                        <option value="Open Source">Open Source Contribution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={proj.role || ''}
                        onChange={(e) => updateProject(idx, { role: e.target.value })}
                        placeholder="e.g. Lead Full Stack Developer"
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Live Demo URL
                      </label>
                      <div className="relative">
                        <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                        <input
                          type="url"
                          value={proj.liveDemoUrl || ''}
                          onChange={(e) => updateProject(idx, { liveDemoUrl: e.target.value })}
                          placeholder="https://myproject.vercel.app"
                          className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        GitHub Repository URL
                      </label>
                      <div className="relative">
                        <GithubIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                        <input
                          type="url"
                          value={proj.githubUrl || ''}
                          onChange={(e) => updateProject(idx, { githubUrl: e.target.value })}
                          placeholder="https://github.com/username/project-repo"
                          className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Project Description
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description || ''}
                        onChange={(e) => updateProject(idx, { description: e.target.value })}
                        placeholder="Describe the problem solved, core features, architecture decisions, and business impact..."
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                      />
                    </div>

                    {/* Technologies Tags Input */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="block text-[11px] font-semibold text-gray-700">
                        Technologies Used (Tags)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTech(idx);
                            }
                          }}
                          placeholder="Type tech (e.g. Next.js, Redux, Docker) and press Enter"
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech(idx)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg"
                        >
                          Add Tag
                        </button>
                      </div>

                      {/* Render Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(proj.technologies || []).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-rnw-red border border-red-200"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(idx, tech)}
                              className="text-red-400 hover:text-rnw-red"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Card Summary View */
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <FolderGit2 className="w-4 h-4 text-rnw-red shrink-0" />
                      <h4 className="text-xs font-bold text-gray-900">
                        {proj.title || 'Untitled Project'}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">
                        {proj.projectType}
                      </span>
                      {proj.role && (
                        <span className="text-[10px] text-gray-500">({proj.role})</span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {proj.description || 'No description provided.'}
                    </p>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {(proj.technologies || []).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-1 text-[11px]">
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-rnw-red hover:underline flex items-center gap-1 font-medium"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-700 hover:underline flex items-center gap-1 font-medium"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(idx)}
                      className="p-1.5 text-gray-500 hover:text-rnw-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Edit project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeProject(idx);
                        showToast('Project removed', 'info');
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <FolderGit2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-gray-600">No projects added yet</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Click "Add Project" to showcase your Red & White capstone work.</p>
          </div>
        )}
      </div>
    </div>
  );
};
