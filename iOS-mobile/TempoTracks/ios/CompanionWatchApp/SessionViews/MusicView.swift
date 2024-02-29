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
  
  func playSong(title: String) {
    if let idx = songs.firstIndex(where: { $0.title == title }) {
      var modifiedSongs = songs

      modifiedSongs[idx].isPlaying = true
      
      for index in 0..<modifiedSongs.count {
        if index != idx {
          modifiedSongs[index].isPlaying = false
        }
      }
      
      songs = modifiedSongs
    }
  }
  
  func pauseCurrentSong() {
    var modifiedSongs = songs

    for index in 0..<modifiedSongs.count {
      modifiedSongs[index].isPlaying = false
    }
    
    songs = modifiedSongs
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
            
            if song.isPlaying {
              WatchConnectivityHandler.shared.send("playSong", song.apple_id);
            }
            else {
              WatchConnectivityHandler.shared.send("pauseSong", "");
            }
            
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
