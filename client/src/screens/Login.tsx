import React from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout} from "../components";
import {LoginForm} from "../containers";
import {useLoginMutation} from "../hooks/mutations";

interface LoginInput {
  email: string;
  password: string;
}

const Login: React.FC<NavigationStackScreenProps> = props => {
  const [mutate, loading, error] = useLoginMutation();

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
      <Layout justifyContent="space-between">
        <ScrollView centerContent>
          <LoginForm
            onLogin={loginWithCredentials}
            disabled={loading}
            error={error}
          />
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default Login;
