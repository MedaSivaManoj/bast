# Intern/Volunteer Registration Web App

A full-stack MERN application for managing intern and volunteer applications with a clean, responsive interface.

## Features

- **Home Page**: Informative landing page with program details and call-to-action
- **Registration Form**: Comprehensive application form for interns and volunteers
- **Admin Dashboard**: View, filter, and manage all applications
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: MongoDB integration with instant updates

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **CSS3** with modern styling and animations

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Environment variable** support

## Project Structure

```
Basti/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Home.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   └── AdminView.tsx
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # React entry point
│   └── package.json       # Frontend dependencies
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/applicants` | Get all applicants |
| POST | `/api/applicants` | Create new application |
| GET | `/api/applicants/:id` | Get specific applicant |
| DELETE | `/api/applicants/:id` | Delete applicant |

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\sivam\OneDrive\Desktop\Temp projects\Basti"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB**
   - Install MongoDB locally, or
   - Create a MongoDB Atlas account and get connection string
   - Update the `MONGO_URI` in `backend/.env` if needed

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Application will open at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/intern_volunteer_db
```

## Usage

### For Applicants
1. Visit the home page to learn about the programs
2. Click "Apply Now" or navigate to the registration form
3. Fill out the comprehensive application form
4. Submit your application

### For Administrators
1. Navigate to the Admin View
2. View all applications in a filterable list
3. Click on any application to see detailed information
4. Filter applications by type (All, Intern, Volunteer)
5. Delete applications if necessary

## Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Database Schema

**Applicant Model:**
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  type: String (required, enum: ['intern', 'volunteer']),
  skills: String (required),
  experience: String (optional),
  motivation: String (required),
  appliedAt: Date (auto-generated)
}
```

## Features in Detail

### Registration Form
- Form validation with required fields
- Email uniqueness checking
- Support for both intern and volunteer applications
- Success/error messaging
- Mobile-responsive design

### Admin Dashboard
- Real-time application viewing
- Filter by application type
- Detailed view of each application
- Delete functionality with confirmation
- Responsive grid layout

### Home Page
- Modern hero section with gradient background
- Feature cards highlighting program benefits
- Detailed program information
- Call-to-action buttons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- User authentication for admin access
- Email notifications for new applications
- Application status tracking (pending, approved, rejected)
- Export applications to CSV/PDF
- Search functionality in admin view
- Application editing capability
- File upload for resumes/portfolios

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
