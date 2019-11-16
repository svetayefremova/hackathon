import React, {FunctionalComponent} from "react";
import {StyleSheet, Text, View} from "react-native";

import Products from "../components/Products";

const Home: FunctionalComponent = () => {
  return (
    <View>
      <Products />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
