import React from 'react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', width: '100%' }}>
            <WarningAmberIcon color="error" sx={{ fontSize: 56, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Щось пішло не так</Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>Перезавантажити</Button>
          </Paper>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
