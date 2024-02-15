//
//  MusicView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI

struct MusicView: View {
  @State private var songs = [
      Song(title: "Song 1"),
      Song(title: "Song 2"),
  ]
  @State private var currentSongId: UUID? = nil
  
  var body: some View {
    List {
      ForEach($songs) { $song in
        SongRow(song: song, playAction: {
            withAnimation {
              song.isPlaying.toggle()
              
              if song.id == currentSongId {
                currentSongId = nil
                return
              }

              if let currentSongIndex = songs.firstIndex(where: { $0.id == currentSongId }) {
                songs[currentSongIndex].isPlaying = false
              }
              
              currentSongId = song.id
            }
        })
        .listRowBackground(Color.clear)
      }
    }
  }
}
