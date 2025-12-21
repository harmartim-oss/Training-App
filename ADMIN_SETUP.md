# Admin Panel Setup Guide

This guide explains how to access and use the Admin Panel for the Ontario Digital Defence Institute Training Portal.

## Accessing the Admin Panel

### Method 1: Via URL
Navigate directly to the admin login page:
- Local development: `http://localhost:3000/admin`
- Production: `https://yourdomain.com/admin`

### Method 2: Via Landing Page
Click the "Admin" link in the header of the landing page (if visible).

## Default Admin Credentials

**⚠️ IMPORTANT: Change these credentials immediately after first login!**

- **Email**: `admin@oddi.ca`
- **Password**: `admin123`

## Configuring Admin Credentials

For production environments, set custom admin credentials via environment variables:

1. Open or create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Set your custom admin credentials:
   ```env
   VITE_ADMIN_EMAIL=your-admin-email@domain.com
   VITE_ADMIN_PASSWORD=your-secure-password
   ```

3. Restart the development server to apply changes

## Admin Dashboard Features

### Overview Tab
View key metrics and statistics:
- **Total Users**: Number of registered users
- **Completed Assessments**: Users who finished the final assessment
- **Pass Rate**: Percentage of users who passed (≥80%)
- **Average Score**: Mean score across all completed assessments

Additional insights:
- Module completion rates across all users
- Subscription tier distribution
- Organization type breakdown

### Users Tab
Manage and view detailed user information:
- View all registered users in a table format
- See user details:
  - Name and email
  - Organization information
  - Subscription tier
  - Module completion progress
  - Assessment status and score
- Click "View Details" to see complete user profile and progress

### Analytics Tab
Advanced analytics and reporting (coming soon):
- Detailed learning analytics
- Time-based trends
- Module-specific performance metrics
- Custom report generation

## User Data Management

### Data Sources
The admin panel currently reads from:
- Browser localStorage (development/demo mode)
- In production, this should be connected to a backend database

### User Progress Tracking
For each user, the admin can view:
- **Module Progress**: Completion status and scores for Modules 1-4
- **Assessment Results**: Final assessment score and pass/fail status
- **Registration Info**: Sign-up date and organization details
- **Subscription Details**: Current tier and features

## Security Considerations

### Production Deployment

1. **Replace Simple Authentication**
   - The current admin authentication is for demo purposes
   - Implement proper backend authentication with JWT tokens
   - Use secure password hashing (bcrypt, argon2)
   - Implement rate limiting on login attempts

2. **Database Integration**
   - Connect to a secure backend database (PostgreSQL, MongoDB, etc.)
   - Implement proper API security (authentication, authorization)
   - Use environment variables for database credentials

3. **Access Control**
   - Implement role-based access control (RBAC)
   - Add audit logging for admin actions
   - Set up monitoring and alerting

4. **Security Best Practices**
   - Use HTTPS in production
   - Implement CSRF protection
   - Add session timeout/expiry
   - Enable two-factor authentication (2FA)

### Recommended Security Improvements

```javascript
// Example: Implement proper password hashing
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(plainPassword, 12);
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

```javascript
// Example: Implement JWT authentication
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { email: adminEmail, role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
```

## Future Enhancements

Planned features for the admin panel:
- [ ] Export user data and reports (CSV, PDF)
- [ ] Bulk user management operations
- [ ] Email notification system
- [ ] Content management (edit modules, questions)
- [ ] Custom analytics dashboards
- [ ] User communication tools
- [ ] Certificate management
- [ ] Advanced filtering and search
- [ ] Real-time updates via WebSockets

## Troubleshooting

### Cannot Login
- Verify credentials in `.env.local` match your input
- Check browser console for errors
- Ensure server is running

### No User Data Visible
- Make sure at least one user has registered and completed training
- Check localStorage for development mode
- Verify database connection in production

### Styling Issues
- Clear browser cache
- Rebuild the application: `npm run build`
- Check for console errors

## Support

For issues or feature requests:
- Check the main README.md file
- Review the codebase documentation
- Contact the development team

## License

This admin panel is part of the Ontario Digital Defence Institute Training App.
Licensed under Apache-2.0.
