function LotSummaryPanel({ selectedLot, spots }) {
  const lotSpots = spots.filter((spot) => spot.location === selectedLot.id);
  const visibleSpots = lotSpots.length > 0 ? lotSpots : spots;

  const totalSpots = visibleSpots.length;
  const takenSpots = visibleSpots.filter((spot) => spot.filled).length;
  const availableSpots = totalSpots - takenSpots;
  const percentFull =
    totalSpots > 0 ? Math.round((takenSpots / totalSpots) * 100) : 0;

  const latestUpdate = visibleSpots
    .map((spot) => spot.last_modified)
    .filter(Boolean)
    .sort()
    .at(-1);

  let statusLabel = "Plenty";
  if (percentFull >= 90) {
    statusLabel = "Full";
  } else if (percentFull >= 60) {
    statusLabel = "Limited";
  }

  return (
    <section className="lot-summary-panel">
      <div className="lot-summary-top">
        <div>
          <p className="eyebrow">Current Lot</p>
          <h2>{selectedLot.name}</h2>
          <p className="lot-summary-subtitle">
            {selectedLot.type} Lot · {selectedLot.region}
          </p>
        </div>

        <span className={`status-pill ${statusLabel.toLowerCase()}`}>
          {statusLabel}
        </span>
      </div>

      <div className="summary-stat-grid">
        <div className="summary-stat">
          <strong>{availableSpots}</strong>
          <span>Available</span>
        </div>

        <div className="summary-stat">
          <strong>{takenSpots}</strong>
          <span>Taken</span>
        </div>

        <div className="summary-stat">
          <strong>{totalSpots}</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="summary-progress">
        <div className="summary-progress-row">
          <span>Lot occupancy: {percentFull}%</span>
          <span>{availableSpots} open spots</span>
        </div>

        <div className="summary-progress-bar">
          <div style={{ width: `${percentFull}%` }}></div>
        </div>
      </div>

      <p className="last-updated">
        Last updated:{" "}
        {latestUpdate ? new Date(latestUpdate).toLocaleTimeString() : "Unknown"}
      </p>
    </section>
  );
}

export default LotSummaryPanel;
