import {useMutation} from "@apollo/react-hooks";
import {getUniqueId} from "react-native-device-info";

import {
  ADD_PRODUCT_TO_CART,
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LOGOUT,
  REMOVE_ITEM_FROM_CART,
  SIGNUP,
} from "../graphql/mutations";
import {CURRENT_CART, CURRENT_USER} from "../graphql/queries";
import {
  AddProductToCartInput,
  Cart,
  RemoveItemFromCartInput,
} from "../graphql/types";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export const useSignUpMutation = () => {
  const [signupMutate, {loading, error}] = useMutation(SIGNUP, {
    update(cache, {data: {signup}}) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: {currentUser: signup},
      });
    },
  });

  const singupError = error && error.graphQLErrors[0];

  const mutation: any = [
    (input: SignUpInput) =>
      signupMutate({
        variables: {input},
      }),
    loading,
    singupError,
  ];

  return mutation;
};

export const useLoginMutation = () => {
  const [loginMutate, {loading, error}] = useMutation(LOGIN, {
    update(cache, {data: {login}}) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: {currentUser: login},
      });
    },
  });

  const loginError = error && error.graphQLErrors[0];

  const mutation: any = [
    (email: string, password: string) =>
      loginMutate({
        variables: {input: {email, password, deviceToken: getUniqueId()}},
      }),
    loading,
    loginError,
  ];

  return mutation;
};

export const useLoginWithFacebookMutation = () => {
  const [loginMutate, {loading, error}] = useMutation(LOGIN_WITH_FACEBOOK, {
    update(cache, {data: {loginWithFacebook}}) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: {currentUser: loginWithFacebook},
      });
    },
  });

  const loginError = error && error.graphQLErrors[0];

  const mutation: any = [
    (accessToken: string) =>
      loginMutate({
        variables: {input: {accessToken, deviceToken: getUniqueId()}},
      }),
    loading,
    loginError,
  ];

  return mutation;
};

export const useLogoutMutation = () => {
  const [logoutMutate] = useMutation(LOGOUT, {
    update(cache) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: {currentUser: null},
      });
    },
  });

  return () => logoutMutate();
};

export const useAddProductToCartMutation = () => {
  const [mutate, {loading, error}] = useMutation(ADD_PRODUCT_TO_CART, {
    refetchQueries: [
      {
        query: CURRENT_CART,
        variables: {
          deviceToken: getUniqueId(),
        },
      },
    ],
  });

  const mutation: any = [
    (input: AddProductToCartInput) =>
      mutate({
        variables: {input},
      }),
    loading,
    error,
  ];

  return mutation;
};

export const useRemoveItemFromCartMutation = () => {
  const [mutate, {loading, error}] = useMutation(REMOVE_ITEM_FROM_CART, {
    update: (store, {data: {removeItemFromCart}}) => {
      const data: any = store.readQuery({
        query: CURRENT_CART,
        variables: {
          deviceToken: getUniqueId(),
        },
      });
      const updatedCartWithItems: Cart = {
        ...data.currentCart,
        items: data.currentCart.items.filter(
          item => item.id !== removeItemFromCart,
        ),
      };
      store.writeQuery({
        query: CURRENT_CART,
        data: {currentCart: updatedCartWithItems},
      });
    },
  });

  const mutation: any = [
    (input: RemoveItemFromCartInput) =>
      mutate({
        variables: {input},
      }),
    loading,
    error,
  ];

  return mutation;
};
