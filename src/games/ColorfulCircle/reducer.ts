import { TAction } from '@appTypes/action';

export const initialState = {
    answer: [[]],
    selectedAnswer: undefined,
    isMidModalVisible: false,
    isCircleStatusVisb: false,
    isFinalModalVisible: false,
    duration: 0,
};

type TColorfulCircleActions =
    | 'setAnswer'
    | 'setSelectedAnswer'
    | 'setMidModalVisible'
    | 'setCircleStatusVisb'
    | 'setFinalModalVisible'
    | 'setDuration';

export const reducer = (state: typeof initialState, action: TAction<TColorfulCircleActions>) => {
    switch (action.type) {
        case 'setAnswer':
            return { ...state, answer: action.payload };
        case 'setSelectedAnswer':
            return { ...state, selectedAnswer: action.payload };
        case 'setMidModalVisible':
            return { ...state, isMidModalVisible: action.payload };
        case 'setCircleStatusVisb':
            return { ...state, isCircleStatusVisb: action.payload };
        case 'setFinalModalVisible':
            return { ...state, isFinalModalVisible: action.payload };
        case 'setDuration':
            return { ...state, duration: action.payload };
        default:
            throw new Error('Wrong dispatch type');
    }
};
