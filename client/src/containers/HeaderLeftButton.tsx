import React, {useEffect, useRef, useState} from "react";
import {Transition, Transitioning} from "react-native-reanimated";
import Icon from "react-native-vector-icons/AntDesign";
import styled from "styled-components";

import {User} from "../graphql/types";
import {useCurrentUserQuery} from "../hooks/queries";
import {colors} from "../theme";

const HeaderLeftButton: React.FC = props => {
  const [showButton, setShowButton] = useState(false);
  const {data} = useCurrentUserQuery();

  const ref = useRef();

  useEffect(() => {
    if (!showButton) {
      ref.current.animateNextTransition();
      setShowButton(true);
    }
  }, [setShowButton]);

  const currentUser: User = data && data.currentUser;

  const transition = (
    <Transition.Together>
      <Transition.In type="scale" durationMs={600} />
    </Transition.Together>
  );

  const renderButton = () => {
    if (currentUser) {
      return (
        <IconButton onPress={() => props.navigation.openDrawer()}>
          <Icon name="user" color={colors.darkFontColor} size={28} />
        </IconButton>
      );
    } else {
      return (
        <Icon.Button
          name="login"
          backgroundColor={"transparent"}
          color={colors.darkFontColor}
          underlayColor={"rgba(0,0,0,0.12)"}
          size={28}
          style={{marginHorizontal: 8}}
          onPress={() => props.navigation.navigate("Welcome")}>
          Log in
        </Icon.Button>
      );
    }
  };

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {showButton && renderButton()}
    </Transitioning.View>
  );
};

const IconButton = styled.TouchableOpacity`
  margin: 0 16px;
`;

export default HeaderLeftButton;
