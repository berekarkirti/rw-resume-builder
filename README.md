# Red & White Multimedia Institute - Resume Builder & Placement Portal

A production-ready, split-screen **Resume Builder & Placement Review Portal** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled following the signature **Red & White Skill Education** theme (`#C8102E`).

---

## 🎨 Theme & Brand Styling
- **Primary Accent Color:** Deep Red (`#C8102E`)
- **Secondary / Neutral:** Clean Crisp White (`#FFFFFF`)
- **Text & Contrast:** Dark Charcoal (`#1F2937`) & Light Gray (`#F9FAFB`)
- **Brand Identity:** Red & White Multimedia Institute, Verified Placement badges, Campus филиals (Surat - Katargam, Surat - Varachha, Ahmedabad - Navrangpura, Rajkot, etc.).

---

## ⚡ Key Architecture & Features

### 1. Split-Screen Dual-Panel Workspace
- **Left Panel (50% Desktop width):** 9-Step multi-step student form with progress bar and dynamic profile completion percentage gauge.
- **Right Panel (50% Desktop width):** Real-time, dynamic **A4 Resume Live Preview**. Updates immediately with every keystroke without page reloads.
- **Mobile Responsive:** Automatic tab switcher between `Edit Form` and `Live A4 Preview`.
- **Zoom & Page Guidelines:** Interactive zoom controls (50% - 150%, fit width) with visual A4 page-break guides.

### 2. Multi-Step Form Sections (9 Comprehensive Steps)
1. **Basic Profile & Contact Details:** Student ID (`RNW-2026-WD-108`), Full Name, Professional Display Name, Profile Photo upload/avatar select, Mobile, Email, Location, LinkedIn, Portfolio, GitHub, Behance/Dribbble. *(Strictly does not collect sensitive national IDs like Aadhaar or PAN).*
2. **Career Profile:** Target Job Role (Institute course dropdown + custom), Professional Summary (with live 40–100 word counter and quick presets), Preferred Work Location, Employment Type, Availability.
3. **Education (Repeatable):** Qualification, Specialization, Institute, Board/University, Start & End Year (with "Pursuing" option), Percentage/CGPA.
4. **Skills (Categorized & Priority Ordered):** Frontend, Backend, UI/UX & Graphics, Database, Tools, Soft Skills. Proficiency levels (`Beginner`, `Intermediate`, `Advanced`, `Expert`), reordering arrows, and Red & White course quick-add chips.
5. **Work Experience (Repeatable):** Employment Type, Company, Designation, Location, Dates with "Currently Working", repeatable bullet responsibilities, achievements.
6. **Projects (Core for Freshers):** Academic Capstones, Client & Personal Projects, Role, Description, Technology tags, Live Demo URL, GitHub Repo URL.
7. **Certifications & Achievements:** Official Red & White diplomas, issuer, credential URL, issue date.
8. **Languages & Soft Skills:** Multilingual competencies (Speaking, Reading, Writing checkmarks) + Soft Skills selection.
9. **Template Customizer & PDF Export:** 5 layout templates, brand accent color picker, typography switcher, layout density switcher, and direct PDF download.

### 3. Five Distinct A4 Resume Templates
1. **Red & White Signature (`creative-rnw`):** Distinctive institute styling with deep red banner, verified placement stamp, and two-column structured layout.
2. **Classic ATS-Friendly (`classic-ats`):** Engineered for high compatibility with enterprise applicant tracking systems.
3. **Modern Minimalist (`modern-minimal`):** Clean executive layout with subtle borders and balanced spacing.
4. **Developer Terminal (`developer-tech`):** Monospace headers, terminal banner, and GitHub repository focus.
5. **Fresher Academic (`fresher-academic`):** Prioritizes Education and Institute Capstone Projects first for campus placement drives.

### 4. Debounced Atomic Auto-Save & PDF Generation
- Changes are automatically debounced and saved atomically via `PUT /api/v1/students/me/batch-save`.
- Produces clean printable A4 selectable text PDF with standard naming: `StudentName_Resume.pdf`.

### 5. Admin & Placement Department Dashboard
- Placement Team review interface with status workflow:
  `Draft` ➔ `Submitted` ➔ `Under Review` ➔ `Needs Changes` ➔ `Approved` / `Rejected`.
- Advanced filters by Branch, Course, Batch, Student ID, Review Status, and Completion %.
- Metric counters: Total Students, Submitted Resumes, Under Review, Needs Changes, Approved.
- **Interactive Review Modal:**
  - Live split preview of the student resume.
  - Quick feedback templates (e.g. *"Please quantify achievements with metrics"*, *"Approved for campus placement drives"*).
  - Comment history thread with reviewer identity, role, and timestamps.
  - Direct student resume PDF download from admin portal.

---

## 🗄️ Database Schema (MongoDB / Mongoose)
- `User`: Roles (`Student`, `Placement Admin`, `Branch Admin`, `Super Admin`).
- `StudentProfile`: Basic personal, academic center (branch/course/batch), contact, and career preferences.
- `Education`: Repeatable academic degrees referencing `studentProfileId`.
- `WorkExperience`: Repeatable professional and internship records referencing `studentProfileId`.
- `Project`: Capstones and technical projects referencing `studentProfileId`.
- `Skill`: Categorized proficiencies and priority order referencing `studentProfileId`.
- `Certification`: Accreditations and credentials referencing `studentProfileId`.
- `ResumeDocument`: Styling configurations (template, colors, fonts), status workflow, and snapshot data.
- `ReviewComment`: Placement officer review comments and status tags referencing `resumeId`.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22.16.0)
- **MongoDB** (running locally on `mongodb://127.0.0.1:27017` or configured via `MONGO_URI`)

### 2. Backend Setup
```bash
cd backend
npm install
node seed.js    # Seeds realistic sample students, resumes, and admin reviews
npm start       # Runs backend server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Starts Vite development server on http://localhost:3000
```

Open `http://localhost:3000` to access the portal. You can switch between **Student Builder** and **Placement Admin** at any time using the header toggle.
