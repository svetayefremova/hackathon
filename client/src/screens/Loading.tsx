import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Themed} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {useCurrentUserQuery} from "../hooks/queries";

const Loading: React.FC<NavigationStackScreenProps> = props => {
  const {data, loading} = useCurrentUserQuery();

  const isLoggedIn = data && data.currentUser;

  const bootstrapAsync = async () => {
    const initialRouteName: string = isLoggedIn ? "App" : "Auth";
    props.navigation.navigate(initialRouteName);
  };

  useEffect(() => {
    if (!loading) {
      bootstrapAsync();
    }
  }, [bootstrapAsync, loading]);

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
