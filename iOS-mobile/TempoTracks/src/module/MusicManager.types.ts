export type RepeatMode = 'all' | 'none' | 'one';
export type ShuffleMode = 'off' | 'none';

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
  playbackRate: number;
  repeatMode: RepeatMode;
  shuffleMode: ShuffleMode;
  nowPlayingItem: MusicPlayerSong | null;
  playbackTime: number;
};
