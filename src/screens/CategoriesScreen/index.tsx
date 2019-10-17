import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import colors from '@assets/colors';

const CategoriesScreen: React.SFC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        backgroundColor: colors.ORANGE,
                        borderRadius: 15,
                        margin: 2,
                        marginLeft: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 70,
                        paddingVertical: 10,
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                            textAlign: 'center',
                        }}>
                        Oyun Kategorileri
                    </Text>
                </View>
                <View
                    style={{
                        borderRadius: 15,
                        margin: 2,
                        marginRight: 5,
                    }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../images/eye_logo.png')}></Image>
                </View>
            </View>
            <ScrollView
                decelerationRate={1}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                snapToInterval={315}
                horizontal
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: colors.TURQUOISE,
                        marginLeft: 15,
                        marginRight: 15,
                        justifyContent: 'center',
                        borderRadius: 20,
                        alignItems: 'center',
                    }}>
                    <Image source={require('../../images/memory_category.jpg')}></Image>
                    <Text
                        style={{ marginTop: 20, fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                        Hafıza Oyunları
                    </Text>
                </View>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        marginRight: 15,
                        backgroundColor: 'yellow',
                    }}></View>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        marginRight: 15,
                        backgroundColor: 'blue',
                    }}></View>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        marginRight: 15,
                        backgroundColor: 'pink',
                    }}></View>
                <View
                    style={{
                        width: 300,
                        height: 300,
                        marginRight: 15,
                        backgroundColor: 'purple',
                    }}></View>
            </ScrollView>
        </View>
    );
};

//@ts-ignore
CategoriesScreen.navigationOptions = {
    header: null,
};

export default CategoriesScreen;
