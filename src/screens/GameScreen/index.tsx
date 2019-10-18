import React from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import gameDefinitions from './definitions';

interface IGameScreenProps {
    navigation: NavigationStackProp;
}

const GameScreen: React.SFC<IGameScreenProps> = ({ navigation }) => {
    const Game = gameDefinitions[navigation.getParam('navigationTag')];

    return (
        <View style={{ flex: 1 }}>
            <Game level={navigation.getParam('level')} />
        </View>
    );
};

//@ts-ignore
GameScreen.navigationOptions = {
    header: null,
};

export default GameScreen;
