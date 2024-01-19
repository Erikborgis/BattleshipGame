import Player from '../player/Player'

//A class that will handle most of the logic in the game.

class GameLogic {
  constructor(playerOneName, playerTwoName) {
    this.playerOne = new Player(playerOneName)
    this.playerTwo = new Player(playerTwoName)
    this.gamePhase = 'placement' //phase has two types 'placement' and 'battle'
    this.currentTurn = null

    this.handleShipSelect = this.handleShipSelect.bind(this)
  }

  handleShipSelect(selectedShipId) {
    const currentPlayerShips = this.currentTurn.playerShips
    const index = currentPlayerShips.findIndex(ship => ship.shipId === selectedShipId)

    this.selectedShipIndex = index
  }

  startGame() {
    this.currentTurn = this.playerOne
  }
}

export default GameLogic