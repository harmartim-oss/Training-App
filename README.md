<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ontario Digital Defence Institute - Training Portal

A comprehensive cybersecurity training platform for the Ontario Certified Cyber Resilience Professional (OCRP) certification program, designed using **Bloom's Taxonomy** best practices for effective online learning.

## 🎯 Learning Design Philosophy

This training platform is built on evidence-based instructional design principles:

- **🏗️ Bloom's Taxonomy Framework**: All learning objectives are structured across six cognitive levels (Remember → Understand → Apply → Analyze → Evaluate → Create), ensuring progressive skill development from foundational knowledge to professional mastery.

- **📊 SMART Objectives**: Every learning objective includes a Condition (context), Action (measurable verb), and Criteria (performance standard), providing clear expectations and enabling self-assessment.

- **🎓 Course vs Lesson Objectives**: Distinction between broad course-level goals and specific lesson-level objectives that build cumulatively, with 6-8 lesson objectives supporting each course objective.

- **🧭 Aligned Assessment**: Quiz questions are tagged with Bloom's levels and mapped to specific objectives, ensuring comprehensive evaluation from recall to critical thinking.

- **📈 Progressive Complexity**: Content and assessments move systematically from lower-order thinking (knowledge, comprehension) to higher-order thinking (analysis, evaluation, creation).

**📖 [Read the Complete Bloom's Taxonomy Integration Guide](BLOOMS_TAXONOMY_GUIDE.md)**

## Features

### 🎓 Training Modules
- **Module 1**: Privacy Laws & Legal Framework (PIPEDA, MFIPPA, PHIPA, FIPPA)
- **Module 2**: Cybersecurity & Incident Response
- **Module 3**: AI Governance & Responsible Use
- **Module 4**: Secure Data & Records Management

### 📚 Sequential Learning System
- **Enforced Progression**: Users must complete modules in order
- **Content-First Approach**: Quiz unlocked only after viewing all module content
- **Final Exam Lockdown**: Assessment available only after completing all 4 modules
- **Progress Tracking**: Visual indicators show completion status and locked content

### 💎 Subscription Tiers
- **Basic ($49/month)**: Access to all 4 training modules with quizzes and certification
- **Premium ($149/year)**: Everything in Basic PLUS:
  - 15+ professional PDF resources (templates, checklists, guides)
  - All tools and practice exams
  - Advanced AI study assistant (unlimited)
  - CPD tracking (20 hours/year)
- **Enterprise ($899/year)**: Everything in Premium PLUS:
  - Multi-user access (up to 25 users)
  - Admin dashboard with analytics
  - User management capabilities
  - Business intelligence and revenue tracking
  - CPD tracking (25 hours/year)

### 📄 Professional Resources (Premium & Enterprise Only)
All resources in professionally formatted PDF:
- Privacy Impact Assessment (PIA) Checklist
- Breach Notification Templates
- PIPEDA vs MFIPPA Comparison Guide
- Consent Management Framework
- Incident Response Plan Template
- Risk Assessment Worksheet
- Security Controls Checklist
- Advanced Incident Response Playbook
- Algorithmic Impact Assessment (AIA) Template
- AI Bias Testing Checklist
- AI Transparency Documentation
- AI Governance Framework
- Data Classification Matrix
- Records Retention Schedule
- Microlearning Modules Guide

### 📝 Assessment System
- **60+ Questions**: 15 questions per module covering all key concepts
- **Proper Randomization**: Fisher-Yates shuffle algorithm ensures fair question distribution
- **Passing Score**: 80% required for certification
- **Randomized Options**: Answer choices are shuffled for each attempt
- **Sequential Access**: Must complete previous modules before accessing next

### 🔐 Authentication
- **Traditional Login**: Email and organization-based authentication
- **Social Login**: OAuth integration with Firebase
  - Google Sign-In ✅
  - Facebook Login ✅
  - Microsoft Authentication ✅
  - Instagram (coming soon)
- **Admin Access**: Secure admin portal accessible via /admin URL

### 📊 Enhanced Admin Dashboard
- **User Management**:
  - View all users with detailed profiles
  - Change user subscription tiers
  - Suspend/restore user access
  - Reset user progress
- **Business Analytics**:
  - Monthly Recurring Revenue (MRR) tracking
  - Average Revenue Per User (ARPU)
  - Premium conversion rates
  - User engagement patterns
  - Industry-specific insights
- **Completion Tracking**:
  - Module completion trends
  - Assessment pass rates
  - Average quiz scores
  - Drop-off rate analysis
- **User Patterns**:
  - Peak training times
  - Session duration analytics
  - Mobile vs Desktop usage
  - Organization type breakdown

### 🎯 Additional Features
- AI Study Assistant (powered by Google Gemini)
- Interactive learning elements with visual frameworks
- Tier-based access control with visual lock indicators
- Practice examinations
- Certificate generation
- Progress tracking with gamification
- Spaced repetition learning
- Mobile-responsive design
- Profile management

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables** (Optional):
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   - `GEMINI_API_KEY`: For AI Study Assistant (optional)
   - `VITE_FIREBASE_*`: For social login (optional)
   - `VITE_ADMIN_*`: For admin panel access (optional)

3. **Run the app**:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

## Configuration Guides

- **[Firebase OAuth Setup](FIREBASE_SETUP.md)**: Step-by-step guide to configure social login
- **[Admin Panel Setup](ADMIN_SETUP.md)**: Guide to accessing and using the admin dashboard

## Default Admin Credentials

⚠️ **Change these immediately in production!**
- **Email**: `admin@oddi.ca`
- **Password**: `admin123`

Access the admin panel at: `/admin` (note: no longer visible in header - direct URL access only)

## Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Firebase** - Authentication
- **Google Gemini** - AI Assistant

## Project Structure

```
Training-App/
├── components/
│   ├── training/          # Training portal components
│   │   ├── Login.tsx      # User authentication
│   │   ├── Dashboard.tsx  # User dashboard
│   │   ├── Assessment.tsx # Final assessment
│   │   ├── AdminLogin.tsx # Admin authentication
│   │   └── AdminDashboard.tsx # Admin panel
│   ├── common/            # Reusable components
│   └── icons.tsx          # Icon components
├── config/
│   ├── firebase.ts        # Firebase configuration
│   └── pricing.ts         # Subscription tiers
├── services/              # API services
├── hooks/                 # Custom React hooks
├── types.ts              # TypeScript definitions
└── index.css             # Global styles

```

## Assessment Question Pool

The assessment now includes **60 total questions**:
- **15 questions** from Module 1 (Privacy & Legal Framework)
- **15 questions** from Module 2 (Cybersecurity Fundamentals)
- **15 questions** from Module 3 (AI Governance & Ethics)
- **15 questions** from Module 4 (Data Management & Compliance)

Questions and answer options are properly randomized using the Fisher-Yates shuffle algorithm to ensure fairness.

## Security Features

- OAuth 2.0 authentication via Firebase
- Secure admin authentication (upgrade recommended for production)
- Input validation and sanitization
- HTTPS enforcement (production)
- Session management
- Activity logging (admin actions)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a training application for the Ontario Digital Defence Institute. For questions or contributions, please contact the development team.

## License

Apache-2.0

## Support

For technical issues or questions:
- Review the documentation files (FIREBASE_SETUP.md, ADMIN_SETUP.md)
- Check the browser console for errors
- Ensure all environment variables are properly configured

---

View the app in AI Studio: https://ai.studio/apps/drive/16S-RiCAskAmYTdzOJsJSC6w2_tJDZZAS
