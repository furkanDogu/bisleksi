import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { getToken, setToken } from '@services/authService';
import env from './appConfig';

const headerSettingLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any;
            Promise.resolve(operation)
                .then(async operation => {
                    const access_token = await getToken('access_token');

                    if (access_token) {
                        operation.setContext({
                            headers: {
                                access_token,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        }),
);

const refreshTokenLink = (() =>
    onError(({ forward, graphQLErrors, networkError, operation }) => {
        if (graphQLErrors && graphQLErrors.some(err => err.message === 'Auth error')) {
            return new Observable(observer => {
                getToken('refresh_token')
                    .then(refresh_token => {
                        fetch(env.NEW_ACCESS_TOKEN_URL, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                refresh_token: refresh_token as string,
                            },
                        })
                            .then(res => res.json())
                            .then(res => {
                                setToken('access_token', res.access_token).then(() => {
                                    console.log('access_token refetched because it was invalid');
                                    operation.setContext(({ headers = {} }: any) => ({
                                        headers: {
                                            ...headers,
                                            access_token: res.access_token,
                                        },
                                    }));
                                    const subscriber = {
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete: observer.complete.bind(observer),
                                    };
                                    forward(operation).subscribe(subscriber);
                                });
                            })
                            .catch(e => observer.error(e));
                    })
                    .catch(e => observer.error(e));
            });
        }
    }))();

export default new ApolloClient({
    link: ApolloLink.from([
        headerSettingLink,
        refreshTokenLink,
        new HttpLink({
            uri: env.GRAPHQL_SERVER_URL,
            credentials: 'include',
        }),
    ]),
    cache: new InMemoryCache(),
});
