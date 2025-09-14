import ErrorBoundary from './components/ErrorBoundary.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App