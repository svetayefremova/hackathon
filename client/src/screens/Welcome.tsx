import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Container, Layout, Text} from "../components";
import {LoginWithFacebookButton} from "../containers";
import {colors, fonts} from "../theme";

const Welcome: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout justifyContent="space-between">
      <ScrollView centerContent>
        <Container padding={20}>
          <LoginWithFacebookButton
            onFinishLogin={() => props.navigation.navigate("Home")}
          />
          <Text style={styles.separator}>─── OR ───</Text>
          <Button
            title="Create account"
            onPress={() => props.navigation.navigate("SignUp")}
            uppercased
          />
          <Container direction="row" align="center" justify="center">
            <Text style={styles.text}>Already have an account?</Text>
            <Button
              title="Login"
              color={colors.primary}
              onPress={() => props.navigation.navigate("Login")}
              reverse
            />
          </Container>
        </Container>
      </ScrollView>
      <Button
        title="Skip Login"
        color={colors.primary}
        onPress={() => props.navigation.navigate("Home")}
        reverse
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  separator: {
    color: colors.baseColorOpacity,
    alignSelf: "center",
    paddingVertical: 30,
    textTransform: "uppercase",
  },
});

export default Welcome;
