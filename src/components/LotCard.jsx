function LotCard({ lot, onSelectLot }) {
  const filledSpots = lot.capacity - lot.openSpots;
  const percentFull = Math.round((filledSpots / lot.capacity) * 100);

  return (
    <button className="lot-card" onClick={() => onSelectLot(lot)}>
      <div>
        <h2>{lot.name}</h2>
        <p>
          {lot.type} Lot · {lot.location}
        </p>
      </div>

      <div className="lot-stats">
        <strong>{lot.openSpots}</strong>
        <span>of {lot.capacity} open</span>
      </div>

      <div className="capacity-bar" aria-label={`${percentFull}% full`}>
        <div style={{ width: `${percentFull}%` }}></div>
      </div>
    </button>
  );
}

export default LotCard;