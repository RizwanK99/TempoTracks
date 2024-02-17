import { SafeAreaView, StyleSheet, View } from 'react-native';
import { usePlaylists, useSongs } from '../../../api/Music';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { MusicManager } from '../../../module/MusicManager';
import { SongList } from './SongList';
import { PlaylistList } from './PlaylistList';
import { Divider } from 'react-native-paper';
import { CurrentSong } from '../CurrentSong';

export const MusicLibrary = () => {
  const { data: songs = [], refetch } = useSongs();
  const { data: playlists = [], refetch: refetchPlaylists } = usePlaylists();

  const syncSongs = async () => {
    const librarySongs = await MusicManager.getSongLibrary();

    const { data, error } = await supabase.functions.invoke(
      'music/sync-songs',
      {
        body: {
          songs: librarySongs.map((s) => ({
            id: s.id,
            artist: s.artistName,
            title: s.title,
          })),
        },
      }
    );

    if (error) {
      console.error('error syncing songs', error);
    }

    if (data.shouldRefetch === 'yes') {
      refetch();
    }
  };

  const syncPlaylists = async () => {
    const libraryPlaylists = await MusicManager.getPlaylistLibrary();

    console.log('libraryPlaylists', libraryPlaylists);

    const { data, error } = await supabase.functions.invoke(
      'music/sync-playlists',
      {
        body: {
          playlists: libraryPlaylists,
        },
      }
    );

    if (error) {
      console.error('error syncing playlists', error);
    }

    if (data.shouldRefetch === 'yes') {
      refetchPlaylists();
    }
  };

  useEffect(() => {
    // syncSongs();
    syncPlaylists();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <PlaylistList playlists={playlists} />
        <Divider style={{ marginVertical: -12 }} />
        <SongList songs={songs} />
      </View>

      <CurrentSong />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 24,
    backgroundColor: '#181a1c',
    height: '100%',
    width: '100%',
  },
});
