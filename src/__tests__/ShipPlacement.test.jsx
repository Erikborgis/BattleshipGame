import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ShipPlacement from '../modules/game/ShipPlacement'
import Player from '../modules/player/Player'

describe('FormSubmit', () => {
  it('Renders form', () => {

    const player = new Player('Test')

    render(<ShipPlacement ships={player.playerShips} />)

    const carrierButton = screen.getByTestId('ship-button-carrier')
    const battleshipButton = screen.getByTestId('ship-button-battleship')
    const cruiserButton = screen.getByTestId('ship-button-cruiser')
    const submarineButton = screen.getByTestId('ship-button-submarine')
    const destroyerButton = screen.getByTestId('ship-button-destroyer')

    expect(carrierButton).toBeInTheDocument()
    expect(battleshipButton).toBeInTheDocument()
    expect(cruiserButton).toBeInTheDocument()
    expect(submarineButton).toBeInTheDocument()
    expect(destroyerButton).toBeInTheDocument()
  })
})
