import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

import { Database } from "@/types/supabase/database";

const supabaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_DATABASE_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: Platform.OS !== "web",
    detectSessionInUrl: false,
  },
});
