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
    var workoutTypes: [HKWorkoutActivityType] = [.cycling, .running, .hiking, .highIntensityIntervalTraining]
    
    var body: some View {
        List(workoutTypes) { workoutType in
            NavigationLink(
                destination: SessionPagingView(),
                tag: workoutType,
                selection: $workoutManager.selectedWorkout
            ) {
              VStack {
                  Image(systemName: workoutType.iconName)
                      .resizable()
                      .scaledToFit()
                      .frame(width: 30, height: 30)
                  Text(workoutType.name)
                      .foregroundColor(.white)
              }
              .frame(maxWidth: .infinity, minHeight: 50)
            }
            .padding(
                EdgeInsets(top: 15, leading: 5, bottom: 15, trailing: 5)
            )
            .background(Color(hex: "#09BC8A", opacity: 0.5))
            .cornerRadius(20)
            .listRowBackground(Color.clear)
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
        case.cycling:
          return "Biking"
        case.running:
          return "Jogging"
        case.hiking:
          return "Hiking"
        case.highIntensityIntervalTraining:
          return "HIIT Training"
        default:
          return ""
      }
    }
  
  var iconName: String {
    switch self {
      case.cycling:
        return "bicycle"
      case.running:
        return "figure.run"
      case.hiking:
        return "figure.walk"
      case.highIntensityIntervalTraining:
        return "flame"
      default:
        return ""
    }
  }
}
