import React from 'react';
import { View, Text, ViewStyle, RegisteredStyle, TextStyle } from 'react-native';

import style from './style';

interface ITimeStatusProps {
    value: number | string | undefined;
    containerStyle?: RegisteredStyle<ViewStyle> | ViewStyle;
    textStyle?: RegisteredStyle<TextStyle> | TextStyle;
}

const TimeStatus: React.FC<ITimeStatusProps> = ({ value, containerStyle, textStyle }) => {
    return (
        <View style={containerStyle}>
            {value !== undefined && <Text style={[style.text, textStyle]}>{value}</Text>}
        </View>
    );
};

export default React.memo(TimeStatus);
