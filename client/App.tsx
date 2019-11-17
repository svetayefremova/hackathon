import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import client from "./src/createClient";
import Navigator from "./src/navigator";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}

export default App;