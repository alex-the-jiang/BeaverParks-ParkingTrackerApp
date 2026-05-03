import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

function UpdateMap({ selectedLot }) {
    const map = useMap();

    if (selectedLot?.pos) {
        map.setView([selectedLot.pos.lat, selectedLot.pos.long], 25);
    }

    return null;
}

export default function ParkingMap({ selectedLot }) {
    return (
        <MapContainer center={[44.558352, -123.282418]} zoom={25} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <UpdateMap selectedLot={selectedLot} />
        </MapContainer>
    )
}