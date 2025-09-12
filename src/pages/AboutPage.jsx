import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext.jsx'
import ErrorTester from '../components/ErrorTester.jsx'

const AboutPage = () => {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Про мене
        </h2>
        
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Привіт! 👋
          </h3>
          
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Я веб-розробник. Спеціалізуюся на React, JavaScript та сучасних веб-технологіях.
          </p>
          
          <h3 className={`text-lg font-semibold mt-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Навички
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            {['React', 'JavaScript', 'CSS', 'Node.js'].map(skill => (
              <div key={skill} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {skill}
                </span>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded ${
            isDark ? 'bg-yellow-900 bg-opacity-30' : 'bg-yellow-50'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              isDark ? 'text-yellow-200' : 'text-yellow-800'
            }`}>
              Тестування Error Boundary:
            </h4>
            <p className={`text-sm mb-3 ${
              isDark ? 'text-yellow-200' : 'text-yellow-700'
            }`}>
              Натисніть кнопку для тестування
            </p>
            <ErrorTester />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
