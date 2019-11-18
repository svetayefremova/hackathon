import React from "react";
import { View } from "react-native";

import {useCurrentUserQuery} from "../hooks/queries";
import {Avatar} from "../components";

const HeaderLeftButton: React.FC = props => {
  const {data} = useCurrentUserQuery();

  const currentUser = data && data.currentUser;

  if (currentUser) {
    return <Avatar username={currentUser.username} style={{marginHorizontal: 16}}/>
  }

  return (
    <View></View>
  );
};



export default HeaderLeftButton;