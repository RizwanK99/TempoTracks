//
//  Counter.swift
//  TempoTracks
//
//  Created by Kuba Rogut on 2023-07-25.
//

import Foundation
import MusicKit

@objc(Counter)
class Counter: NSObject {
  private var count = 0
  
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve("count was decremented")
    }
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count])
  }
  
  @objc
  func requestAuthorization(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) -> Void {
    Task {
      do {
        let response = try await MusicAuthorization.request()
        resolve([response])
      } catch {
        let error = NSError(domain: "", code: 200, userInfo: nil)
        reject("E_AUTH", "not authorized", error)
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
}
