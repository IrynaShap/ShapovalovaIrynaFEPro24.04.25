import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext.jsx'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Footer = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <Box component="footer" sx={{ mt: 8, borderTop: 1, borderColor: 'divider' }}>
      <Container sx={{ py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Моє резюме</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="mailto:example@email.com">Email</Link>
          <Link href="tel:+380123456789">Phone</Link>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer


