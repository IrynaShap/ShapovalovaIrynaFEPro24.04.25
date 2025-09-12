import React, { useState } from 'react'

const ErrorTester = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('Тестова помилка для Error Boundary!')
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
    >
      Тест Error Boundary
    </button>
  )
}

export default ErrorTester
