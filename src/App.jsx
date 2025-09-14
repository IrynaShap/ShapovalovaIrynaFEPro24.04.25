import ErrorBoundary from './components/ErrorBoundary.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import TodoPage from './pages/TodoPage.jsx'
import SwapiPage from './pages/SwapiPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Header />
      <Container maxWidth={false} sx={{ py: 5, px: { xs: 2, sm: 3, md: 6 } }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/swapi" element={<SwapiPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  </ErrorBoundary>
)

export default App