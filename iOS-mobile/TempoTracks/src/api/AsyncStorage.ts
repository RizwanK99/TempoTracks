import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";

export type ASYNC_STORAGE_KEYS = "user_data" | "music_queue" | "music_timer";

export const getAsyncStorageItem = async <T>(key: ASYNC_STORAGE_KEYS) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (error) {
    console.error("error fetching from async storage", error);
  }

  return null;
};

export const useAsyncStorageItem = <T>(key: ASYNC_STORAGE_KEYS) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item) {
          return JSON.parse(item) as T;
        }
      } catch (error) {
        console.error("error fetching from async storage", error);
      }

      return null;
    },
  });
};

export const useSetAsyncStorageItem = <T>(key: ASYNC_STORAGE_KEYS) => {
  return useMutation({
    mutationFn: async (obj: T) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(obj));
        return "success";
      } catch (error) {
        console.error("error setting async storage item for key", key, error);
        return "error";
      }
    },
  });
};
