import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './RegistrationForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  type: 'intern' | 'volunteer' | '';
  skills: string;
  experience: string;
  motivation: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    type: '',
    skills: '',
    experience: '',
    motivation: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post(API_ENDPOINTS.applicants, formData);
      setMessage({ text: 'Application submitted successfully!', type: 'success' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: '',
        skills: '',
        experience: '',
        motivation: ''
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error submitting application. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-form">
      <div className="form-container">
        <h1>Apply for Internship or Volunteer Position</h1>
        <p className="form-description">
          Fill out the form below to apply for our internship or volunteer program. 
          All fields are required unless specified otherwise.
        </p>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Application Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select application type</option>
              <option value="intern">Internship</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills & Expertise *</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="List your relevant skills, technologies, and areas of expertise"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Previous Experience (Optional)</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe any relevant work experience, projects, or achievements"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivation">Why do you want to join us? *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              placeholder="Tell us about your motivation and what you hope to achieve"
              rows={4}
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
