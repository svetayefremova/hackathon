import AsyncStorage from "@react-native-community/async-storage";
import React, {FunctionalComponent, useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Themed} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";

const Loading: FunctionalComponent<NavigationStackScreenProps> = props => {
  const bootstrapAsync = async () => {
    const userToken: string = await AsyncStorage.getItem("userToken");
    const initialRouteName: string = userToken ? "App" : "Auth";
    props.navigation.navigate(initialRouteName);
  };

  useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Themed.StatusBar />
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

export default Loading;
