//
//  WorkoutAdapter.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-19.
//

import Foundation
import HealthKit

struct WorkoutJson: Codable {
    var id: String
    var name: String
    var type: String?
    var playlist_id: String

    enum CodingKeys: String, CodingKey {
        case id
        case name
        case type
        case playlist_id
    }
}


class WorkoutAdapter {
  static let adapter = WorkoutAdapter()

  func adaptJsonToWorkout(json: String) -> [Workout] {
    var adaptedWorkouts: [Workout] = []
    
    if let jsonData = json.data(using: .utf8) {
      do {
        // Decode the JSON data into an array of Workout structs
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        let workouts = try decoder.decode([WorkoutJson].self, from: jsonData)
        
        for workout in workouts {
          let type = workout.type
          var hk_type: HKWorkoutActivityType = .cycling
          
          switch type {
            case "Biking":
              hk_type = .cycling
            case "Running":
              hk_type = .running
            case "Walking":
              hk_type = .walking
            case "HIIT":
              hk_type = .highIntensityIntervalTraining
            default:
              hk_type = .cycling
          }

          adaptedWorkouts.append(Workout(workout_id: nil, template_id: workout.id, playlist_id: workout.playlist_id, name: workout.name, hk_type: hk_type))
        }
      } catch {
        print("Error decoding JSON: \(error)")
      }
    }
    
    return adaptedWorkouts
  }
  
  func adaptWorkoutToJson(workout: Workout) -> String? {
      var type = "Biking"
    
      switch workout.hk_type {
        case .cycling:
          type = "Biking"
        case .running:
          type = "Running"
        case .walking:
          type = "Walking"
        case .highIntensityIntervalTraining:
          type = "HIIT"
        default:
          type = "Biking"
      }
      
      let workoutJson = WorkoutJson(id: workout.template_id,
                                    name: workout.name,
                                    type: type,
                                    playlist_id: workout.playlist_id)
      
      let encoder = JSONEncoder()
      encoder.outputFormatting = .prettyPrinted // Optional, for readable output
      do {
          let jsonData = try encoder.encode(workoutJson)
          if let jsonString = String(data: jsonData, encoding: .utf8) {
              return jsonString
          }
      } catch {
          print("Error encoding JSON: \(error)")
      }
      
      return nil
  }
}
