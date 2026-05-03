import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export async function getLocationList() {
    const { data: locData, error: locErr } = await supabase.from("locations")
        .select("id, name, type, pos");

    if (locErr) {
        console.error(locErr);
        return null;
    }

    const { data: secData, error: secErr } = await supabase.from("sections")
        .select("id");

    if (secErr) {
        console.error(secErr);
        return null;
    }

    let totalCount = 0;
    for (let i = 0; i < secData.length; i++) {
        totalCount += await getSectionUsage(secData[i].id);
    }

    return {
        name: locData.name,
        type: locData.type,
        pos: locData.pos,
        size: totalCount,
    };
}

export async function getLocationUsage(id) {
    const { data: secData, error: secErr } = await supabase.from("sections")
        .select("id")
        .eq("location", id);

    if (secErr) {
        console.error(id, secErr);
        return null;
    }

    let total = 0;
    for (let i = 0; i < secData.length; i++) {
        const { count } = await supabase.from("spots")
            .select('*', { count: 'exact', head: true })
            .eq("section", secData[i].id)
            .eq("filled", true);
        total += count;
    }

    return total;
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

export async function getSectionData(section) {
    const { data, error } = await supabase.from("spots")
        .select("id, filled, last_modified, ada")
        .eq("section", id)
        .order("position", { ascending: true });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}
