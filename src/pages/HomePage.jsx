import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext.jsx'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

const HomePage = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <Container maxWidth={false} sx={{ mt: 5, px: { xs: 2, sm: 3, md: 6 } }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom>Привіт, я Frontend Developer</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Пишу сучасні веб-додатки на React. Люблю чистий код, доступність та продуктивність.
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>Навички</Typography>
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          {['React', 'Redux', 'TypeScript', 'MUI', 'Vite', 'REST API'].map((s) => (
            <Grid item key={s}>
              <Chip label={s} color="primary" variant="outlined" />
            </Grid>
          ))}
        </Grid>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography color="text.secondary">
            Перегляньте сторінку TODO та SWAPI у меню, щоб побачити демо-функціонал.
          </Typography>
        </Paper>
      </Paper>
    </Container>
  )
}

export default HomePage
