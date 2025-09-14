import React, { useEffect, useMemo, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../todo/store/index.js'
import {
  loadTasksRequest,
  addTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  toggleTaskRequest,
  clearCompletedRequest,
} from '../todo/store/tasksSlice.js'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'

function TodoContent() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((s) => s.tasks)
  const [editingTask, setEditingTask] = useState(null)
  const [viewingTask, setViewingTask] = useState(null)
  const isEditing = useMemo(() => Boolean(editingTask && (editingTask._id || editingTask.id)), [editingTask])

  useEffect(() => { dispatch(loadTasksRequest()) }, [])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (isEditing) {
      const id = editingTask._id || editingTask.id
      dispatch(updateTaskRequest({ id, values: { title, description } }))
    } else {
      dispatch(addTaskRequest({ title, description }))
    }
    setEditingTask(null)
    setTitle('')
    setDescription('')
  }

  return (
    <Container maxWidth={false} sx={{ py: 6, px: { xs: 2, sm: 3, md: 6 } }}>
      <Grid container spacing={6} justifyContent={'center'}>
        <Grid item width={'30%'}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>{isEditing ? 'Редагувати завдання' : 'Створити завдання'}</Typography>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField size="medium" label="Назва" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
              <TextField size="medium" label="Опис" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={5} />
              <Stack direction="row" spacing={1.5}>
                <Button size="large" variant="contained" onClick={handleSubmit}>{isEditing ? 'Оновити' : 'Зберегти'}</Button>
                {isEditing && <Button size="large" variant="outlined" onClick={() => setEditingTask(null)}>Скасувати</Button>}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item width={'60%'}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>Завдання</Typography>
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              {loading ? (
                <Typography color="text.secondary">Завантаження...</Typography>
              ) : items.map((item) => {
                const id = item._id || item.id
                return (
                  <Paper key={id} variant="outlined" sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, mr: 2, flex: 1 }}>
                      <Checkbox checked={Boolean(item.completed)} onChange={() => dispatch(toggleTaskRequest(id))} />
                      <Typography sx={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                        {item.title}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
                      <Button variant="outlined" onClick={() => setViewingTask(item)}>View</Button>
                      <Button variant="outlined" onClick={() => { setEditingTask(item); setTitle(item.title || ''); setDescription(item.description || '') }}>Edit</Button>
                      <Button variant="outlined" color="error" onClick={() => dispatch(deleteTaskRequest(id))}>Delete</Button>
                    </Stack>
                  </Paper>
                )
              })}
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                <Button size="large" variant="contained" color="inherit" onClick={() => dispatch(clearCompletedRequest())}>Очистити виконані</Button>
              </Stack>
              {error && <Typography color="error">{error}</Typography>}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={Boolean(viewingTask)} onClose={() => setViewingTask(null)} fullWidth maxWidth="sm">
        <DialogTitle>{viewingTask?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography>{viewingTask?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewingTask(null)}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default function TodoPage() {
  return (
    <Provider store={store}>
      <TodoContent />
    </Provider>
  )
}


