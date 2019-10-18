import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import ListScreen from '@screens/ListScreen';
import LoginScreenGQL from '@screens/LoginScreen/graphql';
import SplashScreen from '@screens/SplashScreen';
import ReportsScreen from '@screens/ReportsScreen';
import SettingsScreen from '@screens/SettingsScreen';
import GameScreen from '@screens/GameScreen';

// OUT OF APP STACKS
const LoginStack = createStackNavigator({ Login: LoginScreenGQL });
const SplashStack = createStackNavigator({ Splash: SplashScreen });

// IN APP STACKS
const MainStack = createStackNavigator({ List: ListScreen });
const ReportsStack = createStackNavigator({ Report: ReportsScreen });
const SettingsStack = createStackNavigator({ Settings: SettingsScreen });
const GameStack = createStackNavigator({ AnyGame: GameScreen });

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
            Game: GameStack,
        },
        {
            initialRouteName: 'Splash',
            navigationOptions: {
                headerMode: 'none',
            },
        },
    ),
);
