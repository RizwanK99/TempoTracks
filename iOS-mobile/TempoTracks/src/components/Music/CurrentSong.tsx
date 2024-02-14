import { Image, View } from 'react-native';
import { Tables } from '../../lib/db.types';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface Props {
  song: Tables<'songs'>;
}

export const CurrentSong = ({ song }: Props) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{ uri: song.artwork_url }}
          style={{
            width: 50,
            height: 50,
            borderRadius: theme.roundness,
          }}
        />
        <View style={styles.content}>
          <Text variant='bodyLarge'>{song.title}</Text>
          <Text
            variant='bodySmall'
            style={{
              color: theme.colors.secondary,
            }}
          >
            {song.artist}
          </Text>
        </View>
      </View>
      <View style={{ ...styles.row, justifyContent: 'flex-end' }}>
        <IconButton
          icon='play'
          iconColor={theme.colors.onSurface}
          size={32}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon='skip-next'
          iconColor={theme.colors.onSurface}
          size={32}
          onPress={() => console.log('Pressed')}
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
    // height: 50,
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
    width: '50%',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 6,
    paddingBottom: 4,
    marginHorizontal: 12,
  },
});
