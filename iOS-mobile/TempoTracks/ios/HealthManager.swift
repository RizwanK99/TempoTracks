//
//  HealthManager.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2024-02-25.
//

import Foundation
import HealthKit
import React

@objc(HealthManager)
class HealthManager: NSObject {
  let healthStore = HKHealthStore()
  
  @objc
  func requestAuthorization(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      let allSharedTypes: Set = [
        HKQuantityType.workoutType(),
        HKQuantityType(.activeEnergyBurned),
        HKQuantityType(.distanceCycling),
        HKQuantityType(.distanceWalkingRunning),
        HKQuantityType(.heartRate),
      ]
      
      let allReadTypes: Set = [
        HKQuantityType.workoutType(),
        HKQuantityType(.activeEnergyBurned),
        HKQuantityType(.distanceCycling),
        HKQuantityType(.distanceWalkingRunning),
        HKQuantityType(.heartRate),
        HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.stepCount)!,
        HKObjectType.characteristicType(forIdentifier: HKCharacteristicTypeIdentifier.biologicalSex)!,
        HKObjectType.characteristicType(forIdentifier: HKCharacteristicTypeIdentifier.dateOfBirth)!,
        HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.bodyMass)!,
        HKObjectType.activitySummaryType(),
      ]
      
      do {
        // Check that Health data is available on the device.
        if HKHealthStore.isHealthDataAvailable() {
          
          // Asynchronously request authorization to the data.
          try await healthStore.requestAuthorization(toShare: allSharedTypes, read: allReadTypes);
          resolve(["success"])
        }
      } catch {
        // Typically, authorization requests only fail if you haven't set the
        // usage and share descriptions in your app's Info.plist, or if
        // Health data isn't available on the current device.
        fatalError("*** An unexpected error occurred while requesting authorization: \(error.localizedDescription) ***")
      }
    }
  }
  
  @objc
  func getWorkoutData(
    _ timeFrame: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      guard HKHealthStore.isHealthDataAvailable() else {
        print("HealthKit is not available on this device.")
        return
      }
      
      var window = Date()
      
      switch timeFrame {
      case "Day":
        window = Calendar.current.startOfDay(for: Date())
      case "Week":
        window = Calendar.current.date(from: Calendar.current.dateComponents([.yearForWeekOfYear, .weekOfYear], from: Date()))!
      case "Month":
        window = Calendar.current.date(from: Calendar.current.dateComponents([.year, .month], from: Date()))!
      case "Year":
        window = Calendar.current.date(from: Calendar.current.dateComponents([.year], from: Date()))!
      default:
        window = Calendar.current.startOfDay(for: Date()) //default is set to day
      }
      
      let predicate = HKQuery.predicateForSamples(withStart: window, end: Date(), options: .strictEndDate)
      var serializedData: [[String: Any]] = []
      // Define the query to fetch workouts
      let query = HKSampleQuery(sampleType: HKObjectType.workoutType(), predicate: predicate, limit: HKObjectQueryNoLimit, sortDescriptors: nil) { (query, samples, error) in
        guard let workouts = samples as? [HKWorkout], error == nil else {
          print("Error querying workouts: \(error?.localizedDescription ?? "Unknown error")")
          return
        }
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        
        let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate)!
        for workout in workouts {
          let quantity = workout.statistics(for: heartRateType)?.averageQuantity()
          let beats: Double? = quantity?.doubleValue(for: HKUnit.count().unitDivided(by: HKUnit.minute()))
          let cals: Double? = workout.totalEnergyBurned?.doubleValue(for: HKUnit.kilocalorie())
          let dist: Double? = workout.totalDistance?.doubleValue(for: HKUnit.meter())
          serializedData.append([
            "heartRate": beats ?? 0,
            "StartDate": dateFormatter.string(from: workout.startDate) ,
            "EndDate": dateFormatter.string(from: workout.endDate),
            "Duration": workout.duration,
            "Calories": cals ?? 0,
            "Distance": dist ?? 0,
            
          ])
        }
        resolve(serializedData)
      }
      
      // Execute the query
      healthStore.execute(query)
      
    }
}

@objc
static func requiresMainQueueSetup() -> Bool {
  return true
}

@objc
func constantsToExport() -> [AnyHashable : Any]! {
  return ["initialCount": 0]
}
}
