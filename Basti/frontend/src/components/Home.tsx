import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Intern & Volunteer Program</h1>
          <p className="hero-description">
            Join our dynamic team and gain valuable experience while making a meaningful impact. 
            We offer opportunities for both interns and volunteers to grow their skills and contribute 
            to exciting projects.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Apply Now
            </Link>
            <a href="#learn-more" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <section id="learn-more" className="info-section">
        <div className="container">
          <h2>Why Join Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎯 Real Experience</h3>
              <p>Work on actual projects that make a difference and gain hands-on experience in your field.</p>
            </div>
            <div className="feature-card">
              <h3>🌱 Professional Growth</h3>
              <p>Develop your skills with mentorship from experienced professionals and industry experts.</p>
            </div>
            <div className="feature-card">
              <h3>🤝 Networking</h3>
              <p>Build valuable connections with peers and professionals in your area of interest.</p>
            </div>
            <div className="feature-card">
              <h3>🎓 Learning Opportunities</h3>
              <p>Access workshops, training sessions, and resources to enhance your knowledge and skills.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <div className="container">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <h3>Internship Program</h3>
              <p>
                Our internship program offers students and recent graduates the opportunity to gain 
                professional experience in their field of study. Interns work closely with our team 
                on meaningful projects and receive mentorship throughout their journey.
              </p>
              <ul>
                <li>Duration: 3-6 months</li>
                <li>Part-time or full-time options</li>
                <li>Mentorship included</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
            <div className="program-card">
              <h3>Volunteer Program</h3>
              <p>
                Join our volunteer program to contribute to meaningful causes while developing new skills 
                and meeting like-minded individuals. Volunteers can choose from various projects based 
                on their interests and availability.
              </p>
              <ul>
                <li>Flexible scheduling</li>
                <li>Various project options</li>
                <li>Community impact</li>
                <li>Recognition for contributions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
