import React, { useState } from 'react'
import Button from '@mui/material/Button'

const ErrorTester = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('Тестова помилка для Error Boundary!')
  }

  return (
    <Button variant="contained" color="error" onClick={() => setShouldThrow(true)}>
      Тест Error Boundary
    </Button>
  )
}

export default ErrorTester
