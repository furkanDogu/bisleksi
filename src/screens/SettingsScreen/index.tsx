import React from 'react';
import { Text, View } from 'react-native';

const SettingsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Screen</Text>
    </View>
);

//@ts-ignore
SettingsScreen.navigationOptions = {
    header: null,
};

export default SettingsScreen;
