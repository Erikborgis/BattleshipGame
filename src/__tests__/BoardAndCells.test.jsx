import { describe, it, expect } from 'vitest'
import Board from '../modules/board/Board'
import BoardCell from '../modules/board/BoardCell'

describe('Board & BoardCell', () => {

  it('Should initialize with correct 10x10 grid and boardcells marked empty', () => {
    const gameBoard = new Board

    expect(gameBoard.board.length).toBe(10)
    expect(gameBoard.board[0].length).toBe(10)

    //Check that the gameBoard has been filled with BoardCells
    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell instanceof BoardCell)
      )
    ).toBe(true)

    //Check that every cell has the status 'empty'
    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.status === 'empty')
      )
    ).toBe(true)

    //Check that every cell has the correct color from start
    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.color === 'bg-white')
      )
    ).toBe(true)
  })

  it('Should return null if wrong indices', () => {
    const gameBoard = new Board

    expect(gameBoard.getCell(20, 5)).toBe(null)

    expect(gameBoard.setCellStatus(20, 5, 'sunk')).toBe(null)

    expect(gameBoard.setCellColor(20, 15, 'bg-red-200')).toBe(null)

    expect(gameBoard.isValidPosition(20, 15)).toBe(false)

    expect(gameBoard.setCellShipId(20, 5, 'battleship')).toBe(null)

    expect(gameBoard.isValidPosition(8, 5)).toBe(true)
  })

  it('Should change cell status and color correctly', () => {
    const gameBoard = new Board

    //Check that every cell has the status 'empty'
    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.status === 'empty')
      )
    ).toBe(true)

    //Check that every cell has the correct color from start
    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.color === 'bg-white')
      )
    ).toBe(true)

    expect(gameBoard.setCellStatus(1, 5, 'hit'))
    expect(gameBoard.setCellStatus(2, 5, 'miss'))
    expect(gameBoard.setCellStatus(3, 5, 'ship'))

    expect(gameBoard.getCell(1, 5).color).toBe('bg-red-600')
    expect(gameBoard.getCell(1, 5).status).toBe('hit')

    expect(gameBoard.getCell(2, 5).color).toBe('bg-blue-600')
    expect(gameBoard.getCell(2, 5).status).toBe('miss')

    expect(gameBoard.getCell(3, 5).status).toBe('ship')
    expect(gameBoard.getCell(3, 5).color).toBe('bg-blue-200')
  })

  it('Should set shipId on cell correctly', () => {
    const gameBoard = new Board

    expect(gameBoard.getCell(1, 5).shipId).toBe(null)

    gameBoard.setCellShipId(1, 5, 'battleship')

    expect(gameBoard.getCell(1, 5).shipId).toBe('battleship')
  })

  it('Should change color correctly', () => {
    const gameBoard = new Board

    expect(gameBoard.getCell(1, 5).color).toBe('bg-white')
    gameBoard.setCellColor(1, 5, 'bg-red-300')
    expect(gameBoard.getCell(1, 5).color).toBe('bg-red-300')

    gameBoard.setCellColor(1, 8, 'bg-red-300')
    gameBoard.setCellColor(2, 5, 'bg-red-300')
    gameBoard.setCellColor(3, 4, 'bg-red-300')

    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.color === 'bg-white')
      )
    ).toBe(false)

    gameBoard.setAllCellsWhite()

    expect(
      gameBoard.board.every((row) =>
        row.every((cell) => cell.color === 'bg-white')
      )
    ).toBe(true)
  })

  it('Should mark cells correctly on ship placement', () => {

    const gameBoard = new Board

    expect(gameBoard.getCell(1, 5).color).toBe('bg-white')
    expect(gameBoard.getCell(1, 6).color).toBe('bg-white')
    expect(gameBoard.getCell(1, 7).color).toBe('bg-white')

    expect(gameBoard.getCell(2, 5).color).toBe('bg-white')
    expect(gameBoard.getCell(3, 5).color).toBe('bg-white')
    expect(gameBoard.getCell(4, 5).color).toBe('bg-white')

    gameBoard.markShipCells(1, 5, 'horizontal', 'battleship', 3)

    expect(gameBoard.getCell(1, 5).color).toBe('bg-blue-200')
    expect(gameBoard.getCell(1, 6).color).toBe('bg-blue-200')
    expect(gameBoard.getCell(1, 7).color).toBe('bg-blue-200')

    gameBoard.markShipCells(2, 5, 'vertical', 'battleship', 3)

    expect(gameBoard.getCell(2, 5).color).toBe('bg-blue-200')
    expect(gameBoard.getCell(3, 5).color).toBe('bg-blue-200')
    expect(gameBoard.getCell(4, 5).color).toBe('bg-blue-200')
  })
})
