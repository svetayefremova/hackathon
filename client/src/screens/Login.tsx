import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Container, Layout, Text} from "../components";
import {LoginForm, LoginWithFacebookButton} from "../containers";
import {ErrorCode} from "../graphql/types";
import {useLoginMutation} from "../hooks/mutations";
import {colors} from "../theme";

export interface LoginInput {
  email: string;
  password: string;
}

const Login: React.FC<NavigationStackScreenProps> = props => {
  const [mutate, loading, error] = useLoginMutation();
  const [formState, setFormState] = useState(0);
  const [serverError, setServerError] = useState();

  useEffect(() => {
    if (error && error.extensions.code === ErrorCode.registeredWithSocial) {
      setFormState(1);
    } else {
      setServerError(error);
    }
  }, [error, setFormState]);

  const loginWithCredentials = async ({email, password}: LoginInput) => {
    const {
      data: {login},
    } = await mutate(email, password);

    if (login) {
      props.navigation.navigate("Home");
    } else {
      alert("Ooops... something went wrong...");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={{flex: 1}}>
      <Layout>
        <ScrollView centerContent>
          {formState === 0 && (
            <>
              <Container padding={20}>
                <LoginWithFacebookButton
                  onFinishLogin={() => props.navigation.navigate("Home")}
                  title="Log in with Facebook"
                />
              </Container>
              <Text align="center" padding={16}>
                ─── OR ───
              </Text>
              <LoginForm
                onLogin={loginWithCredentials}
                disabled={loading}
                error={serverError}
              />
            </>
          )}
          {formState === 1 && (
            <Container padding={20}>
              <Text
                align="center"
                style={{paddingHorizontal: 12, paddingVertical: 28}}>
                {error.message}
              </Text>
              <LoginWithFacebookButton
                onFinishLogin={() => props.navigation.navigate("Home")}
              />
              <Button
                color={colors.primary}
                title="Go Back"
                reverse
                onPress={() => setFormState(0)}
              />
            </Container>
          )}
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default Login;
