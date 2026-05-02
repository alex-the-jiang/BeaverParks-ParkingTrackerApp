import LotCard from "./LotCard";

function LotList({ lots, onSelectLot }) {
  return (
    <section className="lot-list">
      <div className="section-title">
        <h2>Parking Lots</h2>
        <p>Click a lot to view its map and available spots.</p>
      </div>

      {lots.length === 0 ? (
        <p className="empty-state">No parking lots match your filters.</p>
      ) : (
        <div className="lot-card-grid">
          {lots.map((lot) => (
            <LotCard key={lot.id} lot={lot} onSelectLot={onSelectLot} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LotList;