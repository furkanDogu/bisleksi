import { colorfulCircleColors } from '@assets/colors';
import { pickRandomFromArr } from '../helpers';

// this definition may be migrated to the db
// turn: [shouldTurn, shouldTurnRandomDirections]
const defs: {
    [key in string]: {
        circleCount: number;
        turn: [boolean, boolean];
        questionTimeLimit: number;
        showCaseTimeLimit: number;
    };
} = {
    1: {
        circleCount: 3,
        questionTimeLimit: 5,
        showCaseTimeLimit: 5,
        turn: [false, false],
    },
    2: {
        circleCount: 6,
        questionTimeLimit: 8,
        showCaseTimeLimit: 5,
        turn: [false, false],
    },
    3: {
        circleCount: 6,
        questionTimeLimit: 10,
        showCaseTimeLimit: 6,
        turn: [true, false],
    },
    4: {
        circleCount: 9,
        questionTimeLimit: 12,
        showCaseTimeLimit: 5,
        turn: [true, false],
    },
    5: {
        circleCount: 9,
        questionTimeLimit: 14,
        showCaseTimeLimit: 5,
        turn: [true, true],
    },
    6: {
        circleCount: 12,
        questionTimeLimit: 16,
        showCaseTimeLimit: 5,
        turn: [true, true],
    },
};

export default defs;
