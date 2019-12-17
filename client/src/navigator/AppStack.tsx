import React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";

import {NavigationIcon} from "../components";
import {DrawerContent} from "../containers";
import Checkout from "../screens/Checkout";
import {colors} from "../theme";
import MainStack from "./MainStack";
import styles from "./styles";

const AppStack = createDrawerNavigator(
  {
    App: createStackNavigator(
      {
        Main: MainStack,
        Checkout: {
          screen: Checkout,
          navigationOptions: () => ({
            headerStyle: styles.navigationHeader,
            headerTintColor: colors.primary,
            headerBackImage: <NavigationIcon name="arrow-left" />,
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

export default AppStack;
