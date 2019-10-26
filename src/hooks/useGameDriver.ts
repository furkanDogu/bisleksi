import { useState, useEffect, useCallback } from 'react';

export const useGameDriver = (
    beforeQuestion: () => void,
    gameDataCreator: () => any[],
    runAfterData: () => void,
    onGameComplete: () => Promise<any>,
) => {
    const [questionCount, setQuestionCount] = useState(1);
    const [gameData, setGameData] = useState<any[]>([]);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        if (questionCount < 11) {
            beforeQuestion();
            setGameData(gameDataCreator());
        } else {
            onGameComplete();
        }
    }, [questionCount]);

    useEffect(() => {
        if (gameData.length > 0) {
            runAfterData();
        }
    }, [gameData]);

    return {
        points,
        questionCount,
        gameData,
        questionUp: (point?: number) => {
            if (point) setPoints(prev => prev + point);
            setQuestionCount(prev => prev + 1);
        },
    };
};
