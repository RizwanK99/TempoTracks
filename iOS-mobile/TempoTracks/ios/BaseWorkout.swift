//
//  BaseWorkout.swift
//  TempoTracks
//
//  Created by Garrick Clarke on 2024-03-03.
//
import Foundation

struct BaseWorkoutInterval {
  var start: Date
  var end: Date
  
  init(start: Date, end: Date) {
    self.start = start
    self.end = end
  }
  
  var duration: TimeInterval {
    return end.timeIntervalSince(start)
  }
  
  var totalEnergyBurned: Double {
    let baseCaloriesPerHour: Double = 450
    let hours: Double = duration/3600
    let totalCalories = baseCaloriesPerHour * hours
    return totalCalories
  }
}

struct BaseWorkout {
  var start: Date
  var end: Date
  var intervals: [BaseWorkoutInterval]
  var type: String
  
  init(with intervals: [BaseWorkoutInterval], workoutType: String) {
    self.start = intervals.first!.start
    self.end = intervals.last!.end
    self.intervals = intervals
    self.type = workoutType
  }
  
  var totalEnergyBurned: Double {
    return intervals.reduce(0) { (result, interval) in
      result + interval.totalEnergyBurned
    }
  }
  
  var duration: TimeInterval {
    return intervals.reduce(0) { (result, interval) in
      result + interval.duration
    }
  }
}

