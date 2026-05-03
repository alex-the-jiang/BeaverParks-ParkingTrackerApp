import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterPanel from "./components/FilterPanel";
import LotList from "./components/LotList";
import SpotGrid from "./components/SpotGrid";
import "./App.css";
import ParkingMap from "./ParkingMap.jsx";
import DemoInstructions from "./components/DemoInstructions";
import LotSummaryPanel from "./components/LotSummaryPanel";
import * as Database from "./database.js";

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
  const [locations, setLocations] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("most-open");
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const locations = await Database.getLocationList();
      if (locations) {
        setLocations(locations);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const spots = await Database.getAllSpots();
      if (spots) {
        setSpots(spots);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const sections = await Database.getAllSections();
        if (sections) {
        setSections(sections);
        }
    }
    fetchData();
  }, []);

  const filteredLots = (locations ?? [])
    .filter((lot) => {
      const matchesType = typeFilter === "all" || lot.type === typeFilter;

      const matchesSearch =
        lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.region?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "all" || lot.region === locationFilter;

      const matchesCapacity =
        capacityFilter === "all" ||
        (capacityFilter === "small" && lot.capacity < 50) ||
        (capacityFilter === "medium" &&
          lot.capacity >= 50 &&
          lot.capacity <= 150) ||
        (capacityFilter === "large" && lot.capacity > 150);

      return matchesType && matchesSearch && matchesLocation && matchesCapacity;
    })
    .sort((a, b) => {
      if (sortOption === "most-open") {
        return b.openSpots - a.openSpots;
      }

      if (sortOption === "least-full") {
        const aPercentFull = (a.capacity - a.openSpots) / a.capacity;
        const bPercentFull = (b.capacity - b.openSpots) / b.capacity;
        return aPercentFull - bPercentFull;
      }

      if (sortOption === "highest-capacity") {
        return b.capacity - a.capacity;
      }

      if (sortOption === "az") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  function handleClearFilters() {
    setTypeFilter("all");
    setLocationFilter("all");
    setCapacityFilter("all");
    setSortOption("most-open");
    setSearchTerm("");
  }

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

  const selectedLotSections = sections
    .filter(section => section.location === selectedLot?.id)
    .map(section => section.id);
  const selectedLotSpots = spots.filter(spot => selectedLotSections.includes(spot.section));

  return (
    <main className="app-shell">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {!selectedLot ? (
        <section className="dashboard-layout">
          <div className="sidebar-stack">
            <FilterPanel
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              capacityFilter={capacityFilter}
              setCapacityFilter={setCapacityFilter}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onClearFilters={handleClearFilters}
            />

            <DemoInstructions />
          </div>

          <LotList lots={filteredLots} onSelectLot={setSelectedLot} />
        </section>
      ) : (
        <section className="detail-layout">
          <button className="back-button" onClick={() => setSelectedLot(null)}>
            ← Back to lots
          </button>

          {searchTerm && (
            <section className="detail-search-results">
              <h2>Search Results</h2>

              {filteredLots.length === 0 ? (
                <p>No parking lots match your search.</p>
              ) : (
                <div className="detail-search-list">
                  {filteredLots.map((lot) => (
                    <button
                      key={lot.id}
                      className={`detail-search-item ${selectedLot.id === lot.id ? "active" : ""
                        }`}
                      onClick={() => {
                        setSelectedLot(lot);
                        setSearchTerm("");
                      }}
                    >
                      <span>{lot.name}</span>
                      <small>
                        {lot.type} Lot · {lot.region}
                      </small>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          <div className="detail-main-grid">
            <LotSummaryPanel selectedLot={selectedLot} spots={selectedLotSpots} />

            <div className="map-panel">
              <ParkingMap spots={spots} onSpotClick={handleSpotClick} selectedLot={selectedLot} />
            </div>
          </div>

          <SpotGrid
            spots={spots}
            selectedLocationName={selectedLot.name}
            onSpotClick={handleSpotClick}
          />
        </section>
      )}
      <Footer/>
    </main>
  );
}

export default App;
