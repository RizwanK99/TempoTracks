//
//  SessionPagingView.swift
//  WatchOS Watch App
//
//  Created by Kuba Rogut on 2023-06-15.
//

import SwiftUI
import WatchKit

struct SessionPagingView: View {
    @Environment(\.isLuminanceReduced) var isLuminanceReduced
    @EnvironmentObject var workoutManager: WorkoutManager
    @State private var selection: Tab = .metrics
    
    enum Tab {
        case controls, metrics, nowPlaying
    }
    
    var body: some View {
        TabView(selection: $selection) {
            ControlsView().tag(Tab.controls)
            MetricsView().tag(Tab.controls)
            NowPlayingView().tag(Tab.controls)
        }
        .navigationTitle(workoutManager.selectedWorkout?.name ?? "")
        .navigationBarBackButtonHidden(true)
        .navigationBarHidden(selection == .nowPlaying)
        .onChange(of: workoutManager.running) { _ in
            displayMetricsView()
        }
        .tabViewStyle(
            PageTabViewStyle(indexDisplayMode: isLuminanceReduced ? .never : .automatic)
        )
        .onChange(of: isLuminanceReduced) { _ in
            displayMetricsView()
        }
    }
    
    private func displayMetricsView() {
        withAnimation {
            selection = .metrics
        }
    }
}

struct SessionPagingView_Previews: PreviewProvider {
    static var previews: some View {
        SessionPagingView()
    }
}
