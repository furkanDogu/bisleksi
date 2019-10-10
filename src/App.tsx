import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import LoginScreenGQL from './screens/LoginScreen/graphql';
import NotificationProvider from '@components/Notification';
import apolloClient from './config/apolloConfig';

export default () => {
    return (
        <ApolloProvider client={apolloClient}>
            <NotificationProvider>
                <LoginScreenGQL />
            </NotificationProvider>
        </ApolloProvider>
    );
};
