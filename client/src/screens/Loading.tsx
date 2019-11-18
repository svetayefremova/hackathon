import React, {useEffect} from "react";
import {ActivityIndicator} from "react-native";
import {Themed} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Container} from "../components";
import {User} from "../graphql/types";
import {useCurrentUserQuery} from "../hooks/queries";
import {colors} from "../theme";

const Loading: React.FC<NavigationStackScreenProps> = props => {
  const {data, loading} = useCurrentUserQuery();

  const isLoggedIn: User = data && data.currentUser;

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
      <ActivityIndicator color={colors.primaryDark} size="large" />
      <Themed.StatusBar />
    </Container>
  );
};

export default Loading;
