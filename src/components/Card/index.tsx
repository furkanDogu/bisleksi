import React from 'react';
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    ViewStyle,
    RegisteredStyle,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native';

import style from './style';

interface ICardProps {
    bgColor: string;
    imagePath: ImageSourcePropType;
    text: string;
    viewStyle?: RegisteredStyle<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.SFC<ICardProps> = ({
    bgColor,
    imagePath,
    text,
    viewStyle,
    onPress,
    children,
}) => {
    const { container, textStyle } = style;
    const content = (
        <View style={[container, { backgroundColor: bgColor }, viewStyle]}>
            <Text style={textStyle}>{text}</Text>
            <Image source={imagePath}></Image>
            {children && children}
        </View>
    );

    return (
        <>
            {onPress ? (
                <TouchableWithoutFeedback onPress={onPress}>{content}</TouchableWithoutFeedback>
            ) : (
                <>{content}</>
            )}
        </>
    );
};

//@ts-ignore
Card.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default Card;
