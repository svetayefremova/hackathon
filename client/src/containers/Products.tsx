import React from "react";
import {FlatList, ImageBackground, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

import {Button, Layout, Spinner, Text} from "../components";
import {useProductsQuery} from "../hooks/queries";
import {colors} from "../theme";

const renderItem = ({item}) => {
  return (
    <Container>
      <ImageBackground
        style={{width: "100%", height: 258}}
        source={{uri: item.image}}>
        <LinearGradient
          colors={["transparent", colors.darkFontColor]}
          style={{flex: 1}}
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
        <Button title="Buy" small />
      </DetailsContainer>
    </Container>
  );
};

const keyExtractor = item => item.id;

const ProductsList = () => {
  const {loading, error, data, fetchMore} = useProductsQuery();

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

  if (loading) {
    return <Spinner center />;
  }
  const products = data && data.products;

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

const Container = styled.View`
  background-color: #f6f6f6;
  padding: 2px;
  margin: 8px;
  flex: 1;
  height: 400;
  border-radius: 8px;
  justify-content: space-between;
`;

const DetailsContainer = styled.View`
  flex: 1;
  padding: 8px;
  align-items: center;
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
