import React from "react";
import {ImageBackground, View} from "react-native";
import {getUniqueId} from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import {withNavigation} from "react-navigation";
import {NavigationStackScreenProps} from "react-navigation-stack";
import styled from "styled-components";

import {Button, Text} from "../components";
import {Product} from "../graphql/types";
import {useAddProductToCartMutation} from "../hooks/mutations";
import {colors} from "../theme";

export interface ProductItemProps {
  item: Product;
}

const ProductItem = ({
  item,
  ...props
}: ProductItemProps & NavigationStackScreenProps) => {
  const [mutate, loading, error] = useAddProductToCartMutation();

  const addToCart = async () => {
    const addProductToCartinput = {
      productId: item.id,
      quantity: item.quantity,
      deviceToken: getUniqueId(),
    };
    const {
      data: {addProductToCart},
    } = await mutate(addProductToCartinput);

    if (error) {
      alert(error.message);
    }

    if (addProductToCart) {
      props.navigation.navigate("Cart");
    }
  };

  const onNavigateToProduct = () => {
    props.navigation.navigate("Product", {id: item.id});
  };

  return (
    <ProductContainer onPress={onNavigateToProduct}>
      <ImageBackground
        style={{width: "100%", height: 258}}
        imageStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
        source={{uri: item.image}}>
        <LinearGradient
          colors={["transparent", colors.darkFontColor]}
          style={{flex: 1, zIndex: 1}}
          locations={[0.6, 1]}>
          <TitleContainer>
            <Text title light>
              {item && item.name}
            </Text>
          </TitleContainer>
        </LinearGradient>
      </ImageBackground>
      <Text note numberOfLines={4}>
        Description: {item && item.description}
      </Text>
      <DetailsContainer>
        <View>
          <Text padding={0}>Size: {item && item.size}</Text>
          <Text padding={0}>Color: {item && item.color}</Text>
          <Text padding={0}>Price: {item && item.price}</Text>
          <Text padding={0}>Quantity: {item && item.quantity}</Text>
        </View>
        <Button
          title="Buy"
          small
          onPress={addToCart}
          isDisabledStyle={item && !item.quantity}
          disabled={loading || (item && !item.quantity)}
        />
      </DetailsContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.TouchableOpacity`
  background-color: ${colors.background};
  margin: 8px;
  flex: 1;
  height: 400;
  border-radius: 8px;
  justify-content: space-between;
`;

const DetailsContainer = styled.View`
  flex: 1;
  padding: 8px;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4px;
`;

export default withNavigation(ProductItem);
