import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import colors from '@assets/colors';

export default StyleSheet.create({
    footerView: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: colors.GREEN,
        borderTopEndRadius: moderateScale(20),
        borderTopLeftRadius: moderateScale(20),
        marginHorizontal: moderateScale(1),
    },
    footerText: { color: 'white', fontSize: verticalScale(30) },
    contentContainerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        margin: 0,
        padding: 0,
    },
    listHeaderComponentStyle: { marginTop: verticalScale(0) },
});
