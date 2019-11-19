import React from "react";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Container, Layout, Text} from "../components";
import {CartItems} from "../containers";

const Cart: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout>
      <Container padding={20}>
        <Text large>Your Cart</Text>
        <CartItems />
        <Button
          title="To checkout"
          uppercased
          onPress={() => props.navigation.navigate("Checkout")}
        />
        <Button
          title="Continue shopping"
          reverse
          onPress={() => props.navigation.goBack()}
        />
      </Container>
    </Layout>
  );
};

export default Cart;
