#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import <WatchConnectivity/WatchConnectivity.h>

@interface AppDelegate : EXAppDelegateWrapper<WCSessionDelegate>

@end
