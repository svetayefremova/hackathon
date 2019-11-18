import React from "react";
import styled from "styled-components";

export interface ContainerProps {
  center?: boolean;
  padding?: number;
  align?: string;
  direction?: string;
  justify?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  center,
  padding,
  direction = "column",
  align = "stretch",
  justify = "flex-start",
  ...props
}) => {
  if (center) {
    return (
      <Center style={[{padding, flexDirection: direction}]}>{children}</Center>
    );
  }
  return (
    <StyledContainer
      style={[{padding, flexDirection: direction}]}
      align={align}
      justify={justify}
      {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.View`
  flex: 1;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
`;
