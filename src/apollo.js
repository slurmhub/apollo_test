import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://8rqn1.sse.codesandbox.io/"
  })
});

function withApollo(app) {
  return () => <ApolloProvider client={client}>{app}</ApolloProvider>;
}

export default withApollo;
