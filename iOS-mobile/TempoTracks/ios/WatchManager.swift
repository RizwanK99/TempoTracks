//
//  WatchManager.swift
//  TempoTracks
//
//  Created by Alexander Ma on 2024-02-17.
//

import Foundation
import WatchConnectivity

@objcMembers class WatchManagerStrategy: NSObject {
    static let emitter = WatchManagerEmitter()

    static func callFunction(withName functionName: String) -> String {
      if functionName == "pauseSong" {
        return ""
      }
      
      return ""
    }
}

class WatchManagerEmitter {
  func pauseSong() {
    
  }
}

@objc(WatchManager)
class WatchManagerListener: NSObject {
  @objc
  func sendSongs(
    _ songs: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
        print("sendSongs - Watch app is not installed or not paired")
        return
    }
    var dataDictionary: [String: Any] = [:]
    
    // Add the function name to the dictionary
    dataDictionary["songs"] = songs
    dataDictionary["functionName"] = "sendSongs"

    WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: { (error) in
        print("sendSongs - Sending message failed with error: \(error)")
    })
  
    resolve(nil)
  }
  
  @objc
  func sendWorkouts(
    _ workouts: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
        print("sendWorkouts - Watch app is not installed or not paired")
        return
    }
    var dataDictionary: [String: Any] = [:]
    
    // Add the function name to the dictionary
    dataDictionary["workouts"] = workouts
    dataDictionary["functionName"] = "sendWorkouts"
    
    WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: {
      (error) in
      print("sendWorkouts - Sending message failed with error: \(error)")
    })
  }
}
