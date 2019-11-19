import React from "react";
import {Image} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout} from "../components";
import {HeaderLeftButton, HeaderRightButton, Products} from "../containers";
import {images} from "../theme";

const Home: React.FC<NavigationStackScreenProps> = props => {
  const addToCart = () => {
    props.navigation.navigate("Cart");
  };

  return (
    <Layout>
      <Products onAddToCart={addToCart} />
    </Layout>
  );
};

Home.navigationOptions = screenProps => ({
  headerTitle: () => (
    <Image source={images.logo} resizeMode="contain" style={{height: 28}} />
  ),
  headerRight: () => <HeaderRightButton {...screenProps} />,
  headerLeft: () => <HeaderLeftButton {...screenProps} />,
});

export default Home;
