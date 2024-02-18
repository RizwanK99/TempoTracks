//
//  WatchManager.m
//  TempoTracks
//
//  Created by Alexander Ma on 2024-02-17.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WatchManager, NSObject)
RCT_EXTERN_METHOD(sendSongs:(NSString *)songs
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
@end
