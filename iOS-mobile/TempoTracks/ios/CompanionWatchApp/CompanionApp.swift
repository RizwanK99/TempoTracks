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
  
    init() {
      WatchConnectivityHandler.shared.activateSession()
    }
    
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                StartView()
            }
            .sheet(isPresented: $workoutManager.showingSummaryView) {
                SummaryView()
            }
            .environmentObject(workoutManager)
            .onAppear{
              WatchConnectivityHandler.shared.setWorkoutManager(workout_manager: workoutManager)
            }
        }
        // WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
