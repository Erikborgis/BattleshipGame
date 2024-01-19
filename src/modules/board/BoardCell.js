class BoardCell {
  constructor() {
    this.status = 'empty' //Hit, ship, empty, miss
    this.shipId = null //What type of ship is in the cell for easy lookup
    this.color = 'bg-white' //Color will change depending on status
  }

  setStatus(newStatus) {
    if (newStatus === 'miss') {
      this.setColor('bg-blue-600')
    } else if (newStatus === 'hit') {
      this.setColor('bg-red-600')
    } else if (newStatus === 'ship') {
      this.setColor('bg-blue-200')
    } else if (newStatus === 'sunk') {
      this.setColor('bg-green-600')
    }
    this.status = newStatus
  }

  setShipId(shipId) {
    this.shipId = shipId
  }

  setColor(color) {
    this.color = color
  }
}

export default BoardCell