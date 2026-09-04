import { createClient } from "@supabase/supabase-js";

console.log({ url: process.env.SUPABASE_URL, key: process.env.SUPABASE_KEY });

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
