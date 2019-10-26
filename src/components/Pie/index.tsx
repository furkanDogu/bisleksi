import React, { useEffect, useCallback } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { G, Svg } from 'react-native-svg';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

import Slice from './Slice';

const style = ScaledSheet.create({
    container: {
        margin: 1,
        borderRadius: 15,
        padding: 3,
    },
});

interface IPieProps {
    colors: any[];
    size: number;
    onPress?: (id: number) => void;
    answer?: any;
    id?: number;
    shouldShowStatus?: boolean;
    isClickable: boolean;
}

const Pie: React.FC<IPieProps> = ({
    colors,
    size,
    id,
    onPress,
    shouldShowStatus,
    answer,
    isClickable,
}) => {
    const data = colors.map(color => ({ color, number: 1 }));

    const renderIconProps = () => {
        return answer === id ? ['green', 'check'] : ['red', 'times'];
    };
    const onPressMemoized = useCallback(() => {
        if (onPress && id !== undefined) onPress(id);
    }, [id, onPress]);

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
            {isClickable ? (
                <TouchableWithoutFeedback onPress={onPressMemoized}>
                    {content}
                </TouchableWithoutFeedback>
            ) : (
                <>{content}</>
            )}
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
