import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorMode } from './theme/ColorModeProvider';
import MainPage from './pages/MainPage';
import HotelsPage from './pages/HotelsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          backdropFilter: 'blur(10px)',
          background: (t) => t.palette.mode === 'light'
            ? 'rgba(255,255,255,0.85)'
            : 'rgba(30,30,30,0.85)',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          mb: 2
        }}
      >
        <Toolbar sx={{ minHeight: 56 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Booking</Typography>
          <Button color="warning" variant="contained" size="small" component={Link} to="/">Home</Button>
          <Button sx={{ ml: 1 }} color="warning" variant="contained" size="small" component={Link} to="/about">About</Button>
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton sx={{ ml: 2 }} color="inherit" onClick={toggleColorMode} size="small">
              {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
      <Box component="footer" sx={{ mt: 6, py: 4, textAlign: 'center', borderTop: (t) => `1px solid ${t.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Booking Demo · Built with MUI</Typography>
      </Box>
    </>
  );
}

