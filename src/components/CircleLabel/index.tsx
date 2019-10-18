import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';

import style from './style';

interface ICircleLabelProps {
    text: string | number;
    disabled?: boolean;
    activeColor: string;
    defaultColor: string;
    onPress: (event: GestureResponderEvent) => void;
}

const CircleLabel: React.FC<ICircleLabelProps> = ({
    text,
    disabled,
    onPress,
    activeColor,
    defaultColor,
}) => {
    const content = (
        <View style={[style.container, { backgroundColor: disabled ? defaultColor : activeColor }]}>
            <Text>{text}</Text>
        </View>
    );

    return (
        <>
            {disabled ? (
                <>{content}</>
            ) : (
                <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
            )}
        </>
    );
};

export default CircleLabel;
