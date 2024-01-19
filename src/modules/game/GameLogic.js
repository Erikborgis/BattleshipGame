import Player from '../player/Player'

//A class that will handle most of the logic in the game.

class GameLogic {
  constructor(playerOneName, playerTwoName, setHighlightedCells, setGameLogic) {
    this.playerOne = new Player(playerOneName)
    this.playerTwo = new Player(playerTwoName)
    this.gamePhase = 'placement' //phase has two types 'placement' and 'battle'
    this.currentTurn = this.playerOne
    this.selectedShipIndex = null
    this.setHighlightedCells = setHighlightedCells
    this.rotation = 'horizontal'
    this.setGameLogic = setGameLogic

    this.handleShipSelect = this.handleShipSelect.bind(this)
    this.placeShipAndFire = this.placeShipAndFire.bind(this)
    this.rotate = this.rotate.bind(this)
    this.onCellEnter = this.onCellEnter.bind(this)
    this.onCellLeave = this.onCellLeave.bind(this)
  }

  handleShipSelect(selectedShipId) {
    const currentPlayerShips = this.currentTurn.playerShips
    const index = currentPlayerShips.findIndex(ship => ship.shipId === selectedShipId)

    this.selectedShipIndex = index
  }

  triggerRender() {
    const newGameLogic = { ...this }
    this.setGameLogic(newGameLogic)
  }

  startGame() {
    this.currentTurn = this.playerOne
  }

  placeShipAndFire(row, col) {
    if (this.selectedShipIndex !== null && this.gamePhase === 'placement') {
      this.placeShip(row, col)
    } else if (this.gamePhase === 'firetime') {
      this.fireAgainstShip()
    }
    this.triggerRender()
    this.setHighlightedCells([])
  }

  placeShip(row, col) {
    if (this.validShipPlacement(row,col, this.rotation, this.currentTurn.playerShips[this.selectedShipIndex].size)) {
      this.currentTurn.placeShip(row, col, this.rotation, this.selectedShipIndex)
      this.selectedShipIndex = null
    }
  }

  fireAgainstShip() {
    {/* To be implemented */}
  }

  onCellEnter(row, col) {
    const currentPlayerShips = this.currentTurn.playerShips

    let highlightedCells = []

    if (this.selectedShipIndex !== null && this.gamePhase === 'placement') {
      const selectedShip = currentPlayerShips[this.selectedShipIndex]

      for (let i = 0; i < selectedShip.size; i++) {
        if (this.rotation === 'horizontal') {
          if (this.validShipPlacement(row, col, this.rotation, selectedShip.size)) {
            highlightedCells.push({ row: row, col: col + i })
          }
        } else {
          if (this.validShipPlacement(row, col, this.rotation, selectedShip.size)) {
            highlightedCells.push({ row: row + i, col: col })
          }
        }
      }
    } else if (this.gamePhase === 'battle') {
      /* To be implemented */
    }
    this.setHighlightedCells(highlightedCells)
  }

  onCellLeave() {
    this.setHighlightedCells([])
  }

  validShipPlacement(row, col, orientation, size) {
    if (orientation === 'horizontal') {
      if (row >= 0 && row < 10 && col >= 0 && col + size <= 10) {
        for (let i = col; i < col + size; i++) {
          if (this.currentTurn.playerBoard.getCell(row, i).status === 'ship') {
            //A ship is blocking.
            return false
          }
        }
        //The ship can be placed.
        return true
      }
    } else if (orientation === 'vertical') {
      if (row >= 0 && row + size <= 10 && col >= 0 && col < 10) {
        for (let i = row; i < row + size; i++) {
          if (this.currentTurn.playerBoard.getCell(i, col).status === 'ship') {
            //A ship is blocking.
            return false
          }
        }
        //The ship can be placed.
        return true
      }
    }
    //Wrong orientation or out of bounds.
    return false
  }

  rotate() {
    this.rotation = this.rotation === 'horizontal' ? 'vertical' : 'horizontal'
  }
}

export default GameLogic