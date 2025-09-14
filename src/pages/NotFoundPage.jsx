import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext.jsx'

const NotFoundPage = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className={`rounded-lg shadow-lg p-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>404</h2>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Сторінку не знайдено</p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          На головну
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
