//
//  MusicView.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-12.
//

import Foundation
import SwiftUI

class MusicViewModel: ObservableObject {
  @Published var curSong: Song
  
  init(curSong: Song) {
    self.curSong = curSong
  }
  
  func playSong(title: String, artwork: URL) {
    self.curSong = Song(title: title, artwork: artwork)
  }
}


struct MusicView: View {
  @StateObject var viewModel = WatchConnectivityHandler.musicViewModel
  
  var body: some View {
    ZStack {
      VStack {
        AsyncImage(url: viewModel.curSong.artwork) { image in
          image.resizable()
        } placeholder: {
          ProgressView()
        }
        .aspectRatio(contentMode: .fit)
        .frame(width: 100, height: 100)
        
        Text(viewModel.curSong.title)
          .font(.title3)
          .foregroundColor(.white)
          .padding(.top, 8)
        
        MovingBarsView()
      }
    }
  }
}
