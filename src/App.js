import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import HomePortal from './pages/HomePortal';
import AdminPanel from './pages/AdminPanel';
import Foro from './pages/Foro';
import ChatbotAssistant from './pages/ChatbotAssistant';
import Solicitudes from './pages/Solicitudes';
import Home from './pages/Home';
import Inicio from './pages/Inicio';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // UdeM blue
    },
    secondary: {
      main: '#c62828', // UdeM red
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/portal" element={<HomePortal />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/foro" element={<Foro />} />
            <Route path="/asistente" element={<ChatbotAssistant />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inicio" element={<Inicio />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 