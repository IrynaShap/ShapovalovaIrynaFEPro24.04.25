import { Component } from 'react'

class BadgeDisplay extends Component {
    constructor(props) {
        super(props)
        this.badges = ['people', '1']
    }

    render() {
        return (
            <div>
                {this.badges.map((badge, index) => (
                    <span
                        key={index}
                        className={`badge bg-secondary mb-2 ${index > 0 ? 'ms-2' : ''}`}
                    >
                        {badge}
                    </span>
                ))}
            </div>
        )
    }
}

export default BadgeDisplay;
