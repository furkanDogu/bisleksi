import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
    container: {
        flex: 1,
        margin: 0,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 0,
        padding: 0,
        marginHorizontal: '1@ms',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    imageContainer: { height: '60@ms', backgroundColor: 'white' },
    text: { color: 'white', fontSize: '18@ms' },
    input: { marginVertical: '10@ms' },
    buttonView: { marginTop: '10@ms0.3' },
    dateInput: {
        borderWidth: 0,
        backgroundColor: 'white',
        height: '59@vs',
        borderRadius: '12@ms',
    },
    dateText: { fontSize: '16@ms' },
    datePlaceholder: {
        fontSize: '18@ms0.3',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        color: 'black',
    },
});
