import { Component } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

class JsonDisplay extends Component {
    render() {
        const { data } = this.props
        return (
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', overflowX: 'auto' }}>
                <Typography component="pre" sx={{ m: 0 }}>
                    {data ? JSON.stringify(data, null, 4) : 'No data'}
                </Typography>
            </Paper>
        )
    }
}

export default JsonDisplay
