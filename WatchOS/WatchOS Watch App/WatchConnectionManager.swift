//
//  WatchConnectionManager.swift
//  WatchOS Watch App
//
//  Created by Alexander Ma on 2023-07-26.
//

import WatchConnectivity

final class WatchConnectivityManager: NSObject, ObservableObject {
    static let shared = WatchConnectivityManager()
    
    @Published var userId: Int? = nil
    
    private let userIdKey = "userId"
    
    private override init() {
        super.init()
        
        if WCSession.isSupported() {
            WCSession.default.delegate = self
            WCSession.default.activate()
        }
    }
}

extension WatchConnectivityManager: WCSessionDelegate {
    func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
        print("HERE3")
        if let userId = applicationContext[userIdKey] as? Int {
            DispatchQueue.main.async { [weak self] in
                self?.userId = userId
                print(userId)
            }
        }
        
        print("HERE3")
    }
    
    func session(_ session: WCSession,
                 activationDidCompleteWith activationState: WCSessionActivationState,
                 error: Error?) {}
    
}
