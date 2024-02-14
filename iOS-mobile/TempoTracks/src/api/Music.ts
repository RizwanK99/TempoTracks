import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { MusicManager } from '../module/MusicManager';
import { RepeatMode, ShuffleMode } from '../module/MusicManager.types';
import { Tables } from '../lib/db.types';

interface SongProps {
  songs: Tables<'songs'>[] | undefined;
}

// export const useCurrentSong = ({ songs }: SongProps) => {
//   return useQuery({
//     queryKey: ['currentQueue'],
//     queryFn: async () => {
//       const queue = await MusicManager.getCurrentQueue();

//       if (queue.length === 0) {
//         return null;
//       }

//       const currentSong =
//         songs?.find((song) => song.title === queue[0].title) ?? null;

//       // console.log(
//       //   'currentSong',
//       //   songs?.map((s) => s.title),
//       //   queue[0].title
//       // );

//       return currentSong;
//     },
//     refetchInterval: 1000,
//     enabled: songs && songs.length > 0,
//   });
// };

export const usePlayerState = ({ songs }: SongProps) => {
  return useQuery({
    queryKey: ['playerState'],
    queryFn: async () => {
      const rawState = await MusicManager.getPlayerState();

      // get current song
      const currentSong = songs?.find(
        (song) => song.title === rawState.nowPlayingItem?.title
      );

      return {
        ...rawState,
        currentSong,
      };
    },
    refetchInterval: 2500,
    enabled: songs && songs.length > 0,
  });
};

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
