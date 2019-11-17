import client from "apollo-boost";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Platform} from "react-native";

const apolloClient = new client({
  cache: new InMemoryCache(),
  uri: Platform.select({
    android: "http://10.0.2.2.xip.io:8080/graphql",
    ios: "http://localhost:8080/graphql",
  }),
});

export default apolloClient;
