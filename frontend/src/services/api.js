const API_BASE = '/api/v1';

export const api = {
  // Student Profile Bundle
  async getProfile(studentId) {
    const url = studentId ? `${API_BASE}/students/me/profile?studentId=${studentId}` : `${API_BASE}/students/me/profile`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateProfile(profileData, studentId) {
    const url = studentId ? `${API_BASE}/students/me/profile?studentId=${studentId}` : `${API_BASE}/students/me/profile`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Batch Auto-Save (atomic sync of everything)
  async batchSave(fullData, studentId) {
    const url = studentId ? `${API_BASE}/students/me/batch-save?studentId=${studentId}` : `${API_BASE}/students/me/batch-save`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData),
    });
    if (!res.ok) throw new Error('Failed to batch save');
    return res.json();
  },

  // Submit resume for review
  async submitResume(resumeId) {
    const res = await fetch(`${API_BASE}/resume/${resumeId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to submit resume');
    return res.json();
  },

  // Admin Endpoints
  async getAdminStudents(filters = {}) {
    const params = new URLSearchParams();
    if (filters.branch && filters.branch !== 'All') params.append('branch', filters.branch);
    if (filters.course && filters.course !== 'All') params.append('course', filters.course);
    if (filters.batch && filters.batch !== 'All') params.append('batch', filters.batch);
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.minCompletion) params.append('minCompletion', filters.minCompletion);

    const res = await fetch(`${API_BASE}/admin/students?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch students list');
    return res.json();
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async getResumeDetail(resumeId) {
    const res = await fetch(`${API_BASE}/admin/resume/${resumeId}`);
    if (!res.ok) throw new Error('Failed to fetch resume detail');
    return res.json();
  },

  async reviewResume(resumeId, reviewData) {
    const res = await fetch(`${API_BASE}/admin/resume/${resumeId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to review resume');
    return res.json();
  },

  async addReviewComment(resumeId, commentData) {
    const res = await fetch(`${API_BASE}/admin/resume/${resumeId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
  },

  async getLookups() {
    const res = await fetch(`${API_BASE}/auth/lookups`);
    if (!res.ok) throw new Error('Failed to fetch institute lookups');
    return res.json();
  },

  // Auth & Reset
  async getUsers() {
    const res = await fetch(`${API_BASE}/auth/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async resetSeed() {
    const res = await fetch(`${API_BASE}/auth/reset-seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to reseed database');
    return res.json();
  },
};
