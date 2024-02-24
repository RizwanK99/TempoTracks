//
//  SongView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI

struct Song: Identifiable {
  let id = UUID()
  let apple_id: String
  let title: String
  var isPlaying: Bool = false
}

struct SongRow: View {
    var song: Song
    var playAction: () -> Void
    
    var body: some View {
        HStack {
            Button(action: playAction) {
                Image(systemName: song.isPlaying ? "pause.fill" : "play.fill")
                .foregroundColor(Color(hex: ColorHex.primary.rawValue))
            }
            .padding(.trailing, 5)
            Text(song.title)
            Spacer()
            if song.isPlaying {
                MovingBarsView()
            }
        }
    }
}
