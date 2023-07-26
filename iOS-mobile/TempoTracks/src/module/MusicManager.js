import { NativeModules } from 'react-native'

const MusicManager = NativeModules.MusicManager;

export const PlayerPlaybackState = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  SKIP_FORWARD: "SKIP_FORWARD",
  SKIP_BACKWARD: "SKIP_BACKWARD",
  RESTART_SONG: "RESTART_SONG",
}

export const PlayerRepeatMode = {
  NONE: "NONE",
  ONE: "ONE",
  ALL: "ALL",
}

/**
 * CORE PLAYER METHODS
 */

// request Music Authorization
export const requestMusicAuthorization = async () => {
  return NativeModules.MusicManager.requestAuthorization()
}

export const play = () => {
  return NativeModules.MusicManager.changePlayerPlayback(PlayerPlaybackState.PLAY)
}

export const pause = () => {
  return NativeModules.MusicManager.changePlayerPlayback(PlayerPlaybackState.PAUSE)
}

export const skipForward = () => {
  return NativeModules.MusicManager.changePlayerPlayback(PlayerPlaybackState.SKIP_FORWARD)
}

export const skipBackward = () => {
  return NativeModules.MusicManager.changePlayerPlayback(PlayerPlaybackState.SKIP_BACKWARD)
}

export const restartSong = () => {
  return NativeModules.MusicManager.changePlayerPlayback(PlayerPlaybackState.RESTART_SONG)
}

// change playback rate
export const changePlaybackRate = (playbackRate) => {
  return NativeModules.MusicManager.changePlayerState(
    playbackRate,
    "",
    ""
  )
}

// change player repeatMode
export const changeRepeatMode = (repeatMode) => {
  return NativeModules.MusicManager.changePlayerState(
    0,
    repeatMode,
    ""
  )
}

// change player shuffleMode
export const changeShuffleMode = (shuffleMode) => {
  return NativeModules.MusicManager.changePlayerState(
    0,
    "",
    shuffleMode
  )
}

/**
 * PLAY METHODS
 */
// play Song by Id
export const playSongWithId = (songId) => {
  return NativeModules.MusicManager.playSongWithId(songId)
}

/**
 * MUSIC CATALOG/LIBRARY METHODS
 */
// search Music Catalog
export const searchMusicCatalog = async (searchTerm) => {
  return NativeModules.MusicManager.searchMusicCatalog(searchTerm)
}

// search Music Library
export const searchMusicLibrary = async (searchTerm) => {
  return NativeModules.MusicManager.searchMusicLibrary(searchTerm)
}

// get Songs in Library
export const getSongLibrary = async () => {
  return NativeModules.MusicManager.getSongLibrary()
}

// get PlayList Library
export const getPlayListLibrary = async () => {
  return NativeModules.MusicManager.getPlayListLibrary()
}

// get Songs in PlayList
export const getSongsInPlayList = async (playListId) => {
  return NativeModules.MusicManager.getPlayListLibrary(playListId)
}

/**
 * Queue Methods
 */
// add songs to queue by songIds
export const addSongsToQueue = async (songIds) => {
  return NativeModules.MusicManager.addSongsToQueue(songIds)
}

// get current queue
export const getCurrentQueue = async () => {
  return NativeModules.MusicManager.getCurrentQueue()
}