import type { CapacitorConfig } from '@capacitor/cli';

/** Android app (APK): the game served by the WebView from the files of `npm run android-build`. */
const config: CapacitorConfig = {
  appId: 'com.conardjason.pkproject',
  appName: 'PK Project',
  webDir: 'dist/android/browser',
};

export default config;
