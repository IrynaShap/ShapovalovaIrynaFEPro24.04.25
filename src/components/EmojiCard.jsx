function EmojiCard({ emoji, onVote }) {
    const handleClick = () => {
        onVote(emoji.id)
    }

    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 transform"
            onClick={handleClick}
        >
            <div className="text-4xl mb-2">{emoji.emoji}</div>
            <div className="text-xl font-bold text-gray-700">{emoji.votes}</div>
        </div>
    )
}

export default EmojiCard
