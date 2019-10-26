/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, ViewStyle, RegisteredStyle } from 'react-native';
import Modal from 'react-native-modal';

import RoundButton from '@components/RoundButton';

import { useCountdown } from '@hooks/';
import colors from '@assets/colors';
import style from './style';

interface IGameNotifierProps {
    isVisible: boolean;
    visibilityDuration?: number;
    onComplete?: () => any;
    header: string;
    buttons: {
        label: string;
        onPress: () => void;
        bgColor: string;
    }[];
    content: JSX.Element;
}

const GameNotifier: React.FC<IGameNotifierProps> = ({
    isVisible,
    visibilityDuration,
    onComplete,
    header,
    buttons,
    content,
}) => {
    const { container, innerContainer, buttonText, buttonView, headerStyle, timeStyle } = style;
    const [isOpen, setOpen] = useState(false);
    const [time, startTimer] = useCountdown(visibilityDuration || 1);

    useEffect(() => {
        if (isVisible && visibilityDuration) {
            setOpen(true);
            startTimer();
        } else {
            setOpen(isVisible);
        }
    }, [isVisible]);

    useEffect(() => {
        if (time === 0) {
            onComplete && onComplete();
        }
    }, [time]);

    return (
        <Modal backdropOpacity={0.98} backdropColor="white" isVisible={isOpen}>
            <View style={container}>
                <View style={innerContainer}>
                    <Text style={headerStyle}>{header}</Text>
                    {visibilityDuration && <Text style={timeStyle}>{time}</Text>}
                    {content}
                    <View>
                        {buttons.map(({ bgColor, onPress, label }, index) => (
                            <RoundButton
                                key={index}
                                {...{
                                    bgColor,
                                    onPress,
                                    label,
                                    viewStyle: buttonView,
                                    textStyle: buttonText,
                                }}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

//@ts-ignore
GameNotifier.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default React.memo(GameNotifier);
