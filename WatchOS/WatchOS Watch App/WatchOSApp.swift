//
//  WatchOSApp.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-06-15.
//

import SwiftUI
import HealthKit

@main
struct WatchOS_Watch_AppApp: App {
    @StateObject var workoutManager = WorkoutManager()
    @ObservedObject private var connectivityManager = WatchConnectivityManager.shared
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
