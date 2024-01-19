import BoardCell from './BoardCell'

class Board {
  constructor() {
    //Fills the board with a 10x10 grid of boardcells
    this.board = Array(10).fill(null).map(() => Array(10).fill(null).map(() => new BoardCell()))
  }

  getCell(row, col) {
    if (this.isValidPosition(row, col)) {
      return this.board[row][col]
    }
    return null
  }

  setCellStatus(row, col, value) {
    if (this.isValidPosition(row, col)) {
      this.board[row][col].setStatus(value)
    } else {
      return null
    }
  }

  setCellColor(row, col, value) {
    if (this.isValidPosition(row, col)) {
      this.board[row][col].setColor(value)
    } else {
      return null
    }
  }

  setAllCellsWhite() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        this.setCellColor(row, col, 'bg-white')
      }
    }
  }

  setCellShipId(row, col, shipId) {
    if (this.isValidPosition(row, col)) {
      this.board[row][col].setShipId(shipId)
    } else {
      return null
    }
  }

  isValidFireTarget(row, col) {
    if (this.getCell(row, col).status !== 'miss') {
      if (this.getCell(row, col).status !== 'sunk') {
        if (this.getCell(row, col).status !== 'hit') {
          return true
        }
      }
    }
    return false
  }

  markHit(row, col) {
    this.setCellStatus(row, col, 'hit')
  }

  markCellSunk(row, col) {
    this.setCellStatus(row, col, 'sunk')
  }

  isValidPosition(row, col) {
    return row >= 0 && row < 10 && col >= 0 && col < 10
  }

  markShipCells(startRow, startCol, orientation, shipId, shipSize) {

    this.setCellStatus(startRow, startCol, 'ship')
    this.setCellShipId(startRow, startCol, shipId)

    for (let i = 0; i < shipSize; i++) {
      if (orientation === 'horizontal') {
        this.setCellStatus(startRow, startCol + i, 'ship')
        this.setCellShipId(startRow, startCol + i, shipId)
      } else {
        this.setCellStatus(startRow + i, startCol, 'ship')
        this.setCellShipId(startRow + i, startCol, shipId)
      }
    }
  }
}

export default Board