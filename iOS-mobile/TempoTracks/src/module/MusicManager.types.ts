export type RepeatMode = 'all' | 'none' | 'one';
export type ShuffleMode = 'off' | 'none';
export type PlaybackStatus = 'playing' | 'paused' | 'stopped';

/**
 * Song item gotten back from native module
 */
export type MusicPlayerSong = {
  id: string;
  title: string;
  artistName: string;
  durartion: number;
};

export type MusicPlayerState = {
  playbackStatus: PlaybackStatus;
  playbackRate: number;
  repeatMode: RepeatMode;
  shuffleMode: ShuffleMode;
  nowPlayingItem: MusicPlayerSong | null;
  playbackTime: number;
};
