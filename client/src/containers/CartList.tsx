import React from "react";
import {FlatList} from "react-native";
import styled from "styled-components";

import {Container, Spinner, Text} from "../components";
import {Cart, CartItem} from "../graphql/types";
import {useCurrentCartQuery} from "../hooks/queries";
import CartProduct from "./CartItem";

const CartList: React.FC = () => {
  const {data, loading, error} = useCurrentCartQuery();

  const keyExtractor = item => item.id;

  const renderItem = ({item}: {item: CartItem}) => {
    return (
      <ItemContainer>
        <CartProduct item={item} />
      </ItemContainer>
    );
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
        initialNumToRender={10}
      />
    </Container>
  );
};

const ItemContainer = styled.View`
  height: 150;
`;

export default CartList;
