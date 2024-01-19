class Ship {
  constructor(size, id) {
    this.size = size //How many boardcells it covers
    this.position = [] //An array that will be filled with coordinates like ( row: 8 col: 5, row: 8 col: 6......)
    this.placed = false //If its been placed or not
    this.status = Array(size).fill(false) //Array that will indicate status of segment true = hit
    this.shipId = id //'battleship', 'carrier', 'submarine', 'cruiser', 'destroyer'
  }
  
  //Function to hit segment of a ship

  //Function to check if ship been sunk
  //Should check if status.every === true
}