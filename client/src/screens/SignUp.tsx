import useForm from "rc-form-hooks";
import React, {FunctionalComponent} from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {Layout, TextField} from "../components";
import {fonts} from "../theme";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FunctionalComponent = () => {
  const {getFieldDecorator, validateFields, getFieldValue, errors} = useForm<
    SignUpForm
  >();

  const handleSubmit = () => {
    validateFields()
      .then(() => {
        // TODO sign in/ navigate to home
      })
      .catch(e => {
        // console.log("err", e);
      });
  };

  const comparePassword = (_, value: string, callback: any) => {
    if (value && value !== getFieldValue("password")) {
      callback("Passwords do not match!");
    } else {
      callback();
    }
  };

  const validatePassword = (_, value: string, callback: any) => {
    if (value) {
      validateFields(["confirmPassword"], {force: true});
    }
    callback();
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Layout>
        <ScrollView centerContent>
          <View onPress={handleSubmit} style={styles.form}>
            {getFieldDecorator("username", {
              rules: [
                {
                  max: 24,
                  message: "The length should be less then 24 characters!",
                },
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ],
            })(<TextField label="Username" error={errors.username} />)}
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
                {
                  validator: validatePassword,
                },
              ],
            })(
              <TextField
                label="Password"
                secureTextEntry
                error={errors.password}
              />,
            )}
            {getFieldDecorator("confirmPassword", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your Password!",
                },
                {
                  validator: comparePassword,
                },
              ],
            })(
              <TextField
                label="Confirm Password"
                secureTextEntry
                error={errors.confirmPassword}
              />,
            )}
            <Button title="Register" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 20,
  },
});

export default SignUp;
