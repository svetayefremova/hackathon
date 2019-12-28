import client from "apollo-boost";
import {Platform} from "react-native";

const apolloClient = new client({
  uri: Platform.select({
    android: "http://10.0.2.2.xip.io:8080/graphql",
    ios: "http://192.168.31.30:8080/graphql",
    // ios: "http://localhost:8080/graphql",
  }),
});

export default apolloClient;
