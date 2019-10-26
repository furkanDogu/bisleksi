import { ScaledSheet } from 'react-native-size-matters';

import { deviceWidth, deviceHeight } from '@assets/Dimensions';
import COLORS from '@assets/colors';

export default ScaledSheet.create({
    flexOne: { flex: 1 },
    container: { justifyContent: 'center', alignItems: 'center' },
    innerContainer: {
        height: deviceHeight * 0.35,
        width: deviceWidth * 0.75,
        backgroundColor: COLORS.ORANGE,
        alignItems: 'center',
        borderRadius: 20,
        padding: '10@ms',
    },
    emoji: { fontSize: '60@ms', marginTop: '6@ms0.5', marginBottom: '10@ms' },
    text: { color: 'white', fontSize: '20@ms0.3', textAlign: 'center', marginTop: '5@ms' },
    roundButtonView: { position: 'absolute', bottom: 10 },
    roundButtonText: { color: COLORS.ORANGE, fontSize: '20@ms0.3' },
});
