import { ScaledSheet } from 'react-native-size-matters';

import { deviceHeight, deviceWidth } from '@assets/Dimensions';
import colors from '@assets/colors';

export default ScaledSheet.create({
    text: {
        fontSize: '40@vs',
        color: colors.ORANGE,
    },
});
