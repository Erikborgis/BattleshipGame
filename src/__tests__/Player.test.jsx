import { describe, it, expect } from 'vitest'
//import { render, screen } from '@testing-library/react'
import Player from '../modules/player/Player'

describe('Player', () => {

  //Checks so that player gets initialized as it should
  it('Should be initialized correctly', () => {
    const player = new Player('Test')

    expect(player.name).toBe('Test')

    expect(player.playerShips.length).toBe(5)
    expect(player.shipsLeft).toBe(5)
  })

  it('Should place ships correctly', () => {
    const player = new Player('Test')

    expect(player.playerBoard.getCell(1,5).color).toBe('bg-white')

    player.placeShip(1, 5, 'horizontal', 1)

    expect(player.playerBoard.getCell(1,5).color).toBe('bg-blue-200')

    expect(player.playerBoard.getCell(2,5).color).toBe('bg-white')

    player.placeShip(2, 5, 'vertical', 1)

    expect(player.playerBoard.getCell(1,5).color).toBe('bg-blue-200')
  })

  it('Should hit ship correctly', () => {
    const player = new Player('Test')

    const shipPositions = [
      { row: 1, col: 5 },
      { row: 1, col: 6 },
      { row: 1, col: 7 },
      { row: 1, col: 8 },
    ]

    player.playerShips[2].shipPositions = shipPositions

    player.playerBoard.setCellStatus(1, 5, 'ship')
    player.playerBoard.setCellStatus(1, 6, 'ship')
    player.playerBoard.setCellStatus(1, 7, 'ship')
    player.playerBoard.setCellStatus(1, 8, 'ship')

    player.playerBoard.getCell(1, 5).shipId = 'cruiser'
    player.playerBoard.getCell(1, 6).shipId = 'cruiser'
    player.playerBoard.getCell(1, 7).shipId = 'cruiser'
    player.playerBoard.getCell(1, 8).shipId = 'cruiser'

    expect(player.hitShip(1, 5)).toBe(false)

    expect(player.playerBoard.getCell(1, 5).status).toBe('hit')
  })
})
