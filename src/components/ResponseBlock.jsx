import { Component } from 'react'
import { connect } from 'react-redux'
import { clearSwapi } from '../store.js'
import BadgeDisplay from './BadgeDisplay.jsx'
import JsonDisplay from './JsonDisplay.jsx'

class ResponseBlock extends Component {
    render() {
        const { endpoint, loading, data, error, clearSwapi: onClear } = this.props
        const badges = endpoint.split('/').filter(Boolean)
        return (
            <div className="border rounded p-3 bg-white">
                <BadgeDisplay badges={badges} />
                {loading && <div className="text-muted">Loading…</div>}
                {error && !loading && (
                    <pre className="text-danger mb-0">{typeof error === 'string' ? error : JSON.stringify(error, null, 2)}</pre>
                )}
                {!loading && !error && <JsonDisplay data={data} />}
                <div className="mt-3">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={onClear}
                        disabled={loading}
                    >
                        Clear
                    </button>
                </div>
            </div>
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
