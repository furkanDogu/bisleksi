import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '@screens/CategoriesScreen';
import LoginScreenGQL from '@screens/LoginScreen/graphql';
import SplashScreen from '@screens/SplashScreen';
import ReportsScreen from '@screens/ReportsScreen';
import SettingsScreen from '@screens/SettingsScreen';

// OUT OF APP STACKS
const LoginStack = createStackNavigator({ Login: LoginScreenGQL });
const SplashStack = createStackNavigator({ Splash: SplashScreen });

// IN APP STACKS
const MainStack = createStackNavigator({ Categories: CategoriesScreen });
const ReportsStack = createStackNavigator({ Report: ReportsScreen });
const SettingsStack = createStackNavigator({ Settings: SettingsScreen });

const TabNavigator = createBottomTabNavigator({
    Oyunlar: MainStack,
    Raporlar: ReportsStack,
    Ayarlar: SettingsStack,
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Tab: TabNavigator,
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
