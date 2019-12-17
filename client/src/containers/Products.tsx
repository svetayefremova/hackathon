import React from "react";
import {FlatList} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout, Spinner} from "../components";
import {ProductItem} from "../containers";
import {Product} from "../graphql/types";
import {useProductsQuery} from "../hooks/queries";

const ProductsList = props => {
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
    return <ProductItem item={item} />;
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

export default ProductsList;
