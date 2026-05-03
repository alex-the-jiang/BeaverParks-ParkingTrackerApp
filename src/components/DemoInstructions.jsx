function DemoInstructions() {
  return (
    <section className="demo-instructions">
      <div>
        <p className="eyebrow">Demo Guide</p>
        <h2>How to use BeaverParks</h2>
      </div>

      <ol>
        <li>Search or filter for a parking lot near campus.</li>
        <li>Sort lots by availability, capacity, or name.</li>
        <li>Click a lot to view its map and spot details.</li>
        <li>Green spots are available. Red spots are taken.</li>
      </ol>
    </section>
  );
}

export default DemoInstructions;