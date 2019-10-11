import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { withApollo, WithApolloClient } from '@apollo/react-hoc';
import { ApolloQueryResult } from 'apollo-client';
import { NavigationStackProp } from 'react-navigation-stack';

import { QUERY_USER } from './graphql';
import { getToken, decodeToken } from '@services/authService';

interface ISplashScreenProps {
    navigation: NavigationStackProp;
}
type TProps = WithApolloClient<ISplashScreenProps>;

const SplashScreen: React.SFC<TProps> = ({ client, navigation }) => {
    const fetchUserInfo = async () => {
        let res: ApolloQueryResult<any>;
        try {
            const { userId } = decodeToken((await getToken('access_token'))!);
            res = await client.query({
                query: QUERY_USER,
                variables: { userId },
            });
            navigation.navigate('Main');
        } catch (e) {
            navigation.navigate('Login');
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);
    return (
        <View>
            <Text>asdasd</Text>
        </View>
    );
};

//@ts-ignore
SplashScreen.navigationOptions = {
    header: null,
};

export default withApollo<ISplashScreenProps>(SplashScreen);
