import { object, string } from 'yup';

import ERRORS from '@utils/validationErrors';

export default object({
    email: string()
        .typeError(ERRORS.INVALID)
        .max(255, ERRORS.OVERCHARACTER)
        .email(ERRORS.EMAIL)
        .required(ERRORS.REQUIRED('e-posta')),
    password: string()
        .typeError(ERRORS.INVALID)
        .min(8, ERRORS.PASSWORD)
        .max(20, ERRORS.PASSWORD)
        .required(ERRORS.REQUIRED('şifre')),
});
