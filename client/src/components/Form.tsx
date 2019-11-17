import React from "react";
import styled from "styled-components";

export interface FormProps {}

const Form: React.FC<FormProps> = ({children, ...props}) => {
  return <FormContainer {...props}>{children}</FormContainer>;
};

export default Form;

const FormContainer = styled.View`
  flex: 1;
  padding: 20px;
`;
