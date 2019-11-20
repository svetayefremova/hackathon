import gql from "graphql-tag";

import fragments from "./fragments";

export const CURRENT_USER = gql`
  query {
    currentUser {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const USERS = gql`
  query users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const PRODUCTS = gql`
  query products($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      ...ProductDetails
    }
  }
  ${fragments.productDetails}
`;

export const CURRENT_CART = gql`
  query currentCart {
    currentCart {
      id
      state
      user {
        ...UserDetails
      }
      items {
        id
        quantity
        product {
          ...ProductDetails
        }
        addedAt
      }
    }
  }
  ${fragments.userDetails}
  ${fragments.productDetails}
`;
