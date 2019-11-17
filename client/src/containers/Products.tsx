import React, {useEffect, useState} from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import styled from "styled-components";

import {Button, Spinner} from "../components";
import {useProductsQuery} from "../hooks/queries";

const Container = styled.View`
  width: 90%;
  background-color: #f6f6f6;
  padding: 2px;
  margin: 20px;
  height: 250px;
  flex: 1;
  flex-direction: row;
`;

const DetailsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
});

const renderItem = ({item, index}) => {
  return (
    <Container>
      <ImageBackground
        style={{width: 170, height: 250}}
        source={{uri: item.image}}>
        <DetailsContainer>
          <Text>INDEX: {index}</Text>
          <Text style={styles.title}>{item && item.name}</Text>
          <Text style={styles.text}>Size: {item && item.size}</Text>
          <Text style={styles.text}>Color: {item && item.color}</Text>
          <Text style={styles.text}>Price: {item && item.price}</Text>
          <Text style={styles.text}>
            Description: {item && item.description}
          </Text>
          <Button title="Buy" type="solid" style={{margin: 5}} />
        </DetailsContainer>
      </ImageBackground>
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
          if (!fetchMoreResult) { return prev; }
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
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  } else {
    console.error(error);
  }
};

export default ProductsList;
