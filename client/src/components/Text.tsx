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
  padding?: number;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  danger,
  title,
  note,
  large,
  light,
  align = "left",
  padding = 8,
  ...props
}) => {
  if (danger) {
    return (
      <Danger align={align} padding={`${padding}px`} {...props}>
        {children}
      </Danger>
    );
  }

  if (title) {
    return (
      <Title align={align} light={light} padding={`${padding}px`} {...props}>
        {children}
      </Title>
    );
  }

  if (note) {
    return (
      <Note align={align} light={light} padding={`${padding}px`} {...props}>
        {children}
      </Note>
    );
  }

  if (large) {
    return (
      <Large align={align} light={light} padding={`${padding}px`} {...props}>
        {children}
      </Large>
    );
  }

  return (
    <Paragraph align={align} light={light} padding={`${padding}px`} {...props}>
      {children}
    </Paragraph>
  );
};

export default CustomText;

const Paragraph = styled.Text`
  color: ${props =>
    props.light ? colors.lightFontColor : colors.baseFontColor};
  text-align: ${props => props.align};
  padding: ${props => props.padding};
`;

const Danger = styled.Text`
  color: ${colors.danger};
  text-align: center;
  text-align: ${props => props.align};
  padding: ${props => props.padding};
`;

const Title = styled.Text`
  color: ${props =>
    props.light ? colors.lightFontColor : colors.darkFontColor};
  text-align: center;
  font-size: ${fonts.fontSizeH3};
  text-align: ${props => props.align};
  padding: ${props => props.padding};
`;

const Note = styled.Text`
  color: ${props =>
    props.light ? colors.lightFontColor : colors.baseFontColor};
  font-size: ${fonts.fontSizeH6};
  text-align: ${props => props.align};
  padding: ${props => props.padding};
`;

const Large = styled.Text`
  color: ${props =>
    props.light ? colors.lightFontColor : colors.baseFontColor};
  font-size: ${fonts.fontSizeH2};
  text-align: ${props => props.align};
  padding: ${props => props.padding};
`;
