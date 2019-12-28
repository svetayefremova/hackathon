import React from "react";
import {View} from "react-native";

import {Spinner, Text} from "../components";
import {Product} from "../graphql/types";
import {useProductByIdQuery} from "../hooks/queries";

export interface ProductFullDescriptionProps {
  productId: string;
}

const ProductFullDescription: React.FC<ProductFullDescriptionProps> = ({
  productId,
}) => {
  const {data, loading, error} = useProductByIdQuery(productId);

  if (loading) {
    return <Spinner center />;
  }

  if (error) {
    return (
      <Text danger align="center">
        {error.message}
      </Text>
    );
  }

  const product: Product = data && data.productById;

  if (product) {
    return (
      <>
        <Text title align="center">
          {product.name}
        </Text>
        <View style={{padding: 20}}>
          <Text padding={0}>Size: {product.size}</Text>
          <Text padding={0}>Color: {product.color}</Text>
          <Text padding={0}>Price: {product.price}</Text>
          <Text padding={0}>Quantity: {product.quantity}</Text>
        </View>
      </>
    );
  }
};

export default ProductFullDescription;
