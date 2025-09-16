import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'light' });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('color-mode');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    try { window.localStorage.setItem('color-mode', mode); } catch {}
  }, [mode]);

  const toggleColorMode = useCallback(() => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
      warning: { main: '#f57c00' },
      background: {
        default: mode === 'light' ? '#f7f9fb' : '#14181c',
        paper: mode === 'light' ? '#ffffff' : '#1f2429'
      },
      divider: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'
    },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      h3: { fontWeight: 700 },
      h5: { fontWeight: 600 }
    },
    shape: { borderRadius: 14 },
    shadows: [
      'none',
      '0px 1px 2px rgba(0,0,0,0.08)',
      '0px 1px 4px rgba(0,0,0,0.10)',
      '0px 2px 8px rgba(0,0,0,0.12)',
      '0px 4px 12px rgba(0,0,0,0.14)',
      ...Array(20).fill('0px 4px 16px rgba(0,0,0,0.16)')
    ],
    components: {
      MuiPaper: { styleOverrides: { root: { transition: 'background-color .25s, border-color .25s' } } },
      MuiAppBar: { styleOverrides: { root: { transition: 'background-color .25s, color .25s' } } },
      MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 500 } } }
    }
  }), [mode]);

  const value = useMemo(() => ({ toggleColorMode, mode }), [toggleColorMode, mode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
