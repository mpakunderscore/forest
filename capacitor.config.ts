import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'space.mpak.forest',
  appName: 'Forest',
  webDir: 'dist',
  bundledWebRuntime: false,
  backgroundColor: '#000',
  plugins: {
    "LocalNotifications": {
      "smallIcon": "ic_stat_logo_favicon",
      "iconColor": "#FFFFFF",
      "sound": "long_sound"
    },
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
