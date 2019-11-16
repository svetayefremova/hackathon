import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import Products from "./src/components/Products";
import client from "./src/createClient";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Products />
      </ApolloProvider>
    );
  }
}

export default App;