import React from 'react'
import { useState } from 'react'
import ThemeContext from './ThemeContext.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('theme', false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
