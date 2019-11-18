import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {colors} from "../theme";

const HeaderRightButton: React.FC = props => {
  return (
    <Icon.Button
      name="cart-outline"
      backgroundColor={"transparent"}
      color={colors.darkFontColor}
      size={28}
      underlayColor="transparent"
      onPress={() => props.navigation.navigate("Chechout")}
    />
  );
};

export default HeaderRightButton;
