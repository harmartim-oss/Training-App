<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ontario Digital Defence Institute - Training Portal

A comprehensive cybersecurity training platform for the Ontario Certified Cyber Resilience Professional (OCRP) certification program.

## Features

### 🎓 Training Modules
- **Module 1**: Privacy Laws & Legal Framework (PIPEDA, MFIPPA, PHIPA, FIPPA)
- **Module 2**: Cybersecurity & Incident Response
- **Module 3**: AI Governance & Responsible Use
- **Module 4**: Secure Data & Records Management

### 📝 Assessment System
- **60+ Questions**: 15 questions per module covering all key concepts
- **Proper Randomization**: Fisher-Yates shuffle algorithm ensures fair question distribution
- **Passing Score**: 80% required for certification
- **Randomized Options**: Answer choices are shuffled for each attempt

### 🔐 Authentication
- **Traditional Login**: Email and organization-based authentication
- **Social Login**: OAuth integration with Firebase
  - Google Sign-In
  - Facebook Login
  - LinkedIn Authentication
  - Instagram (coming soon)
- **Admin Access**: Secure admin portal for platform management

### 📊 Admin Dashboard
- **User Analytics**: Track user progress, completion rates, and scores
- **Module Statistics**: View completion rates across all modules
- **Organization Insights**: Breakdown by organization type and subscription tier
- **User Management**: View detailed user profiles and progress
- **Real-time Metrics**: Monitor platform usage and performance

### 🎯 Additional Features
- AI Study Assistant (powered by Google Gemini)
- Interactive learning elements
- Downloadable resources
- Practice examinations
- Certificate generation
- Progress tracking with gamification
- Spaced repetition learning
- Mobile-responsive design

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

Access the admin panel at: `/admin` or click "Admin" in the header

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
