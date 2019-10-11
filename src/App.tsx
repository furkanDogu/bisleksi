import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import NotificationProvider from '@components/Notification';
import Router from './Router';

import apolloClient from './config/apolloConfig';

export default () => {
    return (
        <ApolloProvider client={apolloClient}>
            <NotificationProvider>
                <Router />
            </NotificationProvider>
        </ApolloProvider>
    );
};
