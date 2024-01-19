import Player from '../player/Player'

//A class that will handle most of the logic in the game.

class GameLogic {
  constructor(playerOneName, playerTwoName, setHighlightedCells, setGameLogic, setIsTurnChanging, setIsWinner) {
    this.playerOne = new Player(playerOneName)
    this.playerTwo = new Player(playerTwoName)
    this.gamePhase = 'placement' //phase has two types 'placement' and 'battle'
    this.currentTurn = this.playerOne
    this.selectedShipIndex = null
    this.setHighlightedCells = setHighlightedCells
    this.rotation = 'horizontal'
    this.setGameLogic = setGameLogic
    this.setIsTurnChanging = setIsTurnChanging
    this.setIsWinner = setIsWinner

    this.handleShipSelect = this.handleShipSelect.bind(this)
    this.placeShipAndFire = this.placeShipAndFire.bind(this)
    this.rotate = this.rotate.bind(this)
    this.onCellEnter = this.onCellEnter.bind(this)
    this.onCellLeave = this.onCellLeave.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
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

  changeTurn() {

    if (this.gamePhase === 'battle') {

      this.setIsTurnChanging(true)

      setTimeout(() => {
        if (this.currentTurn === this.playerOne) {
          this.currentTurn = this.playerTwo
        } else {
          this.currentTurn = this.playerOne
        }

        this.triggerRender()

        this.setIsTurnChanging(false)
      }, 0)
    } else {
      if (this.currentTurn === this.playerOne) {
        this.currentTurn = this.playerTwo
      } else {
        this.gamePhase = 'battle'
        this.currentTurn = this.playerOne
        this.playerOne.playerBoard.setAllCellsWhite()
        this.playerTwo.playerBoard.setAllCellsWhite()
      }
      this.triggerRender()
    }
  }

  placeShipAndFire(row, col) {
    if (this.selectedShipIndex !== null && this.gamePhase === 'placement') {
      this.placeShip(row, col)
    } else if (this.gamePhase === 'battle') {

      if(this.currentTurn === this.playerOne) {
        this.fireAgainstShip(row, col, this.playerTwo)
        
      } else {
        this.fireAgainstShip(row, col, this.playerOne)
      }
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

  fireAgainstShip(row, col, targetedPlayer) {
    if (this.validFireTarget(row, col)) {
      if(targetedPlayer.playerBoard.getCell(row,col).status === 'ship') {
        if(targetedPlayer.hitShip(row, col)) {
          //Sunk
          if (targetedPlayer.shipsLeft === 0) {
            return this.setIsWinner(this.currentTurn)
          }
        }
      } else {
        targetedPlayer.playerBoard.setCellStatus(row,col, 'miss')
      }
      this.changeTurn()
    }
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
      if (this.validFireTarget(row, col)) {
        highlightedCells.push({ row: row, col: col })
      }
    }
    this.setHighlightedCells(highlightedCells)
  }

  onCellLeave() {
    this.setHighlightedCells([])
  }

  validFireTarget(row, col) {
    if (row >= 0 && row < 10 && col >= 0 && col < 10) {
      if (this.currentTurn === this.playerOne) {
        if (this.playerTwo.playerBoard.isValidFireTarget(row, col)) {
          return true
        }
        return false
      } else {
        if (this.playerOne.playerBoard.isValidFireTarget(row, col)) {
          return true
        }
        return false
      }
    }
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