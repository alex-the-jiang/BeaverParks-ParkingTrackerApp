import SpotCard from "./SpotCard";

function SpotGrid({ spots, selectedLocationName = "Selected Lot", onSpotClick }) {
  const availableCount = spots.filter((spot) => !spot.filled).length;
  const takenCount = spots.filter((spot) => spot.filled).length;

  return (
    <section className="spot-section">
      <div className="spot-header">
        <div>
          <h2>{selectedLocationName}</h2>
          <p>Click a spot to mark it as available or taken.</p>
        </div>
      </div>

      <div className="spot-grid">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} onClick={onSpotClick} />
        ))}
      </div>
    </section>
  );
}

export default SpotGrid;