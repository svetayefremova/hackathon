import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text} from "react-native";
import {Button} from "react-native";
import styled from "styled-components";

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

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;

const renderItem = ({item}) => {
  return (
    <Container>
      <Image style={{width: 170, height: 250}} source={{uri: item.image}} />
      <DetailsContainer>
        <Text style={styles.title}>{item && item.name}</Text>
        <Text style={styles.text}>Size: {item && item.size}</Text>
        <Text style={styles.text}>Color: {item && item.color}</Text>
        <Text style={styles.text}>Price: {item && item.price}</Text>
        <Text style={styles.text}>Description: {item && item.description}</Text>
        <Button title="Buy" type="solid" style={{margin: 5}} />
      </DetailsContainer>
    </Container>
  );
};

const keyExtractor = item => item.id;

const ProductsList = () => {
  const {loading, error, data} = useQuery(GET_PRODUCTS);
  const {products} = data || {};
  if (loading) {
    return <Text> Loading... </Text>;
  }
  if (data && data.products) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    );
  } else {
    // console.error(error);
  }
};

export default ProductsList;
