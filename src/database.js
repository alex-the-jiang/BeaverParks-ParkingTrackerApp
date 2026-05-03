import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export async function getLocationList() {
    const { data: locData, error: locErr } = await supabase.from("locations")
        .select("id, name, type, pos, region");

    if (locErr) {
        console.error(locErr);
        return null;
    }

    let totalData = [];
    for (let i = 0; i < locData.length; i++) {
        const { data: size, error: secErr } = await supabase
            .rpc("get_location_size", { loc: locData[i].id });

        if (secErr) {
            console.error(size, secErr);
            return null;
        }

        totalData[i] = {
            id: locData[i].id,
            name: locData[i].name,
            type: locData[i].type,
            pos: locData[i].pos,
            region: locData[i].region,
            size: size,
        };
    }

    return totalData;
}

export async function getLocationUsage(id) {
    const { data, error } = await supabase
        .rpc("get_location_usage", { loc: id }).single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getAllSections() {
    const { data, error } = await supabase.from("sections")
        .select("id, location, pos");

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getSectionUsage(id) {
    const { count } = await supabase.from("spots")
        .select('*', { count: 'exact', head: true })
        .eq("section", id)
        .eq("filled", true);

    return count;
}

export async function getSectionData(sectionId) {
    const { data, error } = await supabase
        .from("spots")
        .select("id, filled, last_modified, ada, position, section")
        .eq("section", sectionId)
        .order("position", { ascending: true });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getAllSpots() {
    const { data, error } = await supabase.from("spots")
        .select("id, filled, last_modified, ada, section, position")
        .order("position", { ascending: true });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateSpot(id, newStatus) {
    const { error } = await supabase.from("spots")
        .update({ filled: newStatus, last_modified: new Date().toISOString() })
        .eq("id", id);

    if (error) {
        console.log(error);
    }
}
