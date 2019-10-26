import React from 'react';
import { View, Text } from 'react-native';

import style from './style';

interface IEndGameContentProps {
    duration: number;
    points: number;
}

const EndGameContent: React.FC<IEndGameContentProps> = ({ duration, points }) => {
    const { container, header, text } = style;
    return (
        <View style={container}>
            <Text style={header}>Skor</Text>
            <Text style={text}>{points}</Text>
            <Text style={header}>Toplam süre</Text>
            <Text style={text}>{duration}</Text>
        </View>
    );
};

export default EndGameContent;
