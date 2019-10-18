import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    imageContainer: { height: 50, backgroundColor: 'white' },
    lottieAnimation: { width: 220, height: 220, margin: 0 },
});
