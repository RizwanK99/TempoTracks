//
//  MusicManager.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2023-07-25.
//

import Foundation
import MusicKit

@objc(MusicManager)
class MusicManager: NSObject {
  
  @objc
  func requestAuthorization(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    do {
      await MusicAuthorization.request()
    } catch {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_AUTH", "not authorized", error)
    }
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    
    
//    if (count == 0) {
//      let error = NSError(domain: "", code: 200, userInfo: nil)
//      reject("E_COUNT", "count cannot be negative", error)
//    } else {
//      count -= 1
//      resolve("count was decremented")
//    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
