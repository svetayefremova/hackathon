import {useQuery} from "@apollo/react-hooks";

import {CURRENT_USER, USER_BY_ID, USERS} from "../graphql/queries";

export const useCurrentUserQuery = () => useQuery(CURRENT_USER);

export const useUserByIdQuery = id => useQuery(USER_BY_ID, {variables: {id}});

export const useUsersQuery = () =>
  useQuery(USERS, {
    variables: {first: 20, skip: 0},
  });
