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
      </Routes>
    </Router>
  );
}

export default App;
