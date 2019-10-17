import React from 'react';
import { Text, View } from 'react-native';

const ReportsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Report Screen</Text>
    </View>
);

//@ts-ignore
ReportsScreen.navigationOptions = {
    header: null,
};

export default ReportsScreen;
