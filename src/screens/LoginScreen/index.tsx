import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { Formik } from 'formik';

import LabeledInput from '@components/LabeledInput';
import RoundButton from '@components/RoundButton';
import { NotificationContext } from '@components/Notification';

import styles from './style';
import schema from './validation';
import COLORS from '@assets/colors';
import { errorPrinter } from '@utils/validationErrors';

interface ILoginScreenProps {
    login: (values: any) => Promise<any>;
}

export default ({ login }: ILoginScreenProps) => {
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
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const res = await login(values);
                    } catch (e) {
                        notification.openNotification([
                            'Lütfen bilgilerinizi kontrol ediniz',
                            'Hemen ediyorum',
                            'coffee',
                        ]);
                    } finally {
                        setSubmitting(false);
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
                onPress={() => console.log('asd')}
            />
        </View>
    );
};
