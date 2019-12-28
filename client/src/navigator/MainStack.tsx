import React from "react";
import {createStackNavigator, TransitionPresets} from "react-navigation-stack";

import {NavigationIcon} from "../components";
import Cart from "../screens/Cart";
import Dashboard from "../screens/Dashboard";
import ProductDetails from "../screens/ProductDetails";
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
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: () => ({
        header: null,
        cardTransparent: true,
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
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
    },
  },
);

export default MainStack;
