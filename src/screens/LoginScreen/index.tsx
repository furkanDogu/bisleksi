import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { Formik } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';

import LabeledInput from '@components/LabeledInput';
import RoundButton from '@components/RoundButton';
import { NotificationContext } from '@components/Notification';

import styles from './style';
import schema from './validation';
import COLORS from '@assets/colors';
import { errorPrinter } from '@utils/validationErrors';
import { setToken, getToken } from '@services/authService';

interface ILoginScreenProps {
    login: (values: any) => Promise<any>;
    navigation: NavigationStackProp;
}

export default ({ login, navigation }: ILoginScreenProps) => {
    const {
        container,
        registerButton,
        image,
        imageContainer,
        registerButtonText,
        loginButtonText,
    } = styles;
    const notification = useContext(NotificationContext);

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
                        const { data } = await login(values);
                        await setToken('access_token', data.login.access_token);
                        await setToken('refresh_token', data.login.refresh_token);
                        await navigation.navigate('Main');
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
                            width="65%"
                            text="E-posta "
                            textColor="white"
                            height={60}
                            inputProps={{
                                onChangeText: handleChange('email'),
                                onBlur: handleBlur('email'),
                            }}
                        />
                        <LabeledInput
                            bgColor={COLORS.TURQUOISE}
                            width="65%"
                            text="Şifre "
                            textColor="white"
                            height={60}
                            inputProps={{
                                secureTextEntry: true,
                                onChangeText: handleChange('password'),
                                onBlur: handleBlur('password'),
                            }}
                        />
                        <View style={{ marginBottom: 30 }}></View>
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
                viewStyle={registerButton}
                onPress={() =>
                    console.log('This button will navigate to register screen in future')
                }
            />
        </View>
    );
};
