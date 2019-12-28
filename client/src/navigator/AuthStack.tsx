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
        header: null,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: "Login",
        headerBackImage: <NavigationIcon name="close" />,
        headerBackTitleVisible: false,
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        title: "Create account",
        headerBackImage: <NavigationIcon name="close" />,
        headerBackTitleVisible: false,
      }),
    },
  },
  {
    mode: "modal",
  },
);

export default AuthStack;
