import React from "react";
import styled from "styled-components";

import {colors} from "../theme";

export interface SpinnerProps {
  center?: boolean;
  padding?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  children,
  center,
  padding,
  ...props
}) => {
  return (
    <SpinnerContainer
      style={[{padding}]}
      center={center}
      color={colors.primaryDark}
      {...props}>
      {children}
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: ${props => (props.center ? "center" : "flex-start")};
`;
