//
//  MovingBarsView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI

struct MovingBarsView: View {
    // Animation states for each bar
    @State private var animateFirstBar = false
    @State private var animateSecondBar = false
    @State private var animateThirdBar = false

    var body: some View {
        HStack(spacing: 2) {
            // First bar
            RoundedRectangle(cornerRadius: 2)
                .frame(width: 3, height: animateFirstBar ? 20 : 10)
                .animation(Animation.easeInOut(duration: 0.6).repeatForever(autoreverses: true), value: animateFirstBar)
                .foregroundColor(Color.white)

            // Second bar
            RoundedRectangle(cornerRadius: 2)
                .frame(width: 3, height: animateSecondBar ? 15 : 7)
                .animation(Animation.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: animateSecondBar)
                .foregroundColor(Color.white)

            // Third bar
            RoundedRectangle(cornerRadius: 2)
                .frame(width: 3, height: animateThirdBar ? 12 : 6)
                .animation(Animation.easeInOut(duration: 0.5).repeatForever(autoreverses: true), value: animateThirdBar)
                .foregroundColor(Color.white)
        }
        .onAppear {
            animateFirstBar = true
            animateSecondBar = true
            animateThirdBar = true
        }
    }
}
