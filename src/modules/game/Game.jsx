import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import GameLogic from './GameLogic'
import GameBoard from './GameBoard'

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

 /**
  * Three different cases for boards
  * Placement: Show their own board (1 case)
  * Battle: Show the other players board (2 cases)
  * @returns A div of the correct players board.
  */
  const divBoard = () => {
    if (gameLogic.phase === 'placement') {
      //Should generate their own board
      //(Current player)
      return (
        <GameBoard
          board={gameLogic.currentTurn.playerBoard.board}
        />
      )
    } else if (gameLogic.currentTurn === gameLogic.playerOne) {
      //If this scenario happens it means it is battle and should generate playerTwos board
      return (
        <GameBoard
          board={gameLogic.playerTwo.playerBoard.board}
        />
      )
    } else {
      //Battle playerTwo turn so playerOne board should be visible
      return (
        <GameBoard
          board={gameLogic.playerOne.playerBoard.board}
        />
      )
    }
  }

  return (
    <div>
      {divBoard()}
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