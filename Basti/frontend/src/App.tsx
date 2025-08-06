import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import AdminView from './components/AdminView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
