import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { withApollo, WithApolloClient } from '@apollo/react-hoc';
import { ApolloQueryResult } from 'apollo-client';
import { NavigationStackProp } from 'react-navigation-stack';

import UserInfoProvider, { UserInfoContext } from '@components/UserInfo';

import style from './style';
import { QUERY_USER } from './graphql';
import { getToken, decodeToken } from '@services/authService';
import netInfo from '@utils/netInfo';
import { TUser } from '@appTypes/user';

interface ISplashScreenProps {
    navigation: NavigationStackProp;
}
type TProps = WithApolloClient<ISplashScreenProps>;

const SplashScreen = React.memo<TProps>(({ client, navigation }) => {
    const [isNetOn, setNetOn] = useState(true);
    const { container, imageContainer, lottieAnimation, image } = style;
    const { user, setUser } = useContext(UserInfoContext);

    const fetchNetInfo = async () => {
        const net = await netInfo();
        setNetOn(net);
        return net;
    };

    const fetchUserInfo = async () => {
        if (await fetchNetInfo()) {
            let res: ApolloQueryResult<any>;
            try {
                const { userId } = decodeToken((await getToken('access_token'))!);
                res = await client.query({
                    query: QUERY_USER,
                    variables: { userId },
                });
                setUser(res.data.user as TUser);
                setTimeout(() => navigation.navigate('Tab'), 0);
            } catch (e) {
                setTimeout(() => navigation.navigate('Login'), 0);
            }
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <View style={container}>
            {isNetOn ? (
                <View style={container}>
                    <View>
                        <LottieView
                            speed={1}
                            source={require('../../assets/loadingAnimation.json')}
                            autoPlay
                            style={lottieAnimation}
                            loop
                        />
                    </View>
                    <View style={imageContainer}>
                        <Image
                            style={image}
                            source={require('../../images/Bisleksi-Logo.png')}></Image>
                    </View>
                </View>
            ) : (
                <Text>Connect vole</Text>
            )}
        </View>
    );
});

//@ts-ignore
SplashScreen.navigationOptions = {
    header: null,
};

//@ts-ignore
SplashScreen.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
    customName: 'SplashScreen',
};

export default withApollo<ISplashScreenProps>(SplashScreen);
