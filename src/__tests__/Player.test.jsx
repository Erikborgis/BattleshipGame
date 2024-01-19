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
})
