//
//  MusicView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI

class MusicViewModel: ObservableObject {
  @Published var songs: [Song]
  var currentSongId: UUID? = nil
  
  init(songs: [Song] = []) {
    self.songs = songs
  }
  
  func updateSongsState(with newSongs: [Song]) {
    self.songs = newSongs
  }
}


struct MusicView: View {
  @StateObject var viewModel = WatchConnectivityHandler.musicViewModel
  
  var body: some View {
    List {
      ForEach($viewModel.songs) { $song in
        SongRow(song: song, playAction: {
          withAnimation {
            song.isPlaying.toggle()
            
            if song.id == viewModel.currentSongId {
              viewModel.currentSongId = nil
              return
            }

            if let currentSongIndex = viewModel.songs.firstIndex(where: { $0.id == viewModel.currentSongId }) {
              viewModel.songs[currentSongIndex].isPlaying = false
            }
            
            viewModel.currentSongId = song.id
          }
        })
        .listRowBackground(Color.clear)
      }
    }
  }
}
