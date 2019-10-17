import React, { useContext, useState } from 'react';
import { View, Image } from 'react-native';
import { Formik } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';

import RegisterScreenGQL from '@screens/LoginScreen/RegisterScreen/graphql';
import LabeledInput from '@components/LabeledInput';
import RoundButton from '@components/RoundButton';
import { NotificationContext } from '@components/Notification';

import styles from './style';
import schema from './validation';
import COLORS from '@assets/colors';
import { errorPrinter } from '@utils/validationErrors';
import netInfo from '@utils/netInfo';
import { setToken } from '@services/authService';

interface ILoginScreenProps {
    login: (values: any) => Promise<any>;
    navigation: NavigationStackProp;
}

export default ({ login, navigation }: ILoginScreenProps) => {
    const [isRegisterVisible, setRegisterVisible] = useState(false);
    const {
        container,
        registerButton,
        image,
        imageContainer,
        registerButtonText,
        loginButtonText,
        buttonOn,
        buttonOff,
    } = styles;
    const notification = useContext(NotificationContext);

    const registerButtonOpacity = () => (isRegisterVisible ? buttonOff : buttonOn);

    return (
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={schema}
                onSubmit={async values => {
                    try {
                        const isNetAvailable = await netInfo();
                        if (isNetAvailable) {
                            const { data } = await login(values);
                            await setToken('access_token', data.login.access_token);
                            await setToken('refresh_token', data.login.refresh_token);
                            await navigation.navigate('Tab');
                        } else {
                            notification.openNotification([
                                'Lütfen internet bağlantınızı kontrol ediniz',
                                'Hemen ediyorum',
                                'coffee',
                            ]);
                        }
                    } catch (e) {
                        notification.openNotification([
                            'Lütfen bilgilerinizi kontrol ediniz',
                            'Hemen ediyorum',
                            'coffee',
                        ]);
                    }
                }}>
                {({ handleSubmit, handleChange, handleBlur, values }) => (
                    <View style={container}>
                        <View style={imageContainer}>
                            <Image
                                style={image}
                                source={require('../../images/Bisleksi-Logo.png')}></Image>
                        </View>
                        <LabeledInput
                            bgColor={COLORS.PINK}
                            text="E-posta "
                            textColor="white"
                            height={60}
                            inputProps={{
                                onChangeText: handleChange('email'),
                                onBlur: handleBlur('email'),
                                maxLength: 255,
                            }}
                        />
                        <LabeledInput
                            bgColor={COLORS.TURQUOISE}
                            text="Şifre "
                            textColor="white"
                            height={60}
                            inputProps={{
                                secureTextEntry: true,
                                onChangeText: handleChange('password'),
                                onBlur: handleBlur('password'),
                                maxLength: 20,
                            }}
                        />

                        <RoundButton
                            bgColor={COLORS.ORANGE}
                            label="Giriş Yap"
                            textStyle={loginButtonText}
                            onPressAsync={async () => {
                                const errorMsg = await errorPrinter(schema, values);
                                if (errorMsg) {
                                    notification.openNotification([errorMsg, 'Anladım', 'cry']);
                                    return;
                                }
                                handleSubmit();
                            }}
                        />
                    </View>
                )}
            </Formik>
            <RoundButton
                bgColor={COLORS.ORANGE}
                label="Kayıt Ol"
                textStyle={registerButtonText}
                viewStyle={[registerButton, registerButtonOpacity()]}
                onPress={() => setRegisterVisible(true)}
            />
            <RegisterScreenGQL
                navigation={navigation}
                isVisible={isRegisterVisible}
                toggleVisible={() => {
                    setRegisterVisible(!isRegisterVisible);
                }}
            />
        </View>
    );
};
