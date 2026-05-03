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

export default function ParkingMap({ spots, onSpotClick, selectedLot, onPolygonClick}) {
    const [loadingData, setLoadingData] = useState(true);
    const [sections, setSections] = useState(null);
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const sectionData = await Database.getAllSections();

            if (sectionData) {
                setSections(sectionData);
                setLoadingData(false);
            }
        }

        fetchData();
    }, []);

    let mapTiles = undefined;
    if (!loadingData) {
        mapTiles =
            sections.map((section) => (
               <Polygon
                positions={section.pos}
                color="red"
                eventHandlers={{
                    click: () => {

                        setPopup(
                            (
                                <Popup
                                position={section.pos[0]}
                                closeButton={true}
                                closeOnClick={false}
                                autoClose={true}
                                eventHandlers={{
                                    remove: () => {
                                        setPopup(null)
                                    }
                                }}
                                >
                                <div>
                                <h3>{section.name || "Parking Lot"}</h3>
                                <h4>{section.key || "Red = Taken, Green = Available"}</h4>

                                <div className="spot-grid-popup">
                                {spots.filter(spot => spot.section === section.id).map((spot) =>
                                    (
                                        <button
                                        key={spot.id}
                                        onClick={() => onSpotClick(spot)}
                                        className={spot.filled ? "taken" : "available"}
                                        >
                                        {spot.position}
                                        </button>
                                    )
                                )}
                                </div>
                                </div>
                                </Popup>
                            )
                        ); 
                    }
                }}
                >
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
        { popup }
        {/* <Marker position={[44.558352, -123.282418]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
        
        <UpdateMap selectedLot={selectedLot} />
        </MapContainer>
    )
}
