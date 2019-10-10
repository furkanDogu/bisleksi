import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

import { getToken } from './../services/authService';

export default new ApolloClient({
    link: new HttpLink({
        uri: 'http://10.0.2.2:4000',
        headers: {
            auth_token: 'asd',
        },
    }).concat(
        setContext((_, { headers }) => ({
            headers: {
                ...headers,
                auth_token: getToken(),
            },
        })),
    ),
    cache: new InMemoryCache(),
});
