class Ship {
  constructor(size, id) {
    this.size = size //How many boardcells it covers
    this.position = [] //An array that will be filled with coordinates like ( row: 8 col: 5, row: 8 col: 6......)
    this.placed = false //If its been placed or not
    this.status = Array(size).fill(false) //Array that will indicate status of segment true = hit
    this.shipId = id //'battleship', 'carrier', 'submarine', 'cruiser', 'destroyer'
  }
  
  hitSegment(row, col) {
    for (let i = 0; i < this.position.length; i++) {
      const segment = this.position[i]
      if (segment.row === row && segment.col === col) {
        this.status[i] = true
        break
      }
    }
    const allTrue = this.status.every(status => status === true)

    //If true then ship is sunk
    if (allTrue) {
      return true
    }
    return false
  }
}

export default Ship