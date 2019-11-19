import React from "react";
import styled from "styled-components";

import {colors, fonts} from "../theme";

export interface ButtonProps {
  title: string;
  uppercase?: boolean;
  reverse?: boolean;
  small?: boolean;
  isDisabledStyle?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  reverse,
  uppercased,
  small,
  isDisabledStyle,
  ...props
}) => {
  return (
    <ButtonContainer
      style={[
        {
          backgroundColor: reverse ? "transparent" : colors.primary,
          opacity: isDisabledStyle ? 0.5 : 1,
        },
      ]}
      small={small}
      {...props}>
      <ButtonText
        style={[{color: reverse ? colors.primary : colors.lightFontColor}]}
        uppercased={uppercased}>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  padding: ${props => (props.small ? "8px" : "16px")};
  margin: 12px 0;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  text-transform: ${props => (props.uppercased ? "uppercase" : "none")};
  font-size: ${fonts.fontSizeH5};
`;

export default Button;
