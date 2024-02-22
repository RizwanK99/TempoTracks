//
//  WatchManager.m
//  TempoTracks
//
//  Created by Alexander Ma on 2024-02-17.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(WatchManager, NSObject)
RCT_EXTERN_METHOD(sendSongs:(NSString *)songs
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(sendWorkouts:(NSString *)workouts
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(updateWorkoutId:(NSString *)workout_id
    template_id: (NSString *)template_id
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(togglePauseWorkout:(NSString *)workout_id
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(endWorkout:(NSString *)workout_id
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
@end

@interface RCT_EXTERN_MODULE(WatchManagerEmitter, RCTEventEmitter)
RCT_EXTERN_METHOD(createWorkout: (NSString *)workout)
@end
