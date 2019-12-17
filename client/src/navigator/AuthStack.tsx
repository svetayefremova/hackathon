import React from "react";
import {createStackNavigator} from "react-navigation-stack";

import {NavigationIcon} from "../components";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Welcome from "../screens/Welcome";

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: () => ({
        headerShown: false,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerTitle: "Login",
        headerBackImage: <NavigationIcon name="close" />,
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        headerTitle: "Create account",
        headerBackImage: <NavigationIcon name="close" />,
      }),
    },
  },
  {
    mode: "modal",
  },
);

export default AuthStack;
