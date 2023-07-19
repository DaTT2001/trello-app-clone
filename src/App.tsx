import './App.css'
import Board from './Components/Board/Board';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <h2>Trello App</h2>
      </div>
      <Board />
      <div className='nav'>
        <h2>Trello App footer</h2>
      </div>
    </div>
  )
}

export default App
