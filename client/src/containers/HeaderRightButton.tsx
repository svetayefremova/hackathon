import React, { useRef, useState, useEffect } from "react";
import { Transition, Transitioning } from 'react-native-reanimated';
import Icon from "react-native-vector-icons/AntDesign";

import { colors } from "../theme";
import {useLogoutMutation} from "../hooks/mutations";
import {useCurrentUserQuery} from "../hooks/queries";


const HeaderRightButton: React.FC = props => {
  const [showButton, setShowButton] = useState(false);
  const {data} = useCurrentUserQuery();
  const mutate = useLogoutMutation();
  const ref = useRef();

  useEffect(() => {
    if (!showButton) {
      ref.current.animateNextTransition();
      setShowButton(true);
    }
  }, [setShowButton])

  const logout = async () => {
    props.navigation.navigate("Welcome");
    await mutate();
  };

  const currentUser = data && data.currentUser;

  const transition = (
    <Transition.Sequence>
      <Transition.In type="scale" durationMs={400}/>
    </Transition.Sequence>
  );

  const renderButton = () => {
    if (currentUser) {
      return (
        <Icon.Button
          name="logout"
          backgroundColor={"transparent"}
          color={colors.primaryDark}
          underlayColor={"rgba(0,0,0,0.12)"}
          onPress={logout}
        >
          Log out
        </Icon.Button>
      )
    } else {
      return (
        <Icon.Button
          name="login"
          backgroundColor={"transparent"}
          color={colors.primaryDark}
          underlayColor={"rgba(0,0,0,0.12)"}
          onPress={() => props.navigation.navigate("Welcome")}
        >
          Log in
        </Icon.Button>
      )
    }
  }

  return (
    <Transitioning.View
      ref={ref}
      transition={!currentUser ? transition : null}
      style={{paddingHorizontal: 16}}
    >
      {showButton && renderButton()}
    </Transitioning.View>
  );
};

export default HeaderRightButton;