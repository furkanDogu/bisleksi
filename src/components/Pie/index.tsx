import React, { useEffect, useCallback, useRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { G, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import _random from 'lodash/random';

import Slice from './Slice';

import style from './style';

const { Value, timing, concat, cond, startClock, clockRunning, block, Clock } = Animated;

interface IPieProps {
    colors: any[];
    size: number;
    onPress?: (id: number) => void;
    answer?: any;
    id?: number;
    shouldShowStatus?: boolean;
    isClickable: boolean;
    turn: [boolean, boolean];
}

const runTiming = (clock: any, value: number, dest: number) => {
    const state = {
        finished: new Value(0),
        position: new Value(value),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 8 * 1000,
        toValue: new Value(dest),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        timing(clock, state, config),
        cond(clockRunning(clock), 0, [startClock(clock)]),
        state.position,
    ]);
};

const Pie: React.FC<IPieProps> = ({
    colors,
    size,
    id,
    onPress,
    shouldShowStatus,
    answer,
    isClickable,
    turn,
}) => {
    const data = colors.map(color => ({ color, number: 1 }));

    const renderIconProps = () => {
        return answer === id ? ['green', 'check'] : ['red', 'times'];
    };
    const onPressMemoized = useCallback(() => {
        if (onPress && id !== undefined) onPress(id);
    }, [id, onPress]);

    const targetValuesForAnim: [number, number] = turn[1]
        ? _random(1) > 0
            ? [0, 360]
            : [360, 0]
        : [0, 360];

    let animationValue = useRef(runTiming(new Clock(), ...targetValuesForAnim));

    const content = (
        <View style={style.container}>
            <Svg width={size} height={size} viewBox={`-100 -100 200 200`}>
                <G>
                    {data.map((item: any, index: number) => {
                        return <Slice index={index} color={item.color} data={data} key={index} />;
                    })}
                </G>
            </Svg>
        </View>
    );

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View
                style={{
                    transform: [turn[0] ? { rotate: concat(animationValue.current, 'deg') } : {}],
                }}>
                {isClickable ? (
                    <TouchableWithoutFeedback onPress={onPressMemoized}>
                        {content}
                    </TouchableWithoutFeedback>
                ) : (
                    <>{content}</>
                )}
            </Animated.View>
            {shouldShowStatus && (
                <Icon
                    style={{ alignSelf: 'center', position: 'absolute' }}
                    name={renderIconProps()[1]}
                    color={renderIconProps()[0]}
                    size={30}></Icon>
            )}
        </View>
    );
};

//@ts-ignore
Pie.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default React.memo(Pie);
