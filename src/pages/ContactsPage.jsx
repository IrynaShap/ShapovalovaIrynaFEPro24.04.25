import React, { useContext } from 'react'
import { Phone } from 'lucide-react'
import ThemeContext from '../context/ThemeContext.jsx'

const ContactsPage = () => {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Контакти
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-500" size={20} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              +380 (123) 456-78-90
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              example@email.com
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Одеса, Україна
            </span>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ContactsPage
