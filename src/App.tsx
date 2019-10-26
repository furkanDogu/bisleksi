import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import NotificationProvider from '@components/Notification';
import Router from './Router';

import apolloClient from './config/apolloConfig';
import UserInfoProvider from '@components/UserInfo';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        onlyLogs: true,
        titleColor: 'green',
        diffNameColor: 'darkturquoise',
        collapseGroups: true,
    });
}

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
