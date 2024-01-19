import PropTypes from 'prop-types'

function GameBoard({ board, onCellEnter, onCellLeave, highlightedCells, onCellClick }) {

  function isHighlighted(row, col) {
    return highlightedCells.some(cell => cell.row === row && cell.col === col)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`h-10 w-10 border border-gray-400 ${cell.color} ${isHighlighted(rowIndex, colIndex) ? 'bg-yellow-200' : ''}`}
              onMouseEnter={() => onCellEnter(rowIndex, colIndex)}
              onMouseLeave={() => onCellLeave()}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

GameBoard.propTypes = {
  board: PropTypes.array.isRequired,
  onCellEnter: PropTypes.func.isRequired,
  onCellLeave: PropTypes.func.isRequired,
  highlightedCells: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired,
}

export default GameBoard