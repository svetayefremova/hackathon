import useForm from "rc-form-hooks";
import React from "react";

import {Button, Form, Text, TextField} from "../components";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  disabled: boolean;
  error: {
    message: string;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin, disabled, error}) => {
  const {
    getFieldDecorator,
    validateFields,
    values,
    errors,
    resetFields,
  } = useForm<LoginInput>();

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
    <Form onPress={handleSubmit}>
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
      {error && <Text danger>{error.message}</Text>}
      <Button
        title="Login"
        onPress={handleSubmit}
        disabled={disabled}
        uppercased
      />
    </Form>
  );
};

export default LoginForm;
