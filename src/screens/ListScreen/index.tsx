import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

import Card from '@components/Card';
import { UserInfoContext } from '@components/UserInfo/index';

import style from './style';
import { categoryDefinitions, gameDefinitions } from './definitions';
import { gameIds, gameNames } from '@utils/constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CircleLabel from '@components/CircleLabel';
import colors from '@assets/colors';

interface IListScreenProps {
    navigation: NavigationStackProp;
}

const ListScreen: React.SFC<IListScreenProps> = ({ navigation }) => {
    const {
        container,
        header,
        headerTag,
        imageContainer,
        headerTagContainer,
        image,
        backButton,
    } = style;
    const navigationTag: string | undefined = navigation.getParam('navigationTag');
    const items = navigationTag ? gameDefinitions[navigationTag] : categoryDefinitions;
    const isShowingGames = items[0] && gameNames[items[0]['navigationTag']];
    const navigateTo = navigationTag ? 'AnyGame' : 'List';
    const { user } = React.useContext(UserInfoContext);

    const renderLevels = (gameTag: string) => {
        if (user) {
            const game = user.gameInfo.find(game => game.gameId === gameIds[gameTag]);
            return (
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                        <CircleLabel
                            disabled={game!.scores.length < level}
                            activeColor={colors.ORANGE}
                            defaultColor="grey"
                            text={level}
                            onPress={() =>
                                navigation.navigate('AnyGame', {
                                    navigationTag: gameTag,
                                    level,
                                })
                            }></CircleLabel>
                    ))}
                </View>
            );
        }
    };

    return (
        <View style={container}>
            <View style={header}>
                {isShowingGames && (
                    <TouchableOpacity style={backButton} onPress={() => navigation.replace('List')}>
                        <Icon name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                )}
                <View style={headerTagContainer}>
                    <Text style={headerTag}>Oyun Kategorileri</Text>
                </View>
                <View style={imageContainer}>
                    <Image style={image} source={require('../../images/eye_logo.png')}></Image>
                </View>
            </View>
            <ScrollView
                decelerationRate={1}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                snapToInterval={scale(268.1)}
                horizontal
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                keyboardShouldPersistTaps="always">
                {items.map((item, i) => (
                    <Card
                        key={i}
                        bgColor={item.bgColor}
                        imagePath={item.imagePath}
                        text={item.text}
                        viewStyle={item.viewStyle}
                        onPress={
                            isShowingGames
                                ? undefined
                                : () =>
                                      navigation.navigate(navigateTo, {
                                          navigationTag: item.navigationTag,
                                      })
                        }>
                        {isShowingGames && renderLevels(item.navigationTag)}
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

//@ts-ignore
ListScreen.navigationOptions = {
    header: null,
};

export default ListScreen;
