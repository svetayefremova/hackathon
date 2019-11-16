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
import {NavigationStackScreenProps} from "react-navigation-stack";
import styled from "styled-components";

import {Layout, TextField} from "../components";
import {colors, fonts} from "../theme";

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm: FunctionalComponent = ({onLogin}) => {
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
        // console.log("err", e);
      });
  };

  return (
    <View onPress={handleSubmit} style={styles.form}>
      {getFieldDecorator("email", {
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
        />,
      )}
      {getFieldDecorator("password", {
        rules: [
          {
            required: true,
            message: "Please input your Password!",
          },
        ],
      })(
        <TextField label="Password" secureTextEntry error={errors.password} />,
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login: FunctionalComponent<NavigationStackScreenProps> = props => {
  const login = data => {
    // console.log("data", data);
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Layout justifyContent="space-between">
        <ScrollView centerContent>
          <View style={styles.loginContainer}>
            <LoginForm onLogin={login} />
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
});

export default Login;
