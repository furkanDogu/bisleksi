import { object, string, date } from 'yup';

import ERRORS from '@utils/validationErrors';

export default object({
    name: string()
        .typeError(ERRORS.INVALID)
        .required(ERRORS.REQUIRED('ad')),
    surname: string()
        .typeError(ERRORS.INVALID)
        .required(ERRORS.REQUIRED('soyad')),
    birthday: string()
        .typeError(ERRORS.INVALID)
        .required(ERRORS.REQUIRED('doğum tarihi')),
    password: string()
        .typeError(ERRORS.INVALID)
        .min(8, ERRORS.PASSWORD)
        .max(20, ERRORS.PASSWORD)
        .required(ERRORS.REQUIRED('şifre')),
    email: string()
        .typeError(ERRORS.INVALID)
        .email(ERRORS.EMAIL)
        .required(ERRORS.REQUIRED('e-posta')),
    rePassword: string()
        .typeError(ERRORS.INVALID)
        .min(8, ERRORS.PASSWORD)
        .max(20, ERRORS.PASSWORD)
        .required(ERRORS.REQUIRED('şifre')),
});
