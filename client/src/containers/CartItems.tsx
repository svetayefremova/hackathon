import React from "react";
import {FlatList, Image, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";

import {Container, Spinner, Text} from "../components";
import {Cart, CartItem} from "../graphql/types";
import {useRemoveItemFromCartMutation} from "../hooks/mutations";
import {useCurrentCartQuery} from "../hooks/queries";
import {colors, fonts} from "../theme";

const ProductItem = ({item}: {item: CartItem}) => {
  const [mutate, loading, error] = useRemoveItemFromCartMutation();

  const removeItem = async () => {
    const removeItemFromCartInput = {
      itemId: item.id,
    };
    await mutate(removeItemFromCartInput);
  };

  return (
    <Wrapper>
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
        <Text padding={0}>Size: {item.product.size}</Text>
        <Text padding={0}>Color: {item.product.color}</Text>
        <Text padding={0}>Price: {item.product.price}</Text>
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

const CartList: React.FC = () => {
  const {loading, error, data} = useCurrentCartQuery();

  const keyExtractor = item => item.id;

  const renderItem = ({item}: {item: CartItem}) => {
    return <ProductItem item={item} />;
  };

  if (loading) {
    return <Spinner center />;
  }

  if (error) {
    return (
      <Text danger align="center">
        {error.message}
      </Text>
    );
  }

  const currentCart: Cart = data && data.currentCart;

  console.log("currentCart", currentCart);
  if (!currentCart) {
    return (
      <Container align="center" justify="center">
        <Text>No items in the cart</Text>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={currentCart.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={1}
      />
    </Container>
  );
};

const Wrapper = styled.View`
  border-radius: 8px;
  border-width: 1px;
  border-color: ${colors.darkFontColor};
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

export default CartList;
