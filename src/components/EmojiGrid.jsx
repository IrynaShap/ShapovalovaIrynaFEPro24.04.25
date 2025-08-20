import { Component } from 'react'
import EmojiCard from './EmojiCard'

class EmojiGrid extends Component {
  render() {
    const { emojis, onVote } = this.props

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
}

export default EmojiGrid
