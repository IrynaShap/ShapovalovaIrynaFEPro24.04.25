import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addTodo } from './store.js'

function App() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.todos.items)
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    dispatch(addTodo(trimmed))
    setTitle('')
  }

  return (
    <div className="min-h-screen bg-cyan-200 text-slate-900">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">TODO</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Нове завдання..."
            className="flex-1 rounded-lg border border-slate-300 bg-white/90 px-4 py-3 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-sky-500 px-5 py-3 text-white text-lg font-semibold shadow hover:bg-sky-600 active:translate-y-px"
          >
            Додати
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-3">TODOS</h2>
        <ul className="space-y-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="rounded-lg border border-amber-300 bg-amber-100 px-4 py-3 text-lg shadow-sm"
            >
              {t.title}
            </li>
          ))}
        </ul>

        <footer className="mt-6 text-slate-700">Всього: {items.length}</footer>
      </div>
    </div>
  )
}

export default App
