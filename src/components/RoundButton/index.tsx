import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
    View,
    RegisteredStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Spinner from 'react-native-spinkit';

import styles from './style';

type TRoundButtonProps = {
    bgColor: string;
    label: string;
    onPress?: () => any;
    viewStyle?: RegisteredStyle<ViewStyle>;
    textStyle?: RegisteredStyle<TextStyle>;
    buttonProps?: {
        [key in keyof TouchableOpacityProps]: any;
    };
    onPressAsync?: () => Promise<any>;
};

export default ({
    bgColor,
    label,
    textStyle,
    onPress,
    viewStyle,
    onPressAsync,
}: TRoundButtonProps) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const handleOnPress = async () => {
        if (onPressAsync) {
            setSubmitting(true);
            setTimeout(async () => {
                await onPressAsync();
                setSubmitting(false);
            }, 500);
        } else if (onPress) {
            onPress();
        }
    };
    return isSubmitting ? (
        <View>
            <Spinner type="ThreeBounce" color={bgColor} size={moderateScale(43)} />
        </View>
    ) : (
        <TouchableOpacity
            onPress={handleOnPress}
            style={[styles.container, { backgroundColor: bgColor }, viewStyle]}>
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
};
