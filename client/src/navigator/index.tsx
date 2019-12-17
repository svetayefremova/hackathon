import React from "react";
import {Transition} from "react-native-reanimated";
import {createAppContainer} from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";

import Loading from "../screens/Loading";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

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

export default createAppContainer(SwitchNavigator);
