import { Component } from 'react'
import Header from './Header'
import EmojiGrid from './EmojiGrid'
import ActionButtons from './ActionButtons'
import ResultsDisplay from './ResultsDisplay'
import Instructions from './Instructions'

class EmojiVoting extends Component {
    constructor(props) {
        super(props);
        const savedEmojis = this.loadFromLocalStorage()

        this.state = {
            emojis: savedEmojis || [...props.initialEmojis],
            showResults: false,
            winner: null
        }
    }

    loadFromLocalStorage = () => {
        try {
            const savedVotes = localStorage.getItem('emojiVotes')
            return savedVotes ? JSON.parse(savedVotes) : null
        } catch (error) {
            console.error('Помилка при завантаженні даних з localStorage:', error)
            return null
        }
    }

    saveToLocalStorage = (emojis) => {
        try {
            localStorage.setItem('emojiVotes', JSON.stringify(emojis))
        } catch (error) {
            console.error('Помилка при збереженні данних в localStorage:', error)
        }
    }

    findWinner = (emojis) => {
        return emojis.reduce((prev, current) =>
            (prev.votes > current.votes) ? prev : current
        )
    }

    updateEmojiVotes = (emojiId) => {
        return this.state.emojis.map(emoji =>
            emoji.id === emojiId
                ? { ...emoji, votes: emoji.votes + 1 }
                : emoji
        )
    }

    handleVote = (emojiId) => {
        const updatedEmojis = this.updateEmojiVotes(emojiId)
        this.setState({
            emojis: updatedEmojis
        })
        this.saveToLocalStorage(updatedEmojis)
    }

    handleShowResults = () => {
        const winner = this.findWinner(this.state.emojis)

        this.setState({
            showResults: true,
            winner: winner
        })
    }

    handleClearResults = () => {
        const resetEmojis = this.props.initialEmojis.map(emoji => ({ ...emoji, votes: 0 }))

        this.setState({
            emojis: resetEmojis,
            showResults: false,
            winner: null
        })
        this.saveToLocalStorage(resetEmojis)
    }

    render() {
        const { emojis, showResults, winner } = this.state

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <Header />

                    <EmojiGrid
                        emojis={emojis}
                        onVote={this.handleVote}
                    />

                    <ActionButtons
                        onShowResults={this.handleShowResults}
                        onClearResults={this.handleClearResults}
                    />

                    {showResults && (
                        <ResultsDisplay winner={winner} />
                    )}

                    <Instructions />
                </div>
            </div>
        )
    }
}

EmojiVoting.defaultProps = {
    initialEmojis: []
}

export default EmojiVoting
