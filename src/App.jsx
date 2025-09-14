import { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import UrlInput from './components/UrlInput.jsx'
import ResponseBlock from './components/ResponseBlock.jsx'

class App extends Component {
  render() {
    return (
      <div className="container py-4">
        <h1 className="mb-4">SWAPI</h1>
        <UrlInput />
        <ResponseBlock />
      </div>
    )
  }
}

export default App