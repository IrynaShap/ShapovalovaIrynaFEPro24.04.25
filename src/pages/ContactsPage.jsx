import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import PlaceIcon from '@mui/icons-material/Place'

const ContactsPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Контакти</Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon color="primary" />
            <Typography color="text.secondary">+380 (123) 456-78-90</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon color="primary" />
            <Typography color="text.secondary">example@email.com</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PlaceIcon color="primary" />
            <Typography color="text.secondary">Одеса, Україна</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export default ContactsPage
