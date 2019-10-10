import React from 'react';
import { Modal, Text, View } from 'react-native';
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
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={() => setIsOpen(false)}>
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

export default NotificationProvider;
