import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';
import { RNW_BRANCHES, RNW_COURSES, TARGET_ROLES } from '../data/initialData';
import confetti from 'canvas-confetti';

const EMPTY_PROFILE = {
  studentId: '',
  fullName: '',
  displayName: '',
  email: '',
  mobileNumber: '',
  city: '',
  state: 'Gujarat',
  country: 'India',
  linkedinUrl: '',
  portfolioUrl: '',
  githubUrl: '',
  behanceUrl: '',
  dribbbleUrl: '',
  profilePhoto: '',
  photoPositionX: 50,
  photoPositionY: 50,
  targetRole: '',
  professionalSummary: '',
  preferredLocation: '',
  employmentType: 'Full-time',
  availability: 'Immediate',
  branch: '',
  course: '',
  batch: '',
  languages: [],
  softSkills: [],
  completionPercentage: 0,
};

const ResumeContext = createContext(null);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'admin'
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileView, setMobileView] = useState('form'); // 'form' | 'preview'
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(85);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'idle' | 'saving' | 'saved' | 'error'
  const [lastSavedTime, setLastSavedTime] = useState('All changes saved');

  const [lookups, setLookups] = useState({
    branches: RNW_BRANCHES,
    courses: RNW_COURSES,
    targetRoles: TARGET_ROLES,
  });

  // Resume content — filled only from MongoDB
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [resumeConfig, setResumeConfig] = useState({
    _id: null,
    templateId: 'creative-rnw',
    accentColor: '#C8102E', // Signature Red & White Red
    fontFamily: 'Inter',
    spacingDensity: 'standard',
    status: 'Submitted',
    version: 1,
    adminNotes: '',
  });

  const [comments, setComments] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const debounceTimerRef = useRef(null);
  const canAutoSave = useRef(false);

  // Show temporary toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Compute profile completion percentage
  const calculateCompletion = useCallback(() => {
    let score = 0;
    if (profile.fullName && profile.email && profile.mobileNumber) score += 20;
    if (profile.city && profile.targetRole) score += 15;
    if (profile.professionalSummary && profile.professionalSummary.length > 40) score += 10;
    if (profile.linkedinUrl || profile.githubUrl || profile.portfolioUrl) score += 10;
    if (educations.length > 0) score += 15;
    if (skills.length >= 3) score += 15;
    if (projects.length > 0 || experiences.length > 0) score += 15;
    return Math.min(score, 100);
  }, [profile, educations, skills, projects, experiences]);

  const completionPercentage = calculateCompletion();

  const loadProfile = async (targetStudentId) => {
    try {
      setIsLoading(true);
      canAutoSave.current = false;
      const [profileRes, lookupRes] = await Promise.all([
        api.getProfile(targetStudentId),
        api.getLookups().catch(() => null),
      ]);

      if (lookupRes?.success && lookupRes.data) {
        setLookups({
          branches: lookupRes.data.branches?.length ? lookupRes.data.branches : RNW_BRANCHES,
          courses: lookupRes.data.courses?.length ? lookupRes.data.courses : RNW_COURSES,
          targetRoles: lookupRes.data.targetRoles?.length ? lookupRes.data.targetRoles : TARGET_ROLES,
        });
      }

      if (profileRes.success && profileRes.data) {
        const { profile: p, educations: edu, experiences: exp, projects: proj, skills: sk, certifications: cert, resume: r } = profileRes.data;
        setProfile({ ...EMPTY_PROFILE, ...(p || {}) });
        setEducations(Array.isArray(edu) ? edu : []);
        setExperiences(Array.isArray(exp) ? exp : []);
        setProjects(Array.isArray(proj) ? proj : []);
        setSkills(Array.isArray(sk) ? sk : []);
        setCertifications(Array.isArray(cert) ? cert : []);
        if (r) setResumeConfig((prev) => ({ ...prev, ...r }));
      }
    } catch (err) {
      console.warn('Backend profile fetch failed:', err.message);
      showToast('Could not load saved resume from database', 'error');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        canAutoSave.current = true;
      }, 400);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Debounced Auto-Save — persists drafts permanently in MongoDB
  useEffect(() => {
    if (!canAutoSave.current || !profile.studentId) {
      return;
    }

    setSaveStatus('saving');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const payload = {
          profile: { ...profile, completionPercentage },
          educations,
          experiences,
          projects,
          skills,
          certifications,
          resume: resumeConfig,
        };

        const res = await api.batchSave(payload, profile.studentId);
        if (res.success) {
          setSaveStatus('saved');
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSavedTime(`Saved at ${time}`);
          if (res.data?.resume?._id && !resumeConfig._id) {
            setResumeConfig((prev) => ({ ...prev, _id: res.data.resume._id }));
          }
        }
      } catch (err) {
        console.error('Auto-save error:', err);
        setSaveStatus('error');
      }
    }, 1000);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [profile, educations, experiences, projects, skills, certifications, resumeConfig, completionPercentage]);

  // Profile Field updater
  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Education mutators
  const addEducation = (item) => {
    setEducations((prev) => [
      ...prev,
      item || {
        qualification: '',
        specialization: '',
        institute: 'Red & White Multimedia Institute',
        boardOrUniversity: '',
        startYear: '',
        endYear: '',
        isPursuing: false,
        gradeOrPercentage: '',
        order: prev.length + 1,
      },
    ]);
  };

  const updateEducation = (index, updatedItem) => {
    setEducations((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...updatedItem } : item)));
  };

  const removeEducation = (index) => {
    setEducations((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Experience mutators
  const addExperience = (item) => {
    setExperiences((prev) => [
      ...prev,
      item || {
        employmentType: 'Internship',
        companyName: '',
        designation: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentlyWorking: false,
        responsibilities: [''],
        achievements: '',
        order: prev.length + 1,
      },
    ]);
  };

  const updateExperience = (index, updatedItem) => {
    setExperiences((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...updatedItem } : item)));
  };

  const removeExperience = (index) => {
    setExperiences((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Projects mutators
  const addProject = (item) => {
    setProjects((prev) => [
      ...prev,
      item || {
        title: '',
        projectType: 'Academic Capstone',
        role: 'Full Stack Developer',
        description: '',
        technologies: ['React.js'],
        liveDemoUrl: '',
        githubUrl: '',
        order: prev.length + 1,
      },
    ]);
  };

  const updateProject = (index, updatedItem) => {
    setProjects((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...updatedItem } : item)));
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Skills mutators
  const addSkill = (skill) => {
    setSkills((prev) => [
      ...prev,
      typeof skill === 'string'
        ? { category: 'Frontend', name: skill, proficiencyLevel: 'Advanced', order: prev.length + 1 }
        : { category: skill.category || 'Frontend', name: skill.name || 'New Skill', proficiencyLevel: skill.proficiencyLevel || 'Intermediate', order: prev.length + 1 },
    ]);
  };

  const updateSkill = (index, updatedItem) => {
    setSkills((prev) => prev.map((s, idx) => (idx === index ? { ...s, ...updatedItem } : s)));
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== index));
  };

  const reorderSkill = (fromIndex, toIndex) => {
    setSkills((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
  };

  // Certifications mutators
  const addCertification = (item) => {
    setCertifications((prev) => [
      ...prev,
      item || {
        title: '',
        issuer: 'Red & White Skill Education',
        issueDate: '',
        credentialUrl: '',
        description: '',
        order: prev.length + 1,
      },
    ]);
  };

  const updateCertification = (index, updatedItem) => {
    setCertifications((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...updatedItem } : item)));
  };

  const removeCertification = (index) => {
    setCertifications((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Resume Config mutators
  const updateResumeConfig = (updates) => {
    setResumeConfig((prev) => ({ ...prev, ...updates }));
  };

  // Submit to Placement Department
  const submitToPlacement = async () => {
    try {
      setSaveStatus('saving');
      // Force batch save first
      const payload = {
        profile: { ...profile, completionPercentage },
        educations,
        experiences,
        projects,
        skills,
        certifications,
        resume: { ...resumeConfig, status: 'Submitted' },
      };
      await api.batchSave(payload, profile.studentId);

      // Trigger celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8102E', '#FFFFFF', '#1F2937', '#FECDD3'],
      });

      setResumeConfig((prev) => ({ ...prev, status: 'Submitted', version: prev.version + 1 }));
      setSaveStatus('saved');
      showToast('Resume submitted to Placement Cell for review!', 'success');
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Failed to submit resume. Please retry.', 'error');
    }
  };

  // Reset database & sample data
  const handleResetData = async () => {
    try {
      setIsLoading(true);
      await api.resetSeed();
      await loadProfile();
      showToast('Database reset to fresh Red & White Institute sample records!', 'success');
    } catch (err) {
      console.error('Reset error:', err);
      showToast('Reset failed: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation handlers
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(Math.min(Math.max(step, 1), 9));

  return (
    <ResumeContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        goToStep,
        mobileView,
        setMobileView,
        isPreviewModalOpen,
        setPreviewModalOpen,
        zoomLevel,
        setZoomLevel,
        isLoading,
        saveStatus,
        lastSavedTime,
        profile,
        updateProfile,
        setProfile,
        educations,
        addEducation,
        updateEducation,
        removeEducation,
        experiences,
        addExperience,
        updateExperience,
        removeExperience,
        projects,
        addProject,
        updateProject,
        removeProject,
        skills,
        addSkill,
        updateSkill,
        removeSkill,
        reorderSkill,
        certifications,
        addCertification,
        updateCertification,
        removeCertification,
        resumeConfig,
        updateResumeConfig,
        comments,
        setComments,
        completionPercentage,
        submitToPlacement,
        handleResetData,
        loadProfile,
        lookups,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
