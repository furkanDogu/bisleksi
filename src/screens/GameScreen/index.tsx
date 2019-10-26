import React from 'react';
import { View, Text } from 'react-native';
import { withApollo, WithApolloClient } from '@apollo/react-hoc';
import { NavigationStackProp } from 'react-navigation-stack';

import gameDefinitions from './definitions';

interface IGameScreenProps {
    navigation: NavigationStackProp;
}

const GameScreen: React.SFC<WithApolloClient<IGameScreenProps>> = ({ navigation, client }) => {
    const Game = gameDefinitions[navigation.getParam('navigationTag')];

    return (
        <View style={{ flex: 1 }}>
            <Game level={navigation.getParam('level')} navigation={navigation} client={client} />
        </View>
    );
};

// type TProps = WithApolloClient<IColorfulCircleProps>;

//@ts-ignore
GameScreen.navigationOptions = {
    header: null,
};

//@ts-ignore
GameScreen.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default withApollo<IGameScreenProps>(GameScreen);
