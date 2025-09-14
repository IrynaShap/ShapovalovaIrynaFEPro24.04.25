import { Component } from 'react'
import { connect } from 'react-redux'
import { setEndpoint, fetchSwapi } from '../store.js'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

class UrlInput extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.props.setEndpoint(e.target.value)
    }

    handleSubmit() {
        this.props.fetchSwapi()
    }

    componentDidMount() {
        this.props.fetchSwapi()
    }

    render() {
        const { baseUrl, endpoint, loading } = this.props
        return (
            <Grid container spacing={2} sx={{ width: '100%', mb: 2, alignItems: 'center' }}>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Base URL" value={baseUrl} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Endpoint" value={endpoint} onChange={this.handleChange} placeholder="people/1" />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button fullWidth variant="outlined" onClick={this.handleSubmit} disabled={loading}>
                        {loading ? 'Loading…' : 'Get info'}
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    baseUrl: state.swapi.baseUrl,
    endpoint: state.swapi.endpoint,
    loading: state.swapi.loading,
})

const mapDispatchToProps = { setEndpoint, fetchSwapi }

export default connect(mapStateToProps, mapDispatchToProps)(UrlInput)
