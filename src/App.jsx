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

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("highest-capacity");
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([]);
  const [showSpotGrid, setShowSpotGrid] = useState(false);

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
      const totalSpots = lot.size ?? 0;

      const matchesType = typeFilter === "all" || lot.type === typeFilter;

      const matchesSearch =
        lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.region?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "all" || lot.region === locationFilter;

      const matchesCapacity =
        capacityFilter === "all" ||
        (capacityFilter === "small" && totalSpots < 50) ||
        (capacityFilter === "medium" && totalSpots >= 50 && totalSpots <= 150) ||
        (capacityFilter === "large" && totalSpots > 150);

      return matchesType && matchesSearch && matchesLocation && matchesCapacity;
    })
    .sort((a, b) => {
      const aSize = a.size ?? 0;
      const bSize = b.size ?? 0;

      if (sortOption === "highest-capacity") {
        return bSize - aSize;
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
    setSortOption("highest-capacity");
    setSearchTerm("");
  }

  function handleSpotClick(clickedSpot) {
    Database.updateSpot(clickedSpot.id, !clickedSpot.filled);

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
              <ParkingMap 
                spots={spots} 
                onSpotClick={handleSpotClick} 
                selectedLot={selectedLot} 
                onPolygonClick={() => setShowSpotGrid(true)}
              />
            </div>
          </div>
          {/* {showSpotGrid && (
          <SpotGrid
            spots={spots}
            selectedLocationName={selectedLot.name}
            onSpotClick={handleSpotClick}
          />
          )} */}
        </section>
      )}
      <Footer />
    </main>
  );
}

export default App;
