//
//  SongAdapter.swift
//  Companion Watch App
//
//  Created by Alexander Ma on 2024-02-18.
//

import Foundation

struct SongJson: Codable {
    let title: String
    let durationMs: Int
    let artist: String
    let appleMusicId: String
    let artworkUrl: String
    let spotifyId: String
    let acousticness: Double
    let danceability: Double
    let energy: Double
    let instrumentalness: Double
    let liveness: Double
    let loudness: Double
    let tempo: Double
    let valence: Double
    
    // Use coding keys to map JSON keys to Swift property names, if needed.
    enum CodingKeys: String, CodingKey {
        case title
        case durationMs = "duration_ms"
        case artist
        case appleMusicId = "apple_music_id"
        case artworkUrl = "artwork_url"
        case spotifyId = "spotify_id"
        case acousticness, danceability, energy, instrumentalness, liveness, loudness, tempo, valence
    }
}

class SongAdapter {
  static let adapter = SongAdapter()

  func adaptJsonToSong(json: String) -> [Song] {
    var adaptedSongs: [Song] = []
    
    if let jsonData = json.data(using: .utf8) {
      do {
        // Decode the JSON data into an array of Song structs
        let decoder = JSONDecoder()
        let songs = try decoder.decode([SongJson].self, from: jsonData)
        
        for song in songs {
          adaptedSongs.append(Song(apple_id: song.appleMusicId, title: song.title))
        }
      } catch {
        print("Error decoding JSON: \(error)")
      }
    }
    
    return adaptedSongs
  }
}
