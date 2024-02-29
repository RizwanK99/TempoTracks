#import "AppDelegate.h"
#import "ExpoModulesCore-Swift.h"
#import "TempoTracks-Swift.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"main";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  if ([WCSession isSupported]) {
      WCSession *session = [WCSession defaultSession];
      session.delegate = self;
      [session activateSession];
  }
  
  [[MusicPoller shared] startPolling];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// Linking API
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)session:(WCSession *)session activationDidCompleteWithState:(WCSessionActivationState)activationState error:(NSError *)error {
  if (activationState == WCSessionActivationStateActivated) {
      NSLog(@"IOS WCSession activated successfully.");
      // You can now safely send data to the watch or receive data
  } else if (error) {
      NSLog(@"IOS WCSession activation failed with error: %@", error.localizedDescription);
      // Handle the error, maybe try to activate the session again or inform the user
  }
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    [[MusicPoller shared] stopPolling];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    [[MusicPoller shared] startPolling];
}

- (void)applicationWillTerminate:(UIApplication *)application {
    [[MusicPoller shared] stopPolling];
}

- (void)sessionDidBecomeInactive:(WCSession *)session {
  NSLog(@"IOS WCSession did become inactive.");
  // Optional: Update UI or internal state to reflect inactive session
}

- (void)sessionDidDeactivate:(WCSession *)session {
  NSLog(@"IOS WCSession did deactivate.");
  // Reactivate the session to ensure it's ready for further communication
  [[WCSession defaultSession] activateSession];
  // Optional: Update UI or internal state to reflect deactivated session
}

- (void)session:(WCSession *)session didReceiveMessage:(NSDictionary<NSString *,id> *)message {
  NSString *functionName = message[@"functionName"];
  NSString *data = message[@"data"];
  
  NSLog(@"Message received from watch");
  
  [WatchManagerStrategy callFunctionWithName:functionName withData:data];
}

@end
