import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useResume } from '../../context/ResumeContext';
import { RNW_BRANCHES, RNW_COURSES } from '../../data/initialData';
import { ReviewModal } from './ReviewModal';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  Users, 
  Building, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard = () => {
  const { loadProfile, setActiveTab, showToast, lookups } = useResume();
  const branches = lookups?.branches?.length ? lookups.branches : RNW_BRANCHES;
  const courses = lookups?.courses?.length ? lookups.courses : RNW_COURSES;
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalResumes: 0,
    draft: 0,
    submitted: 0,
    underReview: 0,
    needsChanges: 0,
    approved: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedStudentForReview, setSelectedStudentForReview] = useState(null);

  // Fetch admin student data & stats
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [studentsRes, statsRes] = await Promise.all([
        api.getAdminStudents({
          search: searchTerm,
          branch: branchFilter,
          course: courseFilter,
          status: statusFilter,
        }),
        api.getAdminStats(),
      ]);

      if (studentsRes.success) setStudents(studentsRes.data || []);
      if (statsRes.success) setStats(statsRes.data || {});
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [branchFilter, courseFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    fetchData();
  };

  const handleEditInBuilder = (studentId) => {
    loadProfile(studentId);
    setActiveTab('workspace');
    showToast(`Switched active workspace to student: ${studentId}`, 'info');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>Under Review</span>
          </span>
        );
      case 'Needs Changes':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Needs Changes</span>
          </span>
        );
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            <span>Submitted</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <span>Draft</span>
          </span>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-50/60 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Placement Dashboard Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rnw-red text-white flex items-center justify-center font-black text-xl shadow-md">
              RW
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="min-w-0 text-xl font-extrabold text-gray-900 tracking-tight">
                  Placement & Career Services Cell
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-red-100 text-rnw-red">
                  Admin Review Portal
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Red & White Multimedia Institute &bull; Review student resumes, verify capstones, and approve candidate profiles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-gray-400">Total Enrolled</span>
            <div className="text-2xl font-black text-gray-900">{stats.totalStudents || students.length}</div>
            <div className="text-[10px] text-gray-500">Registered candidates</div>
          </div>

          <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-purple-700">Submitted</span>
            <div className="text-2xl font-black text-purple-900">{stats.submitted || 0}</div>
            <div className="text-[10px] text-purple-600">Awaiting officer review</div>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-blue-700">Under Review</span>
            <div className="text-2xl font-black text-blue-900">{stats.underReview || 0}</div>
            <div className="text-[10px] text-blue-600">Currently in evaluation</div>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-700">Needs Changes</span>
            <div className="text-2xl font-black text-amber-900">{stats.needsChanges || 0}</div>
            <div className="text-[10px] text-amber-600">Feedback sent to student</div>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase text-emerald-700">Approved</span>
            <div className="text-2xl font-black text-emerald-900">{stats.approved || 0}</div>
            <div className="text-[10px] text-emerald-600">Drive interview ready</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, ID (e.g. RNW-2026-WD-108), or role..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-rnw-red bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-rnw-red hover:bg-rnw-red-dark text-white text-xs font-semibold rounded-lg shrink-0 shadow-xs"
            >
              Search Records
            </button>
          </form>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Branch Filter */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                Filter by Institute Branch
              </label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
              >
                <option value="All">All Gujarat Branches</option>
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Course Filter */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                Filter by Course / Track
              </label>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
              >
                <option value="All">All Registered Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                Filter by Review Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted (Pending Review)</option>
                <option value="Under Review">Under Review</option>
                <option value="Needs Changes">Needs Changes</option>
                <option value="Approved">Approved</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Submissions Table / Cards */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Student Resumes Queue ({students.length})
            </h3>
            <span className="text-[11px] text-gray-500">
              Click "Preview & Review" to open student resume modal
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Branch & Course</th>
                  <th className="py-3 px-4">Completion</th>
                  <th className="py-3 px-4">Review Status</th>
                  <th className="py-3 px-4">Template</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs">
                {students.map((item, idx) => {
                  const p = item.profile;
                  const r = item.resume;

                  return (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      {/* Student info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            {p.profilePhoto ? (
                              <img src={p.profilePhoto} alt={p.fullName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                                {p.fullName ? p.fullName[0] : 'S'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{p.fullName}</div>
                            <div className="text-[11px] font-mono text-gray-500">{p.studentId}</div>
                            <div className="text-[10px] text-gray-400">{p.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Branch & Course */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800 line-clamp-1">{p.course}</div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-gray-400" />
                          <span>{p.branch}</span>
                        </div>
                      </td>

                      {/* Completion % */}
                      <td className="py-3 px-4">
                        <div className="space-y-1 w-28">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-gray-700">{p.completionPercentage || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                (p.completionPercentage || 0) >= 80
                                  ? 'bg-emerald-500'
                                  : (p.completionPercentage || 0) >= 50
                                  ? 'bg-amber-500'
                                  : 'bg-rnw-red'
                              }`}
                              style={{ width: `${p.completionPercentage || 0}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {getStatusBadge(r.status)}
                        {r.submissionDate && (
                          <div className="text-[10px] text-gray-400 mt-1">
                            {new Date(r.submissionDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      {/* Template */}
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-600 capitalize">
                        {r.templateId?.replace('-', ' ')}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Preview & Review */}
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForReview(item)}
                            className="px-3 py-1.5 bg-rnw-red hover:bg-rnw-red-dark text-white font-semibold text-xs rounded-lg shadow-2xs flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review</span>
                          </button>

                          {/* Switch to edit in student builder */}
                          <button
                            type="button"
                            onClick={() => handleEditInBuilder(p.studentId)}
                            title="Load student into builder workspace"
                            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {students.length === 0 && !isLoading && (
              <div className="text-center p-12 space-y-2">
                <Users className="w-10 h-10 text-gray-300 mx-auto" />
                <h4 className="text-xs font-bold text-gray-700">No student records found matching filters</h4>
                <p className="text-[11px] text-gray-500">
                  Try clearing search terms or selecting "All Branches" and "All Statuses".
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Review Modal */}
      {selectedStudentForReview && (
        <ReviewModal
          studentData={selectedStudentForReview}
          onClose={() => setSelectedStudentForReview(null)}
          onReviewSubmitted={() => {
            fetchData();
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
};
