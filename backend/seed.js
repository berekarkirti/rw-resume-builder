const mongoose = require('mongoose');
const User = require('./model/User');
const StudentProfile = require('./model/StudentProfile');
const Education = require('./model/Education');
const WorkExperience = require('./model/WorkExperience');
const Project = require('./model/Project');
const Skill = require('./model/Skill');
const Certification = require('./model/Certification');
const ResumeDocument = require('./model/ResumeDocument');
const ReviewComment = require('./model/ReviewComment');
const { ensureInstituteCatalog } = require('./utils/ensureCatalog');

const seedDatabase = async (standalone = true) => {
  try {
    if (standalone) {
      require('dotenv').config();
      const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rw_resume_builder';
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB for seeding...');
    }

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      StudentProfile.deleteMany({}),
      Education.deleteMany({}),
      WorkExperience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Certification.deleteMany({}),
      ResumeDocument.deleteMany({}),
      ReviewComment.deleteMany({}),
    ]);

    console.log('Cleared existing collections.');
    await ensureInstituteCatalog();

    // 1. Placement Admins
    const adminUser = await User.create({
      name: 'Hardik Chauhan',
      email: 'placement@rnwmultimedia.edu.in',
      role: 'Placement Admin',
      branch: 'Surat - Katargam Head Office',
      course: 'Placement Cell',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    });

    const branchAdmin = await User.create({
      name: 'Nirav Dave',
      email: 'ahmedabad.placement@rnwmultimedia.edu.in',
      role: 'Branch Admin',
      branch: 'Ahmedabad - Navrangpura',
      course: 'Skill Education',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });

    // 2. Student 1: Rohan Patel (Full Stack MERN Developer - Primary Student)
    const user1 = await User.create({
      name: 'Rohan Patel',
      email: 'rohan.patel@rnwstudents.in',
      role: 'Student',
      studentId: 'RNW-2026-WD-108',
      branch: 'Surat - Katargam',
      course: 'Master in Full Stack Web Development',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    });

    const profile1 = await StudentProfile.create({
      userId: user1._id,
      studentId: 'RNW-2026-WD-108',
      fullName: 'Rohan V. Patel',
      displayName: 'Rohan Patel',
      email: 'rohan.patel@rnwstudents.in',
      mobileNumber: '+91 98251 44789',
      city: 'Surat',
      state: 'Gujarat',
      country: 'India',
      linkedinUrl: 'https://linkedin.com/in/rohan-patel-rnw',
      portfolioUrl: 'https://rohanpatel.dev',
      githubUrl: 'https://github.com/rohan-patel-mern',
      profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
      targetRole: 'Full Stack MERN Developer',
      professionalSummary: 'Motivated and solution-oriented Full Stack Web Developer trained at Red & White Multimedia Institute. Experienced in building responsive React frontends, robust Node.js/Express REST APIs, and scalable MongoDB architectures. Passionate about clean code, component modularity, and high-performance web applications.',
      preferredLocation: 'Surat / Ahmedabad / Pune / Remote',
      employmentType: 'Full-time',
      availability: 'Immediate',
      branch: 'Surat - Katargam',
      course: 'Master in Full Stack Web Development',
      batch: '2025-2026 (Batch B4)',
      languages: [
        { language: 'English', proficiency: 'Fluent', canSpeak: true, canRead: true, canWrite: true },
        { language: 'Hindi', proficiency: 'Native', canSpeak: true, canRead: true, canWrite: true },
        { language: 'Gujarati', proficiency: 'Native', canSpeak: true, canRead: true, canWrite: true },
      ],
      softSkills: [
        'Problem Solving',
        'Team Collaboration',
        'Agile / Scrum Mindset',
        'Time Management',
        'Technical Communication',
      ],
      completionPercentage: 95,
    });

    await Education.insertMany([
      {
        studentProfileId: profile1._id,
        qualification: 'Master in Full Stack Web Development',
        specialization: 'MERN Stack & Cloud Deployment',
        institute: 'Red & White Multimedia Institute',
        boardOrUniversity: 'Red & White Skill Education',
        startYear: '2025',
        endYear: '2026',
        isPursuing: true,
        gradeOrPercentage: 'Distinction (Grade A+)',
        order: 1,
      },
      {
        studentProfileId: profile1._id,
        qualification: 'Bachelor of Computer Applications (BCA)',
        specialization: 'Computer Applications & Software Systems',
        institute: 'Veer Narmad South Gujarat University (VNSGU)',
        boardOrUniversity: 'VNSGU Surat',
        startYear: '2022',
        endYear: '2025',
        isPursuing: false,
        gradeOrPercentage: '8.4 CGPA',
        order: 2,
      },
      {
        studentProfileId: profile1._id,
        qualification: 'Higher Secondary Certificate (HSC)',
        specialization: 'Science (Mathematics & Physics)',
        institute: 'Ashadeep Science Bhavan, Surat',
        boardOrUniversity: 'GSEB Gujarat Board',
        startYear: '2020',
        endYear: '2022',
        isPursuing: false,
        gradeOrPercentage: '84.2%',
        order: 3,
      },
    ]);

    await WorkExperience.insertMany([
      {
        studentProfileId: profile1._id,
        employmentType: 'Internship',
        companyName: 'Infinitum Code Labs',
        designation: 'MERN Stack Developer Intern',
        location: 'Surat, Gujarat',
        startDate: 'Jan 2026',
        endDate: '',
        isCurrentlyWorking: true,
        responsibilities: [
          'Engineered reusable React component libraries and integrated Redux Toolkit for state management.',
          'Developed 15+ secure RESTful API endpoints using Express.js and Mongoose with JWT authentication.',
          'Reduced MongoDB query response times by 35% through proper indexing and aggregation pipelines.',
        ],
        achievements: 'Awarded Intern of the Month for delivering client inventory dashboard 5 days ahead of schedule.',
        order: 1,
      },
      {
        studentProfileId: profile1._id,
        employmentType: 'Freelance',
        companyName: 'Digital Craft Studio',
        designation: 'Frontend Web Developer',
        location: 'Remote',
        startDate: 'Aug 2025',
        endDate: 'Dec 2025',
        isCurrentlyWorking: false,
        responsibilities: [
          'Designed and deployed 4 pixel-perfect landing pages using Tailwind CSS and responsive design patterns.',
          'Implemented SEO optimization strategies that improved Google Lighthouse performance score to 98/100.',
        ],
        achievements: 'Delivered cross-browser compatible websites with 100% client satisfaction ratings.',
        order: 2,
      },
    ]);

    await Project.insertMany([
      {
        studentProfileId: profile1._id,
        title: 'SmartCampus - Red & White Institute Portal',
        projectType: 'Academic Capstone',
        role: 'Lead Full Stack Developer',
        description: 'Comprehensive college management portal facilitating course registration, assignment tracking, automated grading, and fee receipt generation with instant email triggers.',
        technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
        liveDemoUrl: 'https://smartcampus-demo.rnw.in',
        githubUrl: 'https://github.com/rohan-patel-mern/smartcampus-portal',
        order: 1,
      },
      {
        studentProfileId: profile1._id,
        title: 'SwiftCart - Full Stack E-Commerce Platform',
        projectType: 'Personal Project',
        role: 'Full Stack Engineer',
        description: 'Modern shopping application with product catalogs, live search, cart persistence, Razorpay payment gateway integration, and real-time order tracking dashboard.',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe/Razorpay', 'Tailwind CSS'],
        liveDemoUrl: 'https://swiftcart-mern.vercel.app',
        githubUrl: 'https://github.com/rohan-patel-mern/swiftcart-mern',
        order: 2,
      },
      {
        studentProfileId: profile1._id,
        title: 'DevPulse - Collaborative Developer Forum',
        projectType: 'Hackathon / Competition',
        role: 'Frontend & API Lead',
        description: 'Developer knowledge sharing platform featuring markdown code snippets, upvoting, tag filtering, and instant question notifications via WebSockets.',
        technologies: ['React', 'Node.js', 'Socket.io', 'Express', 'JWT'],
        liveDemoUrl: 'https://devpulse.rnwstudents.in',
        githubUrl: 'https://github.com/rohan-patel-mern/devpulse-forum',
        order: 3,
      },
    ]);

    await Skill.insertMany([
      { studentProfileId: profile1._id, category: 'Frontend', name: 'React.js & Hooks', proficiencyLevel: 'Expert', order: 1 },
      { studentProfileId: profile1._id, category: 'Frontend', name: 'JavaScript (ES6+)', proficiencyLevel: 'Expert', order: 2 },
      { studentProfileId: profile1._id, category: 'Frontend', name: 'Tailwind CSS & Responsive UI', proficiencyLevel: 'Expert', order: 3 },
      { studentProfileId: profile1._id, category: 'Frontend', name: 'Redux Toolkit & Context API', proficiencyLevel: 'Advanced', order: 4 },
      { studentProfileId: profile1._id, category: 'Backend', name: 'Node.js & Express.js', proficiencyLevel: 'Advanced', order: 5 },
      { studentProfileId: profile1._id, category: 'Backend', name: 'RESTful API Architecture', proficiencyLevel: 'Advanced', order: 6 },
      { studentProfileId: profile1._id, category: 'Database', name: 'MongoDB & Mongoose ODM', proficiencyLevel: 'Advanced', order: 7 },
      { studentProfileId: profile1._id, category: 'Tools & Cloud', name: 'Git & GitHub Workflows', proficiencyLevel: 'Advanced', order: 8 },
      { studentProfileId: profile1._id, category: 'Tools & Cloud', name: 'Postman & API Testing', proficiencyLevel: 'Advanced', order: 9 },
      { studentProfileId: profile1._id, category: 'UI/UX & Graphics', name: 'Figma to Clean Code', proficiencyLevel: 'Intermediate', order: 10 },
    ]);

    await Certification.insertMany([
      {
        studentProfileId: profile1._id,
        title: 'Master in Full Stack Web Development (MERN)',
        issuer: 'Red & White Multimedia Education',
        issueDate: 'Feb 2026',
        credentialUrl: 'https://verify.rnwmultimedia.com/cert/RNW-WD-2026-108',
        description: 'Rigorous 12-month program covering React, Node.js, Express, MongoDB, UI/UX implementation, and industry real-time capstone deployment.',
        order: 1,
      },
      {
        studentProfileId: profile1._id,
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        issueDate: 'Nov 2025',
        credentialUrl: 'https://freecodecamp.org/certification/rohanpatel/javascript-algorithms',
        description: 'Demonstrated mastery over OOP, functional programming, data structures, and algorithm complexity analysis.',
        order: 2,
      },
    ]);

    const resume1 = await ResumeDocument.create({
      studentProfileId: profile1._id,
      templateId: 'creative-rnw',
      accentColor: '#C8102E', // Red & White Primary
      fontFamily: 'Inter',
      spacingDensity: 'standard',
      status: 'Submitted',
      version: 1,
      submissionDate: new Date(Date.now() - 3600000 * 4), // 4 hours ago
      adminNotes: '',
    });

    await ReviewComment.create({
      resumeId: resume1._id,
      reviewerId: adminUser._id,
      reviewerName: 'Hardik Chauhan',
      reviewerRole: 'Placement Head - Surat',
      comment: 'Strong technical profile! The SmartCampus capstone project clearly shows real-world readiness. Recommended for upcoming Infosys & TCS campus drives.',
      statusTag: 'Comment',
    });

    // 3. Student 2: Priya Sharma (UI/UX Designer - Needs Changes status)
    const user2 = await User.create({
      name: 'Priya Sharma',
      email: 'priya.sharma@rnwstudents.in',
      role: 'Student',
      studentId: 'RNW-2026-UX-204',
      branch: 'Ahmedabad - Navrangpura',
      course: 'Master in UI/UX & Product Design',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    });

    const profile2 = await StudentProfile.create({
      userId: user2._id,
      studentId: 'RNW-2026-UX-204',
      fullName: 'Priya Sharma',
      displayName: 'Priya Sharma',
      email: 'priya.sharma@rnwstudents.in',
      mobileNumber: '+91 97145 22310',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      linkedinUrl: 'https://linkedin.com/in/priya-sharma-ux',
      portfolioUrl: 'https://priyasharma.design',
      behanceUrl: 'https://behance.net/priyasharmaux',
      dribbbleUrl: 'https://dribbble.com/priyaux',
      targetRole: 'UI/UX & Product Designer',
      professionalSummary: 'Detail-driven UI/UX Designer specialized in creating high-conversion, accessible, and intuitive user experiences for web and mobile platforms. Proficient in user research, wireframing, interactive prototyping in Figma, and design systems.',
      preferredLocation: 'Ahmedabad / Surat / Hybrid',
      employmentType: 'Full-time',
      availability: 'Within 15 Days',
      branch: 'Ahmedabad - Navrangpura',
      course: 'Master in UI/UX & Product Design',
      batch: '2025-2026 (Morning A)',
      completionPercentage: 88,
    });

    await Education.insertMany([
      {
        studentProfileId: profile2._id,
        qualification: 'Master in UI/UX Design & Multimedia',
        specialization: 'Interaction Design & Design Systems',
        institute: 'Red & White Multimedia Institute',
        boardOrUniversity: 'Red & White Skill Education',
        startYear: '2025',
        endYear: '2026',
        isPursuing: true,
        gradeOrPercentage: 'Grade A',
        order: 1,
      },
      {
        studentProfileId: profile2._id,
        qualification: 'Bachelor of Design (B.Des)',
        specialization: 'Communication Design',
        institute: 'GLS Institute of Design, Ahmedabad',
        boardOrUniversity: 'GLS University',
        startYear: '2021',
        endYear: '2025',
        isPursuing: false,
        gradeOrPercentage: '8.1 CGPA',
        order: 2,
      },
    ]);

    await Project.insertMany([
      {
        studentProfileId: profile2._id,
        title: 'CredFlow - Mobile Micro-Finance Banking App',
        projectType: 'Academic Capstone',
        role: 'Lead UI/UX Researcher & Designer',
        description: 'End-to-end UX case study analyzing financial habits of small business merchants. Designed high-fidelity prototypes with dark/light mode and frictionless KYC flow.',
        technologies: ['Figma', 'FigJam', 'User Testing', 'Design Systems', 'Prototyping'],
        liveDemoUrl: 'https://behance.net/gallery/credflow-app',
        order: 1,
      },
    ]);

    await Skill.insertMany([
      { studentProfileId: profile2._id, category: 'UI/UX & Graphics', name: 'Figma & Auto-Layout', proficiencyLevel: 'Expert', order: 1 },
      { studentProfileId: profile2._id, category: 'UI/UX & Graphics', name: 'Design Systems & Tokens', proficiencyLevel: 'Advanced', order: 2 },
      { studentProfileId: profile2._id, category: 'UI/UX & Graphics', name: 'User Journey Mapping', proficiencyLevel: 'Advanced', order: 3 },
      { studentProfileId: profile2._id, category: 'UI/UX & Graphics', name: 'Adobe Illustrator & Photoshop', proficiencyLevel: 'Advanced', order: 4 },
    ]);

    const resume2 = await ResumeDocument.create({
      studentProfileId: profile2._id,
      templateId: 'modern-minimal',
      accentColor: '#1E293B',
      fontFamily: 'Poppins',
      spacingDensity: 'standard',
      status: 'Needs Changes',
      version: 2,
      submissionDate: new Date(Date.now() - 3600000 * 24),
      reviewedAt: new Date(Date.now() - 3600000 * 12),
      adminNotes: 'Please add metrics to your CredFlow project (e.g., how many users tested the prototype) and include a live Behance URL.',
    });

    await ReviewComment.create({
      resumeId: resume2._id,
      reviewerId: branchAdmin._id,
      reviewerName: 'Nirav Dave',
      reviewerRole: 'Placement Coordinator - Ahmedabad',
      comment: 'Great visual structure, Priya. Please add metrics to your CredFlow project (e.g. how many users tested the prototype) and include direct Behance links.',
      statusTag: 'Needs Changes',
    });

    // 4. Student 3: Amit Mehta (Flutter Mobile Developer - Approved status)
    const user3 = await User.create({
      name: 'Amit Mehta',
      email: 'amit.mehta@rnwstudents.in',
      role: 'Student',
      studentId: 'RNW-2026-FL-312',
      branch: 'Rajkot - Kalawad',
      course: 'Flutter Mobile App Development',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    });

    const profile3 = await StudentProfile.create({
      userId: user3._id,
      studentId: 'RNW-2026-FL-312',
      fullName: 'Amit Mehta',
      displayName: 'Amit Mehta',
      email: 'amit.mehta@rnwstudents.in',
      mobileNumber: '+91 94280 77123',
      city: 'Rajkot',
      state: 'Gujarat',
      country: 'India',
      githubUrl: 'https://github.com/amit-mehta-flutter',
      targetRole: 'Flutter Mobile App Developer',
      professionalSummary: 'Cross-platform Mobile Application Developer skilled in Flutter & Dart. Adept at state management using Bloc & Provider, native platform channels, Firebase cloud services, and Play Store publishing workflows.',
      branch: 'Rajkot - Kalawad',
      course: 'Flutter Mobile App Development',
      batch: '2025-2026 (Evening B)',
      completionPercentage: 92,
    });

    await Education.insertMany([
      {
        studentProfileId: profile3._id,
        qualification: 'Diploma in Mobile Application Development',
        specialization: 'Flutter & Dart Engine',
        institute: 'Red & White Multimedia Institute, Rajkot',
        boardOrUniversity: 'Red & White Skill Education',
        startYear: '2025',
        endYear: '2026',
        isPursuing: false,
        gradeOrPercentage: '88%',
        order: 1,
      },
    ]);

    await Project.insertMany([
      {
        studentProfileId: profile3._id,
        title: 'MedTrack - Medicine Reminder & Health Tracker',
        projectType: 'Academic Capstone',
        role: 'Sole Flutter Developer',
        description: 'Flutter cross-platform app published on Google Play with local SQLite storage, push notifications, and biometric authentication.',
        technologies: ['Flutter', 'Dart', 'Bloc', 'SQLite', 'Firebase'],
        githubUrl: 'https://github.com/amit-mehta-flutter/medtrack-app',
        order: 1,
      },
    ]);

    await Skill.insertMany([
      { studentProfileId: profile3._id, category: 'Frontend', name: 'Flutter & Dart', proficiencyLevel: 'Expert', order: 1 },
      { studentProfileId: profile3._id, category: 'Frontend', name: 'Bloc / Cubit State Management', proficiencyLevel: 'Advanced', order: 2 },
      { studentProfileId: profile3._id, category: 'Backend', name: 'Firebase Firestore & Cloud Functions', proficiencyLevel: 'Advanced', order: 3 },
    ]);

    const resume3 = await ResumeDocument.create({
      studentProfileId: profile3._id,
      templateId: 'developer-tech',
      accentColor: '#047857',
      fontFamily: 'JetBrains Mono',
      spacingDensity: 'compact',
      status: 'Approved',
      version: 2,
      submissionDate: new Date(Date.now() - 3600000 * 48),
      reviewedAt: new Date(Date.now() - 3600000 * 18),
      adminNotes: 'Excellent Flutter resume. Ready for placement drives!',
    });

    await ReviewComment.create({
      resumeId: resume3._id,
      reviewerId: adminUser._id,
      reviewerName: 'Hardik Chauhan',
      reviewerRole: 'Placement Head - Surat',
      comment: 'Excellent project portfolio with Play Store link. Approved for placement drive interviews.',
      statusTag: 'Approved',
    });

    // 5. Student 4: Bhavik Shah (Motion & 3D Designer - Under Review)
    const user4 = await User.create({
      name: 'Bhavik Shah',
      email: 'bhavik.shah@rnwstudents.in',
      role: 'Student',
      studentId: 'RNW-2026-AN-405',
      branch: 'Surat - Varachha',
      course: '2D/3D Animation & VFX',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    });

    const profile4 = await StudentProfile.create({
      userId: user4._id,
      studentId: 'RNW-2026-AN-405',
      fullName: 'Bhavik Shah',
      displayName: 'Bhavik Shah',
      email: 'bhavik.shah@rnwstudents.in',
      mobileNumber: '+91 99099 33451',
      city: 'Surat',
      state: 'Gujarat',
      country: 'India',
      behanceUrl: 'https://behance.net/bhavik-3d',
      targetRole: '3D Animator & Visual Artist',
      professionalSummary: 'Passionate 3D Generalist and Motion Artist certified by Red & White Multimedia Institute. Experienced in Maya, Blender, After Effects, and cinematic camera rigging.',
      branch: 'Surat - Varachha',
      course: '2D/3D Animation & VFX',
      batch: '2025-2026 (Batch C)',
      completionPercentage: 82,
    });

    await Education.insertMany([
      {
        studentProfileId: profile4._id,
        qualification: 'Master in Animation & VFX Production',
        specialization: '3D Character Modeling & CGI Lighting',
        institute: 'Red & White Multimedia Institute',
        boardOrUniversity: 'Red & White Skill Education',
        startYear: '2025',
        endYear: '2026',
        isPursuing: true,
        gradeOrPercentage: 'Grade A',
        order: 1,
      },
    ]);

    await Skill.insertMany([
      { studentProfileId: profile4._id, category: 'UI/UX & Graphics', name: 'Autodesk Maya', proficiencyLevel: 'Advanced', order: 1 },
      { studentProfileId: profile4._id, category: 'UI/UX & Graphics', name: 'Blender 4.0', proficiencyLevel: 'Expert', order: 2 },
      { studentProfileId: profile4._id, category: 'UI/UX & Graphics', name: 'Adobe After Effects', proficiencyLevel: 'Advanced', order: 3 },
    ]);

    const resume4 = await ResumeDocument.create({
      studentProfileId: profile4._id,
      templateId: 'creative-rnw',
      accentColor: '#C8102E',
      fontFamily: 'Inter',
      status: 'Under Review',
      version: 1,
      submissionDate: new Date(Date.now() - 3600000 * 6),
    });

    console.log('Seeded database with Red & White students, resumes, and admin accounts!');
    if (standalone) {
      await mongoose.disconnect();
      console.log('Database disconnected cleanly.');
    }

    return {
      studentsCount: 4,
      resumesCount: 4,
      adminCount: 2,
    };
  } catch (error) {
    console.error('Seeding error:', error);
    if (standalone) process.exit(1);
    throw error;
  }
};

if (require.main === module) {
  seedDatabase(true);
}

module.exports = seedDatabase;
