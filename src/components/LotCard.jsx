import { useState, useEffect } from "react";
import * as Database from "../database.js";

function getLotStatus(percentFull) {
    if (percentFull >= 95) {
        return "Full";
    }

    if (percentFull >= 75) {
        return "Almost Full";
    }

    if (percentFull >= 45) {
        return "Limited";
    }

    return "Plenty";
}

function LotCard({ lot, onSelectLot }) {
    const [filledSpots, setFilledSpots] = useState(0);

    useEffect(() => {
        let isMounted = true;

        async function fetchFilledSpots() {
            const lotData = await Database.getLocationUsage(lot.id);

            if (isMounted && lotData !== null && lotData !== undefined) {
                setFilledSpots(lotData);
            }
        }

        fetchFilledSpots();

        return () => {
            isMounted = false;
        };
    }, [lot.id]);

    const totalSpots = lot.size ?? 0;
    const availableSpots = Math.max(totalSpots - filledSpots, 0);
    const percentFull =
        totalSpots > 0 ? Math.round((filledSpots / totalSpots) * 100) : 0;

    const status = totalSpots > 0 ? getLotStatus(percentFull) : "Unknown";
    const statusClass = status.toLowerCase().replace(" ", "-");

    return (
        <button className="lot-card" onClick={() => onSelectLot(lot)}>
            <div className="lot-card-top">
                <div>
                    <h2>{lot.name}</h2>
                    <p>
                        {lot.type} Lot · {lot.region ?? "OSU Campus"}
                    </p>
                </div>

                <span className={`lot-status-badge ${statusClass}`}>{status}</span>
            </div>

            <div className="lot-stats">
                <strong>{availableSpots}</strong>
                <span>of {totalSpots} open</span>
            </div>

            <div className="capacity-bar" aria-label={`${percentFull}% full`}>
                <div style={{ width: `${percentFull}%` }}></div>
            </div>

            <p className="lot-card-footer">{percentFull}% occupied</p>
        </button>
    );
}

export default LotCard;