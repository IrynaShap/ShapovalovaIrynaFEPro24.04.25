import axios from 'axios'
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  baseUrl: 'https://www.swapi.tech/api/',
  endpoint: 'people/1',
  loading: false,
  data: null,
  error: null,
}

export const fetchSwapi = createAsyncThunk('swapi/fetch', async (_arg, thunkApi) => {
  try {
    const state = thunkApi.getState()
    const { baseUrl, endpoint } = state.swapi
    const url = `${baseUrl}${endpoint}`.replace(/\/+$/, '')
    const response = await axios.get(url)
    const contentType = response?.headers?.['content-type'] || ''
    const isJson = contentType.includes('application/json') || (response?.data !== null && typeof response?.data === 'object')
    if (!isJson) {
      return thunkApi.rejectWithValue('Response is not JSON')
    }
    return response.data
  } catch (error) {
    const message = error?.response?.data || error?.message || 'Unknown error'
    return thunkApi.rejectWithValue(message)
  }
})

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    setEndpoint(state, action) {
      state.endpoint = action.payload
    },
    clear(state) {
      state.loading = false
      state.data = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwapi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSwapi.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchSwapi.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unknown error'
      })
  },
})

export const { setEndpoint, clear: clearSwapi } = swapiSlice.actions

export const store = configureStore({
  reducer: {
    swapi: swapiSlice.reducer,
  },
})


