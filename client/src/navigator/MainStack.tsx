import React from "react";
import {createStackNavigator} from "react-navigation-stack";

import {NavigationIcon} from "../components";
import Cart from "../screens/Cart";
import Dashboard from "../screens/Dashboard";
import Product from "../screens/Product";
import {colors} from "../theme";
import styles from "./styles";

const MainStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.primary,
        headerBackImage: <NavigationIcon name="arrow-left" />,
      }),
    },
    Product: {
      screen: Product,
      navigationOptions: () => ({
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.primary,
        headerBackImage: <NavigationIcon name="arrow-left" />,
      }),
    },
    Cart: {
      screen: Cart,
      navigationOptions: () => ({
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.primary,
        headerBackImage: <NavigationIcon name="close" />,
      }),
    },
  },
  {
    mode: "modal",
    headerBackTitleVisible: false,
  },
);

export default MainStack;
