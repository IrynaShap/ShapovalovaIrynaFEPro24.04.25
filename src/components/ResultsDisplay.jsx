import { Component } from 'react'

class ResultsDisplay extends Component {
    render() {
        const { winner } = this.props

        if (!winner) return null

        return (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Результати голосування:
                </h2>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Переможець:
                    </h3>
                    <div className="inline-block bg-yellow-100 rounded-lg p-6 shadow-md">
                        <div className="text-6xl mb-2">{winner.emoji}</div>
                        <div className="text-lg font-bold text-gray-700">
                            Кількість голосів: {winner.votes}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultsDisplay
