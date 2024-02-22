//
//  WatchManager.swift
//  TempoTracks
//
//  Created by Alexander Ma on 2024-02-17.
//

import Foundation
import WatchConnectivity

@objcMembers class WatchManagerStrategy: NSObject {
    static let music_manager = MusicManager()

    static func callFunction(withName functionName: String, withData data: String){
      if functionName == "pauseSong" {
        music_manager.changePlayerPlayback("PAUSE");
      }
      else if functionName == "playSong" {
        music_manager.playSongWithId(NSString(string: data))
      }
      else if functionName == "createWorkout" {
        WatchManagerEmitter.emitter.createWorkout(data)
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
    return ["createWorkout"]
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func createWorkout(_ workout: String) {
    sendEvent(withName: "createWorkout", body: workout)
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