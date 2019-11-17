import React from "react";
import styled from "styled-components";

import {colors, fonts} from "../theme";

export interface ButtonProps {
  title: string;
  uppercase?: boolean;
  reverse?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  reverse,
  uppercased,
  ...props
}) => {
  return (
    <ButtonContainer
      style={[{backgroundColor: reverse ? "transparent" : colors.primary}]}
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
  padding: 12px;
  margin: 12px 0;
`;

const ButtonText = styled.Text`
  text-transform: ${props => (props.uppercased ? "uppercase" : "none")};
  font-size: ${fonts.fontSizeH5};
`;

export default Button;
