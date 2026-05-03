import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import * as Database from './database.js';

export default function ParkingMap() {
    const [loadingData, setLoadingData] = useState(true);
    const [spots, setSpots] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const spots = await Database.getAllSpots();

            if (spots) {
                setSpots(spots);
                setLoadingData(false);
            }
        }

        fetchData();
    }, []);

    let mapData = undefined;
    if (!loadingData) {
        mapData =
            spots.map((spot) => (
                <Rectangle
                bounds={spot.positioning}
                color="red"
                />
            ))
    }

    return (
        <MapContainer center={[44.558352, -123.282418]} zoom={18} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { mapData }
        {/* <Marker position={[44.558352, -123.282418]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
        </MapContainer>
    )
}
