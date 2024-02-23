//
//  ControlsView.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-07-17.
//

import SwiftUI

struct ControlsView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    
    var body: some View {
        HStack {
            VStack {
                Button {
                    workoutManager.endWorkout(false)
                }
                label: { Image(systemName: "xmark") }
                .tint(Color.red)
                .font(.title2)
                Text("End")
            }
            VStack {
                Button {
                    workoutManager.togglePause(false)
                }
                label: { Image(systemName: workoutManager.running ? "pause" : "play") }
                .tint(Color(hex: ColorHex.primary.rawValue))
                .font(.title2)
                Text(workoutManager.running ? "Pause" : "Resume")
            }
        }
    }
}

struct ControlsView_Previews: PreviewProvider {
    static var previews: some View {
        ControlsView()
    }
}
