import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Emoji from 'react-native-emoji';

import RoundButton from '@components/RoundButton';

import styles from './style';

export const NotificationContext = React.createContext({
    openNotification: (msg: string[]) => {},
    closeNotification: () => {},
});

const NotificationProvider: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(['', '', 'coffee']);
    // msg content: [msg, buttonText, emojiText]
    function openNotification(msg: string[]) {
        setMsg(msg);
        setIsOpen(true);
    }

    return (
        <NotificationContext.Provider
            value={{
                openNotification,
                closeNotification: () => setIsOpen(false),
            }}>
            <View style={styles.flexOne}>
                {children}
                <Modal
                    isVisible={isOpen}
                    onBackButtonPress={() => setIsOpen(false)}
                    onSwipeComplete={() => setIsOpen(false)}
                    swipeDirection={['down']}>
                    <View style={[styles.flexOne, styles.container]}>
                        <View style={styles.innerContainer}>
                            <Emoji name={msg[2]} style={styles.emoji} />
                            <Text style={styles.text}>{msg[0]}</Text>
                            <RoundButton
                                viewStyle={styles.roundButtonView}
                                bgColor="white"
                                label={msg[1]}
                                textStyle={styles.roundButtonText}
                                onPress={() => setIsOpen(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </NotificationContext.Provider>
    );
};

//@ts-ignore
NotificationProvider.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default NotificationProvider;
