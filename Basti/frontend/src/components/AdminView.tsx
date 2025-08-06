import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './AdminView.css';

interface Applicant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: 'intern' | 'volunteer';
  skills: string;
  experience: string;
  motivation: string;
  appliedAt: string;
}

const AdminView: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'intern' | 'volunteer'>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINTS.applicants);
      setApplicants(response.data);
      setError('');
    } catch (error: any) {
      setError('Failed to fetch applicants. Please ensure the backend server is running.');
      console.error('Error fetching applicants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApplicant = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this applicant?')) {
      try {
        await axios.delete(`${API_ENDPOINTS.applicants}/${id}`);
        setApplicants(prev => prev.filter(applicant => applicant._id !== id));
        if (selectedApplicant && selectedApplicant._id === id) {
          setSelectedApplicant(null);
        }
      } catch (error) {
        alert('Failed to delete applicant');
      }
    }
  };

  const filteredApplicants = applicants.filter(applicant => 
    filter === 'all' || applicant.type === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="admin-view">
        <div className="loading">Loading applicants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-view">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchApplicants} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-view">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage intern and volunteer applications</p>
      </div>

      <div className="admin-controls">
        <div className="filter-controls">
          <label htmlFor="filter">Filter by type:</label>
          <select 
            id="filter"
            value={filter} 
            onChange={(e) => setFilter(e.target.value as 'all' | 'intern' | 'volunteer')}
          >
            <option value="all">All Applications ({applicants.length})</option>
            <option value="intern">Internships ({applicants.filter(a => a.type === 'intern').length})</option>
            <option value="volunteer">Volunteers ({applicants.filter(a => a.type === 'volunteer').length})</option>
          </select>
        </div>
        <button onClick={fetchApplicants} className="refresh-button">
          Refresh
        </button>
      </div>

      <div className="admin-content">
        <div className="applicants-list">
          <h2>Applications ({filteredApplicants.length})</h2>
          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <p>No applications found.</p>
            </div>
          ) : (
            <div className="applicants-grid">
              {filteredApplicants.map((applicant) => (
                <div 
                  key={applicant._id} 
                  className={`applicant-card ${selectedApplicant?._id === applicant._id ? 'selected' : ''}`}
                  onClick={() => setSelectedApplicant(applicant)}
                >
                  <div className="applicant-header">
                    <h3>{applicant.name}</h3>
                    <span className={`type-badge ${applicant.type}`}>
                      {applicant.type}
                    </span>
                  </div>
                  <div className="applicant-info">
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Phone:</strong> {applicant.phone}</p>
                    <p><strong>Applied:</strong> {formatDate(applicant.appliedAt)}</p>
                  </div>
                  <div className="applicant-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApplicant(applicant);
                      }}
                      className="view-button"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteApplicant(applicant._id);
                      }}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedApplicant && (
          <div className="applicant-details">
            <div className="details-header">
              <h2>Application Details</h2>
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="close-button"
              >
                ×
              </button>
            </div>
            <div className="details-content">
              <div className="detail-group">
                <label>Name:</label>
                <p>{selectedApplicant.name}</p>
              </div>
              <div className="detail-group">
                <label>Email:</label>
                <p>{selectedApplicant.email}</p>
              </div>
              <div className="detail-group">
                <label>Phone:</label>
                <p>{selectedApplicant.phone}</p>
              </div>
              <div className="detail-group">
                <label>Type:</label>
                <p className={`type-text ${selectedApplicant.type}`}>
                  {selectedApplicant.type}
                </p>
              </div>
              <div className="detail-group">
                <label>Skills & Expertise:</label>
                <p>{selectedApplicant.skills}</p>
              </div>
              <div className="detail-group">
                <label>Previous Experience:</label>
                <p>{selectedApplicant.experience || 'Not provided'}</p>
              </div>
              <div className="detail-group">
                <label>Motivation:</label>
                <p>{selectedApplicant.motivation}</p>
              </div>
              <div className="detail-group">
                <label>Applied At:</label>
                <p>{formatDate(selectedApplicant.appliedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
