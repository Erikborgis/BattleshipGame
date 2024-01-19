class BoardCell {
  constructor() {
    this.status = 'empty' //Hit, ship, empty, miss
    this.shipId = null //What type of ship is in the cell for easy lookup
    this.color = 'bg-white' //Color will change depending on status
  }

  //Function to change status and color
}

export default BoardCell