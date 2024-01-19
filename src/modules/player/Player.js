import Board from '../board/Board'
import Ship from '../ship/Ship'

class Player {
  constructor(name) {
    this.name = name
    this.playerBoard = new Board()
    this.playerShips = []
    this.shipsLeft = null
    this.generateShips()
    
  }

  /**
   * Function to generate ships for player.
   * Should only be run once the player is created.
   */
  generateShips() {
    const shipSizes = [5, 4, 3, 3, 2]
    const shipId = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
    let i = 0

    shipSizes.forEach(size => {
      this.playerShips.push(new Ship(size, shipId[i]))
      i++
    })
    this.shipsLeft = 5
  }

  placeShip(startRow, startCol, orientation, shipIndex) {
    this.playerShips[shipIndex].placed = true

    for (let i = 0; i < this.playerShips[shipIndex].size; i++) {
      if (orientation === 'horizontal') {
        this.playerShips[shipIndex].position.push({row: startRow, col: startCol + i})
      } else {
        this.playerShips[shipIndex].position.push({row: startRow + i, col: startCol})
      }
    }
    this.playerBoard.markShipCells(startRow, startCol, orientation, this.playerShips[shipIndex].shipId, this.playerShips[shipIndex].size)
  }

  hitShip(row, col) {
    const targetedShip = this.playerShips[this.getShipIndexFromId(this.playerBoard.getCell(row,col).shipId)]
    this.playerBoard.markHit(row,col)

    //If true then ship is sunk
    if (targetedShip.hitSegment(row, col)) {
      targetedShip.position.forEach(coordinate => {
        this.playerBoard.markCellSunk(coordinate.row, coordinate.col)
      })
      this.shipsLeft--
      return true
    }
    return false
  }



  getShipIndexFromId(id) {
    switch (id) {
    case 'carrier':
      return 0
    case 'battleship':
      return 1
    case 'cruiser':
      return 2
    case 'submarine':
      return 3
    case 'destroyer':
      return 4
    }
  }
}

export default Player