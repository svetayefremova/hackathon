import React from "react";
import {FlatList, ImageBackground, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

import {Button, Layout, Spinner, Text} from "../components";
import {Product} from "../graphql/types";
import {useProductsQuery} from "../hooks/queries";
import {colors} from "../theme";

export interface ProductItemProps {
  item: Product;
  onBuy: (id: string) => void;
}

export interface ProductListProps {
  onBuy: (id: string) => void;
}

const ProductItem = ({item, onBuy}: ProductItemProps) => (
  <Container>
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
      </View>
      <Button title="Buy" small onPress={() => onBuy(item.id)} />
    </DetailsContainer>
  </Container>
);

const ProductsList = ({onBuy}: ProductListProps) => {
  const {loading, error, data, fetchMore} = useProductsQuery();

  const keyExtractor = item => item.id;

  const loadMoreItems = () => {
    if (data && data.products.length) {
      fetchMore({
        variables: {
          offset: data.products.length,
        },
        updateQuery: (prev: any, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign({}, prev, {
            products: [...prev.products, ...fetchMoreResult.products],
          });
        },
      });
    }
  };

  const renderItem = ({item}: {item: Product}) => {
    return <ProductItem item={item} onBuy={onBuy} />;
  };

  if (loading) {
    return <Spinner center />;
  }

  const products: [Product] = data && data.products;

  if (products) {
    return (
      <Layout>
        <FlatList
          extraData={products}
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.9}
          onEndReached={loadMoreItems}
          initialNumToRender={10}
          numColumns={2}
        />
      </Layout>
    );
  } else {
    console.error(error);
  }
};

const Container = styled.TouchableOpacity`
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

export default ProductsList;
