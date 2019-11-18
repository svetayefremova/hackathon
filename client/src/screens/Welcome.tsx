import React from "react";
import {Image, ScrollView} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Container, Layout, Text} from "../components";
import {LoginWithFacebookButton} from "../containers";
import {colors, images} from "../theme";

const Welcome: React.FC<NavigationStackScreenProps> = props => {
  return (
    <Layout justifyContent="space-between">
      <ScrollView centerContent>
        <Container padding={20}>
          <Image
            style={{alignSelf: "center", margin: 40}}
            source={images.logo}
          />
          <Text title align="center">
            Welcome to Vanhack-Bonsai
          </Text>
          <LoginWithFacebookButton
            onFinishLogin={() => props.navigation.navigate("Home")}
          />
          <Text align="center" padding={28}>
            ─── OR ───
          </Text>
          <Button
            title="Create account"
            onPress={() => props.navigation.navigate("SignUp")}
            uppercased
          />
          <Container direction="row" align="center" justify="center">
            <Text>Already have an account?</Text>
            <Button
              title="Log in"
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

export default Welcome;
