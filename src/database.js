import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export async function getLocationList() {
    const { data, error } = await supabase.from("locations")
        .select("id, name, type, pos");

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
