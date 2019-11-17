import React from "react";
import styled from "styled-components";

import {colors, fonts} from "../theme";
import Text from "./Text";

export interface TextField {
  label: string;
  error: Array<{
    field: string;
    message: string;
  }>;
}

const TextField: React.FC<TextField> = ({label, error, ...props}) => {
  return (
    <Container>
      <Input
        placeholder={label}
        autoCapitalize={"none"}
        autoCorrect={false}
        {...props}
      />
      <Text danger>{error && error[0].message}</Text>
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  font-size: ${fonts.fontSizeH5};
  color: ${colors.baseFontColor};
  border-bottom-width: 1;
  border-bottom-color: ${colors.baseColorOpacity};
  height: 40px;
  width: 100%;
`;

export default TextField;
