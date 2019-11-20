import {useQuery} from "@apollo/react-hooks";
import {getDeviceId} from "react-native-device-info";

import {
  CURRENT_CART,
  CURRENT_USER,
  PRODUCTS,
  USER_BY_ID,
  USERS,
} from "../graphql/queries";

export const useCurrentUserQuery = () => useQuery(CURRENT_USER);

export const useUserByIdQuery = id => useQuery(USER_BY_ID, {variables: {id}});

export const useUsersQuery = () =>
  useQuery(USERS, {
    variables: {limit: 10, offset: 0},
  });

export const useProductsQuery = () =>
  useQuery(PRODUCTS, {
    variables: {limit: 10, offset: 0},
  });

export const useCurrentCartQuery = () => useQuery(
  CURRENT_CART, 
  {
    variables: {deviceToken: getDeviceId()}
  }
);
