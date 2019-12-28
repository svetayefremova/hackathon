import React from "react";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout, Text} from "../components";
import {CartList} from "../containers";

const Checkout: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout justifyContent="center">
      <Text>Checkout process is in progress...</Text>
      <CartList />
    </Layout>
  );
};

export default Checkout;
