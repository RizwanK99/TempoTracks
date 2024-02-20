//
//  WorkoutAdapter.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-19.
//

import Foundation

struct WorkoutJson: Codable {
    var createdAt: Date
    var description: String
    var expectedDistance: Double
    var expectedDuration: Int
    var id: String
    var intervalIds: [String]
    var name: String
    var numSets: Int
    var playlistId: Int
    var type: String?
    var userId: Int

    enum CodingKeys: String, CodingKey {
        case createdAt = "created_at"
        case description
        case expectedDistance = "expected_distance"
        case expectedDuration = "expected_duration"
        case id
        case intervalIds = "interval_ids"
        case name
        case numSets = "num_sets"
        case playlistId = "playlist_id"
        case type
        case userId = "user_id"
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
          adaptedWorkouts.append(Workout(workout_id: workout.id, name: workout.name, hk_type: .cycling))
        }
      } catch {
        print("Error decoding JSON: \(error)")
      }
    }
    
    return adaptedWorkouts
  }
}
