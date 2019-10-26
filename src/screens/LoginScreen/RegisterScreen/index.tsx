import React, { useContext } from 'react';
import { View, Image, findNodeHandle } from 'react-native';
import { Formik } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import _unset from 'lodash/unset';
import moment from 'moment';

import LabeledInput from '@components/LabeledInput';
import RoundButton from '@components/RoundButton';
import { NotificationContext } from '@components/Notification';

import style from './style';
import colors from '@assets/colors';
import schema from './validation';
import { errorPrinter } from '@utils/validationErrors';
import netInfo from '@utils/netInfo';
import { setToken } from '@services/authService';

interface IRegisterScreenProps {
    isVisible: boolean;
    toggleVisible: () => void;
    register: (values: any) => Promise<any>;
    navigation: NavigationStackProp;
}

const RegisterScreen: React.SFC<IRegisterScreenProps> = ({
    isVisible,
    toggleVisible,
    register,
    navigation,
}) => {
    const { container, image, imageContainer, innerContainer, text, input, formContainer } = style;
    let scrollViewRef: any;
    const notification = useContext(NotificationContext);

    const scrollToInput = (reactNode: any) => {
        if (scrollViewRef) {
            //@ts-ignore
            scrollViewRef.props.scrollToFocusedInput(reactNode);
        }
    };

    return (
        <Modal
            swipeDirection={['down', 'up']}
            onSwipeComplete={toggleVisible}
            propagateSwipe
            swipeThreshold={100}
            backdropColor="white"
            backdropOpacity={1}
            isVisible={isVisible}
            style={container}
            onBackButtonPress={toggleVisible}>
            <KeyboardAwareScrollView
                extraHeight={120}
                style={{ backgroundColor: colors.ORANGE }}
                innerRef={ref => {
                    if (ref) {
                        //@ts-ignore
                        scrollViewRef = ref;
                    }
                }}>
                <View style={container}>
                    <View style={imageContainer}>
                        <Image
                            style={image}
                            source={require('../../../images/Bisleksi-Logo.png')}></Image>
                    </View>
                    <View style={formContainer}>
                        <Formik
                            initialValues={{
                                name: '',
                                surname: '',
                                birthday: '',
                                email: '',
                                password: '',
                                rePassword: '',
                            }}
                            onSubmit={async values => {
                                try {
                                    const isNetAvailable = await netInfo();
                                    if (isNetAvailable) {
                                        const valuesCopy = { ...values };
                                        valuesCopy.birthday = moment(
                                            valuesCopy.birthday,
                                            'DD-MM-YYYY',
                                        ).format();
                                        _unset(valuesCopy, 'rePassword');

                                        const { data } = await register(valuesCopy);
                                        await setToken('access_token', data.register.access_token);
                                        await setToken(
                                            'refresh_token',
                                            data.register.refresh_token,
                                        );
                                        navigation.navigate('Splash');
                                    } else {
                                        notification.openNotification([
                                            'Lütfen internet bağlantınızı kontrol ediniz',
                                            'Hemen ediyorum',
                                            'coffee',
                                        ]);
                                    }
                                } catch (e) {
                                    console.log(e);
                                    notification.openNotification([
                                        'Lütfen bilgilerinizi kontrol ediniz',
                                        'Hemen ediyorum',
                                        'coffee',
                                    ]);
                                }
                            }}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={innerContainer}>
                                    <LabeledInput
                                        bgColor="white"
                                        textColor="black"
                                        text="Ad"
                                        height={60}
                                        viewStyle={input}
                                        inputProps={{
                                            onChangeText: handleChange('name'),
                                            onBlur: handleBlur('name'),
                                            onFocus: (event: Event) => {
                                                // @ts-ignore
                                                scrollToInput(findNodeHandle(event.target));
                                            },
                                            maxLength: 35,
                                        }}
                                    />
                                    <LabeledInput
                                        bgColor="white"
                                        textColor="black"
                                        text="Soyad"
                                        height={60}
                                        viewStyle={input}
                                        inputProps={{
                                            onChangeText: handleChange('surname'),
                                            onBlur: handleBlur('surname'),
                                            onFocus: (event: Event) => {
                                                // @ts-ignore
                                                scrollToInput(findNodeHandle(event.target));
                                            },
                                            maxLength: 255,
                                        }}
                                    />

                                    <DatePicker
                                        style={{ width: '88%', margin: 19 }}
                                        date={values.birthday}
                                        placeholder="Doğum tarihi"
                                        onDateChange={date => handleChange('birthday')(date)}
                                        mode="date"
                                        format="DD-MM-YYYY"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: style.dateInput,
                                            dateText: style.dateText,
                                            placeholderText: style.datePlaceholder,
                                        }}
                                    />

                                    <LabeledInput
                                        bgColor="white"
                                        textColor="black"
                                        text="E-posta"
                                        height={60}
                                        viewStyle={input}
                                        inputProps={{
                                            onChangeText: handleChange('email'),
                                            onBlur: handleBlur('email'),
                                            onFocus: (event: Event) => {
                                                // @ts-ignore
                                                scrollToInput(findNodeHandle(event.target));
                                            },
                                            maxLength: 255,
                                        }}
                                    />
                                    <LabeledInput
                                        bgColor="white"
                                        textColor="black"
                                        text="Şifre"
                                        height={60}
                                        viewStyle={input}
                                        inputProps={{
                                            secureTextEntry: true,
                                            onChangeText: handleChange('password'),
                                            onBlur: handleBlur('password'),
                                            onFocus: (event: Event) => {
                                                // @ts-ignore
                                                scrollToInput(findNodeHandle(event.target));
                                            },
                                            maxLength: 20,
                                        }}
                                    />
                                    <LabeledInput
                                        bgColor="white"
                                        textColor="black"
                                        text="Şifre tekrarı"
                                        height={60}
                                        viewStyle={input}
                                        inputProps={{
                                            secureTextEntry: true,
                                            onChangeText: handleChange('rePassword'),
                                            onBlur: handleBlur('rePassword'),
                                            onFocus: (event: Event) => {
                                                // @ts-ignore
                                                scrollToInput(findNodeHandle(event.target));
                                            },
                                            maxLength: 20,
                                        }}
                                    />
                                    <RoundButton
                                        bgColor={colors.GREEN}
                                        label="Kaydı tamamla"
                                        textStyle={text}
                                        viewStyle={style.buttonView}
                                        onPressAsync={async () => {
                                            const errorMsg = await errorPrinter(schema, values);
                                            if (errorMsg) {
                                                notification.openNotification([
                                                    errorMsg,
                                                    'Anladım',
                                                    'cry',
                                                ]);
                                                return;
                                            }
                                            if (values.password !== values.rePassword) {
                                                notification.openNotification([
                                                    'Şifreler uyuşmuyor',
                                                    'Anladım',
                                                    'cry',
                                                ]);
                                                return;
                                            }
                                            handleSubmit();
                                        }}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

//@ts-ignore
RegisterScreen.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default RegisterScreen;
