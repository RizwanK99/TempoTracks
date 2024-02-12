//
//  WatchConnectivityHandler.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-09.
//

import WatchConnectivity

class WatchConnectivityHandler: NSObject, WCSessionDelegate {
  static let shared = WatchConnectivityHandler()

  private override init() {
    super.init()
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
