import {useMutation} from "@apollo/react-hooks";

import {LOGIN, LOGIN_WITH_FACEBOOK, LOGOUT, SIGNUP} from "../graphql/mutations";
import {CURRENT_USER} from "../graphql/queries";

export interface SignUpInput {
  username: string;
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
        variables: {input: {email, password}},
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
        variables: {input: {accessToken}},
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
