import React, { useState } from 'react';
import { View, Text } from 'react-native';

const MainScreen: React.SFC = () => {
    const [data, setData] = useState('');
    return (
        <View>
            <Text>Main Screen</Text>
            <Text>{data}</Text>
        </View>
    );
};

//@ts-ignore
MainScreen.navigationOptions = {
    header: null,
};

export default MainScreen;
