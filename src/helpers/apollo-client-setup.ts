import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const CREDENTIALS = {
  aws_appsync_graphqlEndpoint:
    'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
  aws_appsync_region: 'ap-southeast-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-6y6arb7mwvgrnmds2jignrgr2u',
};

const httpLink = new HttpLink({
  uri: CREDENTIALS.aws_appsync_graphqlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-api-key': CREDENTIALS.aws_appsync_apiKey,
    },
  };
});

// Initialize Apollo Client
export const apolloClientInstance = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
