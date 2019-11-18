import React from "react";
import styled from "styled-components";

import {colors, fonts} from "../theme";

export interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({username, ...props}) => {
  const initials = () => {
    const name = username.toUpperCase().split(" ");

    if (name.length > 1) {
      return `${name[0].charAt(0)}${name[1].charAt(0)}`;
    }

    return `${name[0].charAt(0)}${name[0].charAt(1)}`;
  }

  return (
    <AvatarContainer {...props}>
      <AvatarInitials>{initials()}</AvatarInitials>
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.View`
  border-width: 1;
  border-color: ${colors.primaryDark};
  width: 40;
  height: 40;
  border-radius: 20;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const AvatarInitials = styled.Text`
  color: ${colors.primaryDark};
  fontSize: ${fonts.fontSizeH5}
`;