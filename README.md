# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

Recipe Finder App – Documentation
Introduction
Recipe Finder is a React Native app that helps users discover recipes using TheMealDB API. Users can:
•	Browse recipes
•	Search meals
•	View recipe details and ingredients
•	Add meals to Favorites
•	Get a random recipe with a "Surprise Me" button
This project demonstrates React Native with Redux Toolkit, async data handling using filter functions, and React Navigation.
________________________________________
Packages Used
Install these before running the project:
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack

npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons

•		FOR VECTOR ICONS: Edit android/app/build.gradle (NOT android/build.gradle) and add:

		apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")


npm install @reduxjs/toolkit react-redux redux-persist

Make sure to go documents and download according to that!!
________________________________________
Project Structure
RecipeFinderApp/
├── App.tsx             # Main entry point
├── package.json
├── index.js
├── src/
│   ├── assets/
│   │   └── images/           # All app images
│   ├── services/
│   │   ├── AuthStorage.tsx   # AsyncStorage for login persistence
│   ├── navigation/
│   │   ├── TabNavigation.tsx # Bottom tabs and stack navigation
│   ├── redux/
│   │   ├── store.ts          # Redux store configuration
│   │   ├── authSlice.ts      # Authentication slice
│   └── screens/
│       ├── LoginScreen.tsx
│       ├── Register.tsx
│       ├── Details.tsx
│       ├── FavouriteContext.tsx
│       ├── FavouriteScreen.tsx
│       ├── types.tsx
│       └── SupriseButton.tsx
________________________________________
How Redux Works Here
•	Redux Toolkit is used for global state: login and favorites.
•	authSlice.ts manages login/logout state.
•	store.ts combines slices and configures redux-persist to save login state.
Example: clicking login updates Redux state and persists using AsyncStorage, so the user remains logged in after app restart.
________________________________________
How Navigation Works
•	React Navigation handles multiple screens.
•	TabNavigation.tsx provides bottom tab navigation for Home, Favorites, and Profile.
•	Stack navigation is used for Details and other screens.
Example: clicking a recipe in Home navigates to Details.tsx using stack navigation.
________________________________________
File-by-File Explanation
App.tsx
•	Wraps the app with Redux Provider and NavigationContainer.
src/navigation/TabNavigation.tsx
•	Configures bottom tabs and stack screens.
src/screens/LoginScreen.tsx & Register.tsx
Handle user authentication and update Redux state.
   
src/screens/Details.tsx
•	Displays recipe details and ingredients, filtering data from the local list.
•	   
src/screens/FavouriteScreen.tsx & FavouriteContext.tsx
•	Shows favorite recipes and allows removal.
•	 
src/screens/SupriseButton.tsx
•	Fetches a random recipe from the local list and displays it.
src/services/AuthStorage.tsx
•	Saves login session to AsyncStorage for persistence.
src/redux/authSlice.ts & store.ts
•	Manage authentication state globally using Redux Toolkit.
src/screens/types.tsx
•	Contains TypeScript types/interfaces used in the project.

 
________________________________________
How to Run the Project
1.	Clone project.
2.	Install dependencies:
			npm install
3.	Run on Android:
			npx react-native run-android
4.	Run on iOS:
			npx react-native run-ios

<img width="357" height="803" alt="image" src="https://github.com/user-attachments/assets/3d8a4192-82f4-4941-ace3-d45466428da4" />
<img width="354" height="714" alt="image" src="https://github.com/user-attachments/assets/7a0b9619-5a40-40dd-ab57-3884b7f9fda9" />
<img width="353" height="727" alt="image" src="https://github.com/user-attachments/assets/a3260db2-5fb1-49c4-9203-2d9841008e47" />
<img width="353" height="727" alt="image" src="https://github.com/user-attachments/assets/a1b5b899-10dd-48b5-93ba-97a6643ce4e8" />
<img width="350" height="783" alt="image" src="https://github.com/user-attachments/assets/106d1d9e-0023-400d-9129-57d9a77e8f90" />
<img width="344" height="743" alt="image" src="https://github.com/user-attachments/assets/ec0a1018-4ae5-47ed-a6d5-951f523178d8" />
<img width="347" height="754" alt="image" src="https://github.com/user-attachments/assets/758f87bd-0445-4bb1-a318-84e3247e24ab" />


