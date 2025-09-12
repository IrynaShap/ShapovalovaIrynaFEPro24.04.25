import React, { useState, useContext } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import ThemeContext from '../context/ThemeContext.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage'

const HomePage = () => {
  const { isDark } = useContext(ThemeContext)
  const [todos, setTodos] = useLocalStorage('todos', [
    { id: 1, text: 'Зробити SPA додаток', completed: true },
    { id: 2, text: 'Додати навігацію', completed: false },
    { id: 3, text: 'Додати перемикач теми', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-lg shadow-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          TODO Список
        </h2>

        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Додати завдання..."
              className={`flex-1 px-3 py-2 border rounded ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center space-x-1"
            >
              <Plus size={18} />
              <span>Додати</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className={`text-center py-8 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Немає завдань. Додайте перше завдання!
            </p>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center space-x-3 p-3 rounded ${
                  todo.completed
                    ? isDark ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'
                    : isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`p-1 rounded ${
                    todo.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-gray-400'
                  }`}
                >
                  {todo.completed && <Check size={14} />}
                </button>
                
                <span
                  className={`flex-1 ${
                    todo.completed 
                      ? 'line-through text-gray-500' 
                      : isDark ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
