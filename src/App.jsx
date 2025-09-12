import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './store.js'

function App() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-slate-100 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">Value: {value}</h1>
          <div className="mt-6 flex gap-3">
            <button
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-emerald-700 active:bg-emerald-800 focus:outline-hidden"
              onClick={() => dispatch(increment())}
            >
              +
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md bg-rose-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-rose-700 active:bg-rose-800 focus:outline-hidden"
              onClick={() => dispatch(decrement())}
            >
              -
            </button>
            <button
              className="ml-auto inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-slate-700 font-medium hover:bg-slate-50 active:bg-slate-100"
              onClick={() => dispatch(reset())}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
