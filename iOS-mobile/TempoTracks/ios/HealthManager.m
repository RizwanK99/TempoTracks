//
//  HealthManager.m
//  TempoTracks
//
//  Created by Kuba Rogut on 2024-02-25.
//


#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(HealthManager, NSObject)

RCT_EXTERN_METHOD(
  requestAuthorization: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
  testFunction: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

@end

