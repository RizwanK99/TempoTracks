import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRetrieveData = (key) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
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

    retrieveData();
  }, [key]);

  return { data, loading, error };
};

export default useRetrieveData;
