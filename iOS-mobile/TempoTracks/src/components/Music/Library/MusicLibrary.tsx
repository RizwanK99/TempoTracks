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
  const { data: songs, refetch } = useSongs();
  const { data: playlists } = usePlaylists();

  const syncSongs = async () => {
    const librarySongs = await MusicManager.getSongLibrary();

    const { data, error } = await supabase.functions.invoke('sync-songs', {
      body: {
        songs: librarySongs.map((s) => ({
          id: s.id,
          arist: s.artistName,
          title: s.title,
        })),
      },
    });

    if (error) {
      console.error('error syncing songs', error);
    }

    if (data.shouldRefetch === 'yes') {
      refetch();
    }
  };

  useEffect(() => {
    syncSongs();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <PlaylistList playlists={playlists ?? []} />
        <Divider style={{ marginVertical: -12 }} />
        <SongList songs={songs ?? []} />
      </View>

      {songs?.length > 0 ? <CurrentSong song={songs[1]} /> : null}
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
