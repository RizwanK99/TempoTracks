//
//  StartView.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-06-15.
//

import SwiftUI
import HealthKit


struct Workout: Identifiable, Hashable {
  let id = UUID()
  let workout_id: String
  let name: String
  let hk_type: HKWorkoutActivityType
  
  var icon_name: String {
    switch hk_type {
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


class WorkoutViewModel: ObservableObject {
  @Published var workouts: [Workout]

  init(workouts: [Workout] = []) {
    self.workouts = workouts
  }
  
  func updateWorkoutsState(with newWorkouts: [Workout]) {
    self.workouts = newWorkouts
  }
}


struct StartView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
  
    @StateObject var viewModel = WatchConnectivityHandler.workoutViewModel
    var workoutTypes: [HKWorkoutActivityType] = [.cycling, .running, .hiking, .highIntensityIntervalTraining]
    
    var body: some View {
        List(viewModel.workouts) { workout in
            NavigationLink(
                destination: SessionPagingView(),
                tag: workout,
                selection: $workoutManager.selectedWorkout
            ) {
              VStack {
                Image(systemName: workout.icon_name)
                      .resizable()
                      .scaledToFit()
                      .frame(width: 30, height: 30)
                  Text(workout.name)
                      .foregroundColor(.white)
              }
              .frame(maxWidth: .infinity, minHeight: 50)
            }
            .padding(
                EdgeInsets(top: 15, leading: 5, bottom: 15, trailing: 5)
            )
            .background(Color(hex: ColorHex.primary.rawValue, opacity: 0.5))
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
