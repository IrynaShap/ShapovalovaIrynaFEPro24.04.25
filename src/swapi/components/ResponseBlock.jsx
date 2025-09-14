import { Component } from 'react'
import { connect } from 'react-redux'
import { clearSwapi } from '../store.js'
import BadgeDisplay from './BadgeDisplay.jsx'
import JsonDisplay from './JsonDisplay.jsx'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

class ResponseBlock extends Component {
    render() {
        const { endpoint, loading, data, error, clearSwapi: onClear } = this.props
        const badges = endpoint.split('/').filter(Boolean)
        return (
            <Paper variant="outlined" sx={{ p: 2 }}>
                <BadgeDisplay badges={badges} />
                {loading && <Typography color="text.secondary">Loading…</Typography>}
                {error && !loading && (
                    <Typography color="error" component="pre" sx={{ mb: 0 }}>
                        {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
                    </Typography>
                )}
                {!loading && !error && <JsonDisplay data={data} />}
                <Stack direction="row" sx={{ mt: 2 }}>
                    <Button variant="outlined" color="error" onClick={onClear} disabled={loading}>Clear</Button>
                </Stack>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    endpoint: state.swapi.endpoint,
    loading: state.swapi.loading,
    data: state.swapi.data,
    error: state.swapi.error,
})

export default connect(mapStateToProps, { clearSwapi })(ResponseBlock)
