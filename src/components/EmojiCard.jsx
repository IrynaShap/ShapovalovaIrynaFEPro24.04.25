import { Component } from 'react'

class EmojiCard extends Component {
    handleClick = () => {
        this.props.onVote(this.props.emoji.id)
    }

    render() {
        const { emoji } = this.props
        return (
            <div
                className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 transform"
                onClick={this.handleClick}
            >
                <div className="text-4xl mb-2">{emoji.emoji}</div>
                <div className="text-xl font-bold text-gray-700">{emoji.votes}</div>
            </div>
        )
    }
}

export default EmojiCard
