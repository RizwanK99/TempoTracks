//
//  StartView.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-06-15.
//

import SwiftUI
import HealthKit

struct StartView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    var workoutTypes: [HKWorkoutActivityType] = [.running, .walking, .highIntensityIntervalTraining, .stairs]
    
    var body: some View {
        List(workoutTypes) { workoutType in
            NavigationLink(
                workoutType.name,
                destination: SessionPagingView(),
                tag: workoutType,
                selection: $workoutManager.selectedWorkout
            ).padding(
                EdgeInsets(top: 15, leading: 5, bottom: 15, trailing: 5)
            )
        }
        .listStyle(.carousel)
        .navigationBarTitle("Workouts")
        .onAppear{
            workoutManager.requestAuthorization()
        }
    }
}

struct StartView_Previews: PreviewProvider {
    static var previews: some View {
        StartView()
    }
}

extension HKWorkoutActivityType: Identifiable {
    public var id: UInt {
        rawValue
    }
    
    var name: String {
        switch self {
            case.running:
                    return "Run"
            case.walking:
                return "Walking"
            case.highIntensityIntervalTraining:
                return "HITT Training"
            case.stairs:
                return "Stairs"
            default:
                return ""
        }
    }
}
