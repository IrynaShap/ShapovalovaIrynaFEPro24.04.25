import EmojiVoting from './components/EmojiVoting.jsx'
import { DEFAULT_EMOJIS } from './data/constants.js'

function App() {


  return (
    <>
      <EmojiVoting initialEmojis={DEFAULT_EMOJIS} />
    </>
  )
}

export default App
