//
//  MusicManager.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2023-07-25.
//

import Foundation
import MusicKit

@objc(MusicManager)
class MusicManager: NSObject {
  private var musicPlayer = ApplicationMusicPlayer.shared
  
  @objc
  func requestAuthorization(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      let response: MusicAuthorization.Status = await MusicAuthorization.request()
      resolve([response.rawValue])
    }
  }
  
  @objc
  func searchMusicCatalog(
    _ searchTerm: NSString,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    let term = searchTerm as String
    Task {
      let request = MusicCatalogSearchRequest.init(term: term, types: [Song.self])
      let response: MusicCatalogSearchResponse = try await request.response()
      
      // serialize into json
      var serailizedSongs: [[String: Any]] = []
      for song in response.songs {
        serailizedSongs.append([
          "title": song.title,
          "artistName": song.artistName,
          "artwork": song.artwork?.url(width: 500, height: 500) ?? "",
          "duration": Int(song.duration?.rounded() ?? 0),
          "id": song.id.rawValue,
          "url": song.url?.absoluteString ?? "",
        ])
      }
      
      resolve([serailizedSongs])
    }
  }
  
  @objc
  func searchMusicLibrary(
    _ searchTerm: NSString,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    let term = searchTerm as String
    Task {
      let request = MusicLibrarySearchRequest.init(term: term, types: [Song.self])
      let response: MusicLibrarySearchResponse = try await request.response()
      
      // serialize into json
      var serailizedSongs: [[String: Any]] = []
      for song in response.songs {
        serailizedSongs.append([
          "title": song.title,
          "artistName": song.artistName,
          "artwork": song.artwork?.url(width: 500, height: 500) ?? "",
          "duration": Int(song.duration?.rounded() ?? 0),
          "id": song.id.rawValue,
          "url": song.url?.absoluteString ?? "",
        ])
      }
      
      resolve([serailizedSongs])
    }
  }
  
  @objc
  func getSongLibrary(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      let request = MusicLibraryRequest<Song>.init()
      let response: MusicLibraryResponse<Song> = try await request.response()
      
      // serialize into json
      var serailizedSongs: [[String: Any]] = []
      for song in response.items {
        serailizedSongs.append([
          "title": song.title,
          "artistName": song.artistName,
          "artwork": song.artwork?.url(width: 500, height: 500) ?? "",
          "duration": Int(song.duration?.rounded() ?? 0),
          "id": song.id.rawValue,
          "url": song.url?.absoluteString ?? "",
        ])
      }

      resolve([serailizedSongs])
    }
  }
  
  @objc
  func getPlaylistLibrary(
    _ playlistId: NSString,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    let playlistIdParam = playlistId as String
    Task {
      var request = MusicLibraryRequest<Playlist>.init()
      
      if (playlistIdParam != "") {
        request.filter(matching: \.id, equalTo: MusicItemID(stringLiteral: playlistIdParam))
      }
      
      let response: MusicLibraryResponse<Playlist> = try await request.response()
      
      // serialize into json
      
      var serailizedPlaylists: [[String: Any]] = []
      for playlist in response.items {
        // serialize tracks
        var serializedTracks: [[String: Any]] = []
        
        for track in playlist.tracks ?? [] {
          serializedTracks.append([
            "title": track.title,
            "artistName": track.artistName,
            "artwork": track.artwork?.url(width: 500, height: 500) ?? "",
            "duration": Int(track.duration?.rounded() ?? 0),
            "id": track.id.rawValue,
            "url": track.url?.absoluteString ?? "",
          ])
        }
        
        serailizedPlaylists.append([
          "id": playlist.id.rawValue,
          "title": playlist.name,
          "description": playlist.description,
          "kind": (
              playlist.kind == Playlist.Kind.external ? "external" :
              playlist.kind == Playlist.Kind.personalMix ? "personalMix" :
              playlist.kind == Playlist.Kind.editorial ? "editorial" :
              playlist.kind == Playlist.Kind.replay ? "replay" :
              playlist.kind == Playlist.Kind.userShared ? "userShared" : ""
          ),
          "tracks": serializedTracks
        ])
      }

      resolve([serailizedPlaylists])
    }
  }
  
  @objc
  func playSongWithId(
    _ songId: NSString
  ) {
    let songIdParam = songId as String
    
    Task {
      // fetch song item
      var request = MusicLibraryRequest<Song>()
      request.filter(matching: \.id, equalTo: MusicItemID(stringLiteral: songIdParam))
      let libraryResponse: MusicLibraryResponse = try await request.response()
      
      let song = libraryResponse.items[0]
      // set the queue
      musicPlayer.queue = [song]
      
      try await musicPlayer.play()
    }
  }
  
  @objc
  func addSongsToQueue(
    _ songIds: NSArray,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let songIdsArray = songIds as? [String]
    
    Task {
      var indexMap = [Int: String]()
      
      // create index mapping
      for (index, songId) in (songIdsArray ?? []).enumerated()  {
        indexMap[index] = songId
      }
      
      var memberOfArray: [MusicItemID] = []
      
      for songId in songIdsArray ?? [] {
        memberOfArray.append(MusicItemID(stringLiteral: songId))
      }
      
      let request = MusicCatalogResourceRequest<Song>(matching: \.id, memberOf: memberOfArray)
      let response = try await request.response()
      
      // create songId -> song mapping
      var songMapping = [String: Song]()
      
      for song in response.items {
        songMapping[song.id.rawValue] = song
      }
      
      var finalSongArray: [Song] = []
      
      for i in 0..<(songIdsArray?.count ?? 0) {
        if let songId = indexMap[i], let song = songMapping[songId] {
          finalSongArray.append(song)
        }
      }
      
      musicPlayer.queue = ApplicationMusicPlayer.Queue.init(for: finalSongArray)
      
      resolve(["Success"])
    }
  }
  
  @objc
  func getCurrentQueue(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    var queueArray: [[String: Any]] = []
    
    for queueItem in musicPlayer.queue.entries {
      queueArray.append([
        "title": queueItem.title,
        "subtitle": queueItem.subtitle ?? "",
        "description": queueItem.description,
        "id": queueItem.id,
      ])
    }
    
    resolve([queueArray])
  }
  
  @objc
  func changePlayerPlayback(
    _ nextState: NSString
  ) {
    let nextPlayerState = nextState as String
    Task {
      switch nextPlayerState {
      case "PLAY":
        try await musicPlayer.play()
      case "PAUSE":
        musicPlayer.pause()
      case "SKIP_FORWARD":
        try await musicPlayer.skipToNextEntry()
      case "SKIP_BACK":
        try await musicPlayer.skipToPreviousEntry()
      case "RESTART_SONG":
        musicPlayer.restartCurrentEntry()
      default:
        break
      }
    }
  }
  
  @objc
  func changePlayerState(
    _ playbackRate: NSNumber,
    repeat repeatMode: NSString,
    shuffle shuffleMode: NSString
  ) {
    /*
     {
      playbackRate: 0.5 -> 1.5,
      repeatMode: ["all", "none", "one"],
      shuffleMode: ["off", "songs"]
     }
     */
    
    // set playback rate if not 0
    if (playbackRate.floatValue > 0) {
      musicPlayer.state.playbackRate = playbackRate.floatValue
    }
    
    // set repeatMode if not empty string
    switch repeatMode {
    case "ALL":
      musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.all
    case "NONE":
      musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.none
    case "ONE":
      musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.one
    default:
      break
    }
    
    // set shuffleMode if not empty string
    switch shuffleMode {
    case "OFF":
      musicPlayer.state.shuffleMode = MusicPlayer.ShuffleMode.off
    case "SONGS":
      musicPlayer.state.shuffleMode = MusicPlayer.ShuffleMode.songs
    default:
      break
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
}
