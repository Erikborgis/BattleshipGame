import PropTypes from 'prop-types'

function GameBoard({ board }) {

  return (
    <div className="flex flex-col justify-center items-center">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`h-10 w-10 border border-gray-400 ${cell.color}`}
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
}

export default GameBoard