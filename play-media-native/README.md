# PLAY! Media Native app

This is a React Native project, scaffolded with Expo.

## Getting Started (Developing on Windows PC)

1. Install "Android Studio" from https://developer.android.com/studio

1. This should automatically install Android SDK and add 'adb' command to PATH. If it does not please add 'C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools' to your PATH Environment Variable. to verify open terminal and type in adb and it should not give error.

1. Install "Expo GO" app on your mobile.

1. Install npm packages from native app project root:

    ```bash
    cd play-media-native
    npm install
    npm start
    ```

1. Scan QR code and wait for bundle to download to your mobile device via tunneling.

1. if you do not wish to use your phone, you can use an emulator on your computer. From Android Studio, go to SDK manager. Download any one version (i.e. Tiramisu). Once downloaded, go back to Android Virtual Device Manager and create a device (i.e. Pixel 6 using Tiramisu). Now when you run 'npm start' from above, instead of scanning the qr code, press a and the app will run on the emulator.
