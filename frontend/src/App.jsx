import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './index.css';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { fetchTasks, createTask, updateTask, deleteTask } from './api.js';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded bg-white p-4 shadow">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded px-2 py-1 text-sm">✕</button>
        </div>
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const isEditing = useMemo(() => Boolean(editingTask && (editingTask._id || editingTask.id)), [editingTask]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTasks();
        setItems(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleCreate(values) {
    try {
      const created = await createTask(values);
      setItems((prev) => [created, ...prev]);
      setEditingTask(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleUpdate(values) {
    if (!editingTask) return;
    const id = editingTask._id || editingTask.id;
    try {
      const updated = await updateTask(id, values);
      setItems((prev) => prev.map((it) => ((it._id || it.id) === id ? updated : it)));
      setEditingTask(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setItems((prev) => prev.filter((it) => (it._id || it.id) !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 p-6 text-white shadow">
        <h1 className="text-center text-3xl font-extrabold tracking-tight drop-shadow">Список завдань</h1>
      </div>
      {error ? (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800">{error}</div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-800">{isEditing ? 'Редагувати завдання' : 'Створити завдання'}</h2>
          <div className="my-3 h-px w-full bg-slate-200" />
          <TaskForm
            initialTask={editingTask}
            onSubmit={isEditing ? handleUpdate : handleCreate}
            onCancel={() => setEditingTask(null)}
          />
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-800">Завдання</h2>
          <div className="my-3 h-px w-full bg-slate-200" />
          {loading ? (
            <p className="text-slate-600">Завантаження...</p>
          ) : (
            <TaskList
              items={items}
              onView={(item) => setViewingTask(item)}
              onEdit={(item) => setEditingTask(item)}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>

      <Modal
        isOpen={Boolean(viewingTask)}
        onClose={() => setViewingTask(null)}
        title={viewingTask?.title}
      >
        {viewingTask?.description}
      </Modal>
    </main>
  );
}
