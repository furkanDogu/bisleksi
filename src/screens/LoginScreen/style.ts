import { ScaledSheet } from 'react-native-size-matters';

import colors from '@assets/colors';

export default ScaledSheet.create({
    flexOne: { flex: 1 },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        borderRadius: 0,
        bottom: 0,
        borderTopEndRadius: '20@ms',
        borderTopLeftRadius: '20@ms',
        paddingHorizontal: '30@ms',
        paddingVertical: '10@ms',
        marginHorizontal: '1@ms',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    imageContainer: { width: '255@ms', height: '67@ms', marginBottom: '20@ms' },
    loginButtonText: { color: 'white', fontSize: '18@ms0.3' },
    registerButtonText: { color: 'white', fontSize: '18@ms0.3' },
});
