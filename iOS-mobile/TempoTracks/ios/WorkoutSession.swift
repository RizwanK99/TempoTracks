//
//  WorkoutSession.swift
//  TempoTracks
//
//  Created by Garrick Clarke on 2024-03-03.
//

import Foundation

enum WorkoutSessionState {
  case notStarted
  case active
  case finished
}

class WorkoutSession {
  private (set) var startDate: Date!
  private (set) var endDate: Date!
  
  var intervals: [BaseWorkoutInterval] = []
  var state: WorkoutSessionState = .notStarted
  
  func start() {
    startDate = Date()
    state = .active
  }
  
  func end() {
    endDate = Date()
    addNewInterval()
    state = .finished
  }
  
  func clear() {
    startDate = nil
    endDate = nil
    state = .notStarted
    intervals.removeAll()
  }
  
  private func addNewInterval() {
    let interval = BaseWorkoutInterval(start: startDate,
                                              end: endDate)
    intervals.append(interval)
  }
  
  var completeWorkout: BaseWorkout? {
    guard state == .finished, intervals.count > 0 else {
      return nil
    }
    
    return BaseWorkout(with: intervals)
  }
}
