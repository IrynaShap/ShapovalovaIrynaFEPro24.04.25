import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)

  const setValue = (value) => {
    setStoredValue(value)
  }

  return [storedValue, setValue]
}
