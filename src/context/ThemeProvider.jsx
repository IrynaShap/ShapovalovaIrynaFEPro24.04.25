import React from 'react'
import ThemeContext from './ThemeContext.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('theme', false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const theme = React.useMemo(() => createTheme({
    palette: { mode: isDark ? 'dark' : 'light' }
  }), [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
