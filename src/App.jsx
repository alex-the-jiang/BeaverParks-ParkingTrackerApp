import { useState } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import LotList from "./components/LotList";
import MapPlaceholder from "./components/MapPlaceholder";
import SpotGrid from "./components/SpotGrid";
import "./App.css";
import ParkingMap from "./ParkingMap.jsx";

const mockLots = [
  {
    id: 1,
    name: "Reser Stadium B Lot",
    type: "B",
    location: "Reser Stadium",
    capacity: 183,
    openSpots: 23,
  },
  {
    id: 2,
    name: "Reser Stadium C Lot",
    type: "C",
    location: "Reser Stadium",
    capacity: 96,
    openSpots: 41,
  },
  {
    id: 3,
    name: "East LaSells B Lot",
    type: "B",
    location: "LaSells Stewart Center",
    capacity: 38,
    openSpots: 12,
  },
];

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
  {
    id: 5,
    location: 1,
    filled: false,
    last_modified: "2026-04-10T12:04:00",
    positioning: {},
    spot_num: 5,
  },
  {
    id: 6,
    location: 1,
    filled: false,
    last_modified: "2026-04-10T12:05:00",
    positioning: {},
    spot_num: 6,
  },
  {
    id: 7,
    location: 1,
    filled: true,
    last_modified: "2026-04-10T12:06:00",
    positioning: {},
    spot_num: 7,
  },
  {
    id: 8,
    location: 1,
    filled: false,
    last_modified: "2026-04-10T12:07:00",
    positioning: {},
    spot_num: 8,
  },
];

function App() {
  const [selectedLot, setSelectedLot] = useState(null);
  const [spots, setSpots] = useState(initialSpots);
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLots = mockLots.filter((lot) => {
    const matchesType = typeFilter === "all" || lot.type === typeFilter;
    const matchesSearch =
      lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

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
    <main className="app-shell">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {!selectedLot ? (
        <section className="dashboard-layout">
          <FilterPanel typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

          <LotList lots={filteredLots} onSelectLot={setSelectedLot} />
        </section>
      ) : (
        <section className="detail-layout">
          <button className="back-button" onClick={() => setSelectedLot(null)}>
            ← Back to lots
          </button>

          <ParkingMap spots={spots} onSpotClick={handleSpotClick} />

          <SpotGrid
            spots={spots}
            selectedLocationName={selectedLot.name}
            onSpotClick={handleSpotClick}
          />
        </section>
      )}
    </main>
  );
}

export default App;