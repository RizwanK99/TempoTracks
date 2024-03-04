//
//  WatchConnectivityHandler.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-09.
//

import WatchConnectivity
import MusicKit

class WatchConnectivityHandler: NSObject, WCSessionDelegate {
  static let shared = WatchConnectivityHandler()
  
  // Tight coupling
  static let musicViewModel = MusicViewModel(curSong:
    Song(title: "Song 1", artwork: nil)
  )
  
  static let workoutViewModel = WorkoutViewModel(workouts: [
    Workout(workout_id: nil, template_id: "biking", playlist_id: "biking", name: "Biking", hk_type: .cycling),
    Workout(workout_id: nil, template_id: "running", playlist_id: "running", name: "Running", hk_type: .running),
    Workout(workout_id: nil, template_id: "walking", playlist_id: "walking", name: "Walking", hk_type: .walking),
    Workout(workout_id: nil, template_id: "HIIT", playlist_id: "HIIT", name: "HIIT", hk_type: .highIntensityIntervalTraining)
  ])

  private override init() {
    super.init()
  }
  
  func setWorkoutManager(workout_manager: WorkoutManager){
    WatchConnectivityHandler.workoutViewModel.workout_manager = workout_manager
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
      
    if fn_name == "sendWorkouts" {
      guard let workouts = message["workouts"] as? String else {
        return
      }
      
      let adaptedWorkouts = WorkoutAdapter.adapter.adaptJsonToWorkout(json: workouts)
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.updateWorkoutsState(with: adaptedWorkouts)
      }
    }
    else if fn_name == "updateWorkoutId" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      guard let template_id = message["template_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.updateWorkoutId(workout_id: workout_id, template_id: template_id)
      }
    }
    else if fn_name == "togglePauseWorkout" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.togglePause(workout_id: workout_id)
      }
    }
    else if fn_name == "endWorkout" {
      guard let workout_id = message["workout_id"] as? String else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.workoutViewModel.endWorkout(workout_id: workout_id)
      }
    }
    else if fn_name == "playSong" {
      guard let title = message["title"] as? String else {
        return
      }
      
      guard let artwork = message["artwork"] as? Artwork else {
        return
      }
      
      DispatchQueue.main.async {
        WatchConnectivityHandler.musicViewModel.playSong(title: title, artwork: artwork)
      }
    }
  }
  
  func send(_ function_name: String, _ data: String) {
      guard WCSession.default.activationState == .activated else {
        print("Cannot send message 1")
        return
      }

      guard WCSession.default.isCompanionAppInstalled else {
        print("Cannot send message 2")
        return
      }
      
      WCSession.default.sendMessage(["functionName": function_name, "data": data], replyHandler: nil, errorHandler: { (error) in
          print("Cannot send message: \(String(describing: error))")
      })
  }
}
