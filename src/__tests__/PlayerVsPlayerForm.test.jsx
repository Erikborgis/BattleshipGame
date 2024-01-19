import { describe, it, expect, vi } from 'vitest'
import App from '../App'
import { fireEvent, render, screen } from '@testing-library/react'
import PlayerVsPlayerForm from '../modules/form/PlayerVsPlayerForm'

describe('FormSubmit UI', () => {
  it('Renders form', () => {
    render(<App />)

    const playerVsPlayerButton = screen.getByText('Player VS Player')
    fireEvent.click(playerVsPlayerButton)

    const playerOneInput = screen.getByPlaceholderText('Player One Name')
    const playerTwoInput = screen.getByPlaceholderText('Player Two Name')

    const cancelButton = screen.getByText('Cancel')
    const submitButton = screen.getByText('Start Game')

    expect(playerOneInput).toBeInTheDocument()
    expect(playerTwoInput).toBeInTheDocument()

    expect(cancelButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

  })

  it('Hides form when canceled', () => {
    render(<App />)

    const playerVsPlayerButton = screen.getByText('Player VS Player')
    fireEvent.click(playerVsPlayerButton)

    const playerOneInput = screen.getByPlaceholderText('Player One Name')
    const playerTwoInput = screen.getByPlaceholderText('Player Two Name')

    expect(playerOneInput).toBeInTheDocument()
    expect(playerTwoInput).toBeInTheDocument()

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(playerOneInput).not.toBeInTheDocument()
    expect(playerTwoInput).not.toBeInTheDocument()
  })

  it('Submits form correctly', () => {

    const handleSubmitSpy = vi.fn()

    const { getByTestId } = render(<PlayerVsPlayerForm onSubmit={handleSubmitSpy} onCancel={handleSubmitSpy} />)

    const playerOneInput = screen.getByPlaceholderText('Player One Name')
    const playerTwoInput = screen.getByPlaceholderText('Player Two Name')
    fireEvent.change(playerOneInput, { target: { value: 'Player 1' } })
    fireEvent.change(playerTwoInput, { target: { value: 'Player 2' } })

    expect(playerOneInput.value).toBe('Player 1')
    expect(playerTwoInput.value).toBe('Player 2')

    fireEvent.submit(getByTestId('playervsplayerform'))
    expect(handleSubmitSpy).toHaveBeenCalledOnce()
  })
})
