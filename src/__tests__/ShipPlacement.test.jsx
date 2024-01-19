import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ShipPlacement from '../modules/game/ShipPlacement'
import Player from '../modules/player/Player'

describe('ShipPlacementMenu UI', () => {
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

  it('Buttons works as expected', () => {

    const handleSubmitSpy = vi.fn()
    const player = new Player('Test')

    render(<ShipPlacement ships={player.playerShips} onClickFunction={handleSubmitSpy} />)

    const carrierButton = screen.getByTestId('ship-button-carrier')
    fireEvent.click(carrierButton)

    expect(handleSubmitSpy).toHaveBeenCalledOnce()
  })
})
