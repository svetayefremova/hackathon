import gql from "graphql-tag";

import fragments from "./fragments";

export const SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const LOGIN_WITH_FACEBOOK = gql`
  mutation loginWithFacebook($input: AuthInput!) {
    loginWithFacebook(input: $input) {
      ...UserDetails
    }
  }
  ${fragments.userDetails}
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart($input: AddProductToCartInput!) {
    addProductToCart(input: $input) {
      ...ProductDetails
    }
  }
  ${fragments.productDetails}
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($input: RemoveItemFromCartInput!) {
    removeItemFromCart(input: $input)
  }
`;
