import React from "react";
import {ScrollView, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styled from "styled-components";
import createClient from "../createClient";

import {Container, Layout, Text} from "../components";
import {User} from "../graphql/types";
import {useLogoutMutation} from "../hooks/mutations";
import {useCurrentUserQuery} from "../hooks/queries";
import {colors, fonts} from "../theme";

const DrawerContent = props => {
  const mutate = useLogoutMutation();
  const {data} = useCurrentUserQuery();

  const logout = async () => {
    props.navigation.navigate("Welcome");
    await mutate();
    createClient.cache.reset();
  };

  const currentUser: User = data && data.currentUser;

  if (!currentUser) {
    return <View />;
  }

  return (
    <ScrollView>
      <Layout>
        <Wrapper>
          <Container padding={16}>
            <Text padding={0} style={{fontSize: fonts.fontSizeH4}}>
              {currentUser.name}
            </Text>
            <Text note padding={0} style={{fontSize: fonts.fontSizeH5}}>
              {currentUser.email}
            </Text>
          </Container>
          <Menu>
            <Link>
              <Text>My acccount</Text>
            </Link>
            <Link>
              <Text>My orders</Text>
            </Link>
            <Link>
              <Text>Return information</Text>
            </Link>
          </Menu>
          <Icon.Button
            name="logout"
            backgroundColor={"transparent"}
            color={colors.darkFontColor}
            underlayColor={"rgba(0,0,0,0.04)"}
            size={28}
            borderRadius={0}
            onPress={logout}>
            Log out
          </Icon.Button>
        </Wrapper>
      </Layout>
    </ScrollView>
  );
};

const Wrapper = styled.View`
  border-radius: 8px;
  border-width: 1px;
  border-color: ${colors.darkFontColor};
  margin: 8px;
  padding: 4px 0;
  flex: 1;
`;

const Menu = styled.View`
  padding-bottom: 16px;
`;

const Link = styled.TouchableOpacity`
  margin: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.baseColorOpacity};
`;

export default DrawerContent;
