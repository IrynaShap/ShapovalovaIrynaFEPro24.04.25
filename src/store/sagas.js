import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  loadTasksRequest, loadTasksSuccess, loadTasksFailure,
  addTaskRequest, addTaskSuccess, addTaskFailure,
  updateTaskRequest, updateTaskSuccess, updateTaskFailure,
  deleteTaskRequest, deleteTaskSuccess, deleteTaskFailure,
  toggleTaskRequest, toggleTaskSuccess, toggleTaskFailure,
  clearCompletedRequest, clearCompletedSuccess, clearCompletedFailure,
} from './tasksSlice'

const API_BASE_URL = '/api/items'

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || 'Request failed')
  }
  return response.json()
}

function* loadTasksSaga() {
  try {
    const res = yield call(fetch, API_BASE_URL)
    const data = yield call(handleResponse, res)
    yield put(loadTasksSuccess(data))
  } catch (e) {
    yield put(loadTasksFailure(e.message))
  }
}

function* addTaskSaga(action) {
  try {
    const body = JSON.stringify({ title: action.payload.title, description: action.payload.description, completed: false })
    const res = yield call(fetch, API_BASE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    const created = yield call(handleResponse, res)
    yield put(addTaskSuccess(created))
  } catch (e) {
    yield put(addTaskFailure(e.message))
  }
}

function* updateTaskSaga(action) {
  try {
    const { id, values } = action.payload
    const res = yield call(fetch, `${API_BASE_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    const updated = yield call(handleResponse, res)
    yield put(updateTaskSuccess(updated))
  } catch (e) {
    yield put(updateTaskFailure(e.message))
  }
}

function* deleteTaskSaga(action) {
  try {
    const id = action.payload
    const res = yield call(fetch, `${API_BASE_URL}/${id}`, { method: 'DELETE' })
    yield call(handleResponse, res)
    yield put(deleteTaskSuccess(id))
  } catch (e) {
    yield put(deleteTaskFailure(e.message))
  }
}

function* toggleTaskSaga(action) {
  try {
    const id = action.payload
    const item = yield select(state => state.tasks.items.find(it => (it._id || it.id) === id))
    if (!item) throw new Error('Task not found')
    const res = yield call(fetch, `${API_BASE_URL}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !item.completed }) })
    const updated = yield call(handleResponse, res)
    yield put(toggleTaskSuccess(updated))
  } catch (e) {
    yield put(toggleTaskFailure(e.message))
  }
}

function* clearCompletedSaga() {
  try {
    const completed = yield select(state => state.tasks.items.filter(it => it.completed))
    for (const it of completed) {
      yield call(fetch, `${API_BASE_URL}/${it._id || it.id}`, { method: 'DELETE' })
    }
    yield put(clearCompletedSuccess())
  } catch (e) {
    yield put(clearCompletedFailure(e.message))
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(loadTasksRequest.type, loadTasksSaga),
    takeLatest(addTaskRequest.type, addTaskSaga),
    takeLatest(updateTaskRequest.type, updateTaskSaga),
    takeLatest(deleteTaskRequest.type, deleteTaskSaga),
    takeLatest(toggleTaskRequest.type, toggleTaskSaga),
    takeLatest(clearCompletedRequest.type, clearCompletedSaga),
  ])
}


