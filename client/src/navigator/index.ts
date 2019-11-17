import {StyleSheet} from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {colors} from "../theme";

import Home from "../screens/Home";
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Welcome from "../screens/Welcome";

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: "Home",
      headerStyle: styles.navigationHeader,
      headerTintColor: colors.primary,
      headerTitleStyle: styles.headerTitleStyle,
      headerTransparent: true,
    }),
  },
});
const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      headerTitle: "Login",
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      headerTitle: "Create account",
    }),
  },
});

const SwitchNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    Loading,
  },
  {
    initialRouteName: "Loading",
  },
);

const styles = StyleSheet.create({
  navigationHeader: {
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: colors.primary,
  },
});

export default createAppContainer(SwitchNavigator);
