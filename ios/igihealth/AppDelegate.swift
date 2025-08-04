import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase

@main
class AppDelegate: RCTAppDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
  ) -> Bool {

    // ✅ Initialize Firebase
    if FirebaseApp.app() == nil {
      FirebaseApp.configure()
    }

    self.moduleName = "igihealth"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
     self.bundleURL()
  }

  override func bundleURL() -> URL? {

#if DEBUG
    let url = URL(string: "http://192.168.3.75:8081/index.bundle?platform=ios&dev=true")
    return url

#else

   return Bundle.main.url(forResource: "main", withExtension: "jsbundle")

#endif

}
}
