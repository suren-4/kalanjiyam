import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';
import './App.css';
import UploadPage from './components/UploadPage/UploadPage';
import Explorepage from './components/ExplorePage/Explorepage';
import ArtifactDetailPage from './components/Artifactdetails/ArtifactDetailPage';
<<<<<<< HEAD
import LocationPage from './components/LocationPage/LocationPage';
import Membership from './components/Membership/Membership';
import MuseumPartnership from './components/MuseumPartnership/MuseumPartnership';

// Simplified BookingConfirmation component
const BookingConfirmation = () => {
  return (
    <div className="confirmation-container" style={{
      minHeight: '100vh',
      backgroundColor: '#f5f2ed',
      padding: '4rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="confirmation-card" style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
        maxWidth: '700px',
        width: '100%'
      }}>
        <div className="confirmation-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="success-icon" style={{
            background: '#4CAF50',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1.5rem'
          }}>✓</div>
          <h1 style={{ color: '#8B6B4E', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
          <p>Your tickets have been booked successfully.</p>
        </div>
        
        <div className="booking-details" style={{ marginBottom: '2rem' }}>
          <div className="booking-id" style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            background: '#f5f2ed',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}>
            <span>Booking Reference:</span>
            <span>KAL-2023-12345</span>
          </div>
          
          <div className="ticket-info">
            <div style={{ fontSize: '1.5rem', color: '#8B6B4E', marginBottom: '0.5rem' }}>
              National Museum of India
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              Saturday, December 30, 2023
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#555' }}>
              2 × Regular Admission
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#8B6B4E', marginTop: '0.5rem' }}>
              ₹500.00
            </div>
          </div>
        </div>
        
        <div className="confirmation-actions" style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <button style={{
            flex: '1',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '8px',
            background: '#8B6B4E',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Print Tickets
          </button>
          <button style={{
            flex: '1',
            padding: '0.8rem',
            background: '#f5f2ed',
            color: '#8B6B4E',
            border: '1px solid #8B6B4E',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Explore More Museums
          </button>
        </div>
        
        <div className="confirmation-footer" style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem',
          borderTop: '1px solid #eee',
          paddingTop: '1.5rem'
        }}>
          <p>A confirmation email has been sent to your registered email address.</p>
          <p>Need help? <a href="#" style={{ color: '#8B6B4E', textDecoration: 'none' }}>Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};
=======
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadpage" element={<UploadPage />} />
        <Route path="/explore" element={<Explorepage />} />
        <Route path="/artifact/:id" element={<ArtifactDetailPage />} />
<<<<<<< HEAD
        <Route path="/location/:location" element={<LocationPage />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/museums" element={<MuseumPartnership />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
=======
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
      </Routes>
    </Router>
  );
}

export default App;
