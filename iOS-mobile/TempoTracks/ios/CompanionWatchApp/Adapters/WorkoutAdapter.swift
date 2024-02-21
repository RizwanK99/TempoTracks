//
//  WorkoutAdapter.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-19.
//

import Foundation
import HealthKit

struct WorkoutJson: Codable {
    var description: String
    var id: String
    var name: String
    var playlistId: Int
    var type: String?

    enum CodingKeys: String, CodingKey {
        case description
        case id
        case name
        case playlistId = "playlist_id"
        case type
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

          adaptedWorkouts.append(Workout(workout_id: nil, template_id: workout.id, name: workout.name, hk_type: hk_type))
        }
      } catch {
        print("Error decoding JSON: \(error)")
      }
    }
    
    return adaptedWorkouts
  }
}
