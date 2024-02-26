// import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
import { createClient } from "@supabase/supabase-js";
import { Database } from "./db.types";

// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

export const supabase = createClient<Database>(
  "https://kbgiqwyohojnejjlkwae.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZ2lxd3lvaG9qbmVqamxrd2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NzQyOTMsImV4cCI6MjAwMjI1MDI5M30.FSCqDJdjvsbpwNp2IJr1LFjtnUkXI-gzwKjJnrkc8JM",
  {
    auth: {
      // storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
