import { Component } from 'react'

class JsonDisplay extends Component {
    render() {
        const { data } = this.props;
        return (
            <pre>
                {data ? JSON.stringify(data, null, 4) : 'No data'}
            </pre>
        )
    }
}

export default JsonDisplay;
