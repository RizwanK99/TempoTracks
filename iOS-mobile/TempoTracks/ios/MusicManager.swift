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
  private var musicPlayer = SystemMusicPlayer.shared
  
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
      
      resolve(serailizedSongs)
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
      
      resolve(serailizedSongs)
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
        var serializedSong: [String: Any] = [:]

        serializedSong["title"] = song.title
        serializedSong["artistName"] = song.artistName
        serializedSong["duration"] = Int(song.duration?.rounded() ?? 0)
        serializedSong["id"] = song.id.rawValue
        
//        print("song", song.artwork);
//        serailizedSongs.append([
//          "title": song.title,
//          "artistName": song.artistName,
//          "artwork": song.artwork != nil ? [
//            "url": song.artwork.url(width: 500, height: 500) ?? "",
//            "backgroundColor": song.artwork.backgroundColor,
//            "textColor": song.artwork.primaryTextColor,
//          ] : NSNull,
//          "duration": Int(song.duration?.rounded() ?? 0),
//          "id": song.id.rawValue,
//          "url": song.url?.absoluteString ?? "",
//        ])
        serailizedSongs.append(serializedSong)
      }

      resolve(serailizedSongs)
    }
  }
  
  @objc
  func getPlaylistLibrary(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      let request = MusicLibraryRequest<Playlist>.init()
      
      let response: MusicLibraryResponse<Playlist> = try await request.response()
      
      print(response)
      // serialize into json
      
      var serailizedPlaylists: [[String: Any]] = []
      for playlist in response.items {
        let withTracks = try await playlist.with(.tracks);
        
        // serialize tracks
        var serializedTracks: [[String: Any]] = []
        
        for track in withTracks.tracks ?? [] {
          serializedTracks.append([
            "title": track.title,
            "artistName": track.artistName,
            "duration": Int(track.duration?.rounded() ?? 0),
            "id": track.id.rawValue,
          ])
        }
        
        serailizedPlaylists.append([
          "id": playlist.id.rawValue,
          "artwork_url": playlist.artwork?.url(width: 300, height: 300)?.absoluteURL ?? "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png",
          "title": playlist.name,
          "description": playlist.description,
          "kind": (
              playlist.kind == Playlist.Kind.external ? "external" :
              playlist.kind == Playlist.Kind.personalMix ? "personalMix" :
              playlist.kind == Playlist.Kind.editorial ? "editorial" :
              playlist.kind == Playlist.Kind.replay ? "replay" :
              playlist.kind == Playlist.Kind.userShared ? "userShared" : "n/a"
          ),
          "tracks": serializedTracks
        ])
      }

      resolve(serailizedPlaylists)
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
    let songIdsArray = songIds as? Array<String>
    Task {
      var actualSongIdArray: [MusicItemID] = []
      
      for songId in songIdsArray ?? [] {
        actualSongIdArray.append(MusicItemID(stringLiteral: songId))
      }
      
      var indexMap = [Int: String]()
      
      // create index mapping
      for (index, songId) in (songIdsArray ?? []).enumerated()  {
        indexMap[index] = songId
      }
      
      var memberOfArray: [MusicItemID] = []
      
      for songId in songIdsArray ?? [] {
        memberOfArray.append(MusicItemID(stringLiteral: songId))
      }
      
      var request = MusicLibraryRequest<Song>()
      request.filter(matching: \.id, memberOf: actualSongIdArray)
      let response = try await request.response()
      
      // create songId -> song mapping
      var songMapping = [String: Song]()
      
      print(response.items)
      
      for song in response.items {
        songMapping[song.id.rawValue] = song
      }
      
      var finalSongArray: [Song] = []
      
      for i in 0..<(songIdsArray?.count ?? 0) {
        if let songId = indexMap[i], let song = songMapping[songId] {
          finalSongArray.append(song)
        }
      }
      
      print("finalSongArray")
      print(finalSongArray)
      
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
    
//    for queueItem in musicPlayer.queue. {
//      queueArray.append([
//        "title": queueItem.title,
//        "subtitle": queueItem.subtitle ?? "",
//        "id": queueItem.id,
//      ])
//    }
    
    resolve(queueArray)
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
      case "all":
        musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.all
      case "none":
        musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.none
      case "one":
        musicPlayer.state.repeatMode = MusicPlayer.RepeatMode.one
      default:
        break
    }
    
    // set shuffleMode if not empty string
    switch shuffleMode {
      case "off":
        musicPlayer.state.shuffleMode = MusicPlayer.ShuffleMode.off
      case "songs":
        musicPlayer.state.shuffleMode = MusicPlayer.ShuffleMode.songs
      default:
        break
    }
  }
  
  @objc
  func getPlayerState(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
    resolve([
      "playbackStatus": {
        switch musicPlayer.state.playbackStatus {
          case .playing:
            return "playing"
          case .paused:
            return "paused"
          default:
            return "stopped"
          }
      }() as String,
      "playbackRate": musicPlayer.state.playbackRate as Float,
      "repeatMode": musicPlayer.state.repeatMode ?? "off" as String,
      "shuffleMode": musicPlayer.state.shuffleMode ?? "off" as String,
      "playbackTime": musicPlayer.playbackTime.rounded() as Double,
      "nowPlayingItem": musicPlayer.queue.currentEntry != nil ? [
          "title": musicPlayer.queue.currentEntry?.title ?? "Unknown" as String,
          "artistName": {
              switch musicPlayer.queue.currentEntry?.item {
              case .musicVideo(let video):
                  return video.artistName as String
              case .song(let song):
                  return song.artistName as String
              default:
                  return "Unknown" as String
              }
          }(),
          "duration": {
            switch musicPlayer.queue.currentEntry?.item {
            case .musicVideo(let video):
              return Int(video.duration?.rounded() ?? 0)
            case .song(let song):
              return Int(song.duration?.rounded() ?? 0)
            default:
                return 0
            }
          }() as Int,
          "id": {
              switch musicPlayer.queue.currentEntry?.item {
              case .musicVideo(let video):
                  return video.id.rawValue
              case .song(let song):
                  return song.id.rawValue
              default:
                  return "Unknown"
              }
          }() ?? "" as String,
      ] as [String:Any] : nil
    ] as [String:Any])
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
