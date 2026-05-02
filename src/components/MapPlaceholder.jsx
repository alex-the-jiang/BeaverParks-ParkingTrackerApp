function MapPlaceholder({ selectedLot, spots }) {
  const availableCount = spots.filter((spot) => !spot.filled).length;

  return (
    <section className="map-placeholder">
      <div className="map-box">
        <div className="stadium-shape">Reser Stadium</div>

        <div className="fake-lot">
          {spots.slice(0, 8).map((spot) => (
            <div
              key={spot.id}
              className={`fake-spot ${spot.filled ? "taken" : "available"}`}
              title={`Spot ${spot.spot_num}: ${
                spot.filled ? "Taken" : "Available"
              }`}
            ></div>
          ))}
        </div>

        <div className="map-popup">
          <strong>{selectedLot.name}</strong>
          <span>{availableCount} spots currently open</span>
        </div>
      </div>
    </section>
  );
}

export default MapPlaceholder;