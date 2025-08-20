import { useState } from 'react'
import Header from './Header'
import EmojiGrid from './EmojiGrid'
import ActionButtons from './ActionButtons'
import ResultsDisplay from './ResultsDisplay'
import Instructions from './Instructions'

function EmojiVoting({ initialEmojis = [] }) {
    const loadFromLocalStorage = () => {
        try {
            const savedVotes = localStorage.getItem('emojiVotes')
            return savedVotes ? JSON.parse(savedVotes) : null
        } catch (error) {
            console.error('Помилка при завантаженні даних з localStorage:', error)
            return null
        }
    }

    const savedEmojis = loadFromLocalStorage()
    const [emojis, setEmojis] = useState(savedEmojis || [...initialEmojis])
    const [showResults, setShowResults] = useState(false)
    const [winner, setWinner] = useState(null)

    const saveToLocalStorage = (emojis) => {
        try {
            localStorage.setItem('emojiVotes', JSON.stringify(emojis))
        } catch (error) {
            console.error('Помилка при збереженні данних в localStorage:', error)
        }
    }

    const findWinner = (emojis) => {
        return emojis.reduce((prev, current) =>
            (prev.votes > current.votes) ? prev : current
        )
    }

    const updateEmojiVotes = (emojiId) => {
        return emojis.map(emoji =>
            emoji.id === emojiId
                ? { ...emoji, votes: emoji.votes + 1 }
                : emoji
        )
    }

    const handleVote = (emojiId) => {
        const updatedEmojis = updateEmojiVotes(emojiId)
        setEmojis(updatedEmojis)
        saveToLocalStorage(updatedEmojis)
    }

    const handleShowResults = () => {
        const winnerEmoji = findWinner(emojis)
        setShowResults(true)
        setWinner(winnerEmoji)
    }

    const handleClearResults = () => {
        const resetEmojis = initialEmojis.map(emoji => ({ ...emoji, votes: 0 }))
        setEmojis(resetEmojis)
        setShowResults(false)
        setWinner(null)
        saveToLocalStorage(resetEmojis)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Header />

                <EmojiGrid
                    emojis={emojis}
                    onVote={handleVote}
                />

                <ActionButtons
                    onShowResults={handleShowResults}
                    onClearResults={handleClearResults}
                />

                {showResults && (
                    <ResultsDisplay winner={winner} />
                )}

                <Instructions />
            </div>
        </div>
    )
}

export default EmojiVoting
