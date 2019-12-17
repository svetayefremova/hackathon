import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Button, Container, Layout, Text} from "../components";
import {LoginWithFacebookButton, SignUpForm} from "../containers";
import {ErrorCode} from "../graphql/types";
import {SignUpInput, useSignUpMutation} from "../hooks/mutations";
import {colors} from "../theme";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<NavigationStackScreenProps> = props => {
  const [mutate, loading, error] = useSignUpMutation();
  const [formState, setFormState] = useState(0);
  const [serverError, setServerError] = useState();

  useEffect(() => {
    if (error && error.extensions.code === ErrorCode.registeredWithSocial) {
      setFormState(1);
    } else {
      setServerError(error);
    }
  }, [error, setFormState]);

  const onSubmit = async (input: SignUpInput) => {
    const {
      data: {signup},
    } = await mutate(input);
    if (signup) {
      props.navigation.navigate("Main");
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
                <Text align="center">
                  Create your account and get access to member exclusive
                  products and benefits
                </Text>
                <LoginWithFacebookButton
                  onFinishLogin={() => props.navigation.navigate("Main")}
                  title="Log in with Facebook"
                />
              </Container>
              <Text align="center" padding={16}>
                ─── OR ───
              </Text>
              <SignUpForm
                onSubmit={onSubmit}
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
                onFinishLogin={() => props.navigation.navigate("Main")}
              />
              <Button
                color={colors.primary}
                title="Continue Creating a New account"
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

export default SignUp;
