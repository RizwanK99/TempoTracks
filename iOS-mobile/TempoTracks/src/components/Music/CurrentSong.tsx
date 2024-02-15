import { Image, View } from 'react-native';
import { Tables } from '../../lib/db.types';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { MusicManager } from '../../module/MusicManager';
import { usePlayerState, useSongs } from '../../api/Music';

interface Props {
  song: Tables<'songs'>;
}

export const CurrentSong = ({ song }: Props) => {
  const theme = useTheme();

  const { data: songs } = useSongs();
  const { data: playerState } = usePlayerState({ songs });

  if (!playerState?.currentSong) {
    return null;
  }

  const currentSong = playerState.currentSong;
  const isPlaying = playerState.playbackStatus === 'playing';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: currentSong.artwork_url }}
          style={{
            width: 50,
            height: 50,
            borderRadius: theme.roundness,
          }}
        />
        <View style={styles.content}>
          <Text variant='bodyLarge' numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text
            variant='bodySmall'
            style={{
              color: theme.colors.secondary,
            }}
            numberOfLines={1}
          >
            {currentSong.artist}
          </Text>
        </View>
      </View>
      <View style={{ ...styles.row, justifyContent: 'flex-end' }}>
        {!isPlaying ? (
          <IconButton
            icon='play'
            iconColor={theme.colors.onSurface}
            size={32}
            onPress={() => MusicManager.play()}
          />
        ) : (
          <IconButton
            icon='pause'
            iconColor={theme.colors.onSurface}
            size={32}
            onPress={() => MusicManager.pause()}
          />
        )}

        <IconButton
          icon='skip-next'
          iconColor={theme.colors.onSurface}
          size={32}
          onPress={() => MusicManager.skipForward()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 8,
  },
  title: {
    marginBottom: 16,
  },
  row: {
    maxWidth: '65%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  content: {
    justifyContent: 'center',
    marginVertical: 6,
    paddingBottom: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
});
