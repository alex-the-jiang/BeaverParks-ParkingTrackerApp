function SpotCard({ spot, onClick }) {
  const isFilled = spot.filled;

  return (
    <button
      className={`spot-card ${isFilled ? "taken" : "available"}`}
      onClick={() => onClick?.(spot)}
    >
      <span className="spot-number">Spot {spot.spot_num}</span>
      <span className="spot-status">
        {isFilled ? "Taken" : "Available"}
      </span>
    </button>
  );
}

export default SpotCard;