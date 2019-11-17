import useForm from "rc-form-hooks";
import React, {FunctionalComponent, useState} from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {Layout, TextField} from "../components";
import {SignUpInput, useSignUpMutation} from "../hooks/mutations";
import {colors} from "../theme";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  onSubmit: (SignUpForm) => void;
  disabled: boolean;
  error: {
    message: string;
  };
}

const SignUpForm: FunctionalComponent<SignUpFormProps> = ({
  onSubmit,
  disabled,
  error,
}) => {
  const [state, setState] = useState({
    confirmDirty: false,
  });
  const {
    getFieldDecorator,
    validateFields,
    getFieldValue,
    resetFields,
    values,
    errors,
  } = useForm<SignUpForm>();

  const handleSubmit = () => {
    validateFields()
      .then(() => {
        onSubmit({
          email: values.email,
          password: values.password,
          username: values.username,
        });
        resetFields();
      })
      .catch(e => {
        console.log("err", e);
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
    if (value && state.confirmDirty) {
      validateFields(["confirmPassword"], {force: true});
    }
    callback();
  };

  const handleConfirmBlur = (e: any) => {
    const {value} = e.target;
    setState({...state, confirmDirty: state.confirmDirty || !!value});
  };

  return (
    <View onPress={handleSubmit} style={styles.form}>
      {getFieldDecorator("username", {
        trigger: "onChangeText",
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
        />,
      )}
      {getFieldDecorator("password", {
        trigger: "onChangeText",
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
        <TextField label="Password" secureTextEntry error={errors.password} />,
      )}
      {getFieldDecorator("confirmPassword", {
        trigger: "onChangeText",
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
          onBlur={handleConfirmBlur}
        />,
      )}
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Button title="Register" onPress={handleSubmit} disabled={disabled} />
    </View>
  );
};

const SignUp: FunctionalComponent = props => {
  const [mutate, loading, error] = useSignUpMutation();

  const onSubmit = async (input: SignUpInput) => {
    const {
      data: {signup},
    } = await mutate(input);
    if (signup) {
      props.navigation.navigate("Home");
    } else {
      alert("Ooops... something went wrong...");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Layout>
        <ScrollView centerContent>
          <SignUpForm onSubmit={onSubmit} disabled={loading} error={error} />
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
  error: {
    color: colors.danger,
    textAlign: "center",
    padding: 8,
  },
});

export default SignUp;
