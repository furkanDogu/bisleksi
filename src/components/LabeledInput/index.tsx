import React from 'react';
import { Text, TextInput, View, TextInputProperties } from 'react-native';

import styles from './style';

interface ILabeledInputProps {
    width: string;
    bgColor: string;
    textColor: string;
    text: string;
    height: number;
    inputProps?: TextInputProperties;
}

export default ({ height, bgColor, textColor, width, text, inputProps }: ILabeledInputProps) => {
    const { component, container, label, textStyle, input } = styles;
    return (
        <View style={[component, { height }]}>
            <View style={container}>
                <View style={[label, { backgroundColor: bgColor }]}>
                    <Text style={[textStyle, { color: textColor }]}>{text}</Text>
                </View>
                <TextInput
                    {...inputProps}
                    style={[input, { width, backgroundColor: bgColor }]}></TextInput>
            </View>
        </View>
    );
};
