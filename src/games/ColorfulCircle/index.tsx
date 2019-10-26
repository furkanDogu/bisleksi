import React, { useContext, useEffect, useReducer, useCallback } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { NavigationStackProp } from 'react-navigation-stack';
import _random from 'lodash/random';

import Pie from '@components/Pie';
import GameNotifier from '@components/GameNotifier';
import Status from '@components/Status';
import { UserInfoContext } from '@components/UserInfo';
import EndGameContent from '@components/EndGameContent';

import style from './style';
import definitions from './definitions';
import { reducer, initialState } from './reducer';
import { permutateAndPickRand } from '../helpers';
import { MUTATION_CREATE_ANALYSIS } from './graphql';
import { gameIds } from '@utils/constants';
import TimeDiffCalc from '@utils/timeDiff';
import { useGameDriver, useCountdown } from '@hooks/';
import { deviceWidth } from '@assets/Dimensions';
import colors, { colorfulCircleColors } from '@assets/colors';

const gameName = 'ColorfulCircle';

interface IColorfulCircleProps {
    level: number;
    navigation: NavigationStackProp;
    client: ApolloClient<any>;
}

const ColorfulCircle: React.FC<IColorfulCircleProps> = ({
    level,
    navigation: { replace, navigate },
    client,
}) => {
    const { user, setUser } = useContext(UserInfoContext);
    const { footerView, footerText, contentContainerStyle, listHeaderComponentStyle } = style;
    const { circleCount, questionTimeLimit, showCaseTimeLimit } = definitions[level];
    const [timeForQuestion, startTimerForQuestion, stopTimerForQuestion] = useCountdown(
        questionTimeLimit,
    );
    const [
        {
            answer,
            isCircleStatusVisb,
            isMidModalVisible,
            selectedAnswer,
            isFinalModalVisible,
            duration,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    const { gameData, questionUp, points } = useGameDriver(
        useCallback(() => {
            dispatch({ type: 'setMidModalVisible', payload: true });
            dispatch({ type: 'setCircleStatusVisb', payload: false });
            dispatch({ type: 'setSelectedAnswer', payload: undefined });
        }, []),
        useCallback(() => permutateAndPickRand(colorfulCircleColors, circleCount), [level]),
        () => {
            const random = _random(gameData.length - 1);
            dispatch({ type: 'setAnswer', payload: [gameData[random], random] });
        },
        async () => {
            stopTimerForQuestion();
            if (user) {
                dispatch({ type: 'setDuration', payload: TimeDiffCalc.getDiffInSeconds() });
                try {
                    const { data, errors } = await client.mutate({
                        mutation: MUTATION_CREATE_ANALYSIS,
                        variables: {
                            data: {
                                level,
                                duration,
                                userId: user._id,
                                gameId: gameIds[gameName],
                                // won't be static as 10 will be changeable
                                wrongCount: 10 - points,
                                correctCount: points,
                            },
                        },
                    });
                    setUser(prevUser => {
                        if (prevUser) {
                            return {
                                ...prevUser,
                                gameInfo: data.createAnalysis,
                            };
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            dispatch({ type: 'setFinalModalVisible', payload: true });
        },
    );

    // start timer to calculate gaming duration of the user
    useEffect(() => {
        TimeDiffCalc.start();
    }, []);

    useEffect(() => {
        if (timeForQuestion === 0 && selectedAnswer === undefined) {
            // overtime
            stopTimerForQuestion();
            dispatch({ type: 'setCircleStatusVisb', payload: true });
            setTimeout(() => questionUp(), 1000);
        } else if (selectedAnswer !== undefined) {
            stopTimerForQuestion();
            dispatch({ type: 'setCircleStatusVisb', payload: true });
            if (selectedAnswer === answer[1]) {
                // correct answer
                setTimeout(() => questionUp(1), 1000);
            } else {
                // wrong answer
                setTimeout(() => questionUp(), 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAnswer, timeForQuestion]);

    const piePress = useCallback((id: number) => {
        dispatch({ type: 'setSelectedAnswer', payload: id });
    }, []);

    const onMidNotifierComplete = useCallback(() => {
        if (isMidModalVisible) {
            dispatch({ type: 'setMidModalVisible', payload: false });
            startTimerForQuestion();
        }
    }, [startTimerForQuestion, isMidModalVisible]);

    const renderCircle = ({ item, index }: { item: any[]; index: number }) => (
        <Pie
            size={deviceWidth / 3.3}
            colors={item}
            key={index}
            id={index}
            answer={answer[1]}
            shouldShowStatus={isCircleStatusVisb}
            isClickable={!isCircleStatusVisb && !isMidModalVisible}
            onPress={piePress}
        />
    );

    const wantedPie = useCallback(
        () => <Pie size={deviceWidth / 2.5} colors={answer[0]} isClickable={false} />,
        [answer],
    );

    const listHeader = useCallback(() => <Status value={timeForQuestion} />, [timeForQuestion]);

    const listFooter = useCallback(
        () => <Status textStyle={footerText} value={`${points}/${10}`} />,
        [points],
    );

    const finalModalContent = useCallback(
        () => <EndGameContent {...{ duration, points: points * 10 }} />,
        [duration, points],
    );

    return (
        <View
            style={{
                flex: 1,
                padding: 0,
            }}>
            {!isMidModalVisible && answer.length > 1 && (
                <FlatList
                    ListHeaderComponent={listHeader}
                    ListHeaderComponentStyle={listHeaderComponentStyle}
                    contentContainerStyle={contentContainerStyle}
                    ListFooterComponent={listFooter}
                    ListFooterComponentStyle={footerView}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    data={gameData}
                    renderItem={renderCircle}></FlatList>
            )}
            <GameNotifier
                isVisible={isMidModalVisible}
                visibilityDuration={showCaseTimeLimit}
                onComplete={onMidNotifierComplete}
                content={wantedPie()}
                header="Aşağıdaki şeklin aynısını seçelim"
                buttons={[
                    {
                        bgColor: colors.GREEN,
                        label: 'Geç',
                        onPress: () => {
                            dispatch({ type: 'setMidModalVisible', payload: false });
                            startTimerForQuestion();
                        },
                    },
                ]}
            />
            <GameNotifier
                isVisible={isFinalModalVisible}
                header="Tebrikler, Bir oyunu başarıyla tamamladın !"
                content={finalModalContent()}
                buttons={[
                    {
                        bgColor: colors.ORANGE,
                        label: 'Yeniden oyna',
                        onPress: () => {
                            dispatch({ type: 'setFinalModalVisible', payload: false });
                            replace('AnyGame', {
                                navigationTag: gameName,
                                level,
                            });
                        },
                    },
                    {
                        bgColor: colors.ORANGE,
                        label: 'Kategorilere dön',
                        onPress: () => {
                            dispatch({ type: 'setFinalModalVisible', payload: false });
                            navigate('Oyunlar');
                        },
                    },
                ]}
            />
        </View>
    );
};

//@ts-ignore
ColorfulCircle.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default ColorfulCircle;
