import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import NotificationProvider from '@components/Notification';
import Router from './Router';

import apolloClient from './config/apolloConfig';
import UserInfoProvider from '@components/UserInfo';

export default () => {
    return (
        <ApolloProvider client={apolloClient}>
            <UserInfoProvider>
                <NotificationProvider>
                    <Router />
                </NotificationProvider>
            </UserInfoProvider>
        </ApolloProvider>
    );
};
