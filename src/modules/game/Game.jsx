import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import GameLogic from './GameLogic'
import GameBoard from './GameBoard'
import ShipPlacement from './ShipPlacement'

function Game({ playerOneName, playerTwoName, onCancel }) {

  const [gameLogic, setGameLogic] = useState(null)

  const [highlightedCells, setHighlightedCells] = useState([])

  const [isTurnChanging, setIsTurnChanging] = useState(false)

  const [isWinner, setIsWinner] = useState(null)

  useEffect(() => {
    const logic = new GameLogic(playerOneName, playerTwoName, setHighlightedCells, setGameLogic, setIsTurnChanging, setIsWinner)
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
            highlightedCells={highlightedCells}
            onCellEnter={gameLogic.onCellEnter}
            onCellLeave={gameLogic.onCellLeave}
            onCellClick={gameLogic.placeShipAndFire}
            isTurnChanging={isTurnChanging}
          />
        </div>
      )
    } else if (gameLogic.currentTurn === gameLogic.playerOne && gameLogic.gamePhase !== 'placement') {
      //Battle playerOne turn so playerOne board should be visible
      return (
        <div>
          <p className='font-bold'>{gameLogic.gamePhase.charAt(0).toUpperCase() + gameLogic.gamePhase.slice(1)} for player: {gameLogic.currentTurn.name.charAt(0).toUpperCase() + gameLogic.currentTurn.name.slice(1)}</p>
          <p className='font-bold'>Fire on player: {gameLogic.playerOne.name.charAt(0).toUpperCase() + gameLogic.playerOne.name.slice(1)}</p>
          <p className='font-bold'>Red = Hit ---- Blue = Miss --- Green = Sunk</p>
          <GameBoard
            board={gameLogic.playerTwo.playerBoard.board}
            highlightedCells={highlightedCells}
            onCellEnter={gameLogic.onCellEnter}
            onCellLeave={gameLogic.onCellLeave}
            onCellClick={gameLogic.placeShipAndFire}
            isTurnChanging={isTurnChanging}
          />
        </div>
      )
    } else if (gameLogic.currentTurn === gameLogic.playerTwo && gameLogic.gamePhase !== 'placement') {
      //Battle playerTwo turn so playerOne board should be visible
      return (
        <div>
          <p className='font-bold'>{gameLogic.gamePhase.charAt(0).toUpperCase() + gameLogic.gamePhase.slice(1)} for player: {gameLogic.currentTurn.name.charAt(0).toUpperCase() + gameLogic.currentTurn.name.slice(1)}</p>
          <p className='font-bold'>Fire on player: {gameLogic.playerOne.name.charAt(0).toUpperCase() + gameLogic.playerOne.name.slice(1)}</p>
          <p className='font-bold'>Red = Hit ---- Blue = Miss --- Green = Sunk</p>
          <GameBoard
            board={gameLogic.playerOne.playerBoard.board}
            highlightedCells={highlightedCells}
            onCellEnter={gameLogic.onCellEnter}
            onCellLeave={gameLogic.onCellLeave}
            onCellClick={gameLogic.placeShipAndFire}
            isTurnChanging={isTurnChanging}
          />
        </div>
      )
    }
  }

  return (
    <div>
      {isWinner === null ? (
        <div>
          <div className='flex justify-center items-center'>
            {divBoard()}
            {gameLogic.gamePhase === 'placement' ? (
              <div className='item-centered flex-col items-center ml-2'>
                {gameLogic.currentTurn.playerShips.every(ship => ship.placed) ? (
                  <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={gameLogic.changeTurn}>
                    Next Turn
                  </button>
                ) : (
                  <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={gameLogic.rotate}>
                    Rotate
                  </button>
                )}
                <ShipPlacement
                  ships={gameLogic.currentTurn.playerShips}
                  onClickFunction={gameLogic.handleShipSelect}
                />
              </div>
            ) : null}
          </div>
          <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={onCancel}>
            Abort game
          </button>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-xl font-bold mb-4'>Congrats!! {isWinner.name} sunk the last ship and won!!!</h1>
          <img src='/Winner.png' alt='Winner' width={400} height={400} />
          <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg mt-4' type='button' onClick={onCancel}>
            Go back to main menu
          </button>
        </div>
      )}
    </div>
  )
}

Game.propTypes = {
  playerOneName: PropTypes.string.isRequired,
  playerTwoName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Game