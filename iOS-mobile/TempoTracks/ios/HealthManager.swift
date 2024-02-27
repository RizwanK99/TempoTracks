//
//  HealthManager.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2024-02-25.
//

import Foundation
import HealthKit

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
  func testFunction(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      guard let dateOfBirthType = HKObjectType.characteristicType(forIdentifier: .dateOfBirth) else {
          print("Date of birth type not available")
          return
      }
      
      do {
          let dateOfBirth = try healthStore.dateOfBirthComponents()
          if let dob = dateOfBirth.date {
              // Handle the date of birth
              print("User's date of birth: \(dob)")
          } else {
              print("Date of birth not available")
          }
      } catch {
          print("Error fetching date of birth: \(error.localizedDescription)")
      }
      
      // Get the start and end date components.
      let calendar = Calendar(identifier: .gregorian)
      
      let yesterdayDate = calendar.date(byAdding: .month
                                        , value: -1, to: Date())
      guard let yesterdayDate = yesterdayDate else { return }

      var startComponents = calendar.dateComponents([.day, .month, .year, .calendar], from: yesterdayDate)
      startComponents.hour = nil
      startComponents.minute = nil
      startComponents.second = nil
      
      
      var endComponents = startComponents
      endComponents.month = 1 + (endComponents.month ?? 0)
      endComponents.hour = nil
      endComponents.minute = nil
      endComponents.second = nil
      
      // Create a predicate for the query.
      let predicate = HKQuery.predicate(forActivitySummariesBetweenStart: startComponents, end: endComponents)
      
      // Create the descriptor.
      let activeSummaryDescriptor = HKActivitySummaryQueryDescriptor(predicate:predicate)

      // Run the query.
      let results = try await activeSummaryDescriptor.result(for: healthStore)
      print("HK-results", results)
    
      // need to serialize summaries into JSON fields
      resolve(results)
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
