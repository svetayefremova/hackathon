import React from "react";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";

import {Text} from "../components";
import {useCurrentCartQuery} from "../hooks/queries";
import {colors} from "../theme";

const HeaderRightButton: React.FC = props => {
  const {data} = useCurrentCartQuery();

  let numberOfItems = 0;
  if (data && data.currentCart) {
    numberOfItems = data.currentCart.items.length;
  }

  return (
    <IconContainer>
      {numberOfItems > 0 ? (
        <Label>
          <Text padding={0}>{numberOfItems}</Text>
        </Label>
      ) : (
        <View />
      )}

      <Icon.Button
        name="cart-outline"
        backgroundColor={"transparent"}
        color={colors.darkFontColor}
        size={28}
        underlayColor="transparent"
        onPress={() => props.navigation.navigate("Checkout")}
      />
    </IconContainer>
  );
};

const Label = styled.View`
  height: 24px;
  border-radius: 12px;
  border-width: 1;
  border-color: ${colors.darkFontColor};
  width: 24px;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.View`
  position: relative;
  align-items: center;
  flex-direction: row;
`;

export default HeaderRightButton;
