import { Component } from 'react'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

class BadgeDisplay extends Component {
    render() {
        const { badges = [] } = this.props
        return (
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                {badges.map((badge, index) => (
                    <Chip key={`${badge}-${index}`} label={badge} size="small" />
                ))}
            </Stack>
        )
    }
}

export default BadgeDisplay
