import React from "react";
import styled from "styled-components";

import {colors, fonts} from "../theme";

export interface CustomTextProps {
  danger?: boolean;
  title?: boolean;
  note?: boolean;
  large?: boolean;
  align?: string;
  light?: boolean;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  danger,
  title,
  note,
  large,
  light,
  align = "left",
  ...props
}) => {
  if (danger) {
    return (
      <Danger {...props} align={align}>
        {children}
      </Danger>
    );
  }

  if (title) {
    return (
      <Title {...props} align={align}>
        {children}
      </Title>
    );
  }

  if (note) {
    return (
      <Note {...props} align={align}>
        {children}
      </Note>
    );
  }

  if (large) {
    return (
      <Large {...props} align={align}>
        {children}
      </Large>
    );
  }

  if (light) {
    return (
      <Light {...props} align={align}>
        {children}
      </Light>
    );
  }

  return (
    <Paragraph {...props} align={align}>
      {children}
    </Paragraph>
  );
};

export default CustomText;

const Paragraph = styled.Text`
  color: ${colors.baseFontColor};
  text-align: ${props => props.align};
`;

const Danger = styled.Text`
  color: ${colors.danger};
  text-align: center;
  padding: 8px;
  text-align: ${props => props.align};
`;

const Title = styled.Text`
  color: ${colors.darkFontColor};
  text-align: center;
  padding: 8px;
  font-size: ${fonts.fontSizeH3};
  text-align: ${props => props.align};
`;

const Note = styled.Text`
  color: ${colors.baseFontColor};
  font-size: ${fonts.fontSizeH6};
  padding: 8px;
  text-align: ${props => props.align};
`;

const Large = styled.Text`
  color: ${colors.darkFontColor};
  font-size: ${fonts.fontSizeH2};
  padding: 8px;
  text-align: ${props => props.align};
`;

const Light = styled.Text`
  color: ${colors.lightFontColor};
  text-align: ${props => props.align};
`;
