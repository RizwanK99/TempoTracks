//
//  WatchManager.swift
//  TempoTracks
//
//  Created by Alexander Ma on 2024-02-17.
//

import Foundation
import WatchConnectivity
import MusicKit

@objcMembers class WatchManagerStrategy: NSObject {
    static let music_manager = MusicManager()

    static func callFunction(withName functionName: String, withData data: String){
      if functionName == "createWorkout" {
        WatchManagerEmitter.emitter.createWorkout(data)
      }
      else if functionName == "togglePauseWorkout" {
        WatchManagerEmitter.emitter.togglePauseWorkout(data)
      }
      else if functionName == "endWorkout" {
        WatchManagerEmitter.emitter.endWorkout(data)
      }
    }
}

@objc(WatchManagerEmitter)
class WatchManagerEmitter: RCTEventEmitter {
  public static var emitter: WatchManagerEmitter!

  override init() {
    super.init()
    WatchManagerEmitter.emitter = self
  }
  
  override func supportedEvents() -> [String]! {
    return ["createWorkout", "togglePauseWorkout", "endWorkout"]
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func createWorkout(_ workout: String) {
    sendEvent(withName: "createWorkout", body: workout)
  }
  
  @objc
  func togglePauseWorkout(_ workout_id: String){
    sendEvent(withName: "togglePauseWorkout", body: workout_id)
  }
  
  @objc
  func endWorkout(_ workout_id: String){
    sendEvent(withName: "endWorkout", body: workout_id)
  }
}

@objcMembers class MusicPoller: NSObject {
    static let shared = MusicPoller()
    private var timer: Timer?
    private var musicPlayer = SystemMusicPlayer.shared
    private var title: String?
    private var artwork: URL?

    private override init() {
      super.init()
    }

    func startPolling() {
      timer = Timer.scheduledTimer(timeInterval: 1.5, target: self, selector: #selector(pollMusicPlayer), userInfo: nil, repeats: true)
    }

    func stopPolling() {
      timer?.invalidate()
      timer = nil
    }

    @objc private func pollMusicPlayer() {
      let curArtwork = musicPlayer.queue.currentEntry?.artwork?.url(width: 500, height: 500);
      let curTitle = musicPlayer.queue.currentEntry?.title
      
      if curArtwork != artwork && curTitle != title {
        artwork = curArtwork
        title = curTitle
        
        playSong(title!, artwork!);
      }
    }
  
  func playSong(_ title: String, _ artwork: URL) {
    print("SENDING PLAYED SONG TO WATCH WITH TITLE: " + title + " AND ARTWORK: " + artwork.absoluteString)
      guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
          print("playSong - Watch app is not installed or not paired")
          return
      }
      var dataDictionary: [String: Any] = [:]
      
      // Add the function name to the dictionary
      dataDictionary["title"] = title
      dataDictionary["artwork"] = artwork
      dataDictionary["functionName"] = "playSong"

      WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: { (error) in
          print("playSong - Sending message failed with error: \(error)")
      })
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
  
  @objc
  func updateWorkoutId(
    _ workout_id: String,
    template_id template_id: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
        print("updateWorkoutId - Watch app is not installed or not paired")
        return
    }
    var dataDictionary: [String: Any] = [:]
    
    // Add the function name to the dictionary
    dataDictionary["workout_id"] = workout_id
    dataDictionary["template_id"] = template_id
    dataDictionary["functionName"] = "updateWorkoutId"
    
    WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: {
      (error) in
      print("updateWorkoutId - Sending message failed with error: \(error)")
    })
  }
  
  @objc
  func togglePauseWorkout(
    _ workout_id: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
        print("togglePauseWorkout - Watch app is not installed or not paired")
        return
    }
    var dataDictionary: [String: Any] = [:]
    
    // Add the function name to the dictionary
    dataDictionary["workout_id"] = workout_id
    dataDictionary["functionName"] = "togglePauseWorkout"
    
    WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: {
      (error) in
      print("togglePauseWorkout - Sending message failed with error: \(error)")
    })
  }
  
  @objc
  func endWorkout(
    _ workout_id: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard WCSession.default.isPaired && WCSession.default.isWatchAppInstalled else {
        print("endWorkout - Watch app is not installed or not paired")
        return
    }
    var dataDictionary: [String: Any] = [:]
    
    // Add the function name to the dictionary
    dataDictionary["workout_id"] = workout_id
    dataDictionary["functionName"] = "endWorkout"
    
    WCSession.default.sendMessage(dataDictionary, replyHandler: nil, errorHandler: {
      (error) in
      print("endWorkout - Sending message failed with error: \(error)")
    })
  }
}
