# PLAY! Media Mobile Phone Application

This is a React Native project, scaffolded with Expo.

## Getting Started (Developing on Windows)

On your computer:

1. Install npm packages from the native app project root:

    ```bash
    cd play-media-native
    npm install
    ```

2. Start the Expo development server:

    ```bash
    npm start
    ```

### Getting Started with a Physical Android or iOS Phone

On your phone:

1. Install and open the "Expo GO" app.
2. Android:
    1. Click the "Scan QR code" button.
    2. If asked, allow the application to use your phone camera.
    3. Point your phone to the QR code in your computer's terminal.
3. iOS
    1. Open your camera application.
    2. Point your phone to the QR code in your computer's terminal.
    3. On the phone screen, click the "Open in Expo Go" button that appears near the QR code.
4. Wait for the bundle to compile, and download to your mobile device via tunneling.

### Getting Started with an Android Emulator

#### Installing an Android Emulator

1. On your computer, download and install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio)
2. Validate the `adb` executable is in your PATH:
    1. Close all PowerShell terminals.
    2. Open an elevated PowerShell terminal.
    3. Type `adb` and hit Enter.
    4. If you are getting documentation for "Android Debug Bridge", continue to creating an Android virtual device.
    5. If you are getting an error:
        1. Add `C:\Users<your_username>\AppData\Local\Android\Sdk\platform-tools` to your `PATH` environment variable.
        2. Close all PowerShell terminals.
        3. Retry the `adb` command.
        4. If you are still getting an error, try rebooting your computer.
3. Create an Android virtual device:
    1. Open Android Studio.
    2. In the middle section of the Android Studio application, click the "More Actions" link.
    3. Choose "Virtual Device Manager".
    4. In the Device Manager, click on the top-left "Create device" button.
    5. In the "Select Hardware" screen, select a predefined phone (e.g.: Pixel 6) and click the Next button.

        > **Note:** The PLAY! Media application is not compatible with non-phone devices. It has not been tested on tablets, watches, desktops, TVs, and cars.

    6. In the "System Image" screen:
        1. Select the latest production operating system version (e.g.: Tiramisu).
        2. Click the small download icon button next to the operating system release name.
        3. In the "License Agreement" screen, select the "Accept" radio button, and click the Next button.
        4. In the "SDK Component Installer" screen, wait for the download and install to finish, then click the Finish button.
        5. Back in the "System Image" screen, click the Next button.
    7. In the "Android Virtual Device (AVD)" screen:
        1. Click the bottom-left "Show Advanced Settings" button.
        2. Scroll down to the "Camera" section.
        3. For both the front and back cameras, select the "Webcam0" or "Device" option for the emulator to use your computer webcam as the phone cameras.
        4. Click the "Finish" button.

#### Running the Project on an Android Emulator

1. In the Android Studio device manager:
    1. Start your virtual device using the "play" triangle icon button next to it in the device list.
2. On your computer, in an elevated PowerShell terminal:
    1. Start the Expo development server for Android:
        - `npm run android`
    2. Type the "a" keyboard key to tell Expo to start the application on your Android emulator.
        - The Expo development server will install Expo Go on your Android emulator, compile the application, send it to your Android emulator, and your Android emulator will open the application.

### Generating an APK for Android

1. Follow the instructions listed here [https://docs.expo.dev/build/setup/](https://docs.expo.dev/build/setup/).
2. Run this npm script

    ```bash
    npm run build:android
    ```

3. Wait for the build to finish, it is going to take a while.
4. Once your build is completed, the CLI will prompt you to automatically download and install it on the Android Emulator.
   See more here [https://docs.expo.dev/build-reference/apk/#emulator-virtual-device](https://docs.expo.dev/build-reference/apk/#emulator-virtual-device).

### Installing the APK on a physical Android phone

1. Follow the instructions listed here [https://docs.expo.dev/build-reference/apk/#physical-device](https://docs.expo.dev/build-reference/apk/#physical-device) in order to download the APK to your Android phone.
2. Enable installing apps from unknown sources in your phone's settings.
3. Find the APK file in your downloads folder.
4. Click on it and when prompted click install.
5. In case you get a warning by Google Play Protect click install anyway.
6. Click on PLAY! Media to open the app. Enjoy!
