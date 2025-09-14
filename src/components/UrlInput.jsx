import { Component } from 'react'
import { connect } from 'react-redux'
import { setEndpoint, fetchSwapi } from '../store.js'

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
            <>
                <div className="row align-items-center g-0 w-100 mb-3">
                    <div className="col-3">
                        <input
                            type="text"
                            className="form-control bg-light"
                            value={baseUrl}
                            readOnly
                        />
                    </div>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            value={endpoint}
                            onChange={this.handleChange}
                            placeholder="people/1"
                        />
                    </div>
                    <div className="col-1">
                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={this.handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Loading…' : 'Get info'}
                        </button>
                    </div>
                </div>
            </>
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
