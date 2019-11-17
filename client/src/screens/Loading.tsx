import React, {useEffect} from "react";
import {ActivityIndicator} from "react-native";
import {Themed} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Container} from "../components";
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
    <Container center>
      <ActivityIndicator />
      <Themed.StatusBar />
    </Container>
  );
};

export default Loading;
