//
//  WatchConnectivityHandler.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-09.
//

import WatchConnectivity

class WatchConnectivityHandler: NSObject, WCSessionDelegate {
  static let shared = WatchConnectivityHandler()
  
  // Tight coupling
  static let musicViewModel = MusicViewModel(songs: [
    Song(apple_id: "1", title: "Song 1"),
    Song(apple_id: "2", title: "Song 2"),
  ])

  private override init() {
    super.init()
  }
  
  func activateSession() {
    if WCSession.isSupported() {
      let session = WCSession.default
      session.delegate = self
      session.activate()
    }
  }
    
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
      switch activationState {
      case .activated:
          print("Watch WCSession activated successfully.")
      case .notActivated:
          if let error = error {
              print("Watch WCSession failed to activate with error: \(error.localizedDescription)")
          }
      default:
          break // No action needed for .inactive in watchOS
      }
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    guard let fn_name = message["functionName"] as? String else {
      return
    }
      
    if fn_name == "sendSongs" {
      guard let songs = message["songs"] as? String else {
        return
      }
      
      let adaptedSongs = SongAdapter.adapter.adaptJsonToSong(json: songs)
      WatchConnectivityHandler.musicViewModel.updateSongsState(with: adaptedSongs)
    }
  }
  
  private let kMessageKey = "message"
  
  func send(_ message: String) {
      guard WCSession.default.activationState == .activated else {
        print("Cannot send message 1")
        return
      }

      guard WCSession.default.isCompanionAppInstalled else {
        print("Cannot send message 2")
        return
      }
      
      WCSession.default.sendMessage([kMessageKey : message], replyHandler: { (reply) in
          // Handle reply from iPhone here
          print(reply)
      }, errorHandler: { (error) in
          print("Cannot send message: \(String(describing: error))")
      })
    
    print("END OF SENT MSG");
  }
}
