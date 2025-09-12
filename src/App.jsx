import React, { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'contacts':
        return <ContactsPage />
      case 'about':
        return <AboutPage />
      default:
        return <HomePage />
    }
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-8">
          {renderPage()}
        </main>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App