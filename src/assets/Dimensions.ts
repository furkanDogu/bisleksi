import { Dimensions, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight =
    Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');
