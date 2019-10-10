import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
    component: { margin: '5@ms', alignItems: 'center' },
    container: { flex: 1, flexDirection: 'row' },
    label: {
        justifyContent: 'center',
        borderTopLeftRadius: '12@ms',
        borderBottomLeftRadius: '12@ms',
        paddingLeft: '12@ms',
        paddingTop: '8@ms',
        paddingBottom: '12@ms',
        width: '25%',
    },
    textStyle: { fontSize: '20@ms0.3' },
    input: {
        borderTopRightRadius: '12@ms',
        borderBottomRightRadius: '12@ms',
    },
});
