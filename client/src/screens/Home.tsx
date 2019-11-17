import React from "react";
import {View} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Layout, Text} from "../components";
import {Products} from "../containers";
import {useLogoutMutation} from "../hooks/mutations";
import {useCurrentUserQuery} from "../hooks/queries";

const Home: React.FC<NavigationStackScreenProps> = props => {
  const {data, loading} = useCurrentUserQuery();
  const mutate = useLogoutMutation();

  const logout = async () => {
    await mutate();
    props.navigation.navigate("Welcome");
  };

  if (loading) {
    return <View />;
  }

  const currentUser = data && data.currentUser;
  return (
    <Layout>
      {currentUser && (
        <View style={{paddingTop: 60}}>
          <Text>{currentUser.username}</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      )}
      <Products />
    </Layout>
  );
};

export default Home;
