//
//  CompanionApp.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-04.
//

import SwiftUI
import HealthKit

@main
struct WatchOS_Watch_AppApp: App {
    @StateObject var workoutManager = WorkoutManager()
    var selectedWorkout: HKWorkoutActivityType?
    
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                StartView()
            }
            .sheet(isPresented: $workoutManager.showingSummaryView) {
                SummaryView()
            }
            .environmentObject(workoutManager)
        }
        
        // WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
