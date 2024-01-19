import PropTypes from 'prop-types'

function ShipPlacement({ ships }) {

  const shipsToPlace = ships.filter(ship => !ship.placed)

  return (
    <div className="flex flex-col items-center">
      {shipsToPlace.map((ship) => (
        <button
          key={ship.shipId}
          className='p-2 m-2 border border-blue-500 bg-white'
          data-testid={`ship-button-${ship.shipId}`}
        >
          {ship.shipId.charAt(0).toUpperCase() + ship.shipId.slice(1)}
          <br />
          Ship Size: {ship.size}
        </button>
      ))}
    </div>
  )
}

ShipPlacement.propTypes = {
  ships: PropTypes.array.isRequired,
}

export default ShipPlacement