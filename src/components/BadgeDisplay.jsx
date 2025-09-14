import { Component } from 'react'

class BadgeDisplay extends Component {
    render() {
        const { badges = [] } = this.props
        return (
            <div>
                {badges.map((badge, index) => (
                    <span
                        key={`${badge}-${index}`}
                        className={`badge bg-secondary mb-2 ${index > 0 ? 'ms-2' : ''}`}
                    >
                        {badge}
                    </span>
                ))}
            </div>
        )
    }
}

export default BadgeDisplay
