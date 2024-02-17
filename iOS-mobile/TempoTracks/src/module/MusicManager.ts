import { NativeModules } from 'react-native';
import {
  MusicPlayerState,
  RepeatMode,
  ShuffleMode,
  MusicPlayerSong,
} from './MusicManager.types';

export const PlayerPlaybackState = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  STOP: 'STOP',
  SKIP_FORWARD: 'SKIP_FORWARD',
  SKIP_BACKWARD: 'SKIP_BACKWARD',
  RESTART_SONG: 'RESTART_SONG',
};

export const MusicManager = {
  /**
   * CORE PLAYER METHODS
   */

  /**
   * Request Authorization to music library / musickit
   */
  requestMusicAuthorization: async () => {
    return NativeModules.MusicManager.requestAuthorization();
  },
  play: () => {
    return NativeModules.MusicManager.changePlayerPlayback(
      PlayerPlaybackState.PLAY
    );
  },
  pause: () => {
    return NativeModules.MusicManager.changePlayerPlayback(
      PlayerPlaybackState.PAUSE
    );
  },
  skipForward: () => {
    return NativeModules.MusicManager.changePlayerPlayback(
      PlayerPlaybackState.SKIP_FORWARD
    );
  },
  skipBackward: () => {
    return NativeModules.MusicManager.changePlayerPlayback(
      PlayerPlaybackState.SKIP_BACKWARD
    );
  },
  restartSong: () => {
    return NativeModules.MusicManager.changePlayerPlayback(
      PlayerPlaybackState.RESTART_SONG
    );
  },

  getPlayerState: (): Promise<MusicPlayerState> => {
    return NativeModules.MusicManager.getPlayerState();
  },

  /**
   * Change music playback rate
   */
  changePlaybackRate: (playbackRate: number) => {
    return NativeModules.MusicManager.changePlayerState(playbackRate, '', '');
  },

  /**
   * Change music player repeatMode.
    Case all:
      The music player is repeating the currently playing collection, such as an album or a playlist.
    Case none:
      The repeat mode is in a disabled state.
    Case one:
      The music player is repeating the currently playing entry.
   */
  changeRepeatMode: (repeatMode: RepeatMode) => {
    return NativeModules.MusicManager.changePlayerState(0, repeatMode, '');
  },

  /**
   * Change music player shuffle mode.
    Case off
      The shuffle mode is in a disabled state.
    Case songs
      The music player’s shuffle songs mode.
   */
  changeShuffleMode: (shuffleMode: ShuffleMode) => {
    return NativeModules.MusicManager.changePlayerState(0, '', shuffleMode);
  },

  // PLAY METHODS

  // play Song by Id
  playSongWithId: (songId: string) => {
    return NativeModules.MusicManager.playSongWithId(songId);
  },

  // MUSIC CATALOG/LIBRARY METHODS

  // search Music Catalog
  searchMusicCatalog: async (searchTerm: string) => {
    return NativeModules.MusicManager.searchMusicCatalog(searchTerm);
  },

  // search Music Library
  searchMusicLibrary: async (searchTerm: string) => {
    return NativeModules.MusicManager.searchMusicLibrary(searchTerm);
  },

  // get Songs in Library
  getSongLibrary: async (): Promise<MusicPlayerSong[]> => {
    return NativeModules.MusicManager.getSongLibrary();
  },

  // get PlayList Library
  getPlaylistLibrary: async () => {
    return NativeModules.MusicManager.getPlaylistLibrary();
  },

  // QUEUE METHODS

  // add songs to queue by songIds
  addSongsToQueue: async (songIds: string[]) => {
    return NativeModules.MusicManager.addSongsToQueue(songIds);
  },

  // get current queue
  getCurrentQueue: async (): Promise<
    { title: string; subtitle: string; id: string }[]
  > => {
    return NativeModules.MusicManager.getCurrentQueue();
  },
};
