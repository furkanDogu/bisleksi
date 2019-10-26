/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (countFrom: number): [number, Function, Function] => {
    const [time, setTime] = useState();
    const [isTimerOpen, setTimerOpen] = useState(false);
    const [timer, setTimer] = useState();

    const timerCreator = () =>
        setInterval(() => {
            setTime((prev: number) => prev - 1);
        }, 1000);

    const clearTimer = useCallback(() => {
        if (isTimerOpen) {
            clearInterval(timer);
            setTimerOpen(false);
        }
    }, [setTimerOpen, timer, isTimerOpen]);

    const startTimer = useCallback(() => {
        if (!isTimerOpen) {
            setTimerOpen(true);
            setTime(countFrom);
        }
    }, [setTime, setTimerOpen]);

    // To stop the timer when time value is 0
    useEffect(() => {
        if (time === 0) {
            clearTimer();
        }
    }, [time, clearTimer]);

    // To open timer when user component runs startTimer
    useEffect(() => {
        if (isTimerOpen) {
            setTimer(timerCreator());
        }
    }, [isTimerOpen]);

    return [time, startTimer, clearTimer];
};
