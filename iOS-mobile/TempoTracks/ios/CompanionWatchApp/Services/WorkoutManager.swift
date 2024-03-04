//
//  WorkoutManager.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-07-17.
//

import Foundation
import HealthKit

struct WorkoutDataJson: Codable {
    var id: String
    var averageHeartRate: Double
    var heartRate: Double
    var activeEnergy: Double
    var distance: Double
  
    enum CodingKeys: String, CodingKey {
        case id
        case averageHeartRate
        case heartRate
        case activeEnergy
        case distance
    }
}

class WorkoutManager: NSObject, ObservableObject {
    // MARK: - Workout Metrics
    @Published var averageHeartRate: Double = 0
    @Published var heartRate: Double = 0
    @Published var activeEnergy: Double = 0
    @Published var distance: Double = 0
    @Published var displayTime: String = "00:00:00"
    @Published var workout: HKWorkout?
    
    //Private vars
    private var startTime: Date?
    private var pauseTime: Date?
    private var totalPausedTime: TimeInterval = 0
    private var timer: Timer?
  
    @Published var selectedWorkout: Workout? {
        didSet {
          guard let selectedWorkout = selectedWorkout else { return }
          
          if (selectedWorkout.workout_id == nil){
            let workoutJson = WorkoutAdapter.adapter.adaptWorkoutToJson(workout: selectedWorkout)

            WatchConnectivityHandler.shared.send("createWorkout", workoutJson!)
          }
          
          self.startWorkout(workoutType: selectedWorkout.hk_type)
        }
    }
    
    @Published var showingSummaryView: Bool = false {
        didSet {
            // Sheet dismissed
            if showingSummaryView == false {
                resetWorkout()
            }
        }
    }
  
    var didStartWorkout: Bool = false
    
    let healthStore = HKHealthStore()
    var session: HKWorkoutSession?
    var builder: HKLiveWorkoutBuilder?
  
    func selectWorkout(workout: Workout) {
      selectedWorkout = workout;
    }
    
    func startWorkout(workoutType: HKWorkoutActivityType) {
        guard !didStartWorkout else {
          return
        }
      
        didStartWorkout = true
      
        let configuration = HKWorkoutConfiguration()
        configuration.activityType = workoutType
        configuration.locationType = .outdoor

        do {
            session = try HKWorkoutSession(healthStore: healthStore, configuration: configuration)
            builder = session?.associatedWorkoutBuilder()
        } catch {
            // Handle any exceptions.
            return
        }

        builder?.dataSource = HKLiveWorkoutDataSource(
            healthStore: healthStore,
            workoutConfiguration: configuration
        )

        session?.delegate = self
        builder?.delegate = self
        
        // Start the workout session and begin data collection.
        let startDate = Date()
        startTime = startDate
        self.startTimer()
        session?.startActivity(with: startDate)
        builder?.beginCollection(withStart: startDate) { (success, error) in
            // The workout has started.
        }
    }
    
    // Request authorization to access HealthKit.
    func requestAuthorization() {
        // The quantity type to write to the health store.
        let typesToShare: Set = [
            HKQuantityType.workoutType()
        ]

        // The quantity types to read from the health store.
        let typesToRead: Set = [
            HKQuantityType.quantityType(forIdentifier: .heartRate)!,
            HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!,
            HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning)!,
            HKQuantityType.quantityType(forIdentifier: .distanceCycling)!,
            HKObjectType.activitySummaryType()
        ]

        // Request authorization for those quantity types.
        healthStore.requestAuthorization(toShare: typesToShare, read: typesToRead) { (success, error) in
            // Handle error.
        }
    }
    
    // MARK: - State Control

    // The workout session state.
    @Published var running = false

    func pause() {
        pauseTime = Date()
        self.invalidateTimer()
        session?.pause()
    }

    func resume() {
        if let pauseTime = pauseTime {
            totalPausedTime += Date().timeIntervalSince(pauseTime)
        }
        self.pauseTime = nil
        self.startTimer()
        session?.resume()
    }

    func togglePause(_ external: Bool) {
        if !external {
          WatchConnectivityHandler.shared.send("togglePauseWorkout", String(running))
        }
      
        if running == true {
            pause()
        } else {
            resume()
        }
    }

    func endWorkout(_ external: Bool) {
      if selectedWorkout != nil && selectedWorkout!.workout_id != nil {
        let workoutDataJson = WorkoutDataJson(
          id: selectedWorkout!.workout_id!,
          averageHeartRate: averageHeartRate,
          heartRate: heartRate,
          activeEnergy: activeEnergy,
          distance: distance
        );
        
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted // Optional, for readable output
        do {
          let jsonData = try encoder.encode(workoutDataJson)
          if let jsonString = String(data: jsonData, encoding: .utf8) {
            print(jsonString)
            WatchConnectivityHandler.shared.send("endWorkout", jsonString)
          }
        } catch {
          print("Error encoding JSON: \(error)")
        }
        
        WatchConnectivityHandler.workoutViewModel.setWorkoutIdToNil(workout_id: selectedWorkout!.workout_id!)
      }
        
        pause()
        session?.end()
        showingSummaryView = true
    }
    
    private func startTimer(){
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            self?.updateDisplayTime()
        }
    }
    
    private func updateDisplayTime() {
        let duration = Date().timeIntervalSince(startTime!) - totalPausedTime
        let hours = Int(duration) / 3600
        let minutes = (Int(duration) / 60) % 60
        let seconds = Int(duration) % 60
        displayTime = String(format:"%02i:%02i:%02i", hours, minutes, seconds)
    }
    
    private func invalidateTimer() {
        timer?.invalidate()
        timer = nil
    }
    
    func updateForStatistics(_ statistics: HKStatistics?) {
        guard let statistics = statistics else { return }

        DispatchQueue.main.async {
            switch statistics.quantityType {
            case HKQuantityType.quantityType(forIdentifier: .heartRate):
                let heartRateUnit = HKUnit.count().unitDivided(by: HKUnit.minute())
                self.heartRate = statistics.mostRecentQuantity()?.doubleValue(for: heartRateUnit) ?? 0
                self.averageHeartRate = statistics.averageQuantity()?.doubleValue(for: heartRateUnit) ?? 0
            case HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned):
                let energyUnit = HKUnit.kilocalorie()
                self.activeEnergy = statistics.sumQuantity()?.doubleValue(for: energyUnit) ?? 0
            case HKQuantityType.quantityType(forIdentifier: .distanceWalkingRunning), HKQuantityType.quantityType(forIdentifier: .distanceCycling):
                let meterUnit = HKUnit.meter()
                self.distance = statistics.sumQuantity()?.doubleValue(for: meterUnit) ?? 0
            default:
                return
            }
          
          let workoutDataJson = WorkoutDataJson(
            id: self.selectedWorkout?.workout_id ?? "",
            averageHeartRate: self.averageHeartRate,
            heartRate: self.heartRate,
            activeEnergy: self.activeEnergy,
            distance: self.distance
          );
          
          print("live-workout-data", workoutDataJson)
          
          let encoder = JSONEncoder()
          encoder.outputFormatting = .prettyPrinted // Optional, for readable output
          do {
            let jsonData = try encoder.encode(workoutDataJson)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
              print("updateLiveWorkout", jsonString)
              WatchConnectivityHandler.shared.send("updateLiveWorkout", jsonString)
            }
          } catch {
            print("Error encoding JSON: \(error)")
          }
        }
    }
    
    func resetWorkout() {
        self.invalidateTimer()
        self.startTime = nil
        self.pauseTime = nil
        self.totalPausedTime = 0
        self.displayTime = "00:00:00"
        selectedWorkout = nil
        didStartWorkout = false
        builder = nil
        session = nil
        workout = nil
        activeEnergy = 0
        averageHeartRate = 0
        heartRate = 0
        distance = 0
    }
}

// MARK: - HKWorkoutSessionDelegate
extension WorkoutManager: HKWorkoutSessionDelegate {
    func workoutSession(_ workoutSession: HKWorkoutSession,
                        didChangeTo toState: HKWorkoutSessionState,
                        from fromState: HKWorkoutSessionState,
                        date: Date) {
        DispatchQueue.main.async {
            self.running = toState == .running
        }

        // Wait for the session to transition states before ending the builder.
        if toState == .ended {
            builder?.endCollection(withEnd: date) { (success, error) in
                self.builder?.finishWorkout { (workout, error) in
                    DispatchQueue.main.async {
                        self.workout = workout
                    }
                }
            }
        }
    }

    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {
    }
}

// MARK: - HKLiveWorkoutBuilderDelegate
extension WorkoutManager: HKLiveWorkoutBuilderDelegate {
    func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
    }

    func workoutBuilder(_ workoutBuilder: HKLiveWorkoutBuilder, didCollectDataOf collectedTypes: Set<HKSampleType>) {
        for type in collectedTypes {
            guard let quantityType = type as? HKQuantityType else { return }

            let statistics = workoutBuilder.statistics(for: quantityType)

            // Update the published values.
            updateForStatistics(statistics)
        }
    }
}
