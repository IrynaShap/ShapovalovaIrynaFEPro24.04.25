function ActionButtons({ onShowResults, onClearResults }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={onShowResults}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Show Results
      </button>
      <button
        onClick={onClearResults}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Очистити результати
      </button>
    </div>
  )
}

export default ActionButtons
