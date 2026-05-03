import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import * as Database from './database.js';

function UpdateMap({ selectedLot }) {
    const map = useMap();

    if (selectedLot?.pos) {
        map.setView([selectedLot.pos.lat, selectedLot.pos.long], 18);
    }

    return null;
}

function getColor(section, sectionUsage) {
    let usage = sectionUsage.find((uSec) => uSec.id == section.id).spots[0].count;
    let size = section.spots[0].count;
    let ratio = usage / size;

    if (ratio <= 0.50) {
        return "green";
    } else if (ratio <= 0.90) {
        return "orange";
    } else {
        return "red";
    }
}

export default function ParkingMap({ spots, onSpotClick, selectedLot, onPolygonClick}) {
    const [loadingData, setLoadingData] = useState(true);
    const [sections, setSections] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [sectionUsage, setSectionUsage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const sectionData = await Database.getAllSections();
            const sectionUsageData = await Database.getSectionUsage();

            if (sectionData && sectionUsageData) {
                setSections(sectionData);
                setSectionUsage(sectionUsageData);
                setLoadingData(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setSelectedSection(null);
    }, [selectedLot]);

    let mapTiles = undefined;
    if (!loadingData) {
        mapTiles =
            sections
                .filter(section => section.location === selectedLot?.id)
                .map((section) => (
                <Polygon
                    positions={section.pos}
                    color={getColor(section, sectionUsage)}
                    eventHandlers={{
                        click: () => setSelectedSection(section)
                    }}
                    >
                    {selectedSection?.id === section.id && (
                        <Popup
                        position={section.pos[0]}
                        closeButton={true}
                        closeOnClick={false}
                        autoClose={true}
                        eventHandlers={{
                            remove: () => setSelectedSection(null)
                        }}
                        >
                        <div>
                            <h3>{section.name || "Parking Lot"}</h3>
                            <h4>{section.key || "Red = Taken, Green = Available"}</h4>

                            <div className="spot-grid-popup">
                            {spots.filter(spot => spot.section === selectedSection.id).map((spot) =>
                                (
                                    <button
                                    key={spot.id}
                                    onClick={() => onSpotClick(spot)}
                                    className={spot.filled ? "taken" : "available"}
                                    >
                                    {spot.position+1}
                                    </button>
                                )
                            )}
                            </div>
                        </div>
                        </Popup>
                    )}
                    </Polygon>
                ))
    }

    return (
        <MapContainer center={[44.558352, -123.282418]} zoom={18} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { mapTiles }
        
        <UpdateMap selectedLot={selectedLot} />
        </MapContainer>
    )
}
