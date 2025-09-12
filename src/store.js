import { configureStore, createSlice, nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      { id: nanoid(), title: 'Redux' },
      { id: nanoid(), title: 'React' },
      { id: nanoid(), title: 'JS' },
    ],
  },
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(title) {
        return { payload: { id: nanoid(), title } }
      },
    },
  },
})

export const { addTodo } = todosSlice.actions

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
})


