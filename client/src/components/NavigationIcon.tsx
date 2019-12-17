import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {colors, fonts} from "../theme";

export interface NavigationIconProps {
  name: string;
}

const NavigationIcon: React.FC<NavigationIconProps> = ({name}) => (
  <Icon
    style={{paddingHorizontal: 16}}
    name={name}
    size={fonts.iconSizeMiddle}
    color={colors.primary}
  />
);

export default NavigationIcon;
