import React from "react";
import {Image} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout} from "../components";
import {HeaderLeftButton, HeaderRightButton, Products} from "../containers";
import {images} from "../theme";

const Dashboard: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

Dashboard.navigationOptions = screenProps => ({
  headerTitle: () => (
    <Image source={images.logo} resizeMode="contain" style={{height: 28}} />
  ),
  headerRight: () => <HeaderRightButton {...screenProps} />,
  headerLeft: () => <HeaderLeftButton {...screenProps} />,
});

export default Dashboard;
