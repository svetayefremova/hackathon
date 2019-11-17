import React from "react";
import styled from "styled-components";

export interface LayoutProps {
  justifyContent?: string;
  alignItems?: string;
}

const Layout: React.FC<LayoutProps> = ({
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <SafeAreContainer>
      <Wrapper style={[justifyContent, alignItems]}>{children}</Wrapper>
    </SafeAreContainer>
  );
};

const SafeAreContainer = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

export default Layout;
