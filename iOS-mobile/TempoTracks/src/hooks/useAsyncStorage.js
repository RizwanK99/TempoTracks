import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = (key) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const asyncStorage = async () => {
      try {
        setLoading(true);
        const storedData = await AsyncStorage.getItem(key);
        setData(storedData ? JSON.parse(storedData) : null);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    asyncStorage();
  }, [key]);

  return { data, loading, error };
};

export default useAsyncStorage;