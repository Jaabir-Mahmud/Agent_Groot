import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatLayout from './components/chat/ChatLayout';
import './App.css';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatLayout />} />
            <Route path="/groot" element={<ChatLayout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
