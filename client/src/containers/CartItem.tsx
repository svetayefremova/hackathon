import React from "react";
import {Image} from "react-native";
import {getUniqueId} from "react-native-device-info";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {withNavigation} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";
import styled from "styled-components";

import {Container, Text} from "../components";
import {CartItem} from "../graphql/types";
import {useRemoveItemFromCartMutation} from "../hooks/mutations";
import {colors, fonts} from "../theme";

export interface CartProductProps {
  item: CartItem;
}

const CartProduct: React.FC<CartProductProps & NavigationStackScreenProps> = ({
  item,
  ...props
}) => {
  const [mutate, loading, error] = useRemoveItemFromCartMutation();

  const removeItem = async () => {
    const removeItemFromCartInput = {
      itemId: item.id,
      deviceToken: getUniqueId(),
    };

    if (error) {
      alert(error.message);
    }

    await mutate(removeItemFromCartInput);
  };

  return (
    <Wrapper
    // onPress={() =>
    //   props.navigation.navigate("ProductDetails", {id: item.product.id})
    // }
    >
      <ImageContainer>
        <Image
          style={{width: 90, height: 120}}
          source={{uri: item.product.image}}
        />
      </ImageContainer>
      <DetailsContainer>
        <Container align="center">
          <Text title padding={0}>
            {item.product.name}
          </Text>
          <Text padding={0}>Quantity: {item.quantity}</Text>
        </Container>
        <Text padding={0} note>
          Size: {item.product.size}
        </Text>
        <Text padding={0} note>
          Color: {item.product.color}
        </Text>
        <Text padding={0} note>
          Price: {item.product.price}
        </Text>
      </DetailsContainer>

      <Icon
        name="close"
        backgroundColor="transparent"
        size={fonts.iconSizeBase}
        color={colors.darkFontColor}
        onPress={removeItem}
        borderRaidus={14}
        padding={4}
        disabled={loading}
      />
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  border-radius: 8px;
  border-width: 1px;
  border-color: ${colors.darkFontColor};
  border-style: dashed;
  margin: 8px;
  padding: 4px 0;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsContainer = styled.View`
  flex: 1;
  padding: 8px;
`;

const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export default withNavigation(CartProduct);
