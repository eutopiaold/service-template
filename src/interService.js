import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch'
import gql from 'graphql-tag'

class Service {
  constructor(url) {
    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            )
          if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        new HttpLink({
          uri: url,
          credentials: 'same-origin',
          fetch,
          headers: {
            auth: process.env.AUTH_PASSWORD
          }
        })
      ]),
      cache: new InMemoryCache()
    })
  }

  async query(query) {
    return await this.client.query({
      query: gql`${query}`
    })
  }

  async mutate(mutation) {
    return await this.client.mutate({
      mutation: gql`${mutation}`
    })
  }
}
