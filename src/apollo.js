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
    uri: "https://trjps.sse.codesandbox.io/"
  })
});

function withApollo(app) {
  return () => <ApolloProvider client={client}>{app}</ApolloProvider>;
}

export default withApollo;
