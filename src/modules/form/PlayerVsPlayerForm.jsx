import { useState } from "react"
import PropTypes from 'prop-types'

function PlayerVsPlayerForm({ onSubmit, onCancel }) {
  const [playerOneTempName, setPlayerOneTempName] = useState('')
  const [playerTwoTempName, setPlayerTwoTempName] = useState('')
  const [alert, setAlert] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (playerOneTempName === playerTwoTempName) {
      setAlert(true)
      return
    }
    onSubmit(playerOneTempName, playerTwoTempName)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <form
      className="card flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit}
      data-testid='playervsplayerform'
    >
      {alert === true ? (
        <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p class="font-bold">Same username</p>
          <p>Make sure you dont use the same username!</p>
        </div>
      ) : null}
      <input
        type="text"
        placeholder="Player One Name"
        value={playerOneTempName}
        onChange={(e) => setPlayerOneTempName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Player Two Name"
        value={playerTwoTempName}
        onChange={(e) => setPlayerTwoTempName(e.target.value)}
        required
      />
      <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg' type='submit'>
        Start Game
      </button>
      <button className='text-center bg-green-800 bg-opacity-70 p-2 rounded-lg' type='button' onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

PlayerVsPlayerForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default PlayerVsPlayerForm