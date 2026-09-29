import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { SKILL_CATEGORIES, POPULAR_SKILL_SUGGESTIONS } from '../../data/initialData';
import { Sparkles, Plus, Trash2, ArrowUp, ArrowDown, Tag, Check } from 'lucide-react';

export const SkillsStep = () => {
  const { skills, addSkill, updateSkill, removeSkill, reorderSkill, showToast } = useResume();
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0]);
  const [selectedLevel, setSelectedLevel] = useState('Advanced');

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!newSkillName.trim()) return;

    // Check duplicate
    if (skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      showToast('Skill already in your list!', 'info');
      return;
    }

    addSkill({
      name: newSkillName.trim(),
      category: selectedCategory,
      proficiencyLevel: selectedLevel,
    });
    setNewSkillName('');
    showToast(`Added ${newSkillName.trim()}`, 'success');
  };

  const handleQuickAdd = (skillName, cat) => {
    if (skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) return;
    addSkill({
      name: skillName,
      category: cat || selectedCategory,
      proficiencyLevel: 'Advanced',
    });
    showToast(`Added ${skillName}`, 'success');
  };

  // Group existing skills by category for clear view
  const categorizedSkills = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    items: skills.filter((s) => (s.category || 'Frontend') === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Technical Skills & Proficiency Priority</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
            Step 4 of 9
          </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Add skills with proficiency levels. Reorder to highlight your strongest proficiencies to ATS scanners.
        </p>
      </div>

      {/* Add New Skill Input Card */}
      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 space-y-3">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rnw-red" />
          <span>Add Custom Skill</span>
        </h4>

        <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. React.js, Express, Figma"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
            >
              {SKILL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Proficiency
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white font-medium"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="sm:col-span-12 flex justify-end">
            <button
              type="submit"
              disabled={!newSkillName.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-rnw-red hover:bg-rnw-red-dark disabled:bg-gray-300 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </form>
      </div>

      {/* Quick Add Suggestions for Current Category */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
          <Tag className="w-3.5 h-3.5 text-rnw-red" />
          <span>Recommended for Red & White Students (Click to add):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(POPULAR_SKILL_SUGGESTIONS[selectedCategory] || []).map((name) => {
            const isAdded = skills.some((s) => s.name.toLowerCase() === name.toLowerCase());
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleQuickAdd(name, selectedCategory)}
                disabled={isAdded}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                  isAdded
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default opacity-80'
                    : 'bg-white hover:bg-red-50 text-gray-700 hover:text-rnw-red border-gray-200 hover:border-red-300 shadow-2xs'
                }`}
              >
                {isAdded ? <Check className="w-3 h-3 text-emerald-600" /> : <Plus className="w-3 h-3 text-rnw-red" />}
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Skills List with Reorder Controls */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between">
          <span>Your Skills Matrix ({skills.length} skills)</span>
          <span className="text-[10px] text-gray-400 font-normal">Use arrows to adjust placement priority</span>
        </h3>

        {skills.map((skill, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between gap-3 p-2.5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-2xs group transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-gray-400 w-4 text-center">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800 truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {skill.category || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level selector & Reordering */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={skill.proficiencyLevel || 'Advanced'}
                  onChange={(e) => updateSkill(index, { proficiencyLevel: e.target.value })}
                  className="text-[11px] font-medium py-1 px-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-1 focus:ring-rnw-red text-gray-700"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>

                {/* Move Up */}
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderSkill(index, index - 1)}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded hover:bg-gray-100"
                  title="Move priority up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={index === skills.length - 1}
                  onClick={() => reorderSkill(index, index + 1)}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded hover:bg-gray-100"
                  title="Move priority down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => {
                    removeSkill(index);
                    showToast('Skill removed', 'info');
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 ml-1"
                  title="Delete skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Sparkles className="w-6 h-6 text-gray-300 mx-auto mb-1" />
            <p className="text-xs text-gray-500">No skills added yet. Use the inputs above to build your skill list.</p>
          </div>
        )}
      </div>
    </div>
  );
};
