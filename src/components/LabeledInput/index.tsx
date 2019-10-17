import React from 'react';
import {
    Text,
    TextInput,
    View,
    TextInputProperties,
    ViewStyle,
    RegisteredStyle,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import styles from './style';

interface ILabeledInputProps {
    bgColor: string;
    textColor: string;
    text: string;
    height: number;
    inputProps?: TextInputProperties;
    viewStyle?: RegisteredStyle<ViewStyle>[] | RegisteredStyle<ViewStyle>;
    customInput?: React.FunctionComponent;
}

export default ({
    height,
    bgColor,
    textColor,
    text,
    inputProps,
    viewStyle,
    customInput: CustomInput,
}: ILabeledInputProps) => {
    const { component, container, label, textStyle, input } = styles;
    const inputElement = React.createRef<TextInput>();

    const onLabelClicked = () => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    };

    return (
        <View style={[component, { height }, viewStyle]}>
            <View style={container}>
                <View style={[label, { backgroundColor: bgColor, flex: 1 }]}>
                    <TouchableWithoutFeedback onPress={onLabelClicked}>
                        <Text style={[textStyle, { color: textColor }]}>{text}</Text>
                    </TouchableWithoutFeedback>
                </View>
                {CustomInput ? (
                    <CustomInput />
                ) : (
                    <TextInput
                        ref={inputElement}
                        {...inputProps}
                        style={[input, { backgroundColor: bgColor, flex: 4 }]}
                    />
                )}
            </View>
        </View>
    );
};
