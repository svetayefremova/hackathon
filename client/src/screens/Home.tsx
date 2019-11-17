import React, {FunctionalComponent} from "react";
import {Button, StyleSheet, Text, View} from "react-native";

import {Layout, Products} from "../components";
import {useLogoutMutation} from "../hooks/mutations";
import {useCurrentUserQuery} from "../hooks/queries";

const Home: FunctionalComponent = props => {
  const {data, loading} = useCurrentUserQuery();
  const mutate = useLogoutMutation();

  const logout = async () => {
    await mutate();
    props.navigation.navigate("Login");
  };

  if (loading) {
    return <View />;
  }

  const currentUser = data && data.currentUser;
  return (
    <Layout>
      {currentUser && (
        <View style={styles.userContainer}>
          <Text>{currentUser.username}</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      )}
      <Products />
    </Layout>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    paddingTop: 60,
  },
});

export default Home;
