//
//  MusicManager.m
//  TempoTracks
//
//  Created by Kuba Rogut on 2023-07-25.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(MusicManager, NSObject)

RCT_EXTERN_METHOD(
  requestAuthorization: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  searchMusicCatalog: (NSString)searchTerm
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  searchMusicLibrary: (NSString)searchTerm
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  getSongLibrary: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  getPlaylistLibrary: (NSString)playlistId
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  playSongWithId: (NSString)songId
)
RCT_EXTERN_METHOD(
  addSongsToQueue: (NSArray)songIds
  resolver: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  getCurrentQueue: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
  changePlayerPlayback: (NSString)nextState
)
RCT_EXTERN_METHOD(
  changePlayerState: (nonnull NSNumber)playbackRate
  repeat: (NSString)repeatMode
  shuffle: (NSString)shuffleMode
)

RCT_EXTERN_METHOD(
  getPlayerState: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(getCount: (RCTResponseSenderBlock)callback)

@end
