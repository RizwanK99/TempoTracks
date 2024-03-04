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
  let title: String
  let artwork: URL
}
