//
//  MusicView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI
import _MusicKit_SwiftUI

class MusicViewModel: ObservableObject {
  @Published var curSong: Song
  
  init(curSong: Song) {
    self.curSong = curSong
  }
  
  func playSong(title: String, artwork: Artwork) {
    self.curSong = Song(title: title, artwork: artwork)
  }
}


struct MusicView: View {
  @StateObject var viewModel = WatchConnectivityHandler.musicViewModel
  
  var body: some View {
    ZStack {
      VStack {
        if viewModel.curSong.artwork != nil {
          ArtworkImage(viewModel.curSong.artwork!, width: 100,
                       height: 100)
          .aspectRatio(contentMode: .fit)
          .frame(width: 100, height: 100)
        }
        
        Text(viewModel.curSong.title)
          .font(.title3)
          .foregroundColor(.white)
          .padding(.top, 8)
        
        MovingBarsView()
      }
    }
  }
}
