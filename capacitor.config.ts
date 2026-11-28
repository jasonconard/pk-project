import type { CapacitorConfig } from '@capacitor/cli';

/** Android app (APK): the game served by the WebView from the files of `npm run android-build`. */
const config: CapacitorConfig = {
  appId: 'com.conardjason.pkproject',
  appName: 'Tesselle',
  webDir: 'dist/android/browser',
  plugins: {
    // Live updates of the game files, without a new APK (see update-prompt.component.ts): manual mode, no Capgo
    // service — no update checks, channels nor statistics sent anywhere
    CapacitorUpdater: {
      autoUpdate: false,
      updateUrl: '',
      channelUrl: '',
      statsUrl: '',
    },
  },
};

export default config;
