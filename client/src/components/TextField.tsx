import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

import {colors, fonts} from "../theme";

interface TextField {
  label: string;
  error: Array<{
    field: string;
    message: string;
  }>;
}

const TextField: React.FC<TextField> = ({label, error, ...props}) => {
  return (
    <View style={style.inputContainer}>
      <TextInput
        placeholder={label}
        autoCapitalize={"none"}
        autoCorrect={false}
        style={style.input}
        {...props}
      />
      <Text style={style.errorText}>{error && error[0].message}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  errorText: {
    paddingVertical: 4,
    color: colors.danger,
    fontSize: fonts.fontSizeH6,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: fonts.fontSizeH5,
    color: colors.baseColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.baseColorOpacity,
    height: 40,
    width: "100%",
  },
});

export default TextField;
