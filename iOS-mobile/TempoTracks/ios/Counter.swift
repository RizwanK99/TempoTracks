//
//  Counter.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2023-07-25.
//

import Foundation
import MusicKit

@objc(Counter)
class Counter: NSObject {
  private var count = 0
  private var musicPlayer = ApplicationMusicPlayer.shared
  
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve("count was decremented")
    }
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count])
  }
  
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
  func playSongWithId(
    _ songId: NSString
  ) {
    let songIdParam = songId as String
    
    Task {
      // fetch song item
      var request = MusicLibraryRequest<Song>()
      request.filter(matching: \.id, equalTo: MusicItemID(stringLiteral: songIdParam))
      let libraryResponse: MusicLibraryResponse = try await request.response()
      print(libraryResponse)
      
      let song = libraryResponse.items[0]
      // set the queue
      musicPlayer.queue = [song]
      
      try await musicPlayer.play()
    }
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
      case "SKIP-FORWARD":
        try await musicPlayer.skipToNextEntry()
      case "SKIP-BACK":
        try await musicPlayer.skipToPreviousEntry()
      case "RESTART":
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
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
}
