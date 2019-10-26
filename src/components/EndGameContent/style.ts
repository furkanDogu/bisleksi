import { ScaledSheet } from 'react-native-size-matters';

import colors from '@assets/colors';

export default ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.TURQUOISE,
        width: '150@s',
        margin: '5@s',
        borderRadius: 15,
    },
    header: {
        fontSize: '22@vs',
        color: 'white',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '18@vs',
    },
});
