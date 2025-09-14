import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasksRequest(state) {
      state.loading = true
      state.error = ''
    },
    loadTasksSuccess(state, action) {
      state.items = action.payload
      state.loading = false
    },
    loadTasksFailure(state, action) {
      state.loading = false
      state.error = action.payload || 'Failed to load tasks'
    },

    addTaskRequest(state) {
      state.error = ''
    },
    addTaskSuccess(state, action) {
      state.items.unshift(action.payload)
    },
    addTaskFailure(state, action) {
      state.error = action.payload || 'Failed to add task'
    },

    updateTaskRequest(state) {
      state.error = ''
    },
    updateTaskSuccess(state, action) {
      const updated = action.payload
      const id = updated._id || updated.id
      state.items = state.items.map(it => ((it._id || it.id) === id ? updated : it))
    },
    updateTaskFailure(state, action) {
      state.error = action.payload || 'Failed to update task'
    },

    deleteTaskRequest(state) {
      state.error = ''
    },
    deleteTaskSuccess(state, action) {
      const id = action.payload
      state.items = state.items.filter(it => (it._id || it.id) !== id)
    },
    deleteTaskFailure(state, action) {
      state.error = action.payload || 'Failed to delete task'
    },

    toggleTaskRequest(state) {
      state.error = ''
    },
    toggleTaskSuccess(state, action) {
      const updated = action.payload
      const id = updated._id || updated.id
      state.items = state.items.map(it => ((it._id || it.id) === id ? updated : it))
    },
    toggleTaskFailure(state, action) {
      state.error = action.payload || 'Failed to toggle task'
    },

    clearCompletedRequest(state) {
      state.error = ''
      state.loading = true
    },
    clearCompletedSuccess(state) {
      state.items = state.items.filter(it => !it.completed)
      state.loading = false
    },
    clearCompletedFailure(state, action) {
      state.error = action.payload || 'Failed to clear completed tasks'
      state.loading = false
    },
  }
})

export const {
  loadTasksRequest,
  loadTasksSuccess,
  loadTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  toggleTaskRequest,
  toggleTaskSuccess,
  toggleTaskFailure,
  clearCompletedRequest,
  clearCompletedSuccess,
  clearCompletedFailure,
} = tasksSlice.actions

export default tasksSlice.reducer


