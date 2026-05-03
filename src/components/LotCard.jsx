function getLotStatus(percentFull) {
  if (percentFull >= 95) {
    return "Full";
  }

  if (percentFull >= 75) {
    return "Almost Full";
  }

  if (percentFull >= 45) {
    return "Limited";
  }

  return "Plenty";
}

function LotCard({ lot, onSelectLot }) {
  const filledSpots = lot.capacity - lot.openSpots;
  const percentFull = Math.round((filledSpots / lot.capacity) * 100);
  const status = getLotStatus(percentFull);
  const statusClass = status.toLowerCase().replace(" ", "-");

  return (
    <button className="lot-card" onClick={() => onSelectLot(lot)}>
      <div className="lot-card-top">
        <div>
          <h2>{lot.name}</h2>
          <p>
            {lot.type} Lot · {lot.location}
          </p>
        </div>

        <span className={`lot-status-badge ${statusClass}`}>{status}</span>
      </div>

      <div className="lot-stats">
        <strong>{lot.openSpots}</strong>
        <span>of {lot.capacity} open</span>
      </div>

      <div className="capacity-bar" aria-label={`${percentFull}% full`}>
        <div style={{ width: `${percentFull}%` }}></div>
      </div>

      <p className="lot-card-footer">{percentFull}% occupied</p>
    </button>
  );
}

export default LotCard;