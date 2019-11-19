import gql from "graphql-tag";

const fragments = {
  productDetails: gql`
    fragment ProductDetails on Product {
      id
      name
      price
      description
      color
      size
      image
      quantity
    }
  `,
  userDetails: gql`
    fragment UserDetails on User {
      id
      name
      email
    }
  `,
};

export default fragments;
