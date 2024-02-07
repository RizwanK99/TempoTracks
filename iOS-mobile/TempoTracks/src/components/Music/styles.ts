import { StyleSheet } from 'react-native';

export const musicStyles = StyleSheet.create({
  song: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  songTitle: {
    color: 'white',
    fontSize: 18,
    marginRight: 6,
  },
  songArtist: {
    color: 'grey',
    fontSize: 14,
    maxWidth: '80%',
    marginTop: 2,
  },
  songDuration: {
    color: 'grey',
    fontSize: 14,
  },
  playerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  playerControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
