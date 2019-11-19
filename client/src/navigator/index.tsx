import React from "react";
import {StyleSheet} from "react-native";
import {Transition} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {createAppContainer} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";

import {DrawerContent} from "../containers";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Home from "../screens/Home";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Welcome from "../screens/Welcome";
import {colors, fonts} from "../theme";

const BackIcon = (
  <Icon
    style={{paddingHorizontal: 16}}
    name="arrow-left"
    size={fonts.iconSizeMiddle}
    color={colors.primary}
  />
);

const CloseIcon = (
  <Icon
    style={{paddingHorizontal: 16}}
    name="close"
    size={fonts.iconSizeMiddle}
    color={colors.primary}
  />
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.primary,
        headerBackImage: BackIcon,
      }),
    },
    Cart: {
      screen: Cart,
      navigationOptions: () => ({
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.primary,
        headerBackImage: CloseIcon,
      }),
    },
  },
  {
    mode: "modal",
    headerBackTitleVisible: false,
  },
);

const AppStack = createDrawerNavigator(
  {
    Main: createStackNavigator(
      {
        Home: HomeStack,
        Checkout: {
          screen: Checkout,
          navigationOptions: () => ({
            headerStyle: styles.navigationHeader,
            headerTintColor: colors.primary,
            headerBackImage: BackIcon,
          }),
        },
      },
      {headerMode: "none", headerBackTitleVisible: false},
    ),
  },
  {
    contentComponent: props => <DrawerContent {...props} />,
  },
);

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
        headerBackImage: CloseIcon,
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        headerTitle: "Create account",
        headerBackImage: CloseIcon,
      }),
    },
  },
  {
    mode: "modal",
  },
);

const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    Loading,
  },
  {
    initialRouteName: "Loading",
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-top"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

const styles = StyleSheet.create({
  navigationHeader: {
    borderBottomWidth: 0,
  },
});

export default createAppContainer(SwitchNavigator);
