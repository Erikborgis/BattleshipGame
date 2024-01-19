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
})
