import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from '@screens/MainScreen';
import LoginScreenGQL from '@screens/LoginScreen/graphql';
import SplashScreen from '@screens/SplashScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const MainStack = createStackNavigator({ Main: MainScreen });
const LoginStack = createStackNavigator({ Login: LoginScreenGQL });
const SplashStack = createStackNavigator({ Splash: SplashScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            Main: MainStack,
            Login: LoginStack,
            Splash: SplashStack,
        },
        {
            initialRouteName: 'Splash',
            navigationOptions: {
                headerMode: 'none',
            },
        },
    ),
);
