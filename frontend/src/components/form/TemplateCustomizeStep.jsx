import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  RESUME_TEMPLATES, 
  ACCENT_COLOR_PRESETS, 
  FONT_OPTIONS 
} from '../../data/initialData';
import { 
  Palette, 
  Type, 
  LayoutGrid, 
  Check, 
  Sparkles, 
  Layers,
  SlidersHorizontal,
} from 'lucide-react';

export const TemplateCustomizeStep = () => {
  const { resumeConfig, updateResumeConfig, showToast } = useResume();

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>Template Selection & PDF Customizer</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-rnw-red">
            Step 9 of 9
          </span>
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Select your resume layout, personalize accent brand colors, choose typography, and download your A4 PDF.
        </p>
      </div>

      {/* 1. Template Layout Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-rnw-red" />
          <span>Choose A4 Template Layout</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESUME_TEMPLATES.map((tpl) => {
            const isSelected = (resumeConfig.templateId || 'creative-rnw') === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  updateResumeConfig({ templateId: tpl.id });
                  showToast(`Selected "${tpl.name}" template`, 'info');
                }}
                className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-rnw-red bg-red-50/40 shadow-sm ring-2 ring-rnw-red/10'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-2xs'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rnw-red text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-gray-900">{tpl.name}</h4>
                    {tpl.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-900 text-white uppercase tracking-wider">
                        {tpl.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-rnw-red">{tpl.tagline}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{tpl.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Accent Color */}
      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-rnw-red" />
          <span>Brand Accent Color</span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_COLOR_PRESETS.map((color) => {
            const isSelected = (resumeConfig.accentColor || '#C8102E') === color.hex;
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateResumeConfig({ accentColor: color.hex })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-gray-900 bg-white shadow-xs ring-1 ring-gray-900'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-gray-800">{color.name}</span>
                {isSelected && <Check className="w-3 h-3 text-gray-900" />}
              </button>
            );
          })}

          {/* Custom Hex Color Input */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-white rounded-lg border border-gray-200">
            <span className="text-[11px] text-gray-500 font-mono">Hex:</span>
            <input
              type="color"
              value={resumeConfig.accentColor || '#C8102E'}
              onChange={(e) => updateResumeConfig({ accentColor: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-xs font-mono font-bold text-gray-700">
              {resumeConfig.accentColor || '#C8102E'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Typography & Spacing Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Font Family */}
        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-rnw-red" />
            <span>Font Family</span>
          </label>
          <select
            value={resumeConfig.fontFamily || 'Inter'}
            onChange={(e) => updateResumeConfig({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Spacing Density */}
        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-rnw-red" />
            <span>Layout Density</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'compact', label: 'Compact (1 Page)' },
              { id: 'standard', label: 'Standard' },
              { id: 'relaxed', label: 'Spacious' },
            ].map((density) => {
              const isSelected = (resumeConfig.spacingDensity || 'standard') === density.id;
              return (
                <button
                  key={density.id}
                  type="button"
                  onClick={() => updateResumeConfig({ spacingDensity: density.id })}
                  className={`py-2 px-1 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                    isSelected
                      ? 'bg-rnw-red text-white border-rnw-red shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {density.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
