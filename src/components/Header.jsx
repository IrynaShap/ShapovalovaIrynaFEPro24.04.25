import React, { useContext } from 'react'
import { Sun, Moon, Home, Phone, User, ListChecks, Database } from 'lucide-react'
import ThemeContext from '../context/ThemeContext.jsx'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  const navItems = [
    { id: 'home', label: 'Головна', icon: Home },
    { id: 'todo', label: 'TODO', icon: ListChecks },
    { id: 'swapi', label: 'SWAPI', icon: Database },
    { id: 'contacts', label: 'Контакти', icon: Phone },
    { id: 'about', label: 'Про мене', icon: User }
  ]

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ maxWidth: 1440, mx: 'auto', width: '100%', px: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Резюме
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mr: 1 }}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              component={NavLink}
              to={id === 'home' ? '/' : `/${id}`}
              color="primary"
              startIcon={<Icon size={18} />}
            >
              {label}
            </Button>
          ))}
        </Stack>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
