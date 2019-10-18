import { ScaledSheet } from 'react-native-size-matters';

import colors from '@assets/colors';

export default ScaledSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        marginTop: '40@vs',
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
    },
    backButton: {
        backgroundColor: colors.ORANGE,
        marginLeft: '5@s',
        paddingHorizontal: '16@s',
        justifyContent: 'center',
        borderRadius: 15,
    },
    headerTagContainer: {
        backgroundColor: colors.ORANGE,
        borderRadius: 15,
        marginLeft: '5@s',
        justifyContent: 'center',
        paddingHorizontal: '35@s',
        paddingVertical: '10@vs',
    },
    headerTag: {
        color: 'white',
        fontSize: 20,
    },
    imageContainer: {
        marginLeft: '22@vs',
    },
    image: { width: '50@s', height: '50@vs' },
    firstCategory: { marginLeft: '12.8@s' },
});
