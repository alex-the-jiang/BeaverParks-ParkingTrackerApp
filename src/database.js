import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export async function getLocationList() {
    const { data, error } = await supabase.from("locations")
        .select("name, type, pos, spots(count)");

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getLocationUsage(id) {
    const { count, error } = await supabase.from("spots")
        .select("*", { count: 'exact', head: 'true' })
        .eq("location", id)
        .eq("filled", true);

    if (error) {
        console.error(error);
        return null;
    }

    return count;
}

export async function getAllSpots() {
    const { data, error } = await supabase.from("spots")
        .select("id, filled, positioning");

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getSpotData(id) {
    const { data: spotData, error: spotErr } = await supabase.from("spots")
        .select("id, location, filled, last_modified, spot_num")
        .eq("id", id)
        .single();

    if (spotErr) {
        console.error(spotErr);
        return null;
    }

    console.log(spotData);

    const { data: locData, error: locErr } = await supabase.from("locations")
        .select("name, type")
        .eq("id", spotData.location)
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
