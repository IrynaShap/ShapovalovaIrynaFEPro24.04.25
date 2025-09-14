import React from 'react'
import ErrorTester from '../components/ErrorTester.jsx'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const AboutPage = () => {
  return (
    <Container maxWidth={false} sx={{ mt: 5, px: { xs: 2, sm: 3, md: 6 } }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>Про мене</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Я веб-розробник. Спеціалізуюся на React, JavaScript та сучасних веб-технологіях.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>Навички</Typography>
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {['React', 'JavaScript', 'CSS', 'Node.js'].map(skill => (
            <Grid item key={skill}><Typography variant="body2">• {skill}</Typography></Grid>
          ))}
        </Grid>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.50' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Тестування Error Boundary:</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Натисніть кнопку для тестування
          </Typography>
          <ErrorTester />
        </Paper>
      </Paper>
    </Container>
  )
}

export default AboutPage
