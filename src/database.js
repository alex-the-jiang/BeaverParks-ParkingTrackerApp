import { createClient } from "@supabase/supabase-js";

export function initDatabase() {
    return createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
}

export async function getLocationList(supabase) {
    const { data, err } = await supabase.from("locations")
        .select("name, type, pos, spots(count)");

    if (err) {
        console.error(err);
        return null;
    }

    return data;
}

export async function getLocationUsage(supabase, id) {
    const { count, err } = await supabase.from("spots")
        .select("*", { count: 'exact', head: 'true' })
        .eq("location", id)
        .eq("filled", true);

    if (err) {
        console.error(err);
        return null;
    }

    return count;
}

export async function getAllSpots(supabase) {
    const { data, err } = await supabase.from("spots")
        .select("id, filled, positioning");

    if (err) {
        console.error(err);
        return null;
    }

    return data;
}

export async function getSpotData(supabase, id) {
    const { spotData, spotErr } = await supabase.from("spots")
        .select("location, filled, last_modified, spot_num")
        .eq("id", id)
        .single();

    if (spotErr) {
        console.error(spotErr);
        return null;
    }

    const { locData, locErr } = await supabase.from("locations")
        .select("name, type")
        .eq("id", locData.location)
        .single();

    if (locErr) {
        console.error(locErr);
        return null;
    }

    return {
        spot: spotData,
        location: locData,
    }
}
