# Firebase OAuth Setup Guide

This guide explains how to configure Firebase authentication for social login (Google, Facebook, Microsoft).

## Prerequisites

- A Google account
- Access to Firebase Console (https://console.firebase.google.com)

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" or select an existing project
3. Follow the setup wizard to create your project

### 2. Enable Authentication Providers

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Google**: Click on Google, toggle Enable, and click Save
   - **Facebook**: 
     - Create a Facebook App at [Facebook Developers](https://developers.facebook.com)
     - Get your App ID and App Secret
     - Add them to Firebase Facebook provider settings
     - Add OAuth redirect URI from Firebase to your Facebook App settings
     - Note: Instagram login requires Facebook Login with Instagram permissions
   - **Microsoft**: 
     - Firebase supports Microsoft via OAuthProvider
     - You may need to register your app with Microsoft Azure AD
     - Configure OAuth redirect URIs
     - Get Client ID and configure in Firebase

### 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click on the **</>** (Web) icon to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object values

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration in `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. (Optional) Configure admin credentials:
   ```env
   VITE_ADMIN_EMAIL=admin@yourdomain.com
   VITE_ADMIN_PASSWORD=your_secure_password
   ```

### 5. Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your deployment domains (e.g., `localhost`, `yourdomain.com`)

### 6. Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login page and test each social login button
3. Verify that authentication works correctly

## Supported OAuth Providers

### ✅ Implemented
- **Google Sign-In**: Fully supported via Firebase GoogleAuthProvider
- **Facebook Login**: Fully supported via Firebase FacebookAuthProvider  
- **Microsoft Authentication**: Implemented via Firebase OAuthProvider

### 🔜 Coming Soon
- **Instagram**: Requires Facebook Login with Instagram permissions (Facebook Graph API)

## Security Best Practices

- **Never commit** `.env.local` to version control
- Use environment-specific Firebase projects (dev, staging, production)
- Rotate credentials regularly
- Enable Firebase Security Rules
- Monitor authentication usage in Firebase Console

## Troubleshooting

### Pop-up Blocked
If the login pop-up is blocked by the browser:
- Allow pop-ups for your domain
- Check browser settings and extensions

### Redirect URI Mismatch
- Verify that redirect URIs in your OAuth provider settings match Firebase configuration
- Common format: `https://your-project.firebaseapp.com/__/auth/handler`

### CORS Issues
- Ensure your domain is listed in Firebase Authorized Domains
- Check that your OAuth providers have the correct authorized domains

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Facebook Login Setup](https://firebase.google.com/docs/auth/web/facebook-login)
- [OAuth Providers](https://firebase.google.com/docs/auth/web/oauth)
