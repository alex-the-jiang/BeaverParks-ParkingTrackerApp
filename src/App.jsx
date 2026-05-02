import { useState } from "react";
import SpotGrid from "./components/SpotGrid";
import "./App.css";

const initialSpots = [
  {
    id: 1,
    location: 1,
    filled: false,
    last_modified: "2026-04-10T12:00:00",
    positioning: {},
    spot_num: 1,
  },
  {
    id: 2,
    location: 1,
    filled: true,
    last_modified: "2026-04-10T12:01:00",
    positioning: {},
    spot_num: 2,
  },
  {
    id: 3,
    location: 1,
    filled: false,
    last_modified: "2026-04-10T12:02:00",
    positioning: {},
    spot_num: 3,
  },
  {
    id: 4,
    location: 1,
    filled: true,
    last_modified: "2026-04-10T12:03:00",
    positioning: {},
    spot_num: 4,
  },
];

function App() {
  const [spots, setSpots] = useState(initialSpots);

  function handleSpotClick(clickedSpot) {
    setSpots((currentSpots) =>
      currentSpots.map((spot) =>
        spot.id === clickedSpot.id
          ? {
              ...spot,
              filled: !spot.filled,
              last_modified: new Date().toISOString(),
            }
          : spot
      )
    );
  }

  return (
    <main className="app">
      <h1>BeaverParks</h1>
      <p>Find open parking around OSU.</p>

      <SpotGrid
        spots={spots}
        selectedLocationName="Reser Stadium B Lot"
        onSpotClick={handleSpotClick}
      />
    </main>
  );
}

export default App;