# Vanhack Bonsai

Simple shopping application created with React Native and Apollo/GraphQl

## Features

- Athentication/Authorization
- Login with Facebook
- Add/Remove products to/from cart
- Infinite scroll for products

## Requirements

You have to register the application  at developers.facebook.com and get **App ID** and **App Secret**. This is important for login with facebook. In you App settings don't forget to add android platform for your application.

### Configuration

To set up this project, please copy `.env.dist` to `.env` first. Provide your facebook app details here as well as secret key for auth session.

```
SECRET_KEY=secret
FACEBOOK_CLIENT_ID=<You_App_ID>
FACEBOOK_APP_SECRET=<You_App_Secret>
```

## Installation
1. Run mongodb on `localhost:27017`

2. Navigate to `/server`

```bash
$ yarn install
$ yarn dev
```

3. Navigate to `/client`

```bash
$ yarn install
```

You should update also you android files with facbook APP_ID and APP_key manually

**client/android/app/src/main/res/values/strings.xml**
```bash
<string name="facebook_app_id">{your-app-id}</string>
```

**client/ios/client/Info.plist**
```bash
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fb{your-app-id}</string>
    </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>{your-app-id}</string>
<key>FacebookDisplayName</key>
<string>{your-app-name}</string>
```

Install all extra dependencies for ios

```bash
$ cd ios/ && pod install
```


### Usage

```bash
$ yarn ios
$ yarn android
```
If you have issues to build ios, you should change XCode settings
*File -> Project Settings (or WorkSpace Settings) -> Build System -> Legacy Build System*

## License

You can check out the full license [here](https://github.com/svetayefremova/vanhack-bonsai/LICENSE)

This project is licensed under the terms of the **MIT** license.

