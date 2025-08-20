import EmojiCard from './EmojiCard'

function EmojiGrid({ emojis, onVote }) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {emojis.map(emoji => (
        <EmojiCard
          key={emoji.id}
          emoji={emoji}
          onVote={onVote}
        />
      ))}
    </div>
  )
}

export default EmojiGrid
