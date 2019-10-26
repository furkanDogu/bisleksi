import { ScaledSheet } from 'react-native-size-matters';

import { deviceWidth, deviceHeight } from '@assets/Dimensions';
import colors from '@assets/colors';

export default ScaledSheet.create({
    buttonView: {
        marginBottom: 8,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#edf1fe',
        height: deviceHeight * 0.55,
        width: deviceWidth * 0.8,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: colors.TURQUOISE,
    },
    headerStyle: {
        padding: 20,
        fontSize: 20,
        textAlign: 'center',
        color: colors.ORANGE,
        fontWeight: 'bold',
    },
    timeStyle: { fontSize: 40 },
});
