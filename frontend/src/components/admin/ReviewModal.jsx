import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { exportResumeToPdf } from '../../utils/pdfExport';
import { CreativeRnwTemplate } from '../preview/templates/CreativeRnwTemplate';
import { ClassicAtsTemplate } from '../preview/templates/ClassicAtsTemplate';
import { ModernMinimalTemplate } from '../preview/templates/ModernMinimalTemplate';
import { DeveloperTechTemplate } from '../preview/templates/DeveloperTechTemplate';
import { FresherAcademicTemplate } from '../preview/templates/FresherAcademicTemplate';

import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Download,
  MessageSquare,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
  Maximize2
} from 'lucide-react';

const QUICK_FEEDBACK_TAGS = [
  'Please quantify achievements in work experience with metrics.',
  'Add live deployment and GitHub repository links for capstone projects.',
  'Expand professional summary to highlight core technical strengths.',
  'Approved! Candidate profile and resume are ready for campus placement interviews.',
  'Update contact details and verify LinkedIn profile URL.',
];

export const ReviewModal = ({ studentData, onClose, onReviewSubmitted, showToast }) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(studentData?.resume?.status || 'Under Review');
  const [commentText, setCommentText] = useState('');
  const [reviewerName, setReviewerName] = useState('Hardik Chauhan (Placement Head)');
  const [reviewerRole, setReviewerRole] = useState('Placement Department - Surat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch full student resume detail
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        if (studentData?.resume?._id) {
          const res = await api.getResumeDetail(studentData.resume._id);
          if (res.success) {
            setDetail(res.data);
            setSelectedStatus(res.data.resume.status || 'Under Review');
          }
        } else {
          // Fallback if resume ID not directly in MongoDB
          setDetail({
            profile: studentData.profile,
            resume: studentData.resume,
            educations: [],
            experiences: [],
            projects: [],
            skills: [],
            certifications: [],
            comments: [],
          });
        }
      } catch (err) {
        console.error('Failed to load resume detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [studentData]);

  // Submit Review Feedback
  const handleSubmitReview = async () => {
    if (!detail?.resume?._id) {
      showToast('Cannot review resume without valid database ID', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.reviewResume(detail.resume._id, {
        status: selectedStatus,
        comment: commentText.trim(),
        reviewerName,
        reviewerRole,
      });

      if (res.success) {
        showToast(`Resume status updated to "${selectedStatus}"`, 'success');
        setDetail((prev) => ({
          ...prev,
          resume: res.data.resume,
          comments: res.data.comments,
        }));
        setCommentText('');
        if (onReviewSubmitted) onReviewSubmitted();
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating review status: ' + err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    showToast('Exporting student resume...', 'info');
    try {
      await exportResumeToPdf('admin-preview-sheet', detail?.profile?.fullName || 'Student');
      showToast('Downloaded PDF successfully', 'success');
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Render Template
  const renderResume = () => {
    if (!detail) return null;
    const props = {
      profile: detail.profile || {},
      educations: detail.educations || [],
      experiences: detail.experiences || [],
      projects: detail.projects || [],
      skills: detail.skills || [],
      certifications: detail.certifications || [],
      config: detail.resume || {},
    };

    switch (detail.resume?.templateId) {
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

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200">
        
        {/* Modal Top Bar */}
        <div className="bg-gray-900 text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rnw-red flex items-center justify-center text-white font-black text-sm">
              RW
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {studentData.profile?.fullName || 'Student'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                  {studentData.profile?.studentId}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                {studentData.profile?.course} &bull; {studentData.profile?.branch}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded-lg text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 55% Resume Preview vs 45% Review Actions */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden bg-gray-100">
          
          {/* Left: Resume Document Preview (55%) */}
          <div className="w-full lg:w-[55%] min-h-0 overflow-y-auto p-4 bg-gray-200/90">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-rnw-red border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex justify-center" style={{ zoom: 0.75 }}>
                <div id="admin-preview-sheet" className="a4-sheet shadow-lg bg-white">
                  {renderResume()}
                </div>
              </div>
            )}
          </div>

          {/* Right: Placement Review Controls & Feedback History (45%) */}
          <div className="w-full lg:w-[45%] min-h-0 overflow-y-auto p-5 bg-white border-l border-gray-200 space-y-5">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rnw-red" />
                  <span>Placement Officer Review Form</span>
                </h3>
                <span className="text-[11px] text-gray-500">Official Placement Portal</span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Set Resume Review Status <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Under Review', label: 'Under Review', color: 'border-blue-500 bg-blue-50 text-blue-700' },
                    { id: 'Needs Changes', label: 'Needs Changes', color: 'border-amber-500 bg-amber-50 text-amber-700' },
                    { id: 'Approved', label: 'Approved', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
                    { id: 'Rejected', label: 'Rejected', color: 'border-red-500 bg-red-50 text-red-700' },
                  ].map((s) => {
                    const isSelected = selectedStatus === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStatus(s.id)}
                        className={`p-2 rounded-lg border-2 text-center text-xs font-bold transition-all ${
                          isSelected
                            ? `${s.color} shadow-xs ring-1 ring-black/10`
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reviewer Details */}
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                    Reviewer Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                    Department / Campus
                  </label>
                  <input
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded bg-white"
                  />
                </div>
              </div>

              {/* Quick Feedback Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rnw-red" />
                  <span>Quick Feedback Templates (Click to paste):</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_FEEDBACK_TAGS.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCommentText((prev) => (prev ? `${prev}\n${tag}` : tag))}
                      className="text-[10px] px-2 py-1 rounded bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-rnw-red border border-gray-200 text-left line-clamp-1"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline Feedback Comment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inline Feedback / Placement Recommendation
                </label>
                <textarea
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Provide constructive feedback on technical skills, capstones, or achievements to help the student get placed..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red"
                />
              </div>

              {/* Submit Review Button */}
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-rnw-red hover:bg-rnw-red-dark disabled:bg-gray-400 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving Review...' : 'Submit Official Review & Notify Student'}</span>
              </button>

              {/* Review Audit History */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  <span>Review Comments History ({detail?.comments?.length || 0})</span>
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {detail?.comments && detail.comments.length > 0 ? (
                    detail.comments.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{c.reviewerName}</span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500">{c.reviewerRole}</div>
                        <p className="text-xs text-gray-700 pt-0.5 leading-relaxed">{c.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No previous comments recorded yet.</p>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
