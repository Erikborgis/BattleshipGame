import { useState } from 'react'
import PlayerVsPlayerForm from './modules/form/PlayerVsPlayerForm'

function App() {

  const [playerOneName, setPlayerOneName] = useState('')
  const [playerTwoName, setPlayerTwoName] = useState('')
  const [gameModeSelected, setGameModeSelected] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const handleCancel = () => {
    setGameModeSelected(null)
    setGameStarted(false)
  }

  const handleFormSubmit = (playerOneName, playerTwoName) => {
    setPlayerOneName(playerOneName)
    setPlayerTwoName(playerTwoName)
    setGameStarted(true)
  }

  return (
    <div className='bg-cover bg-center h-screen font-mono' style={{ backgroundImage: 'url(\'/BattleshipBackground.png\')' }}>
      <div className='flex justify-center items-center h-screen'>
        <div className='text-center bg-white bg-opacity-80 p-4 rounded-lg'>
          <h1 className='font-bold'>My battleship game, created by Erik Borgström for QSoftWerk</h1>
          <div className='flex flex-col gap-4 mt-4'>
            {gameModeSelected === 'PlayerVsPlayer' && !gameStarted ? (
              /* Render PlayerVsPlayerForm */
              <PlayerVsPlayerForm
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            ) : gameStarted === true ? (
              /* Renders if the game has started */
              <div>
                <p>Game just started!</p>
              </div>
            ) : (
              /* Renders if no form or game is active */
              <button
                className='text-center bg-green-800 bg-opacity-70 rounded-lg font-bold py-2 px-4'
                onClick={() => setGameModeSelected('PlayerVsPlayer')}
              >
                Player VS Player
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
