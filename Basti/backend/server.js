const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app', 'https://your-frontend-domain.netlify.app']
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/intern_volunteer_db';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Applicant Schema
const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['intern', 'volunteer']
  },
  skills: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    default: ''
  },
  motivation: {
    type: String,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Applicant = mongoose.model('Applicant', applicantSchema);

// Routes

// Get all applicants (Admin view)
app.get('/api/applicants', async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ appliedAt: -1 });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants', error: error.message });
  }
});

// Create new applicant
app.post('/api/applicants', async (req, res) => {
  try {
    const { name, email, phone, type, skills, experience, motivation } = req.body;
    
    // Check if email already exists
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newApplicant = new Applicant({
      name,
      email,
      phone,
      type,
      skills,
      experience,
      motivation
    });

    const savedApplicant = await newApplicant.save();
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      applicant: savedApplicant 
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating applicant', error: error.message });
  }
});

// Get applicant by ID
app.get('/api/applicants/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicant', error: error.message });
  }
});

// Delete applicant by ID
app.delete('/api/applicants/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting applicant', error: error.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
