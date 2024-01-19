import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import GameLogic from './GameLogic'

function Game({ playerOneName, playerTwoName, onCancel }) {

  const [gameLogic, setGameLogic] = useState(null)

  useEffect(() => {
    const logic = new GameLogic(playerOneName, playerTwoName)
    setGameLogic(logic)
    logic.startGame()

    //Should be dependent on playerOneName and playerTwoName
  }, [playerOneName, playerTwoName])

  if (gameLogic === null) {
    //Makes sure so that gamelogic has been loaded before the page is.
    return <div>Loading...</div>
  }

  return (
    <div>
      <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={onCancel}>
        Abort game
      </button>
    </div>
  )
}

Game.propTypes = {
  playerOneName: PropTypes.string.isRequired,
  playerTwoName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Game