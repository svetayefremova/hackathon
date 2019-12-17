import React from "react";
import {Image} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout, Text} from "../components";
import {images} from "../theme";

const Product: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout>
      <Text>Product {props.navigation.getParam("id")}</Text>
    </Layout>
  );
};

Product.navigationOptions = () => ({
  headerTitle: () => (
    <Image source={images.logo} resizeMode="contain" style={{height: 28}} />
  ),
});

export default Product;
