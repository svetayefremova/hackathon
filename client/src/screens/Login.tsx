import useForm from "rc-form-hooks";
import React, {FunctionalComponent} from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {AccessToken, LoginButton, LoginManager} from "react-native-fbsdk";
import {NavigationStackScreenProps} from "react-navigation-stack";
import styled from "styled-components";

import {Layout, TextField} from "../components";
import {useLoginMutation} from "../hooks/mutations";
import {colors, fonts} from "../theme";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  disabled: boolean;
  error: {
    message: string;
  };
}

const LoginForm: FunctionalComponent<LoginFormProps> = ({
  onLogin,
  disabled,
  error,
}) => {
  const {
    getFieldDecorator,
    validateFields,
    values,
    errors,
    resetFields,
  } = useForm<LoginForm>();

  const handleSubmit = () => {
    validateFields()
      .then(() => {
        onLogin(values);
        resetFields();
      })
      .catch(e => {
        console.log("err", e);
      });
  };

  return (
    <View onPress={handleSubmit} style={styles.form}>
      {getFieldDecorator("email", {
        trigger: "onChangeText",
        rules: [
          {
            type: "email",
            message: "The input is not a valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ],
      })(
        <TextField
          label="E-mail"
          keyboardType="email-address"
          error={errors.email}
          value={values.email}
          textContentType="emailAddress"
        />,
      )}
      {getFieldDecorator("password", {
        trigger: "onChangeText",
        rules: [
          {
            required: true,
            message: "Please input your Password!",
          },
        ],
      })(
        <TextField
          label="Password"
          secureTextEntry
          error={errors.password}
          value={values.password}
          textContentType="password"
        />,
      )}
      {error && <Text style={styles.error}>{error.message}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={disabled}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login: FunctionalComponent<NavigationStackScreenProps> = props => {
  const [mutate, loading, error] = useLoginMutation();

  const loginWithCredentials = async ({email, password}: LoginForm) => {
    const {
      data: {login},
    } = await mutate(email, password);

    if (login) {
      props.navigation.navigate("Home");
    } else {
      alert("Ooops... something went wrong...");
    }
  };

  const loginWithFacebook = async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile"]);

    if (!result) {
      alert("An error occurred, please try again later");
    }

    if (result.isCancelled) {
      alert("Login was cancelled");
    } else {
      const accessToken = await AccessToken.getCurrentAccessToken();
      console.log("result", result, accessToken);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Layout justifyContent="space-between">
        <ScrollView centerContent>
          <View style={styles.loginContainer}>
            <LoginForm
              onLogin={loginWithCredentials}
              disabled={loading}
              error={error}
            />
            <Button title="Login with facebook" onPress={loginWithFacebook} />
            <Text style={styles.separator}>OR</Text>
            <Row>
              <Text style={styles.text}>Don't have an account?</Text>
              <Button
                title="Sign Up"
                color={colors.primary}
                onPress={() => props.navigation.navigate("SignUp")}
              />
            </Row>
          </View>
        </ScrollView>
        <Button
          title="Skip Login"
          color={colors.primary}
          onPress={() => props.navigation.navigate("Home")}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 20,
  },
  button: {
    alignItems: "center",
    padding: 12,
    marginVertical: 12,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.lightFontColor,
    textTransform: "uppercase",
  },
  separator: {
    color: colors.baseFontColor,
    alignSelf: "center",
    paddingVertical: 60,
    textTransform: "uppercase",
  },
  text: {
    color: colors.baseFontColor,
    fontSize: fonts.fontSizeH4,
  },
  error: {
    color: colors.danger,
    textAlign: "center",
    padding: 8,
  },
});

export default Login;
