import React from "react";
import styled from "styled-components";

const Form: React.FC = ({children, ...props}) => {
  return <FormContainer {...props}>{children}</FormContainer>;
};

export default Form;

const FormContainer = styled.View`
  flex: 1;
  padding: 20px;
`;
