import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../swapi/store.js'
import UrlInput from '../swapi/components/UrlInput.jsx'
import ResponseBlock from '../swapi/components/ResponseBlock.jsx'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const SwapiPage = () => {
  return (
    <Provider store={store}>
      <Container maxWidth={false} sx={{ mt: 5, px: { xs: 2, sm: 3, md: 6 } }}>
        <Typography variant="h4" gutterBottom>SWAPI</Typography>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <UrlInput />
            <ResponseBlock />
          </Stack>
        </Paper>
      </Container>
    </Provider>
  )
}

export default SwapiPage


