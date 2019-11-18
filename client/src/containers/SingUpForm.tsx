import useForm from "rc-form-hooks";
import React, {useState} from "react";

import {Button, Form, Text, TextField} from "../components";

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormProps {
  onSubmit: (SignUpForm) => void;
  disabled: boolean;
  error: {
    message: string;
  };
}

const SignUpForm: React.FC<SignUpFormProps> = ({onSubmit, disabled, error}) => {
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
  } = useForm<SignUpInput>();

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
    <Form onPress={handleSubmit}>
      {getFieldDecorator("username", {
        trigger: "onChangeText",
        rules: [
          {
            max: 28,
            message: "The length should be less then 28 characters!",
          },
          {
            pattern: /^[a-z0-9_-]{3,28}$/,
            message: "Please enter a valid username!",
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
            pattern: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
            message: "Please enter a valid password!",
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
      {error && <Text danger>{error.message}</Text>}
      <Button
        title="Register"
        onPress={handleSubmit}
        disabled={disabled}
        uppercased
      />
    </Form>
  );
};

export default SignUpForm;
