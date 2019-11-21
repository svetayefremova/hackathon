# VanHack Bonsai

In this repository you will find a simple mobile shopping application using React Native and Apollo/GraphQL/NodeJS for backend service.

## Features

This application currently supports the following features:

- User Registration and Authentication
- Login with Facebook
- Add/Remove Products to/from Shopping Cart
- Infinite Scrolling for Products

## Requirements

To use this application, you have to fulfill following requirements:

* Set up and run a NodeJS environment, for example by [downloading](https://nodejs.org/en/) and installing the binary file, or by using the official [Docker image](https://hub.docker.com/_/node/).

* Set up and run a MongoDB database, for example by [downloading](https://www.mongodb.com/download-center/community) and installing the binary file, or by using the official [Docker image](https://hub.docker.com/_/mongo).

* You also have to register a new application at [developers.facebook.com](https://developers.facebook.com/) and get the **App ID** as well as the **App Secret**. This is important if you want to use Facebook Login. Please don't forget to also add iOS and Android platform in your Facebook application settings while you register.

## Installation

1. Set up and run MongoDB on standard host and port (`localhost:27017`) or on any other environment settings you prefer.

2. On your NodeJS environment, please navigate to the `/server` folder and install all NPM packages by using Yarn or NPM:

```bash
$ yarn install
# or
$ npm install
```

3. On your environment for installing and running the mobile application (by using XCode or Android Studio), please navigate to the `/client` folder and install all NPM packages by using Yarn or NPM:

```bash
$ yarn install
# or
$ npm install
```

## Configuration

To set up this project for the backend part, please copy `/server/.env.dist` to `/server/.env`. Within this file `/server/.env` you have to provide your Facebook App credentials as well as any kind of suitable and secret key for the authentication session.

```
SECRET_KEY=<Please add any kind of secret key here>

FACEBOOK_CLIENT_ID=<Please add your registered Facebook App ID here>
FACEBOOK_APP_SECRET=<Please add your registered Facebook App Secret here>
```

If you have different database credentials for your MongoDB setup, then please also update those credentials accordingly:

```
MONGODB_URL="mongodb://localhost/vanhack-bonsai"
```

The same credentials you just used to configure your Facebook App for the backend part, please also add them to the frontend part by editing following files:

_**/client/android/app/src/main/res/values/strings.xml**_

```
<!-- Please set {your-app-id} here -->
<string name="facebook_app_id">{your-app-id}</string>
```

_**/client/ios/client/Info.plist**_

```xml
<!-- Please set {your-app-id} here -->
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fb{your-app-id}</string>
    </array>
  </dict>
</array>

<!-- Please set {your-app-id} here -->
<key>FacebookAppID</key>
<string>{your-app-id}</string>

<!-- Please set {your-app-name} here -->
<key>FacebookDisplayName</key>
<string>{your-app-name}</string>
```

Last but not least, please install all extra dependencies for iOS if you also plan to start the iOS version of the mobile app:

```bash
$ cd /client/ios

$ pod install
```

## Usage

To start the backend server, please navigate to the `/server` folder and run the `start`-script by using Yarn or NPM:

```bash
$ yarn start
# or
$ npm start
```

To build and start the frontend environment, please navigate to the `/client` folder and run the following script for iOS and/or Android by using Yarn or NPM:

```bash
# for the iOS version:
$ yarn ios
# or
$ npm ios
```

```bash
# for the Android version:
$ yarn android
# or
$ npm android
```

_**Please note:** If you may encounter issues while building the iOS version, you should probably change your Xcode settings to `File -> Project Settings (or WorkSpace Settings) -> Build System -> Legacy Build System`_

## Documentation

Please find the documentation of this project [here](https://github.com/svetayefremova/vanhack-bonsai/blob/master/DOCUMENTATION.md).

## License

This project is licensed under the terms of the **MIT** license.

You can check out the full license [here](https://github.com/svetayefremova/vanhack-bonsai/blob/master/LICENCE.md).
