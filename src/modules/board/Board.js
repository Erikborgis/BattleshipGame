import BoardCell from './BoardCell'

class Board {
  constructor() {
    //Fills the board with a 10x10 grid of boardcells
    this.board = Array(10).fill(null).map(() => Array(10).fill(null).map(() => new BoardCell()))
  }
  //Functions to update the boardcells

  getCell(row, col) {
    if (this.isValidPosition(row, col)) {
      return this.board[row][col]
    }
    return null
  }

  isValidPosition(row, col) {
    return row >= 0 && row < 10 && col >= 0 && col < 10
  }
}

export default Board