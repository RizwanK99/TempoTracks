import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('songs').select('*');

      if (error) {
        console.error('error fetching songs', error);
        return [];
      }

      return data;
    },
  });
};

export const usePlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data, error } = await supabase.from('playlists').select('*');

      if (error) {
        console.error('error fetching playlists', error);
        return [];
      }

      return data;
    },
  });
};
