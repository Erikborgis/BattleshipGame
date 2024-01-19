import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import GameLogic from './GameLogic'
import GameBoard from './GameBoard'
import ShipPlacement from './ShipPlacement'

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
    if (gameLogic.gamePhase === 'placement') {
      //Generate their own board
      return (
        <div>
          <p className='font-bold'>{gameLogic.gamePhase.charAt(0).toUpperCase() + gameLogic.gamePhase.slice(1)} for player: {gameLogic.currentTurn.name.charAt(0).toUpperCase() + gameLogic.currentTurn.name.slice(1)}</p>
          <p className='font-bold'>Make sure that only {gameLogic.currentTurn.name.charAt(0).toUpperCase() + gameLogic.currentTurn.name.slice(1)} is looking</p>
          <GameBoard
            board={gameLogic.currentTurn.playerBoard.board}
          />
        </div>
      )
    } else if (gameLogic.currentTurn === gameLogic.playerOne && gameLogic.gamePhase !== 'placement') {
      //If this scenario happens it means it is battle and should generate playerTwos board
      return (
        <div>
          <p className='font-bold'>Red = Hit ---- Blue = Miss --- Green = Sunk</p>
          <GameBoard
            board={gameLogic.playerTwo.playerBoard.board}
          />
        </div>
      )
    } else if (gameLogic.currentTurn === gameLogic.playerTwo && gameLogic.gamePhase !== 'placement') {
      //Battle playerTwo turn so playerOne board should be visible
      return (
        <div>
          <p className='font-bold'>Red = Hit ---- Blue = Miss --- Green = Sunk</p>
          <GameBoard
            board={gameLogic.playerOne.playerBoard.board}
          />
        </div>
      )
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        {divBoard()}
        {gameLogic.gamePhase === 'placement' ? (
          <div className='item-centered flex-col items-center ml-2'>
            {gameLogic.currentTurn.playerShips.every(ship => ship.placed) ? (
              <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={{/* changeturn */ }}>
                Next Turn
              </button>
            ) : (
              <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={{/* Rotate ship */ }}>
                Rotate
              </button>
            )}
            <ShipPlacement
              ships={gameLogic.currentTurn.playerShips}
            />
          </div>
        ) : null}

      </div>
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