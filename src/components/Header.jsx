import React, { useContext } from 'react'
import { Sun, Moon, Home, Phone, User } from 'lucide-react'
import ThemeContext from '../context/ThemeContext.jsx'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  const navItems = [
    { id: 'home', label: 'Головна', icon: Home },
    { id: 'contacts', label: 'Контакти', icon: Phone },
    { id: 'about', label: 'Про мене', icon: User }
  ]

  return (
    <header className={`shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            SPA Додаток
          </h1>
          
          <nav className="flex space-x-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavLink
                key={id}
                to={id === 'home' ? '/' : `/${id}`}
                className={({ isActive }) => `flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
