import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 6 }}>
      <Paper variant="outlined" sx={{ p: 6 }}>
        <Typography variant="h2" gutterBottom>404</Typography>
        <Typography color="text.secondary">Сторінку не знайдено</Typography>
        <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 3 }}>
          На головну
        </Button>
      </Paper>
    </Container>
  )
}

export default NotFoundPage
