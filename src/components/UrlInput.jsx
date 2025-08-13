import { Component } from 'react'

class UrlInput extends Component {
    render() {
        return (
            <div className="row align-items-center g-0 w-100 mb-3">
                <div className="col-3">
                    <input
                        type="text"
                        className="form-control bg-light"
                        value="https://swapi.dev/api/"
                        readOnly
                    />
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className="form-control"
                        value="people/1/"
                        readOnly
                    />
                </div>
                <div className="col-1">
                    <button className="btn btn-outline-secondary w-100">Get info</button>
                </div>
            </div>
        )
    }
}

export default UrlInput
